// ── Launch Future · admin console app ──────────────────────────────────
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.13.4/+esm";

const CFG = window.LFT_CONFIG;
const SCHEMA = window.LFT_SCHEMA;

const ABI_MAP = {
  token: window.LaunchFutureTokenABI,
  exchange: window.LaunchFutureExchangeABI,
  deployer: window.LFTDeployerABI,
  factory: window.LFTFactoryABI
};

let provider = null;
let signer = null;
let signerAddr = null;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const connectBtn = $("#connectBtn");
const walletPill = $("#walletPill");
const networkPill = $("#networkPill");
const logEl = $("#log");

function short(addr) {
  if (!addr || addr.length < 10) return addr;
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

function log(message, kind = "info", txHash = null) {
  const row = document.createElement("div");
  row.className = `log-row log-${kind}`;
  const time = new Date().toLocaleTimeString();
  let html = `<span class="log-time">${time}</span><span class="log-msg">${message}</span>`;
  if (txHash) {
    const explorer = CFG.explorerUrl
      ? `<a href="${CFG.explorerUrl}/tx/${txHash}" target="_blank" rel="noopener">${short(txHash)} ↗</a>`
      : `<span class="log-hash">${short(txHash)}</span>`;
    html += ` ${explorer}`;
  }
  row.innerHTML = html;
  logEl.prepend(row);
}

function fmtValue(raw, format) {
  if (raw === null || raw === undefined) return "—";
  if (format === "address") return raw === ethers.ZeroAddress ? "0x0 (none)" : raw;
  if (format === "bool") return raw ? "Yes" : "No";
  if (format === "token") {
    try { return ethers.formatUnits(raw, 18) + " (assuming 18 decimals)"; }
    catch { return raw.toString(); }
  }
  if (typeof raw === "bigint") return raw.toString();
  if (Array.isArray(raw)) return raw.map(v => fmtValue(v)).join(", ");
  return raw.toString();
}

// Parse a raw form value into the type ethers expects.
function parseInput(rawStr, type) {
  rawStr = (rawStr ?? "").trim();
  if (type === "bool") return rawStr === "true" || rawStr === "1" || rawStr === "yes";
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
  return rawStr; // string, bytes32 left as-is
}

async function connect() {
  if (!window.ethereum) {
    log("No wallet found. Install MetaMask or another injected wallet.", "error");
    return;
  }
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    signerAddr = await signer.getAddress();

    const net = await provider.getNetwork();
    networkPill.textContent = `Chain ${net.chainId}`;
    networkPill.classList.add("pill-active");

    if (CFG.chainId && Number(net.chainId) !== Number(CFG.chainId)) {
      networkPill.classList.add("pill-warn");
      log(`Connected wallet is on chain ${net.chainId}, expected ${CFG.chainId}. Switch networks.`, "error");
    }

    walletPill.textContent = short(signerAddr);
    walletPill.classList.add("pill-active");
    connectBtn.textContent = "Connected";
    connectBtn.disabled = true;

    log(`Wallet connected: ${signerAddr}`, "ok");
    window.ethereum.on?.("accountsChanged", () => window.location.reload());
    window.ethereum.on?.("chainChanged", () => window.location.reload());

    await refreshAllOwnerBadges();
  } catch (err) {
    log(`Connection failed: ${err.message || err}`, "error");
  }
}

function getContract(key, withSigner = true) {
  const cfg = CFG.contracts[key];
  const abi = ABI_MAP[key];
  const runner = withSigner && signer ? signer : provider;
  if (!runner) throw new Error("Connect a wallet first.");
  return new ethers.Contract(cfg.address, abi, runner);
}

async function refreshAllOwnerBadges() {
  for (const key of Object.keys(SCHEMA)) {
    refreshOwnerBadge(key);
  }
}

async function refreshOwnerBadge(key) {
  const badge = $(`#owner-badge-${key}`);
  if (!badge) return;
  try {
    const c = getContract(key, false);
    if (!c.owner) return;
    const ownerAddr = await c.owner();
    const isOwner = signerAddr && ownerAddr.toLowerCase() === signerAddr.toLowerCase();
    badge.textContent = isOwner ? "You are the owner" : `Owner: ${short(ownerAddr)}`;
    badge.classList.toggle("badge-good", isOwner);
    badge.classList.toggle("badge-neutral", !isOwner);
  } catch {
    badge.textContent = "Owner unknown";
  }
}

