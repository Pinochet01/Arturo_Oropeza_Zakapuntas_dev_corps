const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');
const crypto = require('crypto');

const PORT = 8080;
const WEBHOOK_PORT = 8000;
const WEBHOOK2_PORT = 8001;
const HTTPS_PORT = 8443;
const HOST = '0.0.0.0';
const REGISTRAR_URL = `http://${HOST}:8081`;

const META_APP_SECRET  = process.env.META_APP_SECRET  || '';
const META_PAGE_TOKEN  = process.env.META_PAGE_TOKEN  || '';

const app = express();
// Captura rawBody para validación HMAC de Meta
app.use(express.json({
  limit: '64kb',
  verify: (req, _res, buf) => { req.rawBody = buf; },
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));

// API Key auth
const API_KEY = process.env.API_KEY || 'dev-key-change-me';
function requireAuth(req, res, next) {
  if (req.method === 'GET' && (
    req.originalUrl === '/health' ||
    req.originalUrl.startsWith('/api/v1/hook')
  )) return next();
  if (req.headers['x-api-key'] === API_KEY) return next();
  res.status(401).json({ error: 'API key invalida o faltante' });
}
app.use(requireAuth);

// Health & Status
app.get('/health', (req, res) => {
  res.json({ status: 'operational', host: HOST, port: PORT, https: HTTPS_PORT, uptime: process.uptime() });
});

app.get('/api/v1/status', (req, res) => {
  res.json({
    service: 'automation-matrix', version: '1.0.0',
    node: process.version, platform: process.platform, arch: process.arch,
    memory: process.memoryUsage(), timestamp: new Date().toISOString(),
  });
});

// Meta webhook verification (GET challenge)
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'automation-matrix-2026';

// ── Meta: validación de firma HMAC-SHA256 ──────────────────────────────────
function validateMetaSignature(req, res, next) {
  if (req.method !== 'POST') return next();
  if (!META_APP_SECRET) {
    console.warn('[meta] META_APP_SECRET no configurado — omitiendo validación de firma');
    return next();
  }
  const sig = req.headers['x-hub-signature-256'];
  if (!sig || !sig.startsWith('sha256=')) {
    return res.status(401).json({ error: 'firma Meta ausente o inválida' });
  }
  const expected = 'sha256=' + crypto
    .createHmac('sha256', META_APP_SECRET)
    .update(req.rawBody || '')
    .digest('hex');
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return res.status(403).json({ error: 'firma Meta no coincide' });
    }
  } catch {
    return res.status(403).json({ error: 'error validando firma Meta' });
  }
  next();
}

// ── Meta: normaliza payload → formato del registrar ───────────────────────
async function normalizeMetaPayload(payload) {
  if (!payload?.object || !Array.isArray(payload.entry)) return payload;

  const { object, entry } = payload;
  const firstEntry  = entry[0] || {};
  const firstChange = (firstEntry.changes || [])[0] || {};
  const changeVal   = firstChange.value || {};

  // ── Lead Ads ─────────────────────────────────────────────────────────────
  if (object === 'page' && firstChange.field === 'leadgen') {
    const leadgenId = changeVal.leadgen_id;
    if (leadgenId && META_PAGE_TOKEN) {
      try {
        const r = await fetch(
          `https://graph.facebook.com/v19.0/${leadgenId}?fields=field_data,created_time&access_token=${META_PAGE_TOKEN}`
        );
        const lead = await r.json();
        const fields = {};
        (lead.field_data || []).forEach(f => { fields[f.name] = (f.values || [])[0] || ''; });
        return {
          nombre:          fields.full_name || fields.name || `lead_${leadgenId}`,
          email:           fields.email || '',
          telefono:        fields.phone_number || fields.phone || '',
          servicio:        'meta_lead_ads',
          meta_leadgen_id: leadgenId,
          meta_page_id:    changeVal.page_id,
          meta_form_id:    changeVal.form_id,
        };
      } catch (e) {
        console.error('[meta] error Graph API Lead:', e.message);
      }
    }
    return {
      nombre:          `lead_${leadgenId || 'unknown'}`,
      servicio:        'meta_lead_ads',
      meta_leadgen_id: leadgenId,
    };
  }

  // ── WhatsApp Business API ─────────────────────────────────────────────────
  if (object === 'whatsapp_business_account') {
    const waChange  = (firstEntry.changes || []).find(c => c.field === 'messages') || {};
    const waVal     = waChange.value || {};
    const contact   = (waVal.contacts || [])[0] || {};
    const message   = (waVal.messages || [])[0] || {};
    return {
      nombre:          contact.profile?.name || `wa_${contact.wa_id || ''}`,
      telefono:        contact.wa_id || message.from || '',
      email:           '',
      servicio:        'whatsapp',
      meta_wa_id:      contact.wa_id,
      meta_message:    message.text?.body || message.type || '',
      meta_waba_id:    firstEntry.id,
    };
  }

  // ── Instagram DM ──────────────────────────────────────────────────────────
  if (object === 'instagram') {
    const messaging = (firstEntry.messaging || [])[0] || {};
    return {
      nombre:          `ig_${messaging.sender?.id || 'unknown'}`,
      email:           '',
      telefono:        '',
      servicio:        'instagram_dm',
      meta_sender_id:  messaging.sender?.id,
      meta_message:    messaging.message?.text || '',
    };
  }

  return payload; // payload no reconocido — pasa tal cual
}
app.get('/api/v1/hook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN && challenge) {
    return res.status(200).send(challenge);
  }
  res.status(403).send('Verification failed');
});
app.get('/api/v1/hook/marketing', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN && challenge) {
    return res.status(200).send(challenge);
  }
  res.status(403).send('Verification failed');
});

