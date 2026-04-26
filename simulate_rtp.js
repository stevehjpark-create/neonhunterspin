const scatterSymbol = "🎟️";
const wildSymbol = "🪩";
const symbols = ["🎤", "🎧", "🎵", "💜", "✨", "👑", wildSymbol, scatterSymbol];
const reelWeights = [
  [30, 27, 21, 12, 5, 3, 1, 16],
  [30, 27, 21, 12, 5, 3, 1, 2],
  [30, 27, 21, 12, 5, 3, 1, 10],
  [30, 27, 21, 12, 5, 3, 1, 8],
  [30, 27, 21, 12, 5, 3, 1, 7],
];
const reelCount = 5;
const visibleRows = 3;
const bet = 88;
const paidSpins = 1_000_000;
const bonusSpinAward = 5;
const chestFreeSpinAward = 10;
const expandedBonusAward = 5;
const bonusFreeSpinTargetRtp = 0.32;
const targetBonusTriggerRate = 0.01;
const chestFeatureRtpReserve = 0.044;
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
const paytable = {
  "🎤": { 4: 0.5, 5: 8 },
  "🎧": { 4: 0.5, 5: 8 },
  "🎵": { 4: 1, 5: 12 },
  "💜": { 3: 0.2, 4: 5, 5: 70 },
  "✨": { 3: 1, 4: 30, 5: 400 },
  "👑": { 3: 2, 4: 80, 5: 1000 },
};

function totalWeightForReel(reelIndex) {
  return reelWeights[reelIndex].reduce((sum, value) => sum + value, 0);
}

function symbolChanceOnReel(symbol, reelIndex) {
  const symbolIndex = symbols.indexOf(symbol);
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

function bonusRtpContribution() {
  return targetBonusTriggerRate * expectedBonusFreeSpins() * bonusFreeSpinTargetRtp + chestFeatureRtpReserve;
}

function baseGameTargetRtp(targetRtp) {
  return Math.max(0, targetRtp - bonusRtpContribution());
}

function rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, targetRtp, rowCounts = Array(reelCount).fill(visibleRows)) {
  if (rawWin <= 0) return 0;

  const rtp = isFreeSpin ? bonusFreeSpinTargetRtp : baseGameTargetRtp(targetRtp);
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
      const symbolCount = reel.filter((cell) => cell === symbol || cell === wildSymbol).length;
      if (symbolCount === 0) break;

      matchedReels += 1;
      ways *= symbolCount;
    }

    const multiplier = payouts[matchedReels] || 0;
    return totalWin + spinBet * multiplier * ways;
  }, 0);
}

function hasScatter(reel) {
  return reel.includes(scatterSymbol);
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
    state.expandedBonusSpins += expandedBonusAward;
    stats.expandedBonuses += 1;
  }

  state.chests[index] = createChest(index);
}

function spinOnce(state, targetRtp, isExpandedSpin, isFreeSpin) {
  const rowCounts = Array.from({ length: reelCount }, (_, index) =>
    isExpandedSpin && index > 0 && index < reelCount - 1
      ? 5 + Math.floor(Math.random() * 6)
      : visibleRows,
  );
  const activeReelCount = 5;
  const result = Array.from({ length: reelCount }, (_, index) =>
    createReelResult(index, rowCounts[index]),
  );
  const naturalBonusTriggered = isBonusTrigger(result, activeReelCount);
  const randomBonusTriggered = !naturalBonusTriggered && shouldAddRandomBonus(activeReelCount);

  if (randomBonusTriggered) {
    forceBonusTrigger(result);
  }

  const bonusTriggered = isBonusTrigger(result, activeReelCount);
  const rawWin = calculateRawWin(result, bet, activeReelCount);
  const win = rtpAdjustedWin(rawWin, activeReelCount, isFreeSpin, targetRtp, rowCounts);
  state.returned += win;

  if (bonusTriggered && isFreeSpin) {
    state.bonusSpins += bonusSpinAward;
  }

  return bonusTriggered;
}

function runDenom(label, denomCents, targetRtp) {
  const state = {
    chests: createInitialChests(),
    jackpots: createInitialJackpots(),
    bonusSpins: 0,
    expandedBonusSpins: 0,
    returned: 0,
  };
  const stats = {
    bonusTriggers: 0,
    freeSpinsPlayed: 0,
    expandedSpinsPlayed: 0,
    chestFreeSpins: 0,
    scratchBonuses: 0,
    expandedBonuses: 0,
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

    while (state.bonusSpins > 0 || state.expandedBonusSpins > 0) {
      if (state.expandedBonusSpins > 0) {
        state.expandedBonusSpins -= 1;
        stats.expandedSpinsPlayed += 1;
        spinOnce(state, targetRtp, true, true);
      } else {
        state.bonusSpins -= 1;
        stats.freeSpinsPlayed += 1;
        spinOnce(state, targetRtp, false, true);
      }
    }
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
    ...stats,
  };
}

console.log(`paid_spins_per_denom=${paidSpins}`);
console.log(`bet_level=${bet}, active_reels=5, ways=243`);
console.log("denom,target_rtp,sim_rtp,diff_pp,bonus_triggers,free_spins,expanded_spins,scratch,mini,minor,major,grand");

for (const denom of denomTargets) {
  const result = runDenom(...denom);
  console.log([
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
  ].join(","));
}
