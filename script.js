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
const ascensionAverageMultiplier = 1.075;
const ascensionAdjustedFreeRtp = bonusFreeSpinTargetRtp / ascensionAverageMultiplier;
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
const languageStorageKey = "neonHunterSpinLanguage";
const soundVolumeStorageKey = "neonHunterSpinSoundVolume";
const featureTrailStorageKey = "neonHunterSpinFeatureTrail";
const achievementStorageKey = "neonHunterSpinAchievements";
const symbolCollectionStorageKey = "neonHunterSpinSymbolCollection";
const serviceWorkerPath = "service-worker.js";
const appVersion = "v7";
const dailyDemoCredits = 2_000;
const missionBonusDemoCredits = 100;
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
const featureTrailDefinitions = [
  { id: "startDemo", label: "Start the demo" },
  { id: "spin10", label: "Spin 10 times" },
  { id: "spin30", label: "Spin 30 times" },
  { id: "win3", label: "Trigger 3 win events" },
  { id: "scatterTease2", label: "See 2 Scatter / Free Game tease events" },
  { id: "bonusTease2", label: "See 2 Bonus tease events" },
  { id: "openFeedback", label: "Open Feedback" },
  { id: "copyReport", label: "Complete Session Summary / Copy Test Report" },
];
const achievementDefinitions = [
  { id: "firstSpin", label: "First Spin" },
  { id: "tenSpins", label: "10 Spins" },
  { id: "firstWin", label: "First Win" },
  { id: "firstScatterTease", label: "First Scatter Tease" },
  { id: "firstBonusTease", label: "First Bonus Tease" },
  { id: "firstFreeGame", label: "First Free Game" },
  { id: "firstDokkaebiBonus", label: "First Dokkaebi Bonus" },
  { id: "feedbackSubmitted", label: "Feedback Submitted" },
];
const symbolCollectionDefinitions = [
  { id: "wild", label: "WILD", symbolIds: ["wild"] },
  { id: "scatter", label: "SCATTER", symbolIds: ["scatter"] },
  { id: "bonus", label: "Dokkaebi / Bonus", symbolIds: ["bonus"] },
  { id: "crown", label: "GAT", symbolIds: ["crown"] },
  { id: "diamond", label: "LANTERN", symbolIds: ["diamond"] },
  { id: "seven", label: "7", symbolIds: ["seven"] },
  { id: "bar", label: "SAMTAEGEUK", symbolIds: ["bar"] },
  { id: "rankGroup", label: "Hangul ranks", symbolIds: ["A", "K", "Q", "J", "ten"] },
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
  showCreditsAsCredits: true,
  language: determineInitialLanguage(),
  betIndex: 1,
  selectedReels: reelsByBetIndex[1],
  selectedMultiplier: 1,
  selectedDenomCents: 1,
  selectedTotalRtp: 0.88,
  lastWin: 0,
  freeSpinWinTotal: 0,
  bonusSpins: 0,
  expandedBonusSpins: 0,
  freeSpinMultiplier: 1,
  retriggerCount: 0,
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
  soundVolume: loadSoundVolume(),
  audioUnlocked: false,
  currentOverlay: null,
  selectedReelReveal: null,
  overlaySequenceId: 0,
  autoPlayStopRequested: false,
  testModeLabel: "Guest Demo Mode",
  testSessionId: "",
  testStats: createDefaultTestStats(),
  testerMission: loadTesterMission(),
  featureTrail: loadFeatureTrail(),
  achievements: loadAchievements(),
  symbolCollection: loadSymbolCollection(),
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
  soundVolume: document.querySelector("#soundVolume"),
  soundVolumeValue: document.querySelector("#soundVolumeValue"),
  languageSelect: document.querySelector("#languageSelect"),
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
  feedbackIssueType: document.querySelector("#feedbackIssueType"),
  feedbackSession: document.querySelector("#feedbackSession"),
  feedbackStats: document.querySelector("#feedbackStats"),
  feedbackTagButtons: [...document.querySelectorAll("#feedbackTagButtons button")],
  selectedFeedbackTags: document.querySelector("#selectedFeedbackTags"),
  copyTestReport: document.querySelector("#copyTestReport"),
  reportPreview: document.querySelector("#reportPreview"),
  reportPreviewText: document.querySelector("#reportPreviewText"),
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
  openTrailPanel: document.querySelector("#openTrailPanel"),
  openTestInfoPanel: document.querySelector("#openTestInfoPanel"),
  openFeedbackPanel: document.querySelector("#openFeedbackPanel"),
  engagementPanel: document.querySelector("#engagementPanel"),
  featureTrailProgress: document.querySelector("#featureTrailProgress"),
  featureTrailList: document.querySelector("#featureTrailList"),
  featureTrailStatus: document.querySelector("#featureTrailStatus"),
  guideFeatureTrailProgress: document.querySelector("#guideFeatureTrailProgress"),
  guideFeatureTrailList: document.querySelector("#guideFeatureTrailList"),
  achievementList: document.querySelector("#achievementList"),
  guideAchievementList: document.querySelector("#guideAchievementList"),
  symbolCollectionProgress: document.querySelector("#symbolCollectionProgress"),
  guideSymbolCollectionProgress: document.querySelector("#guideSymbolCollectionProgress"),
  symbolCollectionList: document.querySelector("#symbolCollectionList"),
  guideSymbolCollectionList: document.querySelector("#guideSymbolCollectionList"),
  localDemoSummary: document.querySelector("#localDemoSummary"),
  guideLocalDemoSummary: document.querySelector("#guideLocalDemoSummary"),
  copyShareMoment: document.querySelector("#copyShareMoment"),
  shareMomentStatus: document.querySelector("#shareMomentStatus"),
  shareMomentFallback: document.querySelector("#shareMomentFallback"),
  shareMomentFallbackText: document.querySelector("#shareMomentFallbackText"),
  achievementToast: document.querySelector("#achievementToast"),
  dailyDemoButton: document.querySelector("#dailyDemoButton"),
  dailyDemoStatus: document.querySelector("#dailyDemoStatus"),
};

let audioContext;
let autoSpinTimer;
let creditAnimationFrame;
let demoMessageTimer;
let teaseTimer;
let cabinetPulseTimer;
let missionBonusReady = false;
let missionBonusTooltipTimer;
let missionPanelPulseTimer;
let achievementToastTimer;
let masterFadeTimer;

