# Random Chest Target RTP Check - 2026-04-30

## Change

The Dokkaebi chest meters still display `0/100` to `100/100`, but each reset now creates a hidden target inside a random band.

When chest progress reaches that hidden target, the feature can hit before the visible meter is full. For example, if the hidden target is `63%`, the chest can burst around `63/100`.

## Target Bands

Each reset randomly chooses one band:

| Band | Hidden Target Range |
| --- | ---: |
| Early | 45% - 60% |
| Middle | 58% - 75% |
| Late | 72% - 90% |

The bands keep the average hit timing close to the earlier model while making each chest reset feel less predictable. The player-facing meter now shows raw progress, so early hits are visible instead of being converted to `100/100`.

## 100k RTP Check

Command:

```text
SEED=20260430 PAID_SPINS=100000 SELECT_POLICY=ev SELECT_EV_SAMPLES=8 node simulate_rtp.js
```

Saved output:

```text
docs/rtp/rtp-simulation-2026-04-30-random-chest-target-100k.csv
```

| Bet / Ways | Avg Diff |
| --- | ---: |
| 8 / 27 | -0.066pp |
| 16 / 27 | +0.029pp |
| 40 / 81 | -0.035pp |
| 88 / 243 | +0.109pp |
| 176 / 243 | -0.312pp |

Overall 35-row average diff: `-0.055pp`.

Single-row 100k variance remains high because the game is high volatility. Observed range was `-1.350pp` to `+1.896pp`.
