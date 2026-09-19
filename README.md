# Shining Bike Rental — Bike & Scooter Rental (Static Site)

A fully static website (no server). Host it anywhere that serves static files
(GitHub Pages, Netlify, Cloudflare Pages, any web host).

## What visitors see
- **Home** — hero, a separate **Find your ride** search section, one card per vehicle (photo slider, description,
  6/12/24 hour prices, deposit, **Rent Now**), and the footer/contact block.
- **Rental Terms** — the full terms and refund policy (footer link / menu).
- **Rent Now** opens a 4-step form (schedule → your details → terms → confirm) and
  finishes by opening WhatsApp with the request prefilled.

## Editing the site — the Admin Dashboard (`/admin.html`)
The dashboard uses the same look as the website (photo background, glass panels, green pill buttons).
Open `https://your-site/admin.html`. Everything visitors can read or see is editable:

| Tab | What you can change |
|---|---|
| Vehicles | add / edit / reorder / hide / delete vehicles; name, tag, description, highlights, prices, deposit; **any number of photos per vehicle** (first = cover) |
| Home page | site name, logo, headline, paragraph, buttons, background video + picture, darkness, vehicle-section wording, search wording |
| Menu & footer | menu links, WhatsApp number, Instagram, footer text |
| Rental form | every label / button / message inside the Rent Now window and the WhatsApp message |
| Rental terms | the terms sections (paragraphs and bullet lists), Terms page text, cancellation box |
| Notices | pop-up notice and top announcement bar |
| Publish | send changes live, GitHub connection, manual download, undo |

Photos are resized automatically (max 1600 px) before upload. Edits are auto-saved
as a draft in your browser, so nothing is lost if you close the tab.

### Publishing (one-time setup)
Press **Publish** and the dashboard commits `site-data.json` (plus any new photos in
`uploads/`) to your GitHub repository; GitHub Pages then updates the live site
(about a minute). Every visitor sees it.

1. GitHub → Settings → Developer settings → **Fine-grained tokens** → Generate new token.
2. Repository access: *Only select repositories* → your website repository.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. In the dashboard → **Publish** tab → enter `your-username/your-repository`, paste the
   token, press **Save & test connection**. It finds the website folder for you.

The token is stored only in the browser you paste it into. Without it, nobody can change
the live site. (The old password screen was removed — it could not protect anything.)

Not on GitHub Pages? Use **Download update (.zip)** on the Publish tab, unzip it into
your website folder and overwrite `site-data.json`.

### How it fits together
- `config.js` — the built-in defaults (used if `site-data.json` is empty or missing).
- `site-data.json` — everything published from the dashboard; merged on top of `config.js`
  for every visitor by `live-content.js`.
- `uploads/` — photos/videos added from the dashboard.
- Not editable from the dashboard (edit the files): browser-tab title, favicon and
  share-preview image in `index.html`, and the brand green colour.

### Removed / changed in this version
- "How Renting Works" section removed.
- `live-content.js` no longer contacts the old Telegram/Cloudflare backend for content.
  (`booking-bridge.js` and `consent.js` are unchanged.)
- `editor.js` (old per-device pencil editor) is no longer loaded — it only ever changed
  the page on the device where it was used.
- The old dashboard's Bookings / Visitors tabs are gone: they only counted things in the
  admin's own browser. Rental requests arrive in your WhatsApp.
