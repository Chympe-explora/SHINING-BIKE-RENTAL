/* ============================================================
   live-content.js — applies whatever the Admin Dashboard has
   published (site-data.json) on top of the built-in defaults in
   config.js, BEFORE app.js renders the page.

   Load order matters:
     config.js  →  live-content.js  →  background-system.js  →  app.js

   How it works
   ------------
   • admin.html saves your edits to site-data.json (in this same folder,
     on your website's host). Every visitor loads that file, so every
     visitor sees your changes.
   • If site-data.json is missing or broken, the site quietly falls back
     to config.js — it can never make the page blank.
   • Objects are merged field-by-field; lists (vehicles, menu items,
     terms sections, photos…) are replaced as a whole, so deleting a
     vehicle or a photo in the dashboard really removes it.
   ============================================================ */
(function () {
  "use strict";

  var DATA_URL = "site-data.json";

  function isObj(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function deepMerge(base, over) {
    if (over === undefined || over === null) return base;
    if (Array.isArray(over)) return clone(over);
    if (!isObj(over)) return over;
    var out = {};
    if (isObj(base)) { for (var k in base) out[k] = base[k]; }
    for (var k2 in over) out[k2] = deepMerge(out[k2], over[k2]);
    return out;
  }

  // Synchronous on purpose: this file is tiny and same-origin, and it must
  // finish before app.js reads window.KC_CONTENT a moment later. The
  // "?v=" part changes every minute so a fresh publish is picked up quickly
  // instead of being stuck in a browser/CDN cache.
  function load() {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", DATA_URL + "?v=" + Math.floor(Date.now() / 60000), false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300 && xhr.responseText) {
        var data = JSON.parse(xhr.responseText);
        return isObj(data) ? data : null;
      }
    } catch (e) { /* file missing / offline / bad JSON — use config.js as-is */ }
    return null;
  }

  var data = load();
  window.KC_SITE_DATA = data || null;

  if (data && isObj(data.content) && window.KC_CONTENT) {
    var content = data.content;
    window.KC_CONTENT = deepMerge(window.KC_CONTENT, content);

    // Prices live inside each vehicle in the dashboard; app.js reads them
    // from window.KC_PRICES.vehicleRental.vehicles[id], so build that map.
    var list = content.vehicleRental && content.vehicleRental.vehicles;
    if (Array.isArray(list)) {
      window.KC_PRICES = window.KC_PRICES || {};
      window.KC_PRICES.vehicleRental = window.KC_PRICES.vehicleRental || {};
      var previous = window.KC_PRICES.vehicleRental.vehicles || {};
      var map = {};
      list.forEach(function (v) {
        if (!v || !v.id) return;
        if (isObj(v.prices)) {
          map[v.id] = {
            "6": Number(v.prices["6"]) || 0,
            "12": Number(v.prices["12"]) || 0,
            "24": Number(v.prices["24"]) || 0,
            deposit: Number(v.prices.deposit) || 0
          };
        } else if (previous[v.id]) {
          map[v.id] = previous[v.id];
        }
      });
      window.KC_PRICES.vehicleRental.vehicles = map;
    }
  }

  // ---- Announcement strip (admin dashboard → Announcements) ----
  document.addEventListener("DOMContentLoaded", function () {
    var a = window.KC_CONTENT && window.KC_CONTENT.announcement;
    if (!a || !(a.enabled === true || a.enabled === "true") || !a.text) return;
    var bar = document.createElement("div");
    bar.id = "kc-announcement";
    bar.setAttribute("role", "status");
    bar.style.cssText =
      "position:relative;z-index:30;background:#2E8B57;color:#fff;padding:9px 14px;" +
      "text-align:center;font:600 13px/1.45 system-ui,-apple-system,'Segoe UI',sans-serif;";
    bar.textContent = a.text;
    document.body.insertBefore(bar, document.body.firstChild);
  });
})();
