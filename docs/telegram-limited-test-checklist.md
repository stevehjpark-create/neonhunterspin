# Telegram Limited Test Checklist

Project: NEON HUNTER SPIN
Version: neon-hunter-spin-v6
Purpose: limited Telegram testing for a free social slot demo.

## v4 Real-Device Test Focus

1. Open inside Telegram.
2. Confirm Telegram Test Mode appears.
3. Tap START DEMO.
4. Spin 20 times.
5. Trigger or observe at least one bonus or near-miss event.
6. Open Feedback.
7. Select at least one quick feedback tag.
8. Submit feedback.
9. Check if any layout issue occurred.
10. Record phone model and browser context manually.

## v5 Tester Guidance & Retention Test

1. Open in Telegram.
2. Confirm Telegram Test Mode or Guest Demo Mode.
3. Start demo.
4. Claim Daily Demo Credits if available.
5. Complete Tester Mission Checklist.
6. Spin at least 20 times.
7. Try multiple bet levels.
8. Try multiple denom options.
9. Open Feedback modal.
10. Select quick feedback tags.
11. Add device note.
12. Copy Test Report.
13. Send copied report manually to the test coordinator.

Go / No-Go Criteria:

- No console errors.
- No horizontal overflow.
- START DEMO works.
- SPIN works.
- Daily Demo Credits work.
- Feedback modal works.
- Copy Test Report works.
- Tester Mission progress updates.
- Safe Demo Notice remains visible.
- No unsafe reward or monetary-system wording appears.

## v6 Test Report Export Test

1. Open the game inside Telegram.
2. Confirm mode label.
3. Tap START DEMO.
4. Spin at least 20 times.
5. Open Feedback.
6. Select quick feedback tags.
7. Select Issue Type.
8. Add device note if needed.
9. Tap Preview Test Report.
10. Tap Copy Test Report.
11. Paste report into Telegram test group.

Go / No-Go Criteria:

- No console errors.
- START DEMO works.
- SPIN works.
- Feedback modal works.
- Issue Type selector works.
- Preview Test Report displays the copied text.
- Copy Test Report works or fallback textarea appears.
- Safe Demo Notice remains visible.
- No unsafe reward or monetary-system wording appears.

## 1. Pre-Test Checklist

- Open the latest Netlify URL.
- Confirm the page title is NEON HUNTER SPIN.
- Confirm the visible mode label shows Telegram Test Mode or Guest Demo Mode.
- Confirm the footer safety notice is visible.
- Confirm no console errors appear on load.
- Confirm symbol images load without broken placeholders.
- Confirm PWA/service worker registration does not block loading.

## 2. iPhone Safari Checklist

- Page loads without horizontal scrolling.
- START DEMO button is easy to tap.
- SPIN button is reachable by thumb.
- Footer notice is visible but does not cover the SPIN button.
- Guide modal fits the viewport and closes correctly.
- Feedback modal fits the viewport and accepts typing.
- Orientation change does not break the reel layout.

## 3. Android Chrome Checklist

- Page loads without horizontal scrolling.
- START DEMO button is easy to tap.
- SPIN, DROP, AUTO PLAY, Guide, and Feedback controls respond to touch.
- Bonus overlays remain readable.
- Keyboard opening in Feedback does not break the modal layout.
- Orientation change does not break the reel layout.

## 4. Telegram In-App Browser Checklist

- Mode label shows Telegram Test Mode.
- Telegram WebApp ready/expand behavior does not throw console errors.
- START DEMO works inside Telegram.
- SPIN works inside Telegram.
- Feedback modal opens and submits to console.
- No login, backend, or Telegram user data collection is requested.

## 5. Gameplay Checklist

- START DEMO loads demo credits.
- SPIN works from the base game.
- DROP adds virtual demo credits only.
- AUTO PLAY starts and stops correctly.
- Free games can start without layout breakage.
- Dokkaebi bonus presentation fits the screen.
- Scratch bonus board appears as a 4x3 grid and can complete.
- Jackpot moments remain clearly virtual demo events.
- Test Stats update after spins, wins, bonus triggers, free-game triggers, and feedback submission.

## 6. Safety Copy Checklist

- Demo Only notice is visible.
- Credits are described as Demo Credits or Virtual Test Points.
- The phrase No Cash Value is visible in onboarding or guide copy.
- No copy promises real-money value.
- No copy promises payout, redemption, external rewards, cryptocurrency, token assets, or ranked rewards.
- Jackpot and win terms are used only as virtual demo game events.

## 7. Feedback Questions

- Was it clear how to start?
- Was the SPIN button easy to use?
- Did the bonus moments feel exciting?
- Did the game run smoothly on your phone?
- Did any text feel confusing or unsafe?
- Did any button or modal feel hard to reach?
- Did the game show any broken images, missing sounds, or console errors?

## 8. Go / No-Go Criteria

Go criteria:

- No console errors.
- No horizontal overflow.
- START DEMO works.
- SPIN works.
- Bonus and Free Game do not break layout.
- Feedback submits to console.
- Safety notice is visible.
- PWA does not break loading.

No-Go criteria:

- Any console error blocks gameplay.
- Any mobile viewport has horizontal overflow.
- START DEMO or SPIN fails.
- Feedback cannot be entered or submitted.
- Safety copy is missing or implies real-money value.
- Bonus, Free Game, or Scratch screens trap the tester.
