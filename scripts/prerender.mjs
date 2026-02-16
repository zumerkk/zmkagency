#!/usr/bin/env node
/**
 * Post-build Pre-rendering Script for ZMK Agency
 * 
 * This script runs after `vite build` and uses Puppeteer to render each route
 * in a headless browser, then saves the fully-rendered HTML as static files.
 * 
 * Usage: node scripts/prerender.mjs
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DIST_DIR = join(__dirname, '..', 'dist');

// All routes to pre-render
const ROUTES = [
    '/',
    '/vision',
    '/services',
    '/pricing',
    '/contact',
    '/portfolio',
    '/blog',
    '/esnaf-paket',
    // Service detail pages
    '/services/software',
    '/services/web-seo',
    '/services/social-media',
    '/services/production',
    '/services/brand',
    '/services/data',
    '/services/printing',
    '/services/drone',
    '/services/3d-motion',
    '/services/consulting',
    '/services/ecommerce',
    '/services/pr',
    // Local SEO landing pages
    '/kirikkale-reklam-ajansi',
    '/kirikkale-web-tasarim',
    '/kirikkale-dijital-pazarlama-ajansi',
    '/kirikkale-google-ads-yonetimi',
    '/kirikkale-sosyal-medya-yonetimi',
    '/kirikkale-yazilim-gelistirme',
    '/kirikkale-e-ticaret-otomasyon',
    '/kirikkale-seo',
    '/kirikkale-dijital-donusum-danismanligi',
    '/kirikkale-instagram-reklam-yonetimi',
    '/kirikkale-360-dijital-ajans',
    '/kirikkale-mobil-uygulama-gelistirme',
    '/kirikkale-kurumsal-kimlik-tasarimi',
    '/kirikkale-drone-cekim-tanitim-filmi',
    '/kirikkale-siyasi-dijital-danismanlik',
    '/kirikkale-dijital-menu-tasarim',
    '/kirikkale-emlak-cekimi-reklam',
    '/kirikkale-oto-galeri-dijital-pazarlama',
    '/kirikkale-grafik-tasarim-matbaa',
    '/kirikkale-seo-danismanligi',
    '/kirikkale-saglik-turizmi-dijital-pazarlama',
    '/kirikkale-insaat-emlak-reklam-ajansi',
    '/kirikkale-sanayi-uretim-dijital-donusum',
    '/kirikkale-ozel-okul-kolej-reklam',
    '/kirikkale-avukat-hukuk-web-tasarim',
];

// Simple static file server for the dist directory
function createStaticServer(port) {
    return new Promise((resolve) => {
        const mime = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
        };

        const server = createServer((req, res) => {
            let url = req.url.split('?')[0];
            let filePath = join(DIST_DIR, url);

            // Try to serve the file directly
            try {
                if (existsSync(filePath) && !filePath.endsWith('/')) {
                    const ext = '.' + filePath.split('.').pop();
                    const contentType = mime[ext] || 'application/octet-stream';
                    const content = readFileSync(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                    return;
                }
            } catch (e) { /* fall through */ }

            // For all other requests, serve index.html (SPA fallback)
            const indexPath = join(DIST_DIR, 'index.html');
            if (existsSync(indexPath)) {
                const content = readFileSync(indexPath, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        });

        server.listen(port, () => {
            console.log(`📡 Static server running on http://localhost:${port}`);
            resolve(server);
        });
    });
}

async function prerender() {
    const PORT = 4173;
    const server = await createStaticServer(PORT);

    console.log('🚀 Starting pre-rendering...');
    console.log(`📋 ${ROUTES.length} routes to render\n`);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let successCount = 0;
    let errorCount = 0;

    // Process routes in batches of 4
    const BATCH_SIZE = 4;
    for (let i = 0; i < ROUTES.length; i += BATCH_SIZE) {
        const batch = ROUTES.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map(async (route) => {
            const page = await browser.newPage();
            try {
                const url = `http://localhost:${PORT}${route}`;
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

                // Wait extra time for React to render and animations to settle
                await page.waitForSelector('#root', { timeout: 10000 });
                await new Promise(r => setTimeout(r, 2000));

                // Get the fully rendered HTML
                const html = await page.content();

                // Determine output path
                const outputDir = route === '/'
                    ? DIST_DIR
                    : join(DIST_DIR, route);

                if (!existsSync(outputDir)) {
                    mkdirSync(outputDir, { recursive: true });
                }

                const outputPath = join(outputDir, 'index.html');
                writeFileSync(outputPath, html, 'utf-8');

                successCount++;
                console.log(`  ✅ ${route}`);
            } catch (err) {
                errorCount++;
                console.error(`  ❌ ${route}: ${err.message}`);
            } finally {
                await page.close();
            }
        }));
    }

    await browser.close();
    server.close();

    console.log(`\n🏁 Pre-rendering complete!`);
    console.log(`   ✅ Success: ${successCount}/${ROUTES.length}`);
    if (errorCount > 0) {
        console.log(`   ❌ Errors: ${errorCount}`);
    }
}

prerender().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
