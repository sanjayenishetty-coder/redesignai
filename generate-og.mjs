import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

const filePath = 'file://' + path.join(__dirname, 'og-image-source.html');
await page.goto(filePath, { waitUntil: 'networkidle0' });

// Wait for Google Fonts to load
await new Promise(r => setTimeout(r, 2000));

await page.screenshot({
  path: path.join(__dirname, 'public/assets/redesign-og.jpg'),
  type: 'jpeg',
  quality: 95,
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});

await browser.close();
console.log('OG image generated at public/assets/redesign-og.jpg');
