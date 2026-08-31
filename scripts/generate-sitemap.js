import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://marvza.com';

const STATIC_ROUTES = [
  '/',
  '/services',
  '/how-it-works',
  '/for-families',
  '/for-nannies',
  '/about',
  '/faqs',
  '/contact',
  '/privacy-policy',
  '/cookie-policy',
  '/terms',
  '/safeguarding',
  '/complaints',
  '/apply'
];

function generateSitemap() {
  const servicesPath = path.resolve(__dirname, '../src/constants/services.js');
  const servicesContent = fs.readFileSync(servicesPath, 'utf-8');
  
  // Extract all slugs using regex
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  const serviceSlugs = [];
  
  while ((match = slugRegex.exec(servicesContent)) !== null) {
    serviceSlugs.push(match[1]);
  }
  
  const allUrls = [
    ...STATIC_ROUTES,
    ...serviceSlugs.map(slug => `/services/${slug}`)
  ];
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/services/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`✅ Sitemap generated at ${outputPath} with ${allUrls.length} URLs.`);
}

generateSitemap();
