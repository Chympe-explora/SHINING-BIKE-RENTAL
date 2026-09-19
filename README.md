# Shining Bike Rental — Bike & Scooter Rental (Static Site)

A fully static website (no backend). Host it anywhere that serves static files
(GitHub Pages, Netlify, Cloudflare Pages, any web host).

## What visitors see
- **Home** — hero, one card per vehicle (photos, description, 6/12/24 hour prices,
  deposit, **Rent Now**), how renting works, and the footer/contact block.
- **Rental Terms** — the full terms and refund policy (footer link / menu).
- **Rent Now** is the only thing that opens the rental form. It has 4 steps
  (schedule → your details → terms → confirm) and finishes by opening WhatsApp
  with the request prefilled, sent to `whatsappNumber` in `config.js`.

## Editing the site
Everything lives in **`config.js`**:
- `siteName` / `siteSub`, `hero`, `nav`, `footer`
- `window.KC_PRICES.vehicleRental.vehicles` — prices and deposit per vehicle
- `window.KC_CONTENT.vehicleRental.vehicles` — name, description, badge and
  `images: ["photo1.jpg", "photo2.jpg"]` (put the photo files in this folder)
  for each vehicle; optional `details` (extra paragraph) and `features` (bullets)
- `rentalPolicy` — the terms (shown in the rental form and on the Rental Terms page)
- `whatsappNumber`, `instagram`

To add a vehicle, add an entry in **both** places above using the same `id`.

Older blocks lower down in `config.js` (packages, gallery, cave/story content,
camping prices, payment) are leftovers from the previous site and are not shown.
