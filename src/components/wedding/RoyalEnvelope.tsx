import { useState, useMemo } from "react";
import { couple, guestName } from "@/data/wedding";

interface Props {
  onOpen: () => void;
}

export function RoyalEnvelope({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const [bursting, setBursting] = useState(false);

  const handleClick = () => {
    if (opening || bursting) return;
    setBursting(true);
    // Let crackers burn first, then open envelope
    setTimeout(() => setOpening(true), 900);
    setTimeout(() => onOpen(), 3300);
  };

  // Firework cracker sparks — radial burst from seal
  const crackerSparks = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => {
        const angle = (i * 360) / 28 + Math.random() * 8;
        const distance = 90 + Math.random() * 140;
        const rad = (angle * Math.PI) / 180;
        const colors = ["#fde58a", "#f4a261", "#e76f51", "#d4af37", "#ff9a3c", "#ffd86b"];
        return {
          id: i,
          dx: Math.cos(rad) * distance,
          dy: Math.sin(rad) * distance,
          delay: Math.random() * 120,
          duration: 700 + Math.random() * 500,
          size: 4 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      }),
    []
  );

  // Secondary outer cracker ring (bigger pop)
  const crackerRing = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 360) / 18;
        const rad = (angle * Math.PI) / 180;
        const distance = 180 + Math.random() * 80;
        return {
          id: i,
          dx: Math.cos(rad) * distance,
          dy: Math.sin(rad) * distance,
          delay: 200 + Math.random() * 200,
          duration: 900,
          size: 3 + Math.random() * 4,
        };
      }),
    []
  );

  // Generate falling particle config once
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: -20 + Math.random() * 40,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 1.6 + Math.random() * 2.4,
      })),
    []
  );

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#15030a] px-4 py-10"
      aria-label="Royal wedding envelope"
    >
      {/* ===== Mandala + Particle Background ===== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep radial base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(140,25,40,0.6)_0%,_rgba(21,3,10,0.98)_75%)]" />

        {/* Center mandala */}
        <svg
          className="absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-[0.15]"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="mandalaGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f6d27a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#b8862d" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <g stroke="url(#mandalaGold)" strokeWidth="0.8" fill="none">
            {[40, 80, 120, 160, 200, 240, 280].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} />
            ))}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <g key={i} transform={`rotate(${angle} 300 300)`}>
                  <path d="M300 60 Q310 150 300 240 Q290 150 300 60 Z" fill="url(#mandalaGold)" fillOpacity="0.15" />
                  <line x1="300" y1="60" x2="300" y2="540" />
                </g>
              );
            })}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8 + 22.5;
              return (
                <g key={`p-${i}`} transform={`rotate(${angle} 300 300)`}>
                  <path d="M300 140 Q320 200 300 260 Q280 200 300 140 Z" fill="url(#mandalaGold)" fillOpacity="0.25" />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Counter outer mandala */}
        <svg
          className="absolute left-1/2 top-1/2 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-reverse opacity-[0.08]"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden
        >
          <g stroke="#e8c574" strokeWidth="0.5" fill="none">
            {Array.from({ length: 32 }).map((_, i) => (
              <g key={i} transform={`rotate(${(i * 360) / 32} 300 300)`}>
                <line x1="300" y1="100" x2="300" y2="500" strokeOpacity="0.5" />
                <circle cx="300" cy="120" r="6" />
              </g>
            ))}
            <circle cx="300" cy="300" r="240" />
            <circle cx="300" cy="300" r="180" />
          </g>
        </svg>

        {/* Falling shining particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle-fall absolute -top-4 rounded-full"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background:
                  "radial-gradient(circle, #fde58a 0%, #d4af37 40%, transparent 70%)",
                boxShadow: `0 0 ${p.size * 2}px rgba(244, 208, 116, 0.8), 0 0 ${p.size * 4}px rgba(212, 175, 55, 0.4)`,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--drift" as string]: `${p.drift}px`,
              }}
            />
          ))}
        </div>

        {/* Stationary twinkling sparkles */}
        <div className="absolute inset-0">
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="sparkle-twinkle absolute"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 0 L8 6 L14 7 L8 8 L7 14 L6 8 L0 7 L6 6 Z"
                  fill="#fde58a"
                />
              </svg>
            </span>
          ))}
        </div>

        {/* Edge glows */}
        <div className="absolute left-1/2 top-0 h-48 w-[140%] -translate-x-1/2 bg-gradient-to-b from-gold/20 to-transparent blur-3xl" />
        <div className="absolute left-1/2 bottom-0 h-48 w-[140%] -translate-x-1/2 bg-gradient-to-t from-vermilion/20 to-transparent blur-3xl" />
      </div>

      {/* ===== Foreground Content ===== */}
      <div className="relative z-10 flex flex-col items-center">
        <p className={`mb-2 font-serif-elegant text-xs uppercase tracking-[0.45em] text-gold/90 sm:text-sm ${opening ? "animate-fade-out" : "animate-fade-in-soft"}`}>
          ॥ Shubh Vivah ॥
        </p>
        <p className={`mb-6 font-script text-3xl text-gold sm:text-4xl ${opening ? "animate-fade-out" : "animate-fade-in-soft"}`}>
          {couple.brideFirst} &amp; {couple.groomFirst}
        </p>

        {/* ===== Envelope ===== */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Open the royal invitation"
          className={`group relative block w-[88vw] max-w-[460px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            opening ? "envelope-rise" : "animate-float-soft hover:scale-[1.03]"
          }`}
          style={{ perspective: "1600px", transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
        >
          {/* Decorative top tassel hanging into envelope */}
          <div className={`pointer-events-none absolute left-1/2 -top-10 z-30 -translate-x-1/2 transition-opacity duration-500 ${opening ? "opacity-0" : "opacity-100"}`}>
            <div className="flex flex-col items-center">
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gold/70 to-gold" />
              <div className="h-3 w-3 rotate-45 rounded-sm bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
              <div className="-mt-1 h-2 w-4 rounded-b-full bg-gradient-to-b from-gold to-gold-deep" />
            </div>
          </div>

          <div
            className="relative aspect-[3/2] w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: opening ? "rotateX(-6deg)" : "rotateX(0deg)",
              transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Glow halo behind envelope */}
            <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-gold/20 via-transparent to-vermilion/20 blur-2xl" />

            {/* ===== Envelope back (base) ===== */}
            <div className="absolute inset-0 overflow-hidden rounded-md shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),0_15px_40px_-10px_rgba(120,20,30,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5a0d18] via-[#7a1224] to-[#3d0810]" />
              {/* Velvet sheen */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)]" />
              {/* Damask pattern */}
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" aria-hidden>
                <defs>
                  <pattern id="damask" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <g fill="#d4af37" fillOpacity="0.55">
                      <circle cx="16" cy="16" r="1" />
                      <path d="M16 4 Q20 16 16 28 Q12 16 16 4 Z" />
                      <path d="M4 16 Q16 20 28 16 Q16 12 4 16 Z" />
                      <circle cx="4" cy="4" r="0.6" />
                      <circle cx="28" cy="4" r="0.6" />
                      <circle cx="4" cy="28" r="0.6" />
                      <circle cx="28" cy="28" r="0.6" />
                    </g>
                  </pattern>
                </defs>
                <rect width="200" height="130" fill="url(#damask)" />
              </svg>
              {/* Gold triple borders */}
              <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold/55" />
              <div className="pointer-events-none absolute inset-[11px] rounded-sm border border-gold/30" />
              <div className="pointer-events-none absolute inset-[14px] rounded-sm border border-gold/15" />
            </div>

            {/* ===== Letter inside ===== */}
            <div
              className={`absolute left-[5%] right-[5%] top-[8%] bottom-[8%] overflow-hidden rounded-sm bg-gradient-to-b from-ivory via-[#fbf3df] to-sandal shadow-[inset_0_0_30px_rgba(120,20,30,0.18),0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-[1700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                opening ? "-translate-y-[58%] scale-[1.03] rotate-[-0.5deg]" : "translate-y-0"
              }`}
              style={{ zIndex: 1, transitionDelay: opening ? "550ms" : "0ms" }}
            >
              <div className="absolute inset-2 rounded-sm border border-gold-deep/45" />
              <div className="absolute inset-[10px] rounded-sm border border-gold-deep/20" />

              {/* Ornate corner flourishes */}
              {[
                "left-1 top-1",
                "right-1 top-1 rotate-90",
                "right-1 bottom-1 rotate-180",
                "left-1 bottom-1 -rotate-90",
              ].map((pos, i) => (
                <svg key={i} className={`absolute ${pos} h-6 w-6 sm:h-7 sm:w-7`} viewBox="0 0 28 28" fill="none" aria-hidden>
                  <path d="M2 2 Q14 4 14 14 M2 2 Q4 14 14 14 M2 2 L10 2 M2 2 L2 10" stroke="#8a6018" strokeWidth="0.9" />
                  <circle cx="14" cy="14" r="1.8" fill="#b8862d" />
                  <circle cx="6" cy="6" r="1" fill="#d4af37" />
                </svg>
              ))}

              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <p className="font-serif-elegant text-[9px] uppercase tracking-[0.35em] text-maroon/70 sm:text-[11px]">
                  An invitation for
                </p>
                <p className="mt-1 font-script text-2xl text-gold-deep sm:text-3xl">
                  {guestName}
                </p>
                <div className="my-2 h-px w-20 bg-gradient-to-r from-transparent via-gold-deep to-transparent" />
                <p className="font-display text-[10px] tracking-[0.3em] text-maroon sm:text-xs">
                  {couple.brideFirst.toUpperCase()} &amp; {couple.groomFirst.toUpperCase()}
                </p>
              </div>
            </div>

            {/* ===== Front bottom flap ===== */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] overflow-hidden rounded-b-md" style={{ zIndex: 2 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#6a0f1c] via-[#8a1528] to-[#4a0a13]" />
              {/* Velvet sheen */}
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)]" />
              <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 70" preserveAspectRatio="xMidYMid slice" aria-hidden>
                <rect width="200" height="70" fill="url(#damask)" />
              </svg>
              {/* Diagonal flap seams */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 49%, rgba(0,0,0,0.4) 50%, transparent 51%), linear-gradient(45deg, transparent 49%, rgba(0,0,0,0.4) 50%, transparent 51%)",
                }}
              />
              <div className="pointer-events-none absolute inset-2 rounded-sm border border-gold/50" />
              <div className="pointer-events-none absolute inset-[10px] rounded-sm border border-gold/25" />

              {/* Ornate filigree corners */}
              <svg className="absolute left-2 bottom-2 h-9 w-9" viewBox="0 0 30 30" fill="none" aria-hidden>
                <path d="M2 28 L2 14 Q2 2 14 2" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.85" />
                <path d="M2 20 Q8 20 8 14 Q8 8 14 8" stroke="#d4af37" strokeWidth="0.7" strokeOpacity="0.6" fill="none" />
                <circle cx="2" cy="28" r="1.8" fill="#d4af37" />
                <circle cx="14" cy="2" r="1.4" fill="#d4af37" fillOpacity="0.8" />
              </svg>
              <svg className="absolute right-2 bottom-2 h-9 w-9" viewBox="0 0 30 30" fill="none" aria-hidden>
                <path d="M28 28 L28 14 Q28 2 16 2" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.85" />
                <path d="M28 20 Q22 20 22 14 Q22 8 16 8" stroke="#d4af37" strokeWidth="0.7" strokeOpacity="0.6" fill="none" />
                <circle cx="28" cy="28" r="1.8" fill="#d4af37" />
                <circle cx="16" cy="2" r="1.4" fill="#d4af37" fillOpacity="0.8" />
              </svg>

              {/* Bottom center jewel ornament */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/70" />
                  <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  <span className="h-1 w-1 rounded-full bg-gold shadow-[0_0_4px_rgba(212,175,55,0.9)]" />
                  <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/70" />
                </div>
              </div>
            </div>

            {/* ===== Top triangular flap (3D) — realistic hinge ===== */}
            <div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "55%",
                transform: opening ? "rotateX(178deg)" : "rotateX(0deg)",
                transformStyle: "preserve-3d",
                transition: opening
                  ? "transform 1200ms cubic-bezier(0.34, 1.2, 0.64, 1) 100ms, opacity 300ms ease-out 1200ms, visibility 0s linear 1500ms"
                  : "transform 1200ms cubic-bezier(0.5, 0, 0.75, 0)",
                zIndex: opening ? 0 : 3,
                opacity: opening ? 0 : 1,
                visibility: opening ? "hidden" : "visible",
                pointerEvents: opening ? "none" : "auto",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(180deg, #8a1528 0%, #6a0f1c 55%, #4a0a13 100%)",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                }}
              >
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 18%, rgba(212,175,55,0.55) 0%, transparent 50%)",
                  }}
                />
                {/* Velvet sheen */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.1)_50%,transparent_65%)]" />
                {/* Gold V edge */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
                  <path d="M0 0 L50 100 L100 0" stroke="#d4af37" strokeWidth="0.5" fill="none" strokeOpacity="0.85" />
                  <path d="M2 0 L50 96 L98 0" stroke="#d4af37" strokeWidth="0.25" fill="none" strokeOpacity="0.5" />
                </svg>
                {/* Top gold ornament center */}
                <div className="absolute left-1/2 top-2 -translate-x-1/2">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_4px_rgba(212,175,55,0.9)]" />
                    <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_4px_rgba(212,175,55,0.9)]" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(0deg, #8a1528 0%, #6a0f1c 55%, #4a0a13 100%)",
                }}
              >
                <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" aria-hidden>
                  <rect width="200" height="130" fill="url(#damask)" />
                </svg>
              </div>
            </div>

            {/* ===== Wax Seal — cracks into shards when opened ===== */}
            <div
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 4 }}
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                {/* Outer pulsing glow (fades on open) */}
                <div
                  className={`absolute -inset-2 rounded-full bg-gradient-to-br from-vermilion/60 to-maroon/60 blur-md transition-opacity duration-500 ${
                    opening ? "opacity-0" : "animate-glow-pulse opacity-100"
                  }`}
                />
                {/* Decorative gold ring around seal */}
                <div
                  className={`absolute -inset-1.5 rounded-full border border-gold/40 transition-opacity duration-500 ${
                    opening ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Intact seal — fades quickly when crack starts */}
                <div
                  className={`absolute inset-0 transition-opacity duration-150 ${
                    opening ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,_#d22a3c_0%,_#8a1528_50%,_#3d0810_100%)] shadow-[0_8px_22px_rgba(0,0,0,0.75),inset_0_3px_8px_rgba(255,255,255,0.3),inset_0_-3px_8px_rgba(0,0,0,0.55)]">
                    <div className="absolute inset-2 rounded-full border-2 border-gold/65 shadow-[inset_0_0_4px_rgba(0,0,0,0.4)]" />
                    <div className="absolute inset-3 rounded-full border border-gold/35" />
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * 360) / 8;
                      return (
                        <span
                          key={i}
                          className="absolute h-1 w-1 rounded-full bg-gold shadow-[0_0_3px_rgba(212,175,55,0.9)]"
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${angle}deg) translateY(-26px) translateX(-50%)`,
                            transformOrigin: "center",
                          }}
                        />
                      );
                    })}
                    <span className="relative font-script text-3xl text-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] sm:text-4xl">
                      A&amp;A
                    </span>
                    <div className="absolute -bottom-2 left-1/2 h-4 w-3 -translate-x-1/2 rounded-b-full bg-[radial-gradient(circle_at_30%_30%,_#a01a2a_0%,_#5a0d18_100%)] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                    <div className="absolute -bottom-1 left-[28%] h-3 w-2 rounded-b-full bg-[radial-gradient(circle_at_30%_30%,_#a01a2a_0%,_#5a0d18_100%)]" />
                    <div className="absolute -bottom-0.5 right-[30%] h-2 w-1.5 rounded-b-full bg-[radial-gradient(circle_at_30%_30%,_#a01a2a_0%,_#5a0d18_100%)]" />
                  </div>
                </div>

                {/* Cracked shards — appear and fly apart when opening */}
                {opening && (
                  <>
                    <div
                      className="animate-seal-crack-left absolute inset-0"
                      style={{
                        clipPath: "polygon(0 0, 50% 0, 45% 100%, 0 100%)",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))",
                      }}
                    >
                      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,_#d22a3c_0%,_#8a1528_50%,_#3d0810_100%)] shadow-[inset_0_3px_8px_rgba(255,255,255,0.25),inset_0_-3px_8px_rgba(0,0,0,0.6)]" />
                    </div>
                    <div
                      className="animate-seal-crack-right absolute inset-0"
                      style={{
                        clipPath: "polygon(50% 0, 100% 0, 100% 100%, 55% 100%)",
                        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.6))",
                      }}
                    >
                      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,_#d22a3c_0%,_#8a1528_50%,_#3d0810_100%)] shadow-[inset_0_3px_8px_rgba(255,255,255,0.25),inset_0_-3px_8px_rgba(0,0,0,0.6)]" />
                    </div>
                    <div
                      className="animate-seal-crack-top absolute inset-0"
                      style={{
                        clipPath: "polygon(40% 0, 60% 0, 55% 38%, 45% 38%)",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                      }}
                    >
                      <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,_#d22a3c_0%,_#8a1528_50%,_#3d0810_100%)]" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ===== Cracker / Firework burst over the seal ===== */}
            {bursting && (
              <div
                className="pointer-events-none absolute left-1/2 top-[44%] z-50 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                {/* Central white-hot flash */}
                <span
                  className="cracker-flash absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,240,1) 0%, rgba(255,200,80,0.8) 30%, rgba(255,100,40,0.4) 60%, transparent 80%)",
                  }}
                />
                {/* Shock ring */}
                <span className="cracker-ring absolute left-0 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold" />
                <span
                  className="cracker-ring absolute left-0 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-vermilion"
                  style={{ animationDelay: "150ms" }}
                />

                {/* Inner spark burst */}
                {crackerSparks.map((s) => (
                  <span
                    key={`s-${s.id}`}
                    className="cracker-spark absolute left-0 top-0 rounded-full"
                    style={{
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      background: `radial-gradient(circle, #fff 0%, ${s.color} 50%, transparent 80%)`,
                      boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}80`,
                      animationDelay: `${s.delay}ms`,
                      animationDuration: `${s.duration}ms`,
                      ["--bx" as string]: `${s.dx}px`,
                      ["--by" as string]: `${s.dy}px`,
                    }}
                  />
                ))}

                {/* Outer ring of bigger embers */}
                {crackerRing.map((s) => (
                  <span
                    key={`r-${s.id}`}
                    className="cracker-spark absolute left-0 top-0 rounded-full"
                    style={{
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      background:
                        "radial-gradient(circle, #fff 0%, #fde58a 40%, #d4af37 70%, transparent 90%)",
                      boxShadow: "0 0 8px #fde58a, 0 0 16px #d4af37",
                      animationDelay: `${s.delay}ms`,
                      animationDuration: `${s.duration}ms`,
                      ["--bx" as string]: `${s.dx}px`,
                      ["--by" as string]: `${s.dy}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Soft shadow under envelope */}
          <div className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />
        </button>

        {/* Tap hint */}
        <div className={`mt-12 flex flex-col items-center transition-all duration-500 ${opening ? "translate-y-2 opacity-0" : "opacity-100"}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            <p className="font-display text-[11px] uppercase tracking-[0.45em] text-gold sm:text-xs">
              <span className="inline-block animate-pulse">Tap to Open</span>
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <p className="mt-3 font-serif-elegant text-xs italic text-ivory/65 sm:text-sm">
            A sacred invitation awaits…
          </p>
        </div>
      </div>
    </section>
  );
}
