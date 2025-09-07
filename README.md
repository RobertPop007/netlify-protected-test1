# Netlify – Protected /assets/* (final)

## Ce face
- URL public curat: `/assets/<fisier>`
- Basic Auth per fișier
- Fișierele reale sunt în `private_assets/` și sunt incluse în bundle (nu publice)
- Import from Git (fără CLI), build command gol, publish=`public`

## Cum adaugi fișiere noi
1) Copiază fișierul în `private_assets/` (ex. `anim1.gif`).  
2) Deschide `netlify/functions/assets.js` și adaugă în `CREDENTIALS`:
   ```js
   "anim1.gif": { user: "ana", pass: "1111", mime: "image/gif" }
   ```
3) Commit & push → Netlify redeploy → gata.  
4) URL: `https://<site>.netlify.app/assets/anim1.gif`

## Deploy
1) Pune tot proiectul într-un repo.  
2) Netlify → Add new site → Import from Git.  
3) Setează:
   - Build command: (gol)
   - Publish directory: `public`
4) Testează:
   - `https://<site>.netlify.app/.netlify/functions/assets/test1.mp4` → 401 prompt
   - `https://<site>.netlify.app/assets/test1.mp4` → 401 prompt → login (robert/1234) → download

## Notă
- `force = true` în redirect asigură că toată calea `/assets/*` ajunge la funcție, chiar dacă ar exista un static cu același path.
- Evită să creezi vreodată `public/assets/`.