const symbolCatalog = [
  { id: "wild", name: "WILD", image: "assets/symbols/icon/wild.png", className: "symbol-wild", isWild: true, isScatter: false, isBonus: false },
  { id: "scatter", name: "SCATTER", image: "assets/symbols/icon/scatter.png", className: "symbol-scatter", isWild: false, isScatter: true, isBonus: false },
  { id: "bonus", name: "BONUS", image: "assets/symbols/icon/bonus.png", className: "symbol-bonus", isWild: false, isScatter: false, isBonus: true },
  { id: "crown", name: "GAT", image: "assets/symbols/icon/crown.png", className: "symbol-crown", isWild: false, isScatter: false, isBonus: false },
  { id: "diamond", name: "LANTERN", image: "assets/symbols/icon/diamond.png", className: "symbol-diamond", isWild: false, isScatter: false, isBonus: false },
  { id: "seven", name: "7", image: "assets/symbols/icon/seven.png", className: "symbol-seven", isWild: false, isScatter: false, isBonus: false },
  { id: "bar", name: "SAMTAEGEUK", image: "assets/symbols/icon/bar.png", className: "symbol-bar", isWild: false, isScatter: false, isBonus: false },
  { id: "A", name: "가", image: "assets/symbols/icon/A.png", className: "symbol-a", isWild: false, isScatter: false, isBonus: false },
  { id: "K", name: "나", image: "assets/symbols/icon/K.png", className: "symbol-k", isWild: false, isScatter: false, isBonus: false },
  { id: "Q", name: "다", image: "assets/symbols/icon/Q.png", className: "symbol-q", isWild: false, isScatter: false, isBonus: false },
  { id: "J", name: "라", image: "assets/symbols/icon/J.png", className: "symbol-j", isWild: false, isScatter: false, isBonus: false },
  { id: "ten", name: "10", image: "assets/symbols/icon/ten.png", className: "symbol-ten", isWild: false, isScatter: false, isBonus: false },
];
const symbolById = new Map(symbolCatalog.map((symbol) => [symbol.id, symbol]));
const wildSymbol = symbolById.get("wild");
const scatterSymbol = symbolById.get("scatter");
const symbols = ["bar", "A", "K", "Q", "diamond", "crown", "wild", "scatter"].map((id) =>
  symbolById.get(id),
);
const reelWeights = [
  [30, 27, 21, 12, 5, 3, 1, 16],
  [30, 27, 21, 12, 5, 3, 1, 2],
  [30, 27, 21, 12, 5, 3, 1, 10],
  [30, 27, 21, 12, 5, 3, 1, 8],
  [30, 27, 21, 12, 5, 3, 1, 7],
];
const betSteps = [8, 16, 40, 88, 176];
const reelsByBetIndex = [3, 3, 4, 5, 5];
const denomSteps = [1, 2, 5, 10, 20, 50, 100];
const rtpSteps = [0.88, 0.89, 0.9, 0.91, 0.92, 0.93, 0.95];
const rtpByDenomCents = new Map([
  [1, 0.88],
  [2, 0.89],
  [5, 0.9],
  [10, 0.91],
  [20, 0.92],
  [50, 0.93],
  [100, 0.95],
]);
const reelCount = 5;
const visibleRows = 3;
const bonusSpinAward = 5;
const chestFreeSpinAward = 10;
const expandedBonusAward = 5;
const jackpotLabels = ["MINI", "MINOR", "MAJOR", "GRAND"];
const jackpotPriority = ["GRAND", "MAJOR", "MINOR", "MINI"];
const scratchCardCount = 12;
const bonusFreeSpinTargetRtp = 0.32;
const targetBonusTriggerRate = 0.01;
const chestFeatureRtpReserve = 0.044;
const highBetChestReserveRelief = 0.006;
const demoStartCredits = 10_000;
const creditOdometerCentsPerSecond = 50;
const maxDisplayAmount = 99_999_999.99;
const maxDropAmount = 999_999.99;
const cappedDisplayAmount = "XX,XXX,XXX.XX";
const introSeenStorageKey = "neonHunterSpinIntroSeen";
const testSessionStorageKey = "neonHunterSpinTestSessionId";
const testStatsStorageKey = "neonHunterSpinTestStats";
const testerMissionStorageKey = "neonHunterSpinTesterMission";
const dailyDemoCreditStorageKey = "neonHunterSpinDailyDemoCreditDate";
const serviceWorkerPath = "service-worker.js";
const appVersion = "v5";
const dailyDemoCredits = 2_000;
const feedbackTagOptions = [
  "Easy to Start",
  "Confusing",
  "Fun Bonus",
  "Too Slow",
  "Button Hard to Tap",
  "Layout Broken",
  "Sound Issue",
  "Telegram Issue",
];
const testerMissionDefinitions = [
  { id: "startDemo", label: "Start the demo" },
  { id: "spin20", label: "Spin 20 times" },
  { id: "tryBetLevels", label: "Try at least 2 bet levels" },
  { id: "tryDenoms", label: "Try at least 2 denom options" },
  { id: "openGuide", label: "Open the Guide" },
  { id: "openTestInfo", label: "Open the Test Info panel" },
  { id: "submitFeedback", label: "Submit feedback" },
  { id: "observeEvent", label: "Observe at least one win, bonus, free game, or near-miss event" },
];
const jackpotConfig = {
  MINI: { start: 150, max: 300, contribution: 0.0065 },
  MINOR: { start: 500, max: 1000, contribution: 0.002 },
  MAJOR: { start: 5000, max: 12000, contribution: 0.008 },
  GRAND: { start: 10000, max: 25000, contribution: 0.004 },
};
const paytable = {
  bar: { 3: 0.05, 4: 0.5, 5: 8 },
  A: { 3: 0.05, 4: 0.5, 5: 8 },
  K: { 3: 0.1, 4: 1, 5: 12 },
  Q: { 3: 0.2, 4: 5, 5: 70 },
  diamond: { 3: 1, 4: 30, 5: 400 },
  crown: { 3: 2, 4: 80, 5: 1000 },
};

const state = {
  credits: 0,
  displayCredits: 0,
  showCreditsAsCredits: false,
  betIndex: 1,
  selectedReels: reelsByBetIndex[1],
  selectedMultiplier: 1,
  selectedDenomCents: 1,
  selectedTotalRtp: 0.88,
  lastWin: 0,
  freeSpinWinTotal: 0,
  bonusSpins: 0,
  expandedBonusSpins: 0,
  chests: createInitialChests(),
  jackpotBanksByDenom: createInitialJackpotBanks(),
  jackpots: null,
  scratchActive: false,
  scratchResolve: null,
  scratchSequence: [],
  scratchCounts: {},
  scratchPrize: null,
  scratchPickLimit: scratchCardCount,
  spinning: false,
  sound: true,
  audioUnlocked: false,
  currentOverlay: null,
  overlaySequenceId: 0,
  autoPlayStopRequested: false,
  testModeLabel: "Guest Demo Mode",
  testSessionId: "",
  testStats: createDefaultTestStats(),
  testerMission: loadTesterMission(),
  selectedFeedbackTags: [],
};

state.jackpots = jackpotBankForDenom(state.selectedDenomCents);
state.testSessionId = getOrCreateTestSessionId();
state.testStats = loadTestStats();

const els = {
  creditsMeter: document.querySelector("#creditsMeter"),
  credits: document.querySelector("#credits"),
  bet: document.querySelector("#bet"),
  ways: document.querySelector("#ways"),
  multiplier: document.querySelector("#multiplier"),
  denom: document.querySelector("#denom"),
  rtp: document.querySelector("#rtp"),
  lastWin: document.querySelector("#lastWin"),
  bonusSpins: document.querySelector("#bonusSpins"),
  message: document.querySelector("#message"),
  reels: [...document.querySelectorAll(".reel")],
  startDemoButton: document.querySelector("#startDemoButton"),
  zeroCreditCta: document.querySelector("#zeroCreditCta"),
  zeroCreditStartButton: document.querySelector("#zeroCreditStartButton"),
  spinButton: document.querySelector("#spinButton"),
  decreaseBet: document.querySelector("#decreaseBet"),
  increaseBet: document.querySelector("#increaseBet"),
  maxBet: document.querySelector("#maxBet"),
  autoSpin: document.querySelector("#autoSpin"),
  dropAmount: document.querySelector("#dropAmount"),
  dropButton: document.querySelector("#dropButton"),
  cashOut: document.querySelector("#cashOut"),
  soundButton: document.querySelector("#soundButton"),
  soundButtonText: document.querySelector("#soundButton span"),
  testModeBadge: document.querySelector("#testModeBadge"),
  testInfoToggle: document.querySelector("#testInfoToggle"),
  testInfoPanel: document.querySelector("#testInfoPanel"),
  testInfoClose: document.querySelector("#testInfoClose"),
  testInfoMode: document.querySelector("#testInfoMode"),
  testInfoSession: document.querySelector("#testInfoSession"),
  testInfoViewport: document.querySelector("#testInfoViewport"),
  testInfoDevice: document.querySelector("#testInfoDevice"),
  testInfoPwa: document.querySelector("#testInfoPwa"),
  guideButton: document.querySelector("#guideButton"),
  guideOverlay: document.querySelector("#guideOverlay"),
  guideClose: document.querySelector("#guideClose"),
  machine: document.querySelector(".machine"),
  reelWindow: document.querySelector(".reel-window"),
  chestCards: [...document.querySelectorAll(".chest-card")],
  chestGolds: [...document.querySelectorAll(".chest-gold")],
  chestProgress: [
    document.querySelector("#chestProgress0"),
    document.querySelector("#chestProgress1"),
    document.querySelector("#chestProgress2"),
  ],
  miniJackpot: document.querySelector("#miniJackpot"),
  minorJackpot: document.querySelector("#minorJackpot"),
  majorJackpot: document.querySelector("#majorJackpot"),
  grandJackpot: document.querySelector("#grandJackpot"),
  scratchOverlay: document.querySelector("#scratchOverlay"),
  scratchGrid: document.querySelector("#scratchGrid"),
  scratchStatus: document.querySelector("#scratchStatus"),
  scratchMessage: document.querySelector("#scratchMessage"),
  freeWinOverlay: document.querySelector("#freeWinOverlay"),
  freeWinTitle: document.querySelector("#freeWinTitle"),
  freeWinTotal: document.querySelector("#freeWinTotal"),
  freeWinCaption: document.querySelector("#freeWinCaption"),
  teaseOverlay: document.querySelector("#teaseOverlay"),
  teaseTitle: document.querySelector("#teaseTitle"),
  teaseCaption: document.querySelector("#teaseCaption"),
  vaultBonusIntro: document.querySelector("#vaultBonusIntro"),
  vaultIntroChest: document.querySelector("#vaultIntroChest"),
  vaultIntroGems: document.querySelector("#vaultIntroGems"),
  vaultIntroTitle: document.querySelector("#vaultIntroTitle"),
  multiplierOptions: [...document.querySelectorAll("#multiplierOptions button")],
  betOptions: [...document.querySelectorAll("#betOptions button")],
  denomPicker: document.querySelector("#denomPicker"),
  denomToggle: document.querySelector("#denomToggle"),
  denomOptions: [...document.querySelectorAll("#denomOptions button")],
  introOverlay: document.querySelector("#introOverlay"),
  introStartButton: document.querySelector("#introStartButton"),
  introClose: document.querySelector("#introClose"),
  feedbackButton: document.querySelector("#feedbackButton"),
  feedbackOverlay: document.querySelector("#feedbackOverlay"),
  feedbackText: document.querySelector("#feedbackText"),
  feedbackDeviceNote: document.querySelector("#feedbackDeviceNote"),
  feedbackSubmit: document.querySelector("#feedbackSubmit"),
  feedbackCancel: document.querySelector("#feedbackCancel"),
  feedbackSession: document.querySelector("#feedbackSession"),
  feedbackStats: document.querySelector("#feedbackStats"),
  feedbackTagButtons: [...document.querySelectorAll("#feedbackTagButtons button")],
  selectedFeedbackTags: document.querySelector("#selectedFeedbackTags"),
  copyTestReport: document.querySelector("#copyTestReport"),
  reportFallback: document.querySelector("#reportFallback"),
  reportFallbackText: document.querySelector("#reportFallbackText"),
  reportStatus: document.querySelector("#reportStatus"),
  guideStats: document.querySelector("#guideStats"),
  sessionSummary: document.querySelector("#sessionSummary"),
  guideSessionSummary: document.querySelector("#guideSessionSummary"),
  testerMissionProgress: document.querySelector("#testerMissionProgress"),
  testerMissionList: document.querySelector("#testerMissionList"),
  guideMissionProgress: document.querySelector("#guideMissionProgress"),
  guideMissionList: document.querySelector("#guideMissionList"),
  dailyDemoButton: document.querySelector("#dailyDemoButton"),
  dailyDemoStatus: document.querySelector("#dailyDemoStatus"),
};

let audioContext;
let autoSpinTimer;
let creditAnimationFrame;
let demoMessageTimer;
let teaseTimer;
let cabinetPulseTimer;

function createDefaultTestStats() {
  const now = new Date().toISOString();
  return {
    totalSpins: 0,
    totalWins: 0,
    totalBonusTriggers: 0,
    totalFreeGameTriggers: 0,
    totalFeedbackSubmitted: 0,
    firstVisitAt: now,
    lastVisitAt: now,
  };
}

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Telegram and private browsers may restrict storage; the game should still run.
  }
}

