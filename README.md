# NEON HUNTER SPIN

NEON HUNTER SPIN is a lightweight, web-based 2.5D mobile social slot demo built with HTML, CSS, and vanilla JavaScript.

This project is designed for limited demo testing on static hosting such as Netlify and for safe Telegram link sharing.

## Compliance Notice

Demo Only - No real-money wagering, payout, prize, gift card, or cryptocurrency reward.

All credits are virtual test points with no cash value.

This project does not include:

- Payment integration
- Payout systems
- Gift card rewards
- Cryptocurrency rewards
- NFT rewards
- Wallet systems
- User-to-user transfers
- Gambling APIs

## Tech Stack

- `index.html`
- `styles.css`
- `script.js`
- Static assets under `assets/`
- No React, Vue, Three.js, Unity, or external game engine
- No build step required

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── simulate_rtp.js
├── assets/
│   ├── share/
│   │   ├── telegram-preview.png
│   │   └── telegram-preview.svg
│   └── symbols/
└── README.md
```

## Local Preview

Because this is a static app, you can open `index.html` directly in a browser.

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
3. Confirm the message: `Virtual demo credits loaded`.
4. Press **SPIN**.
5. Use **DROP** only as an additional virtual test credit input.
6. Use **CLEAR** to reset virtual credits.

## Pre-Release Checklist

Before sharing a Netlify URL in Telegram, check:

- The page loads without console errors.
- The footer notice is visible on mobile.
- The START DEMO button loads 10,000 virtual credits.
- SPIN works.
- DROP works with virtual demo credits.
- Free game and bonus logic still run.
- Symbol images load without broken paths.
- Telegram preview metadata points to `assets/share/telegram-preview.png`.
- iPhone Safari and Android Chrome do not show horizontal overflow.

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

## Suggested Branch Name

```text
codex/netlify-readme
```

## Suggested Commit Message

```text
docs: add netlify deployment readme
```
