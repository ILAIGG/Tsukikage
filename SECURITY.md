# Security policy

Report suspected vulnerabilities privately through [GitHub vulnerability reporting](https://github.com/ILAIGG/Tsukikage/security/advisories/new). If private reporting is unavailable, open a public issue requesting a private contact without exploit details or personal data. Never include manuscripts, credentials or user backups in public reports.

## Public beta scope

The supported beta is the latest published version with local browser storage and cloud configuration absent. This is a source review and automated validation, not an independent penetration test or security certification.

- React escapes ordinary text. DOMPurify sanitizes rich text before rendering/export, removes active markup, inline styles and embedded media. Portrait uploads accept raster files and resize them locally.
- Vercel configuration blocks framing, MIME sniffing, inline scripts and remote application connections. Inline styles remain allowed for themes; Google Fonts is allowed. Confirm headers on the final domain. Other hosts need equivalent configuration.
- The production Service Worker precaches generated chunks and uses a build-specific cache. It deletes only caches with its own scope prefix; it does not cache cloud API responses.
- Local browser storage and downloaded backups are not encrypted by the app. Shared devices, malicious extensions and compromised browser profiles are outside this protection.
- JSON backup import is a local recovery feature, not a sandbox for arbitrary untrusted files. Keep your own backup before importing and do not import files from unknown sources.
- Optional Supabase code and owner-scoped RLS exist but production cloud validation, remote deletion and conflict resolution remain deferred. Do not enable cloud credentials for this beta. Never expose a service-role key or any secret in `VITE_*` variables.

Run `npm audit`, `npm test`, `npm run build`, and `npm run test:beta` before releases. Browser tests need Chromium. A clean dependency audit only means no vulnerabilities currently reported by that advisory database; it does not establish that the app has no vulnerabilities.
