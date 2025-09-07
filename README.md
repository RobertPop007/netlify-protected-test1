# DEBUG 401 build

Goal: Confirm that /assets/* rewrites to the Function and triggers a Basic Auth prompt.

## Steps
1) Import this repo into Netlify (Build command empty, Publish directory: public).
2) Open:
   - https://<site>.netlify.app/.netlify/functions/assets/test1.mp4  → Should show 401 (text body says "Debug: 401...").
   - https://<site>.netlify.app/assets/test1.mp4                    → Should ALSO 401 (same body) and show Basic Auth prompt.
3) If the second URL does NOT 401, your rewrite isn't active. Check publish dir, redirects tab, clear cache & redeploy.

Once confirmed, switch back to the real project that serves files after auth.