function localDateKey(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function createDefaultTesterMission() {
  return {
    completed: {},
    betLevelsTried: [],
    denomOptionsTried: [],
    lastUpdatedAt: new Date().toISOString(),
  };
}

function uniqueNumberList(value) {
  return [...new Set((Array.isArray(value) ? value : []).map(Number).filter(Number.isFinite))];
}

function loadTesterMission() {
  const defaults = createDefaultTesterMission();
  const stored = safeLocalStorageGet(testerMissionStorageKey);
  let parsed = {};

  if (stored) {
    try {
      parsed = JSON.parse(stored) || {};
    } catch {
      parsed = {};
    }
  }

  return {
    ...defaults,
    ...parsed,
    completed: { ...(parsed.completed || {}) },
    betLevelsTried: uniqueNumberList(parsed.betLevelsTried),
    denomOptionsTried: uniqueNumberList(parsed.denomOptionsTried),
  };
}

function saveTesterMission() {
  state.testerMission.lastUpdatedAt = new Date().toISOString();
  safeLocalStorageSet(testerMissionStorageKey, JSON.stringify(state.testerMission));
}

function markTesterMissionComplete(id) {
  if (!testerMissionDefinitions.some((mission) => mission.id === id)) return;
  if (state.testerMission.completed[id]) return;
  state.testerMission.completed[id] = true;
  saveTesterMission();
  renderTesterMission();
  if (missionProgress().completed === testerMissionDefinitions.length) {
    setHiddenMessage("Test checklist completed.");
  }
}

function addMissionNumberValue(key, value) {
  const list = uniqueNumberList(state.testerMission[key]);
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || list.includes(numericValue)) return;
  state.testerMission[key] = [...list, numericValue];
  saveTesterMission();
  renderTesterMission();
}

function missionCompletionMap() {
  const completed = { ...state.testerMission.completed };
  completed.spin20 = state.testStats.totalSpins >= 20;
  completed.tryBetLevels = uniqueNumberList(state.testerMission.betLevelsTried).length >= 2;
  completed.tryDenoms = uniqueNumberList(state.testerMission.denomOptionsTried).length >= 2;
  completed.submitFeedback = completed.submitFeedback || state.testStats.totalFeedbackSubmitted > 0;
  completed.observeEvent =
    completed.observeEvent ||
    state.testStats.totalWins > 0 ||
    state.testStats.totalBonusTriggers > 0 ||
    state.testStats.totalFreeGameTriggers > 0;
  return completed;
}

function missionProgress() {
  const completed = missionCompletionMap();
  const count = testerMissionDefinitions.filter((mission) => completed[mission.id]).length;
  return {
    completed: count,
    total: testerMissionDefinitions.length,
    label: `${count} / ${testerMissionDefinitions.length} completed`,
  };
}

function renderTesterMission() {
  if (!els.testerMissionProgress && !els.guideMissionProgress) return;
  const completed = missionCompletionMap();
  const progress = missionProgress();
  const markup = testerMissionDefinitions
    .map((mission) => {
      const done = Boolean(completed[mission.id]);
      return `<li class="${done ? "complete" : ""}"><span>${done ? "✓" : "○"}</span>${mission.label}</li>`;
    })
    .join("");

  [els.testerMissionProgress, els.guideMissionProgress].forEach((element) => {
    if (element) element.textContent = progress.label;
  });
  [els.testerMissionList, els.guideMissionList].forEach((element) => {
    if (element) element.innerHTML = markup;
  });
  renderSessionSummary();
}

function generateTestSessionId() {
  const date = new Date();
  const datePart = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, "X");
  return `NHS-${datePart}-${randomPart}`;
}

function getOrCreateTestSessionId() {
  const existing = safeLocalStorageGet(testSessionStorageKey);
  if (existing && /^NHS-\d{8}-[A-Z0-9]{5}$/.test(existing)) {
    return existing;
  }

  const nextSessionId = generateTestSessionId();
  safeLocalStorageSet(testSessionStorageKey, nextSessionId);
  return nextSessionId;
}

function loadTestStats() {
  const defaults = createDefaultTestStats();
  const stored = safeLocalStorageGet(testStatsStorageKey);
  let parsed = {};

  if (stored) {
    try {
      parsed = JSON.parse(stored) || {};
    } catch {
      parsed = {};
    }
  }

  const stats = {
    ...defaults,
    ...parsed,
    lastVisitAt: new Date().toISOString(),
  };

  ["totalSpins", "totalWins", "totalBonusTriggers", "totalFreeGameTriggers", "totalFeedbackSubmitted"].forEach(
    (key) => {
      stats[key] = Math.max(0, Number(stats[key]) || 0);
    },
  );

  if (!parsed.firstVisitAt) {
    stats.firstVisitAt = defaults.firstVisitAt;
  }

  saveTestStats(stats);
  return stats;
}

function saveTestStats(stats = state.testStats) {
  safeLocalStorageSet(testStatsStorageKey, JSON.stringify(stats));
}

function incrementTestCounter(key, amount = 1) {
  state.testStats[key] = Math.max(0, Number(state.testStats[key]) || 0) + amount;
  state.testStats.lastVisitAt = new Date().toISOString();
  saveTestStats();
  renderTestStats();
}

function formatTestTimestamp(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderTestStats() {
  if (els.feedbackSession) {
    els.feedbackSession.textContent = `Test Session: ${state.testSessionId}`;
  }

  const spinsPerFeedback =
    state.testStats.totalFeedbackSubmitted > 0
      ? (state.testStats.totalSpins / state.testStats.totalFeedbackSubmitted).toFixed(1)
      : "N/A";
  const rows = [
    ["Total Spins", state.testStats.totalSpins],
    ["Total Wins", state.testStats.totalWins],
    ["Bonus Triggers", state.testStats.totalBonusTriggers],
    ["Free Game Triggers", state.testStats.totalFreeGameTriggers],
    ["Feedback Submitted", state.testStats.totalFeedbackSubmitted],
    ["Spins / Feedback", spinsPerFeedback],
    ["First Visit", formatTestTimestamp(state.testStats.firstVisitAt)],
    ["Last Visit", formatTestTimestamp(state.testStats.lastVisitAt)],
  ];
  const markup = rows
    .map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`)
    .join("");

  [els.feedbackStats, els.guideStats].forEach((element) => {
    if (element) {
      element.innerHTML = markup;
    }
  });
  renderTesterMission();
  renderSessionSummary();
}

function sessionSummaryRows() {
  const progress = missionProgress();
  return [
    ["Test Session ID", state.testSessionId],
    ["Mode", state.testModeLabel],
    ["Total Spins", state.testStats.totalSpins],
    ["Total Wins", state.testStats.totalWins],
    ["Bonus Triggers", state.testStats.totalBonusTriggers],
    ["Free Game Triggers", state.testStats.totalFreeGameTriggers],
    ["Feedback Submitted", state.testStats.totalFeedbackSubmitted],
    ["First Visit", formatTestTimestamp(state.testStats.firstVisitAt)],
    ["Last Visit", formatTestTimestamp(state.testStats.lastVisitAt)],
    ["Tester Mission", progress.label],
  ];
}

function renderSessionSummary() {
  const markup = sessionSummaryRows()
    .map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`)
    .join("");

  [els.sessionSummary, els.guideSessionSummary].forEach((element) => {
    if (element) element.innerHTML = markup;
  });
}

function updateDailyDemoCreditUi() {
  const claimedToday = safeLocalStorageGet(dailyDemoCreditStorageKey) === localDateKey();
  if (els.dailyDemoButton) {
    els.dailyDemoButton.disabled = state.spinning || state.scratchActive || claimedToday;
  }
  if (els.dailyDemoStatus) {
    els.dailyDemoStatus.textContent = claimedToday
      ? "Daily demo credits already claimed today."
      : "Daily demo credits are virtual test points for testing only.";
  }
}

function buildTestReport() {
  const progress = missionProgress();
  const feedback = els.feedbackText?.value.trim() || "";
  const deviceNote = els.feedbackDeviceNote?.value.trim() || "";
  const tags = state.selectedFeedbackTags.length ? state.selectedFeedbackTags.join(", ") : "None";
  const missionLines = testerMissionDefinitions
    .map((mission) => {
      const complete = missionCompletionMap()[mission.id] ? "complete" : "open";
      return `- ${mission.label}: ${complete}`;
    })
    .join("\n");

  return [
    "Project: NEON HUNTER SPIN",
    `Version: ${appVersion}`,
    `Test Session ID: ${state.testSessionId}`,
    `Mode: ${state.testModeLabel}`,
    `Device/browser: ${deviceLabel()}`,
    `Viewport: ${window.innerWidth} x ${window.innerHeight}`,
    `PWA status: ${pwaStatusLabel()}`,
    "",
    "Test Stats:",
    `- Total Spins: ${state.testStats.totalSpins}`,
    `- Total Wins: ${state.testStats.totalWins}`,
    `- Bonus Triggers: ${state.testStats.totalBonusTriggers}`,
    `- Free Game Triggers: ${state.testStats.totalFreeGameTriggers}`,
    `- Feedback Submitted: ${state.testStats.totalFeedbackSubmitted}`,
    `- First Visit: ${formatTestTimestamp(state.testStats.firstVisitAt)}`,
    `- Last Visit: ${formatTestTimestamp(state.testStats.lastVisitAt)}`,
    "",
    `Selected quick feedback tags: ${tags}`,
    `Device note: ${deviceNote || "None"}`,
    `Written feedback: ${feedback || "None"}`,
    "",
    `Tester Mission Progress: ${progress.label}`,
    missionLines,
  ].join("\n");
}

function showReportFallback(report) {
  if (!els.reportFallback || !els.reportFallbackText) return;
  els.reportFallback.hidden = false;
  els.reportFallbackText.value = report;
  els.reportFallbackText.focus({ preventScroll: true });
  els.reportFallbackText.select();
}

function setReportStatus(text) {
  if (els.reportStatus) {
    els.reportStatus.textContent = text;
  }
}

async function copyTestReport() {
  const report = buildTestReport();
  if (els.reportFallback) {
    els.reportFallback.hidden = true;
  }
  setReportStatus("");

  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard unavailable");
    }
    await navigator.clipboard.writeText(report);
    setReportStatus("Test report copied. Send it manually to the test coordinator.");
    setHiddenMessage("Test report copied. Send it manually to the test coordinator.");
  } catch {
    showReportFallback(report);
    setReportStatus("Clipboard unavailable. Copy the report manually from this panel.");
    setHiddenMessage("Copy the test report manually from the feedback panel.");
  }
}

function deviceLabel() {
  const ua = navigator.userAgent || "";
  const isTelegram = Boolean(window.Telegram?.WebApp) || /Telegram/i.test(ua);
  const isIphone = /iPhone|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isChrome = /Chrome|CriOS/i.test(ua);
  const isSafari = /Safari/i.test(ua) && !isChrome;

  if (isTelegram) return "Telegram In-App Browser";
  if (isIphone && isSafari) return "iPhone Safari";
  if (isAndroid && isChrome) return "Android Chrome";
  if (!/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) return "Desktop Browser";
  return "Unknown";
}

function pwaStatusLabel() {
  const standalone =
    window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone;
  return standalone ? "Standalone Mode" : "Browser Mode";
}

function updateTestInfoPanel() {
  const viewport = `${window.innerWidth} x ${window.innerHeight}`;
  const values = [
    [els.testInfoMode, state.testModeLabel],
    [els.testInfoSession, state.testSessionId],
    [els.testInfoViewport, viewport],
    [els.testInfoDevice, deviceLabel()],
    [els.testInfoPwa, pwaStatusLabel()],
  ];

  values.forEach(([element, value]) => {
    if (element) {
      element.textContent = value;
    }
  });
}

function setTestInfoOpen(open) {
  if (!els.testInfoPanel || !els.testInfoToggle) return;
  updateTestInfoPanel();
  els.testInfoPanel.classList.toggle("open", open);
  els.testInfoPanel.setAttribute("aria-hidden", String(!open));
  els.testInfoToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    markTesterMissionComplete("openTestInfo");
  }
}

function testInfoOpen() {
  return els.testInfoPanel?.classList.contains("open");
}

function renderSelectedFeedbackTags() {
  els.feedbackTagButtons.forEach((button) => {
    button.classList.toggle("selected", state.selectedFeedbackTags.includes(button.dataset.feedbackTag));
  });

  if (!els.selectedFeedbackTags) return;
  els.selectedFeedbackTags.textContent = state.selectedFeedbackTags.length
    ? `Selected: ${state.selectedFeedbackTags.join(", ")}`
    : "No tags selected";
}

function toggleFeedbackTag(tag) {
  if (!feedbackTagOptions.includes(tag)) return;
  state.selectedFeedbackTags = state.selectedFeedbackTags.includes(tag)
    ? state.selectedFeedbackTags.filter((selectedTag) => selectedTag !== tag)
    : [...state.selectedFeedbackTags, tag];
  renderSelectedFeedbackTags();
}

function initializeTelegramMode() {
  const telegramApp = window.Telegram?.WebApp;
  state.testModeLabel = telegramApp ? "Telegram Test Mode" : "Guest Demo Mode";

  if (telegramApp) {
    try {
      telegramApp.ready?.();
      telegramApp.expand?.();
    } catch {
      // Telegram WebApp methods are optional in some test shells.
    }
  }

  if (els.testModeBadge) {
    els.testModeBadge.textContent = state.testModeLabel;
    els.testModeBadge.classList.toggle("telegram", Boolean(telegramApp));
  }
  updateTestInfoPanel();
}

