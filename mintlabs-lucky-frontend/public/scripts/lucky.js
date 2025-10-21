// compiled lucky script
var API_ENV = typeof window !== 'undefined' && window.__LUCKY_API_BASE !== void 0 ? window.__LUCKY_API_BASE : '';
var API = API_ENV && String(API_ENV).trim() !== '' ? String(API_ENV).replace(/\/$/, '') : typeof location !== 'undefined' && location.hostname === 'localhost' ? `${location.protocol}//localhost:8000` : '';
var GAMES_ENDPOINT = API ? `${API}/games` : "/games";
var GENERATE_ENDPOINT = API ? `${API}/generate` : "/generate";
var mounted = false;
var form = null;
var out = null;
var gameSel = null;
var factsEl = null;
var games = [];
function readInitialGames() {
  const el = document.getElementById("initial-games");
  if (!el || !(el instanceof HTMLScriptElement)) return [];
  try {
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
  if (!form || !out || !gameSel) return;
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
            try {
              const json = JSON.parse(text || "{}");
              msg = json?.detail || json?.message || msg;
            } catch {
            }
            if (typeof msg !== "string") msg = JSON.stringify(msg);
            return { ok: false, message: msg, status: res.status };
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
          _out.innerHTML += `<div class="text-red-400">Error ${result.status}: ${result.message}</div>`;
          return;
        }
        const d = result.data;
        const modeDisplay = String(mode).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
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
              <div class="text-xl mt-1" style="color: var(--text-primary)">Numbers: <b>${numbersHtml}</b>${d.bonus ? ` | Bonus: <b>${bonusHtml}</b>` : ""}</div>
              <div class="text-xs mt-2" style="color: var(--text-muted)">Single draw: <span class="font-semibold odds-number">${singleOddsDisplay}</span> (${singlePct}% chance)</div>
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
export {
  initLucky
};
