const symbolCatalog = [
  { id: "wild", isWild: true, isScatter: false },
  { id: "scatter", isWild: false, isScatter: true },
  { id: "crown", isWild: false, isScatter: false },
  { id: "diamond", isWild: false, isScatter: false },
  { id: "seven", isWild: false, isScatter: false },
  { id: "bar", isWild: false, isScatter: false },
  { id: "A", isWild: false, isScatter: false },
  { id: "K", isWild: false, isScatter: false },
  { id: "Q", isWild: false, isScatter: false },
  { id: "J", isWild: false, isScatter: false },
  { id: "ten", isWild: false, isScatter: false },
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
const reelCount = 5;
const visibleRows = 3;
const paidSpins = Number(process.env.PAID_SPINS || 1_000_000);
const simulationSeed = Number(process.env.SEED || 0);
if (Number.isFinite(simulationSeed) && simulationSeed > 0) {
  Math.random = seededRandom(simulationSeed);
}
const betLevels = [
  { bet: 8, activeReels: 3 },
  { bet: 16, activeReels: 3 },
  { bet: 40, activeReels: 4 },
  { bet: 88, activeReels: 5 },
  { bet: 176, activeReels: 5 },
];
const bonusSpinAward = 5;
const chestFreeSpinAward = 10;
const expandedBonusAward = 5;
const bonusFreeSpinTargetRtp = 0.32;
const ascensionAverageMultiplier = 1.075;
const ascensionAdjustedFreeRtp = bonusFreeSpinTargetRtp / ascensionAverageMultiplier;
const targetBonusTriggerRate = 0.01;
const chestFeatureRtpReserve = 0.044;
const highBetChestReserveRelief = 0.006;
const jackpotPriority = ["GRAND", "MAJOR", "MINOR", "MINI"];
const denomTargets = [
  ["1¢", 1, 0.88],
  ["2¢", 2, 0.89],
  ["5¢", 5, 0.9],
  ["10¢", 10, 0.91],
  ["20¢", 20, 0.92],
  ["50¢", 50, 0.93],
  ["$1", 100, 0.95],
];
const jackpotConfig = {
  MINI: { start: 150, max: 300, contribution: 0.0065 },
  MINOR: { start: 500, max: 1000, contribution: 0.002 },
  MAJOR: { start: 5000, max: 12000, contribution: 0.008 },
  GRAND: { start: 10000, max: 25000, contribution: 0.004 },
};

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}
const paytable = {
  bar: { 3: 0.05, 4: 0.5, 5: 8 },
  A: { 3: 0.05, 4: 0.5, 5: 8 },
  K: { 3: 0.1, 4: 1, 5: 12 },
  Q: { 3: 0.2, 4: 5, 5: 70 },
  diamond: { 3: 1, 4: 30, 5: 400 },
  crown: { 3: 2, 4: 80, 5: 1000 },
};

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
  let roll = Math.random() * totalWeightForReel(reelIndex);

  for (let index = 0; index < symbols.length; index += 1) {
    roll -= weights[index];
    if (roll <= 0) return symbols[index];
  }

  return symbols[0];
}

function createReelResult(reelIndex, rowCount) {
  return Array.from({ length: rowCount }, () => weightedSymbol(reelIndex));
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

function chestFeatureReserveForBet(spinBet) {
  if (spinBet <= 88) return chestFeatureRtpReserve;

  const highBetSteps = (spinBet - 88) / 88;
  return Math.max(0, chestFeatureRtpReserve - highBetChestReserveRelief * highBetSteps);
}

function bonusRtpContribution(activeReelCount, spinBet) {
  if (activeReelCount < reelCount) return 0;
  return targetBonusTriggerRate * expectedBonusFreeSpins() * bonusFreeSpinTargetRtp + chestFeatureReserveForBet(spinBet);
}

function baseGameTargetRtp(targetRtp, activeReelCount, spinBet) {
  return Math.max(0, targetRtp - bonusRtpContribution(activeReelCount, spinBet));
}

function rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, targetRtp, spinBet, rowCounts = Array(reelCount).fill(visibleRows)) {
  if (rawWin <= 0) return 0;

  const rtp = isFreeSpin ? ascensionAdjustedFreeRtp : baseGameTargetRtp(targetRtp, activeReelCount, spinBet);
  const scale = rtp / expectedRawRtp(activeReelCount, rowCounts);
  const adjustedWin = rawWin * scale;
  const wholeCoins = Math.floor(adjustedWin);
  const fractionalCoin = adjustedWin - wholeCoins;

  return wholeCoins + (Math.random() < fractionalCoin ? 1 : 0);
}

