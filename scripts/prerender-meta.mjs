import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://www.flair-newcairo.com';
const html = readFileSync('dist/index.html', 'utf8');

function esc(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function setMeta(source, attr, key, content) {
  const escaped = esc(content);
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (re.test(source)) return source.replace(re, `$1${escaped}$2`);
  return source.replace('</head>', `    <meta ${attr}="${key}" content="${escaped}" />\n  </head>`);
}

function render(page) {
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  out = setMeta(out, 'name', 'description', page.description);
  out = setMeta(out, 'property', 'og:title', page.ogTitle);
  out = setMeta(out, 'property', 'og:description', page.description);
  out = setMeta(out, 'property', 'og:image', page.image);
  out = setMeta(out, 'property', 'og:url', page.url);
  out = setMeta(out, 'property', 'og:site_name', page.siteName);
  out = setMeta(out, 'name', 'twitter:title', page.ogTitle);
  out = setMeta(out, 'name', 'twitter:description', page.description);
  out = setMeta(out, 'name', 'twitter:image', page.image);
  out = out.replace(
    /<link rel="icon"[^>]*>/,
    `<link rel="icon" type="image/svg+xml" href="${page.icon}" />`,
  );
  out = out.replace(/((?:src|href)=")\.\//g, '$1/');
  return out;
}

const pages = [
  {
    file: 'dist/mv-1-1.html',
    title: 'ماونتن ڤيو ١.١ | Flair Agency',
    ogTitle: 'ماونتن ڤيو ١.١ عبر Flair Agency',
    description:
      'صفحة تعريفية من Flair Agency عن ماونتن ڤيو ١.١. الأسعار وخطط السداد استرشادية وتُؤكد عند التواصل.',
    image: `${SITE}/og/mountain-view.jpg`,
    icon: '/favicon-mountain-view.svg',
    siteName: 'Mountain View',
    url: `${SITE}/mv-1-1`,
  },
  {
    file: 'dist/el-patio-townside.html',
    title: 'El Patio Townside | La Vista',
    ogTitle: 'El Patio Townside | La Vista',
    description:
      'صفحة تعريفية من Flair Agency عن El Patio Townside من La Vista. الأسعار وخطط السداد استرشادية وتُؤكد عند التواصل.',
    image: `${SITE}/og/lavista.jpg`,
    icon: '/favicon-lavista.svg',
    siteName: 'La Vista',
    url: `${SITE}/el-patio-townside`,
  },
];

for (const page of pages) {
  writeFileSync(page.file, render(page));
}
