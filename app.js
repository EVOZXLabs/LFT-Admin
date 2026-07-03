// ── Launch Future · admin console app ──────────────────────────────────
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.13.4/+esm";

const CFG    = window.LFT_CONFIG;
const SCHEMA = window.LFT_SCHEMA;

const ABI_MAP = {
  token:    window.LaunchFutureTokenABI,
  exchange: window.LaunchFutureExchangeABI,
  deployer: window.LFTDeployerABI,
  factory:  window.LFTFactoryABI
};

// `provider` is a READ-ONLY provider available as soon as the page loads
// (from the injected wallet, without requesting accounts, or from an
// optional public RPC configured in config.js). This is what fixes stats
// "disappearing" every session: reads no longer depend on the wallet
// being connected. `signer` is only set once the user clicks Connect,
// and is required for anything that sends a transaction.
let provider   = null;
let signer     = null;
let signerAddr = null;

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const connectBtn   = $("#connectBtn");
const walletPill   = $("#walletPill");
const networkPill  = $("#networkPill");
const rpcPill      = $("#rpcPill");
const logEl        = $("#log");
const refreshAllBtn = $("#refreshAllBtn");
const clearLogBtn   = $("#clearLogBtn");
const soundToggleBtn = $("#soundToggleBtn");

/* ── tiny sound engine (no external audio files, all synthesized) ──
   A few short, non-annoying cues for tx feedback. Muted by default
   state is remembered in localStorage. */
const SOUND_KEY = "lft_admin_sound_v1";
let audioCtx = null;
let soundOn  = (localStorage.getItem(SOUND_KEY) ?? "on") === "on";

function ensureAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, delay, duration, type = "sine", gain = 0.05) {
  const ctx = ensureAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g   = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + delay;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function playSuccessChime() {
  if (!soundOn) return;
  playTone(523.25, 0,    0.16, "triangle", 0.05); // C5
  playTone(659.25, 0.08, 0.16, "triangle", 0.05); // E5
  playTone(783.99, 0.16, 0.22, "triangle", 0.06); // G5
}
function playErrorBlip() {
  if (!soundOn) return;
  playTone(220, 0,    0.12, "square", 0.04);
  playTone(160, 0.08, 0.18, "square", 0.04);
}
function playPendingTick() {
  if (!soundOn) return;
  playTone(440, 0, 0.06, "sine", 0.03);
}
function playClick() {
  if (!soundOn) return;
  playTone(880, 0, 0.04, "sine", 0.025);
}

function setSoundUI() {
  soundToggleBtn.textContent = soundOn ? "🔊" : "🔇";
  soundToggleBtn.classList.toggle("sound-on", soundOn);
  soundToggleBtn.title = soundOn ? "Sound on — click to mute" : "Sound muted — click to unmute";
}
soundToggleBtn?.addEventListener("click", () => {
  soundOn = !soundOn;
  localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
  setSoundUI();
  if (soundOn) playClick();
});
setSoundUI();

/* ── persistence (localStorage) ──────────────────────────────
   Two things are cached across page loads / reconnects:
   - the activity log, so "what did I already set" is never lost
   - the last known value of every read/stat, shown instantly (marked
     "cached") while a fresh on-chain read is in flight
*/
const LOG_KEY   = "lft_admin_log_v1";
const CACHE_KEY = "lft_admin_cache_v1";
const LOG_LIMIT = 300;

function loadLog() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; }
  catch { return []; }
}
function saveLog(rows) {
  try { localStorage.setItem(LOG_KEY, JSON.stringify(rows.slice(0, LOG_LIMIT))); }
  catch { /* storage full/unavailable — non-fatal */ }
}
function loadCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; }
  catch { return {}; }
}
function saveCacheEntry(cacheKey, text) {
  try {
    const cache = loadCache();
    cache[cacheKey] = { text, ts: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* non-fatal */ }
}

/* ── helpers ──────────────────────────────────────────────── */
function short(addr) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

function log(message, kind = "info", txHash = null, persist = true) {
  const time = new Date().toLocaleTimeString();
  renderLogRow({ message, kind, txHash, time }, /* animate */ true);
  if (persist) {
    const rows = loadLog();
    rows.unshift({ message, kind, txHash, time, at: Date.now() });
    saveLog(rows);
  }
  if (kind === "ok")      playSuccessChime();
  else if (kind === "error")   playErrorBlip();
  else if (kind === "pending") playPendingTick();
}

function renderLogRow({ message, kind, txHash, time }, animate = false) {
  const row  = document.createElement("div");
  row.className = `log-row log-${kind}` + (animate ? " log-row-new" : "");
  let html   = `<span class="log-time">${time}</span><span class="log-msg">${message}</span>`;
  if (txHash) {
    const link = CFG.explorerUrl
      ? `<a href="${CFG.explorerUrl}/tx/${txHash}" target="_blank" rel="noopener">${short(txHash)} ↗</a>`
      : `<span class="log-hash">${short(txHash)}</span>`;
    html += ` ${link}`;
  }
  row.innerHTML = html;
  logEl.insertBefore(row, logEl.firstChild);
}

function restoreLog() {
  const rows = loadLog();
  // oldest first into the DOM since renderLogRow prepends each one; not
  // animated since this is just restoring history, not new activity
  [...rows].reverse().forEach(r => renderLogRow(r, false));
}

function fmtValue(raw, format) {
  if (raw === null || raw === undefined) return "—";
  if (format === "address") return raw === ethers.ZeroAddress ? "0x0 (none)" : raw;
  if (format === "bool")    return raw ? "Yes" : "No";
  if (format === "token") {
    try { return ethers.formatUnits(raw, 18) + " (18 dec)"; }
    catch { return raw.toString(); }
  }
  if (typeof raw === "bigint") return raw.toString();
  if (Array.isArray(raw))      return raw.map(v => fmtValue(v)).join(", ");
  return raw.toString();
}

function jsonStringifySafe(val) {
  return JSON.stringify(val, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
}

function parseInput(rawStr, type) {
  rawStr = (rawStr ?? "").trim();
  if (type === "bool")    return rawStr === "true" || rawStr === "1" || rawStr === "yes";
  if (type.endsWith("[]")) {
    const base = type.slice(0, -2);
    return rawStr.split(",").map(s => s.trim()).filter(s => s !== "").map(s => parseInput(s, base));
  }
  if (type.startsWith("uint") || type.startsWith("int")) {
    if (rawStr === "") throw new Error("Missing numeric value");
    return BigInt(rawStr);
  }
  if (type === "address") {
    if (!ethers.isAddress(rawStr)) throw new Error(`"${rawStr}" is not a valid address`);
    return ethers.getAddress(rawStr);
  }
  if (type === "bytes32") {
    if (!/^0x[0-9a-fA-F]{64}$/.test(rawStr)) throw new Error(`"${rawStr}" is not a valid bytes32 value (0x + 64 hex chars)`);
    return rawStr;
  }
  return rawStr;
}

/* Recursively collect argument values from a schema's `inputs` array,
   in order, matching nested tuples into nested arrays. `pathPrefix` is
   used to build unique dotted `name` attributes for the DOM inputs. */
function collectArgs(inputs, form, pathPrefix = "") {
  return inputs.map(inp => {
    const path = pathPrefix ? `${pathPrefix}.${inp.name}` : inp.name;
    if (inp.type === "tuple") {
      return collectArgs(inp.fields, form, path);
    }
    const el = form.querySelector(`[name="${CSS.escape(path)}"]`);
    if (!el) throw new Error(`Missing field: ${inp.label || inp.name}`);
    return parseInput(el.value, inp.type);
  });
}

/* ── wallet ───────────────────────────────────────────────── */
function detectReadProvider() {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    rpcPill.textContent = "Reads via wallet RPC";
  } else if (CFG.rpcUrl) {
    provider = new ethers.JsonRpcProvider(CFG.rpcUrl);
    rpcPill.textContent = "Reads via public RPC";
  } else {
    provider = null;
    rpcPill.textContent = "No RPC available";
    rpcPill.classList.add("pill-warn");
    return;
  }
  rpcPill.classList.add("pill-active");
  provider.getNetwork()
    .then(net => {
      networkPill.textContent = `Chain ${net.chainId}`;
      networkPill.classList.add("pill-active");
      if (CFG.chainId && Number(net.chainId) !== Number(CFG.chainId)) {
        networkPill.classList.add("pill-warn");
      }
    })
    .catch(() => { networkPill.textContent = "Network unknown"; });
}

async function connect() {
  playClick();
  if (!window.ethereum) {
    log("No wallet found. Install MetaMask or another injected wallet.", "error");
    return;
  }
  try {
    if (!provider) provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer     = await provider.getSigner();
    signerAddr = await signer.getAddress();

    const net = await provider.getNetwork();
    networkPill.textContent = `Chain ${net.chainId}`;
    networkPill.classList.add("pill-active");
    networkPill.classList.remove("pill-warn");
    if (CFG.chainId && Number(net.chainId) !== Number(CFG.chainId)) {
      networkPill.classList.add("pill-warn");
      log(`Wallet on chain ${net.chainId}, expected ${CFG.chainId}. Please switch networks.`, "error");
    }

    walletPill.textContent = short(signerAddr);
    walletPill.classList.add("pill-active");
    connectBtn.textContent = "Connected";
    connectBtn.disabled    = true;

    log(`Wallet connected: ${signerAddr}`, "ok");
    window.ethereum.on?.("accountsChanged", () => window.location.reload());
    window.ethereum.on?.("chainChanged",    () => window.location.reload());

    await refreshAllOwnerBadges();
    await refreshAllReads();
  } catch (err) {
    log(`Connection failed: ${err.message || err}`, "error");
  }
}

function getContract(key, withSigner = true) {
  const cfg    = CFG.contracts[key];
  const abi    = ABI_MAP[key];
  const runner = withSigner && signer ? signer : provider;
  if (!runner) throw new Error("No RPC connection available yet.");
  return new ethers.Contract(cfg.address, abi, runner);
}

async function refreshAllOwnerBadges() {
  for (const key of Object.keys(SCHEMA)) refreshOwnerBadge(key);
}

async function refreshOwnerBadge(key) {
  const badge = $(`#owner-badge-${key}`);
  if (!badge) return;
  try {
    const c        = getContract(key, false);
    if (!c.owner)  return;
    const ownerAddr = await c.owner();
    const isOwner   = signerAddr && ownerAddr.toLowerCase() === signerAddr.toLowerCase();
    badge.textContent = isOwner ? "You are the owner" : `Owner: ${short(ownerAddr)}`;
    badge.classList.toggle("badge-good",    isOwner);
    badge.classList.toggle("badge-neutral", !isOwner);
  } catch {
    badge.textContent = provider ? "Owner unknown" : "Connect wallet to check ownership";
  }
}

/* Re-run every stat-grid read on every panel. Called on init (using the
   read-only provider), again after connecting a wallet, and whenever the
   user hits "Refresh". This is the fix for reads getting stuck on
   "error"/"—" forever after a normal page load. */
async function refreshAllReads() {
  for (const key of Object.keys(SCHEMA)) {
    $$(`#panel-${key} [data-read]`).forEach(el => {
      const fn = SCHEMA[key].reads.find(r => r.name === el.dataset.read);
      if (fn) runRead(key, fn, el);
    });
  }
}

/* ── contract calls ───────────────────────────────────────── */
async function runRead(key, fnSchema, container) {
  const cacheKey = `${key}:${fnSchema.name}`;
  if (!provider) {
    // show the last known value (if any) instead of a blank/"error" state
    const cached = loadCache()[cacheKey];
    container.textContent = cached ? `${cached.text}` : "—";
    container.classList.toggle("stat-cached", !!cached);
    container.title = cached ? `Cached from a previous session · no RPC connection right now` : "";
    return;
  }
  container.classList.add("stat-loading");
  try {
    const c      = getContract(key, false);
    const result = await c[fnSchema.name]();
    const text   = fmtValue(result, fnSchema.format);
    const changed = container.textContent !== text && container.textContent !== "—";
    container.textContent = text;
    container.title       = "";
    container.classList.remove("stat-cached", "stat-error");
    if (changed) {
      container.classList.remove("stat-flash");
      void container.offsetWidth; // restart animation
      container.classList.add("stat-flash");
    }
    saveCacheEntry(cacheKey, text);
  } catch (err) {
    const cached = loadCache()[cacheKey];
    if (cached) {
      container.textContent = cached.text;
      container.classList.add("stat-cached");
      container.title = "Showing the last known value — the live read just failed.";
    } else {
      container.textContent = "error";
      container.classList.add("stat-error");
      container.title = err.message || String(err);
    }
  } finally {
    container.classList.remove("stat-loading");
  }
}

async function runLookup(key, fnSchema, form, outEl) {
  try {
    const c    = getContract(key, false);
    const args = collectArgs(fnSchema.inputs, form);
    const result = await c[fnSchema.name](...args);
    outEl.textContent = jsonStringifySafe(result);
    outEl.classList.remove("hidden");
  } catch (err) {
    outEl.textContent = `Error: ${err.shortMessage || err.message || err}`;
    outEl.classList.remove("hidden");
  }
}

async function runAction(key, fnSchema, form, btn) {
  if (fnSchema.confirm && !window.confirm(fnSchema.confirm)) return;

  let args, overrides = {};
  try {
    args = collectArgs(fnSchema.inputs, form);
    if (fnSchema.payableValue) {
      const el = form.querySelector(`[name="${CSS.escape(fnSchema.payableValue.name)}"]`);
      overrides.value = parseInput(el.value, "uint256");
    }
  } catch (err) {
    log(`${fnSchema.label}: ${err.message}`, "error");
    return;
  }

  if (!signer) { log("Connect a wallet to send transactions.", "error"); return; }

  const c            = getContract(key, true);
  const originalText = btn.textContent;
  btn.disabled       = true;
  btn.textContent    = "Confirm in wallet…";
  try {
    const tx      = await c[fnSchema.name](...args, overrides);
    btn.textContent = "Pending…";
    log(`${fnSchema.label} — submitted`, "pending", tx.hash);
    const receipt = await tx.wait();
    log(`${fnSchema.label} — confirmed in block ${receipt.blockNumber}`, "ok", tx.hash);
    refreshOwnerBadge(key);
    $$(`#panel-${key} [data-read]`).forEach(el => {
      const fn = SCHEMA[key].reads.find(r => r.name === el.dataset.read);
      if (fn) runRead(key, fn, el);
    });
  } catch (err) {
    log(`${fnSchema.label} — failed: ${err.shortMessage || err.message || err}`, "error");
  } finally {
    btn.disabled    = false;
    btn.textContent = originalText;
  }
}

/* ── payment methods scanner ──────────────────────────────── */
async function loadPaymentMethods(symbols, tbody, statusEl) {
  if (!provider) {
    statusEl.textContent = "No RPC connection available yet.";
    return;
  }
  const c = getContract("factory", false);

  let totalCount = "?";
  try { totalCount = (await c.totalPaymentMethods()).toString(); } catch {}

  statusEl.textContent = `Checking ${symbols.length} symbol(s)… (${totalCount} total registered in contract)`;
  tbody.innerHTML = "";

  let found = 0;
  for (const sym of symbols) {
    try {
      const pm = await c.getPaymentMethod(sym);
      const isZeroToken    = pm.token    === ethers.ZeroAddress;
      const isZeroExchange = pm.exchange === ethers.ZeroAddress;
      const feeFormatted   = ethers.formatUnits(pm.deployFee, 18);
      found++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><span class="sym-chip">${sym}</span></td>
        <td>${pm.enabled    ? '<span class="tag tag-green">Enabled</span>' : '<span class="tag tag-red">Disabled</span>'}</td>
        <td>${pm.isNative   ? '<span class="tag tag-blue">Native coin</span>' : '<span class="tag tag-gray">ERC-20</span>'}</td>
        <td>${pm.burnEnabled ? '<span class="tag tag-orange">Yes</span>' : '<span class="tag tag-gray">No</span>'}</td>
        <td class="mono">${pm.deployFee.toString()}<br><span class="fee-hint">(${feeFormatted} if 18 dec)</span></td>
        <td class="mono addr-cell">${isZeroToken    ? '<span class="dim">—</span>' : `<span title="${pm.token}">${short(pm.token)}</span>`}</td>
        <td class="mono addr-cell">${isZeroExchange ? '<span class="dim">—</span>' : `<span title="${pm.exchange}">${short(pm.exchange)}</span>`}</td>
        <td class="actions-cell">
          <button class="btn btn-xs btn-ghost pm-enable"  data-sym="${sym}">Enable</button>
          <button class="btn btn-xs btn-danger pm-disable" data-sym="${sym}">Disable</button>
        </td>
      `;
      tbody.appendChild(tr);
    } catch {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td><span class="sym-chip sym-miss">${sym}</span></td><td colspan="7" class="dim">Not found / not registered</td>`;
      tbody.appendChild(tr);
    }
  }

  statusEl.textContent = `Loaded ${found} of ${symbols.length} symbols. (${totalCount} total in contract)`;

  tbody.querySelectorAll(".pm-enable").forEach(btn => {
    btn.addEventListener("click", async () => { await quickTogglePayment([btn.dataset.sym], true, btn); });
  });
  tbody.querySelectorAll(".pm-disable").forEach(btn => {
    btn.addEventListener("click", async () => { await quickTogglePayment([btn.dataset.sym], false, btn); });
  });
}

async function quickTogglePayment(symbols, enable, btn) {
  if (!signer) { log("Connect a wallet to send transactions.", "error"); return; }
  const c   = getContract("factory", true);
  const fn  = enable ? "batchEnablePayment" : "batchDisablePayment";
  const lbl = enable ? "Enable" : "Disable";
  const orig = btn.textContent;
  btn.disabled    = true;
  btn.textContent = "Confirm…";
  try {
    const tx      = await c[fn](symbols);
    btn.textContent = "Pending…";
    log(`${lbl} [${symbols.join(",")}] — submitted`, "pending", tx.hash);
    const receipt = await tx.wait();
    log(`${lbl} [${symbols.join(",")}] — confirmed in block ${receipt.blockNumber}`, "ok", tx.hash);
    const tbody    = btn.closest("tbody");
    const statusEl = btn.closest(".pm-scanner").querySelector(".pm-status");
    const inputEl  = btn.closest(".pm-scanner").querySelector(".pm-symbols-input");
    const syms     = inputEl.value.split(",").map(s => s.trim()).filter(Boolean);
    await loadPaymentMethods(syms, tbody, statusEl);
  } catch (err) {
    log(`${lbl} failed: ${err.shortMessage || err.message || err}`, "error");
    btn.disabled    = false;
    btn.textContent = orig;
  }
}

function buildPaymentMethodsSection() {
  const wrap = document.createElement("div");
  wrap.className = "subsection pm-scanner";
  wrap.innerHTML = `<h3>Payment methods</h3>`;

  const toolbar = document.createElement("div");
  toolbar.className = "pm-toolbar";
  toolbar.innerHTML = `
    <input class="pm-symbols-input" type="text" spellcheck="false" autocomplete="off"
      placeholder="Comma-separated symbols, e.g. BNB,USDT,USDC,LFT"
      value="BNB,ETH,USDT,USDC,DAI,LFT,WBNB,WETH" />
    <button class="btn btn-primary pm-load-btn">Load</button>
  `;
  wrap.appendChild(toolbar);

  const statusEl = document.createElement("div");
  statusEl.className = "pm-status dim";
  statusEl.textContent = "Enter symbols above and click Load.";
  wrap.appendChild(statusEl);

  const tableWrap = document.createElement("div");
  tableWrap.className = "pm-table-wrap";
  tableWrap.innerHTML = `
    <table class="pm-table">
      <thead>
        <tr>
          <th>Symbol</th><th>Status</th><th>Type</th><th>Burn</th>
          <th>Deploy fee (wei)</th><th>Token address</th><th>Exchange address</th><th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;
  wrap.appendChild(tableWrap);
  const tbody = tableWrap.querySelector("tbody");

  toolbar.querySelector(".pm-load-btn").addEventListener("click", () => {
    const raw  = toolbar.querySelector(".pm-symbols-input").value;
    const syms = raw.split(",").map(s => s.trim()).filter(Boolean);
    if (!syms.length) return;
    loadPaymentMethods(syms, tbody, statusEl);
  });

  // auto-load the defaults once a read connection is ready, so the table
  // isn't empty on every fresh page load
  const trySeed = () => {
    if (provider) loadPaymentMethods(
      toolbar.querySelector(".pm-symbols-input").value.split(",").map(s => s.trim()).filter(Boolean),
      tbody, statusEl
    );
    else setTimeout(trySeed, 400);
  };
  setTimeout(trySeed, 300);

  return wrap;
}

/* ── form builder ─────────────────────────────────────────── */
const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

function buildInputRow(inp, pathPrefix = "") {
  const path = pathPrefix ? `${pathPrefix}.${inp.name}` : inp.name;

  if (inp.type === "tuple") {
    const box = document.createElement("fieldset");
    box.className = "tuple-box";
    const legend = document.createElement("legend");
    legend.textContent = inp.label;
    box.appendChild(legend);
    inp.fields.forEach(sub => box.appendChild(buildInputRow(sub, path)));
    return box;
  }

  const wrap = document.createElement("div");
  wrap.className = "field";

  const label = document.createElement("span");
  label.textContent = inp.label;
  wrap.appendChild(label);

  if (inp.type === "bool") {
    const hidden = document.createElement("input");
    hidden.type  = "hidden";
    hidden.name  = path;
    hidden.value = "true";

    const toggle = document.createElement("div");
    toggle.className = "bool-toggle bool-true";
    toggle.innerHTML = `<button type="button" class="bool-opt bool-opt-true  active" data-val="true">true</button>
                        <button type="button" class="bool-opt bool-opt-false"         data-val="false">false</button>`;

    toggle.querySelectorAll(".bool-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        toggle.querySelectorAll(".bool-opt").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        hidden.value = btn.dataset.val;
        toggle.className = `bool-toggle bool-${btn.dataset.val}`;
      });
    });

    wrap.appendChild(toggle);
    wrap.appendChild(hidden);
  } else {
    const row = document.createElement("div");
    row.className = "field-row";

    const input = document.createElement("input");
    input.name         = path;
    input.type         = "text";
    input.placeholder  = inp.type;
    input.autocomplete = "off";
    input.spellcheck   = false;
    row.appendChild(input);

    if (inp.type === "address" && inp.label.toLowerCase().includes("0x0")) {
      const zeroBtn = document.createElement("button");
      zeroBtn.type      = "button";
      zeroBtn.className = "btn btn-xs btn-ghost zero-btn";
      zeroBtn.textContent = "0x0";
      zeroBtn.title = "Fill with zero address";
      zeroBtn.addEventListener("click", () => { input.value = ZERO_ADDR; });
      row.appendChild(zeroBtn);
    }

    wrap.appendChild(row);
  }
  return wrap;
}

function buildActionCard(key, fnSchema) {
  const card = document.createElement("form");
  card.className = `action-card ${fnSchema.group === "danger" ? "action-danger" : ""}`;

  const fieldsWrap = document.createElement("div");
  fieldsWrap.className = "fields";
  fnSchema.inputs.forEach(inp => fieldsWrap.appendChild(buildInputRow(inp)));
  if (fnSchema.payableValue) {
    fieldsWrap.appendChild(buildInputRow({ ...fnSchema.payableValue, type: "uint256" }));
  }

  const btn = document.createElement("button");
  btn.type        = "submit";
  btn.className   = `btn ${fnSchema.group === "danger" ? "btn-danger" : "btn-primary"}`;
  btn.textContent = fnSchema.label;

  card.appendChild(fieldsWrap);
  card.appendChild(btn);
  card.addEventListener("submit", e => { e.preventDefault(); runAction(key, fnSchema, card, btn); });
  return card;
}

function buildLookupForm(key, fnSchema) {
  const form = document.createElement("form");
  form.className = "action-form";
  const out  = document.createElement("pre");
  out.className = "lookup-out hidden";

  const fieldsWrap = document.createElement("div");
  fieldsWrap.className = "fields";
  fnSchema.inputs.forEach(inp => fieldsWrap.appendChild(buildInputRow(inp)));

  const btn = document.createElement("button");
  btn.type      = "submit";
  btn.className = "btn btn-ghost";
  btn.textContent = fnSchema.label;

  form.appendChild(fieldsWrap);
  form.appendChild(btn);
  form.appendChild(out);
  form.addEventListener("submit", e => { e.preventDefault(); runLookup(key, fnSchema, form, out); });
  return form;
}

/* ── panel builder ────────────────────────────────────────── */
function buildContractPanel(key) {
  const cfg    = CFG.contracts[key];
  const schema = SCHEMA[key];
  const panel  = document.createElement("section");
  panel.className = "panel";
  panel.id        = `panel-${key}`;

  panel.innerHTML = `
    <header class="panel-head">
      <div>
        <h2>${cfg.label}</h2>
        <a class="addr"
           href="${CFG.explorerUrl ? CFG.explorerUrl + '/address/' + cfg.address : '#'}"
           target="${CFG.explorerUrl ? '_blank' : '_self'}" rel="noopener">${cfg.address}</a>
      </div>
      <span class="badge badge-neutral" id="owner-badge-${key}">Connect wallet to check ownership</span>
    </header>
  `;

  // stats grid
  if (schema.reads.length) {
    const statsHead = document.createElement("div");
    statsHead.className = "stats-head";
    statsHead.innerHTML = `<h3>Overview</h3>`;
    const refreshBtn = document.createElement("button");
    refreshBtn.type = "button";
    refreshBtn.className = "btn btn-xs btn-ghost";
    refreshBtn.textContent = "Refresh";
    refreshBtn.addEventListener("click", () => {
      $$(`#panel-${key} [data-read]`).forEach(el => {
        const fn = schema.reads.find(r => r.name === el.dataset.read);
        if (fn) runRead(key, fn, el);
      });
    });
    statsHead.appendChild(refreshBtn);
    panel.appendChild(statsHead);

    const statsGrid = document.createElement("div");
    statsGrid.className = "stats-grid";
    schema.reads.forEach(r => {
      const card = document.createElement("div");
      card.className = "stat-card";
      const val  = document.createElement("div");
      val.className    = "stat-val";
      val.dataset.read = r.name;
      val.textContent  = "—";
      card.innerHTML = `<div class="stat-label">${r.label}</div>`;
      card.appendChild(val);
      statsGrid.appendChild(card);
      runRead(key, r, val);
    });
    panel.appendChild(statsGrid);
  }

  // payment methods scanner (factory only)
  if (key === "factory") {
    panel.appendChild(buildPaymentMethodsSection());
  }

  // lookups — split primary vs advanced
  if (schema.lookups.length) {
    const primary  = schema.lookups.filter(f => f.group !== "advanced");
    const advanced = schema.lookups.filter(f => f.group === "advanced");

    if (primary.length) {
      const wrap = document.createElement("div");
      wrap.className = "subsection";
      wrap.innerHTML = `<h3>Look up</h3>`;
      primary.forEach(fn => wrap.appendChild(buildLookupForm(key, fn)));
      panel.appendChild(wrap);
    }
    if (advanced.length) {
      const details = document.createElement("details");
      details.className = "subsection collapsible";
      details.innerHTML = `<summary>Advanced look-ups (${advanced.length})</summary>`;
      const body = document.createElement("div");
      body.className = "collapsible-body";
      advanced.forEach(fn => body.appendChild(buildLookupForm(key, fn)));
      details.appendChild(body);
      panel.appendChild(details);
    }
  }

  // owner actions — split primary / advanced / danger
  if (schema.actions.length) {
    const primary  = schema.actions.filter(f => !f.group || f.group === "primary");
    const advanced = schema.actions.filter(f => f.group === "advanced");
    const danger   = schema.actions.filter(f => f.group === "danger");

    if (primary.length) {
      const wrap = document.createElement("div");
      wrap.className = "subsection";
      wrap.innerHTML = `<h3>Owner actions</h3>`;
      primary.forEach(fn => wrap.appendChild(buildActionCard(key, fn)));
      panel.appendChild(wrap);
    }
    if (advanced.length) {
      const details = document.createElement("details");
      details.className = "subsection collapsible";
      details.innerHTML = `<summary>Advanced actions (${advanced.length})</summary>`;
      const body = document.createElement("div");
      body.className = "collapsible-body";
      advanced.forEach(fn => body.appendChild(buildActionCard(key, fn)));
      details.appendChild(body);
      panel.appendChild(details);
    }
    if (danger.length) {
      const details = document.createElement("details");
      details.className = "subsection collapsible collapsible-danger";
      details.innerHTML = `<summary>⚠ Danger zone (${danger.length})</summary>`;
      const body = document.createElement("div");
      body.className = "collapsible-body";
      danger.forEach(fn => body.appendChild(buildActionCard(key, fn)));
      details.appendChild(body);
      panel.appendChild(details);
    }
  }

  return panel;
}

