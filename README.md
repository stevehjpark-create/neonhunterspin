# NEON HUNTER SPIN

NEON HUNTER SPIN is a lightweight, web-based 2.5D mobile social slot demo built with HTML, CSS, and vanilla JavaScript.

Purpose: free Telegram-safe social slot demo for limited mobile testing.

Theme: Korean Fantasy x K-pop Neon Casino. The game uses an original IP-safe fantasy theme with virtual test credits only.

## Compliance Notice

Demo Only - No real-money wagering, payout, external rewards, cryptocurrency, or token assets.

All credits are virtual test points with no cash value.

This project does not include:

- Monetary transaction systems
- Redemption systems
- External reward systems
- Token-asset systems
- Account-value storage systems
- User transfer systems
- Gambling APIs

## Tech Stack

- `index.html`
- `styles.css`
- `script.js`
- `manifest.json`
- `service-worker.js`
- Static assets under `assets/`
- No React, Vue, Three.js, Unity, or external game engine
- No build step required

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── manifest.json
├── service-worker.js
├── simulate_rtp.js
├── docs/
│   ├── telegram-limited-test-checklist.md
│   ├── release-qa-2026-04-30.md
│   └── prompts/
├── assets/
│   ├── share/
│   │   ├── telegram-preview.png
│   │   └── telegram-preview.svg
│   └── symbols/
└── README.md
```

## Local Preview

Use a local server for testing. Do not open `index.html` directly with a `file://` URL, because browser security and service-worker behavior can block scripts, assets, or local paths.

If the Codex preview server is running, open:

```text
http://127.0.0.1:4173/
```

For a closer Netlify-like local test, run a simple static server from the project folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Netlify Deployment

### Option 1: Netlify Drag and Drop

1. Open Netlify.
2. Go to **Sites**.
3. Drag the full project folder into the deploy area.
4. Netlify should serve `index.html` from the project root.

### Option 2: Git-Based Netlify Deploy

Use these settings:

```text
Base directory: /
Build command: leave empty
Publish directory: /
```

No build command is required.

## Telegram Share Preview

The app includes Open Graph and Twitter card metadata in `index.html`.

Telegram should use:

```text
/assets/share/telegram-preview.png
```

Preview image size:

```text
1200 x 630
```

If Telegram shows an old preview, wait for Telegram cache refresh or test with a fresh URL query parameter such as:

```text
https://your-netlify-site.netlify.app/?v=2
```

## Demo Flow

1. Open the app.
2. Press **START DEMO WITH 10,000 CREDITS**.
3. Confirm the message: `Demo credits loaded`.
4. Press **SPIN**.
5. Use **DROP** only as an additional virtual test credit input.
6. Use **CLEAR** to reset virtual credits.

## How To Test

1. Open the deployed Netlify link.
2. Tap **START DEMO**.
3. Spin at least 20 times.
4. Try different bet levels and denom options.
5. Trigger or observe bonus events.
6. Submit feedback with the floating **Feedback** button.

Safety Notice: No real-money betting, payout, external rewards, cryptocurrency, or token assets.

## Pre-Release Checklist

Before sharing a Netlify URL in Telegram, check:

- The page loads without console errors.
- The footer notice is visible on mobile.
- The START DEMO button is visible as `START DEMO WITH 10,000 CREDITS`.
- The demo credit load stays denom-safe, so the demo value does not jump when testers change denominations.
- SPIN works.
- DROP works with virtual demo credits.
- Free game and bonus logic still run.
- Symbol images load without broken paths.
- Telegram preview metadata points to `assets/share/telegram-preview.png`.
- Manifest loads with app name `NEON HUNTER SPIN` and standalone display mode.
- Service worker caches only core static demo files.
- iPhone Safari and Android Chrome do not show horizontal overflow.

## v3 Limited Telegram Test Release

Version: `neon-hunter-spin-v3`

Purpose: limited Telegram user testing for the free social slot demo.

Safety rules:

- Demo credits are virtual test points only.
- Demo credits have no cash value.
- No real-money betting, payout, external rewards, cryptocurrency, token assets, monetary transaction systems, or user transfer systems.
- Feedback and test stats are local-only.

How to test:

1. Open the deployed Netlify link.
2. Confirm the mode label shows `Telegram Test Mode` in Telegram or `Guest Demo Mode` elsewhere.
3. Tap **START DEMO WITH 10,000 CREDITS**.
4. Spin at least 20 times.
5. Try bet levels, bet multipliers, and denomination options.
6. Open the guide and review the local Test Stats.
7. Submit feedback from the floating **Feedback** button.

Mobile test checklist:

- iPhone Safari has no horizontal overflow.
- Android Chrome has no horizontal overflow.
- Telegram in-app browser can start the demo and spin.
- SPIN, DROP, AUTO PLAY, Guide, and Feedback controls remain touch-friendly.
- Modal overlays fit small screens and can be closed.
- Footer safety notice stays visible without blocking gameplay.

Known limitations:

- There is no backend, login, account system, or server analytics.
- Feedback is logged to the browser console only.
- Local Test Stats are stored only in `localStorage` on the tester's device.
- Bonus and jackpot events are virtual demo moments only.

## v4 Telegram Real-Device Test Release

Version: `neon-hunter-spin-v4`

Purpose: Telegram real-device test build focused on onboarding clarity, tester feedback quality, and mobile stability.

Changes:

- Added a collapsible Test Info panel with mode, session ID, viewport, device label, and PWA status.
- Added quick feedback tags for real-device tester reports.
- Improved first 30 seconds onboarding so testers know to tap START DEMO first, then SPIN.
- Added small-screen viewport safeguards for Telegram, iPhone Safari, and Android Chrome.
- Added short cabinet pulse polish for Free Game, Dokkaebi, Scratch, and Big Win moments.
- Improved local Test Stats with Spins per Feedback.

Safety:

- No real-money betting, payout, external rewards, cryptocurrency, token-asset, monetary transaction, account-value storage, or user-transfer features.
- Demo credits remain virtual test points with no cash value.
- Feedback and stats remain local-only with no backend.

## v5 Tester Guidance and Retention Release

Version: `neon-hunter-spin-v5`

Purpose: Telegram real-device tester guidance and local-only retention validation.

Added:

- Tester Mission Checklist for guided limited testing.
- Session Summary inside Guide and Feedback surfaces.
- Daily Demo Credits, claimable once per local calendar day.
- Copy Test Report for manual Telegram tester reporting.
- Manual Device Note field for optional device context.

Safety:

- No real-money betting.
- No payout.
- No external reward.
- No cryptocurrency.
- No token assets.
- No NFT.
- No payment.
- All credits are virtual test points with no cash value.
- Test stats, missions, daily claim state, and feedback report data remain local-only unless the tester manually copies and sends the report.

## v6 Test Report Export Release

Version: `neon-hunter-spin-v6`

Purpose: Telegram real-device test report export.

Added:

- Test Report Export v2 with sound state, haptic support, timestamp, and current URL.
- Issue Type selector for structured tester feedback.
- Report Preview section showing the exact copied text.
- Clipboard fallback textarea for browsers that block direct copy.

Safety:

- No real-money betting.
- No payout.
- No external reward.
- No cryptocurrency.
- No token assets.
- No NFT.
- No payment.
- All credits are virtual test points with no cash value.
- Test reports remain local-only unless the tester manually copies and sends them.

## v7 Local Gamification and Share Moment Release

Version: `neon-hunter-spin-v7`

Purpose: Safe local-only gamification and Telegram share testing.

Added:

- NEON HUNTER TRAIL for local test milestones.
- Hold & Win-style Dokkaebi Bonus Show presentation.
- Session Achievements as cosmetic milestones.
- Symbol Collection based on actual reel results.
- Copy Share Moment for manual Telegram test sharing.
- Local Demo Summary using only local test stats.
- Dokkaebi Ascension retrigger presentation and multiplier tracking for free-game retriggers.
- Selectable Reel visibility states that mark eligible winning reels with SELECT, lock bonus/inactive/non-winning reels, and only lock scatter reels during scatter-bonus flow.
- Selected Reel wins are paid only after the tester chooses a reel and the respin result is final.
- TAKE button lets the tester keep the original ways win instead of selecting a reel respin.

Safety:

- No real-money betting.
- No payout.
- No cash-out.
- No external reward.
- No gift card.
- No cryptocurrency.
- No token asset.
- No NFT.
- No wallet.
- No payment.
- No backend login.
- All credits are virtual test points with no cash value.
- Trail, achievements, collection, and share moments are cosmetic/local-only test features.

## RTP Simulation

`simulate_rtp.js` is a local math verification helper. It is not required for Netlify deployment.

Run it locally with:

```bash
node simulate_rtp.js
```

For a shorter smoke run:

```bash
PAID_SPINS=100000 node simulate_rtp.js
```

For repeatable local checks, add a deterministic seed:

```bash
SEED=20260430 PAID_SPINS=100000 node simulate_rtp.js
```

## Prompt Archive

Large implementation prompts are stored under `docs/prompts/`:

- `docs/prompts/ux-improvement-prompt.md`
- `docs/prompts/sound-design-prompt.md`
- `docs/prompts/retrigger-improvement-prompt.md`

## Suggested Branch Name

```text
codex/neon-theme-bonus-polish
```

## Suggested Commit Message

```text
feat: improve neon hunter theme and bonus feedback
```
