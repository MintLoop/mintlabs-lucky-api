var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/scripts/tracking.ts
var tracking_exports = {};
__export(tracking_exports, {
  track: () => track
});
function track(event, props = {}) {
  try {
    try {
      window.__LUCKY_EVENTS = window.__LUCKY_EVENTS || [];
      window.__LUCKY_EVENTS.push({ event, props, ts: Date.now() });
    } catch (err) {
    }
    if (typeof window.plausible === "function") {
      window.plausible(event, { props });
    }
    const umami = window.umami;
    if (umami) {
      if (typeof umami.track === "function") umami.track(event, props);
      else if (typeof umami === "function") umami(event, props);
    }
    if (!window.plausible && !window.umami) {
      console.debug("[track]", event, props);
    }
  } catch (e) {
    console.warn("[track:error]", e);
  }
}
var init_tracking = __esm({
  "src/scripts/tracking.ts"() {
    "use strict";
  }
});

// src/data/modeConfig.ts
var MODE_CONFIG = {
  zodiac: {
    label: "Zodiac",
    items: [
      { key: "aries", label: "Aries", emoji: "\u2648", seed: "zodiac:aries" },
      { key: "taurus", label: "Taurus", emoji: "\u2649", seed: "zodiac:taurus" },
      { key: "gemini", label: "Gemini", emoji: "\u264A", seed: "zodiac:gemini" },
      { key: "cancer", label: "Cancer", emoji: "\u264B", seed: "zodiac:cancer" },
      { key: "leo", label: "Leo", emoji: "\u264C", seed: "zodiac:leo" },
      { key: "virgo", label: "Virgo", emoji: "\u264D", seed: "zodiac:virgo" },
      { key: "libra", label: "Libra", emoji: "\u264E", seed: "zodiac:libra" },
      { key: "scorpio", label: "Scorpio", emoji: "\u264F", seed: "zodiac:scorpio" },
      { key: "sagittarius", label: "Sagittarius", emoji: "\u2650", seed: "zodiac:sagittarius" },
      { key: "capricorn", label: "Capricorn", emoji: "\u2651", seed: "zodiac:capricorn" },
      { key: "aquarius", label: "Aquarius", emoji: "\u2652", seed: "zodiac:aquarius" },
      { key: "pisces", label: "Pisces", emoji: "\u2653", seed: "zodiac:pisces" }
    ]
  },
  chinese_zodiac: {
    label: "Chinese Zodiac",
    items: [
      { key: "rat", label: "Rat", emoji: "\u{1F400}", seed: "chinese:rat" },
      { key: "ox", label: "Ox", emoji: "\u{1F402}", seed: "chinese:ox" },
      { key: "tiger", label: "Tiger", emoji: "\u{1F405}", seed: "chinese:tiger" },
      { key: "rabbit", label: "Rabbit", emoji: "\u{1F407}", seed: "chinese:rabbit" },
      { key: "dragon", label: "Dragon", emoji: "\u{1F409}", seed: "chinese:dragon" },
      { key: "snake", label: "Snake", emoji: "\u{1F40D}", seed: "chinese:snake" },
      { key: "horse", label: "Horse", emoji: "\u{1F40E}", seed: "chinese:horse" },
      { key: "goat", label: "Goat", emoji: "\u{1F410}", seed: "chinese:goat" },
      { key: "monkey", label: "Monkey", emoji: "\u{1F412}", seed: "chinese:monkey" },
      { key: "rooster", label: "Rooster", emoji: "\u{1F413}", seed: "chinese:rooster" },
      { key: "dog", label: "Dog", emoji: "\u{1F415}", seed: "chinese:dog" },
      { key: "pig", label: "Pig", emoji: "\u{1F416}", seed: "chinese:pig" }
    ]
  },
  favorite_color: {
    label: "Color",
    items: [
      { key: "blue", label: "Blue", emoji: "\u{1F535}", seed: "color:blue", color: "blue" },
      { key: "green", label: "Green", emoji: "\u{1F7E2}", seed: "color:green", color: "green" },
      { key: "red", label: "Red", emoji: "\u{1F534}", seed: "color:red", color: "red" },
      { key: "purple", label: "Purple", emoji: "\u{1F7E3}", seed: "color:purple", color: "purple" },
      { key: "black", label: "Black", emoji: "\u26AB", seed: "color:black", color: "gray-800" },
      { key: "yellow", label: "Yellow", emoji: "\u{1F7E1}", seed: "color:yellow", color: "yellow" }
    ]
  },
  gemstone: {
    label: "Gemstone",
    items: [
      { key: "ruby", label: "Ruby", emoji: "\u{1F48E}", seed: "gem:ruby" },
      { key: "sapphire", label: "Sapphire", emoji: "\u{1F537}", seed: "gem:sapphire" },
      { key: "emerald", label: "Emerald", emoji: "\u{1F49A}", seed: "gem:emerald" },
      { key: "opal", label: "Opal", emoji: "\u{1F308}", seed: "gem:opal" },
      { key: "topaz", label: "Topaz", emoji: "\u{1F7E6}", seed: "gem:topaz" },
      { key: "amethyst", label: "Amethyst", emoji: "\u{1F7EA}", seed: "gem:amethyst" }
    ]
  },
  jyotish: {
    label: "Jyotish",
    items: [
      { key: "ashwini", label: "Ashwini", emoji: "\u{1F31F}", seed: "jyotish:ashwini" },
      { key: "bharani", label: "Bharani", emoji: "\u{1F319}", seed: "jyotish:bharani" },
      { key: "krittika", label: "Krittika", emoji: "\u{1F525}", seed: "jyotish:krittika" },
      { key: "rohini", label: "Rohini", emoji: "\u{1F33E}", seed: "jyotish:rohini" },
      { key: "mrigashira", label: "Mrigashira", emoji: "\u{1F33F}", seed: "jyotish:mrigashira" },
      { key: "pushya", label: "Pushya", emoji: "\u{1F506}", seed: "jyotish:pushya" }
    ]
  },
  birthstone: {
    label: "Birth Month",
    items: [
      { key: "january", label: "January (Garnet)", emoji: "\u{1F48E}", seed: "birthstone:january" },
      { key: "february", label: "February (Amethyst)", emoji: "\u{1F49C}", seed: "birthstone:february" },
      { key: "march", label: "March (Aquamarine)", emoji: "\u{1F4A0}", seed: "birthstone:march" },
      { key: "april", label: "April (Diamond)", emoji: "\u{1F48E}", seed: "birthstone:april" },
      { key: "may", label: "May (Emerald)", emoji: "\u{1F49A}", seed: "birthstone:may" },
      { key: "june", label: "June (Pearl)", emoji: "\u{1F90D}", seed: "birthstone:june" },
      { key: "july", label: "July (Ruby)", emoji: "\u2764\uFE0F", seed: "birthstone:july" },
      { key: "august", label: "August (Peridot)", emoji: "\u{1F49A}", seed: "birthstone:august" },
      { key: "september", label: "September (Sapphire)", emoji: "\u{1F499}", seed: "birthstone:september" },
      { key: "october", label: "October (Opal)", emoji: "\u{1F308}", seed: "birthstone:october" },
      { key: "november", label: "November (Topaz)", emoji: "\u{1F7E1}", seed: "birthstone:november" },
      { key: "december", label: "December (Turquoise)", emoji: "\u{1FA75}", seed: "birthstone:december" }
    ]
  },
  rashi: {
    label: "Indian Zodiac (Rashi)",
    items: [
      { key: "mesha", label: "Mesha (Aries)", emoji: "\u2648", seed: "rashi:mesha" },
      { key: "vrishabha", label: "Vrishabha (Taurus)", emoji: "\u2649", seed: "rashi:vrishabha" },
      { key: "mithuna", label: "Mithuna (Gemini)", emoji: "\u264A", seed: "rashi:mithuna" },
      { key: "karka", label: "Karka (Cancer)", emoji: "\u264B", seed: "rashi:karka" },
      { key: "simha", label: "Simha (Leo)", emoji: "\u264C", seed: "rashi:simha" },
      { key: "kanya", label: "Kanya (Virgo)", emoji: "\u264D", seed: "rashi:kanya" },
      { key: "tula", label: "Tula (Libra)", emoji: "\u264E", seed: "rashi:tula" },
      { key: "vrishchika", label: "Vrishchika (Scorpio)", emoji: "\u264F", seed: "rashi:vrishchika" },
      { key: "dhanu", label: "Dhanu (Sagittarius)", emoji: "\u2650", seed: "rashi:dhanu" },
      { key: "makara", label: "Makara (Capricorn)", emoji: "\u2651", seed: "rashi:makara" },
      { key: "kumbha", label: "Kumbha (Aquarius)", emoji: "\u2652", seed: "rashi:kumbha" },
      { key: "meena", label: "Meena (Pisces)", emoji: "\u2653", seed: "rashi:meena" }
    ]
  },
  // star_sign is an alias of zodiac for now — kept for compatibility
  star_sign: {
    label: "Star Sign",
    items: []
  }
};
MODE_CONFIG.star_sign.items = MODE_CONFIG.zodiac.items.slice();
var modeConfig_default = MODE_CONFIG;