const i18n = {
  en: {
    languageLabel: "Language",
    guestMode: "Guest Demo Mode",
    telegramMode: "Telegram Test Mode",
    eyebrow: "Korean Fantasy Social Slot Demo",
    marqueeLeft: "Korean Fantasy x K-pop Neon Casino",
    marqueeRight: "No Real-Money Play",
    guideButtonLabel: "Open paytable and game rules",
    soundOn: "Sound ON",
    soundOff: "Sound OFF",
    soundLocked: "Sound Locked",
    soundOnAria: "Sound is on. Tap to turn sound off",
    soundOffAria: "Sound is off. Tap to turn sound on",
    soundLockedAria: "Sound is on but locked. Tap to unlock audio",
    startDemo: "START DEMO WITH 10,000 CREDITS",
    startDemoShort: "START DEMO",
    dailyDemo: "Claim Daily Demo Credits",
    dropPlaceholder: "Demo",
    zeroCreditSubtext: "Virtual test points only",
    messageStart: "Press START DEMO to load virtual test credits.",
    footer: "Demo Only - No real-money wagering, payout, external rewards, cryptocurrency, or token assets.",
    creditMeter: "Credit Meter",
    totalBet: "Total Bet",
    ways: "Ways",
    betMultiplier: "Bet Multiplier",
    denom: "Denom",
    denomOption: "Denomination",
    gameRtp: "Game RTP",
    lastWin: "Last Win",
    freeGames: "Free Games",
    spin: "SPIN",
    freeGame: "FREE GAME",
    megaSpin: "MEGA SPIN",
    stopAuto: "STOP AUTO",
    autoPlay: "AUTO PLAY",
    maxBet: "MAX BET",
    clear: "CLEAR",
    testerMission: "Tester Mission",
    dailyAvailable: "Daily demo credits are virtual test points for testing only.",
    dailyClaimed: "Daily demo credits already claimed today.",
    testInfo: "Test Info",
    closeTestInfo: "Close test info",
    mode: "Mode",
    session: "Session",
    viewport: "Viewport",
    device: "Device",
    pwa: "PWA",
    loading: "Loading",
    unknown: "Unknown",
    browserMode: "Browser Mode",
    standaloneMode: "Standalone Mode",
    feedback: "Feedback",
    closeFeedback: "Close feedback",
    limitedFeedback: "Limited Test Feedback",
    testSession: "Test Session",
    localStats: "Local test stats",
    sessionSummary: "Session Summary",
    quickTags: "Quick feedback tags",
    noTags: "No tags selected",
    selected: "Selected",
    issueType: "Issue type",
    deviceNote: "Device note",
    deviceNotePlaceholder: "Example: iPhone 14 / Telegram browser / screen issue",
    privacyNote: "Do not include name, email, phone number, or other personal data.",
    feedbackPrompt: "Tell us what felt good, confusing, or broken.",
    feedbackPlaceholder: "Type feedback here...",
    feedbackInstruction: "After testing, tap Copy Test Report and paste it into the Telegram test group.",
    previewReport: "Preview Test Report",
    manualCopy: "Copy this test report manually",
    copyReport: "Copy Test Report",
    submitFeedback: "Submit Feedback",
    introCheckStart: "✓ Tap START DEMO First",
    introCheckCredits: "✓ Free Demo Credits",
    introCheckMoney: "✓ No Real Money",
    introCheckPayout: "✓ No Payout",
    introCheckMobile: "✓ Mobile Optimized",
    introNote: "Load virtual test points first,\nthen tap SPIN to start the demo.",
    gameGuide: "Game Guide",
    paytableRules: "Paytable & Rules",
    guideIntro:
      "Spin through a neon Korean fantasy stage. Unlock free games, dokkaebi bonus features, and virtual jackpot moments. Demo credits have no cash value.",
    baseGame: "Base Game",
    waysByBet: "Ways By Bet Level",
    waysByBetDesc: "Bet level activates 3, 4, or 5 reels. Inactive reels are dimmed on the cabinet.",
    presetBet: "Preset Bet Levels",
    presetBetDesc: "8/16 play 27 ways, 40 plays 81 ways, and 88 or higher plays the full 243 ways.",
    denomRtp: "Denom RTP",
    denomRtpDesc: "Changing denomination applies that denom's configured target RTP.",
    symbolsTitle: "Symbols",
    bonusFeatures: "Bonus Features",
    testerChecklist: "Tester Checklist",
    checklistStart: "Was it clear how to start?",
    checklistSpin: "Was the SPIN button easy to use?",
    checklistBonus: "Did the bonus moments feel exciting?",
    checklistSmooth: "Did the game run smoothly on your phone?",
    checklistConfusing: "Did anything feel confusing?",
    useFeedback: "Please use the Feedback button after testing.",
    testStats: "Test Stats",
    originalIpNotice:
      "This is an original K-pop fantasy slot demo. It does not use copyrighted characters, logos, scenes, or official assets from any existing film, game, or music property.",
    virtualCreditsNotice: "All credits are virtual test points with no cash value.",
    scratchTitle: "Dokkaebi Scratch",
    scratchSubtitle: "Match 3 Jackpot Symbols",
    pickCard: "Pick a card.",
    unitLabel: "Unit",
    completedSuffix: "completed",
    tagEasy: "Easy to Start",
    tagConfusing: "Confusing",
    tagFunBonus: "Fun Bonus",
    tagSlow: "Too Slow",
    tagTap: "Button Hard to Tap",
    tagLayout: "Layout Broken",
    tagSound: "Sound Issue",
    tagTelegram: "Telegram Issue",
    noIssue: "No Issue",
    layoutIssue: "Layout Issue",
    telegramIssue: "Telegram Browser Issue",
    touchIssue: "Button / Touch Issue",
    performanceIssue: "Performance Issue",
    confusingUx: "Confusing UX",
    bonusFlow: "Bonus / Game Flow Feedback",
    other: "Other",
    dropLimit: "Demo DROP limit exceeded. Maximum DROP is",
    enterDrop: "Enter a demo credit amount.",
    demoLoaded: "Demo credits loaded. Tap SPIN to start the demo.",
    tapSpin: "Tap SPIN to start the demo.",
    dailyLoaded: "Daily demo credits loaded",
    feedbackSubmitted: "Feedback submitted for this limited test.",
  },
  ko: {
    languageLabel: "언어",
    guestMode: "게스트 데모 모드",
    telegramMode: "텔레그램 테스트 모드",
    eyebrow: "한국 판타지 소셜 슬롯 데모",
    marqueeLeft: "한국 판타지 x K-pop 네온 카지노",
    marqueeRight: "실제 금전 플레이 없음",
    guideButtonLabel: "배당표와 게임 안내 열기",
    soundOn: "사운드 켜짐",
    soundOff: "사운드 꺼짐",
    soundLocked: "사운드 잠김",
    soundOnAria: "사운드가 켜져 있습니다. 끄려면 누르세요",
    soundOffAria: "사운드가 꺼져 있습니다. 켜려면 누르세요",
    soundLockedAria: "사운드가 켜져 있지만 잠겨 있습니다. 오디오를 해제하려면 누르세요",
    startDemo: "10,000 CREDIT으로 데모 시작",
    startDemoShort: "데모 시작",
    dailyDemo: "일일 데모 CREDIT 받기",
    dropPlaceholder: "CREDIT",
    zeroCreditSubtext: "현금 가치 없는 가상 테스트 포인트",
    messageStart: "START DEMO를 눌러 가상 테스트 CREDIT을 불러오세요.",
    footer: "데모 전용 - 실제 금전 베팅, 지급, 외부 보상, 암호화폐, 토큰 자산 없음.",
    creditMeter: "보유 CREDIT",
    totalBet: "총 베팅",
    ways: "WAYS",
    betMultiplier: "배수",
    denom: "단위",
    denomOption: "단위 선택",
    gameRtp: "게임 RTP",
    lastWin: "최근 당첨",
    freeGames: "프리 게임",
    spin: "스핀",
    freeGame: "프리 게임",
    megaSpin: "메가 스핀",
    stopAuto: "오토 중지",
    autoPlay: "오토 플레이",
    maxBet: "맥스 베팅",
    clear: "초기화",
    testerMission: "테스터 미션",
    dailyAvailable: "일일 데모 CREDIT은 테스트 전용 가상 포인트입니다.",
    dailyClaimed: "오늘의 일일 데모 CREDIT은 이미 받았습니다.",
    testInfo: "테스트 정보",
    closeTestInfo: "테스트 정보 닫기",
    mode: "모드",
    session: "세션",
    viewport: "화면",
    device: "기기",
    pwa: "PWA",
    loading: "불러오는 중",
    unknown: "알 수 없음",
    browserMode: "브라우저 모드",
    standaloneMode: "독립 실행 모드",
    feedback: "피드백",
    closeFeedback: "피드백 닫기",
    limitedFeedback: "제한 테스트 피드백",
    testSession: "테스트 세션",
    localStats: "로컬 테스트 통계",
    sessionSummary: "세션 요약",
    quickTags: "빠른 피드백 태그",
    noTags: "선택된 태그 없음",
    selected: "선택됨",
    issueType: "이슈 유형",
    deviceNote: "기기 메모",
    deviceNotePlaceholder: "예: iPhone 14 / 텔레그램 브라우저 / 화면 문제",
    privacyNote: "이름, 이메일, 전화번호 등 개인정보를 입력하지 마세요.",
    feedbackPrompt: "좋았던 점, 헷갈린 점, 깨진 부분을 알려주세요.",
    feedbackPlaceholder: "피드백을 입력하세요...",
    feedbackInstruction: "테스트 후 Copy Test Report를 눌러 텔레그램 테스트방에 붙여넣어 주세요.",
    previewReport: "테스트 리포트 미리보기",
    manualCopy: "이 테스트 리포트를 직접 복사하세요",
    copyReport: "테스트 리포트 복사",
    submitFeedback: "피드백 제출",
    introCheckStart: "✓ 먼저 START DEMO 누르기",
    introCheckCredits: "✓ 무료 데모 CREDIT",
    introCheckMoney: "✓ 실제 금전 없음",
    introCheckPayout: "✓ 지급 없음",
    introCheckMobile: "✓ 모바일 최적화",
    introNote: "먼저 가상 테스트 포인트를 불러온 뒤\nSPIN을 눌러 데모를 시작하세요.",
    gameGuide: "게임 안내",
    paytableRules: "배당표 및 규칙",
    guideIntro:
      "네온 한국 판타지 스테이지에서 스핀하세요. 프리 게임, 도깨비 보너스, 가상 잭팟 순간을 확인할 수 있습니다. 데모 CREDIT은 현금 가치가 없습니다.",
    baseGame: "베이스 게임",
    waysByBet: "베팅 레벨별 WAYS",
    waysByBetDesc: "베팅 레벨에 따라 3, 4, 5개 릴이 활성화됩니다. 비활성 릴은 어둡게 표시됩니다.",
    presetBet: "프리셋 베팅 레벨",
    presetBetDesc: "8/16은 27 ways, 40은 81 ways, 88 이상은 전체 243 ways로 플레이합니다.",
    denomRtp: "데놈별 RTP",
    denomRtpDesc: "데놈을 바꾸면 해당 데놈에 설정된 목표 RTP가 적용됩니다.",
    symbolsTitle: "심볼",
    bonusFeatures: "보너스 기능",
    testerChecklist: "테스터 체크리스트",
    checklistStart: "시작 방법이 명확했나요?",
    checklistSpin: "SPIN 버튼을 누르기 쉬웠나요?",
    checklistBonus: "보너스 순간이 흥미롭게 느껴졌나요?",
    checklistSmooth: "휴대폰에서 부드럽게 실행됐나요?",
    checklistConfusing: "헷갈리는 부분이 있었나요?",
    useFeedback: "테스트 후 Feedback 버튼을 사용해 주세요.",
    testStats: "테스트 통계",
    originalIpNotice:
      "이 데모는 독창적인 K-pop 판타지 슬롯 데모입니다. 기존 영화, 게임, 음악 자산의 저작권 캐릭터, 로고, 장면, 공식 에셋을 사용하지 않습니다.",
    virtualCreditsNotice: "모든 CREDIT은 현금 가치가 없는 가상 테스트 포인트입니다.",
    scratchTitle: "도깨비 스크래치",
    scratchSubtitle: "잭팟 심볼 3개 맞추기",
    pickCard: "카드를 선택하세요.",
    unitLabel: "단위",
    completedSuffix: "완료",
    tagEasy: "시작 쉬움",
    tagConfusing: "헷갈림",
    tagFunBonus: "보너스 재미있음",
    tagSlow: "너무 느림",
    tagTap: "버튼 누르기 어려움",
    tagLayout: "레이아웃 깨짐",
    tagSound: "사운드 문제",
    tagTelegram: "텔레그램 문제",
    noIssue: "이슈 없음",
    layoutIssue: "레이아웃 이슈",
    telegramIssue: "텔레그램 브라우저 이슈",
    touchIssue: "버튼 / 터치 이슈",
    performanceIssue: "성능 이슈",
    confusingUx: "헷갈리는 UX",
    bonusFlow: "보너스 / 게임 흐름 피드백",
    other: "기타",
    dropLimit: "데모 DROP 한도 초과. 최대 DROP은",
    enterDrop: "데모 CREDIT 수량을 입력하세요.",
    demoLoaded: "데모 CREDIT이 로드되었습니다. SPIN을 눌러 시작하세요.",
    tapSpin: "SPIN을 눌러 데모를 시작하세요.",
    dailyLoaded: "일일 데모 CREDIT 로드 완료",
    feedbackSubmitted: "제한 테스트 피드백이 제출되었습니다.",
  },
};

const feedbackTagTranslationKeys = {
  "Easy to Start": "tagEasy",
  Confusing: "tagConfusing",
  "Fun Bonus": "tagFunBonus",
  "Too Slow": "tagSlow",
  "Button Hard to Tap": "tagTap",
  "Layout Broken": "tagLayout",
  "Sound Issue": "tagSound",
  "Telegram Issue": "tagTelegram",
};

const issueTypeTranslationKeys = {
  "No Issue": "noIssue",
  "Sound Issue": "tagSound",
  "Layout Issue": "layoutIssue",
  "Telegram Browser Issue": "telegramIssue",
  "Button / Touch Issue": "touchIssue",
  "Performance Issue": "performanceIssue",
  "Confusing UX": "confusingUx",
  "Bonus / Game Flow Feedback": "bonusFlow",
  Other: "other",
};

function t(key) {
  return i18n[state.language]?.[key] || i18n.en[key] || key;
}

function determineInitialLanguage() {
  const stored = safeLocalStorageGet(languageStorageKey);
  if (stored === "ko" || stored === "en") return stored;
  return /^ko\b/i.test(navigator.language || "") ? "ko" : "en";
}

function setTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function setAllTextContent(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
}

function translatedTag(tag) {
  return t(feedbackTagTranslationKeys[tag] || tag);
}

function missionLabel(mission) {
  const koLabels = {
    startDemo: "데모 시작하기",
    spin20: "20회 스핀하기",
    tryBetLevels: "베팅 레벨 2개 이상 시도",
    tryDenoms: "단위 옵션 2개 이상 시도",
    openGuide: "가이드 열기",
    openTestInfo: "테스트 정보 패널 열기",
    submitFeedback: "피드백 제출",
    observeEvent: "당첨, 보너스, 프리 게임, 니어미스 중 하나 이상 관찰",
  };
  return state.language === "ko" ? koLabels[mission.id] || mission.label : mission.label;
}

function progressLabel(count, total) {
  return `${count} / ${total} ${t("completedSuffix")}`;
}

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

