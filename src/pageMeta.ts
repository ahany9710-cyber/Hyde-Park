type PageMeta = {
  title: string;
  description: string;
  image: string;
  icon: string;
  siteName: string;
};

const PAGES = {
  hyde: {
    title: 'One Hyde Park | Flair Agency',
    description:
      'صفحة تعريفية من Flair Agency عن مشروع One Hyde Park في هايد بارك التجمع الخامس. الأسعار وخطط السداد والمعلومات المعروضة استرشادية وتؤكد عند التواصل.',
    image: 'images/one-hyde-park/hero-family.png',
    icon: 'favicon.svg',
    siteName: 'One Hyde Park',
  },
  mountainView: {
    title: 'ماونتن ڤيو ١.١ | Flair Agency',
    description:
      'صفحة تعريفية من Flair Agency عن ماونتن ڤيو ١.١. الأسعار وخطط السداد استرشادية وتُؤكد عند التواصل. Flair Agency وسيط عقاري وليست ماونتن ڤيو.',
    image: 'projects/mountain-view-1-1/hero-signature.webp',
    icon: 'favicon-mountain-view.svg',
    siteName: 'Mountain View',
  },
  lavista: {
    title: 'El Patio Townside | La Vista',
    description:
      'صفحة تعريفية من Flair Agency عن El Patio Townside من La Vista. الأسعار وخطط السداد استرشادية وتُؤكد عند التواصل. لسنا الموقع الرسمي لـ La Vista Developments.',
    image: 'projects/el-patio-townside/images/gallery/evening.webp',
    icon: 'favicon-lavista.svg',
    siteName: 'La Vista',
  },
} satisfies Record<string, PageMeta>;

function pageForPath(pathname: string): PageMeta {
  const path = pathname.replace(/\/$/, '') || '/';
  if (path === '/mv-1-1' || path.startsWith('/mv-1-1/')) return PAGES.mountainView;
  if (path === '/el-patio-townside' || path.startsWith('/el-patio-townside/')) return PAGES.lavista;
  return PAGES.hyde;
}

function assetUrl(file: string): string {
  return new URL(file, document.baseURI).href;
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setIcon(href: string) {
  let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    document.head.appendChild(icon);
  }
  icon.type = 'image/svg+xml';
  icon.href = href;
}

export function applyPageMeta(pathname: string) {
  const page = pageForPath(pathname);
  const image = assetUrl(page.image);

  document.title = page.title;
  setMeta('meta[name="description"]', 'name', 'description', page.description);
  setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
  setMeta('meta[property="og:image"]', 'property', 'og:image', image);
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', page.siteName);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
  setIcon(assetUrl(page.icon));
}
