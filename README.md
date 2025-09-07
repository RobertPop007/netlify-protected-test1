# Netlify – Protected Download (test1.mp4)

- URL final (după deploy): `https://<site>.netlify.app/download/test1.mp4`
- Autentificare: **robert / 1234**
- Forțează descărcarea prin `Content-Disposition: attachment`.

## Structură
- `netlify.toml` – definește ruta `/download/:name` către funcția `download`
- `netlify/functions/download.js` – verifică Basic Auth și trimite fișierul
- `assets/test1.mp4` – fișierul tău video (inclus aici)

## Deploy
1. Intră în Netlify → **Add new site → Deploy manually**.
2. Trage-și-plasează **întregul folder** al acestui proiect.
3. După deploy, verifică: `https://<site>.netlify.app/download/test1.mp4`
   - Browserul va cere user/parolă.
   - Dacă introduci `robert` / `1234`, începe **descărcarea**.

> Pentru testare curată, folosește modul incognito (browserul memorează autentificarea).