function createInitialChests() {
  return [0, 1, 2].map((index) => createChest(index));
}

function createInitialJackpots() {
  return {
    MINI: createJackpotState("MINI"),
    MINOR: createJackpotState("MINOR"),
    MAJOR: createJackpotState("MAJOR"),
    GRAND: createJackpotState("GRAND"),
  };
}

function createInitialJackpotBanks() {
  return Object.fromEntries(denomSteps.map((denomCents) => [denomCents, createInitialJackpots()]));
}

function jackpotBankForDenom(denomCents) {
  if (!state.jackpotBanksByDenom[denomCents]) {
    state.jackpotBanksByDenom[denomCents] = createInitialJackpots();
  }
  return state.jackpotBanksByDenom[denomCents];
}

function switchJackpotBankForDenom(denomCents) {
  state.jackpots = jackpotBankForDenom(denomCents);
}

function createJackpotState(label) {
  const config = jackpotConfig[label];
  const fixedTargetJackpots = ["MINI", "MINOR"];

  return {
    value: config.start,
    target: fixedTargetJackpots.includes(label)
      ? config.max
      : config.start + Math.random() * (config.max - config.start),
  };
}

function createChest(index) {
  return {
    progress: 0.16 + Math.random() * 0.05,
    threshold: 0.45 + Math.random() * 0.45,
    gems: createChestGems(index),
    gemKey: `${index}-${Math.random().toString(36).slice(2)}`,
    index,
  };
}

function createChestGems(chestIndex) {
  const gemPalettes = [
    ["#ffe76d", "#ffb13b", "#fff4b0", "#ff6f91", "#75d6ff"],
    ["#65f2b7", "#1fc4a5", "#b9ffe4", "#ffdf6c", "#5aa7ff"],
    ["#bd8cff", "#6ea8ff", "#ff73b5", "#ffe06a", "#dff3ff"],
  ];
  const shapes = ["round", "diamond", "chip"];
  const palette = gemPalettes[chestIndex % gemPalettes.length];

  return Array.from({ length: 22 }, (_, index) => {
    const layer = Math.floor(index / 7);
    return {
      left: 8 + Math.random() * 78,
      bottom: 2 + layer * 7 + Math.random() * 6,
      size: 5 + Math.random() * 8,
      rotate: Math.random() * 90 - 45,
      color: palette[Math.floor(Math.random() * palette.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    };
  });
}

function bonusModeActive() {
  return state.bonusSpins > 0 || state.expandedBonusSpins > 0;
}

function totalWeightForReel(reelIndex) {
  return reelWeights[reelIndex].reduce((sum, value) => sum + value, 0);
}

function symbolChanceOnReel(symbol, reelIndex) {
  const symbolId = typeof symbol === "string" ? symbol : symbol.id;
  const symbolIndex = symbols.findIndex((item) => item.id === symbolId);
  if (symbolIndex < 0) return 0;
  return reelWeights[reelIndex][symbolIndex] / totalWeightForReel(reelIndex);
}

function weightedSymbol(reelIndex) {
  const weights = reelWeights[reelIndex];
  const total = totalWeightForReel(reelIndex);
  let roll = Math.random() * total;

  for (let index = 0; index < symbols.length; index += 1) {
    roll -= weights[index];
    if (roll <= 0) return symbols[index];
  }

  return symbols[0];
}

function currentBet() {
  return betSteps[state.betIndex] * state.selectedMultiplier;
}

function activeReelsForBetIndex(index) {
  return reelsByBetIndex[index] || reelCount;
}

function applyBetReelRule() {
  const previousReels = state.selectedReels;
  state.selectedReels = activeReelsForBetIndex(state.betIndex);
  animateReelAvailabilityChange(previousReels, state.selectedReels);
}

function animateReelAvailabilityChange(previousReels, nextReels) {
  if (!els.reels?.length || previousReels === nextReels) return;

  els.reels.forEach((reel, index) => {
    reel.classList.remove("reel-opening", "reel-closing");

    const wasActive = index < previousReels;
    const isActive = index < nextReels;
    if (!wasActive && isActive) {
      reel.classList.add("reel-opening");
      setTimeout(() => reel.classList.remove("reel-opening"), 460);
    } else if (wasActive && !isActive) {
      reel.classList.add("reel-closing");
      setTimeout(() => reel.classList.remove("reel-closing"), 300);
    }
  });

  flashReelLamps();
  flashWaysMeter();
}

function flashReelLamps() {
  document.querySelectorAll(".reel-lamps-top, .reel-lamps-bottom").forEach((lampRow) => {
    lampRow.classList.remove("lamps-flash");
    void lampRow.offsetWidth;
    lampRow.classList.add("lamps-flash");
    setTimeout(() => lampRow.classList.remove("lamps-flash"), 650);
  });
}

function flashWaysMeter() {
  if (!els.ways) return;
  els.ways.classList.remove("ways-update");
  void els.ways.offsetWidth;
  els.ways.classList.add("ways-update");
  setTimeout(() => els.ways.classList.remove("ways-update"), 420);
}

function fixedRtpForDenom(denomCents) {
  return rtpByDenomCents.get(denomCents) || rtpSteps[0];
}

function applyDenomRtpRule() {
  state.selectedTotalRtp = fixedRtpForDenom(state.selectedDenomCents);
}

function convertCreditAmountForDenom(amount, oldDenomCents, newDenomCents) {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return (amount * oldDenomCents) / newDenomCents;
}

function preserveCashValueForDenomChange(oldDenomCents, newDenomCents) {
  state.credits = convertCreditAmountForDenom(state.credits, oldDenomCents, newDenomCents);
  state.displayCredits = convertCreditAmountForDenom(
    state.displayCredits,
    oldDenomCents,
    newDenomCents,
  );
  state.lastWin = convertCreditAmountForDenom(state.lastWin, oldDenomCents, newDenomCents);
  state.freeSpinWinTotal = convertCreditAmountForDenom(
    state.freeSpinWinTotal,
    oldDenomCents,
    newDenomCents,
  );
}

function formatMoney(credits) {
  const amount = (credits * state.selectedDenomCents) / 100;
  if (amount > maxDisplayAmount) return cappedDisplayAmount;

  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCreditAmount(credits) {
  if (credits > maxDisplayAmount) return `${cappedDisplayAmount} CREDIT`;

  return `${credits.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} CREDIT`;
}

function formatDisplayAmount(credits) {
  return state.showCreditsAsCredits ? formatCreditAmount(credits) : formatMoney(credits);
}

function denomLabel(denomCents = state.selectedDenomCents) {
  if (denomCents >= 100) return `$${denomCents / 100}`;
  return `${denomCents}¢`;
}

function renderCredits() {
  els.credits.textContent = state.showCreditsAsCredits
    ? formatCreditAmount(state.displayCredits)
    : formatMoney(state.displayCredits);
  els.creditsMeter.classList.toggle("credit-mode", state.showCreditsAsCredits);
  els.creditsMeter.setAttribute(
    "aria-label",
    state.showCreditsAsCredits
      ? "Credit display active. Press to show currency-style value."
      : "Currency-style value active. Press to show credits.",
  );
}

function setCredits(nextCredits, animate = false) {
  const nextValue = Math.max(0, nextCredits);
  const startValue = state.displayCredits;
  const creditsIncreasing = nextValue > startValue;
  state.credits = nextValue;

  if (creditAnimationFrame) {
    cancelAnimationFrame(creditAnimationFrame);
    creditAnimationFrame = null;
  }

  if (!animate || Math.abs(nextValue - startValue) < 0.01) {
    state.displayCredits = nextValue;
    renderCredits();
    return;
  }

  const startedAt = performance.now();
  const centsToAnimate = Math.abs(nextValue - startValue) * state.selectedDenomCents;
  const duration = Math.max(120, (centsToAnimate / creditOdometerCentsPerSecond) * 1000);
  let lastStackSoundAt = 0;
  let stackSoundStep = 0;

  function tick(now) {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = 1 - (1 - progress) ** 3;
    state.displayCredits = startValue + (nextValue - startValue) * eased;
    renderCredits();

    if (creditsIncreasing && now - lastStackSoundAt > 95) {
      playCreditStackSound(stackSoundStep);
      stackSoundStep += 1;
      lastStackSoundAt = now;
    }

    if (progress < 1) {
      creditAnimationFrame = requestAnimationFrame(tick);
    } else {
      state.displayCredits = nextValue;
      creditAnimationFrame = null;
      renderCredits();
      updateUi();
    }
  }

  creditAnimationFrame = requestAnimationFrame(tick);
}

function settleCreditAnimation() {
  if (!creditAnimationFrame) return;

  cancelAnimationFrame(creditAnimationFrame);
  creditAnimationFrame = null;
  state.displayCredits = state.credits;
  renderCredits();
}

function addCredits(amount, animate = true) {
  if (amount <= 0) return;
  setCredits(state.credits + amount, animate);
}

function demoCreditAmountForCurrentDenom(baseCreditAmount) {
  const baseDenomCents = denomSteps[0];
  return (baseCreditAmount * baseDenomCents) / state.selectedDenomCents;
}

function demoStartCreditAmountForCurrentDenom() {
  return demoCreditAmountForCurrentDenom(demoStartCredits);
}

function activeWays() {
  return visibleRows ** state.selectedReels;
}

function denomPickerOpen() {
  return !els.denomOptions[0]?.parentElement.hidden;
}

function setDenomPickerOpen(open) {
  const canOpen = open && !state.spinning && !bonusModeActive() && !state.scratchActive;
  const options = els.denomOptions[0]?.parentElement;
  if (!options) return;

  options.hidden = !canOpen;
  els.denomPicker.classList.toggle("open", canOpen);
  els.denomToggle.setAttribute("aria-expanded", String(canOpen));
}

function updateUi() {
  renderCredits();
  els.bet.textContent = formatDisplayAmount(currentBet());
  els.ways.textContent = activeWays();
  els.multiplier.textContent = `x${state.selectedMultiplier}`;
  els.denom.textContent = formatDisplayAmount(1);
  els.rtp.textContent = `${Math.round(state.selectedTotalRtp * 100)}%`;
  els.lastWin.textContent = formatDisplayAmount(state.lastWin);
  els.bonusSpins.textContent = state.bonusSpins + state.expandedBonusSpins;
  els.spinButton.textContent =
    state.expandedBonusSpins > 0 ? "MEGA SPIN" : state.bonusSpins > 0 ? "FREE GAME" : "SPIN";
  els.spinButton.disabled =
    state.scratchActive ||
    state.spinning ||
    (!bonusModeActive() && state.credits < currentBet());
  els.decreaseBet.disabled = state.spinning || bonusModeActive() || state.betIndex === 0;
  els.increaseBet.disabled = state.spinning || bonusModeActive() || state.betIndex === betSteps.length - 1;
  els.maxBet.disabled = state.spinning || bonusModeActive();
  els.autoSpin.disabled = state.spinning || bonusModeActive() || state.scratchActive;
  els.autoSpin.classList.toggle("active", Boolean(autoSpinTimer));
  els.autoSpin.textContent = autoSpinTimer ? "STOP AUTO" : "AUTO PLAY";
  els.startDemoButton.disabled = state.spinning || state.scratchActive;
  els.dropAmount.disabled = state.spinning || state.scratchActive;
  els.dropButton.disabled = state.spinning || state.scratchActive;
  els.cashOut.disabled = state.spinning || state.scratchActive || state.credits <= 0;
  updateDailyDemoCreditUi();
  els.denomToggle.textContent = denomLabel();
  els.denomToggle.disabled = state.spinning || bonusModeActive() || state.scratchActive;
  if (els.denomToggle.disabled) {
    setDenomPickerOpen(false);
  }
  updateSoundButtonUi();
  els.reelWindow.classList.toggle("bonus-mode", bonusModeActive());
  els.reelWindow.classList.toggle("expanded-mode", state.expandedBonusSpins > 0);
  updateChestUi();
  updateJackpotUi();
  els.multiplierOptions.forEach((button) => {
    button.classList.toggle(
      "active",
      Number(button.dataset.multiplier) === state.selectedMultiplier,
    );
    button.disabled = state.spinning || bonusModeActive();
  });
  els.betOptions.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.betIndex) === state.betIndex);
    button.disabled = state.spinning || bonusModeActive();
  });
  els.denomOptions.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.denom) === state.selectedDenomCents);
    button.disabled = state.spinning || bonusModeActive();
  });
  els.reels.forEach((reel, index) => {
    reel.classList.toggle("inactive", index >= state.selectedReels);
  });
  const shouldShowZeroCreditCta =
    state.credits <= 0 &&
    !state.spinning &&
    !state.scratchActive &&
    !bonusModeActive() &&
    !introOpen();
  els.zeroCreditCta.classList.toggle("show", shouldShowZeroCreditCta);
  els.zeroCreditCta.setAttribute("aria-hidden", String(!shouldShowZeroCreditCta));
  els.zeroCreditStartButton.disabled = state.spinning || state.scratchActive;
}

function setMessage(text, isWin = false) {
  els.message.textContent = text;
  els.message.classList.toggle("win", isWin);
  showReelMessageOverlay(text, isWin);
}