function buildTreasuryPanel() {
  const t     = CFG.contracts.treasury;
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.innerHTML = `
    <header class="panel-head">
      <div>
        <h2>${t.label}</h2>
        <a class="addr"
           href="${CFG.explorerUrl ? CFG.explorerUrl + '/address/' + t.address : '#'}"
           target="${CFG.explorerUrl ? '_blank' : '_self'}" rel="noopener">${t.address}</a>
      </div>
      <span class="badge badge-neutral">${t.note || "Reference only"}</span>
    </header>
  `;
  return panel;
}

/* ── nav ──────────────────────────────────────────────────── */
function buildNav() {
  const nav   = $("#tabNav");
  const order = ["treasury", "token", "exchange", "deployer", "factory"];
  order.forEach((key, i) => {
    const cfg = CFG.contracts[key];
    const btn = document.createElement("button");
    btn.className   = "tab" + (i === 0 ? " tab-active" : "");
    btn.textContent = cfg.label;
    btn.dataset.target = key;
    btn.addEventListener("click", () => {
      playClick();
      $$(".tab").forEach(t => t.classList.remove("tab-active"));
      btn.classList.add("tab-active");
      $$(".view").forEach(p => p.classList.add("hidden"));
      $(`#view-${key}`).classList.remove("hidden");
    });
    nav.appendChild(btn);
  });
}

/* ── init ─────────────────────────────────────────────────── */
function init() {
  detectReadProvider();
  restoreLog();
  buildNav();
  const main = $("#views");

  Object.keys(CFG.contracts).forEach((key, i) => {
    const wrap    = document.createElement("div");
    wrap.id       = `view-${key}`;
    wrap.className = "view" + (i === 0 ? "" : " hidden");
    wrap.appendChild(key === "treasury" ? buildTreasuryPanel() : buildContractPanel(key));
    main.appendChild(wrap);
  });

  connectBtn.addEventListener("click", connect);
  refreshAllBtn?.addEventListener("click", () => { refreshAllReads(); refreshAllOwnerBadges(); });
  clearLogBtn?.addEventListener("click", () => {
    if (!window.confirm("Clear the local activity log? This only clears this browser's history, nothing on-chain.")) return;
    logEl.innerHTML = "";
    saveLog([]);
  });

  log("Console ready. Reads load automatically; connect a wallet to send transactions.", "info");
}

init();