const PROXY_TIMEOUT = 30000;

function proxyPost(req, res) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROXY_TIMEOUT);
  fetch(REGISTRAR_URL + req.originalUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
    signal: controller.signal,
  })
    .then(r => r.json().then(d => { clearTimeout(timer); res.status(r.status).json(d); }))
    .catch(() => res.status(502).json({ error: 'registrar no disponible' }));
}

function proxyGet(req, res) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROXY_TIMEOUT);
  fetch(REGISTRAR_URL + req.originalUrl, { signal: controller.signal })
    .then(r => r.json().then(d => { clearTimeout(timer); res.status(r.status).json(d); }))
    .catch(() => res.status(502).json({ error: 'registrar no disponible' }));
}

// Proxy routes
app.all(['/api/v1/registrar'], proxyPost);
app.all('/api/v1/clientes', proxyGet);
app.get('/api/v1/cliente/:id', proxyGet);

// POST webhooks — validación Meta + normalización antes de proxy al registrar
async function handleMetaHook(req, res) {
  try {
    const normalized = await normalizeMetaPayload(req.body);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROXY_TIMEOUT);
    const r = await fetch(REGISTRAR_URL + '/api/v1/hook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const d = await r.json();
    res.status(r.status).json(d);
  } catch (e) {
    res.status(502).json({ error: 'registrar no disponible', detail: e.message });
  }
}

app.post('/api/v1/hook',           validateMetaSignature, handleMetaHook);
app.post('/api/v1/hook/marketing', validateMetaSignature, handleMetaHook);

// Catch-all para otros sub-paths de hook
app.use('/api/v1/hook', (req, res, next) => {
  if (req.method !== 'GET') return proxyPost(req, res);
  res.status(404).json({ error: 'ruta no encontrada' });
});

// HTTP Server
const httpServer = http.createServer(app).listen(PORT, HOST, () => {
  console.log(`[automation-matrix] HTTP  bound ${HOST}:${PORT}`);
});

// Webhook listeners (for Chromebook SSH tunnel)
const webhookServer = http.createServer(app).listen(WEBHOOK_PORT, HOST, () => {
  console.log(`[automation-matrix] Webhook bound ${HOST}:${WEBHOOK_PORT}`);
});
const webhook2Server = http.createServer(app).listen(WEBHOOK2_PORT, HOST, () => {
  console.log(`[automation-matrix] Webhook bound ${HOST}:${WEBHOOK2_PORT}`);
});

// HTTPS Server
let httpsServer = null;
try {
  const sslKey = process.env.SSL_KEY || path.join(__dirname, 'ssl', 'key.pem');
  const sslCert = process.env.SSL_CERT || path.join(__dirname, 'ssl', 'cert.pem');
  if (fs.existsSync(sslKey) && fs.existsSync(sslCert)) {
    httpsServer = https.createServer({ key: fs.readFileSync(sslKey), cert: fs.readFileSync(sslCert) }, app)
      .listen(HTTPS_PORT, HOST, () => {
        console.log(`[automation-matrix] HTTPS bound ${HOST}:${HTTPS_PORT}`);
      });
  }
} catch (e) {
  console.log('[automation-matrix] SSL no disponible, solo HTTP');
}

function shutdown() {
  console.log('[automation-matrix] shutting down');
  httpServer.close();
  webhookServer.close();
  webhook2Server.close();
  if (httpsServer) httpsServer.close();
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('uncaughtException', (err) => console.error('[automation-matrix] uncaught:', err));
process.on('unhandledRejection', (reason) => {
  console.error('[automation-matrix] unhandled rejection:', reason);
});
