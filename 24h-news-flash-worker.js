const DEFAULT_TITLE = '24H News Flash';
const DEFAULT_HEADLINE_FONT_SIZE = 12;
const DEFAULT_FEEDS = [
  { name: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml' },
];

const DEFAULT_ASSETS = ['BTC', 'ETH'];
const DEFAULT_MAX_ITEMS = 15;
const REFRESH_MS = 10 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8000;

const COINGECKO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  XRP: 'ripple',
  BNB: 'binancecoin',
  DOGE: 'dogecoin',
  ADA: 'cardano',
  TRX: 'tron',
  TON: 'the-open-network',
  LINK: 'chainlink',
  AVAX: 'avalanche-2',
  DOT: 'polkadot',
  LTC: 'litecoin',
  BCH: 'bitcoin-cash',
  NEAR: 'near',
  APT: 'aptos',
  ETC: 'ethereum-classic',
  ARB: 'arbitrum',
  OP: 'optimism',
  SUI: 'sui',
  SHIB: 'shiba-inu',
  PEPE: 'pepe',
};

const ASSET_UI_META = {
  BTC: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/btc.png' },
  ETH: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/eth.png' },
  SOL: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/sol.png' },
  XRP: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/xrp.png' },
  BNB: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/bnb.png' },
  DOGE: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/doge.png' },
  ADA: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/ada.png' },
  TRX: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/trx.png' },
  TON: { icon: 'https://assets.coingecko.com/coins/images/17980/small/ton_symbol.png' },
  LINK: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/link.png' },
  AVAX: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/avax.png' },
  DOT: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/dot.png' },
  LTC: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/ltc.png' },
  BCH: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/bch.png' },
  NEAR: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/near.png' },
  APT: { icon: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png' },
  ETC: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/etc.png' },
  ARB: { icon: 'https://assets.coingecko.com/coins/images/16547/small/arb.jpg' },
  OP: { icon: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
  SUI: { icon: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg' },
  SHIB: { icon: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/shib.png' },
  PEPE: { icon: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
};

const ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="News">
  <rect width="64" height="64" rx="16" fill="#0f172a"/>
  <rect x="13" y="12" width="38" height="40" rx="7" fill="#ffffff"/>
  <rect x="19" y="20" width="12" height="11" rx="2" fill="#2563eb"/>
  <rect x="35" y="20" width="10" height="3" rx="1.5" fill="#94a3b8"/>
  <rect x="35" y="27" width="10" height="3" rx="1.5" fill="#94a3b8"/>
  <rect x="19" y="36" width="26" height="3" rx="1.5" fill="#cbd5e1"/>
  <rect x="19" y="42" width="20" height="3" rx="1.5" fill="#cbd5e1"/>
  <circle cx="49" cy="49" r="10" fill="#f97316"/>
  <path d="M45.5 49.2h7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M49 45.7v7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
</svg>`;

const HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="color-scheme" content="light dark" />
  <title>${DEFAULT_TITLE}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
  <style>
    :root {
      color-scheme: light dark;
      --bg: #f5f7fb;
      --panel: #ffffff;
      --text: #111827;
      --muted: #667085;
      --border: #e5e7eb;
      --hover: #eff4ff;
      --accent: #2563eb;
      --danger: #d92d20;
      --positive: #16a34a;
      --negative: #dc2626;
      --shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
      --backdrop: rgba(15, 23, 42, 0.42);
    }

    html[data-theme="dark"] {
      --bg: #0b1220;
      --panel: #111827;
      --text: #f3f4f6;
      --muted: #94a3b8;
      --border: #243244;
      --hover: #162235;
      --accent: #60a5fa;
      --danger: #ff8b7a;
      --positive: #4ade80;
      --negative: #f87171;
      --shadow: none;
      --backdrop: rgba(2, 6, 23, 0.65);
    }

    * { box-sizing: border-box; }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, Arial, sans-serif;
    }

    .shell {
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg);
    }

    .header {
      flex: 0 0 auto;
      padding: 8px 10px 8px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow);
    }

    .ticker-row {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      padding: 2px 0 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      line-height: 1;
      overflow: hidden;
      white-space: nowrap;
    }

    .ticker-empty {
      color: var(--muted);
      font-size: 11px;
      font-weight: 700;
    }

    .asset {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      flex: 0 0 auto;
    }

    .asset-icon {
      width: 18px;
      height: 18px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 900;
      flex: 0 0 auto;
      overflow: hidden;
      background: var(--bg);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
    }

    .asset-icon img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
    }

    .asset-name {
      font-weight: 800;
      color: var(--muted);
      letter-spacing: 0.2px;
    }

    .asset-price {
      font-weight: 800;
      color: var(--text);
    }

    .asset-change {
      font-weight: 800;
      color: var(--muted);
    }

    .asset-change.up { color: var(--positive); }
    .asset-change.down { color: var(--negative); }

    .ticker-divider {
      color: var(--muted);
      opacity: 0.7;
      flex: 0 0 auto;
    }

    .topline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .title {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 800;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right-tools {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex: 0 0 auto;
    }

    .icon-group {
      display: inline-flex;
      gap: 4px;
      padding: 3px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--bg);
      flex: 0 0 auto;
    }

    .icon-btn {
      width: 30px;
      min-width: 30px;
      height: 30px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
      flex: 0 0 auto;
    }

    .icon-btn.svg-only {
      width: 30px;
      padding: 0;
    }

    .icon-btn svg {
      width: 15px;
      height: 15px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    #refreshBtn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
      stroke: none;
    }

    .icon-btn .auto-mark {
      font-size: 11px;
      font-weight: 800;
      line-height: 1;
    }

    .icon-btn.active {
      background: var(--panel);
      color: var(--text);
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
    }

    .status-row {
      margin-top: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .status {
      color: var(--muted);
      font-size: 11px;
      line-height: 1.35;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    #refreshBtn:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    .feed-wrap {
      flex: 1 1 auto;
      min-height: 0;
      overflow: hidden;
    }

    .list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .item {
      border-bottom: 1px solid var(--border);
      background: var(--panel);
    }

    .link {
      display: block;
      padding: 8px 10px 7px;
      text-decoration: none;
      color: inherit;
    }

    .link:hover {
      background: var(--hover);
    }

    .headline {
      margin: 0 0 4px;
      font-size: var(--headline-font-size, 12px);
      line-height: 1.32;
      font-weight: 700;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 10px;
      color: var(--muted);
    }

    .source {
      display: inline-flex;
      align-items: center;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .loading, .empty, .error {
      padding: 12px 10px;
      font-size: 12px;
      line-height: 1.5;
      color: var(--muted);
      background: var(--panel);
    }

    .error { color: var(--danger); }

    .modal {
      position: fixed;
      inset: 0;
      background: var(--backdrop);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 12px;
      z-index: 99;
    }

    .modal.open { display: flex; }

    .dialog {
      width: min(100%, 420px);
      max-height: 88vh;
      overflow: auto;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow);
      padding: 14px;
    }

    .dialog-title {
      margin: 0 0 12px;
      font-size: 15px;
      font-weight: 800;
    }

    .field {
      margin-bottom: 12px;
    }

    .label {
      display: block;
      margin-bottom: 6px;
      font-size: 11px;
      font-weight: 800;
      color: var(--muted);
    }

    .input, .number-input {
      width: 100%;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--bg);
      color: var(--text);
      padding: 9px 10px;
      font-size: 12px;
      outline: none;
    }

    .feed-list, .asset-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 10px;
    }

    .feed-item, .asset-item {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 8px;
      background: var(--bg);
    }

    .feed-top, .asset-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 4px;
    }

    .feed-name, .asset-name-row {
      font-size: 12px;
      font-weight: 800;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .feed-url, .asset-hint {
      font-size: 10px;
      color: var(--muted);
      line-height: 1.4;
      word-break: break-all;
    }

    .mini-btn, .danger-btn, .primary-btn, .ghost-btn {
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      border: 1px solid var(--border);
      background: var(--panel);
      color: var(--text);
    }

    .mini-btn, .danger-btn {
      padding: 6px 8px;
      font-size: 11px;
    }

    .danger-btn {
      color: var(--danger);
    }

    .primary-btn {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }

    .add-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .dialog-actions {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-top: 12px;
    }

    .dialog-actions-right {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }

    .hint {
      margin-top: 6px;
      font-size: 10px;
      color: var(--muted);
      line-height: 1.5;
    }
    /* Apple card sidebar layout override */
    .shell { background: #f5f7fb; }
    .header {
      padding: 10px 12px 10px;
      background: rgba(255,255,255,.86);
      backdrop-filter: saturate(180%) blur(18px);
      -webkit-backdrop-filter: saturate(180%) blur(18px);
    }
    .ticker-row { margin-bottom: 10px; padding-bottom: 10px; }
    .right-tools { gap: 8px; }
    .icon-btn { width: auto; min-width: 30px; height: 30px; padding: 0 7px; gap: 5px; font-size: 12px; font-weight: 700; }
    .icon-btn.svg-only { width: auto; padding: 0 7px; }
    .feed-wrap {
      padding: 10px 10px 8px;
      background: radial-gradient(circle at 16% 0%, rgba(255,255,255,.78), transparent 35%), var(--bg);
    }
    .list { display: flex; flex-direction: column; gap: 7px; }
    .item { border: 1px solid rgba(229,231,235,.78); border-radius: 13px; background: rgba(255,255,255,.92); box-shadow: 0 2px 10px rgba(15,23,42,.07); overflow: hidden; }
    html[data-theme="dark"] .item { background: rgba(22,32,48,.92); border-color: var(--border); box-shadow: none; }
    .link { padding: 8px 12px 7px; }
    .link:hover { background: rgba(239,244,255,.7); }
    .headline-row { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: start; gap: 10px; }
    .headline { margin: 0; line-height: 1.28; }
    .item-time { color: var(--muted); font-size: 10px; line-height: 1.28; white-space: nowrap; padding-top: 1px; }
    .meta { margin-top: 3px; justify-content: flex-start; }
    .status-row { display: none; }
    .footer-status {
      flex: 0 0 auto;
      padding: 8px 12px;
      border-top: 1px solid var(--border);
      background: rgba(255,255,255,.86);
      color: var(--muted);
      font-size: 11px;
      line-height: 1.35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      backdrop-filter: saturate(180%) blur(18px);
      -webkit-backdrop-filter: saturate(180%) blur(18px);
    }
    html[data-theme="dark"] .footer-status { background: rgba(17,24,39,.92); }

  </style>
</head>
<body>
  <div class="shell">
    <div class="header">
      <div class="ticker-row" id="tickerRow">
        <span class="ticker-empty">Loading markets…</span>
      </div>

      <div class="topline">
        <h1 class="title" id="panelTitle">${DEFAULT_TITLE}</h1>
        <div class="right-tools">
                    <button class="icon-btn" id="settingsBtn" title="Settings" aria-label="Settings">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"></circle><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.2 1.2 0 0 1 0 1.7l-1.6 1.6a1.2 1.2 0 0 1-1.7 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9v.2a1.2 1.2 0 0 1-1.2 1.2h-2.2a1.2 1.2 0 0 1-1.2-1.2v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.2 1.2 0 0 1-1.7 0L4.3 18a1.2 1.2 0 0 1 0-1.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6h-.2a1.2 1.2 0 0 1-1.2-1.2v-2.2A1.2 1.2 0 0 1 3.5 10h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.2 1.2 0 0 1 0-1.7L5.9 4.9a1.2 1.2 0 0 1 1.7 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9v-.2A1.2 1.2 0 0 1 10.6 3h2.2A1.2 1.2 0 0 1 14 4.2v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.2 1.2 0 0 1 1.7 0l1.6 1.6a1.2 1.2 0 0 1 0 1.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1.2 1.2 0 0 1 1.2 1.2v2.2a1.2 1.2 0 0 1-1.2 1.2h-.2a1 1 0 0 0-.9.6Z"></path></svg>
            <span>Settings</span>
          </button>

          <button class="icon-btn" id="refreshBtn" title="Refresh" aria-label="Refresh">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3a9 9 0 0 1 8.4 5.8.85.85 0 0 1-1.58.63A7.3 7.3 0 1 0 18 16.3l-2-1.98a.85.85 0 1 1 1.2-1.2l3.32 3.32a.85.85 0 0 1 0 1.2l-3.32 3.32a.85.85 0 1 1-1.2-1.2l2.01-2.02A9 9 0 1 1 12 3z"></path>
            </svg>
            <span>Refresh</span>
          </button>


        </div>
      </div>
      <div class="status-row">
        <div class="status">Showing 0 items · Updates every 10 minutes · Last updated --:--</div>
      </div>
    </div>

    <div class="feed-wrap" id="feedWrap">
      <ul class="list" id="newsList">
        <li class="loading">Loading news feeds…</li>
      </ul>
    </div>

    <div class="footer-status" id="status">Showing 0 items · Updates every 10 minutes · Last updated --:--</div>
  </div>

  <div class="modal" id="settingsModal">
    <div class="dialog">
      <h2 class="dialog-title">Panel Settings</h2>

      <div class="field">
        <label class="label" for="titleInput">Panel Title</label>
        <input class="input" id="titleInput" type="text" maxlength="60" placeholder="Enter a custom title" />
      </div>

      <div class="field">
        <label class="label" for="countInput">News Items</label>
        <input class="number-input" id="countInput" type="number" min="1" max="60" step="1" />
      </div>

      <div class="field">
        <label class="label" for="headlineSizeInput">News Title Font Size</label>
        <input class="number-input" id="headlineSizeInput" type="number" min="10" max="20" step="1" />
        <div class="hint">Adjusts the font size of the news headlines. Recommended: 12–14 px.</div>
      </div>

      <div class="field">
        <label class="label" for="themeSelect">Theme</label>
        <select class="input" id="themeSelect">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
        <div class="hint">Auto follows your system setting and switches to dark mode from 19:00 to 07:00.</div>
      </div>

      <div class="field">
        <div class="label">Top Crypto Assets</div>
        <div class="asset-list" id="assetList"></div>

        <div class="add-row">
          <input class="input" id="assetCodeInput" type="text" maxlength="12" placeholder="Asset code, e.g. BTC, ETH, SOL" />
          <button class="mini-btn" id="addAssetBtn" type="button">Add Asset</button>
        </div>
        <div class="hint">Shows the current USDT or USD price and 24h change.</div>
      </div>

      <div class="field">
        <div class="label">Feed Management</div>
        <div class="feed-list" id="feedList"></div>

        <div class="add-row">
          <input class="input" id="feedNameInput" type="text" maxlength="40" placeholder="Feed name, e.g. BBC News" />
          <input class="input" id="feedUrlInput" type="url" placeholder="Feed URL, e.g. https://example.com/rss.xml" />
          <button class="mini-btn" id="addFeedBtn" type="button">Add Feed</button>
        </div>
        <div class="hint">Settings are saved in this browser for this page URL. They do not sync across browsers or devices.</div>
      </div>

      <div class="dialog-actions">
        <button class="ghost-btn" id="resetBtn" type="button">Reset</button>
        <div class="dialog-actions-right">
          <button class="ghost-btn" id="cancelBtn" type="button">Cancel</button>
          <button class="primary-btn" id="saveBtn" type="button">Save</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const DEFAULT_TITLE = ${JSON.stringify(DEFAULT_TITLE)};
    const DEFAULT_FEEDS = ${JSON.stringify(DEFAULT_FEEDS)};
    const DEFAULT_ASSETS = ${JSON.stringify(DEFAULT_ASSETS)};
    const DEFAULT_MAX_ITEMS = ${DEFAULT_MAX_ITEMS};
    const DEFAULT_HEADLINE_FONT_SIZE = ${DEFAULT_HEADLINE_FONT_SIZE};
    const REFRESH_MS = ${REFRESH_MS};
    const SETTINGS_KEY = 'news-panel-settings-v5';
    const THEME_KEY = 'news-panel-theme-mode-v12';
    const ASSET_UI_META = ${JSON.stringify(ASSET_UI_META)};

    const feedWrap = document.getElementById('feedWrap');
    const listEl = document.getElementById('newsList');
    const statusEl = document.getElementById('status');
    const refreshBtn = document.getElementById('refreshBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const panelTitleEl = document.getElementById('panelTitle');
    const tickerRowEl = document.getElementById('tickerRow');
    

    const titleInput = document.getElementById('titleInput');
    const countInput = document.getElementById('countInput');
    const headlineSizeInput = document.getElementById('headlineSizeInput');
    const themeSelect = document.getElementById('themeSelect');
    const assetListEl = document.getElementById('assetList');
    const assetCodeInput = document.getElementById('assetCodeInput');
    const addAssetBtn = document.getElementById('addAssetBtn');
    const feedListEl = document.getElementById('feedList');
    const feedNameInput = document.getElementById('feedNameInput');
    const feedUrlInput = document.getElementById('feedUrlInput');
    const addFeedBtn = document.getElementById('addFeedBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const resetBtn = document.getElementById('resetBtn');

    const mediaDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const mediaLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

    let settings = loadSettings();
    let draftSettings = cloneSettings(settings);
    let lastPayload = null;
    let lastShownCount = 0;

    function cloneSettings(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function sanitizeAssetCode(code) {
      const raw = String(code || '').trim().toUpperCase();
      let out = '';
      for (let i = 0; i < raw.length; i++) {
        const ch = raw[i];
        const ok =
          (ch >= 'A' && ch <= 'Z') ||
          (ch >= '0' && ch <= '9') ||
          ch === '-' ||
          ch === '_';
        if (ok) out += ch;
      }
      return out.slice(0, 12);
    }

    function normalizeFeed(feed) {
      const name = String(feed && feed.name ? feed.name : '').trim();
      const url = String(feed && feed.url ? feed.url : '').trim();
      if (!name || !url) return null;
      try {
        const parsed = new URL(url);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
        return { name: name.slice(0, 40), url: parsed.toString() };
      } catch (e) {
        return null;
      }
    }

    function normalizeSettings(raw) {
      const title = String(raw && raw.title ? raw.title : DEFAULT_TITLE).trim().slice(0, 60) || DEFAULT_TITLE;
      const maxItemsRaw = Number(raw && raw.maxItems);
      const maxItems = Number.isFinite(maxItemsRaw)
        ? Math.min(60, Math.max(1, Math.round(maxItemsRaw)))
        : DEFAULT_MAX_ITEMS;

      const headlineFontSizeRaw = Number(raw && raw.headlineFontSize);
      const headlineFontSize = Number.isFinite(headlineFontSizeRaw)
        ? Math.min(20, Math.max(10, Math.round(headlineFontSizeRaw)))
        : DEFAULT_HEADLINE_FONT_SIZE;

      const feedsRaw = Array.isArray(raw && raw.feeds) ? raw.feeds : DEFAULT_FEEDS;
      const feeds = [];
      const seenFeeds = new Set();

      for (const feed of feedsRaw) {
        const item = normalizeFeed(feed);
        if (!item) continue;
        const key = item.name + '|' + item.url;
        if (seenFeeds.has(key)) continue;
        seenFeeds.add(key);
        feeds.push(item);
      }

      const assetsRaw = Array.isArray(raw && raw.assets) ? raw.assets : DEFAULT_ASSETS;
      const assets = [];
      const seenAssets = new Set();
      for (const asset of assetsRaw) {
        const code = sanitizeAssetCode(asset);
        if (!code) continue;
        if (seenAssets.has(code)) continue;
        seenAssets.add(code);
        assets.push(code);
      }

      return {
        title,
        maxItems,
        headlineFontSize,
        feeds: feeds.length ? feeds : cloneSettings({ feeds: DEFAULT_FEEDS }).feeds,
        assets,
      };
    }

    function loadSettings() {
      try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) {
          return normalizeSettings({
            title: DEFAULT_TITLE,
            maxItems: DEFAULT_MAX_ITEMS,
            headlineFontSize: DEFAULT_HEADLINE_FONT_SIZE,
            feeds: DEFAULT_FEEDS,
            assets: DEFAULT_ASSETS,
          });
        }
        return normalizeSettings(JSON.parse(raw));
      } catch (e) {
        return normalizeSettings({
          title: DEFAULT_TITLE,
          maxItems: DEFAULT_MAX_ITEMS,
            headlineFontSize: DEFAULT_HEADLINE_FONT_SIZE,
            feeds: DEFAULT_FEEDS,
          assets: DEFAULT_ASSETS,
        });
      }
    }

    function saveSettings(next) {
      settings = normalizeSettings(next);
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      applySettingsToTitle();
      applyHeadlineFontSize();
    }

    function applySettingsToTitle() {
      panelTitleEl.textContent = settings.title;
      document.title = settings.title;
    }

    function applyHeadlineFontSize() {
      document.documentElement.style.setProperty('--headline-font-size', settings.headlineFontSize + 'px');
    }

    function escapeHtml(str) {
      const text = String(str || '');
      return text
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt;')
        .split('"').join('&quot;')
        .split("'").join('&#39;');
    }

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function formatClock(value) {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return '--:--';
      return pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function formatItemTime(value) {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return value || 'No time';
      return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function formatUsd(value) {
      const num = Number(value);
      if (!Number.isFinite(num)) return '$--';
      return '$' + new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }

    function formatPct(value) {
      const num = Number(value);
      if (!Number.isFinite(num)) return '--';
      return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
    }

    function getAssetMeta(code) {
      return ASSET_UI_META[code] || { icon: '' };
    }

    function renderAssetIcon(code) {
      const meta = getAssetMeta(code);
      if (meta.icon) {
        return '<span class="asset-icon"><img src="' + escapeHtml(meta.icon) + '" alt="' + escapeHtml(code) + '" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"></span>';
      }
      return '<span class="asset-icon">' + escapeHtml((code || '?').slice(0, 1)) + '</span>';
    }

    function renderTickerRow(market) {
      const assets = settings.assets || [];
      if (!assets.length) {
        tickerRowEl.innerHTML = '<span class="ticker-empty">No top crypto assets configured</span>';
        return;
      }

      let html = '';
      assets.forEach(function (code, index) {
        const row = market && market[code] ? market[code] : null;
        const change = row ? Number(row.changePercent) : NaN;
        const cls = Number.isFinite(change) ? (change > 0 ? ' up' : change < 0 ? ' down' : '') : '';
        const meta = getAssetMeta(code);

        if (index > 0) {
          html += '<span class="ticker-divider">•</span>';
        }

        html +=
          '<span class="asset">' +
            renderAssetIcon(code) +
            '<span class="asset-name">' + escapeHtml(code) + ':</span>' +
            '<span class="asset-price">' + escapeHtml(formatUsd(row ? row.price : null)) + '</span>' +
            '<span class="asset-change' + cls + '">' + escapeHtml(formatPct(row ? row.changePercent : null)) + '</span>' +
          '</span>';
      });

      tickerRowEl.innerHTML = html;
    }

    function resolveAutoTheme() {
      const hour = new Date().getHours();
      const isNightByTime = hour >= 19 || hour < 7;
      if (isNightByTime) return 'dark';
      if (mediaDark && mediaDark.matches) return 'dark';
      if (mediaLight && mediaLight.matches) return 'light';
      return 'light';
    }

    function applyTheme(mode, persist) {
      const finalMode = mode === 'auto' ? resolveAutoTheme() : mode;
      document.documentElement.dataset.theme = finalMode;
      if (themeSelect) themeSelect.value = mode;
      if (persist !== false) {
        localStorage.setItem(THEME_KEY, mode);
      }
    }

    function refreshAutoTheme() {
      const mode = localStorage.getItem(THEME_KEY) || 'light';
      if (mode === 'auto') {
        applyTheme('auto', false);
      }
    }


    if (mediaDark) {
      if (mediaDark.addEventListener) mediaDark.addEventListener('change', refreshAutoTheme);
      else if (mediaDark.addListener) mediaDark.addListener(refreshAutoTheme);
    }
    if (mediaLight) {
      if (mediaLight.addEventListener) mediaLight.addEventListener('change', refreshAutoTheme);
      else if (mediaLight.addListener) mediaLight.addListener(refreshAutoTheme);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') refreshAutoTheme();
    });
    window.addEventListener('focus', refreshAutoTheme);
    window.addEventListener('pageshow', refreshAutoTheme);
    setInterval(refreshAutoTheme, 60000);

    applyTheme(localStorage.getItem(THEME_KEY) || 'light', false);
    refreshAutoTheme();
    applySettingsToTitle();

    function makeItemElement(item) {
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML =
        '<a class="link" href="' + escapeHtml(item.link || '#') + '" target="_blank" rel="noopener noreferrer">' +
          '<div class="headline-row">' +
            '<p class="headline">' + escapeHtml(item.title || 'Untitled') + '</p>' +
            '<span class="item-time">' + escapeHtml(formatItemTime(item.timeText || '')) + '</span>' +
          '</div>' +
          '<div class="meta">' +
            '<span class="source">' + escapeHtml(item.source || 'Unknown source') + '</span>' +
          '</div>' +
        '</a>';
      return li;
    }

    function renderItemsFitted(items) {
      listEl.innerHTML = '';

      if (!items.length) {
        listEl.innerHTML = '<li class="empty">No news is available right now.</li>';
        return 0;
      }

      let shown = 0;
      for (const item of items) {
        const li = makeItemElement(item);
        listEl.appendChild(li);
        if (listEl.scrollHeight > feedWrap.clientHeight) {
          listEl.removeChild(li);
          break;
        }
        shown += 1;
      }

      if (!shown) {
        listEl.innerHTML = '<li class="empty">The current panel height is too small. Try making the sidebar a little taller.</li>';
      }

      return shown;
    }

    function buildFailureText(failures) {
      if (!failures || !failures.length) return '';
      const names = failures.map(function (f) { return f.source; }).join(', ');
      return ' · Failed feeds ' + failures.length + '(' + names + ')';
    }

    function updateStatus(payload, shown, extraTail) {
      const base = 'Showing ' + shown + ' items · Updates every 10 minutes · Last updated ' + formatClock(payload && payload.generatedAt);
      const failures = buildFailureText(payload && payload.failures ? payload.failures : []);
      const extra = extraTail ? (' · ' + extraTail) : '';
      statusEl.textContent = base + failures + extra;
    }

    function renderPayload(payload) {
      lastPayload = payload;
      renderTickerRow(payload.market || {});
      const shown = renderItemsFitted((payload.items || []).slice(0, settings.maxItems));
      lastShownCount = shown;
      updateStatus(payload, shown, '');
    }

    async function requestPanel(forceRefresh) {
      const qs = forceRefresh ? ('?refresh=1&ts=' + Date.now()) : '';
      const res = await fetch('/api/panel' + qs, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          maxItems: settings.maxItems,
          feeds: settings.feeds,
          assets: settings.assets,
        }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }

    async function loadPanel(forceRefresh) {
      try {
        refreshBtn.disabled = true;
        const data = await requestPanel(forceRefresh);
        renderPayload(data);
      } catch (err) {
        if (lastPayload) {
          renderPayload(lastPayload);
          updateStatus(lastPayload, lastShownCount, 'Refresh failed');
        } else {
          listEl.innerHTML = '<li class="error">News update failed: ' + escapeHtml(err.message || 'Unknown error') + '</li>';
          statusEl.textContent = 'Showing 0 items · Updates every 10 minutes · Last updated --:-- · Refresh failed';
          renderTickerRow({});
        }
      } finally {
        refreshBtn.disabled = false;
      }
    }

    refreshBtn.addEventListener('click', function () {
      loadPanel(true);
    });

    window.addEventListener('resize', function () {
      if (lastPayload) {
        const shown = renderItemsFitted((lastPayload.items || []).slice(0, settings.maxItems));
        lastShownCount = shown;
        updateStatus(lastPayload, shown, '');
      }
    });

    window.addEventListener('storage', function (event) {
      if (event.key === SETTINGS_KEY) {
        settings = loadSettings();
        applySettingsToTitle();
        loadPanel(true);
      }
      if (event.key === THEME_KEY) {
        applyTheme(localStorage.getItem(THEME_KEY) || 'light', false);
        refreshAutoTheme();
      }
    });

    function renderDraftAssets() {
      assetListEl.innerHTML = '';
      if (!draftSettings.assets.length) {
        assetListEl.innerHTML = '<div class="hint">No top crypto assets configured.</div>';
        return;
      }

      draftSettings.assets.forEach(function (code, index) {
        const row = document.createElement('div');
        row.className = 'asset-item';
        row.innerHTML =
          '<div class="asset-top">' +
            '<div class="asset-name-row">' + escapeHtml(code) + '</div>' +
            '<button class="danger-btn" type="button" data-index="' + index + '">Delete</button>' +
          '</div>' +
          '<div class="asset-hint">Shows ' + escapeHtml(code) + ' USDT / USD price and 24h change.</div>';

        const btn = row.querySelector('button');
        btn.addEventListener('click', function () {
          draftSettings.assets.splice(index, 1);
          renderDraftAssets();
        });
        assetListEl.appendChild(row);
      });
    }

    function renderDraftFeeds() {
      feedListEl.innerHTML = '';
      if (!draftSettings.feeds.length) {
        feedListEl.innerHTML = '<div class="hint">Please keep at least one feed.</div>';
        return;
      }

      draftSettings.feeds.forEach(function (feed, index) {
        const row = document.createElement('div');
        row.className = 'feed-item';
        row.innerHTML =
          '<div class="feed-top">' +
            '<div class="feed-name">' + escapeHtml(feed.name) + '</div>' +
            '<button class="danger-btn" type="button" data-index="' + index + '">Delete</button>' +
          '</div>' +
          '<div class="feed-url">' + escapeHtml(feed.url) + '</div>';
        const btn = row.querySelector('button');
        btn.addEventListener('click', function () {
          draftSettings.feeds.splice(index, 1);
          renderDraftFeeds();
        });
        feedListEl.appendChild(row);
      });
    }

    function openSettings() {
      draftSettings = cloneSettings(settings);
      titleInput.value = draftSettings.title;
      countInput.value = draftSettings.maxItems;
      headlineSizeInput.value = draftSettings.headlineFontSize;
      themeSelect.value = localStorage.getItem(THEME_KEY) || 'light';
      assetCodeInput.value = '';
      feedNameInput.value = '';
      feedUrlInput.value = '';
      renderDraftAssets();
      renderDraftFeeds();
      settingsModal.classList.add('open');
    }

    function closeSettings() {
      settingsModal.classList.remove('open');
    }

    settingsBtn.addEventListener('click', openSettings);
    cancelBtn.addEventListener('click', closeSettings);

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && settingsModal.classList.contains('open')) {
        closeSettings();
      }
    });

    settingsModal.addEventListener('click', function (event) {
      if (event.target === settingsModal) closeSettings();
    });

    addAssetBtn.addEventListener('click', function () {
      const code = sanitizeAssetCode(assetCodeInput.value);
      if (!code) {
        alert('Enter a valid asset code, e.g. BTC, ETH, SOL.');
        return;
      }
      if (draftSettings.assets.includes(code)) {
        alert('This asset already exists.');
        return;
      }
      draftSettings.assets.push(code);
      assetCodeInput.value = '';
      renderDraftAssets();
    });

    addFeedBtn.addEventListener('click', function () {
      const candidate = normalizeFeed({
        name: feedNameInput.value,
        url: feedUrlInput.value,
      });
      if (!candidate) {
        alert('Enter a valid feed name and http/https URL.');
        return;
      }
      const exists = draftSettings.feeds.some(function (feed) {
        return feed.name === candidate.name || feed.url === candidate.url;
      });
      if (exists) {
        alert('This feed already exists.');
        return;
      }
      draftSettings.feeds.push(candidate);
      feedNameInput.value = '';
      feedUrlInput.value = '';
      renderDraftFeeds();
    });

    resetBtn.addEventListener('click', function () {
      draftSettings = normalizeSettings({
        title: DEFAULT_TITLE,
        maxItems: DEFAULT_MAX_ITEMS,
            headlineFontSize: DEFAULT_HEADLINE_FONT_SIZE,
            feeds: DEFAULT_FEEDS,
        assets: DEFAULT_ASSETS,
      });
      titleInput.value = draftSettings.title;
      countInput.value = draftSettings.maxItems;
      headlineSizeInput.value = draftSettings.headlineFontSize;
      themeSelect.value = 'light';
      renderDraftAssets();
      renderDraftFeeds();
    });

    saveBtn.addEventListener('click', function () {
      const next = normalizeSettings({
        title: titleInput.value,
        maxItems: countInput.value,
        headlineFontSize: headlineSizeInput.value,
        feeds: draftSettings.feeds,
        assets: draftSettings.assets,
      });
      if (!next.feeds.length) {
        alert('Please keep at least one feed.');
        return;
      }
      saveSettings(next);
      applyTheme(themeSelect.value || 'light', true);
      closeSettings();
      loadPanel(true);
    });

    loadPanel(false);
    setInterval(function () {
      loadPanel(false);
    }, REFRESH_MS);
  </script>
</body>
</html>`;

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

function sanitizeAssetCodeServer(code) {
  const raw = String(code || '').trim().toUpperCase();
  let out = '';
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const ok =
      (ch >= 'A' && ch <= 'Z') ||
      (ch >= '0' && ch <= '9') ||
      ch === '-' ||
      ch === '_';
    if (ok) out += ch;
  }
  return out.slice(0, 12);
}

function sanitizeAssets(rawAssets) {
  if (!Array.isArray(rawAssets)) {
    return DEFAULT_ASSETS.slice();
  }
  const out = [];
  const seen = new Set();
  for (const raw of rawAssets) {
    const code = sanitizeAssetCodeServer(raw);
    if (!code) continue;
    if (seen.has(code)) continue;
    seen.add(code);
    out.push(code);
  }
  return out;
}

function sanitizeFeeds(rawFeeds) {
  const input = Array.isArray(rawFeeds) ? rawFeeds : DEFAULT_FEEDS;
  const out = [];
  const seen = new Set();

  for (const raw of input) {
    const name = String(raw && raw.name ? raw.name : '').trim().slice(0, 40);
    const url = String(raw && raw.url ? raw.url : '').trim();
    if (!name || !url) continue;
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') continue;
      const item = { name, url: parsed.toString() };
      const key = item.name + '|' + item.url;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    } catch (e) {
      continue;
    }
  }

  return out.length ? out : DEFAULT_FEEDS.slice();
}

function sanitizeMaxItems(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return DEFAULT_MAX_ITEMS;
  return Math.min(60, Math.max(1, Math.round(num)));
}

function removeCdata(text) {
  let s = String(text || '');
  if (s.startsWith('<![CDATA[') && s.endsWith(']]>')) {
    s = s.slice(9, -3);
  }
  return s;
}

function decodeEntities(text) {
  let s = String(text || '');
  s = s.split('&nbsp;').join(' ');
  s = s.split('&amp;').join('&');
  s = s.split('&lt;').join('<');
  s = s.split('&gt;').join('>');
  s = s.split('&quot;').join('"');
  s = s.split('&#39;').join("'");
  s = s.split('&apos;').join("'");
  return s;
}

function stripTags(text) {
  const s = String(text || '');
  let out = '';
  let inside = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '<') {
      inside = true;
      continue;
    }
    if (ch === '>') {
      inside = false;
      continue;
    }
    if (!inside) out += ch;
  }
  return out;
}

function collapseWhitespace(text) {
  const s = String(text || '');
  let out = '';
  let lastSpace = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const isSpace = ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t';
    if (isSpace) {
      if (!lastSpace) out += ' ';
      lastSpace = true;
    } else {
      out += ch;
      lastSpace = false;
    }
  }
  return out.trim();
}

