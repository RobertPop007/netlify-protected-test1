# Netlify Git Deploy – Protected download (test1.mp4)

- Path: `/download/test1.mp4`
- Auth: **robert / 1234**
- Zero build step; functions enabled via `netlify.toml`.

## Repo structure
.
├─ netlify.toml
├─ index.html
├─ assets/
│  └─ test1.mp4
└─ netlify/
   └─ functions/
      └─ download.js

## Import from Git (no CLI needed)
1) Push acest folder într-un repo (GitHub/GitLab/Bitbucket).
2) Netlify → Add new site → Import from Git → selectează repo-ul.
3) Build command: (leave empty)
   Publish directory: `.`
4) Deploy → Testează:
   https://<site>.netlify.app/download/test1.mp4
   - cere user/parolă (robert / 1234)
   - descarcă fișierul

Dacă vezi 404:
- Verifică în Netlify → Site → Functions că `download` e listată.
- În "Site settings → Build & deploy → Environment" nu e nevoie de variabile pentru această variantă.
- Asigură-te că `netlify.toml` este în root și e exact ca aici.