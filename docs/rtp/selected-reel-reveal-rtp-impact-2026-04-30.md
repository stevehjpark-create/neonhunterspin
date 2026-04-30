# Selected Reel Reveal RTP Impact - 2026-04-30

## What Changed

`simulate_rtp.js` now models the Selected Reel Reveal feature.

Supported policies:

- `SELECT_POLICY=take`: player always keeps the original ways win.
- `SELECT_POLICY=random`: player always selects a random eligible reel.
- `SELECT_POLICY=ev`: player estimates the best eligible reel by sampled expected value and selects only when it beats TAKE.
- `SELECT_POLICY=best`: upper-bound preview model where the best sampled result is chosen.

For `ev`, use:

```text
SELECT_EV_SAMPLES=8
```

Higher sample counts are slower but more stable.

## 100k Comparison

Commands:

```text
SEED=20260430 PAID_SPINS=100000 SELECT_POLICY=take node simulate_rtp.js
SEED=20260430 PAID_SPINS=100000 SELECT_POLICY=ev SELECT_EV_SAMPLES=8 node simulate_rtp.js
```

Saved CSV files:

```text
docs/rtp/rtp-simulation-2026-04-30-select-take-100k.csv
docs/rtp/rtp-simulation-2026-04-30-select-ev-100k.csv
```

## Result Summary

| Policy | Rows | Outliers > +/-0.3pp | Largest Diff |
| --- | ---: | ---: | ---: |
| TAKE only | 35 | 23 | -1.666pp |
| EV SELECT | 35 | 35 | +27.829pp |

## Group Impact

| Policy | Bet / Ways | Avg Diff pp | Max Abs Diff pp | Avg SELECTs | Avg Delta Credits |
| --- | --- | ---: | ---: | ---: | ---: |
| TAKE | 8 / 27 | -0.043 | 0.645 | 0 | 0.000 |
| TAKE | 16 / 27 | -0.059 | 0.989 | 0 | 0.000 |
| TAKE | 40 / 81 | -0.408 | 1.099 | 0 | 0.000 |
| TAKE | 88 / 243 | -0.476 | 1.559 | 0 | 0.000 |
| TAKE | 176 / 243 | -0.006 | 1.666 | 0 | 0.000 |
| EV | 8 / 27 | +15.052 | 16.789 | 31,998 | 2.244 |
| EV | 16 / 27 | +15.077 | 15.809 | 32,319 | 4.459 |
| EV | 40 / 81 | +26.752 | 27.829 | 36,755 | 19.967 |
| EV | 88 / 243 | +23.393 | 24.724 | 35,561 | 40.484 |
| EV | 176 / 243 | +25.680 | 26.894 | 38,221 | 84.401 |

## Conclusion

The Selected Reel Reveal feature is not RTP-neutral if users can freely choose SELECT when it has positive expected value. The current free SELECT option can raise RTP dramatically in an EV-aware model.

To reduce RTP error, pick one of these approaches before tuning constants:

1. Make SELECT presentation-only and always pay the original TAKE value.
2. Charge a virtual feature cost for SELECT equal to its expected advantage.
3. Restrict SELECT to low-impact cases and cap the selected result.
4. Remove user choice and use TAKE-only for RTP-stable testing.
5. If SELECT remains free, lower the base game scale/reserve substantially, but this will make TAKE-only play underpay.

Recommendation: use approach 1 or 2. Do not tune base RTP constants until the desired SELECT behavior is decided.