function setHiddenMessage(text, isWin = false) {
  els.message.textContent = text;
  els.message.classList.toggle("win", isWin);
}

function setAmountMessage(amount, caption, isWin = false, captionAmount = null) {
  els.message.textContent = `${formatDisplayAmount(amount)} ${caption}`;
  els.message.classList.toggle("win", isWin);
  showReelAmountOverlay(caption, amount, "", isWin, captionAmount);
}

function splitMessageAmount(text) {
  const amountMatch = text.match(/\$\d[\d,]*(?:\.\d{2})?|\d[\d,]*(?:\.\d{2})?\s*CREDIT/);
  if (!amountMatch) {
    return { amountText: "", caption: text };
  }

  const amountText = amountMatch[0];
  const caption = text
    .replace(amountText, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([!,.])/g, "$1")
    .trim();

  return { amountText, caption };
}

function showReelMessageOverlay(text, isWin = false) {
  state.overlaySequenceId += 1;
  state.currentOverlay = {
    type: "message",
    text,
    isWin,
  };
  renderReelOverlay();
}

function showReelAmountOverlay(title, amount, caption, isWin = true, captionAmount = null) {
  state.overlaySequenceId += 1;
  state.currentOverlay = {
    type: "amount",
    title,
    amount,
    caption,
    isWin,
    captionAmount,
  };
  renderReelOverlay();
}

function renderReelOverlay() {
  if (!state.currentOverlay) return;

  els.freeWinOverlay.classList.remove("formula-mode", "formula-blink");

  if (state.currentOverlay.type === "formula") {
    const { formula, caption, isWin } = state.currentOverlay;
    els.freeWinTitle.textContent = "WAYS PAY";
    els.freeWinTotal.textContent = formula;
    els.freeWinCaption.textContent = caption;
    els.freeWinOverlay.classList.add("show", "formula-mode", "formula-blink");
    els.freeWinOverlay.classList.toggle("win", isWin);
    els.freeWinOverlay.classList.remove("message-only");
    els.freeWinOverlay.classList.add("has-amount");
    els.freeWinOverlay.setAttribute("aria-hidden", "false");
    return;
  }

  if (state.currentOverlay.type === "amount") {
    const { title, amount, caption, isWin, captionAmount } = state.currentOverlay;
    const captionParts = [title, caption].filter(Boolean);
    if (captionAmount !== null) {
      captionParts.push(`Total ${formatDisplayAmount(captionAmount)}`);
    }

    els.freeWinTitle.textContent = "";
    els.freeWinTotal.textContent = formatDisplayAmount(amount);
    els.freeWinCaption.textContent = captionParts.join(" · ");
    els.freeWinOverlay.classList.add("show");
    els.freeWinOverlay.classList.toggle("win", isWin);
    els.freeWinOverlay.classList.add("has-amount");
    els.freeWinOverlay.classList.remove("message-only");
    els.freeWinOverlay.setAttribute("aria-hidden", "false");
    return;
  }

  const { text, isWin } = state.currentOverlay;
  const { amountText, caption } = splitMessageAmount(text);
  const hasAmount = amountText.length > 0;

  els.freeWinTitle.textContent = hasAmount ? "" : text;
  els.freeWinTotal.textContent = amountText;
  els.freeWinCaption.textContent = hasAmount ? caption : "";
  els.freeWinOverlay.classList.add("show");
  els.freeWinOverlay.classList.toggle("win", isWin);
  els.freeWinOverlay.classList.toggle("has-amount", hasAmount);
  els.freeWinOverlay.classList.toggle("message-only", !hasAmount);
  els.freeWinOverlay.setAttribute("aria-hidden", "false");
}

function stopAutoSpin() {
  if (!autoSpinTimer) return;
  clearInterval(autoSpinTimer);
  autoSpinTimer = null;
  state.autoPlayStopRequested = false;
  updateUi();
}

function requestAutoPlayStopByUser(event) {
  if (!autoSpinTimer) return;
  if (event?.target && els.autoSpin.contains(event.target)) return;
  state.autoPlayStopRequested = true;
}

function openGuide() {
  markTesterMissionComplete("openGuide");
  renderTestStats();
  els.guideOverlay.classList.add("open");
  els.guideOverlay.setAttribute("aria-hidden", "false");
}

function closeGuide() {
  els.guideOverlay.classList.remove("open");
  els.guideOverlay.setAttribute("aria-hidden", "true");
}

function guideOpen() {
  return els.guideOverlay.classList.contains("open");
}

function introOpen() {
  return els.introOverlay.classList.contains("open");
}

function openIntroModal() {
  els.introOverlay.classList.add("open");
  els.introOverlay.setAttribute("aria-hidden", "false");
  updateUi();
  setTimeout(() => els.introStartButton.focus({ preventScroll: true }), 50);
}

function closeIntroModal() {
  els.introOverlay.classList.remove("open");
  els.introOverlay.setAttribute("aria-hidden", "true");
  updateUi();
}

function maybeShowIntroModal() {
  if (!introSeen()) {
    openIntroModal();
  }
}

function introSeen() {
  try {
    return sessionStorage.getItem(introSeenStorageKey) === "true";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(introSeenStorageKey, "true");
  } catch {
    // Some embedded webviews can block storage; the modal still closes for the current page.
  }
}

function finishIntroStart() {
  markIntroSeen();
  closeIntroModal();
  if (state.credits <= 0) {
    startDemoCredits();
  } else {
    setHiddenMessage("Tap SPIN to start the demo.", true);
    showReelMessageOverlay("Tap SPIN to start the demo.", true);
  }
}

function showDemoCreditsLoadedMessage() {
  if (demoMessageTimer) {
    clearTimeout(demoMessageTimer);
    demoMessageTimer = null;
  }

  setHiddenMessage("Demo credits loaded. Tap SPIN to start the demo.", true);
  state.overlaySequenceId += 1;
  const sequenceId = state.overlaySequenceId;
  state.currentOverlay = {
    type: "message",
    text: "Demo credits loaded. Tap SPIN to start the demo.",
    isWin: true,
  };
  els.freeWinOverlay.classList.add("demo-loaded-pop");
  renderReelOverlay();

  demoMessageTimer = setTimeout(() => {
    if (sequenceId === state.overlaySequenceId) {
      hideReelWinOverlay();
    }
    els.freeWinOverlay.classList.remove("demo-loaded-pop");
    demoMessageTimer = null;
  }, 2000);
}

function triggerHaptic(type = "spin") {
  if (!("vibrate" in navigator)) return;

  const patterns = {
    spin: 18,
    win: [35, 30, 45],
    bonus: [60, 40, 80, 40, 120],
  };

  try {
    navigator.vibrate(patterns[type] || patterns.spin);
  } catch {
    // Some browsers expose vibrate but block it. Gameplay should continue silently.
  }
}

function feedbackOpen() {
  return els.feedbackOverlay.classList.contains("open");
}

function openFeedbackModal() {
  stopAutoSpin();
  renderTestStats();
  renderSelectedFeedbackTags();
  if (els.reportFallback) {
    els.reportFallback.hidden = true;
  }
  setReportStatus("");
  els.feedbackOverlay.classList.add("open");
  els.feedbackOverlay.setAttribute("aria-hidden", "false");
}

function closeFeedbackModal() {
  els.feedbackOverlay.classList.remove("open");
  els.feedbackOverlay.setAttribute("aria-hidden", "true");
}

function submitFeedback() {
  const feedback = els.feedbackText.value.trim();
  const deviceNote = els.feedbackDeviceNote?.value.trim() || "";
  const tags = [...state.selectedFeedbackTags];
  incrementTestCounter("totalFeedbackSubmitted");
  markTesterMissionComplete("submitFeedback");
  console.log("NEON HUNTER SPIN feedback:", {
    sessionId: state.testSessionId,
    mode: state.testModeLabel,
    device: deviceLabel(),
    viewport: `${window.innerWidth} x ${window.innerHeight}`,
    pwaStatus: pwaStatusLabel(),
    tags,
    deviceNote,
    feedback,
    stats: { ...state.testStats },
    testerMission: missionProgress(),
    submittedAt: new Date().toISOString(),
  });
  els.feedbackText.value = "";
  if (els.feedbackDeviceNote) {
    els.feedbackDeviceNote.value = "";
  }
  state.selectedFeedbackTags = [];
  renderSelectedFeedbackTags();
  renderTestStats();
  closeFeedbackModal();
  setHiddenMessage("Feedback submitted for this limited test.");
}

function canAutoSpin() {
  return (
    !state.spinning &&
    !state.scratchActive &&
    !bonusModeActive() &&
    state.credits >= currentBet()
  );
}

function toggleAutoSpin() {
  if (autoSpinTimer) {
    stopAutoSpin();
    setMessage("Auto Play stopped.");
    return;
  }

  if (!canAutoSpin()) return;

  state.autoPlayStopRequested = false;
  setMessage("Auto Play started.");
  autoSpinTimer = setInterval(() => {
    if (state.autoPlayStopRequested) {
      stopAutoSpin();
      setMessage("Auto Play stopped by player action.");
      return;
    }
    if (!canAutoSpin()) {
      stopAutoSpin();
      setMessage("Auto Play stopped by bonus or stop condition.");
      return;
    }
    spin();
  }, 2600);
  spin();
  updateUi();
}

function updateChestUi(triggeredIndex = -1) {
  state.chests.forEach((chest, index) => {
    const openStep = Math.min(100, Math.max(0, Math.floor(chest.progress * 100)));
    const open = openStep / 100;
    els.chestCards[index].style.setProperty("--open", open.toFixed(3));
    els.chestCards[index].style.setProperty("--gold-level", open.toFixed(3));
    els.chestCards[index].style.setProperty("--open-step", `${openStep}%`);
    els.chestCards[index].classList.toggle("triggered", index === triggeredIndex);
    els.chestProgress[index].textContent = `${openStep}/100`;
    applyChestHeatState(index);
    renderChestGems(index, chest);
  });
}

function parseChestProgressText(text) {
  const match = String(text || "").match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if (!match) return { current: 0, max: 100 };
  const current = Math.max(0, Number(match[1]) || 0);
  const max = Math.max(1, Number(match[2]) || 100);
  return { current, max };
}

function applyChestHeatState(index) {
  const card = els.chestCards[index];
  const progress = els.chestProgress[index];
  if (!card || !progress) return;

  const { current, max } = parseChestProgressText(progress.textContent);
  const ratio = current / max;
  const isHot = ratio >= 0.9;
  const isWarming = ratio >= 0.7 && !isHot;

  card.classList.toggle("chest-warming", isWarming);
  card.classList.toggle("chest-hot", isHot);
  progress.classList.toggle("progress-warming", isWarming);
  progress.classList.toggle("progress-hot", isHot);
}

function renderChestGems(index, chest) {
  const gold = els.chestGolds[index];
  if (!gold || gold.dataset.gemKey === chest.gemKey) return;

  gold.innerHTML = "";
  chest.gems.forEach((gem) => {
    const piece = document.createElement("i");
    piece.className = `gem ${gem.shape}`;
    piece.style.setProperty("--x", `${gem.left}%`);
    piece.style.setProperty("--y", `${gem.bottom}px`);
    piece.style.setProperty("--s", `${gem.size}px`);
    piece.style.setProperty("--r", `${gem.rotate}deg`);
    piece.style.setProperty("--c", gem.color);
    gold.appendChild(piece);
  });
  gold.dataset.gemKey = chest.gemKey;
}

function updateJackpotUi() {
  els.miniJackpot.textContent = formatDisplayAmount(jackpotValue("MINI"));
  els.minorJackpot.textContent = formatDisplayAmount(jackpotValue("MINOR"));
  els.majorJackpot.textContent = formatDisplayAmount(jackpotValue("MAJOR"));
  els.grandJackpot.textContent = formatDisplayAmount(jackpotValue("GRAND"));
}

function jackpotValue(label) {
  return state.jackpots[label].value;
}

function resetJackpot(label) {
  state.jackpots[label] = createJackpotState(label);
}

function jackpotReady(label) {
  return state.jackpots[label].value >= state.jackpots[label].target;
}

function expectedRawRtp(activeReelCount, rowCounts = Array(reelCount).fill(visibleRows)) {
  return Object.entries(paytable).reduce((total, [symbol, payouts]) => {
    let symbolTotal = 0;
    for (let count = 3; count <= activeReelCount; count += 1) {
      const payout = payouts[count] || 0;
      let expectedWays = 1;

      for (let reelIndex = 0; reelIndex < count; reelIndex += 1) {
        const substituteChance =
          symbolChanceOnReel(symbol, reelIndex) + symbolChanceOnReel(wildSymbol, reelIndex);
        expectedWays *= rowCounts[reelIndex] * substituteChance;
      }

      const stopChance =
        count < activeReelCount
          ? (1 -
              symbolChanceOnReel(symbol, count) -
              symbolChanceOnReel(wildSymbol, count)) **
            rowCounts[count]
          : 1;
      symbolTotal += payout * expectedWays * stopChance;
    }

    return total + symbolTotal;
  }, 0);
}

function rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, rowCounts = Array(reelCount).fill(visibleRows)) {
  if (rawWin <= 0) return 0;

  const targetRtp = isFreeSpin ? bonusFreeSpinTargetRtp : baseGameTargetRtp();
  const scale = targetRtp / expectedRawRtp(activeReelCount, rowCounts);
  const adjustedWin = rawWin * scale;
  const wholeCoins = Math.floor(adjustedWin);
  const fractionalCoin = adjustedWin - wholeCoins;

  return wholeCoins + (Math.random() < fractionalCoin ? 1 : 0);
}

