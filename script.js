const scatterSymbol = "🎟️";
const wildSymbol = "🪩";
const symbols = ["🎤", "🎧", "🎵", "💜", "✨", "👑", wildSymbol, scatterSymbol];
const symbolDisplay = new Map([
  ["🎤", { className: "symbol-mic", icon: "MIC", label: "Stage Mic", tier: "LOW" }],
  ["🎧", { className: "symbol-beat", icon: "BEAT", label: "Studio Beat", tier: "LOW" }],
  ["🎵", { className: "symbol-note", icon: "NOTE", label: "Hit Note", tier: "LOW" }],
  ["💜", { className: "symbol-vibe", icon: "VIBE", label: "Purple Vibe", tier: "MID" }],
  ["✨", { className: "symbol-star", icon: "STAR", label: "Stage Star", tier: "PREMIUM" }],
  ["👑", { className: "symbol-crown", icon: "CROWN", label: "Crown", tier: "TOP" }],
  [wildSymbol, { className: "symbol-wild", icon: "WILD", label: "Wild", tier: "WILD" }],
  [scatterSymbol, { className: "symbol-scatter", icon: "VAULT", label: "Scatter", tier: "SCATTER" }],
]);
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
const scratchNoPrizePickLimit = 8;
const bonusFreeSpinTargetRtp = 0.32;
const targetBonusTriggerRate = 0.01;
const chestFeatureRtpReserve = 0.044;
const creditOdometerCentsPerSecond = 50;
const maxDisplayAmount = 99_999_999.99;
const maxDropAmount = 999_999.99;
const cappedDisplayAmount = "XX,XXX,XXX.XX";
const jackpotConfig = {
  MINI: { start: 150, max: 300, contribution: 0.0065 },
  MINOR: { start: 500, max: 1000, contribution: 0.002 },
  MAJOR: { start: 5000, max: 12000, contribution: 0.008 },
  GRAND: { start: 10000, max: 25000, contribution: 0.004 },
};
const paytable = {
  "🎤": { 4: 0.5, 5: 8 },
  "🎧": { 4: 0.5, 5: 8 },
  "🎵": { 4: 1, 5: 12 },
  "💜": { 3: 0.2, 4: 5, 5: 70 },
  "✨": { 3: 1, 4: 30, 5: 400 },
  "👑": { 3: 2, 4: 80, 5: 1000 },
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
  jackpots: createInitialJackpots(),
  scratchActive: false,
  scratchResolve: null,
  scratchSequence: [],
  scratchCounts: {},
  scratchPrize: null,
  scratchPickLimit: scratchCardCount,
  spinning: false,
  sound: true,
  currentOverlay: null,
  autoPlayStopRequested: false,
};

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
  spinButton: document.querySelector("#spinButton"),
  decreaseBet: document.querySelector("#decreaseBet"),
  increaseBet: document.querySelector("#increaseBet"),
  maxBet: document.querySelector("#maxBet"),
  autoSpin: document.querySelector("#autoSpin"),
  dropAmount: document.querySelector("#dropAmount"),
  dropButton: document.querySelector("#dropButton"),
  cashOut: document.querySelector("#cashOut"),
  soundButton: document.querySelector("#soundButton"),
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
};

let audioContext;
let autoSpinTimer;
let creditAnimationFrame;

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
  const symbolIndex = symbols.indexOf(symbol);
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
  state.selectedReels = activeReelsForBetIndex(state.betIndex);
}

function fixedRtpForDenom(denomCents) {
  return rtpByDenomCents.get(denomCents) || rtpSteps[0];
}

function applyDenomRtpRule() {
  state.selectedTotalRtp = fixedRtpForDenom(state.selectedDenomCents);
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
    state.showCreditsAsCredits ? "Credit display active. Press to show cash value." : "Cash value display active. Press to show credits.",
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
  els.dropAmount.disabled = state.spinning || state.scratchActive;
  els.dropButton.disabled = state.spinning || state.scratchActive;
  els.cashOut.disabled = state.spinning || state.scratchActive || state.credits <= 0;
  els.denomToggle.textContent = denomLabel();
  els.denomToggle.disabled = state.spinning || bonusModeActive() || state.scratchActive;
  if (els.denomToggle.disabled) {
    setDenomPickerOpen(false);
  }
  els.soundButton.setAttribute("aria-label", state.sound ? "Sound off" : "Sound on");
  els.soundButton.classList.toggle("active", state.sound);
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
  state.currentOverlay = {
    type: "message",
    text,
    isWin,
  };
  renderReelOverlay();
}