async function runRead(key, fnSchema, container) {
  try {
    const c = getContract(key, false);
    const result = await c[fnSchema.name]();
    container.textContent = fmtValue(result, fnSchema.format);
  } catch (err) {
    container.textContent = "error";
    container.title = err.message || String(err);
  }
}

async function runLookup(key, fnSchema, form, outEl) {
  try {
    const c = getContract(key, false);
    const args = fnSchema.inputs.map(inp => {
      const el = form.querySelector(`[name="${inp.name}"]`);
      return parseInput(el.value, inp.type);
    });
    const result = await c[fnSchema.name](...args);
    outEl.textContent = JSON.stringify(result, (_, v) => typeof v === "bigint" ? v.toString() : v, 2);
    outEl.classList.remove("hidden");
  } catch (err) {
    outEl.textContent = `Error: ${err.shortMessage || err.message || err}`;
    outEl.classList.remove("hidden");
  }
}

async function runAction(key, fnSchema, form, btn) {
  if (fnSchema.confirm && !window.confirm(fnSchema.confirm)) return;

  let args;
  try {
    if (fnSchema.struct) {
      // Build struct tuple args in order from dotted field names.
      args = [];
      for (const inp of fnSchema.inputs) {
        if (inp.name.includes(".")) continue;
        const el = form.querySelector(`[name="${inp.name}"]`);
        args.push(parseInput(el.value, inp.type));
      }
      for (const [structName, fields] of Object.entries(fnSchema.struct)) {
        const tuple = fields.map(f => {
          const inp = fnSchema.inputs.find(i => i.name === `${structName}.${f}`);
          const el = form.querySelector(`[name="${inp.name}"]`);
          return parseInput(el.value, inp.type);
        });
        args.push(tuple);
      }
    } else {
      args = fnSchema.inputs.map(inp => {
        const el = form.querySelector(`[name="${inp.name}"]`);
        return parseInput(el.value, inp.type);
      });
    }
  } catch (err) {
    log(`${fnSchema.label}: ${err.message}`, "error");
    return;
  }

  const c = getContract(key, true);
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = "Confirm in wallet…";
  try {
    const tx = await c[fnSchema.name](...args);
    btn.textContent = "Pending…";
    log(`${fnSchema.label} — submitted`, "pending", tx.hash);
    const receipt = await tx.wait();
    log(`${fnSchema.label} — confirmed in block ${receipt.blockNumber}`, "ok", tx.hash);
    refreshOwnerBadge(key);
    // Refresh read stats for this contract panel.
    $$(`#panel-${key} [data-read]`).forEach(el => {
      const fn = SCHEMA[key].reads.find(r => r.name === el.dataset.read);
      if (fn) runRead(key, fn, el);
    });
  } catch (err) {
    log(`${fnSchema.label} — failed: ${err.shortMessage || err.message || err}`, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function buildInputRow(inp) {
  const wrap = document.createElement("label");
  wrap.className = "field";
  const span = document.createElement("span");
  span.textContent = inp.label;
  wrap.appendChild(span);

  if (inp.type === "bool") {
    const sel = document.createElement("select");
    sel.name = inp.name;
    sel.innerHTML = `<option value="true">true</option><option value="false">false</option>`;
    wrap.appendChild(sel);
  } else {
    const input = document.createElement("input");
    input.name = inp.name;
    input.type = "text";
    input.placeholder = inp.type;
    input.autocomplete = "off";
    input.spellcheck = false;
    wrap.appendChild(input);
  }
  return wrap;
}

function buildContractPanel(key) {
  const cfg = CFG.contracts[key];
  const schema = SCHEMA[key];
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.id = `panel-${key}`;

  panel.innerHTML = `
    <header class="panel-head">
      <div>
        <h2>${cfg.label}</h2>
        <a class="addr" href="${CFG.explorerUrl ? CFG.explorerUrl + '/address/' + cfg.address : '#'}"
           target="${CFG.explorerUrl ? '_blank' : '_self'}" rel="noopener">${cfg.address}</a>
      </div>
      <span class="badge badge-neutral" id="owner-badge-${key}">Connect wallet to check ownership</span>
    </header>
  `;

  if (schema.reads.length) {
    const statsGrid = document.createElement("div");
    statsGrid.className = "stats-grid";
    schema.reads.forEach(r => {
      const card = document.createElement("div");
      card.className = "stat-card";
      const val = document.createElement("div");
      val.className = "stat-val";
      val.dataset.read = r.name;
      val.textContent = "—";
      card.innerHTML = `<div class="stat-label">${r.label}</div>`;
      card.appendChild(val);
      statsGrid.appendChild(card);
      runRead(key, r, val);
    });
    panel.appendChild(statsGrid);
  }

  if (schema.lookups.length) {
    const lookupWrap = document.createElement("div");
    lookupWrap.className = "subsection";
    lookupWrap.innerHTML = `<h3>Look up</h3>`;
    schema.lookups.forEach(fnSchema => {
      const form = document.createElement("form");
      form.className = "action-form";
      const out = document.createElement("pre");
      out.className = "lookup-out hidden";

      const fieldsWrap = document.createElement("div");
      fieldsWrap.className = "fields";
      fnSchema.inputs.forEach(inp => fieldsWrap.appendChild(buildInputRow(inp)));

      const btn = document.createElement("button");
      btn.type = "submit";
      btn.className = "btn btn-ghost";
      btn.textContent = fnSchema.label;

      form.appendChild(fieldsWrap);
      form.appendChild(btn);
      form.appendChild(out);

      form.addEventListener("submit", e => {
        e.preventDefault();
        runLookup(key, fnSchema, form, out);
      });

      lookupWrap.appendChild(form);
    });
    panel.appendChild(lookupWrap);
  }

  if (schema.actions.length) {
    const actionsWrap = document.createElement("div");
    actionsWrap.className = "subsection";
    actionsWrap.innerHTML = `<h3>Owner actions</h3>`;
    schema.actions.forEach(fnSchema => {
      const card = document.createElement("form");
      card.className = `action-card ${fnSchema.danger ? "action-danger" : ""}`;

      const fieldsWrap = document.createElement("div");
      fieldsWrap.className = "fields";
      fnSchema.inputs.forEach(inp => fieldsWrap.appendChild(buildInputRow(inp)));

      const btn = document.createElement("button");
      btn.type = "submit";
      btn.className = `btn ${fnSchema.danger ? "btn-danger" : "btn-primary"}`;
      btn.textContent = fnSchema.label;

      card.appendChild(fieldsWrap);
      card.appendChild(btn);

      card.addEventListener("submit", e => {
        e.preventDefault();
        runAction(key, fnSchema, card, btn);
      });

      actionsWrap.appendChild(card);
    });
    panel.appendChild(actionsWrap);
  }

  return panel;
}

function buildTreasuryPanel() {
  const t = CFG.contracts.treasury;
  const panel = document.createElement("section");
  panel.className = "panel";
  panel.innerHTML = `
    <header class="panel-head">
      <div>
        <h2>${t.label}</h2>
        <a class="addr" href="${CFG.explorerUrl ? CFG.explorerUrl + '/address/' + t.address : '#'}"
           target="${CFG.explorerUrl ? '_blank' : '_self'}" rel="noopener">${t.address}</a>
      </div>
      <span class="badge badge-neutral">${t.note || "Reference only"}</span>
    </header>
  `;
  return panel;
}

function buildNav() {
  const nav = $("#tabNav");
  const order = ["treasury", "token", "exchange", "deployer", "factory"];
  order.forEach((key, i) => {
    const cfg = CFG.contracts[key];
    const btn = document.createElement("button");
    btn.className = "tab" + (i === 0 ? " tab-active" : "");
    btn.textContent = cfg.label;
    btn.dataset.target = key;
    btn.addEventListener("click", () => {
      $$(".tab").forEach(t => t.classList.remove("tab-active"));
      btn.classList.add("tab-active");
      $$(".view").forEach(p => p.classList.add("hidden"));
      $(`#view-${key}`).classList.remove("hidden");
    });
    nav.appendChild(btn);
  });
}

function init() {
  buildNav();
  const main = $("#views");

  Object.keys(CFG.contracts).forEach((key, i) => {
    const wrap = document.createElement("div");
    wrap.id = `view-${key}`;
    wrap.className = "view" + (i === 0 ? "" : " hidden");

    const node = key === "treasury" ? buildTreasuryPanel() : buildContractPanel(key);
    wrap.appendChild(node);
    main.appendChild(wrap);
  });

  connectBtn.addEventListener("click", connect);
  log("Console ready. Connect a wallet to load owner status and send transactions.", "info");
}

init();
