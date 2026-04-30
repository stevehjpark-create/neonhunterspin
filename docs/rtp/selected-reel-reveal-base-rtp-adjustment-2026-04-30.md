# Selected Reel Reveal Base RTP Adjustment - 2026-04-30

## Decision

The game keeps free SELECT available. To offset the extra expected value from player-selected reel respins, the base game RTP scale now subtracts a bet-level reserve before paying base-game ways wins.

This intentionally tunes the experience around an EV-aware SELECT player. TAKE-only users will under-return because they do not use the free SELECT upside.

## Applied Reserve

| Bet Level | Active Ways | SELECT RTP Reserve |
| ---: | ---: | ---: |
| 8 | 27 | 13.0pp |
| 16 | 27 | 13.1pp |
| 40 | 81 | 20.7pp |
| 88 | 243 | 17.6pp |
| 176 | 243 | 19.35pp |

The same reserve table is applied in `script.js` and `simulate_rtp.js`.

## 100k Validation

Commands:

```text
SEED=20260430 PAID_SPINS=100000 SELECT_POLICY=ev SELECT_EV_SAMPLES=8 node simulate_rtp.js
SEED=20260430 PAID_SPINS=100000 SELECT_POLICY=take node simulate_rtp.js
```

Saved outputs:

```text
docs/rtp/rtp-simulation-2026-04-30-select-ev-adjusted-100k.csv
docs/rtp/rtp-simulation-2026-04-30-select-adjusted-take-100k.csv
```

## EV SELECT Result

| Bet / Ways | Avg Diff |
| --- | ---: |
| 8 / 27 | -0.082pp |
| 16 / 27 | +0.032pp |
| 40 / 81 | -0.048pp |
| 88 / 243 | +0.361pp |
| 176 / 243 | -0.356pp |

Overall 35-row average diff: `-0.019pp`.

Single-row 100k variance remains visible because the game is high volatility. Observed single-row range was `-1.057pp` to `+1.876pp`.

## TAKE-Only Impact

| Bet / Ways | Avg Diff |
| --- | ---: |
| 8 / 27 | -13.037pp |
| 16 / 27 | -13.149pp |
| 40 / 81 | -21.017pp |
| 88 / 243 | -17.977pp |
| 176 / 243 | -19.329pp |

This confirms the expected trade-off: the new tuning assumes users actively use SELECT when it is favorable.

## Next Recommendation

Use EV SELECT as the main RTP validation scenario for this design. Use TAKE-only simulation only as a warning metric for testers who ignore SELECT.
