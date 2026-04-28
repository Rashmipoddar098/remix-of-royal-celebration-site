import { useEffect, useRef, useState } from "react";
import { events, type WeddingEvent } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";

const accentStyles: Record<
  WeddingEvent["accent"],
  { ring: string; chip: string; glow: string; badge: string; dot: string }
> = {
  gold:    { ring: "ring-gold/50",          chip: "bg-gold/20 text-gold-deep",       glow: "from-gold/40",       badge: "from-gold to-gold-deep",        dot: "bg-gold" },
  haldi:   { ring: "ring-kesar/50",         chip: "bg-kesar/25 text-kesar",          glow: "from-kesar/40",      badge: "from-kesar to-gold-deep",       dot: "bg-kesar" },
  mehendi: { ring: "ring-emerald-700/40",   chip: "bg-emerald-100 text-emerald-800", glow: "from-emerald-300/40",badge: "from-emerald-500 to-emerald-700", dot: "bg-emerald-600" },
  sangeet: { ring: "ring-vermilion/50",     chip: "bg-vermilion/20 text-vermilion",  glow: "from-vermilion/40",  badge: "from-vermilion to-maroon",      dot: "bg-vermilion" },
  wedding: { ring: "ring-maroon/60",        chip: "bg-maroon/15 text-maroon",        glow: "from-maroon/50",     badge: "from-maroon to-vermilion",      dot: "bg-maroon" },
  maroon:  { ring: "ring-maroon/40",        chip: "bg-maroon/10 text-maroon",        glow: "from-maroon/30",     badge: "from-maroon to-gold-deep",      dot: "bg-maroon" },
};

