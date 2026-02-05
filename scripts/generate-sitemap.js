import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { localSeoData } from '../src/data/localSeoData.js';
import { blogData } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://zmkagency.com';
const PUBLIC_DIR = path.join(__dirname, '../public');

// Static Routes with priorities
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.8 },
  { url: '/vision', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog', changefreq: 'weekly', priority: 0.8 },
  // Service Pages (Static)
  { url: '/services/software', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/web-seo', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/social-media', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/production', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/brand', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/data', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/printing', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/drone', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/3d-motion', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/consulting', changefreq: 'monthly', priority: 0.8 },
  { url: '/services/ecommerce', changefreq: 'monthly', priority: 0.9 },
  { url: '/services/pr', changefreq: 'monthly', priority: 0.8 },
  // Legal
  { url: '/legal/privacy', changefreq: 'yearly', priority: 0.3 },
  { url: '/legal/terms', changefreq: 'yearly', priority: 0.3 },
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add Static Routes
  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  // Add Local Landing Pages from Data
  localSeoData.forEach(page => {
    xml += `
  <url>
    <loc>${BASE_URL}/${page.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Add Blog Posts from Data
  blogData.forEach(post => {
    xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`✅ Sitemap created at ${sitemapPath} with ${staticRoutes.length + localSeoData.length + blogData.length} URLs.`);
};

// Execute
generateSitemap();
