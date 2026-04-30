# NEON HUNTER SPIN - KakaoTalk Limited Test Checklist

Version: neon-hunter-spin-v9-kakao-inapp-test

Official URL:

```text
https://neonhunterspin.netlify.app/
```

## 1. Test Purpose

- Validate mobile UX inside KakaoTalk's in-app browser.
- Confirm START DEMO, SPIN, SELECT, TAKE, Auto Play, SOUND ON/OFF, and Feedback work on real devices.
- Check modal, keyboard, footer, and viewport stability before Telegram testing.

## 2. Safety Rules

- No real-money betting.
- No payout.
- No cash-out.
- No external reward.
- No gift card.
- No cryptocurrency.
- No NFT.
- No wallet.
- No payment.
- All credits are virtual test points with no cash value.

## 3. How to Open

- Open the official URL inside a KakaoTalk chat.
- Tap the link from KakaoTalk so it opens in KakaoTalk's in-app browser.
- Confirm the visible mode label shows `KakaoTalk Test Mode`.

## 4. What to Test

- Tap START DEMO.
- Tap SPIN.
- Toggle SOUND ON/OFF.
- Try SELECT on an eligible glowing reel.
- Try TAKE on a SELECT/TAKE state.
- Try Auto Play.
- Trigger or observe a bonus, free game, or tease event if possible.
- Open Feedback.
- Select feedback tags.
- Tap Copy Kakao Test Message.
- Paste the copied report into the KakaoTalk test chat.

## 5. iPhone KakaoTalk Checklist

- KakaoTalk Test Mode appears.
- SOUND ON/OFF is readable and does not mislead when audio is locked.
- Tap once to enable sound message is understandable.
- SPIN button remains visible.
- SELECT and TAKE remain visible.
- Feedback modal scrolls when the keyboard opens.
- No horizontal overflow appears.

## 6. Android KakaoTalk Checklist

- KakaoTalk Test Mode appears.
- START DEMO and SPIN respond to touch.
- SOUND ON/OFF state is clear.
- SELECT and TAKE can be tapped without accidental touches.
- Auto Play can start and stop.
- Feedback tags and Copy Kakao Test Message work.
- No horizontal overflow appears.

## 7. Required Feedback

- Device model and browser context, if the tester knows it.
- Whether sound worked.
- Whether the screen was cut off.
- Whether buttons were hidden or hard to tap.
- Whether SELECT/TAKE was clear.
- Whether Auto Play behaved as expected.

Do not include name, phone number, email, Kakao ID, or other personal data.

## 8. Go / No-Go Criteria

Go:

- Game loads without console-blocking errors.
- START DEMO works.
- SPIN works.
- SELECT works.
- TAKE works.
- Auto Play works.
- Feedback modal works.
- Copy Kakao Test Message works or fallback textarea appears.
- Safe Demo Notice remains visible.

No-Go:

- The game fails to load in KakaoTalk.
- START DEMO or SPIN fails.
- SELECT/TAKE blocks gameplay.
- Auto Play freezes in a reveal state.
- SOUND ON/OFF state is confusing on iPhone KakaoTalk.
- Mobile layout has horizontal overflow.
- Any copy implies real-money value or external benefit.
