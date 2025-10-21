// FILE: src/scripts/tracking.ts
// Lightweight wrapper for Plausible + Umami
type Props = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, props: Props = {}) {
  try {
    // Plausible
    if (typeof (window as any).plausible === "function") {
      (window as any).plausible(event, { props });
    }
    // Umami (v2+)
    const umami = (window as any).umami;
    if (umami) {
      if (typeof umami.track === "function") umami.track(event, props);
      else if (typeof umami === "function") umami(event, props); // older shim
    }
    // Dev fallback
    if (!(window as any).plausible && !(window as any).umami) {
      console.debug("[track]", event, props);
    }
  } catch (e) {
    console.warn("[track:error]", e);
  }
}
