# NFT Group — Sentez Master Prompt

Kaynaklar sentezlendi:
- [Motionsites.ai](https://motionsites.ai/) prompt formatı
- `AI_3D_Animated_Websites_Workflow` (6 aşamalı üretim sistemi)
- Referans site **art-title** (tipografi + atmosferik katman + blur text) — https://art-title-qfdl.vercel.app/
- Referans site **SynapseX** (scroll-scrub video, spring parallax, progressive blur)

Aşağıdaki ``` bloğunu Cursor / Claude’a yapıştır.

---

```
BUILD: Premium cinematic corporate website for NFT Group (Gemi İnşa & Mühendislik, Altınova/Yalova). Dark industrial studio look with Motionsites-level polish. Synthesize motion language from two references — do NOT copy their consumer/AI aesthetics literally:
  REF A "art-title": editorial giant typography, atmospheric layered background, BlurText-style headline reveal, slow theme-quality transitions (~1200ms), sparse header.
  REF B "SynapseX": scroll-scrubbed background video (desktop), useSpring inertia on scroll transforms, progressive bottom blur veil, spring ScrollReveal (stiffness ~80, damping ~18), cinematic title parallax (subtle translateY / slight perspective — dialed DOWN for corporate).

GOAL FEEL: expensive shipyard brand — steel, sea mist, launch-day light — not wellness app, not neural-AI SaaS, not day/night nature toggle, not glassmorphism candy.

STACK: Existing nft-group codebase — Next.js App Router + TypeScript + Tailwind + Framer Motion (motion/react) + next-intl (tr/en). Edit marketing components; keep i18n keys, inquiry form, admin routes.

BRAND LOCK:
- bg #000000 · surfaces #141412 / #1f1f1c · text #fff / muted #a1a1a1
- accent peach→coral: #fa9a63 → #ff6464 · highlight #ffd7a8
- fonts: font-display (headlines), font-stencil (labels), body sans
- radius tight (~0.25rem) — industrial edges, not soft consumer pills everywhere
- NO purple/indigo, NO cream-terracotta newspaper look, NO multi-layer shadow stacks, NO mouse-follow spotlight gimmicks

════════════════════════════════════
PRODUCTION WORKFLOW (adapt from AI 3D Animated Websites Workflow)
════════════════════════════════════
Run these stages for the visual backbone before / while coding:

01 IDEAS: Use existing NFT Group field photos/video in /Assets and public/images/real as the reference — shipyard launch, steel, dock. Screenshot current hero if needed.
02 VISUAL (optional): If generating a clean plate: "Recreate this shipyard scene, remove all text/UI, keep realistic industrial photography style, 16:9". Prefer REAL photos over AI when available.
03 VIDEO: Turn a strong still OR use existing field MP4 into a seamless loop — subtle ambient drift / slow zoom only (Kling/Seedance style). Export MP4. Motionsites energy via video motion, not 3D toys.
04 ASSEMBLY: Wire video/image into Next.js hero as full-bleed background.
05 POLISH: Add SynapseX-style scroll inertia parallax + art-title-style typographic reveal; fix mobile; swap to brand fonts.
06 DEPLOY: Vercel (later) — out of scope for this prompt unless asked.

════════════════════════════════════
MOTION DNA TO STEAL (translate, don’t clone)
════════════════════════════════════
FROM ART-TITLE:
- Hero type can be large, tight tracking, high impact — but brand “NFT GROUP” remains the hero-level signal; headline must not erase the brand.
- Blur-to-sharp text entrance (blurIntensity modest, ~4–8px → 0) for the main headline once on load.
- Atmospheric background as its own layer under content (z behind).
- Long, elegant color/opacity transitions where theme-like shifts happen (we stay permanently dark — no day/night switch).

FROM SYNAPSEX:
- Desktop: background video scrubbed by scroll progress with smooth LERP (~0.15) OR autoplay muted loop if scrub is too heavy — pick one, document choice. Mobile: autoplay loop, NO scrub.
- useScroll + useSpring(scrollY, { stiffness: 15–40, damping: 28–36, mass: ~1.5–1.8 }) for cinematic inertia.
- Hero content parallax: translateY up to ~60–100px over first 800–1000px scroll (LESS aggressive than SynapseX’s rotateX(15deg) — use max rotateX 0–4deg OR none; corporate restraint).
- ProgressiveBlur / gradient veil at bottom of viewport for readability into next section.
- ScrollReveal sections: opacity 0→1, y 24–40→0, scale 0.98→1, spring once, viewport margin ~-10%.
- Optional ScrambleText ONLY on primary CTA hover — subtle, not on every label.

PREFERS-REDUCED-MOTION: disable scrub, parallax, blur text; show static poster image.

════════════════════════════════════
HOME — SECTION BY SECTION
════════════════════════════════════

01 HERO (full-bleed, min-h-screen)
MUST:
- Dominant edge-to-edge media: looping shipyard MP4 (preferred) OR hero-launch.jpg with scroll parallax scale 1→1.06–1.08.
- Dark bottom-heavy veil (from-black via-black/80 to-black/30) + optional warm radial glow (gold tokens, opacity ≤0.35).
- First viewport ONLY: brand + one headline + one short support line + CTA group + media. No stats, chips, badges, address, or stickers on the image.
- Brand-first: “NFT GROUP” readable as hero signal (stencil/eyebrow ok if not a pill cluster — prefer single clean brand lockup).
- Load: staggered fade/blur reveal ≤3 motions (brand → title → CTA).
- SynapseX parallax on media + mild content Y; art-title blur reveal on title.

MUST NOT: floating cards, inset hero media, day/night toggle, nature audio, glass menu candy from references.

02 SERVICES (“Çalıştığımız Alanlar”)
- One job, one headline, short support.
- 4 equal columns desktop / stack mobile: field photo bg, dark gradient, title, 1–2 lines, Detayları Gör.
- Hairline grid divides > shadow cards.
- ScrollReveal springs; hover photo opacity/scale ≤1.05.

03 CINEMATIC FIELD STRIP (new — premium moment)
- Full-bleed real saha photo/video between services and about.
- Background parallax slower than page; minimal or no overlay text.
- This is the Motionsites “wow” without gimmicks.

04 ABOUT TEASER
- Mission/vision teaser + link to Hakkımızda.
- Optional sticky copy / scrolling imagery (desktop).
- Max 4 capability labels — not a dashboard.

05 CTA
- Single ask → /iletisim. Accent button. Optional scramble on hover.

════════════════════════════════════
INNER PAGES
════════════════════════════════════
Hizmetler (+4 details from PDF content), Projeler gallery by category, Hakkımızda, İletişim inquiry form (project_type: tersane_gemi_insa | tersane_tamir | altyapi_ve_celik_insa | insaat_sektoru). Same motion language, lighter intensity than home.

════════════════════════════════════
LAYOUT HARD RULES
════════════════════════════════════
- One composition per first viewport — not a dashboard.
- Full-bleed hero default.
- One job per section.
- Real shipyard/steel photography as visual anchor; gradients = atmosphere only.
- Mobile: stack cleanly; dial parallax/scrub down or off.
- Performance: transform/opacity only; poster image for video; priority on LCP; no Three.js unless already present.

════════════════════════════════════
OUTPUT
════════════════════════════════════
Implement in existing nft-group (Hero, ServicesSection, AboutTeaser, CtaBanner + new FieldStrip). Add video asset path under public/ if needed. Update tr/en messages only when copy changes. Result must feel like Motionsites cinematic quality filtered through SynapseX scroll craft and art-title typographic calm — for a Turkish shipbuilding & engineering firm.
```

---

## Kısa özet (ne aldık Drive’dan?)

| Dosya | Ne |
|--------|-----|
| **Workflow PDF** | 6 adım: referans → görsel → video loop → AI builder → polish (parallax) → deploy |
| **art-title.zip** | Dev tipografi, blur text, atmosferik arka plan katmanı |
| **synapsex.zip** | Scroll’a bağlı video, spring parallax, progressive blur |
| **instruction.rtf** | Zip’i aç → `npm install` → `npm run dev` → AI ile refine |

## Senin için önerilen sıra

1. Bu prompt’u Cursor’a ver → mevcut `nft-group` üzerine uygula  
2. Assets’ten bir saha videosu seç (veya Workflow Step 03 ile loop üret)  
3. Hero’ya SynapseX tarzı scroll motion bağla (koyu tema + marka rengi koru)

İstersen bir sonraki mesajda doğrudan bu prompt’u koda uygulamaya başlayabilirim.
