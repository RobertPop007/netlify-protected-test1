# Netlify – Protected /assets/* (Function-backed)

## Ce face acest proiect
- Public URL: **/assets/&lt;fisier&gt;**
- Redirectează către o Function care cere **Basic Auth** și apoi descarcă fișierul.
- Fișierele reale sunt în **/private_assets** (NU sunt publicate direct). Sunt împachetate cu funcția via `included_files`.

## Structură
.
├─ netlify.toml                # publish=public; redirects /assets/* -> function
├─ public/
│  └─ index.html               # folder public (static), nu conține /assets
├─ private_assets/
│  └─ test1.mp4                # fișiere protejate (bundle cu funcția)
└─ netlify/
   └─ functions/
      └─ assets.js             # handler CommonJS, Basic Auth per fișier

## Config autentificare per fișier
Editează în `netlify/functions/assets.js` obiectul `CREDENTIALS`:
```js
const CREDENTIALS = {
  "test1.mp4": { user: "robert", pass: "1234", mime: "video/mp4" },
  "anim1.gif": { user: "ana", pass: "1111", mime: "image/gif" },
};
```
Poți adăuga oricâte fișiere/gif-uri și parole distincte.

## De ce URL-ul e /assets/<fisier> dacă fișierele nu sunt în /public/assets
- /assets/** este doar **ruta publică**. Redirectul definit în `netlify.toml` trimite cererea către funcție.
- Fișierele stau în **/private_assets** ca să nu fie servite static. Astfel, **toate** cererile la /assets/* trec prin funcție și sunt protejate.

## Deploy din Git (recomandat)
1) Pune tot proiectul într-un repo.
2) Netlify → Add new site → Import from Git → selectează repo-ul.
3) Build command: (gol), Publish directory: `public`
4) După deploy, testează `https://<site>.netlify.app/assets/test1.mp4`:
   - cere user/parolă (robert/1234)
   - descarcă fișierul

## Adăugare GIF-uri/MP4 noi
1) Copiază fișierul în `/private_assets` (ex. `anim1.gif`).
2) Adaugă intrarea în `CREDENTIALS` (user, parolă, mime).
3) Commit & push → Netlify redeploy → gata.