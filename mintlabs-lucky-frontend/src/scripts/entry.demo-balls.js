import { initLuckyDemoBalls } from './lucky.demo-balls';
import { track } from './tracking';

if (typeof document !== 'undefined') {
  const boot = () => {
    initLuckyDemoBalls();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}

if (typeof window !== 'undefined') {
  try {
    window.track = track;
  } catch (err) { console.debug(err); }
}

if (typeof window !== 'undefined') {
  try {
    document.addEventListener('click', (ev) => {
      try {
        let tgt = ev.target;
        if (!(tgt instanceof Element)) tgt = (tgt && tgt.parentElement) || null;
        if (!tgt) return;
        const el = tgt.closest('[data-track-event]');
        if (!el) return;
        const eventName = el.dataset.trackEvent || 'link_click';
        let props = {};
        if (el.dataset.trackProps) {
          try { props = JSON.parse(el.dataset.trackProps || '{}'); } catch (err) { console.debug(err); props = {}; }
        }
        if (typeof track === 'function') track(eventName, { href: el.getAttribute && el.getAttribute('href'), ...props });
      } catch (err) { console.debug(err); }
    }, { passive: true });
  } catch (err) { console.debug(err); }
}
