# DJ Song Requests

Guests scan a QR code → request a song → it pops up live on the DJ's screen.

- `index.html` — guest request page (this is where the QR code points)
- `dj.html` — live DJ screen (PIN protected)
- `config.js` — the only file you edit
- `database.rules.json` — security rules to paste into Firebase

---

## Step 1 — Firebase (the free database), ~10 min

1. Go to https://console.firebase.google.com and sign in with a Google account.
2. **Create a project** → any name (e.g. `dj-requests`) → you can turn Google Analytics off → Create.
3. Left menu: **Build → Realtime Database → Create database**.
   - Location: pick the closest one (e.g. United States).
   - Start in **locked mode** → Enable.
4. Open the **Rules** tab, delete everything, paste the contents of `database.rules.json`, click **Publish**.
5. Click the ⚙️ gear → **Project settings** → scroll to **Your apps** → click the **`</>`** (Web) icon.
   - Nickname: anything → **Register app** (skip Firebase Hosting).
   - Copy the `firebaseConfig = { ... }` values it shows.
6. Paste them into `config.js`. Check that `databaseURL` is there. If it's missing, copy it from the top of the Realtime Database page (it looks like `https://xxxx-default-rtdb.firebaseio.com`).
7. While in `config.js`, set `DJ_NAME`, change `DJ_PIN`, and set `TIP_EMAIL` for e-Transfer tips (or `""` to hide the tip box).

## Step 2 — GitHub repo + Pages, ~5 min

1. Create a free account at https://github.com if you don't have one.
2. Top-right **+** → **New repository**.
   - Name: `dj-requests` (or anything).
   - Set it to **Public** (free GitHub Pages needs a public repo).
   - Click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
   - Drag in all the files: `index.html`, `dj.html`, `config.js`, `database.rules.json`, `README.md`.
   - Click **Commit changes**.
4. Go to **Settings → Pages**.
   - Under *Build and deployment*, set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)** → **Save**.
5. Wait 1–2 minutes and refresh. The URL will show at the top:
   `https://YOUR-USERNAME.github.io/dj-requests/`

- **Guest page:** `https://YOUR-USERNAME.github.io/dj-requests/`
- **DJ screen:** `https://YOUR-USERNAME.github.io/dj-requests/dj.html`

To change settings later: open `config.js` on GitHub → ✏️ pencil icon → edit → **Commit changes**. The site updates in about a minute.

## Step 3 — QR code

Paste the guest page URL into any free QR generator. QR codes for a plain URL never expire. Print it big, or put it on a screen near the booth.

## Using it at the gig

- Open `dj.html` on a laptop or tablet → enter the PIN. The screen stays awake on supported browsers.
- New requests flash in at the top. If the same song is requested more than once, it's grouped with a **×3** badge and the requesters' names.
- **✓ Played** or **Skip** moves a request to the *Played / skipped* tab. **↩ Back to queue** undoes it.
- The green dot means it's connected live.
- Guests get a cooldown between requests (`COOLDOWN_SECONDS` in `config.js`).

**Start fresh for a new event:** in the Firebase console → Realtime Database → hover over `requests` → click 🗑️.

## Good to know

- The PIN is a light lock that keeps guests off the DJ screen. It isn't real security, because anyone who reads the page code could find it. The database rules stop people from deleting requests or editing what was asked.
- The Firebase "API key" being visible in `config.js` is normal for Firebase web apps. The rules are what protect the data.
- The free Firebase tier (Spark plan) handles thousands of requests a night.