function EventCard({ event, index, isLast }: { event: WeddingEvent; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const styles = accentStyles[event.accent];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isReverse = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`relative ${visible ? "animate-fade-up" : "opacity-0"}`}
    >
      {/* Timeline node (desktop only) */}
      <div className="pointer-events-none absolute left-1/2 top-8 hidden -translate-x-1/2 lg:block">
        <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${styles.dot} ring-4 ring-ivory shadow-gold`}>
          <span className="absolute inset-0 animate-ping rounded-full opacity-40" />
        </span>
      </div>

      <div
        className={`grid items-center gap-8 sm:gap-10 md:gap-14 lg:grid-cols-2 ${
          isReverse ? "lg:[&>:first-child]:order-2" : ""
        }`}
      >
        {/* Image with temple arch + ornate frame */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Decorative corner motifs */}
          <span aria-hidden className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-gold/60 rounded-tl-md sm:h-10 sm:w-10" />
          <span aria-hidden className="absolute -right-2 -top-2 h-8 w-8 border-r-2 border-t-2 border-gold/60 rounded-tr-md sm:h-10 sm:w-10" />
          <span aria-hidden className="absolute -left-2 -bottom-2 h-8 w-8 border-l-2 border-b-2 border-gold/60 rounded-bl-md sm:h-10 sm:w-10" />
          <span aria-hidden className="absolute -right-2 -bottom-2 h-8 w-8 border-r-2 border-b-2 border-gold/60 rounded-br-md sm:h-10 sm:w-10" />

          <div
            className={`group relative overflow-hidden temple-arch shadow-royal ring-2 ring-offset-4 ring-offset-background ${styles.ring}`}
          >
            <img
              src={event.image}
              alt={`${event.name} ceremony`}
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            {/* Color glow overlay */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${styles.glow} via-transparent to-transparent opacity-70`} />
            {/* Bottom maroon veil with title for mobile elegance */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon/70 via-maroon/20 to-transparent" />
            {/* Shimmer sweep on hover */}
            <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
              <span className="royal-plaque-shimmer" />
            </span>
          </div>

          {/* Decorative ornament badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r ${styles.badge} text-ivory shadow-gold ring-2 ring-ivory sm:h-10 sm:w-10`}>
              <span aria-hidden className="font-script text-lg sm:text-xl">✦</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isReverse ? "lg:items-end lg:text-right" : ""}`}>
          <div className={`inline-flex items-center gap-2 self-start ${isReverse ? "lg:self-end" : ""}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot} ${visible ? "animate-char-pop" : "opacity-0"}`} />
            <span
              className={`inline-block rounded-full px-3 py-1 font-display text-[10px] uppercase tracking-[0.3em] text-hover-track cursor-default ${styles.chip} ${visible ? "animate-word-slide" : "opacity-0"}`}
              style={{ animationDelay: "120ms" }}
            >
              {event.day}
            </span>
          </div>

          <h3
            className={`mt-3 font-display text-3xl sm:text-4xl md:text-5xl ${visible ? "animate-letter-rise" : "opacity-0"}`}
            style={{ animationDelay: "240ms" }}
          >
            <span className="text-shimmer-royal text-hover-shimmer cursor-default">{event.name}</span>
          </h3>
          <p
            className={`mt-2 font-script text-3xl leading-tight text-gold-deep sm:text-4xl text-hover-script cursor-default ${visible ? "animate-script-draw animate-text-glow" : "opacity-0"}`}
            style={{ animationDelay: "420ms" }}
          >
            {event.meaning}
          </p>

          <div
            className={`mt-5 gold-divider w-24 ${isReverse ? "lg:ml-auto" : ""} ${visible ? "animate-underline-grow" : "opacity-0"}`}
            style={{ transformOrigin: isReverse ? "right center" : "left center" }}
          />

          {/* Ornate detail card */}
          <div
            className={`mt-6 relative rounded-2xl border border-gold/30 bg-card/70 p-5 shadow-card backdrop-blur-sm sm:p-6 ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "560ms" }}
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            <dl className={`grid grid-cols-2 gap-x-4 gap-y-4 font-serif-elegant text-maroon/90 text-left sm:gap-x-6 text-stagger ${visible ? "is-visible" : ""}`}>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-gold-deep">Date</dt>
                <dd className="mt-1 text-base sm:text-lg">{event.date}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-gold-deep">Time</dt>
                <dd className="mt-1 text-base sm:text-lg">{event.time}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-gold-deep">Dress Code</dt>
                <dd className="mt-1 text-base sm:text-lg">{event.dress}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-gold-deep">Venue</dt>
                <dd className="mt-1 text-base leading-snug sm:text-lg">{event.venue}</dd>
              </div>
            </dl>
          </div>

          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group mt-6 inline-flex w-fit items-center gap-2 self-start overflow-hidden rounded-full bg-gradient-royal px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-ivory shadow-royal transition-all hover:scale-[1.04] ${
              isReverse ? "lg:self-end" : ""
            }`}
          >
            <span aria-hidden className="pointer-events-none absolute inset-0 royal-plaque-shimmer" />
            <span className="relative">View Map</span>
            <span aria-hidden className="relative transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Section divider between cards */}
      {!isLast && (
        <div className="mt-16 flex items-center justify-center gap-4 sm:mt-20">
          <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/60" />
          <span className="font-script text-3xl text-gold-deep">❀</span>
          <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/60" />
        </div>
      )}
    </article>
  );
}

