import MODE_CONFIG from '../data/modeConfig';
import MODE_EDUCATION from '../data/modeEducation';

import { API_BASE } from './api-base';
const GAMES_ENDPOINT = `${API_BASE}/games`;
const GENERATE_ENDPOINT = `${API_BASE}/generate`;
const IS_DEV = import.meta.env.DEV;

let mounted = false;
let form: HTMLFormElement | null = null;
let out: HTMLElement | null = null;
let gameSel: HTMLSelectElement | null = null;
let factsEl: HTMLElement | null = null;
let games: any[] = [];
let submitBtn: HTMLButtonElement | null = null;
let isRateLimited = false;
let isClientCooldown = false;
let recentClicks: number[] = [];
const CLIENT_RATE_LIMIT = { max: 3, windowMs: 2000 };

// Toast notification helper (copied from lucky.ts)
function showToast(message: string, type: 'warning' | 'error' = 'warning', durationMs = 3000): void {
  let toast = document.getElementById('lucky-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lucky-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => {
    toast!.classList.remove('show');
  }, durationMs);
}

// Disable button temporarily during rate limit cooldown (copied from lucky.ts)
function handleRateLimitCooldown(retryAfterSec: number): void {
  if (isRateLimited || !submitBtn) return;
  isRateLimited = true;
  const originalText = submitBtn.textContent || 'Generate Numbers';
  submitBtn.disabled = true;
  submitBtn.textContent = `Wait ${retryAfterSec}s...`;
  
  let remaining = retryAfterSec;
  const interval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      submitBtn!.textContent = `Wait ${remaining}s...`;
    } else {
      clearInterval(interval);
      submitBtn!.disabled = false;
      submitBtn!.textContent = originalText;
      isRateLimited = false;
    }
  }, 1000);
}

function isClientRateLimited(): boolean {
  const now = Date.now();
  recentClicks = recentClicks.filter((t) => now - t < CLIENT_RATE_LIMIT.windowMs);
  if (recentClicks.length >= CLIENT_RATE_LIMIT.max) return true;
  recentClicks.push(now);
  return false;
}

function handleClientCooldown(durationMs = 1000): void {
  if (!submitBtn || isRateLimited || isClientCooldown) return;
  isClientCooldown = true;
  submitBtn.disabled = true;
  setTimeout(() => {
    isClientCooldown = false;
    if (!isRateLimited) submitBtn!.disabled = false;
  }, durationMs);
}

