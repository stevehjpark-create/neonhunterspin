# Release QA Notes - 2026-04-30

Project: NEON HUNTER SPIN

## Items Checked

- Untracked implementation prompt files were moved into `docs/prompts/` so they are no longer loose root files.
- Local preview guidance was corrected to avoid opening `index.html` directly with `file://`.
- `simulate_rtp.js` now supports optional deterministic seeds with `SEED=...` for repeatable math checks.
- The latest gameplay commit on `main` is `d2ca6e2 feat: add dokkaebi ascension retrigger system`.

## Known Follow-Up

- Ascension RTP should be compared with a seeded before/after simulation when doing the next math pass.
- Real iPhone Telegram in-app browser sound and layout still require direct human device testing.

## Safety

No payment, payout, cash-out, cryptocurrency, token asset, NFT, wallet, backend login, or external reward feature was added.