function loadSoundVolume() {
  const stored = Number(safeLocalStorageGet(soundVolumeStorageKey));
  if (!Number.isFinite(stored)) return 0.8;
  return Math.min(1, Math.max(0, stored / 100));
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
    missionBonusClaimed: {},
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
    missionBonusClaimed: { ...(parsed.missionBonusClaimed || {}) },
    betLevelsTried: uniqueNumberList(parsed.betLevelsTried),
    denomOptionsTried: uniqueNumberList(parsed.denomOptionsTried),
  };
}

function createDefaultFeatureTrail() {
  return {
    completed: {},
    scatterTeases: 0,
    bonusTeases: 0,
    copiedReport: false,
    lastUpdatedAt: new Date().toISOString(),
  };
}

function loadFeatureTrail() {
  const defaults = createDefaultFeatureTrail();
  const stored = safeLocalStorageGet(featureTrailStorageKey);
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
    scatterTeases: Math.max(0, Number(parsed.scatterTeases) || 0),
    bonusTeases: Math.max(0, Number(parsed.bonusTeases) || 0),
    copiedReport: Boolean(parsed.copiedReport),
  };
}

function saveFeatureTrail() {
  state.featureTrail.lastUpdatedAt = new Date().toISOString();
  safeLocalStorageSet(featureTrailStorageKey, JSON.stringify(state.featureTrail));
}

function createDefaultAchievements() {
  return {
    completed: {},
    lastUpdatedAt: new Date().toISOString(),
  };
}

function loadAchievements() {
  const defaults = createDefaultAchievements();
  const stored = safeLocalStorageGet(achievementStorageKey);
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
  };
}

function saveAchievements() {
  state.achievements.lastUpdatedAt = new Date().toISOString();
  safeLocalStorageSet(achievementStorageKey, JSON.stringify(state.achievements));
}

function createDefaultSymbolCollection() {
  return {
    seen: {},
    lastUpdatedAt: new Date().toISOString(),
  };
}

function loadSymbolCollection() {
  const defaults = createDefaultSymbolCollection();
  const stored = safeLocalStorageGet(symbolCollectionStorageKey);
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
    seen: { ...(parsed.seen || {}) },
  };
}

function saveSymbolCollection() {
  state.symbolCollection.lastUpdatedAt = new Date().toISOString();
  safeLocalStorageSet(symbolCollectionStorageKey, JSON.stringify(state.symbolCollection));
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
    setHiddenMessage(state.language === "ko" ? "테스트 체크리스트 완료." : "Test checklist completed.");
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
    label: progressLabel(count, testerMissionDefinitions.length),
  };
}

function missionBonusAmountForCurrentDenom() {
  return demoCreditAmountForCurrentDenom(missionBonusDemoCredits);
}

function claimMissionBonuses(completed) {
  if (!missionBonusReady) return [];
  const newlyClaimed = [];
  let totalBonusCredits = 0;

  testerMissionDefinitions.forEach((mission) => {
    if (!completed[mission.id] || state.testerMission.missionBonusClaimed[mission.id]) return;
    state.testerMission.missionBonusClaimed[mission.id] = true;
    newlyClaimed.push(mission.id);
    totalBonusCredits += missionBonusAmountForCurrentDenom();
  });

  if (!newlyClaimed.length) return [];

  saveTesterMission();
  addCredits(totalBonusCredits, false);
  showMissionBonusFeedback(newlyClaimed, totalBonusCredits);
  return newlyClaimed;
}

function primeMissionBonusState() {
  const completed = missionCompletionMap();
  let changed = false;

  testerMissionDefinitions.forEach((mission) => {
    if (!completed[mission.id] || state.testerMission.missionBonusClaimed[mission.id]) return;
    state.testerMission.missionBonusClaimed[mission.id] = true;
    changed = true;
  });

  if (changed) {
    saveTesterMission();
  }
  missionBonusReady = true;
}

function flashMissionItems(missionIds) {
  if (!missionIds.length) return;
  requestAnimationFrame(() => {
    missionIds.forEach((missionId) => {
      document.querySelectorAll(`[data-mission-id="${missionId}"]`).forEach((item) => {
        item.classList.remove("mission-complete-flash");
        void item.offsetWidth;
        item.classList.add("mission-complete-flash");
        setTimeout(() => item.classList.remove("mission-complete-flash"), 850);
      });
    });
  });
}

function showMissionBonusTooltip(totalBonusCredits) {
  const text =
    state.language === "ko"
      ? `미션 보너스 +${formatCreditAmount(totalBonusCredits)}`
      : `Mission bonus +${formatCreditAmount(totalBonusCredits)}`;
  [els.testerMissionProgress, els.guideMissionProgress].forEach((progressElement) => {
    if (!progressElement) return;
    const container = progressElement.parentElement;
    if (!container) return;
    container.querySelectorAll(".mission-bonus-tooltip").forEach((node) => node.remove());
    const tooltip = document.createElement("span");
    tooltip.className = "mission-bonus-tooltip";
    tooltip.textContent = text;
    container.append(tooltip);
  });

  clearTimeout(missionBonusTooltipTimer);
  missionBonusTooltipTimer = setTimeout(() => {
    document.querySelectorAll(".mission-bonus-tooltip").forEach((node) => node.remove());
  }, 1500);
}

function pulseMissionPanels() {
  document.querySelectorAll(".tester-mission-panel").forEach((panel) => {
    panel.classList.remove("mission-panel-complete-pulse");
    void panel.offsetWidth;
    panel.classList.add("mission-panel-complete-pulse");
  });

  clearTimeout(missionPanelPulseTimer);
  missionPanelPulseTimer = setTimeout(() => {
    document
      .querySelectorAll(".tester-mission-panel")
      .forEach((panel) => panel.classList.remove("mission-panel-complete-pulse"));
  }, 2100);
}

function showMissionBonusFeedback(missionIds, totalBonusCredits) {
  flashMissionItems(missionIds);
  showMissionBonusTooltip(totalBonusCredits);
  setHiddenMessage(
    state.language === "ko"
      ? "미션 데모 CREDIT이 로드되었습니다. 가상 테스트 포인트 전용입니다."
      : "Mission demo credits loaded. Virtual test points only.",
    true,
  );

  const progress = missionProgress();
  if (progress.completed === progress.total) {
    pulseMissionPanels();
    showReelMessageOverlay(state.language === "ko" ? "테스트 체크리스트 완료" : "Test checklist completed", true);
    setTimeout(
      () =>
        setHiddenMessage(
          state.language === "ko"
            ? "테스트 체크리스트 완료. 가상 테스트 포인트 전용입니다."
            : "Test checklist completed. Virtual test points only.",
          true,
        ),
      1900,
    );
  }
}

function renderTesterMission() {
  if (!els.testerMissionProgress && !els.guideMissionProgress) return;
  const completed = missionCompletionMap();
  const progress = missionProgress();
  const newlyClaimed = claimMissionBonuses(completed);
  const markup = testerMissionDefinitions
    .map((mission) => {
      const done = Boolean(completed[mission.id]);
      return `<li class="${done ? "complete" : ""}" data-mission-id="${mission.id}"><span>${done ? "✓" : "○"}</span>${missionLabel(mission)}</li>`;
    })
    .join("");

  [els.testerMissionProgress, els.guideMissionProgress].forEach((element) => {
    if (element) element.textContent = progress.label;
  });
  [els.testerMissionList, els.guideMissionList].forEach((element) => {
    if (element) element.innerHTML = markup;
  });
  flashMissionItems(newlyClaimed);
  renderSessionSummary();
}

function featureTrailCompletionMap() {
  const completed = { ...state.featureTrail.completed };
  completed.startDemo = completed.startDemo || Boolean(state.testerMission.completed.startDemo);
  completed.spin10 = state.testStats.totalSpins >= 10;
  completed.spin30 = state.testStats.totalSpins >= 30;
  completed.win3 = state.testStats.totalWins >= 3;
  completed.scatterTease2 = state.featureTrail.scatterTeases >= 2;
  completed.bonusTease2 = state.featureTrail.bonusTeases >= 2;
  completed.openFeedback = completed.openFeedback || feedbackOpen();
  completed.copyReport = completed.copyReport || state.featureTrail.copiedReport;
  return completed;
}

function featureTrailProgress() {
  const completed = featureTrailCompletionMap();
  const count = featureTrailDefinitions.filter((step) => completed[step.id]).length;
  return {
    completed: count,
    total: featureTrailDefinitions.length,
    label: progressLabel(count, featureTrailDefinitions.length),
  };
}

function markFeatureTrailComplete(id) {
  if (!featureTrailDefinitions.some((step) => step.id === id)) return;
  if (state.featureTrail.completed[id]) return;
  state.featureTrail.completed[id] = true;
  saveFeatureTrail();
  renderV7Panels();
}

function recordFeatureTease(type) {
  if (type === "scatter") {
    state.featureTrail.scatterTeases += 1;
    unlockAchievement("firstScatterTease");
  }
  if (type === "bonus") {
    state.featureTrail.bonusTeases += 1;
    unlockAchievement("firstBonusTease");
  }
  saveFeatureTrail();
  renderV7Panels();
}

function unlockAchievement(id) {
  if (!achievementDefinitions.some((achievement) => achievement.id === id)) return;
  if (state.achievements.completed[id]) return;
  state.achievements.completed[id] = true;
  saveAchievements();
  renderV7Panels();
  showAchievementToast(achievementDefinitions.find((achievement) => achievement.id === id)?.label || id);
}

function showAchievementToast(label) {
  if (!els.achievementToast) return;
  clearTimeout(achievementToastTimer);
  els.achievementToast.textContent = `Achievement unlocked: ${label}`;
  els.achievementToast.classList.add("show");
  els.achievementToast.setAttribute("aria-hidden", "false");
  achievementToastTimer = setTimeout(() => {
    els.achievementToast.classList.remove("show");
    els.achievementToast.setAttribute("aria-hidden", "true");
  }, 1900);
}

function updateAchievementRules() {
  if (state.testStats.totalSpins >= 1) unlockAchievement("firstSpin");
  if (state.testStats.totalSpins >= 10) unlockAchievement("tenSpins");
  if (state.testStats.totalWins >= 1) unlockAchievement("firstWin");
  if (state.testStats.totalFreeGameTriggers >= 1) unlockAchievement("firstFreeGame");
  if (state.testStats.totalBonusTriggers >= 1) unlockAchievement("firstDokkaebiBonus");
  if (state.testStats.totalFeedbackSubmitted >= 1) unlockAchievement("feedbackSubmitted");
}

function collectSymbolsFromResult(grid) {
  if (!Array.isArray(grid)) return;
  let changed = false;
  const seenIds = new Set(grid.flat().map((symbol) => symbol?.id).filter(Boolean));
  symbolCollectionDefinitions.forEach((item) => {
    if (state.symbolCollection.seen[item.id]) return;
    if (item.symbolIds.some((id) => seenIds.has(id))) {
      state.symbolCollection.seen[item.id] = true;
      changed = true;
    }
  });
  if (changed) {
    saveSymbolCollection();
    renderV7Panels();
  }
}

