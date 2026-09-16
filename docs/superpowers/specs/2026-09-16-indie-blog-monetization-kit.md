# Indie blog monetization kit — 2026-09-16

## Goal
Make PixelPitch production-ready for monetization and blogging: AdSense-ready inventory behind consent, legal trust pages, analytics, SEO schema, newsletter capture, share/author UX.

## Shipped
- Cookie consent (`pp_consent`) gating ads + analytics
- AdSlot live AdSense mode via `NEXT_PUBLIC_ADSENSE_*` env vars; placeholders otherwise
- Mid-article ad insertion in MDX body
- Privacy, Terms, Disclosure pages + footer links + RSS
- WebSite / Organization / Article / Breadcrumb JSON-LD
- GA4 and/or Plausible after consent
- Newsletter `POST /api/newsletter` (Buttondown or Formspree)
- Share buttons + author box + affiliate disclosure note on articles
- `.env.example` for go-live configuration

## Go-live checklist
1. Copy `.env.example` → `.env.local` and fill AdSense client + slot IDs
2. Add GA4 and/or Plausible domain
3. Add `BUTTONDOWN_API_KEY` or `FORMSPREE_NEWSLETTER_ID`
4. Set social URLs and contact email
5. Submit sitemap in Search Console after deploy
