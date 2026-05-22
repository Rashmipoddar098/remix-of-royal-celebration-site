import { useEffect, useRef, useState } from "react";
import { events, type WeddingEvent } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Calendar, Clock, Shirt, MapPin } from "lucide-react";
import { RoyalBackground } from "./RoyalBackground";

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
        <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]">
          {/* Decorative corner motifs */}
          <span aria-hidden className="absolute -left-2 -top-2 h-6 w-6 border-l-2 border-t-2 border-gold/60 rounded-tl-md sm:h-8 sm:w-8" />
          <span aria-hidden className="absolute -right-2 -top-2 h-6 w-6 border-r-2 border-t-2 border-gold/60 rounded-tr-md sm:h-8 sm:w-8" />
          <span aria-hidden className="absolute -left-2 -bottom-2 h-6 w-6 border-l-2 border-b-2 border-gold/60 rounded-bl-md sm:h-8 sm:w-8" />
          <span aria-hidden className="absolute -right-2 -bottom-2 h-6 w-6 border-r-2 border-b-2 border-gold/60 rounded-br-md sm:h-8 sm:w-8" />

          {/* Soft pulsing halo behind frame */}
          <div
            aria-hidden
            className={`pointer-events-none absolute -inset-4 rounded-[40%] bg-gradient-to-br ${styles.glow} via-transparent to-transparent blur-2xl animate-halo-pulse`}
          />

          <div
            className={`group relative overflow-hidden temple-arch shadow-royal ring-2 ring-offset-4 ring-offset-background frame-aurora ${styles.ring}`}
          >
            <img
              src={event.image}
              alt={`${event.name} ceremony`}
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover animate-ken-burns transition-transform duration-[1200ms] group-hover:scale-110"
            />
            {/* Color glow overlay */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${styles.glow} via-transparent to-transparent opacity-70`} />
            {/* Bottom maroon veil with title for mobile elegance */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-maroon/70 via-maroon/20 to-transparent" />
            {/* Continuous shimmer sweep */}
            <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="royal-plaque-shimmer" />
            </span>
            {/* Drifting sparkle */}
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/4 left-0 h-2 w-2 rounded-full bg-ivory/90 shadow-[0_0_12px_4px_rgba(255,236,179,0.85)] animate-drift-sparkle"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-2/3 left-0 h-1.5 w-1.5 rounded-full bg-gold/90 shadow-[0_0_10px_3px_rgba(212,175,55,0.8)] animate-drift-sparkle"
              style={{ animationDelay: "3s", animationDuration: "9s" }}
            />
          </div>

          {/* Decorative ornament badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${styles.badge} text-ivory shadow-gold ring-2 ring-ivory sm:h-9 sm:w-9`}>
              <span aria-hidden className="font-script text-base sm:text-lg">✦</span>
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

          <div
            className={`mt-4 gold-divider w-24 ${isReverse ? "lg:ml-auto" : ""} ${visible ? "animate-underline-grow" : "opacity-0"}`}
            style={{ transformOrigin: isReverse ? "right center" : "left center" }}
          />

          {/* Ornate detail card */}
          <div
            className={`mt-6 relative rounded-2xl border border-gold/30 bg-card/70 p-4 sm:p-6 shadow-card backdrop-blur-sm ${visible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "560ms" }}
          >
            <dl className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-serif-elegant text-maroon/90 text-left text-stagger ${visible ? "is-visible" : ""}`}>
              <div className="group-text-hover flex flex-col gap-1.5 rounded-xl border border-gold/10 bg-gold/5 p-3.5 transition-colors hover:bg-gold/10 hover:border-gold/30 sm:p-4">
                <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-deep text-hover-track cursor-default">
                  <Calendar className="h-3.5 w-3.5 text-gold-deep" />
                  Date
                </dt>
                <dd className="text-base sm:text-lg group-text-target font-medium">{event.date}</dd>
              </div>
              <div className="group-text-hover flex flex-col gap-1.5 rounded-xl border border-gold/10 bg-gold/5 p-3.5 transition-colors hover:bg-gold/10 hover:border-gold/30 sm:p-4">
                <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-deep text-hover-track cursor-default">
                  <Clock className="h-3.5 w-3.5 text-gold-deep" />
                  Time
                </dt>
                <dd className="text-base sm:text-lg group-text-target font-medium">{event.time}</dd>
              </div>
              <div className="col-span-1 sm:col-span-2 group-text-hover flex flex-col gap-1.5 rounded-xl border border-gold/10 bg-gold/5 p-3.5 transition-colors hover:bg-gold/10 hover:border-gold/30 sm:p-4">
                <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-deep text-hover-track cursor-default">
                  <Shirt className="h-3.5 w-3.5 text-gold-deep" />
                  Dress Code
                </dt>
                <dd className="text-base sm:text-lg group-text-target font-medium">{event.dress}</dd>
              </div>
              <div className="col-span-1 sm:col-span-2 group-text-hover flex flex-col gap-1.5 rounded-xl border border-gold/10 bg-gold/5 p-3.5 transition-colors hover:bg-gold/10 hover:border-gold/30 sm:p-4">
                <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-deep text-hover-track cursor-default">
                  <MapPin className="h-3.5 w-3.5 text-gold-deep" />
                  Venue
                </dt>
                <dd className="text-base leading-snug sm:text-lg group-text-target font-medium">{event.venue}</dd>
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
      className="relative px-4 pt-12 pb-1 sm:pt-16 sm:pb-2"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #FAF6EE 0%, #F6EDE2 45%, #ECDDBE 80%, #E8D5B0 100%)",
      }}
    >
      <RoyalBackground idPrefix="cj" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 animate-fade-up">
            <span className="h-px w-10 bg-gold/60 sm:w-16" />
            <p className="font-serif-elegant text-xs uppercase tracking-[0.4em] text-shimmer-gold text-hover-track cursor-default sm:text-sm">
              Six Sacred Chapters
            </p>
            <span className="h-px w-10 bg-gold/60 sm:w-16" />
          </div>

          <h2
            className="mt-4 font-display text-4xl leading-tight sm:text-5xl md:text-6xl animate-letter-rise pb-2"
            style={{ animationDelay: "200ms" }}
          >
            <span className="text-shimmer-royal animate-text-glow text-hover-shimmer cursor-default">Celebration Journey</span>
          </h2>
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
            <span className="font-script text-4xl text-shimmer-gold animate-text-glow animate-float-soft text-hover-script cursor-default inline-block">श्री</span>
            <span className="h-px w-12 bg-gold/60" />
          </div>
          <p className="mt-3 font-serif-elegant italic text-muted-foreground text-sm sm:text-base animate-fade-up text-hover-glow cursor-default">
            We await your presence to bless this journey.
          </p>
        </div>
      </div>
    </section>
  );
}
