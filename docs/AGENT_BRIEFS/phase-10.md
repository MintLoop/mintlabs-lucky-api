# Phase 10 — Mobile Web App / PWA

**Goal:** Maximize traffic retention with installable app experience.

**Owner:** TBD  
**Branch:** `phase-10-pwa`  
**Status:** Blocked (wait for Phase 9)  
**Dependencies:** Phase 9 (Ecosystem Integration)

---

## 10.1 Progressive Web App (PWA)

### Deliverables

Convert Lucky into an installable PWA.

### PWA Features

| Feature | Description |
|---------|-------------|
| **Installable** | Add to home screen on iOS/Android |
| **Offline support** | Core functionality works offline |
| **App-like feel** | Standalone display mode |
| **Fast loading** | Service worker caching |
| **Push notifications** | Jackpot alerts (optional) |

### Implementation

- [ ] Create `manifest.json`
- [ ] Implement service worker
- [ ] Add offline fallback page
- [ ] Configure caching strategy
- [ ] Create app icons (all sizes)
- [ ] Add splash screens

### Manifest Configuration

```json
{
  "name": "Lucky Number Generator",
  "short_name": "Lucky",
  "description": "Generate lottery numbers with math-backed algorithms",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#6366f1",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Acceptance Criteria

- [ ] PWA installable on Chrome, Safari, Firefox
- [ ] Lighthouse PWA score = 100
- [ ] Offline page works
- [ ] Icons display correctly on all platforms
- [ ] Splash screen shows on launch

### Files to Create

**Frontend:**
- `public/manifest.json`
- `public/sw.js` — service worker
- `public/offline.html` — offline fallback
- `public/icons/` — all icon sizes
- `src/scripts/pwa.ts` — registration logic

---

## 10.2 Offline Saved Numbers

### Deliverables

Full offline access to saved numbers.

### Features

- [ ] View all saved picks offline
- [ ] Generate new numbers offline (local RNG)
- [ ] Sync when back online
- [ ] Clear offline indicator in UI

### Caching Strategy

```javascript
// Service worker cache strategy
const CACHE_NAME = 'lucky-v1';
const OFFLINE_URLS = [
  '/',
  '/offline.html',
  '/styles/global.css',
  '/scripts/lucky.js',
  '/games/powerball',
  '/games/megamillions'
];
```

### Acceptance Criteria

- [ ] Saved numbers accessible offline
- [ ] Generation works offline
- [ ] Sync indicator shows status
- [ ] No data loss on reconnect

### Files to Modify

**Frontend:**
- `public/sw.js` — cache saved numbers
- `src/scripts/storage.ts` — offline sync logic
- `src/components/OfflineIndicator.astro`

---

## 10.3 Push Notifications

### Deliverables

Optional push notifications for lottery updates.

### Notification Types

| Type | Trigger | Content |
|------|---------|---------|
| **Jackpot Alert** | Jackpot > threshold | "Powerball jackpot is $500M!" |
| **Draw Reminder** | Before draw time | "Powerball draw in 2 hours" |
| **Results** | After draw | "Last night's numbers: ..." |

### Implementation

- [ ] Set up push notification service (Firebase/OneSignal)
- [ ] Create notification preferences UI
- [ ] Implement subscription management
- [ ] Handle notification clicks

### Acceptance Criteria

- [ ] Notifications are opt-in only
- [ ] Easy to unsubscribe
- [ ] Notifications work on iOS and Android
- [ ] Clicking opens relevant page
- [ ] Frequency limits respected

### Files to Create

**Frontend:**
- `src/pages/settings/notifications.astro`
- `src/components/NotificationPrefs.astro`
- `src/scripts/notifications.ts`

**Backend:**
- `app/routes/notifications.py` — subscription management
- `app/services/push.py` — notification sending

---

## 10.4 App-Like Navigation

### Deliverables

Mobile-optimized navigation for app experience.

### Features

- [ ] Bottom navigation bar (mobile)
- [ ] Swipe gestures for navigation
- [ ] Pull-to-refresh on lists
- [ ] Smooth page transitions
- [ ] Haptic feedback on actions

### Navigation Items

| Icon | Label | Route |
|------|-------|-------|
| 🎲 | Generate | `/` |
| 📊 | Analysis | `/analysis` |
| 💾 | Saved | `/saved` |
| ⚙️ | Settings | `/settings` |

### Acceptance Criteria

- [ ] Bottom nav visible on mobile only
- [ ] Active state clearly shown
- [ ] Gestures feel native
- [ ] No janky transitions

### Files to Create

**Frontend:**
- `src/components/BottomNav.astro`
- `src/components/SwipeContainer.astro`
- `src/scripts/gestures.ts`
- `src/styles/app-navigation.css`

---

## 10.5 Performance Optimization for Mobile

### Deliverables

Mobile-specific performance enhancements.

### Optimizations

- [ ] Reduce JS bundle for mobile
- [ ] Lazy load non-critical features
- [ ] Optimize touch targets (48px minimum)
- [ ] Reduce network requests
- [ ] Implement skeleton loading

### Acceptance Criteria

- [ ] Mobile Lighthouse Performance > 90
- [ ] Time to Interactive < 3s on 3G
- [ ] No layout shifts during load
- [ ] Touch targets pass accessibility

### Files to Modify

**Frontend:**
- `astro.config.mjs` — mobile-specific builds
- `src/layouts/Layout.astro` — conditional loading
- `src/styles/global.css` — touch target sizes

---

## App Store Considerations (Future)

If PWA gains traction, consider native wrappers:

| Platform | Approach | Effort |
|----------|----------|--------|
| **Android** | TWA (Trusted Web Activity) | Low |
| **iOS** | PWA (Safari limitations) | N/A |
| **Both** | Capacitor/Ionic wrapper | Medium |

### Benefits of App Store Presence

- Discoverability
- Push notification reliability (iOS)
- App store reviews/ratings
- Potential for premium app

---

## Agent Assignment

| Task | Agent | Scope |
|------|-------|-------|
| 10.1 PWA Setup | Frontend Agent | manifest, service worker |
| 10.2 Offline | Frontend Agent | caching, sync |
| 10.3 Notifications | Full Stack | push service, UI |
| 10.4 Navigation | Frontend Agent | components, gestures |
| 10.5 Performance | Frontend Agent | optimization |

---

## Definition of Done

- [ ] PWA installable and working
- [ ] Lighthouse PWA score = 100
- [ ] Offline functionality tested
- [ ] Push notifications working (if implemented)
- [ ] Mobile navigation smooth
- [ ] Performance targets met
- [ ] `npm run test:e2e` passes
- [ ] PR reviewed and merged to `main`
- [ ] `docs/AGENT_TRACKER.md` updated

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| PWA installs | 100+ first month | Analytics |
| Return visits | +30% increase | Analytics |
| Offline usage | 10% of sessions | Service worker logs |
| Push opt-in | 15% of users | Notification service |
| App rating | 4.5+ stars | If in app stores |
