import { Link } from "@tanstack/react-router";

export type JourneyStep = {
  to: "/invitation" | "/celebration" | "/family" | "/countdown" | "/rsvp";
  label: string;
  short: string;
};

export const journeySteps: JourneyStep[] = [
  { to: "/invitation", label: "The Invitation", short: "Invite" },
  { to: "/celebration", label: "Celebration Journey", short: "Events" },
  { to: "/family", label: "Family & Memories", short: "Family" },
  { to: "/countdown", label: "The Countdown", short: "Countdown" },
  { to: "/rsvp", label: "RSVP & Contacts", short: "RSVP" },
];

interface JourneyNavProps {
  currentIndex: number;
  /** When true, renders without outer vertical margins (for embedding inside a section). */
  embedded?: boolean;
}

export function JourneyNav({ currentIndex, embedded = false }: JourneyNavProps) {
  const prev = journeySteps[currentIndex - 1];
  const next = journeySteps[currentIndex + 1];

  return (
    <nav
      aria-label="Wedding journey navigation"
      className={`relative w-full ${
        embedded ? "" : "mt-10 mb-8"
      }`}
    >
      <div className="mx-auto w-full max-w-5xl px-4 pt-1 pb-4 sm:px-6">
        {/* Compact inline row: prev | dots | next */}
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {/* Prev */}
          <div className="flex-1">
            {prev ? (
              <Link
                to={prev.to}
                className="group inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gradient-to-r from-maroon/80 to-maroon/60 px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm shadow-[0_2px_12px_rgba(107,33,33,0.25)] transition-all duration-300 hover:border-gold hover:from-maroon hover:to-maroon/90 hover:shadow-[0_4px_18px_rgba(107,33,33,0.4)] hover:scale-[1.03] sm:px-4 sm:py-2.5 sm:text-[11px] sm:gap-2.5"
              >
                <span
                  aria-hidden
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 text-gold/90 transition-transform duration-300 group-hover:-translate-x-0.5 sm:h-6 sm:w-6"
                >
                  ←
                </span>
                <span>{prev.short}</span>
              </Link>
            ) : (
              <span aria-hidden />
            )}
          </div>

          {/* Next — Premium Royal CTA */}
          <div className="flex flex-1 justify-end">
            {next ? (
              <Link
                to={next.to}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/70 bg-gradient-to-r from-maroon via-vermilion/90 to-maroon px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.25em] text-gold shadow-[0_4px_20px_rgba(107,33,33,0.45),0_0_0_1px_rgba(212,175,55,0.2)] transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_6px_28px_rgba(107,33,33,0.6),0_0_0_2px_rgba(212,175,55,0.35)] hover:border-gold sm:gap-3 sm:px-5 sm:py-3 sm:text-[12px]"
              >
                {/* Gold shimmer sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                {/* Subtle inner glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.12), transparent 70%)" }}
                />
                <span className="relative font-semibold tracking-[0.3em]">{next.short}</span>
                <span
                  aria-hidden
                  className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/60 bg-gold/15 text-gold transition-all duration-300 group-hover:bg-gold/25 group-hover:border-gold group-hover:translate-x-1 sm:h-7 sm:w-7"
                >
                  →
                </span>
              </Link>
            ) : (
              <Link
                to="/"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/70 bg-gradient-to-r from-maroon via-vermilion/90 to-maroon px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.25em] text-gold shadow-[0_4px_20px_rgba(107,33,33,0.45)] transition-all duration-300 hover:scale-[1.06] hover:shadow-[0_6px_28px_rgba(107,33,33,0.6)] sm:px-5 sm:py-3 sm:text-[12px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span aria-hidden className="text-gold/80">✦</span>
                <span className="relative font-semibold tracking-[0.3em]">Home</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Premium ornate bottom border running full-width */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 select-none">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-deep to-transparent" />
        <div className="mt-0.5 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>
    </nav>
  );
}
