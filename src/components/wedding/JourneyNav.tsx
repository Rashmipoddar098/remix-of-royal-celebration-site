import { Link } from "@tanstack/react-router";

export type JourneyStep = {
  to: "/invitation" | "/celebration" | "/family" | "/rsvp";
  label: string;
  short: string;
};

export const journeySteps: JourneyStep[] = [
  { to: "/invitation", label: "The Invitation", short: "Invite" },
  { to: "/celebration", label: "Celebration Journey", short: "Events" },
  { to: "/family", label: "Family & Memories", short: "Family" },
  { to: "/rsvp", label: "RSVP & Blessings", short: "RSVP" },
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
      className={`relative mx-auto w-full max-w-3xl px-4 ${
        embedded ? "" : "mt-10 mb-8"
      }`}
    >
      {/* Compact inline row: prev | dots | next */}
      <div className="flex items-center justify-between gap-3 sm:gap-5">
        {/* Prev */}
        <div className="flex-1">
          {prev ? (
            <Link
              to={prev.to}
              className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/70 px-3 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-maroon backdrop-blur-sm transition-all hover:border-gold hover:bg-card hover:shadow-card sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-[11px]"
            >
              <span
                aria-hidden
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gold/40 text-maroon transition-transform group-hover:-translate-x-0.5 sm:h-6 sm:w-6"
              >
                ←
              </span>
              <span className="hidden sm:inline">{prev.short}</span>
            </Link>
          ) : (
            <span aria-hidden />
          )}
        </div>

        {/* Center dots */}
        <ol className="flex items-center justify-center gap-2 sm:gap-2.5">
          {journeySteps.map((step, i) => {
            const isActive = i === currentIndex;
            const isDone = i < currentIndex;
            return (
              <li key={step.to}>
                <Link
                  to={step.to}
                  aria-label={`Go to ${step.label}`}
                  aria-current={isActive ? "page" : undefined}
                  className="group block"
                >
                  <span
                    className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-500 sm:h-3 sm:w-3 ${
                      isActive
                        ? "bg-gradient-royal scale-125 shadow-gold"
                        : isDone
                        ? "bg-gold"
                        : "bg-gold/30 group-hover:bg-gold/60"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-vermilion/50" />
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Next */}
        <div className="flex flex-1 justify-end">
          {next ? (
            <Link
              to={next.to}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-royal px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.25em] text-ivory shadow-royal transition-all hover:scale-[1.04] sm:gap-3 sm:px-5 sm:py-3 sm:text-[11px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 royal-plaque-shimmer"
              />
              <span className="relative hidden sm:inline">{next.short}</span>
              <span
                aria-hidden
                className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-ivory/15 text-ivory ring-1 ring-gold/50 transition-transform group-hover:translate-x-0.5 sm:h-7 sm:w-7"
              >
                →
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/70 px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.25em] text-maroon backdrop-blur-sm transition-all hover:border-gold hover:bg-card sm:px-5 sm:text-[11px]"
            >
              <span aria-hidden>✦</span>
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