function chestFeatureReserveForBet(spinBet = currentBet()) {
  if (spinBet <= 88) return chestFeatureRtpReserve;

  const highBetSteps = (spinBet - 88) / 88;
  return Math.max(0, chestFeatureRtpReserve - highBetChestReserveRelief * highBetSteps);
}

function bonusRtpContribution(activeReelCount = state.selectedReels, spinBet = currentBet()) {
  if (activeReelCount < reelCount) return 0;
  return targetBonusTriggerRate * expectedBonusFreeSpins() * bonusFreeSpinTargetRtp + chestFeatureReserveForBet(spinBet);
}

function baseGameTargetRtp() {
  return Math.max(0, state.selectedTotalRtp - bonusRtpContribution());
}

function expectedBonusFreeSpins() {
  const retriggerGrowth = targetBonusTriggerRate * bonusSpinAward;
  return bonusSpinAward / (1 - retriggerGrowth);
}

function calculateRawWin(grid, bet, activeReelCount = state.selectedReels) {
  const activeGrid = grid.slice(0, activeReelCount);

  return Object.entries(paytable).reduce((totalWin, [symbol, payouts]) => {
    let matchedReels = 0;
    let ways = 1;

    for (const reel of activeGrid) {
      const symbolCount = reel.filter((cell) => cell.id === symbol || cell.isWild).length;
      if (symbolCount === 0) break;

      matchedReels += 1;
      ways *= symbolCount;
    }

    const multiplier = payouts[matchedReels] || 0;
    return totalWin + bet * multiplier * ways;
  }, 0);
}

function calculateWaysWinDetails(grid, bet, activeReelCount = state.selectedReels) {
  const activeGrid = grid.slice(0, activeReelCount);

  return Object.entries(paytable)
    .map(([symbol, payouts]) => {
      const counts = [];
      let ways = 1;

      for (const reel of activeGrid) {
        const symbolCount = reel.filter((cell) => cell.id === symbol || cell.isWild).length;
        if (symbolCount === 0) break;

        counts.push(symbolCount);
        ways *= symbolCount;
      }

      const matchedReels = counts.length;
      const multiplier = payouts[matchedReels] || 0;
      const rawAmount = bet * multiplier * ways;
      const display = symbolById.get(symbol);

      return {
        symbol,
        symbolName: display?.name || "Symbol",
        counts,
        matchedReels,
        ways,
        multiplier,
        rawAmount,
      };
    })
    .filter((detail) => detail.rawAmount > 0);
}

function distributeAdjustedWin(details, rawWin, adjustedWin) {
  if (rawWin <= 0 || adjustedWin <= 0) return [];

  const distributed = details.map((detail) => {
    const exactAmount = (detail.rawAmount / rawWin) * adjustedWin;
    return {
      ...detail,
      amount: Math.floor(exactAmount),
      remainder: exactAmount - Math.floor(exactAmount),
    };
  });
  let remaining = adjustedWin - distributed.reduce((sum, detail) => sum + detail.amount, 0);

  distributed
    .slice()
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((detail) => {
      if (remaining <= 0) return;
      detail.amount += 1;
      remaining -= 1;
    });

  return distributed.filter((detail) => detail.amount > 0);
}