function cleanText(text) {
  return collapseWhitespace(stripTags(decodeEntities(removeCdata(text))));
}

function getBlocks(xml, tagName) {
  const blocks = [];
  const openNeedle = '<' + tagName;
  const closeNeedle = '</' + tagName + '>';
  let pos = 0;

  while (true) {
    const start = xml.indexOf(openNeedle, pos);
    if (start === -1) break;
    const openEnd = xml.indexOf('>', start);
    if (openEnd === -1) break;
    const end = xml.indexOf(closeNeedle, openEnd + 1);
    if (end === -1) break;
    blocks.push(xml.slice(start, end + closeNeedle.length));
    pos = end + closeNeedle.length;
  }

  return blocks;
}

function extractTag(block, tagName) {
  const openNeedle = '<' + tagName;
  const closeNeedle = '</' + tagName + '>';
  const start = block.indexOf(openNeedle);
  if (start === -1) return '';
  const openEnd = block.indexOf('>', start);
  if (openEnd === -1) return '';
  const end = block.indexOf(closeNeedle, openEnd + 1);
  if (end === -1) return '';
  return cleanText(block.slice(openEnd + 1, end));
}

function extractAttrValue(fragment, attrName) {
  const needle1 = attrName + '="';
  const needle2 = attrName + "='";

  let start = fragment.indexOf(needle1);
  if (start !== -1) {
    const from = start + needle1.length;
    const end = fragment.indexOf('"', from);
    if (end !== -1) return fragment.slice(from, end).trim();
  }

  start = fragment.indexOf(needle2);
  if (start !== -1) {
    const from = start + needle2.length;
    const end = fragment.indexOf("'", from);
    if (end !== -1) return fragment.slice(from, end).trim();
  }

  return '';
}

