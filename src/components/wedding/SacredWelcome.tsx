import { useEffect, useMemo, useState } from "react";
import ganeshSeal from "@/assets/ganesh-seal.png";
import archwayBg from "@/assets/welcome-archway-bg.jpg";
import { couple, guestName } from "@/data/wedding";
import { RoyalBackground } from "./RoyalBackground";

interface Props {
  onOpen: () => void;
}

export function SacredWelcome({ onOpen }: Props) {
  const [mounted, setMounted] = useState(false);
  const [bursting, setBursting] = useState(false);
  useEffect(() => setMounted(true), []);

  // Multi-burst firework launches for grand celebration
  const burstCenters = useMemo(
    () => [
      { id: "c", x: 50, y: 50, delay: 0, scale: 1.3 },
      { id: "tl", x: 22, y: 30, delay: 220, scale: 0.95 },
      { id: "tr", x: 78, y: 28, delay: 360, scale: 1 },
      { id: "bl", x: 28, y: 72, delay: 540, scale: 0.9 },
      { id: "br", x: 74, y: 70, delay: 700, scale: 1.05 },
      { id: "t", x: 50, y: 18, delay: 880, scale: 1.1 },
    ],
    []
  );

  // Sparks per burst — radial pattern
  const sparksPerBurst = useMemo(() => {
    const palette = ["#fde58a", "#f4a261", "#e76f51", "#d4af37", "#ff9a3c", "#ffd86b", "#ffffff", "#ff6b9d"];
    return burstCenters.map((b) => ({
      ...b,
      sparks: Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 360) / 32 + Math.random() * 6;
        const distance = (80 + Math.random() * 130) * b.scale;
        const rad = (angle * Math.PI) / 180;
        return {
          id: i,
          dx: Math.cos(rad) * distance,
          dy: Math.sin(rad) * distance,
          delay: b.delay + Math.random() * 100,
          duration: 800 + Math.random() * 500,
          size: 3 + Math.random() * 5,
          color: palette[Math.floor(Math.random() * palette.length)],
        };
      }),
    }));
  }, [burstCenters]);

  // Rising rocket trails from bottom that explode into bursts
  const rockets = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        delay: i * 140 + Math.random() * 120,
        duration: 700 + Math.random() * 200,
      })),
    []
  );

  const handleOpenClick = () => {
    if (bursting) return;
    setBursting(true);
    // Let the celebration play, then navigate
    setTimeout(() => onOpen(), 2400);
  };

  return (
    <section
      id="welcome"
      className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#2a0508] px-4 py-4 sm:py-8"
    >
      <RoyalBackground variant="dark" idPrefix="sw" />

      {/* Royal rose archway background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <img
          src={archwayBg}
          alt=""
          aria-hidden
          width={1080}
          height={1920}
          className="absolute top-0 left-0 w-full h-[120vh] object-cover object-[center_top] sm:h-full sm:object-[center_30%] opacity-40 mix-blend-luminosity"
        />
        {/* Side fades blend image edges with backdrop on wide screens */}
        <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-[#2a0508] to-transparent md:block lg:w-56" />
        <div className="absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-[#2a0508] to-transparent md:block lg:w-56" />
        {/* Subtle darken for legibility — keep image visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        {/* Soft golden glow at top */}
        <div className="absolute left-1/2 top-0 h-40 w-[140%] -translate-x-1/2 bg-gradient-to-b from-gold/20 to-transparent blur-2xl" />
      </div>

      {/*
       * Curtains positioned INSIDE the arch opening of the background image.
       * Mobile uses a taller/narrower region matching the portrait arch crop;
       * sm+ uses the wider desktop arch region.
       */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {/* Mobile arch region */}
        <div
          className="absolute overflow-hidden inset-x-[18%] top-[14%] bottom-[18%] sm:hidden"
          style={{
            borderTopLeftRadius: "50% 24%",
            borderTopRightRadius: "50% 24%",
          }}
        >
          <div
            className={`curtain-fabric absolute inset-y-0 left-0 w-1/2 ${
              mounted ? "animate-curtain-left" : ""
            }`}
          >
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/60 to-transparent" />
          </div>
          <div
            className={`curtain-fabric absolute inset-y-0 right-0 w-1/2 ${
              mounted ? "animate-curtain-right" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
        </div>

        {/* Tablet/Desktop arch region */}
        <div
          className="absolute hidden overflow-hidden sm:block sm:inset-x-[28%] sm:top-[18%] sm:bottom-[8%]"
          style={{
            borderTopLeftRadius: "50% 28%",
            borderTopRightRadius: "50% 28%",
          }}
        >
          <div
            className={`curtain-fabric absolute inset-y-0 left-0 w-1/2 ${
              mounted ? "animate-curtain-left" : ""
            }`}
          >
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/60 to-transparent" />
          </div>
          <div
            className={`curtain-fabric absolute inset-y-0 right-0 w-1/2 ${
              mounted ? "animate-curtain-right" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/60 to-transparent" />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Sacred top line */}
        <p
          className={`font-serif-elegant text-[3vw] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.45em] text-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${
            mounted ? "animate-fade-in-soft delay-curtain" : "opacity-0"
          }`}
        >
          ।। Shree Ganeshaya Namah ।।
        </p>

        {/* Ganesh seal */}
        <div className={`relative mt-[4vw] sm:mt-6 md:mt-8 ${mounted ? "animate-scale-reveal delay-curtain-200" : "opacity-0"}`}>
          <div className="absolute inset-0 animate-glow-pulse" />
          <img
            src={ganeshSeal}
            alt="Lord Ganesha — invocation seal"
            width={1024}
            height={1024}
            className="relative h-[18vw] w-[18vw] sm:h-24 sm:w-24 md:h-36 md:w-36 animate-float-soft drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          />
        </div>

        <div className={`mt-[4vw] sm:mt-5 md:mt-8 ${mounted ? "animate-fade-up delay-curtain-400" : "opacity-0"}`}>
          <p className="font-serif-elegant text-[3.5vw] sm:text-sm md:text-base italic text-ivory/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">A sacred invitation for</p>
          <p className="mt-[1vw] sm:mt-2 font-script text-[10vw] leading-none sm:text-4xl md:text-6xl text-gold drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">{guestName}</p>
        </div>

        {/* Couple */}
        <div className={`mt-[4vw] sm:mt-5 md:mt-8 flex flex-wrap justify-center items-center gap-[1.5vw] sm:gap-6 ${mounted ? "animate-fade-up delay-curtain-600" : "opacity-0"}`}>
          <h1 className="font-display text-[8vw] sm:text-4xl md:text-6xl text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">{couple.brideFirst}</h1>
          <span className="font-script text-[8vw] sm:text-4xl md:text-6xl text-gold drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">&amp;</span>
          <h1 className="font-display text-[8vw] sm:text-4xl md:text-6xl text-ivory drop-shadow-[0_3px_14px_rgba(0,0,0,0.65)]">{couple.groomFirst}</h1>
        </div>

        <div className={`mt-[4vw] sm:mt-5 md:mt-6 gold-divider w-[25vw] sm:w-48 ${mounted ? "animate-fade-in-soft delay-curtain-600" : "opacity-0"}`} />

        <div className={`mt-[4vw] sm:mt-5 md:mt-6 space-y-1 ${mounted ? "animate-fade-up delay-curtain-800" : "opacity-0"}`}>
          <p className="font-display text-[2.5vw] sm:text-sm md:text-lg tracking-[0.2em] sm:tracking-[0.3em] text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {couple.weddingDate.toUpperCase()}
          </p>
          <p className="font-serif-elegant text-[3vw] sm:text-sm md:text-lg italic text-ivory/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">{couple.destination}</p>
        </div>

        <div
          className={`relative mt-[6vw] sm:mt-6 md:mt-10 ${mounted ? "animate-fade-up delay-curtain-1000" : "opacity-0"}`}
        >
          {/* Outer pulsing royal glow */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-vermilion/40 via-gold/40 to-vermilion/40 opacity-70 blur-xl animate-glow-pulse" />

          <button
            onClick={handleOpenClick}
            disabled={bursting}
            aria-label="Open the wedding invitation"
            className="group relative inline-flex items-center gap-[1.5vw] sm:gap-4 overflow-hidden rounded-full px-[6vw] py-[3vw] sm:px-10 sm:py-4 md:px-12 md:py-5 font-display text-[3vw] sm:text-[11px] md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.4em] text-ivory transition-all duration-500 hover:scale-[1.04] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a0508]"
            style={{
              background:
                "linear-gradient(135deg, #6a0f1c 0%, #a01a2a 35%, #d4af37 50%, #a01a2a 65%, #4a0a13 100%)",
              backgroundSize: "200% 100%",
              boxShadow:
                "0 10px 30px -8px rgba(0,0,0,0.7), 0 4px 12px -2px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.4)",
            }}
          >
            {/* Shimmer sweep on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] transition-transform duration-1000 group-hover:translate-x-full" />

            {/* Double gold ring */}
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-gold/70" />
            <span className="pointer-events-none absolute inset-[6px] rounded-full border border-gold/30" />

            {/* Left ornament */}
            <span className="relative flex items-center gap-1.5">
              <span className="hidden sm:block h-px w-4 bg-gradient-to-r from-transparent to-gold" />
              <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
            </span>

            <span className="relative whitespace-nowrap bg-gradient-to-b from-ivory to-gold bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              Open Invitation
            </span>

            {/* Right ornament */}
            <span className="relative flex items-center gap-1.5">
              <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-gold to-gold-deep shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
              <span className="hidden sm:block h-px w-4 bg-gradient-to-l from-transparent to-gold" />
            </span>
          </button>

          {/* Decorative under-line flourish */}
          <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="h-1 w-1 rounded-full bg-gold/80" />
            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </div>
      </div>

      {/* GRAND CRACKER CELEBRATION OVERLAY — fires on Open Invitation click */}
      {bursting && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {/* Full-screen flash */}
          <div className="absolute inset-0 bg-gradient-radial from-gold/30 via-vermilion/10 to-transparent animate-fade-out" style={{ animationDuration: "1.2s" }} />

          {/* Rising rocket trails */}
          {rockets.map((r) => (
            <span
              key={`rocket-${r.id}`}
              className="absolute bottom-0 w-[3px] rounded-full"
              style={{
                left: `${r.left}%`,
                height: "60vh",
                background: "linear-gradient(to top, transparent, #fde58a, #ffffff)",
                animation: `rocket-rise ${r.duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${r.delay}ms both`,
                filter: "drop-shadow(0 0 6px #ffd86b)",
              }}
            />
          ))}

          {/* Multiple firework bursts across the screen */}
          {sparksPerBurst.map((burst) => (
            <div
              key={`burst-${burst.id}`}
              className="absolute"
              style={{ left: `${burst.x}%`, top: `${burst.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* Central flash */}
              <div
                className="absolute left-1/2 top-1/2 h-32 w-32 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,216,107,0.7) 35%, transparent 70%)",
                  animation: `cracker-flash 700ms ease-out ${burst.delay}ms both`,
                }}
              />
              {/* Shock ring */}
              <div
                className="absolute left-1/2 top-1/2 h-16 w-16 rounded-full border-2"
                style={{
                  borderColor: "rgba(255, 216, 107, 0.9)",
                  animation: `cracker-ring 1000ms cubic-bezier(0.22, 1, 0.36, 1) ${burst.delay}ms both`,
                }}
              />
              {/* Second ring */}
              <div
                className="absolute left-1/2 top-1/2 h-12 w-12 rounded-full border"
                style={{
                  borderColor: "rgba(231, 111, 81, 0.8)",
                  animation: `cracker-ring 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${burst.delay + 100}ms both`,
                }}
              />
              {/* Sparks */}
              {burst.sparks.map((s) => (
                <span
                  key={`s-${burst.id}-${s.id}`}
                  className="cracker-spark absolute left-1/2 top-1/2 rounded-full"
                  style={{
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    background: s.color,
                    boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}`,
                    ['--bx' as never]: `${s.dx}px`,
                    ['--by' as never]: `${s.dy}px`,
                    animationDelay: `${s.delay}ms`,
                    animationDuration: `${s.duration}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