function readInitialGames(): any[] {
  const el = document.getElementById('initial-games');
  if (!el || !(el instanceof HTMLScriptElement)) return [];
  try {
    const parsed = JSON.parse(el.textContent || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderGameOptions(selectEl: HTMLSelectElement, list: any[]): void {
  selectEl.innerHTML = list
    .map((g: any) => `<option value="${g.code}">${g.name}</option>`)
    .join('');
}

async function fetchGames(): Promise<any[]> {
  try {
    const r = await fetch(GAMES_ENDPOINT, { method: 'GET', cache: 'no-cache' });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function buildBallRow(numbers: any[], bonus: any): string {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    const fallback = typeof numbers === 'string' ? numbers : '—';
    return `<div class="ln-ballRow"><span class="ln-ball ln-ball--empty">${fallback}</span></div>`;
  }

  const mainBalls = numbers.map((n, idx) => (
    `<span class="ln-ball" style="--delay: ${idx * 60}ms">${n}</span>`
  )).join('');
  const bonusBall = bonus
    ? `<span class="ln-ball ln-ball--bonus" style="--delay: ${(numbers.length) * 60}ms">${bonus}</span>`
    : '';

  return `<div class="ln-ballRow ln-ballRow--animate">${mainBalls}${bonusBall}</div>`;
}

function formatLastInfo(info: any): string {
  if (!info) return '';
  try {
    if (typeof info === 'string') return info;
    if (Array.isArray(info)) return info.join(', ');
    if (info.message) return String(info.message);
    if (info.latency_ms) return `Latency: ${info.latency_ms}ms`;
    return JSON.stringify(info);
  } catch {
    return String(info);
  }
}

export function initLuckyDemoBalls() {
  if (mounted) return;
  mounted = true;

  form = document.getElementById('genForm') as HTMLFormElement | null;
  out = document.getElementById('results') as HTMLElement | null;
  gameSel = document.querySelector('select[name="game"]') as HTMLSelectElement | null;
  factsEl = document.getElementById('facts') as HTMLElement | null;
  submitBtn = document.getElementById('generateBtn') as HTMLButtonElement | null
    || document.querySelector('button[type="submit"]') as HTMLButtonElement | null;

  if (!form || !out || !gameSel) return;

  // Conditional field toggles (copied from lucky.ts to preserve UX)
  try {
    const modeSelect = document.getElementById('modeSelect') as HTMLSelectElement | null;
    const cfgAny: any = MODE_CONFIG as any;
    const map: Record<string,string> = {
      sum_target: 'sumTargetField',
      birthday: 'birthdayField',
      lucky: 'luckyField',
      wheel: 'wheelField',
      zodiac: 'modeKeyContainer',
      gemstone: 'modeKeyContainer',
      star_sign: 'modeKeyContainer',
      jyotish: 'modeKeyContainer',
      chinese_zodiac: 'modeKeyContainer',
      favorite_color: 'modeKeyContainer',
    };
    function updateConditionalFields() {
      try {
        Object.values(map).forEach(id => { document.querySelectorAll('#' + id).forEach(el=>{ el.classList.add('hidden'); try { (el as HTMLElement).style.display='none'; } catch(e){ console.debug(e); } }); });
        const key = (modeSelect instanceof HTMLSelectElement) ? modeSelect.value : undefined;
        if (key && map[key]) {
          document.querySelectorAll('#' + map[key]).forEach(el=>{ el.classList.remove('hidden'); try { (el as HTMLElement).style.display='block'; } catch(e){ console.debug(e); } });

          if (map[key] === 'modeKeyContainer') {
            try {
              const select = document.getElementById('modeKeySelect') as HTMLSelectElement | null;
              if (select) {
                select.innerHTML = '';
                const cfg = cfgAny[String(key)];
                const items = (cfg && cfg.items) || [];
                const placeholder = document.createElement('option');
                placeholder.value = '';
                placeholder.textContent = 'Choose an option...';
                placeholder.disabled = true;
                placeholder.selected = true;
                select.appendChild(placeholder);

                items.forEach((it: any) => {
                  const opt = document.createElement('option');
                  opt.value = String(it.key);
                  opt.textContent = `${it.emoji ? it.emoji + ' ' : ''}${it.label}`;
                  select.appendChild(opt);
                });
                try { select.removeAttribute('disabled'); } catch(e){ console.debug(e); }
                try { select.setAttribute('required','required'); } catch(e){ console.debug(e); }
                try { select.setAttribute('data-populated', '1'); } catch(e){ console.debug(e); }
                
                select.addEventListener('change', () => {
                  const educationContainer = document.getElementById('themeEducation');
                  const educationText = document.getElementById('themeEducationText');
                  if (educationContainer && educationText && select.value) {
                    const modeType = String(key);
                    const optionKey = select.value;
                    const educationData = (MODE_EDUCATION as any)[modeType];
                    if (educationData && educationData[optionKey]) {
                      educationText.textContent = educationData[optionKey];
                      educationContainer.classList.remove('hidden');
                    } else {
                      educationContainer.classList.add('hidden');
                    }
                  }
                });
              }
            } catch(e){ console.debug(e); }
          }
        }
        return true;
      } catch (err) { console.debug(err); return false; }
    }
    try { if (modeSelect) modeSelect.addEventListener('change', updateConditionalFields); } catch(e) { console.debug(e); }
    try { (window as any)._genFormUpdate = updateConditionalFields; } catch(e) { console.debug(e); }
    try { (window as any).__GENFORM_READY = true; } catch(e) { console.debug(e); }
    try { updateConditionalFields(); } catch(e) { console.debug(e); }
  } catch (err) { try { (window as any).__GENFORM_ERROR = String(err); } catch(e) { console.debug(e); } }

  const _form = form;
  const _out = out;
  const _gameSel = gameSel;

  const initialGames = readInitialGames();
  if (initialGames.length > 0) {
    games = initialGames;
    renderGameOptions(_gameSel, games);
    void loadFacts(_gameSel.value);
    setTimeout(async () => {
      const refreshed = await fetchGames();
      if (refreshed.length) {
        games = refreshed;
        renderGameOptions(_gameSel, games);
        void loadFacts(_gameSel.value);
      }
    }, 0);
  }

  const ensureGames = async () => {
    if (games.length) return games;
    games = await fetchGames();
    if (games.length) {
      renderGameOptions(_gameSel, games);
      if (_gameSel.value) await loadFacts(_gameSel.value);
    }
    return games;
  };

  (async () => {
    await ensureGames();

    _gameSel.addEventListener('change', () => loadFacts(_gameSel.value));
    if (_gameSel.value) await loadFacts(_gameSel.value);

    _form.addEventListener('submit', async (e: Event) => {
      e.preventDefault();
      _out.innerHTML = '';

      if (isClientRateLimited()) {
        showToast('Easy tiger… try again in a sec.', 'warning', 2200);
        handleClientCooldown(1000);
        if (IS_DEV) {
          console.info('[Lucky] client rate-limit: blocked generate request');
        }
        return;
      }

      const fd = new FormData(_form);
      const game = String(fd.get('game') || '');
      const mode = String(fd.get('mode') || 'uniform');
      const sets = Math.min(10, Math.max(1, parseInt(String(fd.get('sets') || '1'), 10)));

      const modeMap: Record<string, string> = {
        uniform: 'random',
        spaced: 'spaced',
        random: 'random',
        balanced: 'balanced',
        odd_even_mix: 'odd_even_mix',
        sum_target: 'sum_target',
        pattern_avoid: 'pattern_avoid',
        hot: 'hot',
        cold: 'cold',
        birthday: 'birthday',
        lucky: 'lucky',
        wheel: 'wheel',
      };
      const mappedMode = modeMap[mode] || 'random';

      const payload: any = { game_code: game, mode: mappedMode, sets };
      if (mode === 'sum_target') {
        const targetSum = fd.get('target_sum');
        if (targetSum) payload.target_sum = parseInt(String(targetSum), 10);
      } else if (mode === 'birthday') {
        const birthDate = fd.get('birth_date');
        if (birthDate) payload.birth_date = String(birthDate);
      } else if (mode === 'lucky') {
        const luckyNumbers = fd.get('lucky_numbers');
        if (luckyNumbers) {
          const numbers = String(luckyNumbers)
            .split(',')
            .map((n) => parseInt(n.trim(), 10))
            .filter((n) => Number.isFinite(n));
          if (numbers.length > 0) payload.lucky_numbers = numbers;
        }
      } else if (mode === 'wheel') {
        const wheelType = fd.get('wheel_type');
        if (wheelType) payload.wheel_type = String(wheelType);
      } else if (['zodiac','gemstone','star_sign','jyotish','chinese_zodiac','favorite_color'].includes(mode)) {
        const mk = fd.get('mode_key');
        if (mk) payload.mode_key = String(mk);
      }

      const requests = Array.from({ length: sets }, () =>
        fetch(GENERATE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(async (res) => {
            if (IS_DEV) {
              console.info(`[Lucky] ${GENERATE_ENDPOINT} -> ${res.status}`);
            }
            const text = await res.text();
            if (!res.ok) {
              let msg: string = text || res.statusText || 'Unknown error';
              let retryAfter = 2;
              try {
                const json = JSON.parse(text || '{}');
                msg = json?.detail || json?.message || msg;
                if (json?.retry_after) retryAfter = parseInt(json.retry_after, 10) || 2;
              } catch {
                // ignore parse failures
              }
              const headerRetry = res.headers.get('Retry-After');
              if (headerRetry) retryAfter = parseInt(headerRetry, 10) || retryAfter;
              if (typeof msg !== 'string') msg = JSON.stringify(msg);
              return { ok: false, message: msg, status: res.status, retryAfter };
            }
            try {
              return { ok: true, data: JSON.parse(text || '{}') };
            } catch {
              return { ok: true, data: { message: text } };
            }
          })
          .catch((err) => ({ ok: false, message: String(err), status: 0 })),
      );

      const results = await Promise.all(requests);

      results.forEach((result, idx) => {
        if (!result.ok) {
          if (result.status === 429) {
            const retryAfter = (result as any).retryAfter || 2;
            showToast('Rate limited — try again in a moment.', 'warning', 2600);
            handleRateLimitCooldown(retryAfter);
            return;
          }
          _out.innerHTML += `<div class="text-red-400">Error ${result.status}: ${result.message}</div>`;
          return;
        }

        const d: any = (result as any).data;
        const modeDisplay = String(mode).replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

        let modeBadgeText = '';
        try {
          const actualMode = (d && d.mode) || mode;
          const key = (d && d.mode_key) || (fd.get('mode_key') ? String(fd.get('mode_key')) : null);
          if (key && actualMode) {
            const cfg = (MODE_CONFIG as any)[actualMode];
            if (cfg && cfg.items) {
              const found = cfg.items.find((it: any) => String(it.key) === String(key));
              if (found) modeBadgeText = `${found.emoji ? found.emoji + ' ' : ''}${found.label}`;
            }
          }
        } catch (e) { console.debug(e); }

        const ballRowHtml = buildBallRow(d.numbers, d.bonus);

        let lastInfoHtml = '';
        if (d.last_number_info) {
          const infoText = formatLastInfo(d.last_number_info);
          if (infoText && infoText !== '{}' && infoText !== 'null') {
            lastInfoHtml = `<div style="font-size: 0.56rem; color: var(--text-muted)">${infoText}</div>`;
          }
        }

        const singleOddsDisplay =
          d.odds ||
          (d.combined_odds
            ? `1 in ${Number(d.combined_odds).toLocaleString()}`
            : d.main_odds
            ? `1 in ${Number(d.main_odds).toLocaleString()}`
            : '—');
        const singlePct = Number(d.probability_percent || 0).toFixed(6);

        const gameCode = game || d.game || '';
        const oddsLinkHref = `/lottery-odds${gameCode ? `?game=${encodeURIComponent(gameCode)}` : ''}`;

        let combinedSetsHtml = '';
        if (d.combined_sets_odds) {
          const combinedOddsNum = Number(d.combined_sets_odds);
          const combinedOddsDisplay = Number.isFinite(combinedOddsNum)
            ? `1 in ${Math.round(combinedOddsNum).toLocaleString()}`
            : String(d.combined_sets_odds);
          const combinedPct = Number(d.combined_sets_probability_percent || 0).toFixed(8);
          combinedSetsHtml = `<div style="font-size: 0.56rem; color: var(--text-muted)">${sets} sets combined: <span class="font-semibold odds-number">${combinedOddsDisplay}</span> (${combinedPct}% chance)</div>`;
        }

        _out.innerHTML += `
          <div class="result-card ln-resultCard demo-card">
            <div class="ln-cardInner">
              <div class="ln-cardHeader">
                <div class="ln-hLeft text-sm" style="color: var(--text-secondary)">Set ${idx + 1}</div>
                <div class="ln-hRight text-sm" style="color: var(--text-secondary)">${modeDisplay}${modeBadgeText ? ` · <span class="text-xs" style="color: var(--text-muted)">${modeBadgeText}</span>` : ''}</div>
              </div>

              <div class="ln-cardCenter">
                ${ballRowHtml}
              </div>

              <div class="ln-cardFooter">
                <div class="ln-fLeft" style="line-height: 1.3; margin-top: 0.5rem;">
                  <div style="font-size: 0.56rem; color: var(--text-muted)">
                    Odds: <span class="font-semibold odds-number">${singleOddsDisplay}</span> (${singlePct}% chance)
                  </div>
                  ${combinedSetsHtml}
                  ${lastInfoHtml}
                </div>
                <div class="ln-fRight">
                  <a href="${oddsLinkHref}" class="odds-link">View full odds &amp; math →</a>
                </div>
              </div>
            </div>
          </div>`;
      });

      if (typeof window !== 'undefined' && (window as any).adsbygoogle && sets > 0) {
        try {
          (window as any).adsbygoogle.push({});
        } catch (e) {
          console.warn('Ad refresh failed:', e);
        }
      }
    });

    try {
      (_form as any).__handledByLucky = true;
    } catch (e) { console.debug(e); }
  })();
}

async function loadFacts(code: string) {
  const g = games.find((x: any) => x.code === code);
  if (!g) {
    if (factsEl) factsEl.innerHTML = '';
    return;
  }
  const white = `${g.white_min}–${g.white_max} × ${g.white_count}`;
  const bonus = g.bonus_min && g.bonus_max && g.bonus_count > 0
    ? `${g.bonus_min}–${g.bonus_max} × ${g.bonus_count}`
    : null;
  const oddsLinks: Record<string, string> = {
    powerball: 'https://www.powerball.com/powerball-prize-chart',
    megamillions: 'https://www.megamillions.com/How-to-Play.aspx',
    ca_superlotto: "https://www.calottery.com/en/draw-games/superlotto-plus#section-content-4-3",
    ca_fantasy5: "https://www.calottery.com/en/draw-games/fantasy-5#section-content-4-3",
    ca_daily3: "https://www.calottery.com/en/draw-games/daily-3#section-content-4-3",
    ca_daily4: "https://www.calottery.com/en/draw-games/daily-4#section-content-4-3",
    ny_take5: 'https://nylottery.ny.gov/draw-game?game=take5#odds_prizes',
    tx_lotto: 'https://www.texaslottery.com/export/sites/lottery/Games/Lotto_Texas/index.html#HowToPlay',
  };
  if (factsEl) {
    factsEl.innerHTML = `
      <div class="rounded-xl bg-slate-900/60 p-4 text-sm">
        <div><b>${g.name}</b></div>
        <div>Whites: ${white}</div>
        ${bonus ? `<div>Bonus: ${bonus}</div>` : ''}
        <a class="underline text-emerald-300" href="${oddsLinks[g.code] || '#'}" target="_blank" rel="noopener">Odds & rules</a>
      </div>`;
  }
}

// Apply monochrome fix from production lucky.ts for compatibility
const fixMonochromeButton = () => {
  const btn = document.getElementById('generateBtn') || document.querySelector('button[type="submit"]');
  if (btn && document.documentElement.dataset.theme === 'bw-light') {
    (btn as HTMLElement).style.color = '#000';
    (btn as HTMLElement).style.backgroundColor = '#fff';
  }
};

fixMonochromeButton();

const mo = new MutationObserver(fixMonochromeButton);
mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