function extractLink(block) {
  const linkStart = block.indexOf('<link');
  if (linkStart !== -1) {
    const linkTagEnd = block.indexOf('>', linkStart);
    if (linkTagEnd !== -1) {
      const linkTag = block.slice(linkStart, linkTagEnd + 1);
      const href = extractAttrValue(linkTag, 'href');
      if (href) return href;
    }
  }

  const rssLink = extractTag(block, 'link');
  if (rssLink) return rssLink;
  const guidLink = extractTag(block, 'guid');
  if (guidLink) return guidLink;
  return '';
}

function safeAbsoluteUrl(link, baseUrl) {
  if (!link) return '';
  try {
    return new URL(link, baseUrl).toString();
  } catch (e) {
    return link;
  }
}

function normalizeTimestamp(value) {
  const t = Date.parse(value || '');
  return Number.isFinite(t) ? t : 0;
}

function parseFeed(xml, sourceName, feedUrl) {
  let blocks = getBlocks(xml, 'item');
  if (!blocks.length) blocks = getBlocks(xml, 'entry');

  const items = [];
  for (const block of blocks) {
    const title = extractTag(block, 'title');
    const link = safeAbsoluteUrl(extractLink(block, feedUrl), feedUrl);
    const rawDate =
      extractTag(block, 'pubDate') ||
      extractTag(block, 'updated') ||
      extractTag(block, 'published') ||
      extractTag(block, 'dc:date');

    if (title && link) {
      items.push({
        title,
        link,
        source: sourceName,
        rawDate,
        timestamp: normalizeTimestamp(rawDate),
        timeText: rawDate,
      });
    }
  }

  return items;
}

