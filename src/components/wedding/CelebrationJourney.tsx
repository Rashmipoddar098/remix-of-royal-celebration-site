import { useEffect, useRef, useState } from "react";
import { events, type WeddingEvent } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";

const accentStyles: Record<WeddingEvent["accent"], { ring: string; chip: string; glow: string }> = {
  gold: { ring: "ring-gold/40", chip: "bg-gold/20 text-gold-deep", glow: "from-gold/30" },
  haldi: { ring: "ring-kesar/40", chip: "bg-kesar/25 text-kesar", glow: "from-kesar/30" },
  mehendi: { ring: "ring-emerald-700/30", chip: "bg-emerald-100 text-emerald-800", glow: "from-emerald-300/30" },
  sangeet: { ring: "ring-vermilion/40", chip: "bg-vermilion/20 text-vermilion", glow: "from-vermilion/30" },
  wedding: { ring: "ring-maroon/50", chip: "bg-maroon/15 text-maroon", glow: "from-maroon/40" },
  maroon: { ring: "ring-maroon/40", chip: "bg-maroon/10 text-maroon", glow: "from-maroon/25" },
};

function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const styles = accentStyles[event.accent];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isReverse = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`grid gap-8 md:grid-cols-2 md:gap-12 ${
        visible ? "animate-fade-up" : "opacity-0"
      } ${isReverse ? "md:[&>:first-child]:order-2" : ""}`}
    >
      {/* Image with temple arch */}
      <div className="relative">
        <div
          className={`relative overflow-hidden temple-arch shadow-royal ring-2 ring-offset-4 ring-offset-background ${styles.ring}`}
        >
          <img
            src={event.image}
            alt={`${event.name} ceremony`}
            loading="lazy"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${styles.glow} via-transparent to-transparent opacity-60`} />
        </div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className={`inline-flex items-center rounded-full ${styles.chip} px-4 py-1 font-display text-xs uppercase tracking-[0.3em] shadow-card`}>
            Chapter {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <h3 className="font-display text-4xl text-maroon sm:text-5xl">{event.name}</h3>
        <p className="mt-2 font-serif-elegant text-lg italic text-muted-foreground">{event.meaning}</p>

        <div className="mt-6 gold-divider w-24" />

        <dl className="mt-6 grid grid-cols-2 gap-4 font-serif-elegant text-maroon/90">
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-gold-deep">Date</dt>
            <dd className="mt-1 text-lg">{event.date}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-gold-deep">Day</dt>
            <dd className="mt-1 text-lg">{event.day}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-gold-deep">Time</dt>
            <dd className="mt-1 text-lg">{event.time}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.25em] text-gold-deep">Dress</dt>
            <dd className="mt-1 text-lg">{event.dress}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs uppercase tracking-[0.25em] text-gold-deep">Venue</dt>
            <dd className="mt-1 text-lg">{event.venue}</dd>
          </div>
        </dl>

        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-maroon/30 bg-card px-6 py-2.5 font-display text-xs uppercase tracking-[0.3em] text-maroon transition-all hover:border-gold hover:bg-maroon hover:text-ivory"
        >
          View Map
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

export function CelebrationJourney() {
  return (
    <section id="journey" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">
            Six Sacred Chapters
          </p>
          <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">Celebration Journey</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif-elegant italic text-muted-foreground">
            From the first promise to the final celebration — every ritual a verse in our story.
          </p>
        </div>

        <OrnateDivider />

        <div className="space-y-24">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
