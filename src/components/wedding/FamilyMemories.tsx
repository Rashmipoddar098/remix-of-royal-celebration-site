import { families, gallery } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";

export function FamilyMemories() {
  return (
    <section id="family" className="relative bg-gradient-ivory px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* A. Family Blessings */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">
            With Gratitude
          </p>
          <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">
            With the Blessings of Our Families
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[families.bride, families.groom].map((f) => (
            <div key={f.title} className="ornate-border rounded-sm bg-card px-8 py-10 text-center shadow-card">
              <p className="font-display text-xs uppercase tracking-[0.35em] text-gold-deep">{f.title}</p>
              <div className="mx-auto mt-4 gold-divider w-16" />
              <p className="mt-6 font-serif-elegant text-xl text-maroon">{f.parents}</p>
              <p className="mt-4 font-serif-elegant text-sm italic text-muted-foreground">{f.elders}</p>
            </div>
          ))}
        </div>

        <OrnateDivider />

        {/* B. Our Moments Gallery */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">A Glimpse</p>
          <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">Our Moments</h2>
          <p className="mx-auto mt-4 max-w-xl font-serif-elegant italic text-muted-foreground">
            Pages from a story still being written — captured in light, memory, and love.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {gallery.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-sm shadow-card ring-1 ring-gold/30 ${
                i % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] md:translate-y-8"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <OrnateDivider />

        {/* C. Blessings Wall */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">A Humble Note</p>
          <h2 className="mt-3 font-display text-4xl text-maroon sm:text-5xl">With Your Blessings</h2>
          <p className="mt-6 font-serif-elegant text-xl italic leading-relaxed text-maroon/80">
            Your presence, your prayers, and your love are the truest gifts we could ask for.
            May our journey carry the warmth of your blessings, today and always.
          </p>
        </div>
      </div>
    </section>
  );
}
