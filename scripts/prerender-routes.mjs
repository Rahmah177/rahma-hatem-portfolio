// Runs after `vite build` (npm "postbuild") when building for GitHub Pages (PAGES_BASE is set).
// GitHub Pages has no server-side routing: before this script, /work/<slug> was served from 404.html
// with HTTP status 404. This writes a real HTML file for every route, so each URL returns 200 OK with
// its own title, description, canonical URL and social-sharing (Open Graph / Twitter) tags.
// The page body and app are identical to index.html, so the design and content do not change.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const base = process.env.PAGES_BASE;
if (!base) { console.log('prerender-routes: PAGES_BASE not set, skipping (non-Pages build).'); process.exit(0); }

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const SITE = (process.env.SITE_URL || `https://rahmah177.github.io${base}`).replace(/\/+$/, '');
const NAME = 'Rahma Hatem';
const OG_IMAGE = `${SITE}/brand/og-image.jpg`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Read project slugs, names, categories and summaries from src/data/projects.ts (same text the app shows).
const src = fs.readFileSync(path.join(root, 'src/data/projects.ts'), 'utf8');
const projects = [];
for (const m of src.matchAll(/\{\s*slug:\s*'([^']+)',[\s\S]*?name:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)',[\s\S]*?summary:\s*'([^']+)'/g)) {
  const [, slug, name, category, summary] = m;
  if (!projects.some(p => p.slug === slug)) projects.push({ slug, name, category, summary: summary.replace(/\\'/g, "'") });
}
if (!projects.length) throw new Error('prerender-routes: no projects found in src/data/projects.ts');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function page({ title, description, url, type = 'website' }) {
  let html = template;
  const setMeta = (attr, key, value) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
    const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
    html = re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
  };
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  setMeta('name', 'description', description);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', NAME);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', OG_IMAGE);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', `${NAME} | Product Designer`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', OG_IMAGE);
  html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
  html = html.replace('</head>', `    <link rel="canonical" href="${esc(url)}" />\n  </head>`);
  return html;
}

// Home page (keeps its existing title and description; adds absolute URLs + canonical)
const homeTitle = (template.match(/<title>([^<]*)<\/title>/) || [])[1];
const homeDesc = (template.match(/<meta name="description" content="([^"]*)"/) || [])[1];
const homeOgDesc = (template.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] || homeDesc;
let home = page({ title: homeTitle, description: homeDesc, url: `${SITE}/` });
home = home.replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${homeDesc}" />`)
  .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${homeOgDesc}" />`)
  .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${homeOgDesc}" />`);
fs.writeFileSync(path.join(dist, 'index.html'), home);
// Unknown URLs still load the app (which shows its Not Found page), but keep a real 404 status.
fs.writeFileSync(path.join(dist, '404.html'), home.replace(/\s*<link rel="canonical"[^>]*>/, '').replace(/<meta property="og:url"[^>]*>\s*/, ''));

// One real file per project: dist/work/<slug>.html → served by GitHub Pages at /work/<slug> with 200 OK.
fs.mkdirSync(path.join(dist, 'work'), { recursive: true });
for (const p of projects) {
  const url = `${SITE}/work/${p.slug}`;
  fs.writeFileSync(path.join(dist, 'work', `${p.slug}.html`), page({ title: `${p.name} | ${NAME}`, description: p.summary, url, type: 'article' }));
}

// Sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE}/`, ...projects.map(p => `${SITE}/work/${p.slug}`)];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').trimEnd();
if (!/Sitemap:/i.test(robots)) fs.writeFileSync(path.join(dist, 'robots.txt'), `${robots}\n\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

console.log(`prerender-routes: wrote ${projects.length} project pages (${projects.map(p => p.slug).join(', ')}), sitemap.xml, 404.html`);