export function CelebrationJourney() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden px-4 py-20 sm:py-24 md:py-28"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%), radial-gradient(900px 500px at 100% 100%, color-mix(in oklab, var(--vermilion) 14%, transparent), transparent 65%), radial-gradient(800px 500px at 0% 80%, color-mix(in oklab, var(--kesar) 16%, transparent), transparent 60%), linear-gradient(180deg, var(--ivory) 0%, oklch(0.95 0.04 80) 50%, var(--ivory) 100%)",
      }}
    >
      {/* Subtle paisley/mandala SVG pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><g fill='none' stroke='%23a76a2e' stroke-width='0.8'><circle cx='60' cy='60' r='28'/><circle cx='60' cy='60' r='18'/><circle cx='60' cy='60' r='8'/><path d='M60 12 Q72 36 60 60 Q48 36 60 12 Z'/><path d='M60 108 Q72 84 60 60 Q48 84 60 108 Z'/><path d='M12 60 Q36 48 60 60 Q36 72 12 60 Z'/><path d='M108 60 Q84 48 60 60 Q84 72 108 60 Z'/><circle cx='60' cy='12' r='2'/><circle cx='60' cy='108' r='2'/><circle cx='12' cy='60' r='2'/><circle cx='108' cy='60' r='2'/></g></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Top & bottom ornate borders */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      {/* Decorative animated glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl animate-float-soft" />
        <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-vermilion/20 blur-3xl animate-float-soft" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-kesar/25 blur-3xl animate-float-soft" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon/5 blur-3xl" />
      </div>

      {/* Corner mandala flourishes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 opacity-20 animate-spin-slow sm:h-80 sm:w-80"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke='%23b8860b' stroke-width='1'><circle cx='100' cy='100' r='90'/><circle cx='100' cy='100' r='70'/><circle cx='100' cy='100' r='50'/><circle cx='100' cy='100' r='30'/><g><path d='M100 10 L110 50 L100 90 L90 50 Z'/><path d='M100 110 L110 150 L100 190 L90 150 Z'/><path d='M10 100 L50 110 L90 100 L50 90 Z'/><path d='M110 100 L150 110 L190 100 L150 90 Z'/></g></svg>\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 opacity-20 animate-spin-reverse sm:h-80 sm:w-80"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='none' stroke='%23b8860b' stroke-width='1'><circle cx='100' cy='100' r='90'/><circle cx='100' cy='100' r='70'/><circle cx='100' cy='100' r='50'/><circle cx='100' cy='100' r='30'/><g><path d='M100 10 L110 50 L100 90 L90 50 Z'/><path d='M100 110 L110 150 L100 190 L90 150 Z'/><path d='M10 100 L50 110 L90 100 L50 90 Z'/><path d='M110 100 L150 110 L190 100 L150 90 Z'/></g></svg>\")",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 animate-fade-up">
            <span className="h-px w-10 bg-gold/60 sm:w-16" />
            <p className="font-serif-elegant text-xs uppercase tracking-[0.4em] text-shimmer-gold sm:text-sm">
              Six Sacred Chapters
            </p>
            <span className="h-px w-10 bg-gold/60 sm:w-16" />
          </div>

          <h2
            className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl animate-letter-rise"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-shimmer-royal animate-text-glow">Celebration Journey</span>
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl font-script text-3xl text-gold-deep sm:text-4xl animate-script-draw animate-text-glow"
            style={{ animationDelay: "500ms" }}
          >
            Every ritual a verse in our story
          </p>
          <p
            className="mx-auto mt-3 max-w-lg font-serif-elegant italic text-muted-foreground text-sm sm:text-base animate-fade-up"
            style={{ animationDelay: "750ms" }}
          >
            From the first promise to the final celebration — we invite you to walk this sacred path with us.
          </p>
        </div>

        <OrnateDivider />

        {/* Timeline spine (desktop) */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block"
          />

          <div className="space-y-20 sm:space-y-24 md:space-y-28">
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                isLast={i === events.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Closing flourish */}
        <div className="mt-20 text-center">
          <div className="mx-auto inline-flex items-center gap-3">
            <span className="h-px w-12 bg-gold/60" />
            <span className="font-script text-4xl text-shimmer-gold animate-text-glow animate-float-soft inline-block">श्री</span>
            <span className="h-px w-12 bg-gold/60" />
          </div>
          <p className="mt-3 font-serif-elegant italic text-muted-foreground text-sm sm:text-base animate-fade-up">
            We await your presence to bless this journey.
          </p>
        </div>
      </div>
    </section>
  );
}