// src/scripts/lucky.ts
var metaEnv = import.meta?.env ?? {};
var globalApi = typeof window !== "undefined" ? window.__LUCKY_API_BASE : void 0;
var API_ENV = metaEnv.PUBLIC_API_BASE ?? globalApi ?? "";
var API = API_ENV && String(API_ENV).trim() !== "" ? String(API_ENV).replace(/\/$/, "") : typeof location !== "undefined" && location.hostname === "localhost" ? `${location.protocol}//localhost:8000` : "";
var GAMES_ENDPOINT = API ? `${API}/games` : "/games";
var GENERATE_ENDPOINT = API ? `${API}/generate` : "/generate";
var mounted = false;
var form = null;
var out = null;
var gameSel = null;
var factsEl = null;
var games = [];
var submitBtn = null;
var isRateLimited = false;
function showToast(message, type = "warning", durationMs = 3e3) {
  let toast = document.getElementById("lucky-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "lucky-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast toast-${type} show`;
  setTimeout(() => {
    toast.classList.remove("show");
  }, durationMs);
}
function handleRateLimitCooldown(retryAfterSec) {
  if (isRateLimited || !submitBtn) return;
  isRateLimited = true;
  const originalText = submitBtn.textContent || "Generate Numbers";
  submitBtn.disabled = true;
  submitBtn.textContent = `Wait ${retryAfterSec}s...`;
  let remaining = retryAfterSec;
  const interval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      submitBtn.textContent = `Wait ${remaining}s...`;
    } else {
      clearInterval(interval);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      isRateLimited = false;
    }
  }, 1e3);
}
function readInitialGames() {
  const el = document.getElementById("initial-games");
  if (!el || !(el instanceof HTMLScriptElement)) return [];
  try {
    const cfgAny = modeConfig_default;
    const parsed = JSON.parse(el.textContent || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function renderGameOptions(selectEl, list) {
  selectEl.innerHTML = list.map((g) => `<option value="${g.code}">${g.name}</option>`).join("");
}
async function fetchGames() {
  try {
    const r = await fetch(GAMES_ENDPOINT, { method: "GET", cache: "no-cache" });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
function initLucky() {
  if (mounted) return;
  mounted = true;
  form = document.getElementById("genForm");
  out = document.getElementById("results");
  gameSel = document.querySelector('select[name="game"]');
  factsEl = document.getElementById("facts");
  submitBtn = document.getElementById("generateBtn") || document.querySelector('button[type="submit"]');
  if (!form || !out || !gameSel) return;
  try {
    let updateConditionalFields2 = function() {
      try {
        Object.values(map).forEach((id) => {
          document.querySelectorAll("#" + id).forEach((el) => {
            el.classList.add("hidden");
            try {
              el.style.display = "none";
            } catch (e) {
            }
          });
        });
        const key = modeSelect instanceof HTMLSelectElement ? modeSelect.value : void 0;
        if (key && map[key]) {
          document.querySelectorAll("#" + map[key]).forEach((el) => {
            el.classList.remove("hidden");
            try {
              el.style.display = "block";
            } catch (e) {
            }
          });
          if (map[key] === "modeKeyContainer") {
            try {
              const select = document.getElementById("modeKeySelect");
              if (select) {
                select.innerHTML = "";
                const cfg = cfgAny[String(key)];
                const items = cfg && cfg.items || [];
                const placeholder = document.createElement("option");
                placeholder.value = "";
                placeholder.textContent = "Choose an option...";
                placeholder.disabled = true;
                placeholder.selected = true;
                select.appendChild(placeholder);
                items.forEach((it) => {
                  const opt = document.createElement("option");
                  opt.value = String(it.key);
                  opt.textContent = `${it.emoji ? it.emoji + " " : ""}${it.label}`;
                  select.appendChild(opt);
                });
                try {
                  select.removeAttribute("disabled");
                } catch (e) {
                }
                try {
                  select.setAttribute("required", "required");
                } catch (e) {
                }
                try {
                  select.setAttribute("data-populated", "1");
                } catch (e) {
                }
              }
            } catch (e) {
            }
          }
        }
        return true;
      } catch (err) {
        return false;
      }
    };
    var updateConditionalFields = updateConditionalFields2;
    const modeSelect = document.getElementById("modeSelect");
    const cfgAny = modeConfig_default;
    const map = {
      sum_target: "sumTargetField",
      birthday: "birthdayField",
      lucky: "luckyField",
      wheel: "wheelField",
      zodiac: "modeKeyContainer",
      gemstone: "modeKeyContainer",
      star_sign: "modeKeyContainer",
      jyotish: "modeKeyContainer",
      chinese_zodiac: "modeKeyContainer",
      favorite_color: "modeKeyContainer"
    };
    try {
      if (modeSelect) modeSelect.addEventListener("change", updateConditionalFields2);
    } catch (e) {
    }
    try {
      window._genFormUpdate = updateConditionalFields2;
    } catch (e) {
    }
    try {
      window.__GENFORM_READY = true;
    } catch (e) {
    }
    try {
      updateConditionalFields2();
    } catch (e) {
    }
  } catch (err) {
    try {
      window.__GENFORM_ERROR = String(err);
    } catch (e) {
    }
  }
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
    _gameSel.addEventListener("change", () => loadFacts(_gameSel.value));
    if (_gameSel.value) await loadFacts(_gameSel.value);
    _form.addEventListener("submit", async (e) => {
      e.preventDefault();
      _out.innerHTML = "";
      const fd = new FormData(_form);
      const game = String(fd.get("game") || "");
      const mode = String(fd.get("mode") || "uniform");
      const sets = Math.min(10, Math.max(1, parseInt(String(fd.get("sets") || "1"), 10)));
      const modeMap = {
        uniform: "random",
        spaced: "spaced",
        random: "random",
        balanced: "balanced",
        odd_even_mix: "odd_even_mix",
        sum_target: "sum_target",
        pattern_avoid: "pattern_avoid",
        hot: "hot",
        cold: "cold",
        birthday: "birthday",
        lucky: "lucky",
        wheel: "wheel"
      };
      const mappedMode = modeMap[mode] || "random";
      const payload = { game_code: game, mode: mappedMode, sets };
      if (mode === "sum_target") {
        const targetSum = fd.get("target_sum");
        if (targetSum) payload.target_sum = parseInt(String(targetSum), 10);
      } else if (mode === "birthday") {
        const birthDate = fd.get("birth_date");
        if (birthDate) payload.birth_date = String(birthDate);
      } else if (mode === "lucky") {
        const luckyNumbers = fd.get("lucky_numbers");
        if (luckyNumbers) {
          const numbers = String(luckyNumbers).split(",").map((n) => parseInt(n.trim(), 10)).filter((n) => Number.isFinite(n));
          if (numbers.length > 0) payload.lucky_numbers = numbers;
        }
      } else if (mode === "wheel") {
        const wheelType = fd.get("wheel_type");
        if (wheelType) payload.wheel_type = String(wheelType);
      } else if (["zodiac", "gemstone", "star_sign", "jyotish", "chinese_zodiac", "favorite_color"].includes(mode)) {
        const mk = fd.get("mode_key");
        if (mk) payload.mode_key = String(mk);
      }
      const requests = Array.from(
        { length: sets },
        () => fetch(GENERATE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).then(async (res) => {
          const text = await res.text();
          if (!res.ok) {
            let msg = text || res.statusText || "Unknown error";
            let retryAfter = 2;
            try {
              const json = JSON.parse(text || "{}");
              msg = json?.detail || json?.message || msg;
              if (json?.retry_after) retryAfter = parseInt(json.retry_after, 10) || 2;
            } catch {
            }
            const headerRetry = res.headers.get("Retry-After");
            if (headerRetry) retryAfter = parseInt(headerRetry, 10) || retryAfter;
            if (typeof msg !== "string") msg = JSON.stringify(msg);
            return { ok: false, message: msg, status: res.status, retryAfter };
          }
          try {
            return { ok: true, data: JSON.parse(text || "{}") };
          } catch {
            return { ok: true, data: { message: text } };
          }
        }).catch((err) => ({ ok: false, message: String(err), status: 0 }))
      );
      const results = await Promise.all(requests);
      results.forEach((result, idx) => {
        if (!result.ok) {
          if (result.status === 429) {
            const retryAfter = result.retryAfter || 2;
            showToast(`Slow down! Try again in ${retryAfter}s`, "warning", 2500);
            handleRateLimitCooldown(retryAfter);
            return;
          }
          _out.innerHTML += `<div class="text-red-400">Error ${result.status}: ${result.message}</div>`;
          return;
        }
        const d = result.data;
        const modeDisplay = String(mode).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        let modeBadgeHtml = "";
        try {
          const actualMode = d && d.mode || mode;
          const key = d && d.mode_key || (fd.get("mode_key") ? String(fd.get("mode_key")) : null);
          if (key && actualMode) {
            const cfg = modeConfig_default[actualMode];
            if (cfg && cfg.items) {
              const found = cfg.items.find((it) => String(it.key) === String(key));
              if (found) modeBadgeHtml = `<div class="text-xs mt-1">Mode: <span class="font-semibold">${found.emoji ? found.emoji + " " : ""}${found.label}</span></div>`;
            }
          }
        } catch (e2) {
        }
        const numbersHtml = Array.isArray(d.numbers) ? d.numbers.map((n) => `<span class="text-emerald-400 font-semibold">${n}</span>`).join(", ") : d.numbers || "\u2014";
        const bonusHtml = d.bonus ? `<span class="text-emerald-400 font-semibold">${d.bonus}</span>` : "";
        let lastInfoHtml = "";
        if (d.last_number_info) {
          let infoText = "";
          try {
            if (typeof d.last_number_info === "string") infoText = d.last_number_info;
            else if (Array.isArray(d.last_number_info)) infoText = d.last_number_info.join(", ");
            else if (d.last_number_info.message) infoText = String(d.last_number_info.message);
            else if (d.last_number_info.latency_ms) infoText = `Latency: ${d.last_number_info.latency_ms}ms`;
            else infoText = JSON.stringify(d.last_number_info);
          } catch {
            infoText = String(d.last_number_info);
          }
          if (infoText && infoText !== "{}" && infoText !== "null") {
            lastInfoHtml = `<div class="text-xs text-slate-400 mt-1">${infoText}</div>`;
          }
        }
        const singleOddsDisplay = d.odds || (d.combined_odds ? `1 in ${Number(d.combined_odds).toLocaleString()}` : d.main_odds ? `1 in ${Number(d.main_odds).toLocaleString()}` : "\u2014");
        const singlePct = Number(d.probability_percent || 0).toFixed(6);
        const gameCode = game || d.game || "";
        const oddsLinkHref = `/lottery-odds${gameCode ? `?game=${encodeURIComponent(gameCode)}` : ""}`;
        let combinedSetsHtml = "";
        if (d.combined_sets_odds) {
          const combinedOddsNum = Number(d.combined_sets_odds);
          const combinedOddsDisplay = Number.isFinite(combinedOddsNum) ? `1 in ${Math.round(combinedOddsNum).toLocaleString()}` : String(d.combined_sets_odds);
          const combinedPct = Number(d.combined_sets_probability_percent || 0).toFixed(8);
          combinedSetsHtml = `<div class="text-xs mt-1" style="color: var(--text-muted)">${sets} sets combined: <span class="font-semibold odds-number">${combinedOddsDisplay}</span> (${combinedPct}% chance)</div>`;
        }
        _out.innerHTML += `
            <div class="result-card">
              <div class="text-sm" style="color: var(--text-secondary)">Set ${idx + 1} \u2022 ${modeDisplay}</div>
            ${modeBadgeHtml}
              <div class="text-xl mt-1" style="color: var(--text-primary)">Numbers: <b>${numbersHtml}</b>${d.bonus ? ` | Bonus: <b>${bonusHtml}</b>` : ""}</div>
              <div class="text-xs mt-2" style="color: var(--text-muted)">
                Odds: <span class="font-semibold odds-number">${singleOddsDisplay}</span> (${singlePct}% chance)
              </div>
              <a href="${oddsLinkHref}" class="odds-link">View full odds &amp; math \u2192</a>
              ${combinedSetsHtml}
              ${lastInfoHtml}
            </div>`;
      });
      if (typeof window !== "undefined" && window.adsbygoogle && sets > 0) {
        try {
          window.adsbygoogle.push({});
        } catch (e2) {
          console.warn("Ad refresh failed:", e2);
        }
      }
    });
    try {
      _form.__handledByLucky = true;
    } catch {
    }
  })();
}
async function loadFacts(code) {
  const g = games.find((x) => x.code === code);
  if (!g) {
    if (factsEl) factsEl.innerHTML = "";
    return;
  }
  const white = `${g.white_min}\u2013${g.white_max} \xD7 ${g.white_count}`;
  const bonus = g.bonus_min && g.bonus_max && g.bonus_count > 0 ? `${g.bonus_min}\u2013${g.bonus_max} \xD7 ${g.bonus_count}` : null;
  const oddsLinks = {
    powerball: "https://www.powerball.com/powerball-prize-chart",
    megamillions: "https://www.megamillions.com/How-to-Play.aspx",
    ca_superlotto: "https://www.calottery.com/en/draw-games/superlotto-plus#section-content-4-3",
    ca_fantasy5: "https://www.calottery.com/en/draw-games/fantasy-5#section-content-4-3",
    ca_daily3: "https://www.calottery.com/en/draw-games/daily-3#section-content-4-3",
    ca_daily4: "https://www.calottery.com/en/draw-games/daily-4#section-content-4-3",
    ny_take5: "https://nylottery.ny.gov/draw-game?game=take5#odds_prizes",
    tx_lotto: "https://www.texaslottery.com/export/sites/lottery/Games/Lotto_Texas/index.html#HowToPlay"
  };
  if (factsEl) {
    factsEl.innerHTML = `
      <div class="rounded-xl bg-slate-900/60 p-4 text-sm">
        <div><b>${g.name}</b></div>
        <div>Whites: ${white}</div>
        ${bonus ? `<div>Bonus: ${bonus}</div>` : ""}
        <a class="underline text-emerald-300" href="${oddsLinks[g.code] || "#"}" target="_blank" rel="noopener">Odds & rules</a>
      </div>`;
  }
}
var fixMonochromeButton = () => {
  const btn = document.getElementById("generateBtn") || document.querySelector('button[type="submit"]');
  if (btn && document.documentElement.dataset.theme === "monochrome-light") {
    btn.style.color = "#000";
    btn.style.backgroundColor = "#fff";
  }
};
fixMonochromeButton();
var mo = new MutationObserver(fixMonochromeButton);
mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
try {
  Promise.resolve().then(() => (init_tracking(), tracking_exports)).then(({ track: track2 }) => {
    if (typeof window !== "undefined") {
      try {
        window.__LUCKY_EVENTS = window.__LUCKY_EVENTS || [];
        window.track = window.track || track2;
        document.addEventListener("click", (ev) => {
          try {
            let tgt = ev.target;
            if (!(tgt instanceof Element)) tgt = tgt && tgt.parentElement || null;
            if (!tgt) return;
            const el = tgt.closest && tgt.closest("[data-track-event]");
            if (!el) return;
            const eventName = el.dataset.trackEvent || "link_click";
            let props = {};
            if (el.dataset.trackProps) {
              try {
                props = JSON.parse(el.dataset.trackProps);
              } catch (e) {
                props = {};
              }
            }
            if (typeof window.track === "function") {
              try {
                window.track(eventName, { href: el.getAttribute && el.getAttribute("href"), ...props });
              } catch (e) {
              }
            }
          } catch (err) {
          }
        }, false);
      } catch (err) {
      }
    }
  }).catch(() => {
  });
} catch (err) {
}
export {
  initLucky
};
