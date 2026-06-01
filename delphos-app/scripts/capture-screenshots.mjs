import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/screenshots');
mkdirSync(outDir, { recursive: true });

const sites = [
  { name: 'cv', url: 'https://arturooropeza.share.zrok.io/' },
  { name: 'renova', url: 'https://renovasolarmx.share.zrok.io/' },
  { name: 'eco', url: 'https://ecoconciencia.share.zrok.io/' },
  { name: 'const', url: 'https://construccionpro.share.zrok.io/' },
  { name: 'albanil', url: 'https://albanilpatio.share.zrok.io/' },
  { name: 'legal', url: 'https://legal.share.zrok.io/' },
];

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const site of sites) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    console.log(`Capturing ${site.name}...`);
    await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 30000 });
            await new Promise(r => setTimeout(r, 2000));
    const clip = { x: 0, y: 0, width: 1280, height: 700 };
    await page.screenshot({ path: `${outDir}/${site.name}.png`, clip });
    console.log(`  OK: ${site.name}.png`);
  } catch (e) {
    console.log(`  FAIL: ${site.name} — ${e.message}`);
  }
  await page.close();
}

await browser.close();
console.log('Done.');
