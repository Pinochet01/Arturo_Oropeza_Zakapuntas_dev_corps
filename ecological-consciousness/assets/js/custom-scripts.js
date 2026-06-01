$(document).ready(function(){
    // --- Navigation & Scroll Logic ---
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // Initialize the solar calculator as soon as the page is ready
    if(document.getElementById('c-bill')) {
        solarCalc();
    }
});

$('body').scrollspy({
    target: '.navbar-fixed-top'
});

$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// ── RENOVA-BASED SOLAR CALCULATOR ──
// Constants (from Renova Calculator.tsx)
var TARIFA_KWH_MXN   = 1.35;
var TARIFA_KWH_USD   = 0.085;
var COSTO_POR_WATT   = 0.65;   // USD per watt
var TIPO_CAMBIO      = 18.5;   // MXN per USD
var KWHPORPANEL_550W = 69;     // kWh/month per 550W panel

var calcCurrency = 'MXN';

function solarFmt(n) {
    return '$' + Math.round(n).toLocaleString('es-MX');
}

function solarFmtUSD(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
}

function setCurrency(cur) {
    calcCurrency = cur;
    var btnMxn = document.getElementById('btn-mxn');
    var btnUsd = document.getElementById('btn-usd');
    if (btnMxn) btnMxn.className = cur === 'MXN' ? 'calc-currency-btn active' : 'calc-currency-btn';
    if (btnUsd) btnUsd.className = cur === 'USD' ? 'calc-currency-btn active' : 'calc-currency-btn';
    solarCalc();
}

