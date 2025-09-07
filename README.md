# Netlify – Protected /assets/* from zero

## Ce ai aici
- `public/` – singurul folder publicat (are doar un index simplu)
- `private_assets/` – fișierele reale (nu sunt publice)
- `netlify/functions/assets.js` – funcția CommonJS care cere parolă și servește fișierele
- `netlify.toml` – publish=public, redirect /assets/:name -> function, included_files pentru bundle

## Autentificare per fișier
Editează `CREDENTIALS` în `netlify/functions/assets.js`:
```js
const CREDENTIALS = {
  "test1.mp4": { user: "robert", pass: "1234", mime: "video/mp4" },
  // "anim1.gif": { user: "ana", pass: "1111", mime: "image/gif" },
};
```
Apoi adaugă fișierele noi în `private_assets/` cu exact același nume.

## Deploy (Import from Git – fără CLI)
1) Pune tot proiectul într-un repo (root conține `netlify.toml`, `public/`, `private_assets/`, `netlify/functions/`).
2) Netlify → Add new site → Import from Git → selectează repo-ul.
3) Build command: gol; Publish directory: `public`
4) După deploy, testează:
   - `https://<site>.netlify.app/assets/test1.mp4` → prompt Basic Auth (robert/1234) → descarcă.

Dacă nu cere parolă:
- Confirmă că **Publish directory** este `public`.
- Confirmă că **NU există** `public/assets/...` în repo.
- Confirmă că funcția `assets` apare în Netlify → Site → Functions.
- În Deploys → Trigger deploy → **Clear cache and deploy site**.