function markSymbolCollectionBonusSeen() {
  if (state.symbolCollection.seen.bonus) return;
  state.symbolCollection.seen.bonus = true;
  saveSymbolCollection();
  renderV7Panels();
}

function symbolCollectionProgress() {
  const count = symbolCollectionDefinitions.filter((item) => state.symbolCollection.seen[item.id]).length;
  return {
    completed: count,
    total: symbolCollectionDefinitions.length,
    label: progressLabel(count, symbolCollectionDefinitions.length),
  };
}

function localDemoSummaryRows() {
  const spins = state.testStats.totalSpins;
  const bonuses = state.testStats.totalBonusTriggers + state.testStats.totalFreeGameTriggers;
  const feedbackSubmitted = state.testStats.totalFeedbackSubmitted > 0;
  const trail = featureTrailProgress();
  const collection = symbolCollectionProgress();
  let sessionType = "New Tester";
  if (bonuses > 0) sessionType = "Bonus Explorer";
  else if (spins >= 30 && !feedbackSubmitted) sessionType = "Fast Spinner";
  else if (feedbackSubmitted || state.selectedFeedbackTags.length) sessionType = "Careful Tester";
  const engagementSignal = spins >= 30 || trail.completed >= 6 ? "Strong" : spins >= 10 ? "Active" : "Early";

  return [
    ["Session Type", sessionType],
    ["Engagement Signal", engagementSignal],
    ["Feature Trail", trail.label],
    ["Symbol Collection", collection.label],
    ["Feedback Status", feedbackSubmitted ? "Submitted" : "Not Submitted"],
  ];
}