function formatFormulaMoney(credits) {
  const cents = credits * state.selectedDenomCents;
  if (cents < 100) {
    const roundedCents = Number(cents.toFixed(cents < 1 ? 3 : 2));
    const unit = Math.abs(roundedCents) === 1 ? "cent" : "cents";
    return `${roundedCents.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${unit}`;
  }

  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildWaysWinFormulas(grid, bet, activeReelCount, rawWin, adjustedWin) {
  return distributeAdjustedWin(
    calculateWaysWinDetails(grid, bet, activeReelCount),
    rawWin,
    adjustedWin,
  ).map((detail) => {
    const unitAmount = detail.amount / detail.ways;
    return {
      formula: `${detail.counts.join("x")} WAYS x ${formatFormulaMoney(unitAmount)} = ${formatFormulaMoney(detail.amount)}`,
      caption: `${detail.symbolName} · ${detail.matchedReels} reels · ${detail.ways} ways`,
    };
  });
}

async function showWaysWinFormulaSequence(formulas, restoreOverlay) {
  const sequenceId = (state.overlaySequenceId += 1);

  if (!formulas.length) {
    state.currentOverlay = restoreOverlay;
    renderReelOverlay();
    await wait(1200);
    if (sequenceId === state.overlaySequenceId) {
      hideReelWinOverlay();
    }
    return;
  }

  for (const item of formulas) {
    if (sequenceId !== state.overlaySequenceId) return;
    state.currentOverlay = {
      type: "formula",
      formula: item.formula,
      caption: item.caption,
      isWin: true,
    };
    renderReelOverlay();
    await wait(1500);
  }

  if (sequenceId !== state.overlaySequenceId) return;
  state.currentOverlay = restoreOverlay;
  renderReelOverlay();
  await wait(1200);
  if (sequenceId === state.overlaySequenceId) {
    hideReelWinOverlay();
  }
}

function hasScatter(reel) {
  return reel.some((symbol) => symbol.isScatter);
}

function scatterCount(grid, activeReelCount = state.selectedReels) {
  return grid.slice(0, activeReelCount).reduce((count, reel) => {
    return count + (hasScatter(reel) ? 1 : 0);
  }, 0);
}

function scatterSymbolCount(grid, activeReelCount = state.selectedReels) {
  return grid.slice(0, activeReelCount).reduce((count, reel) => {
    return count + reel.filter((symbol) => symbol.isScatter).length;
  }, 0);
}

function openingScatterPair(grid, activeReelCount = state.selectedReels) {
  return activeReelCount >= reelCount && hasScatter(grid[0]) && hasScatter(grid[1]);
}

function scatterNearMiss(grid, activeReelCount = state.selectedReels) {
  return openingScatterPair(grid, activeReelCount) && !grid.slice(2, activeReelCount).some(hasScatter);
}

function wildOrBonusCount(grid, activeReelCount = state.selectedReels) {
  return grid.slice(0, activeReelCount).reduce((count, reel) => {
    return count + reel.filter((symbol) => symbol.isWild || symbol.isBonus).length;
  }, 0);
}

function isBonusTrigger(grid, activeReelCount = state.selectedReels) {
  if (activeReelCount < reelCount) return false;

  const startsWithScatterPair = hasScatter(grid[0]) && hasScatter(grid[1]);
  const hasExtraScatter = grid.slice(2).some(hasScatter);
  return startsWithScatterPair && hasExtraScatter;
}

function naturalBonusTriggerRate() {
  const reelScatterChances = reelWeights.map((_, reelIndex) => {
    const scatterChance = symbolChanceOnReel(scatterSymbol, reelIndex);
    return 1 - (1 - scatterChance) ** visibleRows;
  });
  const extraScatterChance =
    1 -
    (1 - reelScatterChances[2]) *
      (1 - reelScatterChances[3]) *
      (1 - reelScatterChances[4]);

  return reelScatterChances[0] * reelScatterChances[1] * extraScatterChance;
}

function shouldAddRandomBonus(activeReelCount = state.selectedReels) {
  if (activeReelCount < reelCount) return false;

  const naturalRate = naturalBonusTriggerRate();
  const extraRate = Math.max(0, targetBonusTriggerRate - naturalRate);
  const randomBonusRate = extraRate / (1 - naturalRate);

  return Math.random() < randomBonusRate;
}

function placeScatter(reel) {
  const rowIndex = Math.floor(Math.random() * visibleRows);
  reel[rowIndex] = scatterSymbol;
}

function forceBonusTrigger(grid) {
  placeScatter(grid[0]);
  placeScatter(grid[1]);
  placeScatter(grid[2 + Math.floor(Math.random() * 3)]);
}

function accrueProgressiveJackpots(bet) {
  Object.entries(jackpotConfig).forEach(([label, config]) => {
    state.jackpots[label].value = Math.min(
      config.max,
      state.jackpots[label].value + bet * config.contribution,
    );
  });
}

function advanceChests() {
  const increments = [0.018, 0.014, 0.012];

  state.chests.forEach((chest, index) => {
    chest.progress = Math.min(0.96, chest.progress + increments[index] + Math.random() * 0.012);
  });
}

function chooseChestBonus() {
  const readyChests = state.chests
    .map((chest, index) => ({ chest, index }))
    .filter(({ chest }) => chest.progress >= chest.threshold);
  const pool = readyChests.length
    ? readyChests
    : state.chests.map((chest, index) => ({ chest, index }));

  const totalProgress = pool.reduce((sum, { chest }) => sum + chest.progress, 0);
  let roll = Math.random() * totalProgress;

  for (const { chest, index } of pool) {
    roll -= chest.progress;
    if (roll <= 0) return index;
  }

  return 0;
}

function vaultBonusTitle(index) {
  return ["FREE GAMES UNLOCKED", "SCRATCH JACKPOT BONUS", "DOKKAEBI BONUS"][index] || "DOKKAEBI BONUS";
}

function renderVaultIntroGems(index) {
  els.vaultIntroGems.innerHTML = "";
  createChestGems(index).forEach((gem) => {
    const piece = document.createElement("i");
    const burstX = Math.round((Math.random() - 0.5) * 320);
    const burstY = Math.round(-80 - Math.random() * 180);
    const delay = 0.9 + Math.random() * 0.18;
    const rotation = Math.round((Math.random() - 0.5) * 980);

    piece.className = `vault-flying-gem ${gem.shape}`;
    piece.style.setProperty("--s", `${gem.size + 4}px`);
    piece.style.setProperty("--c", gem.color);
    piece.style.setProperty("--fx", `${burstX}px`);
    piece.style.setProperty("--fy", `${burstY}px`);
    piece.style.setProperty("--delay", `${delay}s`);
    piece.style.setProperty("--r", `${rotation}deg`);
    els.vaultIntroGems.appendChild(piece);
  });
}

function playVaultIntroSound() {
  playJangguRoll(9, 0, 0.08, 0.065);
  playBukHit(0.76, 0.13);
  playBukHit(0.96, 0.16);
  playJing(1.18, 0.11);
  playDaegeumRise(1.32, 0.05);
  playBellCluster(1.58, 8, 0.07);
}

async function playVaultBonusIntro(index) {
  hideReelWinOverlay();
  renderVaultIntroGems(index);
  els.vaultIntroChest.dataset.chest = String(index);
  els.vaultIntroTitle.textContent = vaultBonusTitle(index);
  els.vaultBonusIntro.classList.remove("show", "playing");
  els.vaultBonusIntro.setAttribute("aria-hidden", "true");
  void els.vaultBonusIntro.offsetWidth;

  els.vaultBonusIntro.classList.add("show", "playing");
  els.vaultBonusIntro.setAttribute("aria-hidden", "false");
  playVaultIntroSound();

  await wait(1950);
  els.vaultBonusIntro.classList.remove("show", "playing");
  els.vaultBonusIntro.setAttribute("aria-hidden", "true");
  await wait(160);
}

async function handleChestBonus(index) {
  if (index < 0) return;

  state.spinning = true;
  setHiddenMessage("Dokkaebi gem burst feature reveal in progress");
  state.chests[index].progress = 1;
  updateChestUi(index);
  playBonusStartSound();
  updateUi();
  await playVaultBonusIntro(index);
  state.spinning = false;

  if (index === 0) {
    state.freeSpinWinTotal = 0;
    state.lastWin = 0;
    state.bonusSpins += chestFreeSpinAward;
    pulseCabinet("free-game");
    setMessage(`FREE GAMES UNLOCKED! ${chestFreeSpinAward} Free Games awarded!`, true);
  } else if (index === 1) {
    pulseCabinet("scratch");
    setMessage("SCRATCH JACKPOT BONUS triggered.", true);
    updateUi();
    await wait(600);
    await startScratchBonus();
  } else {
    state.freeSpinWinTotal = 0;
    state.lastWin = 0;
    state.expandedBonusSpins += expandedBonusAward;
    pulseCabinet("dokkaebi");
    setMessage(`DOKKAEBI BONUS! ${expandedBonusAward} Expanded Reel Games awarded!`, true);
  }

  await wait(700);
  state.chests[index] = createChest(index);
  updateUi();
}

function drawScratchPrize() {
  const readyJackpots = jackpotPriority.filter(jackpotReady);
  if (readyJackpots.length > 0) {
    return readyJackpots[0];
  }

  const roll = Math.random();
  if (roll < 0.0005) return "GRAND";
  if (roll < 0.005) return "MAJOR";
  if (roll < 0.13) return "MINOR";
  return "MINI";
}

function buildScratchSequence(prize) {
  const decoys = jackpotLabels.filter((label) => label !== prize);
  return [
    prize,
    decoys[0],
    prize,
    decoys[1],
    decoys[0],
    prize,
    decoys[2],
    decoys[1],
    decoys[2],
    decoys[0],
    decoys[1],
    decoys[2],
  ];
}

function scratchLabel(label) {
  const labels = {
    MINI: "MINI",
    MINOR: "MINOR",
    MAJOR: "MAJOR",
    GRAND: "GRAND",
  };
  return labels[label] || label;
}

function jackpotWinMessage(label, award) {
  const awardText = formatDisplayAmount(award);
  return `${label} Jackpot hit for ${awardText}! ${awardText} paid to the credit meter.`;
}

function createScratchDokkaebiBox(index) {
  const card = document.createElement("button");
  card.className = `scratch-card dokkaebi-scratch-box box-${index % 4}`;
  card.type = "button";
  card.setAttribute("aria-label", `Closed Dokkaebi scratch box ${index + 1}`);
  card.innerHTML = `
    <span class="scratch-box-horns" aria-hidden="true"><i></i><i></i></span>
    <span class="scratch-box-lid" aria-hidden="true"></span>
    <span class="scratch-box-face" aria-hidden="true"><i></i></span>
    <span class="scratch-box-gems" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="scratch-card-prize">?</span>
  `;
  card.addEventListener("click", () => revealScratchCard(card));
  return card;
}

function startScratchBonus() {
  state.scratchActive = true;
  state.scratchPrize = drawScratchPrize();
  state.scratchSequence = buildScratchSequence(state.scratchPrize);
  state.scratchCounts = {};
  state.scratchPickLimit = scratchCardCount;
  els.scratchGrid.innerHTML = "";
  els.scratchStatus.textContent = "0 / 3";
  els.scratchMessage.textContent = "Pick Dokkaebi boxes from the 12-box scratch board.";
  els.scratchOverlay.classList.add("open");
  els.scratchOverlay.setAttribute("aria-hidden", "false");

  for (let index = 0; index < scratchCardCount; index += 1) {
    els.scratchGrid.appendChild(createScratchDokkaebiBox(index));
  }

  updateUi();

  return new Promise((resolve) => {
    state.scratchResolve = resolve;
  });
}

function revealScratchCard(card) {
  if (!state.scratchActive || card.classList.contains("revealed")) return;

  const revealedCount = els.scratchGrid.querySelectorAll(".revealed").length;
  const symbol = state.scratchSequence[revealedCount] || jackpotLabels[revealedCount % jackpotLabels.length];
  card.classList.add("revealed");
  card.dataset.prize = symbol;
  card.setAttribute("aria-label", `Opened Dokkaebi scratch box: ${scratchLabel(symbol)}`);
  const prizeLabel = card.querySelector(".scratch-card-prize");
  if (prizeLabel) {
    prizeLabel.textContent = scratchLabel(symbol);
  } else {
    card.textContent = scratchLabel(symbol);
  }
  playScratchPickSound(revealedCount);

  if (jackpotLabels.includes(symbol)) {
    state.scratchCounts[symbol] = (state.scratchCounts[symbol] || 0) + 1;
    els.scratchStatus.textContent = `${state.scratchCounts[symbol]} / 3 ${symbol}`;

    if (state.scratchCounts[symbol] >= 3) {
      finishScratchBonus(symbol);
      return;
    }
  }

  if (revealedCount + 1 >= state.scratchPickLimit) {
    finishScratchBonus(state.scratchPrize);
  } else {
    els.scratchMessage.textContent = "Pick the next Dokkaebi box.";
  }
}

function finishScratchBonus(prize) {
  if (!state.scratchActive) return;
  state.scratchActive = false;
  els.scratchGrid.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  const winningPrize = prize || state.scratchPrize || "MINI";
  const award = jackpotValue(winningPrize);
  const message = jackpotWinMessage(winningPrize, award);
  triggerHaptic("bonus");
  addCredits(award, true);
  state.lastWin = award;
  resetJackpot(winningPrize);
  els.scratchMessage.textContent = message;
  setMessage(message, true);
  showReelWinOverlay(`${winningPrize} Jackpot Hit`, award, "Jackpot Award");
  const jackpotOverlaySequence = state.overlaySequenceId;
  setTimeout(() => {
    if (state.overlaySequenceId === jackpotOverlaySequence) {
      hideReelWinOverlay();
    }
  }, 1900);
  playWinSound();

  setTimeout(() => {
    els.scratchOverlay.classList.remove("open");
    els.scratchOverlay.setAttribute("aria-hidden", "true");
    state.scratchActive = false;
    const resolve = state.scratchResolve;
    state.scratchResolve = null;
    updateUi();
    if (resolve) resolve();
  }, prize ? 1600 : 1200);
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  audioContext ||= new AudioContextClass();
  return audioContext;
}

async function unlockAudio() {
  const context = getAudioContext();
  if (!context) return false;

  try {
    if (context.state === "suspended") {
      await context.resume();
    }

    const source = context.createBufferSource();
    source.buffer = context.createBuffer(1, 1, context.sampleRate);
    source.connect(context.destination);
    source.start(0);
    state.audioUnlocked = context.state === "running";
    updateSoundButtonUi();
    return state.audioUnlocked;
  } catch {
    state.audioUnlocked = false;
    updateSoundButtonUi();
    return false;
  }
}

function updateSoundButtonUi() {
  if (!els.soundButton) return;
  const soundReady = state.sound && state.audioUnlocked;
  const soundLabel = state.sound ? (soundReady ? "Sound ON" : "Tap Sound") : "Sound OFF";
  els.soundButton.setAttribute(
    "aria-label",
    state.sound ? "Sound is on. Tap to test or turn sound off" : "Sound is off. Tap to turn sound on",
  );
  els.soundButton.classList.toggle("active", state.sound);
  els.soundButton.classList.toggle("unlocked", soundReady);
  els.soundButton.classList.toggle("needs-unlock", state.sound && !state.audioUnlocked);
  if (els.soundButtonText) {
    els.soundButtonText.textContent = soundLabel;
  }
}

async function unlockAudioForUserGesture() {
  if (!state.sound) return false;
  const unlocked = await unlockAudio();
  if (unlocked) {
    return true;
  }
  setHiddenMessage("Tap Sound ON, then tap SPIN again if your iPhone blocks audio.");
  return false;
}

function playTone(frequency, duration, type = "sine", delay = 0, volume = 0.12) {
  if (!state.sound) return;

  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    context
      .resume()
      .then(() => {
        state.audioUnlocked = context.state === "running";
        updateSoundButtonUi();
        if (state.audioUnlocked) {
          playTone(frequency, duration, type, delay, volume);
        }
      })
      .catch(() => {});
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime + delay;

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

// Small synthetic cues inspired by Korean percussion, strings, reeds, and bells.
function playNoiseBurst(duration, delay = 0, volume = 0.035, filterFrequency = 700, filterType = "bandpass") {
  if (!state.sound) return;

  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    context
      .resume()
      .then(() => {
        state.audioUnlocked = context.state === "running";
        updateSoundButtonUi();
        if (state.audioUnlocked) {
          playNoiseBurst(duration, delay, volume, filterFrequency, filterType);
        }
      })
      .catch(() => {});
    return;
  }

  const sampleCount = Math.max(1, Math.floor(context.sampleRate * duration));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < sampleCount; index += 1) {
    const fade = 1 - index / sampleCount;
    data[index] = (Math.random() * 2 - 1) * fade;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const start = context.currentTime + delay;

  filter.type = filterType;
  filter.frequency.value = filterFrequency;
  filter.Q.value = 4.5;
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(start);
  source.stop(start + duration + 0.02);
}

function playBukHit(delay = 0, volume = 0.12) {
  playTone(92, 0.18, "sine", delay, volume);
  playTone(138, 0.09, "triangle", delay + 0.015, volume * 0.58);
  playNoiseBurst(0.07, delay, volume * 0.22, 260, "lowpass");
}

function playJangguHit(delay = 0, high = false, volume = 0.08) {
  const baseTone = high ? 210 : 128;
  playTone(baseTone, 0.065, "triangle", delay, volume);
  playTone(baseTone * 1.42, 0.045, "sine", delay + 0.018, volume * 0.45);
  playNoiseBurst(0.045, delay, volume * 0.18, high ? 760 : 420, "bandpass");
}

function playJangguRoll(count = 6, startDelay = 0, step = 0.07, volume = 0.06) {
  for (let index = 0; index < count; index += 1) {
    playJangguHit(startDelay + index * step, index % 2 === 1, volume * (1 + index * 0.035));
  }
}

function playJing(delay = 0, volume = 0.1) {
  [146, 219, 292, 438].forEach((tone, index) => {
    playTone(tone, 0.72 - index * 0.07, index % 2 ? "triangle" : "sine", delay + index * 0.012, volume * (0.9 - index * 0.14));
  });
  playNoiseBurst(0.18, delay, volume * 0.18, 980, "bandpass");
}

function playKwaenggwari(delay = 0, volume = 0.1) {
  [880, 1180, 1490, 2110].forEach((tone, index) => {
    playTone(tone, 0.16 - index * 0.018, index % 2 ? "square" : "triangle", delay + index * 0.018, volume * (0.82 - index * 0.12));
  });
  playNoiseBurst(0.12, delay + 0.01, volume * 0.22, 1700, "highpass");
}

function playGayageumPluck(frequency, delay = 0, volume = 0.08) {
  playTone(frequency, 0.18, "triangle", delay, volume);
  playTone(frequency * 2.01, 0.08, "sine", delay + 0.018, volume * 0.36);
}

function playDaegeumRise(startDelay = 0, volume = 0.045) {
  [392, 440, 523, 587, 659].forEach((tone, index) => {
    playTone(tone, 0.18, index % 2 ? "triangle" : "sine", startDelay + index * 0.1, volume + index * 0.008);
  });
}

function playBellCluster(startDelay = 0, count = 5, volume = 0.055) {
  const tones = [988, 1175, 1320, 1568, 1760, 1976, 2349];
  for (let index = 0; index < count; index += 1) {
    const tone = tones[index % tones.length] * (index > tones.length ? 0.5 : 1);
    playTone(tone, 0.12, index % 2 ? "sine" : "triangle", startDelay + index * 0.045, volume * (1 - index * 0.035));
  }
}

function playSpinSound() {
  playJangguRoll(5, 0, 0.055, 0.055);
  playTone(196, 0.2, "sine", 0, 0.035);
}

function playReelSpinTick(index) {
  playJangguHit(0, index % 2 === 1, 0.026);
}

function playReelStopSound(index) {
  playBukHit(0, 0.08 + index * 0.008);
  playTone(620 + index * 42, 0.055, "triangle", 0.045, 0.045);
}

function playScatterSound(index) {
  playKwaenggwari(0, 0.085 + index * 0.006);
  playBellCluster(0.13, 3, 0.045);
}

function playAnticipationSound() {
  playJangguRoll(7, 0, 0.07, 0.045);
  playDaegeumRise(0.16, 0.036);
}

function playCloseCallSound() {
  playBukHit(0, 0.07);
  [520, 440, 330].forEach((tone, index) => {
    playTone(tone, 0.12, "sine", 0.12 + index * 0.09, 0.038);
  });
}

function playWinSound() {
  [392, 523, 659, 784, 1046].forEach((tone, index) => {
    playGayageumPluck(tone, index * 0.07, 0.07);
  });
  playBellCluster(0.32, 3, 0.045);
}

function playBonusStartSound() {
  playJing(0, 0.105);
  playDaegeumRise(0.1, 0.052);
  playBellCluster(0.48, 6, 0.058);
}

function playBonusEndSound() {
  [880, 659, 523, 392].forEach((tone, index) => {
    playGayageumPluck(tone, index * 0.11, 0.06);
  });
  playJing(0.48, 0.072);
}

function playDropSound() {
  playBukHit(0, 0.075);
  playBellCluster(0.06, 5, 0.05);
}

function playCashOutSound() {
  [1568, 1320, 988, 784, 659].forEach((tone, index) => {
    playTone(tone, 0.08, index % 2 ? "sine" : "triangle", index * 0.055, 0.05);
  });
  playJing(0.24, 0.062);
}

function playCreditStackSound(step = 0) {
  const baseTone = 988 + (step % 5) * 62;
  playTone(baseTone, 0.045, "triangle", 0, 0.044);
  playTone(baseTone * 1.5, 0.035, "sine", 0.022, 0.026);
}

function playScratchPickSound(revealedCount) {
  playGayageumPluck(523 + revealedCount * 22, 0, 0.052);
  playTone(1320 + revealedCount * 18, 0.05, "triangle", 0.045, 0.035);
}

function playSoundToggleSound() {
  playBellCluster(0, 3, 0.052);
}

function createReelResult(reelIndex, rowCount = visibleRows) {
  return Array.from({ length: rowCount }, () => weightedSymbol(reelIndex));
}

function symbolFromValue(value) {
  if (!value) return symbolById.get("bar");
  if (typeof value === "string") return symbolById.get(value.trim()) || symbolById.get("bar");
  return value;
}

function renderReel(reel, symbolsForReel) {
  reel.innerHTML = "";
  reel.style.gridTemplateRows = `repeat(${symbolsForReel.length}, 1fr)`;
  symbolsForReel.forEach((value) => {
    const symbol = symbolFromValue(value);
    const cell = document.createElement("span");
    cell.className = `symbol-cell symbol-card ${symbol.className}`;
    cell.dataset.symbol = symbol.id;
    cell.setAttribute("aria-label", symbol.name);
    cell.style.setProperty("--symbol-delay", `${randomBetween(0, 1.8).toFixed(2)}s`);
    cell.style.setProperty("--symbol-drift", `${randomBetween(1.5, 3.8).toFixed(2)}px`);

    const image = document.createElement("img");
    image.className = "symbol-image";
    image.src = symbol.image;
    image.alt = "";
    image.draggable = false;

    image.addEventListener("error", () => {
      cell.classList.add("symbol-missing");
    });

    cell.append(image);
    reel.appendChild(cell);
  });
}

function initializeReels() {
  els.reels.forEach((reel) => {
    const currentSymbols = [...reel.querySelectorAll("span")].map((cell) => cell.textContent.trim());
    renderReel(reel, currentSymbols);
  });
}

function randomizeReel(reel, index, rowCount = visibleRows) {
  renderReel(
    reel,
    Array.from({ length: rowCount }, () => weightedSymbol(index)),
  );
  playReelSpinTick(index);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createReelSpinProfiles(activeReelCount, shouldAnticipateBonus) {
  return Array.from({ length: activeReelCount }, (_, index) => {
    const baseInterval = Math.round(randomBetween(58, 96) + index * randomBetween(3, 9));
    const baseAnimation = randomBetween(0.085, 0.15) + index * 0.004;
    const stopDelay =
      index === 0
        ? Math.round(randomBetween(560, 760))
        : Math.round(randomBetween(285, 470) + index * randomBetween(24, 58));

    if (!shouldAnticipateBonus || index < 2) {
      return {
        intervalMs: baseInterval,
        animationDuration: baseAnimation,
        stopDelay,
        teaseIntervalMs: baseInterval,
        teaseAnimationDuration: baseAnimation,
        teaseStopDelay: stopDelay,
      };
    }

    const anticipationIndex = index - 2;
    return {
      intervalMs: baseInterval,
      animationDuration: baseAnimation,
      stopDelay,
      teaseIntervalMs: Math.round(randomBetween(104, 142) + anticipationIndex * randomBetween(18, 34)),
      teaseAnimationDuration: randomBetween(0.17, 0.24) + anticipationIndex * 0.035,
      teaseStopDelay: Math.round(randomBetween(760, 990) + anticipationIndex * randomBetween(220, 330)),
    };
  });
}

function applyReelSpinProfile(reel, profile, tense = false) {
  reel.style.setProperty("--spin-symbol-speed", `${profile.animationDuration.toFixed(3)}s`);
  reel.classList.toggle("scatter-hunt", tense);
}

function startReelTicker(reel, reelIndex, rowCount, intervalMs) {
  return setInterval(() => randomizeReel(reel, reelIndex, rowCount), intervalMs);
}

function intensifyScatterReels(activeReels, timers, profiles, rowCounts) {
  for (let index = 2; index < activeReels.length; index += 1) {
    clearInterval(timers[index]);
    const reel = activeReels[index];
    const reelIndex = Number(reel.dataset.index);
    const profile = profiles[index];
    const tenseProfile = {
      ...profile,
      animationDuration: profile.teaseAnimationDuration,
    };

    applyReelSpinProfile(reel, tenseProfile, true);
    timers[index] = startReelTicker(reel, reelIndex, rowCounts[reelIndex], profile.teaseIntervalMs);
  }
}

function clearReelSpinProfile(reel) {
  reel.classList.remove("scatter-hunt");
  reel.style.removeProperty("--spin-symbol-speed");
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function showReelWinOverlay(title, amount, caption) {
  showReelAmountOverlay(title, amount, caption, true);
  if (/NEON BIG WIN|MEGA WIN|EPIC WIN/i.test(title)) {
    pulseCabinet("big-win");
  }
}

function showTeaseOverlay(title, caption, pulse = false) {
  if (teaseTimer) {
    clearTimeout(teaseTimer);
    teaseTimer = null;
  }

  els.teaseTitle.textContent = title;
  els.teaseCaption.textContent = caption;
  els.teaseOverlay.classList.add("show");
  els.teaseOverlay.classList.toggle("pulse", pulse);
  els.teaseOverlay.setAttribute("aria-hidden", "false");

  teaseTimer = setTimeout(() => {
    hideTeaseOverlay();
  }, 1800);
}

function hideTeaseOverlay() {
  if (teaseTimer) {
    clearTimeout(teaseTimer);
    teaseTimer = null;
  }

  els.teaseOverlay.classList.remove("show", "pulse");
  els.teaseOverlay.setAttribute("aria-hidden", "true");
  els.reelWindow.classList.remove("scatter-anticipation");
}

function playNearMissEffects(activeReelCount = state.selectedReels) {
  els.reelWindow.classList.remove("near-miss-shake");
  void els.reelWindow.offsetWidth;
  els.reelWindow.classList.add("near-miss-shake");
  setTimeout(() => els.reelWindow.classList.remove("near-miss-shake"), 650);

  els.reels.slice(2, activeReelCount).forEach((reel) => {
    reel.classList.add("reel-near-miss");
    setTimeout(() => reel.classList.remove("reel-near-miss"), 560);
  });
}

function pulseCabinet(type = "big-win") {
  if (cabinetPulseTimer) {
    clearTimeout(cabinetPulseTimer);
  }

  els.machine.classList.remove(
    "event-pulse",
    "pulse-free-game",
    "pulse-dokkaebi",
    "pulse-scratch",
    "pulse-big-win",
  );
  els.machine.classList.add("event-pulse", `pulse-${type}`);

  cabinetPulseTimer = setTimeout(() => {
    els.machine.classList.remove(
      "event-pulse",
      "pulse-free-game",
      "pulse-dokkaebi",
      "pulse-scratch",
      "pulse-big-win",
    );
    cabinetPulseTimer = null;
  }, 1700);
}

function hideReelWinOverlay() {
  state.overlaySequenceId += 1;
  state.currentOverlay = null;
  els.freeWinOverlay.classList.remove("show");
  els.freeWinOverlay.classList.remove("win", "has-amount", "formula-mode", "formula-blink");
  els.freeWinOverlay.classList.add("message-only");
  els.freeWinOverlay.setAttribute("aria-hidden", "true");
}

async function showFreeGameTotal() {
  showReelWinOverlay("FREE GAMES COMPLETE", state.freeSpinWinTotal, "Total Bonus Win");
  playWinSound();
  await wait(3000);
  hideReelWinOverlay();
}

function stopReel(reel, result, index) {
  reel.classList.remove("spinning");
  clearReelSpinProfile(reel);
  renderReel(reel, result);
  playReelStopSound(index);
  if (hasScatter(result)) {
    playScatterSound(index);
  }
}

function winPresentationTitle(win, bet, isFreeSpin = false) {
  const multiple = bet > 0 ? win / bet : 0;
  if (multiple >= 50) return "EPIC WIN";
  if (multiple >= 25) return "MEGA WIN";
  if (multiple >= 10) return "NEON BIG WIN";
  return isFreeSpin ? "BONUS WAYS WIN" : `${activeWays()} WAYS WIN`;
}

async function spin() {
  if (state.spinning || state.scratchActive) {
    return;
  }

  triggerHaptic("spin");
  await unlockAudioForUserGesture();

  settleCreditAnimation();

  if (!bonusModeActive() && state.credits < currentBet()) {
    return;
  }

  incrementTestCounter("totalSpins");
  hideReelWinOverlay();
  hideTeaseOverlay();
  const bet = currentBet();
  const isExpandedSpin = state.expandedBonusSpins > 0;
  const isFreeSpin = state.bonusSpins > 0 || isExpandedSpin;
  const bonusSpinsAtStart = state.bonusSpins;
  const expandedSpinsAtStart = state.expandedBonusSpins;
  const rowCounts = Array.from({ length: reelCount }, (_, index) =>
    isExpandedSpin && index > 0 && index < reelCount - 1
      ? 5 + Math.floor(Math.random() * 6)
      : visibleRows,
  );
  const activeReelCount = isExpandedSpin ? reelCount : state.selectedReels;
  const result = Array.from({ length: reelCount }, (_, index) =>
    createReelResult(index, rowCounts[index]),
  );
  const naturalBonusTriggered = isBonusTrigger(result, activeReelCount);
  const randomBonusTriggered = !naturalBonusTriggered && shouldAddRandomBonus(activeReelCount);

  if (randomBonusTriggered) {
    forceBonusTrigger(result);
  }

  state.spinning = true;
  if (isExpandedSpin) {
    state.expandedBonusSpins -= 1;
  } else if (state.bonusSpins > 0) {
    state.bonusSpins -= 1;
  } else {
    setCredits(state.credits - bet, false);
    accrueProgressiveJackpots(bet);
  }
  state.lastWin = isFreeSpin ? state.freeSpinWinTotal : 0;
  els.machine.classList.remove("celebrate");
  setHiddenMessage(isExpandedSpin ? "Expanded Reels bonus game in progress" : isFreeSpin ? "Free Game in progress" : "");
  updateUi();
  playSpinSound();

  const activeReels = els.reels.slice(0, activeReelCount);
  const shouldAnticipateBonus = openingScatterPair(result, activeReelCount);
  const spinProfiles = createReelSpinProfiles(activeReelCount, shouldAnticipateBonus);
  const timers = activeReels.map((reel, index) => {
    reel.classList.add("spinning");
    const reelIndex = Number(reel.dataset.index);
    applyReelSpinProfile(reel, spinProfiles[index], false);
    return startReelTicker(reel, reelIndex, rowCounts[reelIndex], spinProfiles[index].intervalMs);
  });

  for (let index = 0; index < activeReels.length; index += 1) {
    const profile = spinProfiles[index];
    await wait(index >= 2 && shouldAnticipateBonus ? profile.teaseStopDelay : profile.stopDelay);
    clearInterval(timers[index]);
    stopReel(activeReels[index], result[index], index);
    if (index === 1 && shouldAnticipateBonus) {
      els.reelWindow.classList.add("scatter-anticipation");
      intensifyScatterReels(activeReels, timers, spinProfiles, rowCounts);
      playAnticipationSound();
      await wait(620);
    }
  }

  els.reelWindow.classList.remove("scatter-anticipation");
  const bonusTriggered = isBonusTrigger(result, activeReelCount);
  if (bonusTriggered) {
    hideTeaseOverlay();
  }
  const rawWin = calculateRawWin(result, bet, activeReelCount);
  const win = rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, rowCounts);
  const waysWinFormulas = buildWaysWinFormulas(result, bet, activeReelCount, rawWin, win);
  if (win > 0) {
    incrementTestCounter("totalWins");
  }
  if (isFreeSpin) {
    state.freeSpinWinTotal += win;
    state.lastWin = state.freeSpinWinTotal;
  } else {
    state.lastWin = win;
    addCredits(win, true);
  }
  if (bonusTriggered && isFreeSpin) {
    state.bonusSpins += bonusSpinAward;
  }
  const freeGameEnded =
    isFreeSpin &&
    state.bonusSpins === 0 &&
    state.expandedBonusSpins === 0 &&
    (bonusSpinsAtStart > 0 || expandedSpinsAtStart > 0);
  state.spinning = false;
  if (!isFreeSpin) {
    advanceChests();
  }
  const chestTriggered = bonusTriggered && !isFreeSpin ? chooseChestBonus() : -1;
  const bonusEnergyTotal = wildOrBonusCount(result, activeReelCount);
  const nearMissTriggered = !isFreeSpin && !bonusTriggered && scatterNearMiss(result, activeReelCount);
  const observedTesterEvent =
    win > 0 ||
    bonusTriggered ||
    chestTriggered >= 0 ||
    nearMissTriggered ||
    (!isFreeSpin && !bonusTriggered && bonusEnergyTotal >= 2);
  if (observedTesterEvent) {
    markTesterMissionComplete("observeEvent");
  }
  if (bonusTriggered || chestTriggered >= 0) {
    incrementTestCounter("totalBonusTriggers");
  }
  if ((isFreeSpin && bonusTriggered) || chestTriggered === 0) {
    incrementTestCounter("totalFreeGameTriggers");
  }
  if (bonusTriggered || chestTriggered >= 0) {
    triggerHaptic("bonus");
  } else if (win > 0) {
    triggerHaptic("win");
  }
  if (bonusTriggered || chestTriggered >= 0 || state.bonusSpins > 0 || state.expandedBonusSpins > 0) {
    stopAutoSpin();
  }

  if (isFreeSpin && bonusTriggered && win > 0) {
    const restoreOverlay = {
      type: "amount",
      title: "FREE GAMES UNLOCKED",
      amount: win,
      caption: `+${bonusSpinAward} Free Games`,
      isWin: true,
      captionAmount: state.freeSpinWinTotal,
    };
    setMessage(
      `Retrigger! +${bonusSpinAward} Free Games and ${formatDisplayAmount(win)} added to bonus bank!`,
      true,
    );
    showReelAmountOverlay("FREE GAMES UNLOCKED", win, `+${bonusSpinAward} Free Games`, true, state.freeSpinWinTotal);
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    pulseCabinet("free-game");
    playBonusStartSound();
  } else if (isFreeSpin && bonusTriggered) {
    setMessage(`Retrigger! +${bonusSpinAward} Free Games awarded!`, true);
    showReelMessageOverlay("FREE GAMES UNLOCKED", true);
    els.machine.classList.add("celebrate");
    pulseCabinet("free-game");
    playBonusStartSound();
  } else if (bonusTriggered && win > 0) {
    const title = "DOKKAEBI BONUS";
    const restoreOverlay = {
      type: "amount",
      title,
      amount: win,
      caption: "Ways Award",
      isWin: true,
      captionAmount: null,
    };
    setMessage(`DOKKAEBI BONUS! ${formatDisplayAmount(win)} ways win!`, true);
    showReelWinOverlay(title, win, "Ways Award");
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    pulseCabinet("dokkaebi");
  } else if (bonusTriggered) {
    setMessage("DOKKAEBI BONUS!", true);
    showReelMessageOverlay("DOKKAEBI BONUS", true);
    els.machine.classList.add("celebrate");
    pulseCabinet("dokkaebi");
  } else if (isFreeSpin && win > 0) {
    const title = winPresentationTitle(win, bet, true);
    const restoreOverlay = {
      type: "amount",
      title,
      amount: win,
      caption: "This Spin",
      isWin: true,
      captionAmount: state.freeSpinWinTotal,
    };
    setMessage(
      `${formatDisplayAmount(win)} bonus win added. Bonus bank ${formatDisplayAmount(state.freeSpinWinTotal)}.`,
      true,
    );
    showReelAmountOverlay(title, win, "This Spin", true, state.freeSpinWinTotal);
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    playWinSound();
  } else if (win > 0) {
    const title = winPresentationTitle(win, bet);
    const restoreOverlay = {
      type: "amount",
      title,
      amount: win,
      caption: "Ways Award",
      isWin: true,
      captionAmount: null,
    };
    setMessage(`${formatDisplayAmount(win)} ways win!`, true);
    showReelWinOverlay(title, win, "Ways Award");
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    playWinSound();
  } else if (nearMissTriggered) {
    setHiddenMessage("");
    playNearMissEffects(activeReelCount);
    showTeaseOverlay("Almost Free Games...", "One more scatter lights the stage", true);
    playCloseCallSound();
  } else if (!isFreeSpin && !bonusTriggered && bonusEnergyTotal >= 2) {
    setHiddenMessage("");
    showTeaseOverlay("Bonus Energy Rising...", "Dokkaebi gems are getting louder", true);
  } else if (state.bonusSpins > 0) {
    setMessage(`${state.bonusSpins} Free Games remaining.`);
  } else if (bonusSpinsAtStart > 0 && !freeGameEnded) {
    setMessage("Free Games complete.");
    playBonusEndSound();
  } else if (state.expandedBonusSpins > 0) {
    setMessage(`${state.expandedBonusSpins} Expanded Reel Games remaining.`);
  } else if (expandedSpinsAtStart > 0 && !freeGameEnded) {
    setMessage("Expanded Reels bonus complete.");
    playBonusEndSound();
  } else if (state.credits < currentBet()) {
    setMessage("Insufficient credits. Press START DEMO or use DROP.");
  } else {
    setHiddenMessage("");
  }

  updateUi();
  if (chestTriggered >= 0) {
    await handleChestBonus(chestTriggered);
  }
  if (freeGameEnded) {
    state.spinning = true;
    updateUi();
    await showFreeGameTotal();
    if (state.freeSpinWinTotal > 0) {
      addCredits(state.freeSpinWinTotal, true);
    }
    state.freeSpinWinTotal = 0;
    state.spinning = false;
    setMessage("Total bonus win paid to the credit meter.", true);
    playBonusEndSound();
    updateUi();
  }
}

function changeBet(direction) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.betIndex = Math.min(betSteps.length - 1, Math.max(0, state.betIndex + direction));
  addMissionNumberValue("betLevelsTried", state.betIndex);
  applyBetReelRule();
  setMessage(`${activeWays()} ways active. Inactive reels are dimmed.`);
  updateUi();
}

function selectBetLevel(index) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  state.betIndex = Math.min(betSteps.length - 1, Math.max(0, index));
  addMissionNumberValue("betLevelsTried", state.betIndex);
  applyBetReelRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  setMessage(
    `Bet level ${betSteps[state.betIndex]} selected. ${activeWays()} ways active.`,
  );
  updateUi();
}

