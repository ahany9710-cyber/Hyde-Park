import { initGtag } from './utils/gtag';

export function townsideHref(path: '' | 'thank-you' | 'privacy' = '') {
  return path ? `/el-patio-townside/${path}` : '/el-patio-townside';
}

export function setTownsideMeta() {
  initGtag();
  document.title = 'El Patio Townside | تسويق Flair Agency';
  const description = 'تسويق El Patio Townside بواسطة Flair Agency، وسيط عقاري. الصفحة ليست الموقع الرسمي لـ La Vista Developments.';
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute('content', description);
}
