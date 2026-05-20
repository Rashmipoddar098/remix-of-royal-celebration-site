import { couple } from "@/data/wedding";
import phereImg from "@/assets/bride-groom-phere.jpg";
import phereVideo from "@/assets/bride-groom-phere-v3.mp4.asset.json";

export function InvitationReveal() {
  return (
    <section
      id="invitation"
      className="relative flex w-full flex-1 flex-col items-center overflow-hidden px-4 py-4 sm:py-8"
    >
      {/* Layer 1 — Dense paisley/mandala SVG tile (subtle base texture) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><g fill='none' stroke='%237a4a14' stroke-width='0.7'><circle cx='80' cy='80' r='38'/><circle cx='80' cy='80' r='26'/><circle cx='80' cy='80' r='14'/><circle cx='80' cy='80' r='4' fill='%23a8731f'/><path d='M80 42 Q96 80 80 118 Q64 80 80 42 Z'/><path d='M42 80 Q80 96 118 80 Q80 64 42 80 Z'/><path d='M55 55 Q80 70 105 55 Q90 80 105 105 Q80 90 55 105 Q70 80 55 55 Z' stroke-width='0.5' opacity='0.7'/><circle cx='80' cy='8' r='2' fill='%23a8731f'/><circle cx='80' cy='152' r='2' fill='%23a8731f'/><circle cx='8' cy='80' r='2' fill='%23a8731f'/><circle cx='152' cy='80' r='2' fill='%23a8731f'/></g></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Layer 2 — Giant rotating central mandala */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.10] animate-spin-slow"
      >
        <defs>
          <radialGradient id="invMandalaG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.58 0.14 65)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.34 0.13 25)" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <g stroke="url(#invMandalaG)" strokeWidth="0.9" fill="none">
          {[60, 110, 160, 210, 260].map((r) => (
            <circle key={r} cx="300" cy="300" r={r} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${(i * 360) / 24} 300 300)`}>
              <path d="M300 60 Q312 180 300 300 Q288 180 300 60 Z" fill="url(#invMandalaG)" fillOpacity="0.12" />
              <line x1="300" y1="60" x2="300" y2="540" strokeOpacity="0.4" />
            </g>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`p-${i}`} transform={`rotate(${(i * 360) / 12 + 15} 300 300)`}>
              <circle cx="300" cy="120" r="6" fill="url(#invMandalaG)" fillOpacity="0.4" />
            </g>
          ))}
        </g>
      </svg>

      {/* Layer 3 — Counter-rotating outer mandala ring */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[170vmin] w-[170vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] animate-spin-reverse"
      >
        <g stroke="oklch(0.58 0.14 65)" strokeWidth="0.6" fill="none">
          {Array.from({ length: 36 }).map((_, i) => (
            <g key={i} transform={`rotate(${(i * 360) / 36} 300 300)`}>
              <line x1="300" y1="80" x2="300" y2="520" strokeOpacity="0.5" />
              <circle cx="300" cy="100" r="4" fill="oklch(0.74 0.13 78)" fillOpacity="0.5" />
            </g>
          ))}
          <circle cx="300" cy="300" r="220" />
          <circle cx="300" cy="300" r="160" />
        </g>
      </svg>

      {/* Layer 4 — Side temple-arch silhouettes (depth & framing) */}
      <svg
        aria-hidden
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-20 opacity-30 sm:block md:w-28 lg:w-36"
      >
        <defs>
          <linearGradient id="archL" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.58 0.14 65)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="oklch(0.58 0.14 65)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0 L100 0 L100 60 Q50 80 0 60 Z M0 100 L100 100 L100 160 Q50 180 0 160 Z M0 200 L100 200 L100 260 Q50 280 0 260 Z M0 300 L100 300 L100 360 Q50 380 0 360 Z" fill="url(#archL)" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 opacity-30 sm:block md:w-28 lg:w-36"
        style={{ transform: "scaleX(-1)" }}
      >
        <path d="M0 0 L100 0 L100 60 Q50 80 0 60 Z M0 100 L100 100 L100 160 Q50 180 0 160 Z M0 200 L100 200 L100 260 Q50 280 0 260 Z M0 300 L100 300 L100 360 Q50 380 0 360 Z" fill="url(#archL)" />
      </svg>

      {/* Layer 5 — Top & bottom ornate gold double borders */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-deep to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1.5 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />


      {/* Layer 6 — Ambient color glows (smaller on mobile to avoid blob effect) */}
      <div aria-hidden className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl animate-glow-pulse lg:-left-32 lg:h-80 lg:w-80" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-10 h-40 w-40 rounded-full bg-vermilion/20 blur-3xl animate-glow-pulse lg:-right-32 lg:h-96 lg:w-96" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-kesar/10 blur-3xl lg:h-[28rem] lg:w-[28rem]" />

      {/* Layer 7 — Floating paisley motifs */}
      <svg aria-hidden className="pointer-events-none absolute left-3 top-16 h-14 w-14 text-gold-deep/40 animate-float-soft sm:left-6 sm:h-20 sm:w-20 lg:h-24 lg:w-24" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 Q52 25 30 55 Q8 35 30 5 Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="22" r="3.5" fill="currentColor" opacity="0.5" />
        <path d="M30 32 Q40 38 30 50 Q20 38 30 32 Z" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="30" cy="40" r="1.5" fill="currentColor" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute right-3 bottom-28 h-14 w-14 text-vermilion/40 animate-float-soft sm:right-6 sm:h-20 sm:w-20 lg:h-24 lg:w-24" viewBox="0 0 60 60" fill="none" style={{ transform: "scaleX(-1)", animationDelay: "1.5s" }}>
        <path d="M30 5 Q52 25 30 55 Q8 35 30 5 Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="30" cy="22" r="3.5" fill="currentColor" opacity="0.5" />
        <path d="M30 32 Q40 38 30 50 Q20 38 30 32 Z" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="30" cy="40" r="1.5" fill="currentColor" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute right-12 top-12 hidden h-12 w-12 text-kesar/50 animate-float-soft md:block" viewBox="0 0 60 60" fill="none" style={{ animationDelay: "0.8s" }}>
        <path d="M30 5 Q52 25 30 55 Q8 35 30 5 Z" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="30" cy="22" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute left-12 bottom-20 hidden h-12 w-12 text-gold/50 animate-float-soft md:block" viewBox="0 0 60 60" fill="none" style={{ transform: "scaleX(-1)", animationDelay: "2.2s" }}>
        <path d="M30 5 Q52 25 30 55 Q8 35 30 5 Z" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="30" cy="22" r="2.5" fill="currentColor" opacity="0.6" />
      </svg>

      {/* Layer 8 — Scattered twinkling gold sparkles */}
      {[
        { l: "12%", t: "30%" }, { l: "88%", t: "22%" }, { l: "20%", t: "70%" },
        { l: "82%", t: "60%" }, { l: "50%", t: "8%" }, { l: "50%", t: "92%" },
        { l: "8%", t: "50%" }, { l: "92%", t: "45%" }, { l: "30%", t: "85%" },
        { l: "70%", t: "15%" },
      ].map((d, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold animate-flicker"
          style={{
            left: d.l,
            top: d.t,
            boxShadow: "0 0 8px rgba(212,175,55,0.8), 0 0 16px rgba(212,175,55,0.4)",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Layer 9 — Corner mandala ornaments */}
      {[
        "left-2 top-2",
        "right-2 top-2 rotate-90",
        "left-2 bottom-2 -rotate-90",
        "right-2 bottom-2 rotate-180",
      ].map((pos, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 30 30"
          className={`pointer-events-none absolute ${pos} h-12 w-12 text-gold-deep/50 sm:h-16 sm:w-16 lg:h-20 lg:w-20`}
          fill="none"
        >
          <g stroke="currentColor" strokeWidth="0.9">
            <path d="M2 2 L18 2 M2 2 L2 18" />
            <path d="M2 2 Q14 6 18 18" />
            <path d="M8 2 Q10 6 8 10" />
            <path d="M2 8 Q6 10 10 8" />
            <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            <circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.7" />
          </g>
        </svg>
      ))}

      {/* Content wrapper — flex-1 + justify-center mirrors desktop centering on all screen sizes */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-4 lg:py-0">
        {/* HERO: Bride & Groom circling the sacred fire */}
        <div className="relative mx-auto w-full max-w-[260px] shrink-0 animate-scale-reveal sm:max-w-[300px] lg:max-w-[340px]">
          <div className="relative aspect-square w-full">
            {/* Outer golden halo */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full bg-gradient-gold opacity-30 blur-3xl animate-glow-pulse"
            />

            {/* Outer rotating ring with golden orb markers circling the fire */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-dashed border-gold-deep/60 animate-spin-slow"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${(360 / 8) * i}deg)` }}
                >
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold to-vermilion shadow-gold sm:h-4 sm:w-4" />
                </div>
              ))}
            </div>

            {/* Second rotating ring with smaller petal dots */}
            <div
              aria-hidden
              className="absolute inset-2 rounded-full border border-gold/40 animate-spin-reverse sm:inset-3"
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${(360 / 12) * i}deg)` }}
                >
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kesar/80 sm:h-2 sm:w-2" />
                </div>
              ))}
            </div>

            {/* Middle ring */}
            <div
              aria-hidden
              className="absolute inset-5 rounded-full border border-gold/50 animate-spin-reverse sm:inset-7"
            />

            {/* Inner fine ring */}
            <div
              aria-hidden
              className="absolute inset-9 rounded-full border border-dashed border-gold-deep/40 animate-spin-slow sm:inset-12"
            />

            {/* Circular framed video — bride & groom taking pheras */}
            <div className="absolute inset-12 overflow-hidden rounded-full border-4 border-gold/70 shadow-royal sm:inset-16">
              <video
                src={phereVideo.url}
                poster={phereImg}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={`${couple.brideFirst} and ${couple.groomFirst} taking the sacred pheras around the holy fire`}
                className="h-full w-full object-cover"
              />
              <img
                src={phereImg}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-0 motion-reduce:opacity-100"
              />
              {/* Warm fire glow inside frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-vermilion/50 via-kesar/20 to-transparent mix-blend-soft-light"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-full border border-gold/40"
              />
            </div>

            {/* Sacred fire — embers rising from the agni kund */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-8 left-1/2 h-32 w-32 -translate-x-1/2 sm:bottom-12 sm:h-40 sm:w-40"
            >
              <span className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-kesar/80 blur-sm animate-flicker" />
              <span className="absolute bottom-2 left-[40%] h-2 w-2 rounded-full bg-gold animate-ember" style={{ animationDelay: "0s" }} />
              <span className="absolute bottom-2 left-[55%] h-1.5 w-1.5 rounded-full bg-kesar animate-ember" style={{ animationDelay: "0.6s" }} />
              <span className="absolute bottom-2 left-[48%] h-2 w-2 rounded-full bg-vermilion animate-ember" style={{ animationDelay: "1.2s" }} />
              <span className="absolute bottom-2 left-[60%] h-1.5 w-1.5 rounded-full bg-gold animate-ember" style={{ animationDelay: "1.8s" }} />
              <span className="absolute bottom-2 left-[38%] h-1.5 w-1.5 rounded-full bg-kesar animate-ember" style={{ animationDelay: "2.4s" }} />
              <span className="absolute bottom-2 left-[52%] h-1 w-1 rounded-full bg-vermilion animate-ember" style={{ animationDelay: "3s" }} />
            </div>

            {/* Floating ornament dots around the circle */}
            <div
              aria-hidden
              className="absolute -left-1 top-8 h-10 w-10 rounded-full border border-gold/60 bg-ivory/80 shadow-gold animate-float-soft sm:-left-3 sm:h-12 sm:w-12"
            />
            <div
              aria-hidden
              className="absolute -right-1 bottom-16 h-8 w-8 rounded-full border border-gold/60 bg-ivory/80 shadow-gold animate-float-soft delay-300 sm:-right-3 sm:h-10 sm:w-10"
            />
            <div
              aria-hidden
              className="absolute right-6 top-2 h-6 w-6 rounded-full border border-gold-deep/50 bg-ivory/70 animate-float-soft delay-500 sm:h-8 sm:w-8"
            />
          </div>
        </div>
        {/* Invitation Content — Full Screen Flow */}
        <div className="relative flex w-full flex-col items-center animate-fade-up delay-200 mt-4 sm:mt-6 lg:mt-8">
          {/* Top temple-arch crown with kalash */}
          <div className="relative mb-2 flex justify-center sm:mb-3">
            <div aria-hidden className="absolute -top-2 h-2.5 w-2.5 rotate-45 bg-gradient-gold shadow-gold animate-flicker sm:-top-3 sm:h-3 sm:w-3" />
            <svg viewBox="0 0 80 24" className="h-5 w-20 text-gold-deep/80 sm:h-6 sm:w-24 lg:h-6 lg:w-24" aria-hidden>
              <path d="M2 22 Q40 -4 78 22" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 22 Q40 4 72 22" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <circle cx="40" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Header */}
          <p className="text-center font-serif-elegant text-[0.8rem] italic tracking-[0.25em] text-maroon/80 sm:text-[0.9rem] lg:text-[1rem]">
            ✦ You are cordially invited ✦
          </p>

          {/* Couple names */}
          <div className="mt-2 flex flex-col items-center gap-0.5 sm:mt-3">
            <h2 className="bg-gradient-royal bg-clip-text font-display text-4xl font-semibold text-transparent drop-shadow-sm sm:text-4xl lg:text-5xl text-hover-lift">
              {couple.brideFirst}
            </h2>

            <div className="relative flex items-center gap-3 py-1 sm:gap-3 sm:py-2">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold sm:w-16" />
              <span className="font-script text-5xl leading-none text-vermilion sm:text-5xl lg:text-6xl text-hover-glow">
                weds
              </span>
              <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold sm:w-16" />
            </div>

            <h2 className="bg-gradient-royal bg-clip-text font-display text-4xl font-semibold text-transparent drop-shadow-sm sm:text-4xl lg:text-5xl text-hover-lift">
              {couple.groomFirst}
            </h2>
          </div>

          {/* Ornate divider with center jewel */}
          <div className="mx-auto mt-4 flex w-full max-w-[240px] items-center gap-2 sm:mt-5 sm:max-w-[320px]">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold to-gold-deep" />
            <span aria-hidden className="relative h-2 w-2 rotate-45 bg-gradient-gold shadow-gold sm:h-2.5 sm:w-2.5">
              <span className="absolute inset-[-3px] rounded-full border border-gold/60" />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-gold-deep" />
          </div>

          {/* Royal date & destination plaque */}
          <div className="mt-4 flex justify-center sm:mt-5">
            <div className="relative inline-flex flex-col items-center gap-1 overflow-hidden rounded-md bg-gradient-royal px-5 py-2 shadow-royal transition-transform hover:scale-105 sm:px-6 sm:py-3 sm:gap-1.5">
              <span aria-hidden className="pointer-events-none absolute inset-0 royal-plaque-shimmer" />
              <p className="relative font-display text-[0.6rem] tracking-[0.25em] text-ivory sm:text-[0.7rem] font-medium">
                {couple.weddingDate.toUpperCase()}
              </p>
              <span aria-hidden className="relative h-px w-10 bg-gold/70" />
              <p className="relative font-display text-[0.6rem] tracking-[0.25em] text-ivory sm:text-[0.7rem] font-medium">
                {couple.destination.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Bottom flourish */}
          <div className="mt-4 mb-2 flex justify-center sm:mt-5 sm:mb-4">
            <svg viewBox="0 0 120 12" className="h-3 w-28 text-gold-deep/70 sm:w-32 lg:w-32" aria-hidden>
              <path d="M2 6 Q30 -4 60 6 Q90 16 118 6" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="60" cy="6" r="1.5" fill="currentColor" />
              <circle cx="20" cy="6" r="0.8" fill="currentColor" />
              <circle cx="100" cy="6" r="0.8" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
