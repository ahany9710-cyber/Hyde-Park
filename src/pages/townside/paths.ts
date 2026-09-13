import { initGtag } from './utils/gtag';

export function townsideHref(path: '' | 'thank-you' | 'privacy' = '') {
  return path ? `/el-patio-townside/${path}` : '/el-patio-townside';
}

export function setTownsideMeta() {
  initGtag();
}