async function dropCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  const dropAmount = Number(els.dropAmount.value);
  if (!Number.isFinite(dropAmount) || dropAmount <= 0) {
    setMessage("Enter a demo credit amount.");
    updateUi();
    return;
  }

  if (dropAmount > maxDropAmount) {
    const maxDropText = maxDropAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const maxDropCredits = (maxDropAmount * 100) / state.selectedDenomCents;
    setHiddenMessage(`Demo DROP limit exceeded. Maximum DROP is ${maxDropText}.`);
    showReelAmountOverlay("DROP LIMIT", maxDropCredits, "Demo drop limit exceeded", false);
    updateUi();
    return;
  }

  const creditsToAdd = (dropAmount * 100) / state.selectedDenomCents;
  addCredits(creditsToAdd, false);
  playDropSound();
  els.dropAmount.value = "";
  setAmountMessage(creditsToAdd, "demo credits loaded. Press SPIN.");
  updateUi();
}

async function startDemoCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  addCredits(demoStartCreditAmountForCurrentDenom(), false);
  markTesterMissionComplete("startDemo");
  showDemoCreditsLoadedMessage();
  updateUi();
}

async function claimDailyDemoCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  const today = localDateKey();
  if (safeLocalStorageGet(dailyDemoCreditStorageKey) === today) {
    setHiddenMessage("Daily demo credits already claimed today.");
    if (els.dailyDemoStatus) {
      els.dailyDemoStatus.textContent = "Daily demo credits already claimed today.";
    }
    updateUi();
    return;
  }

  safeLocalStorageSet(dailyDemoCreditStorageKey, today);
  addCredits(demoCreditAmountForCurrentDenom(dailyDemoCredits), false);
  setHiddenMessage("Daily demo credits loaded. Virtual test points only.");
  showReelMessageOverlay("Daily demo credits loaded", true);
  updateUi();
}

