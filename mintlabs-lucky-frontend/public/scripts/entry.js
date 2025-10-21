import { initLucky } from './lucky.js';

if (typeof window !== 'undefined') {
  const boot = () => initLucky();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
