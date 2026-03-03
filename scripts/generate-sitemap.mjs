import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const BASE = '/blog/';

// Read posts manifest
const postsJson = readFileSync(resolve(distDir, 'posts', 'index.json'), 'utf-8');
const posts = JSON.parse(postsJson);

const SITE_URL = 'https://zaak-codes.github.io/blog';

const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/posts', priority: '0.9', changefreq: 'daily' },
    { loc: '/about-us', priority: '0.5', changefreq: 'monthly' },
];

const postRoutes = posts.map((post) => ({
    loc: `/posts/${post.slug}`,
    lastmod: post.date,
    priority: '0.7',
    changefreq: 'weekly',
}));

const allRoutes = [...staticRoutes, ...postRoutes];
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
        .map(
            (r) => `  <url>
    <loc>${SITE_URL}/#${r.loc}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
        )
        .join('\n')}
</urlset>
`;

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap);
console.log(`✓ sitemap.xml generated with ${allRoutes.length} URLs`);