function dedupeItems(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = (item.link || '') + '|' + (item.title || '');
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function sortItemsNewestFirst(items) {
  return items.slice().sort(function (a, b) {
    return (b.timestamp || 0) - (a.timestamp || 0);
  });
}

function json(data, init) {
  const headers = Object.assign(
    { 'content-type': 'application/json; charset=UTF-8' },
    (init && init.headers) || {}
  );

  return new Response(JSON.stringify(data), {
    ...(init || {}),
    headers,
  });
}

async function fetchTextWithTimeout(url, headers) {
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: headers || {},
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonWithTimeout(url, headers) {
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: headers || {},
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchFeedText(feed) {
  return fetchTextWithTimeout(feed.url, {
    'user-agent': 'Mozilla/5.0 (compatible; NewsPanel/1.0; +https://workers.dev)',
    'accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
  });
}

async function fetchSingleMarketFromBinance(code) {
  const symbol = code + 'USDT';
  const url = 'https://api.binance.com/api/v3/ticker/24hr?symbol=' + encodeURIComponent(symbol);
  const row = await fetchJsonWithTimeout(url, {
    'accept': 'application/json',
    'user-agent': 'Mozilla/5.0 (compatible; NewsPanel/1.0; +https://workers.dev)',
  });

  const price = Number(row.lastPrice);
  const changePercent = Number(row.priceChangePercent);

  if (!Number.isFinite(price) || !Number.isFinite(changePercent)) {
    throw new Error('Binance data invalid');
  }

  return {
    price,
    changePercent,
    source: 'Binance',
  };
}

async function fetchMarketsFromCoinGecko(codes) {
  const mappedCodes = codes.filter(function (code) {
    return !!COINGECKO_IDS[code];
  });

  if (!mappedCodes.length) {
    return {};
  }

  const ids = mappedCodes.map(function (code) {
    return COINGECKO_IDS[code];
  }).join(',');

  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=' +
    encodeURIComponent(ids) +
    '&vs_currencies=usd&include_24hr_change=true';

  const row = await fetchJsonWithTimeout(url, {
    'accept': 'application/json',
    'user-agent': 'Mozilla/5.0 (compatible; NewsPanel/1.0; +https://workers.dev)',
  });

  const out = {};
  mappedCodes.forEach(function (code) {
    const id = COINGECKO_IDS[code];
    const item = row && row[id] ? row[id] : null;
    if (!item) return;
    const price = Number(item.usd);
    const changePercent = Number(item.usd_24h_change);
    if (!Number.isFinite(price) || !Number.isFinite(changePercent)) return;
    out[code] = {
      price,
      changePercent,
      source: 'CoinGecko',
    };
  });

  return out;
}

async function fetchMarkets(codes) {
  const assets = {};
  const failures = [];

  const binanceResults = await Promise.allSettled(
    codes.map(function (code) {
      return fetchSingleMarketFromBinance(code);
    })
  );

  const fallbackCodes = [];
  binanceResults.forEach(function (result, index) {
    const code = codes[index];
    if (result.status === 'fulfilled') {
      assets[code] = result.value;
    } else {
      fallbackCodes.push(code);
    }
  });

  if (fallbackCodes.length) {
    try {
      const fallbackData = await fetchMarketsFromCoinGecko(fallbackCodes);
      fallbackCodes.forEach(function (code) {
        if (fallbackData[code]) {
          assets[code] = fallbackData[code];
        } else {
          failures.push({
            source: 'Market-' + code,
            reason: 'No fallback data',
          });
        }
      });
    } catch (e) {
      fallbackCodes.forEach(function (code) {
        failures.push({
          source: 'Market-' + code,
          reason: String(e && e.message ? e.message : e || 'unknown error'),
        });
      });
    }
  }

  return { assets, failures };
}

async function buildPanelPayload(config) {
  const feedResults = await Promise.allSettled(
    config.feeds.map(async function (feed) {
      const xml = await fetchFeedText(feed);
      return parseFeed(xml, feed.name, feed.url);
    })
  );

  const items = [];
  const failures = [];

  feedResults.forEach(function (result, index) {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
    } else {
      failures.push({
        source: config.feeds[index].name,
        reason: String(
          result.reason && result.reason.message
            ? result.reason.message
            : result.reason || 'unknown error'
        ),
      });
    }
  });

  const marketResult = await fetchMarkets(config.assets || []);
  failures.push(...marketResult.failures);

  const finalItems = sortItemsNewestFirst(dedupeItems(items))
    .slice(0, config.maxItems)
    .map(function (item) {
      return {
        title: item.title,
        link: item.link,
        source: item.source,
        timestamp: item.timestamp,
        timeText: item.timestamp ? new Date(item.timestamp).toISOString() : item.rawDate,
      };
    });

  return {
    generatedAt: new Date().toISOString(),
    market: marketResult.assets,
    items: finalItems,
    failures,
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/favicon.svg') {
      return new Response(ICON_SVG, {
        headers: {
          'content-type': 'image/svg+xml; charset=UTF-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (url.pathname === '/favicon.ico') {
      return Response.redirect(url.origin + '/favicon.svg', 302);
    }

    if (url.pathname === '/api/panel') {
      let body = {};
      if (request.method === 'POST') {
        body = safeJsonParse(await request.text()) || {};
      }

      const config = {
        maxItems: sanitizeMaxItems(body.maxItems),
        feeds: sanitizeFeeds(body.feeds),
        assets: sanitizeAssets(body.assets),
      };

      const payload = await buildPanelPayload(config);
      return json(payload, {
        headers: { 'cache-control': 'no-store' },
      });
    }

    return new Response(HTML, {
      headers: {
        'content-type': 'text/html; charset=UTF-8',
        'cache-control': 'no-store',
      },
    });
  },
}; 