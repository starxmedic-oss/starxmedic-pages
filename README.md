# STARX MEDIC REBIRTH — clean build

Public static site, written from scratch. No backend, authentication, clinical records, old source imports, analytics, cookies, third-party fonts or package installation. No X/Y dependency.

## Review locally

From this directory: `python -m http.server 8765 --bind 127.0.0.1`.
Open http://127.0.0.1:8765/, /sana/, and /sana/demo/.
Use the server rather than opening HTML files directly: paths are absolute to the domain root.

## What exists

- `/`: corporate home.
- `/sana/`: one founding offer, S/79.90/month, up to five professionals, 15-day refund offer.
- `/sana/demo/`: memory-only simulation, three fictional professionals, different schedules, request list and pending state. No real bookings or messages.
- Common old URLs: neutral unavailable notices, without login or signup. Other unknown routes use `404.html`.
- `assets/config.js`: verified commercial WhatsApp number only. Empty deliberately until supplied. Missing configuration displays a truthful preview notice and dialog. Never publish with an empty number.

The commercial offer does not imply that this demo is an operational appointment system. Setup, payment collection, refund fulfillment and real delivery must be agreed with the customer. This build can support assisted selling; it cannot operate a real center or process payments.

## Preflight economic reasoning and red team

Result: a center understands the coordination problem, sees the flow, understands the one price, and can contact a seller. The critical assumption is willingness to pay for fewer repetitive scheduling messages. The cheapest proof is one qualified center agreeing to the founding offer after the demo, followed by paid assisted onboarding and a measured comparison of coordination time. A clear offer and live recipient are necessary; accounts, diagnosis, additional plans and an ecosystem are not.

Possible failure: scheduling need is weak, existing tools already suffice, no commercial recipient, or the promised service cannot be delivered. Scope was reduced to a reusable static site and an explicitly simulated reservation journey. No production service, savings percentage, customer logos or payment success is claimed. No backend is presented as connected.

## Publication status and safety

Not deployed. GitHub connector currently reports `push: false` for `starxmedic-oss/starxmedic-pages`. Existing main and production are unchanged. Previous verified public production main: `b8e2e297beb3a42f8218a230c1824a3928a680a9`.

The manual workflow packages only explicitly listed clean files; it excludes README, Git history and any unlisted historical files. It refuses deployment until the WhatsApp number is configured. GitHub Pages must use GitHub Actions as its source for this workflow. No workflow was run and no Pages settings were changed.

Before production, a write-authorized operator must import this clean source into an isolated branch of the existing repository without deleting its historical files, preserve the prior Pages configuration and successful deployment, and verify the actual commercial number. Review the resulting branch diff and preview. Only then configure Pages deployment to publish the clean artifact. The previous public system remains in its prior commit, not in the new artifact.

## Rollback

There is nothing to roll back locally or remotely from this mission: production was not changed. For a future deployment, record Pages source configuration first and retain the last successful legacy Pages artifact. Roll back by restoring that exact source configuration and redeploying the retained legacy artifact / original commit `b8e2e297beb3a42f8218a230c1824a3928a680a9` through the previously verified deployment method. Do not force-push or delete history. A concrete executable production rollback must be verified by the operator with Pages settings access before deploying; it is not claimed verified here.

## QA

Evidence is in the sibling `STARXMEDIC_REBIRTH_QA/` directory. Headless installed Edge exercised the demo, three schedules, duplicate prevention, text-safe rendering, missing selections, no persistence, internal links, legacy isolation, mobile 390/320px and JS errors. No dependencies installed. WhatsApp URL formatting was tested with a synthetic number without opening or messaging it; the actual commercial recipient remains unverified. New production HTTPS cannot be certified before deployment. Screenshots are preview evidence, not production evidence.
