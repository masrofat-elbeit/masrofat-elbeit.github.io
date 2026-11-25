# مصروفات البيت (personal household expenses app)

The owner is not a developer. Reply in Egyptian Arabic, in plain language.
This is the owner's **personal** project. It has nothing to do with Consultancy Group work: never put it on the company site, the company's Firebase or the company's Google Cloud project.

Read `HANDOVER.md` first. It has the full status, the data model, the Google Drive saving design, and what is left to do.

## Essentials
- Single file app: `index.html` (+ `manifest.webmanifest`, `sw.js`, icons, `logo.png`, `qr.png`, `privacy.html`). There is no build step.
- Live at https://masrofat-elbeit.github.io via GitHub Pages from `main` (GitHub organization `masrofat-elbeit`, so the owner's name is not in the address). The owner expects every change to be committed and pushed to `main`.
- It moved here on 25 Nov 2026 from https://ahmed-elbaz84.github.io (repo `ahmed-elbaz84/ahmed-elbaz84.github.io`). The old address now only shows a "moved" card that carries each user's numbers over in the link (`#move=`), and sends new visitors here. That repo also holds the CIB dollar-rate bot (`rate.json`), which this app reads from raw.githubusercontent.com, and the separate Super Clean app.
- Bump `CACHE` in `sw.js` on every change so phones pick up the new version.
- Never change the localStorage key `masrofat_elbeit_app_v1` or the data shape without a migration. Real user data lives there.
- Each user's numbers stay on their phone and, if they choose, in their own Google Drive (`drive.file` scope, one file). The owner must never be able to read users' data. Keep it that way.
- Test over http://localhost with Playwright at phone size, with Google mocked. Don't link real Google accounts while testing.
