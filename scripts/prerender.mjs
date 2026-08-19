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
    // Canonical Turkish routes. The old English paths (/vision, /services,
    // /pricing, /contact, /portfolio) are intentionally NOT listed: they are
    // 301 redirects in vercel.json, so prerendering them would create indexable
    // duplicates of pages that should only exist at one URL.
    '/hakkimizda',
    '/hizmetler',
    '/fiyatlar',
    '/iletisim',
    '/calismalar',
    '/marka',
    '/dijital',
    '/yazilim',
    '/studio',
    '/zmk-360',
    '/blog',
    '/esnaf-paket',
    '/zmk-spesiyel',
    // Service detail pages (kanonik slug'lar — NewServiceDetail veri tablosuyla eşleşir)
    '/services/kurumsal-web-sitesi',
    '/services/e-ticaret-cozumleri',
    '/services/ozel-yazilim-app',
    '/services/reklam-yonetimi-google',
    '/services/reklam-yonetimi-sosyal',
    '/services/lokal-seo',
    '/services/ulusal-global-seo',
    '/services/tanitim-filmi',
    '/services/urun-fotografciligi',
    '/services/marka-kurumsal',
    '/services/360-retainer-startup-growth',
    '/services/360-retainer-market-domination',
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

        // Snapshot the clean SPA shell BEFORE any route gets prerendered.
        // Routes write over dist/*.html as they render; serving those snapshots
        // as the fallback would leak the previous route's title/meta into later ones.
        const spaShell = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

        const server = createServer((req, res) => {
            let url = req.url.split('?')[0];
            let filePath = join(DIST_DIR, url);

            // Try to serve real static assets directly (never prerendered .html)
            try {
                if (existsSync(filePath) && !filePath.endsWith('/') && !filePath.endsWith('.html')) {
                    const ext = '.' + filePath.split('.').pop();
                    const contentType = mime[ext] || 'application/octet-stream';
                    const content = readFileSync(filePath);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                    return;
                }
            } catch (e) { /* fall through */ }

            // For all route requests, serve the clean SPA shell
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(spaShell);
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

    // Default title from the clean shell — used to detect when Helmet has flushed
    const shellHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
    const defaultTitle = (shellHtml.match(/<title>([^<]*)<\/title>/) || [])[1] || '';

    console.log('🚀 Starting pre-rendering...');
    console.log(`📋 ${ROUTES.length} routes to render\n`);

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // Parallel tabs: keep rAF/timers alive in background pages,
            // otherwise react-helmet-async never flushes <title>/<meta>
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding'
        ]
    });

    let successCount = 0;
    let errorCount = 0;

    // Process routes in batches of 4
    // Sequential rendering: parallel tabs starve react-helmet's commit cycle,
    // so <title>/<meta> stay stale. One page at a time flushes instantly.
    const BATCH_SIZE = 1;
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

                // Wait for react-helmet to flush the route's own <title>
                // (only '/' legitimately keeps the default title)
                if (route !== '/' && defaultTitle) {
                    await page.waitForFunction(
                        (def) => document.title && document.title !== def,
                        { timeout: 8000 },
                        defaultTitle
                    ).catch(() => console.warn(`  ⚠️ ${route}: Helmet title not flushed, default kept`));
                }

                // Scroll the full page before serialising.
                //
                // Scroll-revealed sections are hidden until an
                // IntersectionObserver fires. Serialising without scrolling
                // would bake `opacity: 0` into the static HTML for everything
                // below the fold. This also forces lazy-loaded images to
                // resolve so their markup is captured.
                await page.evaluate(async () => {
                    // The site sets `html { scroll-behavior: smooth }`. Left on,
                    // every scrollTo below would start an animation that the next
                    // call retargets, so the page would never actually traverse
                    // and the reveals would never fire. Force instant scrolling.
                    const root = document.documentElement;
                    const previous = root.style.scrollBehavior;
                    root.style.scrollBehavior = 'auto';

                    const step = window.innerHeight * 0.8;
                    const height = () => root.scrollHeight;
                    for (let y = 0; y < height(); y += step) {
                        window.scrollTo(0, y);
                        await new Promise((r) => setTimeout(r, 120));
                    }
                    window.scrollTo(0, 0);
                    root.style.scrollBehavior = previous;
                });
                await new Promise((r) => setTimeout(r, 600));

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

    // Generate sitemap.xml
    console.log('\n🗺️ Generating sitemap.xml...');
    const baseUrl = 'https://zmkagency.com';
    const date = new Date().toISOString().split('T')[0];
    
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    ROUTES.forEach(route => {
        // Priority logic: homepage is 1.0, main pages 0.9, services/seo pages 0.8
        let priority = '0.8';
        if (route === '/') priority = '1.0';
        else if (['/services', '/contact', '/portfolio', '/blog'].includes(route)) priority = '0.9';
        
        sitemapXml += `  <url>\n`;
        sitemapXml += `    <loc>${baseUrl}${route === '/' ? '' : route}</loc>\n`;
        sitemapXml += `    <lastmod>${date}</lastmod>\n`;
        sitemapXml += `    <changefreq>weekly</changefreq>\n`;
        sitemapXml += `    <priority>${priority}</priority>\n`;
        sitemapXml += `  </url>\n`;
    });
    
    sitemapXml += `</urlset>`;
    
    const sitemapPath = join(DIST_DIR, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemapXml, 'utf-8');
    console.log(`  ✅ Saved sitemap to ${sitemapPath}`);

    // Update robots.txt to point to sitemap if it exists, otherwise create it
    const robotsPath = join(DIST_DIR, 'robots.txt');
    const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
    writeFileSync(robotsPath, robotsContent, 'utf-8');

    console.log(`\n🏁 Pre-rendering and SEO generation complete!`);
    console.log(`   ✅ Success: ${successCount}/${ROUTES.length}`);
    if (errorCount > 0) {
        console.log(`   ❌ Errors: ${errorCount}`);
    }
}

prerender().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