function showReelAmountOverlay(title, amount, caption, isWin = true, captionAmount = null) {
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
    renderChestGems(index, chest);
  });
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

function bonusRtpContribution() {
  if (state.selectedReels < reelCount) return 0;
  return targetBonusTriggerRate * expectedBonusFreeSpins() * bonusFreeSpinTargetRtp + chestFeatureRtpReserve;
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
      const symbolCount = reel.filter((cell) => cell === symbol || cell === wildSymbol).length;
      if (symbolCount === 0) break;

      matchedReels += 1;
      ways *= symbolCount;
    }

    const multiplier = payouts[matchedReels] || 0;
    return totalWin + bet * multiplier * ways;
  }, 0);
}

function hasScatter(reel) {
  return reel.includes(scatterSymbol);
}

function scatterCount(grid, activeReelCount = state.selectedReels) {
  return grid.slice(0, activeReelCount).reduce((count, reel) => {
    return count + (hasScatter(reel) ? 1 : 0);
  }, 0);
}

function openingScatterPair(grid, activeReelCount = state.selectedReels) {
  return activeReelCount >= reelCount && hasScatter(grid[0]) && hasScatter(grid[1]);
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
  return ["10 FREE GAMES", "SCRATCH JACKPOT", "EXPANDED REELS"][index] || "VAULT BONUS";
}

