import { initLucky } from './lucky';

if (typeof document !== 'undefined') {
  console.log('[lucky] entry script loaded');
  const boot = () => {
    console.log('[lucky] initLucky invoked');
    initLucky();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