function calculateRawWin(grid, spinBet, activeReelCount) {
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
    return totalWin + spinBet * multiplier * ways;
  }, 0);
}

function hasScatter(reel) {
  return reel.some((symbol) => symbol.isScatter);
}

function isBonusTrigger(grid, activeReelCount) {
  if (activeReelCount < reelCount) return false;

  return hasScatter(grid[0]) && hasScatter(grid[1]) && grid.slice(2).some(hasScatter);
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

function shouldAddRandomBonus(activeReelCount) {
  if (activeReelCount < reelCount) return false;

  const naturalRate = naturalBonusTriggerRate();
  const extraRate = Math.max(0, targetBonusTriggerRate - naturalRate);
  const randomBonusRate = extraRate / (1 - naturalRate);

  return Math.random() < randomBonusRate;
}

function placeScatter(reel) {
  reel[Math.floor(Math.random() * visibleRows)] = scatterSymbol;
}

function forceBonusTrigger(grid) {
  placeScatter(grid[0]);
  placeScatter(grid[1]);
  placeScatter(grid[2 + Math.floor(Math.random() * 3)]);
}

function createChest(index) {
  return {
    progress: 0.16 + Math.random() * 0.05,
    threshold: 0.45 + Math.random() * 0.45,
    index,
  };
}

function createInitialChests() {
  return [0, 1, 2].map((index) => createChest(index));
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

function createInitialJackpots() {
  return {
    MINI: createJackpotState("MINI"),
    MINOR: createJackpotState("MINOR"),
    MAJOR: createJackpotState("MAJOR"),
    GRAND: createJackpotState("GRAND"),
  };
}

function jackpotReady(state, label) {
  return state.jackpots[label].value >= state.jackpots[label].target;
}

function resetJackpot(state, label) {
  state.jackpots[label] = createJackpotState(label);
}

function accrueProgressiveJackpots(state, spinBet) {
  Object.entries(jackpotConfig).forEach(([label, config]) => {
    state.jackpots[label].value = Math.min(
      config.max,
      state.jackpots[label].value + spinBet * config.contribution,
    );
  });
}

function advanceChests(state) {
  const increments = [0.018, 0.014, 0.012];

  state.chests.forEach((chest, index) => {
    chest.progress = Math.min(0.96, chest.progress + increments[index] + Math.random() * 0.012);
  });
}

function chooseChestBonus(state) {
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

function drawScratchPrize(state) {
  const readyJackpots = jackpotPriority.filter((label) => jackpotReady(state, label));
  if (readyJackpots.length > 0) {
    return readyJackpots[0];
  }

  const roll = Math.random();
  if (roll < 0.0005) return "GRAND";
  if (roll < 0.005) return "MAJOR";
  if (roll < 0.13) return "MINOR";
  return "MINI";
}

function handleChestBonus(state, index, stats) {
  state.chests[index].progress = 1;

  if (index === 0) {
    state.freeSpinMultiplier = 1;
    state.retriggerCount = 0;
    state.currentFreeGameWin = 0;
    state.bonusSpins += chestFreeSpinAward;
    stats.chestFreeSpins += 1;
  } else if (index === 1) {
    stats.scratchBonuses += 1;
    const prize = drawScratchPrize(state);
    if (prize) {
      const award = state.jackpots[prize].value;
      state.returned += award;
      stats.jackpotHits[prize] += 1;
      resetJackpot(state, prize);
    }
  } else {
    state.freeSpinMultiplier = 1;
    state.retriggerCount = 0;
    state.currentFreeGameWin = 0;
    state.expandedBonusSpins += expandedBonusAward;
    stats.expandedBonuses += 1;
  }

  state.chests[index] = createChest(index);
}

function spinOnce(state, targetRtp, isExpandedSpin, isFreeSpin, stats = null) {
  const rowCounts = Array.from({ length: reelCount }, (_, index) =>
    isExpandedSpin && index > 0 && index < reelCount - 1
      ? 5 + Math.floor(Math.random() * 6)
      : visibleRows,
  );
  const activeReelCount = isExpandedSpin ? reelCount : state.activeReelCount;
  const result = Array.from({ length: reelCount }, (_, index) =>
    createReelResult(index, rowCounts[index]),
  );
  const naturalBonusTriggered = isBonusTrigger(result, activeReelCount);
  const randomBonusTriggered = !naturalBonusTriggered && shouldAddRandomBonus(activeReelCount);

  if (randomBonusTriggered) {
    forceBonusTrigger(result);
  }

  const bonusTriggered = isBonusTrigger(result, activeReelCount);
  const rawWin = calculateRawWin(result, state.bet, activeReelCount);
  const win = rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, targetRtp, state.bet, rowCounts);
  const returnedWin = isFreeSpin ? win * state.freeSpinMultiplier : win;
  state.returned += returnedWin;
  if (isFreeSpin) {
    state.currentFreeGameWin += returnedWin;
  }

  if (bonusTriggered && isFreeSpin) {
    state.bonusSpins += bonusSpinAward;
    state.retriggerCount += 1;
    state.freeSpinMultiplier = computeAscensionMultiplier(state.retriggerCount);
    if (stats) {
      stats.retriggers += 1;
      stats.maxMultiplierSum += state.freeSpinMultiplier;
      stats.maxMultiplierSeen = Math.max(stats.maxMultiplierSeen, state.freeSpinMultiplier);
    }
  }

  return bonusTriggered;
}

function runDenom(label, denomCents, targetRtp, bet, activeReelCount) {
  const state = {
    chests: createInitialChests(),
    jackpots: createInitialJackpots(),
    bonusSpins: 0,
    expandedBonusSpins: 0,
    freeSpinMultiplier: 1,
    retriggerCount: 0,
    currentFreeGameWin: 0,
    returned: 0,
    bet,
    activeReelCount,
  };
  const stats = {
    bonusTriggers: 0,
    freeSpinsPlayed: 0,
    expandedSpinsPlayed: 0,
    chestFreeSpins: 0,
    scratchBonuses: 0,
    expandedBonuses: 0,
    retriggers: 0,
    maxMultiplierSum: 0,
    maxMultiplierSeen: 1,
    freeGameTotals: [],
    jackpotHits: { MINI: 0, MINOR: 0, MAJOR: 0, GRAND: 0 },
  };

  for (let spin = 0; spin < paidSpins; spin += 1) {
    accrueProgressiveJackpots(state, bet);
    const bonusTriggered = spinOnce(state, targetRtp, false, false);

    advanceChests(state);

    if (bonusTriggered) {
      stats.bonusTriggers += 1;
      const chest = chooseChestBonus(state);
      handleChestBonus(state, chest, stats);
    }

    let bonusSessionPlayed = false;
    while (state.bonusSpins > 0 || state.expandedBonusSpins > 0) {
      bonusSessionPlayed = true;
      if (state.expandedBonusSpins > 0) {
        state.expandedBonusSpins -= 1;
        stats.expandedSpinsPlayed += 1;
        spinOnce(state, targetRtp, true, true, stats);
      } else {
        state.bonusSpins -= 1;
        stats.freeSpinsPlayed += 1;
        spinOnce(state, targetRtp, false, true, stats);
      }
    }
    if (bonusSessionPlayed) {
      stats.freeGameTotals.push(state.currentFreeGameWin);
    }
    state.freeSpinMultiplier = 1;
    state.retriggerCount = 0;
    state.currentFreeGameWin = 0;
  }

  const wagered = paidSpins * bet;
  const rtp = state.returned / wagered;

  return {
    denom: label,
    target: targetRtp,
    rtp,
    diff: rtp - targetRtp,
    returned: state.returned,
    wagered,
    avgRetriggerCount: stats.freeGameTotals.length ? stats.retriggers / stats.freeGameTotals.length : 0,
    avgMaxMultiplier: stats.retriggers ? stats.maxMultiplierSum / stats.retriggers : 1,
    p99FreeGameTotalWin: percentile(stats.freeGameTotals, 0.99),
    ...stats,
  };
}

function percentile(values, p) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p));
  return sorted[index];
}

console.log(`paid_spins_per_denom=${paidSpins}`);
console.log("bet_level,active_reels,ways,denom,target_rtp,sim_rtp,diff_pp,bonus_triggers,free_spins,expanded_spins,scratch,mini,minor,major,grand,avg_retrigger_count,avg_max_multiplier,p99_freegame_total_win");

for (const { bet, activeReels } of betLevels) {
  const ways = 3 ** activeReels;
  for (const denom of denomTargets) {
    const result = runDenom(...denom, bet, activeReels);
    console.log([
      bet,
      activeReels,
      ways,
      result.denom,
      (result.target * 100).toFixed(2),
      (result.rtp * 100).toFixed(3),
      ((result.rtp - result.target) * 100).toFixed(3),
      result.bonusTriggers,
      result.freeSpinsPlayed,
      result.expandedSpinsPlayed,
      result.scratchBonuses,
      result.jackpotHits.MINI,
      result.jackpotHits.MINOR,
      result.jackpotHits.MAJOR,
      result.jackpotHits.GRAND,
      result.avgRetriggerCount.toFixed(4),
      result.avgMaxMultiplier.toFixed(3),
      result.p99FreeGameTotalWin.toFixed(2),
    ].join(","));
  }
}