function solarCalc() {
    var billEl  = document.getElementById('c-bill');
    var pctEl   = document.getElementById('c-pct');
    if (!billEl || !pctEl) return;

    var bill = parseInt(billEl.value) || 0;
    var pct  = parseInt(pctEl.value) || 0;

    // Update slider value labels
    var billValEl = document.getElementById('c-bill-val');
    if (billValEl) billValEl.textContent = calcCurrency === 'MXN' ? solarFmt(bill) : solarFmtUSD(bill);
    var pctValEl  = document.getElementById('c-pct-val');
    if (pctValEl)  pctValEl.textContent  = pct + '%';

    // Convert bill to MXN for calculation
    var gastoMXN = calcCurrency === 'MXN' ? bill : bill * TIPO_CAMBIO;

    // 1. Monthly kWh consumed = bill MXN / tariff per kWh
    var kwhConsumed  = gastoMXN / TARIFA_KWH_MXN;

    // 2. kWh to replace with solar = kWh consumed * (percentage / 100)
    var kwhToReplace = kwhConsumed * (pct / 100);

    // 3. Number of 550W panels needed
    var numPaneles = Math.ceil(kwhToReplace / KWHPORPANEL_550W);

    // 4. Total system watts
    var wattsTotal = numPaneles * 550;

    // 5. System cost
    var costoUSD = wattsTotal * COSTO_POR_WATT;
    var costoMXN = costoUSD * TIPO_CAMBIO;

    // 6. Savings
    var ahorroMensual = gastoMXN * (pct / 100);
    var ahorroAnual   = ahorroMensual * 12;

    // 7. ROI in years
    var roiAnios = ahorroAnual > 0 ? costoMXN / ahorroAnual : 0;
    var roi = roiAnios > 0 ? '~' + roiAnios.toFixed(1) + ' a\u00f1os' : '--';

    // 8. System size formatted
    var sistema = wattsTotal >= 1000
        ? (wattsTotal / 1000).toFixed(1) + ' kW'
        : Math.round(wattsTotal) + ' W';

    // 9. Environmental impact
    var kw   = wattsTotal / 1000;
    var co2  = (kw * 0.7).toFixed(1);
    var trees = Math.round(kw * 10);

    // ── Update metric cards ──
    var setText = function(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setText('c-costo-mxn',  solarFmt(costoMXN));
    setText('c-costo-usd',  solarFmtUSD(costoUSD));
    setText('c-paneles',    numPaneles);
    setText('c-sistema',    sistema);
    setText('c-monthly',    solarFmt(ahorroMensual));
    setText('c-annual',     solarFmt(ahorroAnual));
    setText('c-roi',        roi);
    setText('c-co2',        co2 + ' ton');

    var treesEl = document.getElementById('c-trees');
    if (treesEl) treesEl.textContent = 'equiv. a ' + trees + ' \u00e1rboles';

    // ── Info card ──
    setText('c-kwh-cons',    Math.round(kwhConsumed) + ' kWh');
    setText('c-kwh-replace', Math.round(kwhToReplace) + ' kWh');
    setText('c-cobertura',   pct + '%');

    // ── Comparison bars ──
    var remaining = gastoMXN - ahorroMensual;
    setText('c-lbl-cfe',   solarFmt(gastoMXN));
    setText('c-lbl-solar', solarFmt(remaining < 0 ? 0 : remaining));

    var barSolar = document.getElementById('c-bar-solar');
    if (barSolar) barSolar.style.width = Math.round(100 - pct) + '%';

    // ── Post preview ──
    var post =
        '\u2600\ufe0f \u00bfCU\u00c1NTO PUEDES AHORRAR CON PANELES SOLARES?\n\n' +
        'Si hoy pagas ' + solarFmt(gastoMXN) + ' al mes en luz (CFE), con un sistema solar puedes cubrir el ' + pct + '% de tu consumo.\n\n' +
        '\ud83d\udd22 Consumo mensual: ' + Math.round(kwhConsumed) + ' kWh\n' +
        '\u26a1 A cubrir con solar: ' + Math.round(kwhToReplace) + ' kWh\n' +
        '\ud83e\uddf1 Paneles necesarios: ' + numPaneles + ' de 550W\n' +
        '\ud83d\udd0c Sistema: ' + sistema + '\n' +
        '\ud83d\udcb0 Inversi\u00f3n estimada: ' + solarFmt(costoMXN) + ' MXN  (' + solarFmtUSD(costoUSD) + ' USD)\n\n' +
        'Eso significa:\n' +
        '\ud83d\udcb0 Ahorro mensual: ' + solarFmt(ahorroMensual) + '\n' +
        '\ud83d\udcc5 Ahorro anual:   ' + solarFmt(ahorroAnual) + '\n' +
        '\u23f1\ufe0f ROI:            ' + roi + '\n\n' +
        '\ud83c\udf3f Evitas ' + co2 + ' toneladas de CO\u2082 al a\u00f1o \u2014 equivalente a ' + trees + ' \u00e1rboles.\n\n' +
        '\u00bfQuieres saber cu\u00e1nto ahorrar\u00edas T\u00da exactamente?\n' +
        '\ud83d\udc49 Escr\u00edbenos por WhatsApp: wa.me/5214436942217\n' +
        '\ud83c\udf10 ecologicalconsciouness.netlify.app\n\n' +
        '#PanelesSolares #AhorroEnerg\u00e9tico #Energ\u00edaSolar #Michoac\u00e1n #EcologicalConsciousness #Sustentabilidad';

    var previewEl = document.getElementById('c-post-preview');
    if (previewEl) previewEl.textContent = post;

    // ── WhatsApp CTA link ──
    var waMsg = encodeURIComponent(
        'Hola Ecological Consciousness, me interesa una cotizaci\u00f3n. ' +
        'Mi gasto en CFE es de ' + solarFmt(gastoMXN) + ' MXN y quiero cubrir el ' + pct + '% con paneles solares. ' +
        'Seg\u00fan la calculadora necesito ' + numPaneles + ' paneles (' + sistema + ') ' +
        'con inversi\u00f3n estimada de ' + solarFmt(costoMXN) + ' MXN.'
    );
    var waLink = document.getElementById('c-wa-link');
    if (waLink) waLink.href = 'https://wa.me/5214436942217?text=' + waMsg;
}

function solarCopyPost() {
    var previewEl = document.getElementById('c-post-preview');
    if (!previewEl) return;
    var text = previewEl.textContent;
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.getElementById('c-copy-btn');
        if (btn) {
            btn.textContent = '\u00a1Copiado al portapapeles!';
            setTimeout(function() { btn.textContent = 'Copiar post para Facebook'; }, 2500);
        }
    });
}
