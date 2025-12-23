import { initLucky } from './lucky';
import { track } from './tracking';

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

// Expose a safe global for quick testing / non-invasive instrumentation
if (typeof window !== 'undefined') {
  try {
    (window).track = track;
  } catch (err) {
    console.debug(err);
  }
}

// Global delegation: attach tracking handlers for any element with data-track-event.
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
          try { props = JSON.parse(el.dataset.trackProps); } catch (err) { console.debug(err); props = {}; }
        }
        // avoid sending user content
        if (typeof track === 'function') track(eventName, { href: el.getAttribute && el.getAttribute('href'), ...props });
      } catch (err) {
        console.debug(err);
      }
    }, { passive: true });
  } catch (err) { console.debug(err); }
}