function renderVaultIntroGems(index) {
  els.vaultIntroGems.innerHTML = "";
  createChestGems(index).forEach((gem) => {
    const piece = document.createElement("i");
    const burstX = Math.round((Math.random() - 0.5) * 320);
    const burstY = Math.round(-80 - Math.random() * 180);
    const delay = 1.38 + Math.random() * 0.28;
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
  [110, 96, 124, 90].forEach((tone, index) => {
    playTone(tone, 0.12, "sawtooth", index * 0.16, 0.035);
  });
  playTone(196, 0.18, "triangle", 0.92, 0.08);
  playTone(330, 0.14, "triangle", 1.18, 0.09);
  playTone(880, 0.22, "sine", 1.55, 0.12);
  playTone(1320, 0.18, "triangle", 1.68, 0.1);
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

  await wait(2600);
  els.vaultBonusIntro.classList.remove("show", "playing");
  els.vaultBonusIntro.setAttribute("aria-hidden", "true");
  await wait(160);
}

async function handleChestBonus(index) {
  if (index < 0) return;

  state.spinning = true;
  setHiddenMessage("Vault Bonus feature reveal in progress");
  state.chests[index].progress = 1;
  updateChestUi(index);
  playBonusStartSound();
  updateUi();
  await playVaultBonusIntro(index);
  state.spinning = false;

  if (index === 0) {
    state.freeSpinWinTotal = 0;
    state.bonusSpins += chestFreeSpinAward;
    setMessage(`Vault Bonus! ${chestFreeSpinAward} Free Games awarded!`, true);
  } else if (index === 1) {
    setMessage("Vault Bonus! Scratch Jackpot feature triggered.", true);
    updateUi();
    await wait(600);
    await startScratchBonus();
  } else {
    state.freeSpinWinTotal = 0;
    state.expandedBonusSpins += expandedBonusAward;
    setMessage(`Vault Bonus! ${expandedBonusAward} Expanded Reel Games awarded!`, true);
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
  if (prize) {
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

  return [
    "MINI",
    "MINOR",
    "MAJOR",
    "GRAND",
    "MINI",
    "MINOR",
    "MAJOR",
    "GRAND",
    "MINI",
    "MINOR",
    "MAJOR",
    "GRAND",
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

function startScratchBonus() {
  state.scratchActive = true;
  state.scratchPrize = drawScratchPrize();
  state.scratchSequence = buildScratchSequence(state.scratchPrize);
  state.scratchCounts = {};
  state.scratchPickLimit = scratchCardCount;
  els.scratchGrid.innerHTML = "";
  els.scratchStatus.textContent = "0 / 3";
  els.scratchMessage.textContent = "Pick cards from the 12-card scratch board.";
  els.scratchOverlay.classList.add("open");
  els.scratchOverlay.setAttribute("aria-hidden", "false");

  for (let index = 0; index < scratchCardCount; index += 1) {
    const card = document.createElement("button");
    card.className = "scratch-card";
    card.type = "button";
    card.textContent = "?";
    card.addEventListener("click", () => revealScratchCard(card));
    els.scratchGrid.appendChild(card);
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
  card.textContent = scratchLabel(symbol);
  playTone(620 + revealedCount * 28, 0.08, "triangle", 0, 0.1);

  if (jackpotLabels.includes(symbol)) {
    state.scratchCounts[symbol] = (state.scratchCounts[symbol] || 0) + 1;
    els.scratchStatus.textContent = `${state.scratchCounts[symbol]} / 3 ${symbol}`;

    if (state.scratchCounts[symbol] >= 3) {
      finishScratchBonus(symbol);
      return;
    }
  }

  if (revealedCount + 1 >= state.scratchPickLimit) {
    finishScratchBonus(null);
  } else {
    els.scratchMessage.textContent = "Pick the next card.";
  }
}

function finishScratchBonus(prize) {
  if (!state.scratchActive) return;
  state.scratchActive = false;
  els.scratchGrid.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  if (prize) {
    const award = jackpotValue(prize);
    const message = jackpotWinMessage(prize, award);
    addCredits(award, true);
    state.lastWin = award;
    resetJackpot(prize);
    els.scratchMessage.textContent = message;
    setMessage(message, true);
    showReelWinOverlay(`${prize} Jackpot Hit`, award, "Jackpot Award");
    playWinSound();
  } else {
    els.scratchMessage.textContent = "No jackpot collected. Better luck next time.";
    setMessage("Scratch feature complete. No jackpot collected.");
    playBonusEndSound();
  }

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
    return context.state === "running";
  } catch {
    return false;
  }
}

function playTone(frequency, duration, type = "sine", delay = 0, volume = 0.12) {
  if (!state.sound) return;

  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    context.resume().catch(() => {});
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

function playSpinSound() {
  playTone(220, 0.08, "square");
  playTone(280, 0.08, "square", 0.08);
  playTone(340, 0.08, "square", 0.16);
}

function playReelSpinTick(index) {
  playTone(120 + index * 18, 0.035, "square", 0, 0.025);
}

function playReelStopSound(index) {
  playTone(360 + index * 85, 0.09, "triangle", 0, 0.13);
  playTone(240 + index * 35, 0.06, "sine", 0.04, 0.055);
}

function playScatterSound(index) {
  const startTone = 760 + index * 55;
  playTone(startTone, 0.1, "sine", 0.08, 0.12);
  playTone(startTone * 1.25, 0.12, "triangle", 0.17, 0.1);
  playTone(startTone * 1.5, 0.14, "sine", 0.28, 0.08);
}

function playAnticipationSound() {
  [440, 554, 659, 784].forEach((tone, index) => {
    playTone(tone, 0.09, index % 2 ? "sine" : "triangle", index * 0.12, 0.065);
  });
}

function playCloseCallSound() {
  playTone(660, 0.08, "triangle", 0, 0.07);
  playTone(520, 0.12, "sine", 0.12, 0.055);
}

function playWinSound() {
  [523, 659, 784, 1046].forEach((tone, index) => {
    playTone(tone, 0.16, "triangle", index * 0.09);
  });
}

function playBonusStartSound() {
  [523, 659, 784, 1046, 1318].forEach((tone, index) => {
    playTone(tone, 0.18, index % 2 === 0 ? "triangle" : "sine", index * 0.1, 0.14);
  });
  playTone(1568, 0.24, "sine", 0.52, 0.1);
}

function playBonusEndSound() {
  [1046, 880, 659, 523].forEach((tone, index) => {
    playTone(tone, 0.18, "triangle", index * 0.12, 0.12);
  });
  playTone(392, 0.32, "sine", 0.5, 0.09);
}

function playDropSound() {
  playTone(392, 0.08, "triangle", 0, 0.11);
  playTone(523, 0.08, "triangle", 0.08, 0.12);
  playTone(659, 0.12, "sine", 0.16, 0.1);
}

function playCashOutSound() {
  playTone(880, 0.08, "sine", 0, 0.12);
  playTone(659, 0.08, "triangle", 0.08, 0.1);
  playTone(440, 0.16, "sine", 0.18, 0.1);
}

function playCreditStackSound(step = 0) {
  const baseTone = 820 + (step % 6) * 36;
  playTone(baseTone, 0.045, "triangle", 0, 0.055);
  playTone(baseTone * 1.48, 0.035, "sine", 0.025, 0.035);
}

function createReelResult(reelIndex, rowCount = visibleRows) {
  return Array.from({ length: rowCount }, () => weightedSymbol(reelIndex));
}

function renderReel(reel, symbolsForReel) {
  reel.innerHTML = "";
  reel.style.gridTemplateRows = `repeat(${symbolsForReel.length}, 1fr)`;
  symbolsForReel.forEach((symbol) => {
    const display = symbolDisplay.get(symbol) || {
      className: "symbol-default",
      icon: symbol,
      label: "Symbol",
      tier: "",
    };
    const cell = document.createElement("span");
    cell.className = `symbol-card ${display.className}`;
    cell.dataset.symbol = symbol;
    cell.setAttribute("aria-label", display.label);

    const icon = document.createElement("b");
    icon.className = "symbol-icon";
    icon.textContent = display.icon;

    const label = document.createElement("small");
    label.textContent = display.tier;

    cell.append(icon, label);
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

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function showReelWinOverlay(title, amount, caption) {
  showReelAmountOverlay(title, amount, caption, true);
}

function showTeaseOverlay(title, caption, pulse = false) {
  els.teaseTitle.textContent = title;
  els.teaseCaption.textContent = caption;
  els.teaseOverlay.classList.add("show");
  els.teaseOverlay.classList.toggle("pulse", pulse);
  els.teaseOverlay.setAttribute("aria-hidden", "false");
}

function hideTeaseOverlay() {
  els.teaseOverlay.classList.remove("show", "pulse");
  els.teaseOverlay.setAttribute("aria-hidden", "true");
  els.reelWindow.classList.remove("scatter-anticipation");
}

function hideReelWinOverlay() {
  state.currentOverlay = null;
  els.freeWinOverlay.classList.remove("show");
  els.freeWinOverlay.classList.remove("win", "has-amount");
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
  renderReel(reel, result);
  playReelStopSound(index);
  if (result.includes(scatterSymbol)) {
    playScatterSound(index);
  }
}

function winPresentationTitle(win, bet, isFreeSpin = false) {
  const multiple = bet > 0 ? win / bet : 0;
  if (multiple >= 50) return "EPIC WIN";
  if (multiple >= 25) return "MEGA WIN";
  if (multiple >= 10) return "BIG WIN";
  return isFreeSpin ? "BONUS WAYS WIN" : `${activeWays()} WAYS WIN`;
}

async function spin() {
  if (state.spinning || state.scratchActive) {
    return;
  }

  settleCreditAnimation();

  if (!bonusModeActive() && state.credits < currentBet()) {
    return;
  }

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
  state.lastWin = 0;
  els.machine.classList.remove("celebrate");
  setHiddenMessage(isExpandedSpin ? "Expanded Reels bonus game in progress" : isFreeSpin ? "Free Game in progress" : "");
  updateUi();
  playSpinSound();

  const activeReels = els.reels.slice(0, activeReelCount);
  const shouldAnticipateBonus = openingScatterPair(result, activeReelCount);
  const timers = activeReels.map((reel) => {
    reel.classList.add("spinning");
    const reelIndex = Number(reel.dataset.index);
    return setInterval(() => randomizeReel(reel, reelIndex, rowCounts[reelIndex]), 80);
  });

  for (let index = 0; index < activeReels.length; index += 1) {
    await wait(index === 0 ? 650 : 360);
    clearInterval(timers[index]);
    stopReel(activeReels[index], result[index], index);
    if (index === 1 && shouldAnticipateBonus) {
      els.reelWindow.classList.add("scatter-anticipation");
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
  state.lastWin = win;
  if (isFreeSpin) {
    state.freeSpinWinTotal += win;
  } else {
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
  if (bonusTriggered || chestTriggered >= 0 || state.bonusSpins > 0 || state.expandedBonusSpins > 0) {
    stopAutoSpin();
  }

  if (isFreeSpin && bonusTriggered && win > 0) {
    setMessage(
      `Retrigger! +${bonusSpinAward} Free Games and ${formatDisplayAmount(win)} added to bonus bank!`,
      true,
    );
    showReelAmountOverlay("Retrigger", win, `+${bonusSpinAward} Free Games`, true, state.freeSpinWinTotal);
    els.machine.classList.add("celebrate");
    playBonusStartSound();
  } else if (isFreeSpin && bonusTriggered) {
    setMessage(`Retrigger! +${bonusSpinAward} Free Games awarded!`, true);
    els.machine.classList.add("celebrate");
    playBonusStartSound();
  } else if (bonusTriggered && win > 0) {
    setMessage(`Vault Bonus triggered! ${formatDisplayAmount(win)} ways win!`, true);
    showReelWinOverlay(winPresentationTitle(win, bet), win, "Ways Award");
    els.machine.classList.add("celebrate");
  } else if (bonusTriggered) {
    setMessage("Vault Bonus triggered!", true);
    els.machine.classList.add("celebrate");
  } else if (isFreeSpin && win > 0) {
    setMessage(
      `${formatDisplayAmount(win)} bonus win added. Bonus bank ${formatDisplayAmount(state.freeSpinWinTotal)}.`,
      true,
    );
    showReelAmountOverlay(winPresentationTitle(win, bet, true), win, "This Spin", true, state.freeSpinWinTotal);
    els.machine.classList.add("celebrate");
    playWinSound();
  } else if (win > 0) {
    setMessage(`${formatDisplayAmount(win)} ways win!`, true);
    showReelWinOverlay(winPresentationTitle(win, bet), win, "Ways Award");
    els.machine.classList.add("celebrate");
    playWinSound();
  } else if (!isFreeSpin && shouldAnticipateBonus && scatterCount(result, activeReelCount) === 2) {
    setHiddenMessage("No win. Place your next wager.");
    playCloseCallSound();
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
    setMessage("Insufficient credits. Enter cash and press DROP.");
  } else {
    setMessage("No win. Place your next wager.");
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
  applyBetReelRule();
  setMessage(`${activeWays()} ways active. Inactive reels are dimmed.`);
  updateUi();
}

function selectBetLevel(index) {
  if (state.spinning || bonusModeActive()) return;
  stopAutoSpin();
  state.betIndex = Math.min(betSteps.length - 1, Math.max(0, index));
  applyBetReelRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  setMessage(
    `Bet level ${betSteps[state.betIndex]} selected. ${activeWays()} ways active.`,
  );
  updateUi();
}

function dropCredits() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  const dropAmount = Number(els.dropAmount.value);
  if (!Number.isFinite(dropAmount) || dropAmount <= 0) {
    setMessage("Enter a cash-in amount.");
    updateUi();
    return;
  }

  if (dropAmount > maxDropAmount) {
    setMessage(`Cash-in limit exceeded. Maximum DROP is ${maxDropAmount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}.`);
    updateUi();
    return;
  }

  const creditsToAdd = (dropAmount * 100) / state.selectedDenomCents;
  addCredits(creditsToAdd, false);
  playDropSound();
  els.dropAmount.value = "";
  setAmountMessage(creditsToAdd, "cash in complete. Press SPIN.");
  updateUi();
}

function cashOut() {
  if (state.spinning || state.scratchActive) return;
  stopAutoSpin();
  const cashOutAmount = state.credits;
  setCredits(0, false);
  playCashOutSound();
  state.lastWin = 0;
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.freeSpinWinTotal = 0;
  setAmountMessage(cashOutAmount, "cash out complete. Credit meter reset to zero.");
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
  setDenomPickerOpen(false);
  state.selectedDenomCents = value;
  applyDenomRtpRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  state.jackpots = createInitialJackpots();
  setAmountMessage(
    1,
    `denomination selected. Target RTP locked at ${Math.round(state.selectedTotalRtp * 100)}%. Press SPIN.`,
  );
  updateUi();
}

els.spinButton.addEventListener("click", spin);
els.decreaseBet.addEventListener("click", () => changeBet(-1));
els.increaseBet.addEventListener("click", () => changeBet(1));
els.maxBet.addEventListener("click", () => {
  if (bonusModeActive()) return;
  stopAutoSpin();
  state.betIndex = betSteps.length - 1;
  applyBetReelRule();
  state.bonusSpins = 0;
  state.expandedBonusSpins = 0;
  setMessage(`Max bet selected. ${activeWays()} ways active.`);
  updateUi();
});
els.autoSpin.addEventListener("click", toggleAutoSpin);
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
els.soundButton.addEventListener("click", async () => {
  state.sound = !state.sound;
  if (state.sound) {
    await unlockAudio();
    playTone(660, 0.12, "triangle");
  }
  updateUi();
});

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  document.addEventListener(
    eventName,
    () => {
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
    setDenomPickerOpen(false);
  }
  if (guideOpen()) {
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
setMessage(els.message.textContent);
updateUi();