async function cashOut() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  const cashOutAmount = state.credits;
  setCredits(0, false);
  playCashOutSound();
  state.lastWin = 0;
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.freeSpinWinTotal = 0;
  setAmountMessage(cashOutAmount, "virtual credits cleared. Credit meter reset to zero.");
  updateUi();
}

function selectMultiplier(value) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  state.selectedMultiplier = value;
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  setMessage(`Multiplier x${value} selected. Press SPIN.`);
  updateUi();
}

function selectDenom(value) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  settleCreditAnimation();
  setDenomPickerOpen(false);
  const oldDenomCents = state.selectedDenomCents;
  if (oldDenomCents === value) return;
  preserveCashValueForDenomChange(oldDenomCents, value);
  state.selectedDenomCents = value;
  addMissionNumberValue("denomOptionsTried", value);
  applyDenomRtpRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  switchJackpotBankForDenom(value);
  setMessage(
    `Denomination ${denomLabel(value)} selected. Credit meter and jackpot meter preserved for this denom. Target RTP locked at ${Math.round(state.selectedTotalRtp * 100)}%.`,
  );
  updateUi();
}

function debugHooksEnabled() {
  return window.location.protocol === "file:" || new URLSearchParams(window.location.search).has("debug");
}

function setupDebugHooks() {
  if (!debugHooksEnabled()) return;

  window.slotDebug = {
    async triggerVaultBonus(index = 0) {
      if (state.spinning || state.scratchActive || bonusModeActive()) return false;
      stopAutoSpin();
      await handleChestBonus(Math.min(2, Math.max(0, Number(index) || 0)));
      return true;
    },
    awardCash(amount = 100) {
      if (state.spinning || state.scratchActive) return false;
      const cashAmount = Math.max(0, Number(amount) || 0);
      setCredits((cashAmount * 100) / state.selectedDenomCents, false);
      setAmountMessage(state.credits, "debug cash loaded.");
      updateUi();
      return true;
    },
    setChestReady(index = 0) {
      const chestIndex = Math.min(2, Math.max(0, Number(index) || 0));
      state.chests[chestIndex].progress = state.chests[chestIndex].threshold;
      updateChestUi(chestIndex);
      return true;
    },
    snapshot() {
      return {
        credits: state.credits,
        denomCents: state.selectedDenomCents,
        cashValue: (state.credits * state.selectedDenomCents) / 100,
        bonusSpins: state.bonusSpins,
        expandedBonusSpins: state.expandedBonusSpins,
        jackpots: structuredClone(state.jackpots),
      };
    },
  };
}

els.spinButton.addEventListener("click", spin);
els.decreaseBet.addEventListener("click", () => changeBet(-1));
els.increaseBet.addEventListener("click", () => changeBet(1));
els.maxBet.addEventListener("click", () => {
  if (bonusModeActive()) return;
  stopAutoSpin();
  state.betIndex = betSteps.length - 1;
  addMissionNumberValue("betLevelsTried", state.betIndex);
  applyBetReelRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  setMessage(`Max bet selected. ${activeWays()} ways active.`);
  updateUi();
});
els.autoSpin.addEventListener("click", toggleAutoSpin);
els.startDemoButton.addEventListener("click", startDemoCredits);
els.zeroCreditStartButton.addEventListener("click", startDemoCredits);
els.dailyDemoButton.addEventListener("click", claimDailyDemoCredits);
els.dropButton.addEventListener("click", dropCredits);
els.dropAmount.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    dropCredits();
  }
});
els.cashOut.addEventListener("click", cashOut);
els.creditsMeter.addEventListener("click", () => {
  state.showCreditsAsCredits = !state.showCreditsAsCredits;
  updateUi();
  renderReelOverlay();
});
els.creditsMeter.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    state.showCreditsAsCredits = !state.showCreditsAsCredits;
    updateUi();
    renderReelOverlay();
  }
});
els.multiplierOptions.forEach((button) => {
  button.addEventListener("click", () => selectMultiplier(Number(button.dataset.multiplier)));
});
els.betOptions.forEach((button) => {
  button.addEventListener("click", () => selectBetLevel(Number(button.dataset.betIndex)));
});
els.denomToggle.addEventListener("click", () => {
  setDenomPickerOpen(!denomPickerOpen());
});
els.denomOptions.forEach((button) => {
  button.addEventListener("click", () => selectDenom(Number(button.dataset.denom)));
});
document.addEventListener("click", (event) => {
  if (!els.denomPicker.contains(event.target)) {
    setDenomPickerOpen(false);
  }
});
els.guideButton.addEventListener("click", openGuide);
els.guideClose.addEventListener("click", closeGuide);
els.guideOverlay.addEventListener("click", (event) => {
  if (event.target === els.guideOverlay) {
    closeGuide();
  }
});
els.introStartButton.addEventListener("click", finishIntroStart);
els.introClose.addEventListener("click", () => {
  markIntroSeen();
  closeIntroModal();
});
els.introOverlay.addEventListener("click", (event) => {
  if (event.target === els.introOverlay) {
    markIntroSeen();
    closeIntroModal();
  }
});
els.feedbackButton.addEventListener("click", openFeedbackModal);
els.feedbackCancel.addEventListener("click", closeFeedbackModal);
els.feedbackSubmit.addEventListener("click", submitFeedback);
els.copyTestReport.addEventListener("click", copyTestReport);
els.feedbackOverlay.addEventListener("click", (event) => {
  if (event.target === els.feedbackOverlay) {
    closeFeedbackModal();
  }
});
els.feedbackTagButtons.forEach((button) => {
  button.addEventListener("click", () => toggleFeedbackTag(button.dataset.feedbackTag));
});
els.testInfoToggle.addEventListener("click", () => setTestInfoOpen(!testInfoOpen()));
els.testInfoClose.addEventListener("click", () => setTestInfoOpen(false));
els.soundButton.addEventListener("click", async () => {
  if (state.sound && !state.audioUnlocked) {
    const unlocked = await unlockAudio();
    if (unlocked) {
      playSoundToggleSound();
      setHiddenMessage("Sound ON.");
    } else {
      setHiddenMessage("iPhone audio is still blocked. Check silent mode and tap Sound again.");
    }
    updateUi();
    return;
  }

  state.sound = !state.sound;
  if (!state.sound) {
    state.audioUnlocked = false;
    setHiddenMessage("Sound OFF.");
  } else {
    const unlocked = await unlockAudio();
    playSoundToggleSound();
    setHiddenMessage(unlocked ? "Sound ON." : "Tap Sound again if your iPhone blocks audio.");
  }
  updateUi();
});

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  document.addEventListener(
    eventName,
    (event) => {
      if (event?.target && els.soundButton.contains(event.target)) {
        return;
      }
      if (state.sound) {
        unlockAudio();
      }
    },
    { capture: true, passive: true },
  );
});

["pointerdown", "touchstart", "keydown", "input", "change"].forEach((eventName) => {
  document.addEventListener(eventName, requestAutoPlayStopByUser, { capture: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeGuide();
    if (introOpen()) {
      markIntroSeen();
      closeIntroModal();
    }
    closeFeedbackModal();
    setTestInfoOpen(false);
    setDenomPickerOpen(false);
  }
  const target = event.target;
  const isTypingField =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target?.isContentEditable;
  if (guideOpen() || introOpen() || feedbackOpen()) {
    if (feedbackOpen() && isTypingField) {
      return;
    }
    event.preventDefault();
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    spin();
  }
  if (event.key === "ArrowLeft") changeBet(-1);
  if (event.key === "ArrowRight") changeBet(1);
});

initializeReels();
setupDebugHooks();
setHiddenMessage(els.message.textContent);
initializeTelegramMode();
addMissionNumberValue("betLevelsTried", state.betIndex);
addMissionNumberValue("denomOptionsTried", state.selectedDenomCents);
renderTestStats();
renderSelectedFeedbackTags();
updateUi();
maybeShowIntroModal();
["resize", "orientationchange"].forEach((eventName) => {
  window.addEventListener(eventName, updateTestInfoPanel, { passive: true });
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(serviceWorkerPath).catch(() => {});
  });
}
