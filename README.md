# Portfolio – Sina Najafi

Static website: plain HTML, one CSS file, a tiny bit of JavaScript. No build step.
Open any `.html` file in a browser to see it.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page (German) |
| `projekte/frog.html` | Frog project page (German) |
| `en/index.html` | Home page (English) |
| `en/projects/frog.html` | Frog project page (English) |
| `impressum.html`, `datenschutz.html` | Legal pages – text still to come (`[TEXT FOLGT]`) |
| `assets/css/style.css` | All styles. Colors are variables at the top (`--ink`, `--accent` …) |
| `assets/js/main.js` | Mobile menu (open / close) |
| `assets/fonts/` | IBM Plex fonts, self-hosted (no Google requests) |
| `assets/img/` | Favicon and, later, the photos |
| `assets/cv/` | Put `Lebenslauf_Sina_Najafi.pdf` here |
| `PROJECT.md`, `design/reference/` | Brief and design spec – **do not upload** |

When you change text on a German page, change the same text on the English page too.

## Still open (placeholders)

Search the HTML files for `[` to find them:

- `[TEXT FOLGT]` – legal text for Impressum and Datenschutz
- Photos (see below)

## Adding a photo

1. Resize to max. 1600 px wide, save as optimized JPEG or WebP.
2. Put it in `assets/img/` with the expected name:

| File | Used on |
|---|---|
| `frog-front.jpg` | Home "Hauptprojekt" big image, Frog page big image |
| `sinolab-dashboard.png` | Home small image, Frog gallery |
| `frog-cad.jpg` | Home small image, Frog gallery |
| `frog-electronics.jpg` | Frog gallery |
| `cellcore.jpg`, `farmbot.jpg`, `fdm.jpg`, `incubator.jpg` | Project cards |

3. Replace the striped placeholder `<div class="placeholder …">[…]</div>` with an image, keeping the other classes. Example:

```html
<!-- before -->
<div class="placeholder feature__photo" role="img" aria-label="…">[FOTO: Pumpe im Gehäuse]</div>

<!-- after -->
<img class="feature__photo" src="assets/img/frog-front.jpg"
     alt="Frog-Pumpe im 3D-gedruckten Gehäuse mit Display" loading="lazy">
```

Paths: from `projekte/` and `en/` start with `../`, from `en/projects/` with `../../`.
If a project card has no photo, delete the whole placeholder `<div>` of that card.

## Uploading to the web host

Upload these, keeping the folders as they are:

```
index.html  impressum.html  datenschutz.html
projekte/   en/   assets/
```

Do not upload `design/`, `PROJECT.md` or `README.md`.

Once the final domain is known, the `hreflang` links in the `<head>` of each page can be changed to full
addresses (e.g. `https://example.com/en/index.html`), and an `og:image` preview picture can be added.