function renderV7Panels() {
  const trailCompleted = featureTrailCompletionMap();
  const trailProgress = featureTrailProgress();
  const trailMarkup = featureTrailDefinitions
    .map((step) => {
      const done = Boolean(trailCompleted[step.id]);
      return `<li class="${done ? "complete" : ""}"><span>${done ? "✓" : "○"}</span>${step.label}</li>`;
    })
    .join("");
  [els.featureTrailProgress, els.guideFeatureTrailProgress].forEach((element) => {
    if (element) element.textContent = trailProgress.label;
  });
  [els.featureTrailList, els.guideFeatureTrailList].forEach((element) => {
    if (element) element.innerHTML = trailMarkup;
  });
  if (els.featureTrailStatus) {
    els.featureTrailStatus.textContent =
      trailProgress.completed === trailProgress.total
        ? "Hunter Trail Complete. Visual badge only. No cash value."
        : "Trail progress is local only. No cash value.";
  }

  const achievementMarkup = achievementDefinitions
    .map((achievement) => {
      const done = Boolean(state.achievements.completed[achievement.id]);
      return `<span class="${done ? "complete" : ""}">${done ? "✓ " : ""}${achievement.label}</span>`;
    })
    .join("");
  [els.achievementList, els.guideAchievementList].forEach((element) => {
    if (element) element.innerHTML = achievementMarkup;
  });

  const collectionProgress = symbolCollectionProgress();
  const collectionMarkup = symbolCollectionDefinitions
    .map((item) => {
      const done = Boolean(state.symbolCollection.seen[item.id]);
      return `<span class="${done ? "complete" : ""}">${done ? "✓ " : "○ "}${item.label}</span>`;
    })
    .join("");
  [els.symbolCollectionProgress, els.guideSymbolCollectionProgress].forEach((element) => {
    if (element) element.textContent = collectionProgress.label;
  });
  [els.symbolCollectionList, els.guideSymbolCollectionList].forEach((element) => {
    if (element) element.innerHTML = collectionMarkup;
  });

  const summaryMarkup = localDemoSummaryRows()
    .map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`)
    .join("");
  [els.localDemoSummary, els.guideLocalDemoSummary].forEach((element) => {
    if (element) element.innerHTML = summaryMarkup;
  });
  renderReportPreview();
}

function openTrailPanel() {
  if (!els.engagementPanel) return;
  els.engagementPanel.open = true;
  els.engagementPanel.scrollIntoView({ behavior: "smooth", block: "start" });
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
  updateAchievementRules();
  renderV7Panels();
}

function formatTestTimestamp(value) {
  if (!value) return state.language === "ko" ? "설정 안 됨" : "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return state.language === "ko" ? "설정 안 됨" : "Not set";
  return date.toLocaleString(state.language === "ko" ? "ko-KR" : "en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function spinsPerFeedbackLabel() {
  return state.testStats.totalFeedbackSubmitted > 0
    ? (state.testStats.totalSpins / state.testStats.totalFeedbackSubmitted).toFixed(1)
    : "N/A";
}

function renderTestStats() {
  if (els.feedbackSession) {
    els.feedbackSession.textContent = `${t("testSession")}: ${state.testSessionId}`;
  }

  const rows = [
    [state.language === "ko" ? "총 스핀" : "Total Spins", state.testStats.totalSpins],
    [state.language === "ko" ? "총 당첨" : "Total Wins", state.testStats.totalWins],
    [state.language === "ko" ? "보너스 발생" : "Bonus Triggers", state.testStats.totalBonusTriggers],
    [state.language === "ko" ? "프리 게임 발생" : "Free Game Triggers", state.testStats.totalFreeGameTriggers],
    [state.language === "ko" ? "피드백 제출" : "Feedback Submitted", state.testStats.totalFeedbackSubmitted],
    [state.language === "ko" ? "피드백당 스핀" : "Spins / Feedback", spinsPerFeedbackLabel()],
    [state.language === "ko" ? "첫 방문" : "First Visit", formatTestTimestamp(state.testStats.firstVisitAt)],
    [state.language === "ko" ? "최근 방문" : "Last Visit", formatTestTimestamp(state.testStats.lastVisitAt)],
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
  renderV7Panels();
}

function soundStateLabel() {
  if (typeof state.sound !== "boolean") return "Unknown";
  if (!state.sound) return t("soundOff");
  return state.audioUnlocked ? t("soundOn") : t("soundLocked");
}

function hapticSupportLabel() {
  try {
    return "vibrate" in navigator ? "Supported" : "Not Supported";
  } catch {
    return "Unknown";
  }
}

function selectedIssueType() {
  return els.feedbackIssueType?.value || "No Issue";
}

function sessionSummaryRows() {
  const progress = missionProgress();
  return [
    [state.language === "ko" ? "테스트 세션 ID" : "Test Session ID", state.testSessionId],
    [t("mode"), state.testModeLabel],
    [state.language === "ko" ? "총 스핀" : "Total Spins", state.testStats.totalSpins],
    [state.language === "ko" ? "총 당첨" : "Total Wins", state.testStats.totalWins],
    [state.language === "ko" ? "보너스 발생" : "Bonus Triggers", state.testStats.totalBonusTriggers],
    [state.language === "ko" ? "프리 게임 발생" : "Free Game Triggers", state.testStats.totalFreeGameTriggers],
    [state.language === "ko" ? "피드백 제출" : "Feedback Submitted", state.testStats.totalFeedbackSubmitted],
    [state.language === "ko" ? "첫 방문" : "First Visit", formatTestTimestamp(state.testStats.firstVisitAt)],
    [state.language === "ko" ? "최근 방문" : "Last Visit", formatTestTimestamp(state.testStats.lastVisitAt)],
    [t("testerMission"), progress.label],
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
      ? t("dailyClaimed")
      : t("dailyAvailable");
  }
}

function renderReportPreview(report = null) {
  if (!els.reportPreviewText || !els.reportPreview?.open) return;
  els.reportPreviewText.value = report || buildTestReport();
}

function buildTestReport() {
  const progress = missionProgress();
  const feedback = els.feedbackText?.value.trim() || "";
  const deviceNote = els.feedbackDeviceNote?.value.trim() || "";
  const tags = state.selectedFeedbackTags.length ? state.selectedFeedbackTags.join(", ") : "None";
  const issueType = selectedIssueType();
  const timestamp = new Date().toISOString();
  const currentUrl = window.location.href;
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
    `Sound state: ${soundStateLabel()}`,
    `Haptic support: ${hapticSupportLabel()}`,
    "",
    "Test Stats:",
    `- Total Spins: ${state.testStats.totalSpins}`,
    `- Total Wins: ${state.testStats.totalWins}`,
    `- Bonus Triggers: ${state.testStats.totalBonusTriggers}`,
    `- Free Game Triggers: ${state.testStats.totalFreeGameTriggers}`,
    `- Feedback Submitted: ${state.testStats.totalFeedbackSubmitted}`,
    `- Spins per Feedback: ${spinsPerFeedbackLabel()}`,
    `- First Visit: ${formatTestTimestamp(state.testStats.firstVisitAt)}`,
    `- Last Visit: ${formatTestTimestamp(state.testStats.lastVisitAt)}`,
    "",
    `Issue type: ${issueType}`,
    `Selected quick feedback tags: ${tags}`,
    `Device note: ${deviceNote || "None"}`,
    `Written feedback: ${feedback || "None"}`,
    `Timestamp: ${timestamp}`,
    `Current URL: ${currentUrl}`,
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
  renderReportPreview(report);
  if (els.reportFallback) {
    els.reportFallback.hidden = true;
  }
  setReportStatus("");

  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard unavailable");
    }
    await navigator.clipboard.writeText(report);
    setReportStatus("Test report copied. Please paste it into Telegram.");
    setHiddenMessage("Test report copied. Please paste it into Telegram.");
  } catch {
    showReportFallback(report);
    setReportStatus("Clipboard unavailable. Copy the report manually from this panel.");
    setHiddenMessage("Copy the test report manually from the feedback panel.");
  }
  state.featureTrail.copiedReport = true;
  saveFeatureTrail();
  markFeatureTrailComplete("copyReport");
  renderV7Panels();
}

function buildShareMoment() {
  const trail = featureTrailProgress();
  const collection = symbolCollectionProgress();
  const tags = state.selectedFeedbackTags.length ? state.selectedFeedbackTags.join(", ") : "None";
  const bonusSeen = state.testStats.totalBonusTriggers > 0 ? "Yes" : "No";
  const freeGameSeen = state.testStats.totalFreeGameTriggers > 0 ? "Yes" : "No";

  return [
    "NEON HUNTER SPIN Test Moment",
    `Mode: ${state.testModeLabel}`,
    `Session Spins: ${state.testStats.totalSpins}`,
    `Bonus Seen: ${bonusSeen}`,
    `Free Game Seen: ${freeGameSeen}`,
    `Favorite feedback tags: ${tags}`,
    `Hunter Trail progress: ${trail.label}`,
    `Symbol Collection progress: ${collection.label}`,
    "Free demo only. Virtual test points have no cash value.",
  ].join("\n");
}

function showShareMomentFallback(report) {
  if (!els.shareMomentFallback || !els.shareMomentFallbackText) return;
  els.shareMomentFallback.hidden = false;
  els.shareMomentFallbackText.value = report;
  els.shareMomentFallbackText.focus({ preventScroll: true });
  els.shareMomentFallbackText.select();
}

function setShareMomentStatus(text) {
  if (els.shareMomentStatus) {
    els.shareMomentStatus.textContent = text;
  }
}

async function copyShareMoment() {
  const report = buildShareMoment();
  if (els.shareMomentFallback) {
    els.shareMomentFallback.hidden = true;
  }
  setShareMomentStatus("");

  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error("Clipboard unavailable");
    }
    await navigator.clipboard.writeText(report);
    setShareMomentStatus("Share moment copied. Paste it into Telegram.");
    setHiddenMessage("Share moment copied. Paste it into Telegram.");
  } catch {
    showShareMomentFallback(report);
    setShareMomentStatus("Clipboard unavailable. Copy the share moment manually.");
    setHiddenMessage("Copy the share moment manually from this panel.");
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
  return standalone ? t("standaloneMode") : t("browserMode");
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
    ? `${t("selected")}: ${state.selectedFeedbackTags.map(translatedTag).join(", ")}`
    : t("noTags");
}

function toggleFeedbackTag(tag) {
  if (!feedbackTagOptions.includes(tag)) return;
  state.selectedFeedbackTags = state.selectedFeedbackTags.includes(tag)
    ? state.selectedFeedbackTags.filter((selectedTag) => selectedTag !== tag)
    : [...state.selectedFeedbackTags, tag];
  renderSelectedFeedbackTags();
  renderReportPreview();
}

function initializeTelegramMode() {
  const telegramApp = window.Telegram?.WebApp;
  state.testModeLabel = telegramApp ? t("telegramMode") : t("guestMode");

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

function applyLanguage(persist = false) {
  document.documentElement.lang = state.language;
  if (persist) {
    safeLocalStorageSet(languageStorageKey, state.language);
  }
  if (els.languageSelect) {
    els.languageSelect.value = state.language;
  }

  setTextContent(".language-picker span", t("languageLabel"));
  setTextContent(".eyebrow", t("eyebrow"));
  setAllTextContent(".cabinet-marquee span", [t("marqueeLeft"), t("marqueeRight")]);
  setTextContent(".zero-credit-button", t("startDemo"));
  setTextContent(".zero-credit-cta span", t("zeroCreditSubtext"));
  setTextContent("#startDemoButton", t("startDemo"));
  setTextContent("#dailyDemoButton", t("dailyDemo"));
  setTextContent("#dropButton", "DROP");
  setTextContent("#maxBet", t("maxBet"));
  setTextContent("#cashOut", t("clear"));
  setTextContent("#feedbackButton", t("feedback"));
  setTextContent("#testInfoToggle", t("testInfo"));
  setTextContent(".app-footer", t("footer"));
  setTextContent(".intro-kicker", t("eyebrow"));
  setAllTextContent(".intro-checklist li", [
    t("introCheckStart"),
    t("introCheckCredits"),
    t("introCheckMoney"),
    t("introCheckPayout"),
    t("introCheckMobile"),
  ]);
  setTextContent(".intro-note", t("introNote"));
  setTextContent("#introStartButton", t("startDemoShort"));
  setTextContent(".tester-mission-header span", t("testerMission"));
  setTextContent(".guide-panel header p", t("gameGuide"));
  setTextContent(".guide-panel header h2", t("paytableRules"));
  setTextContent(".guide-intro", t("guideIntro"));
  setAllTextContent(".guide-section h3", [
    t("baseGame"),
    t("symbolsTitle"),
    t("bonusFeatures"),
    t("testerChecklist"),
    t("testStats"),
    t("sessionSummary"),
    t("testerMission"),
  ]);
  setAllTextContent(".guide-cards strong", [t("waysByBet"), t("presetBet"), t("denomRtp")]);
  setAllTextContent(".guide-cards p", [t("waysByBetDesc"), t("presetBetDesc"), t("denomRtpDesc")]);
  setAllTextContent(".tester-checklist li", [
    t("checklistStart"),
    t("checklistSpin"),
    t("checklistBonus"),
    t("checklistSmooth"),
    t("checklistConfusing"),
  ]);
  setTextContent(".guide-section .guide-note", t("useFeedback"));
  setAllTextContent(".guide-panel > .guide-note", [t("originalIpNotice"), t("virtualCreditsNotice"), t("footer")]);
  setTextContent("#scratchOverlay header p", t("scratchTitle"));
  setTextContent("#scratchOverlay header h2", t("scratchSubtitle"));
  setTextContent("#scratchMessage", t("pickCard"));
  setTextContent("#feedbackOverlay header p", t("limitedFeedback"));
  setTextContent(".session-summary-section h3", t("sessionSummary"));
  setTextContent(".feedback-tag-group p", t("quickTags"));
  setTextContent('label[for="feedbackIssueType"]', t("issueType"));
  setTextContent('label[for="feedbackDeviceNote"]', t("deviceNote"));
  setTextContent(".privacy-note", t("privacyNote"));
  setTextContent('label[for="feedbackText"]', t("feedbackPrompt"));
  setTextContent(".feedback-instruction", t("feedbackInstruction"));
  setTextContent("#reportPreview summary", t("previewReport"));
  setTextContent('label[for="reportFallbackText"]', t("manualCopy"));
  setTextContent("#copyTestReport", t("copyReport"));
  setTextContent("#feedbackSubmit", t("submitFeedback"));
  setTextContent("#testInfoPanel header strong", t("testInfo"));
  setAllTextContent("#testInfoPanel dt", [t("mode"), t("session"), t("viewport"), t("device"), t("pwa")]);

  document.querySelectorAll(".meter span").forEach((element, index) => {
    const labels = [
      t("creditMeter"),
      t("totalBet"),
      t("ways"),
      t("betMultiplier"),
      t("denom"),
      t("gameRtp"),
      t("lastWin"),
      t("freeGames"),
    ];
    if (labels[index]) element.textContent = labels[index];
  });

  document.querySelectorAll(".option-group > span").forEach((element, index) => {
    const labels = [t("betMultiplier"), state.language === "ko" ? "베팅 레벨" : "Bet Level", t("denomOption")];
    if (labels[index]) element.textContent = labels[index];
  });

  if (els.dropAmount) {
    els.dropAmount.placeholder = t("dropPlaceholder");
  }
  if (els.guideButton) {
    els.guideButton.setAttribute("aria-label", t("guideButtonLabel"));
  }
  if (els.feedbackCancel) {
    els.feedbackCancel.setAttribute("aria-label", t("closeFeedback"));
  }
  if (els.testInfoClose) {
    els.testInfoClose.setAttribute("aria-label", t("closeTestInfo"));
  }
  if (els.feedbackDeviceNote) {
    els.feedbackDeviceNote.placeholder = t("deviceNotePlaceholder");
  }
  if (els.feedbackText) {
    els.feedbackText.placeholder = t("feedbackPlaceholder");
  }
  els.feedbackTagButtons.forEach((button) => {
    button.textContent = translatedTag(button.dataset.feedbackTag);
  });
  document.querySelectorAll("#feedbackIssueType option").forEach((option) => {
    option.textContent = t(issueTypeTranslationKeys[option.value] || option.value);
  });
  els.denomOptions.forEach((button) => {
    button.textContent = denomLabel(Number(button.dataset.denom));
  });

  initializeTelegramMode();
  renderTestStats();
  renderSelectedFeedbackTags();
  renderTesterMission();
  updateUi();
  renderReportPreview();
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
  return formatMoney(credits);
}

function denomLabel(denomCents = state.selectedDenomCents) {
  if (denomCents >= 100) return `$${denomCents / 100}`;
  return `${denomCents}¢`;
}

function renderCredits() {
  els.credits.textContent = formatMoney(state.displayCredits);
  els.creditsMeter.classList.remove("credit-mode");
  els.creditsMeter.setAttribute(
    "aria-label",
    state.language === "ko"
      ? "데모 금액 표시가 달러 또는 센트 단위로 활성화되어 있습니다."
      : "Demo amount display is active in dollars or cents.",
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
  els.denom.textContent = denomLabel();
  els.rtp.textContent = `${Math.round(state.selectedTotalRtp * 100)}%`;
  els.lastWin.textContent = formatDisplayAmount(state.lastWin);
  const totalBonusSpins = state.bonusSpins + state.expandedBonusSpins;
  els.bonusSpins.textContent =
    state.freeSpinMultiplier > 1 ? `${totalBonusSpins} x${state.freeSpinMultiplier}` : totalBonusSpins;
  els.bonusSpins.classList.toggle("ascension-active", state.freeSpinMultiplier > 1);
  els.spinButton.textContent =
    state.expandedBonusSpins > 0 ? t("megaSpin") : state.bonusSpins > 0 ? t("freeGame") : t("spin");
  els.spinButton.disabled =
    state.scratchActive ||
    state.spinning ||
    (!bonusModeActive() && state.credits < currentBet());
  els.decreaseBet.disabled = state.spinning || bonusModeActive() || state.betIndex === 0;
  els.increaseBet.disabled = state.spinning || bonusModeActive() || state.betIndex === betSteps.length - 1;
  els.maxBet.disabled = state.spinning || bonusModeActive();
  els.autoSpin.disabled = state.spinning || bonusModeActive() || state.scratchActive;
  els.autoSpin.classList.toggle("active", Boolean(autoSpinTimer));
  els.autoSpin.textContent = autoSpinTimer ? t("stopAuto") : t("autoPlay");
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
  const amountMatch = text.match(/\d[\d,]*(?:\.\d{2})?\s*CREDIT/);
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
    setHiddenMessage(t("tapSpin"), true);
    showReelMessageOverlay(t("tapSpin"), true);
  }
}

function showDemoCreditsLoadedMessage() {
  if (demoMessageTimer) {
    clearTimeout(demoMessageTimer);
    demoMessageTimer = null;
  }

  setHiddenMessage(t("demoLoaded"), true);
  state.overlaySequenceId += 1;
  const sequenceId = state.overlaySequenceId;
  state.currentOverlay = {
    type: "message",
    text: t("demoLoaded"),
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
  markFeatureTrailComplete("openFeedback");
  renderTestStats();
  renderSelectedFeedbackTags();
  if (els.reportFallback) {
    els.reportFallback.hidden = true;
  }
  renderReportPreview();
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
  const issueType = selectedIssueType();
  const tags = [...state.selectedFeedbackTags];
  incrementTestCounter("totalFeedbackSubmitted");
  markTesterMissionComplete("submitFeedback");
  const report = buildTestReport();
  console.log("NEON HUNTER SPIN feedback:", {
    sessionId: state.testSessionId,
    mode: state.testModeLabel,
    device: deviceLabel(),
    viewport: `${window.innerWidth} x ${window.innerHeight}`,
    pwaStatus: pwaStatusLabel(),
    soundState: soundStateLabel(),
    hapticSupport: hapticSupportLabel(),
    issueType,
    tags,
    deviceNote,
    feedback,
    report,
    stats: { ...state.testStats },
    testerMission: missionProgress(),
    submittedAt: new Date().toISOString(),
  });
  els.feedbackText.value = "";
  if (els.feedbackDeviceNote) {
    els.feedbackDeviceNote.value = "";
  }
  if (els.feedbackIssueType) {
    els.feedbackIssueType.value = "No Issue";
  }
  state.selectedFeedbackTags = [];
  renderSelectedFeedbackTags();
  renderReportPreview();
  renderTestStats();
  closeFeedbackModal();
  setHiddenMessage(t("feedbackSubmitted"));
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

  const targetRtp = isFreeSpin ? ascensionAdjustedFreeRtp : baseGameTargetRtp();
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

function computeAscensionMultiplier(retriggerCount) {
  if (retriggerCount <= 0) return 1;
  if (retriggerCount === 1) return 2;
  if (retriggerCount === 2) return 3;
  return Math.min(10, 3 + (retriggerCount - 2));
}

function resetAscensionState() {
  state.freeSpinMultiplier = 1;
  state.retriggerCount = 0;
  els.bonusSpins?.classList.remove("ascension-active", "multiplier-pulse");
}

function pulseAscensionBadge() {
  if (!els.bonusSpins) return;
  els.bonusSpins.classList.remove("multiplier-pulse");
  void els.bonusSpins.offsetWidth;
  els.bonusSpins.classList.add("multiplier-pulse");
  setTimeout(() => els.bonusSpins?.classList.remove("multiplier-pulse"), 650);
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
  return (credits * state.selectedDenomCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildWaysWinFormulasFromDetails(details) {
  return details.map((detail) => {
    const unitAmount = detail.amount / detail.ways;
    return {
      formula: `${detail.counts.join("x")} WAYS x ${formatFormulaMoney(unitAmount)} = ${formatFormulaMoney(detail.amount)}`,
      caption: `${detail.symbolName} · ${detail.matchedReels} reels · ${detail.ways} ways`,
    };
  });
}

const selectableReelStateClasses = [
  "reel-selectable",
  "reel-locked",
  "reel-scatter-locked",
  "reel-bonus-locked",
  "reel-select-inactive",
  "reel-select-confirm",
];

function clearSelectableReelStates() {
  state.selectedReelReveal = null;
  els.reelWindow.classList.remove("selectable-reel-mode", "single-selectable-reel");
  els.reels.forEach((reel) => {
    reel.classList.remove(...selectableReelStateClasses);
    reel.removeAttribute("data-reveal-label");
    reel.removeAttribute("role");
    reel.removeAttribute("tabindex");
    reel.removeAttribute("aria-disabled");
    reel.removeAttribute("aria-label");
  });
}

function clearWinningSymbolHighlights() {
  clearSelectableReelStates();
  els.reelWindow.classList.remove("has-winning-symbols");
  els.reels.forEach((reel) => {
    reel.querySelectorAll(".ways-win-symbol").forEach((cell) => {
      cell.classList.remove("ways-win-symbol", "ways-win-symbol-wild");
      cell.removeAttribute("data-win-label");
    });
  });
}

function applyWinningSymbolHighlights(grid, winDetails, activeReelCount) {
  clearWinningSymbolHighlights();
  if (!Array.isArray(grid) || !winDetails.length) return;

  const labels = new Map();
  winDetails.forEach((detail) => {
    for (let reelIndex = 0; reelIndex < detail.matchedReels && reelIndex < activeReelCount; reelIndex += 1) {
      const reelSymbols = grid[reelIndex] || [];
      reelSymbols.forEach((symbol, rowIndex) => {
        if (symbol.id !== detail.symbol && !symbol.isWild) return;
        const key = `${reelIndex}:${rowIndex}`;
        const existing = labels.get(key);
        const nextLabel = `${detail.symbolName} ${detail.matchedReels} reels`;
        labels.set(key, existing ? `${existing} / ${nextLabel}` : nextLabel);
      });
    }
  });

  labels.forEach((label, key) => {
    const [reelIndex, rowIndex] = key.split(":");
    const cell = els.reels[Number(reelIndex)]?.querySelector(
      `.symbol-cell[data-row-index="${rowIndex}"]`,
    );
    if (!cell) return;
    cell.classList.add("ways-win-symbol");
    if (cell.dataset.symbol === wildSymbol.id) {
      cell.classList.add("ways-win-symbol-wild");
    }
    cell.dataset.winLabel = label;
  });

  if (labels.size) {
    els.reelWindow.classList.add("has-winning-symbols");
  }
}

function winningReelIndexesFromDetails(winDetails, activeReelCount) {
  const indexes = new Set();
  winDetails.forEach((detail) => {
    for (let index = 0; index < detail.matchedReels && index < activeReelCount; index += 1) {
      indexes.add(index);
    }
  });
  return indexes;
}

function setRevealReelState(reel, className, label, selectable = false) {
  reel.classList.add(className);
  reel.dataset.revealLabel = label;
  reel.setAttribute("aria-disabled", String(!selectable));
  if (selectable) {
    const reelNumber = Number(reel.dataset.index) + 1;
    reel.setAttribute("role", "button");
    reel.setAttribute("tabindex", "0");
    reel.setAttribute("aria-label", `Selectable reel ${reelNumber}`);
  }
}

function cloneGrid(grid) {
  return grid.map((reel) => reel.slice());
}

function applySelectableReelRevealStates(grid, winDetails, activeReelCount, options = {}) {
  clearSelectableReelStates();
  if (!Array.isArray(grid) || !winDetails.length || options.bonusTriggered || options.isFreeSpin) {
    return;
  }

  const winningReels = winningReelIndexesFromDetails(winDetails, activeReelCount);
  const selectableReels = [];

  els.reels.forEach((reel, index) => {
    const reelSymbols = grid[index] || [];
    const containsScatter = reelSymbols.some((symbol) => symbol?.isScatter);
    const containsBonus = reelSymbols.some((symbol) => symbol?.isBonus);

    if (index >= activeReelCount) {
      setRevealReelState(reel, "reel-select-inactive", "FEATURE LOCKED");
      return;
    }

    if (containsScatter) {
      setRevealReelState(reel, "reel-scatter-locked", "SCATTER LOCKED");
      return;
    }

    if (containsBonus) {
      setRevealReelState(reel, "reel-bonus-locked", "BONUS LOCK");
      return;
    }

    if (winningReels.has(index)) {
      setRevealReelState(reel, "reel-selectable", "SELECT", true);
      selectableReels.push(reel);
      return;
    }

    setRevealReelState(reel, "reel-locked", "LOCKED");
  });

  if (!selectableReels.length) {
    clearSelectableReelStates();
    return;
  }

  state.selectedReelReveal = {
    grid: cloneGrid(grid),
    bet: options.bet,
    activeReelCount,
    rowCounts: options.rowCounts?.slice() || Array(reelCount).fill(visibleRows),
    originalWin: options.win || 0,
  };
  els.reelWindow.classList.add("selectable-reel-mode");
  els.reelWindow.classList.toggle("single-selectable-reel", selectableReels.length === 1);
  if (selectableReels.length === 1) {
    showTeaseOverlay("Only one reel is available.", "Tap SELECT to respin that reel.", true);
  } else {
    showTeaseOverlay("Choose One Neon Reel", "Tap SELECT to respin one winning reel.", true);
  }
}

async function confirmSelectableReel(reel) {
  if (!reel?.classList.contains("reel-selectable") || !state.selectedReelReveal || state.spinning) return;

  reel.classList.remove("reel-select-confirm");
  void reel.offsetWidth;
  reel.classList.add("reel-select-confirm");
  try {
    await rerollSelectedReel(Number(reel.dataset.index));
  } catch (error) {
    console.error("Selected Reel respin failed", error);
    clearSelectableReelStates();
    state.spinning = false;
    updateUi();
  }
}

async function rerollSelectedReel(reelIndex) {
  const reveal = state.selectedReelReveal;
  if (!reveal || !Number.isInteger(reelIndex) || reelIndex < 0 || reelIndex >= reveal.activeReelCount) return;

  stopAutoSpin();
  settleCreditAnimation();
  hideTeaseOverlay();
  hideReelWinOverlay();
  state.spinning = true;
  updateUi();

  const reel = els.reels[reelIndex];
  const rowCount = reveal.rowCounts[reelIndex] || visibleRows;
  const profile = {
    intervalMs: 78,
    animationDuration: 0.105,
  };
  reel.classList.add("spinning", "reel-reveal-spinning");
  applyReelSpinProfile(reel, profile, false);
  const ticker = startReelTicker(reel, reelIndex, rowCount, profile.intervalMs);
  playSpinSound();
  showTeaseOverlay("Neon Reel Respin", "Selected reel is updating the result.", true);

  await wait(760);
  clearInterval(ticker);
  const nextReelResult = createReelResult(reelIndex, rowCount);
  const nextGrid = cloneGrid(reveal.grid);
  nextGrid[reelIndex] = nextReelResult;
  stopReel(reel, nextReelResult, reelIndex);
  reel.classList.remove("reel-reveal-spinning", "reel-select-confirm");
  clearSelectableReelStates();
  collectSymbolsFromResult(nextGrid);

  const rawWin = calculateRawWin(nextGrid, reveal.bet, reveal.activeReelCount);
  const updatedWin = rtpAdjustedWin(rawWin, reveal.activeReelCount, false, reveal.rowCounts);
  const waysWinDetails = distributeAdjustedWin(
    calculateWaysWinDetails(nextGrid, reveal.bet, reveal.activeReelCount),
    rawWin,
    updatedWin,
  );
  const waysWinFormulas = buildWaysWinFormulasFromDetails(waysWinDetails);
  const creditDelta = updatedWin - reveal.originalWin;

  state.lastWin = updatedWin;
  setCredits(state.credits + creditDelta, creditDelta > 0);
  clearWinningSymbolHighlights();

  if (updatedWin > 0) {
    applyWinningSymbolHighlights(nextGrid, waysWinDetails, reveal.activeReelCount);
    const restoreOverlay = {
      type: "amount",
      title: "REVEAL RESULT",
      amount: updatedWin,
      caption: "Selected reel updated",
      isWin: true,
      captionAmount: null,
    };
    setMessage(`${formatDisplayAmount(updatedWin)} reveal result.`, true);
    showReelWinOverlay("REVEAL RESULT", updatedWin, "Selected reel updated");
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    playWinSound();
  } else {
    setHiddenMessage("");
    showReelMessageOverlay("REVEAL COMPLETE", false);
  }

  state.spinning = false;
  updateUi();
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

function visualOpeningScatterPair(grid) {
  return hasScatter(grid[0]) && hasScatter(grid[1]);
}

function lockedReelTease(grid, activeReelCount, bet) {
  if (activeReelCount >= reelCount) return null;
  const lockedGrid = grid.slice(activeReelCount);
  const lockedHasFeatureSymbol = lockedGrid.some((reel) =>
    reel.some((symbol) => symbol.isScatter || symbol.isWild || symbol.isBonus),
  );
  const fullReelBonusPattern = visualOpeningScatterPair(grid) && grid.slice(2).some(hasScatter);

  if (fullReelBonusPattern) {
    return {
      title: "Locked Reel Tease",
      caption: "Bonus energy flashed beyond the active ways",
    };
  }

  const activeRawWin = calculateRawWin(grid, bet, activeReelCount);
  const fullRawWin = calculateRawWin(grid, bet, reelCount);
  if (fullRawWin > activeRawWin) {
    return {
      title: "More Ways Waiting...",
      caption: "Locked reels showed extra ways potential",
    };
  }

  if (lockedHasFeatureSymbol) {
    return {
      title: "Locked Reels Lit Up",
      caption: "Raise the bet level to activate more ways",
    };
  }

  return null;
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
    resetAscensionState();
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
    resetAscensionState();
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

function createSyntheticIR(context, seconds = 1.2, damping = 0.35) {
  const length = Math.max(1, Math.floor(context.sampleRate * seconds));
  const impulse = context.createBuffer(2, length, context.sampleRate);

  for (let channel = 0; channel < impulse.numberOfChannels; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const progress = index / length;
      const decay = (1 - progress) ** (2.2 + damping * 5);
      data[index] = (Math.random() * 2 - 1) * decay * (channel ? 0.92 : 1);
    }
  }

  return impulse;
}

function getMasterGainTarget() {
  return state.sound ? state.soundVolume : 0.0001;
}

function getMasterBus() {
  const context = getAudioContext();
  if (!context) return null;
  if (context._masterBus) return context._masterBus;

  const preGain = context.createGain();
  preGain.gain.value = 0.9;

  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 12;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.005;
  compressor.release.value = 0.18;

  const tameShelf = context.createBiquadFilter();
  tameShelf.type = "highshelf";
  tameShelf.frequency.value = 2400;
  tameShelf.gain.value = -2.5;

  const safetyLowPass = context.createBiquadFilter();
  safetyLowPass.type = "lowpass";
  safetyLowPass.frequency.value = 11000;
  safetyLowPass.Q.value = 0.7;

  const convolver = context.createConvolver();
  convolver.buffer = createSyntheticIR(context, 1.2, 0.35);
  const reverbSend = context.createGain();
  reverbSend.gain.value = 0.18;
  const reverbReturn = context.createGain();
  reverbReturn.gain.value = 0.5;

  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -1;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.001;
  limiter.release.value = 0.05;

  const masterGain = context.createGain();
  masterGain.gain.value = getMasterGainTarget();

  preGain.connect(compressor);
  compressor.connect(tameShelf);
  tameShelf.connect(safetyLowPass);
  safetyLowPass.connect(limiter);
  limiter.connect(masterGain);
  masterGain.connect(context.destination);

  compressor.connect(reverbSend);
  reverbSend.connect(convolver);
  convolver.connect(reverbReturn);
  reverbReturn.connect(masterGain);

  context._masterBus = {
    preGain,
    masterGain,
    reverbSend,
    compressor,
    tameShelf,
    safetyLowPass,
    limiter,
    convolver,
    reverbReturn,
  };
  return context._masterBus;
}

function rampMasterGain(target, duration = 0.06) {
  const context = getAudioContext();
  const bus = getMasterBus();
  if (!context || !bus) return;

  const now = context.currentTime;
  const safeTarget = Math.max(0.0001, Math.min(1, target));
  bus.masterGain.gain.cancelScheduledValues(now);
  bus.masterGain.gain.setValueAtTime(Math.max(0.0001, bus.masterGain.gain.value), now);
  bus.masterGain.gain.linearRampToValueAtTime(safeTarget, now + duration);
}

function updateSoundVolumeUi() {
  const volumePercent = Math.round(state.soundVolume * 100);
  if (els.soundVolume) {
    els.soundVolume.value = String(volumePercent);
  }
  if (els.soundVolumeValue) {
    els.soundVolumeValue.textContent = `VOL ${volumePercent}`;
  }
}

function setSoundVolumeFromInput(value, persist = true) {
  const volumePercent = Math.min(100, Math.max(0, Number(value) || 0));
  state.soundVolume = volumePercent / 100;
  if (persist) {
    safeLocalStorageSet(soundVolumeStorageKey, String(volumePercent));
  }
  updateSoundVolumeUi();
  if (state.sound) {
    rampMasterGain(state.soundVolume, 0.06);
  }
}

function setSoundEnabled(enabled, fadeSeconds = 0.25) {
  state.sound = Boolean(enabled);
  clearTimeout(masterFadeTimer);
  if (!state.sound) {
    rampMasterGain(0.0001, fadeSeconds);
    masterFadeTimer = setTimeout(() => {
      state.audioUnlocked = false;
      updateSoundButtonUi();
    }, fadeSeconds * 1000 + 20);
    return;
  }
  rampMasterGain(state.soundVolume, fadeSeconds);
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
    const bus = getMasterBus();
    source.connect(bus ? bus.preGain : context.destination);
    source.start(0);
    state.audioUnlocked = context.state === "running";
    if (state.audioUnlocked && state.sound) {
      rampMasterGain(state.soundVolume, 0.06);
    }
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
  const soundLabel = state.sound ? (soundReady ? t("soundOn") : t("soundLocked")) : t("soundOff");
  els.soundButton.setAttribute(
    "aria-label",
    state.sound ? (soundReady ? t("soundOnAria") : t("soundLockedAria")) : t("soundOffAria"),
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
  setHiddenMessage(
    state.language === "ko"
      ? "아이폰에서 오디오가 막히면 사운드 버튼을 누른 뒤 SPIN을 다시 누르세요."
      : "Tap Sound ON, then tap SPIN again if your iPhone blocks audio.",
  );
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
  const bus = getMasterBus();
  gain.connect(bus ? bus.preGain : context.destination);
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
  const bus = getMasterBus();
  gain.connect(bus ? bus.preGain : context.destination);
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
  const reelIndex = Number(reel.dataset.index);
  symbolsForReel.forEach((value, rowIndex) => {
    const symbol = symbolFromValue(value);
    const cell = document.createElement("span");
    cell.className = `symbol-cell symbol-card ${symbol.className}`;
    cell.dataset.symbol = symbol.id;
    cell.dataset.reelIndex = String(reelIndex);
    cell.dataset.rowIndex = String(rowIndex);
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

async function playDokkaebiHoldShow(grid) {
  const featureIds = new Set(["scatter", "wild", "bonus"]);
  const featureCells = els.reels.flatMap((reel) => [
    ...reel.querySelectorAll(".symbol-cell"),
  ]).filter((cell) => featureIds.has(cell.dataset.symbol));
  if (!featureCells.length && !grid?.flat?.().some((symbol) => featureIds.has(symbol?.id))) return;

  hideTeaseOverlay();
  showReelMessageOverlay("DOKKAEBI HOLD SHOW", true);
  els.machine.classList.add("hold-show");
  els.reelWindow.classList.add("hold-show");
  featureCells.forEach((cell) => cell.classList.add("hold-symbol"));

  for (let pulse = 0; pulse < 3; pulse += 1) {
    els.reelWindow.classList.remove("hold-show-pulse");
    featureCells.forEach((cell) => cell.classList.remove("hold-show-pulse"));
    void els.reelWindow.offsetWidth;
    els.reelWindow.classList.add("hold-show-pulse");
    featureCells.forEach((cell) => cell.classList.add("hold-show-pulse"));
    playBellCluster(0, 4, 0.045);
    await wait(330);
  }

  els.machine.classList.remove("hold-show");
  els.reelWindow.classList.remove("hold-show", "hold-show-pulse");
  featureCells.forEach((cell) => cell.classList.remove("hold-symbol", "hold-show-pulse"));
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
  clearWinningSymbolHighlights();
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
  collectSymbolsFromResult(result);
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

  const spinReels = els.reels.slice(0, reelCount);
  const shouldAnticipateBonus = visualOpeningScatterPair(result);
  const spinProfiles = createReelSpinProfiles(reelCount, shouldAnticipateBonus);
  const timers = spinReels.map((reel, index) => {
    reel.classList.add("spinning");
    const reelIndex = Number(reel.dataset.index);
    applyReelSpinProfile(reel, spinProfiles[index], false);
    return startReelTicker(reel, reelIndex, rowCounts[reelIndex], spinProfiles[index].intervalMs);
  });

  for (let index = 0; index < spinReels.length; index += 1) {
    const profile = spinProfiles[index];
    await wait(index >= 2 && shouldAnticipateBonus ? profile.teaseStopDelay : profile.stopDelay);
    clearInterval(timers[index]);
    stopReel(spinReels[index], result[index], index);
    if (index === 1 && shouldAnticipateBonus) {
      els.reelWindow.classList.add("scatter-anticipation");
      intensifyScatterReels(spinReels, timers, spinProfiles, rowCounts);
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
  const waysWinDetails = distributeAdjustedWin(
    calculateWaysWinDetails(result, bet, activeReelCount),
    rawWin,
    win,
  );
  const waysWinFormulas = buildWaysWinFormulasFromDetails(waysWinDetails);
  if (win > 0) {
    incrementTestCounter("totalWins");
    applyWinningSymbolHighlights(result, waysWinDetails, activeReelCount);
    applySelectableReelRevealStates(result, waysWinDetails, activeReelCount, {
      bonusTriggered,
      isFreeSpin,
      bet,
      rowCounts,
      win,
    });
  }
  const freeSpinCurrentMultiplier = isFreeSpin ? state.freeSpinMultiplier : 1;
  const multipliedWin = isFreeSpin ? win * freeSpinCurrentMultiplier : win;
  if (isFreeSpin) {
    state.freeSpinWinTotal += multipliedWin;
    state.lastWin = state.freeSpinWinTotal;
  } else {
    state.lastWin = win;
    addCredits(win, true);
  }
  if (bonusTriggered && isFreeSpin) {
    state.bonusSpins += bonusSpinAward;
    state.retriggerCount += 1;
    state.freeSpinMultiplier = computeAscensionMultiplier(state.retriggerCount);
    updateUi();
    pulseAscensionBadge();
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
  const lockedTease =
    !isFreeSpin && !bonusTriggered && chestTriggered < 0
      ? lockedReelTease(result, activeReelCount, bet)
      : null;
  const observedTesterEvent =
    win > 0 ||
    bonusTriggered ||
    chestTriggered >= 0 ||
    nearMissTriggered ||
    Boolean(lockedTease) ||
    (!isFreeSpin && !bonusTriggered && bonusEnergyTotal >= 2);
  if (observedTesterEvent) {
    markTesterMissionComplete("observeEvent");
  }
  if (bonusTriggered || chestTriggered >= 0) {
    incrementTestCounter("totalBonusTriggers");
    markSymbolCollectionBonusSeen();
    unlockAchievement("firstDokkaebiBonus");
  }
  if ((isFreeSpin && bonusTriggered) || chestTriggered === 0) {
    incrementTestCounter("totalFreeGameTriggers");
    unlockAchievement("firstFreeGame");
  }
  if (bonusTriggered || chestTriggered >= 0) {
    triggerHaptic("bonus");
  } else if (win > 0) {
    triggerHaptic("win");
  }
  if (bonusTriggered || chestTriggered >= 0 || state.bonusSpins > 0 || state.expandedBonusSpins > 0) {
    stopAutoSpin();
  }

  if (bonusTriggered || chestTriggered >= 0) {
    await playDokkaebiHoldShow(result);
  }

  if (isFreeSpin && bonusTriggered && win > 0) {
    const ascensionLevel = state.freeSpinMultiplier;
    const restoreOverlay = {
      type: "amount",
      title: `ASCENSION LEVEL ${ascensionLevel}`,
      amount: multipliedWin,
      caption: `+${bonusSpinAward} Free Games · x${ascensionLevel} active`,
      isWin: true,
      captionAmount: state.freeSpinWinTotal,
    };
    setMessage(
      `ASCENSION LEVEL ${ascensionLevel}! +${bonusSpinAward} Free Games. Multiplier x${ascensionLevel} active.`,
      true,
    );
    showReelAmountOverlay(
      `ASCENSION LEVEL ${ascensionLevel}`,
      multipliedWin,
      `+${bonusSpinAward} Free Games · x${ascensionLevel} active`,
      true,
      state.freeSpinWinTotal,
    );
    showWaysWinFormulaSequence(waysWinFormulas, restoreOverlay);
    els.machine.classList.add("celebrate");
    pulseCabinet("free-game");
    playBonusStartSound();
  } else if (isFreeSpin && bonusTriggered) {
    const ascensionLevel = state.freeSpinMultiplier;
    setMessage(
      `ASCENSION LEVEL ${ascensionLevel}! +${bonusSpinAward} Free Games. Multiplier x${ascensionLevel} active.`,
      true,
    );
    showReelMessageOverlay(`ASCENSION LEVEL ${ascensionLevel}`, true);
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
    const spinWinCaption =
      freeSpinCurrentMultiplier > 1 ? `This Spin x${freeSpinCurrentMultiplier}` : "This Spin";
    const restoreOverlay = {
      type: "amount",
      title,
      amount: multipliedWin,
      caption: spinWinCaption,
      isWin: true,
      captionAmount: state.freeSpinWinTotal,
    };
    setMessage(
      `${formatDisplayAmount(multipliedWin)} bonus win added. Bonus bank ${formatDisplayAmount(state.freeSpinWinTotal)}.`,
      true,
    );
    showReelAmountOverlay(title, multipliedWin, spinWinCaption, true, state.freeSpinWinTotal);
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
    recordFeatureTease("scatter");
    setHiddenMessage("");
    playNearMissEffects(activeReelCount);
    showTeaseOverlay("Almost Free Games...", "One more scatter lights the stage", true);
    playCloseCallSound();
  } else if (lockedTease) {
    recordFeatureTease("bonus");
    setHiddenMessage("");
    showTeaseOverlay(lockedTease.title, lockedTease.caption, true);
    playCloseCallSound();
  } else if (!isFreeSpin && !bonusTriggered && bonusEnergyTotal >= 2) {
    recordFeatureTease("bonus");
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
    resetAscensionState();
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
  resetAscensionState();
  state.betIndex = Math.min(betSteps.length - 1, Math.max(0, state.betIndex + direction));
  addMissionNumberValue("betLevelsTried", state.betIndex);
  applyBetReelRule();
  setMessage(`${activeWays()} ways active. Locked reels still spin but do not count.`);
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
  resetAscensionState();
  setMessage(
    `Bet level ${betSteps[state.betIndex]} selected. ${activeWays()} ways active. Locked reels do not count.`,
  );
  updateUi();
}

async function dropCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  const dropAmount = Number(els.dropAmount.value);
  if (!Number.isFinite(dropAmount) || dropAmount <= 0) {
    setMessage(t("enterDrop"));
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
    setHiddenMessage(`${t("dropLimit")} ${maxDropText}.`);
    showReelAmountOverlay("DROP LIMIT", maxDropCredits, "Demo drop limit exceeded", false);
    updateUi();
    return;
  }

  const creditsToAdd = (dropAmount * 100) / state.selectedDenomCents;
  addCredits(creditsToAdd, false);
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.freeSpinWinTotal = 0;
  resetAscensionState();
  playDropSound();
  els.dropAmount.value = "";
  setAmountMessage(creditsToAdd, state.language === "ko" ? "데모 CREDIT 로드 완료. SPIN을 누르세요." : "demo credits loaded. Press SPIN.");
  updateUi();
}

async function startDemoCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  addCredits(demoStartCreditAmountForCurrentDenom(), false);
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.freeSpinWinTotal = 0;
  resetAscensionState();
  markTesterMissionComplete("startDemo");
  markFeatureTrailComplete("startDemo");
  showDemoCreditsLoadedMessage();
  updateUi();
}

async function claimDailyDemoCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  await unlockAudioForUserGesture();
  const today = localDateKey();
  if (safeLocalStorageGet(dailyDemoCreditStorageKey) === today) {
    setHiddenMessage(t("dailyClaimed"));
    if (els.dailyDemoStatus) {
      els.dailyDemoStatus.textContent = t("dailyClaimed");
    }
    updateUi();
    return;
  }

  safeLocalStorageSet(dailyDemoCreditStorageKey, today);
  addCredits(demoCreditAmountForCurrentDenom(dailyDemoCredits), false);
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.freeSpinWinTotal = 0;
  resetAscensionState();
  setHiddenMessage(state.language === "ko" ? "일일 데모 CREDIT 로드 완료. 가상 테스트 포인트 전용입니다." : "Daily demo credits loaded. Virtual test points only.");
  showReelMessageOverlay(t("dailyLoaded"), true);
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
  resetAscensionState();
  setAmountMessage(cashOutAmount, state.language === "ko" ? "가상 CREDIT 초기화 완료. 보유 CREDIT이 0으로 리셋되었습니다." : "virtual credits cleared. Credit meter reset to zero.");
  updateUi();
}

function selectMultiplier(value) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  state.selectedMultiplier = value;
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  resetAscensionState();
  setMessage(state.language === "ko" ? `배수 x${value} 선택됨. SPIN을 누르세요.` : `Multiplier x${value} selected. Press SPIN.`);
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
  resetAscensionState();
  switchJackpotBankForDenom(value);
  setMessage(
    state.language === "ko"
      ? `${denomLabel(value)} 선택됨. 표시 금액은 보존됩니다. 목표 RTP ${Math.round(state.selectedTotalRtp * 100)}%.`
      : `${denomLabel(value)} selected. Displayed balance is preserved. Target RTP locked at ${Math.round(state.selectedTotalRtp * 100)}%.`,
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
      const demoCreditAmount = Math.max(0, Number(amount) || 0);
      setCredits((demoCreditAmount * 100) / state.selectedDenomCents, false);
      state.bonusSpins = 0;
      state.expandedBonusSpins = 0;
      state.freeSpinWinTotal = 0;
      resetAscensionState();
      setAmountMessage(state.credits, "debug demo credits loaded.");
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
        displayValue: (state.credits * state.selectedDenomCents) / 100,
        bonusSpins: state.bonusSpins,
        expandedBonusSpins: state.expandedBonusSpins,
        freeSpinMultiplier: state.freeSpinMultiplier,
        retriggerCount: state.retriggerCount,
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
  resetAscensionState();
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
  updateUi();
  renderReelOverlay();
});
els.creditsMeter.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    updateUi();
    renderReelOverlay();
  }
});
els.languageSelect.addEventListener("change", () => {
  state.language = els.languageSelect.value === "ko" ? "ko" : "en";
  applyLanguage(true);
  setHiddenMessage(
    state.language === "ko" ? "한국어 표시로 전환되었습니다." : "Language changed to English.",
  );
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
els.reels.forEach((reel) => {
  reel.addEventListener("click", () => confirmSelectableReel(reel));
  reel.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!reel.classList.contains("reel-selectable")) return;
    event.preventDefault();
    event.stopPropagation();
    confirmSelectableReel(reel);
  });
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
els.openTrailPanel?.addEventListener("click", openTrailPanel);
els.openTestInfoPanel?.addEventListener("click", () => setTestInfoOpen(true));
els.openFeedbackPanel?.addEventListener("click", openFeedbackModal);
els.feedbackCancel.addEventListener("click", closeFeedbackModal);
els.feedbackSubmit.addEventListener("click", submitFeedback);
els.copyTestReport.addEventListener("click", copyTestReport);
els.copyShareMoment.addEventListener("click", copyShareMoment);
els.feedbackOverlay.addEventListener("click", (event) => {
  if (event.target === els.feedbackOverlay) {
    closeFeedbackModal();
  }
});
els.feedbackTagButtons.forEach((button) => {
  button.addEventListener("click", () => toggleFeedbackTag(button.dataset.feedbackTag));
});
els.feedbackIssueType.addEventListener("change", renderReportPreview);
els.feedbackDeviceNote.addEventListener("input", renderReportPreview);
els.feedbackText.addEventListener("input", renderReportPreview);
els.reportPreview.addEventListener("toggle", renderReportPreview);
els.testInfoToggle.addEventListener("click", () => setTestInfoOpen(!testInfoOpen()));
els.testInfoClose.addEventListener("click", () => setTestInfoOpen(false));
els.soundVolume?.addEventListener("input", () => {
  setSoundVolumeFromInput(els.soundVolume.value);
});
els.soundButton.addEventListener("click", async () => {
  if (state.sound && !state.audioUnlocked) {
    const unlocked = await unlockAudio();
    if (unlocked) {
      playSoundToggleSound();
      setHiddenMessage(`${t("soundOn")}.`);
    } else {
      setHiddenMessage(
        state.language === "ko"
          ? "아이폰 오디오가 아직 차단되어 있습니다. 무음 모드를 확인하고 사운드를 다시 눌러주세요."
          : "iPhone audio is still blocked. Check silent mode and tap Sound again.",
      );
    }
    updateUi();
    return;
  }

  const nextSoundState = !state.sound;
  setSoundEnabled(nextSoundState, 0.25);
  if (!nextSoundState) {
    setHiddenMessage(`${t("soundOff")}.`);
  } else {
    const unlocked = await unlockAudio();
    playSoundToggleSound();
    setHiddenMessage(
      unlocked
        ? `${t("soundOn")}.`
        : state.language === "ko"
          ? "아이폰에서 오디오가 막히면 사운드를 다시 눌러주세요."
          : "Tap Sound again if your iPhone blocks audio.",
    );
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
applyLanguage(false);
setHiddenMessage(t("messageStart"));
addMissionNumberValue("betLevelsTried", state.betIndex);
addMissionNumberValue("denomOptionsTried", state.selectedDenomCents);
renderTestStats();
renderSelectedFeedbackTags();
renderV7Panels();
updateSoundVolumeUi();
updateUi();
primeMissionBonusState();
maybeShowIntroModal();
["resize", "orientationchange"].forEach((eventName) => {
  window.addEventListener(eventName, updateTestInfoPanel, { passive: true });
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(serviceWorkerPath).catch(() => {});
  });
}
