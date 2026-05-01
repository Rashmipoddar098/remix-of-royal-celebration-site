import { useState } from "react";
import { familySides, gallery, type FamilySide, type FamilyMember } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Sparkles, X } from "lucide-react";

function FamilySideCard({ side, index }: { side: FamilySide; index: number }) {
  const [open, setOpen] = useState(false);
  const isBride = side.side === "bride";

  return (
    <>
      <article
        className="family-card group relative overflow-hidden rounded-sm bg-card opacity-0 animate-fade-up"
        style={{ animationDelay: `${index * 200}ms`, animationFillMode: "both" }}
      >
        {/* Animated gold shimmer frame */}
        <div className="pointer-events-none absolute inset-0 rounded-sm royal-shimmer-frame" aria-hidden />

        {/* Corner mandalas */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
          <span
            key={i}
            className={`pointer-events-none absolute ${pos} h-6 w-6 text-gold-deep/70 transition-transform duration-700 group-hover:scale-125 group-hover:text-gold`}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm0 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            </svg>
          </span>
        ))}

        <div className="relative z-10 px-5 pt-7 text-center sm:px-8 sm:pt-9">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-deep sm:text-xs">
            {side.title}
          </p>
          <div className="mx-auto mt-2 gold-divider w-16" />
          <h3 className="mt-3 font-display text-xl text-maroon sm:text-2xl">{side.subtitle}</h3>
        </div>

        {/* Group portrait with arched frame */}
        <div className="relative z-10 mx-5 mt-5 sm:mx-8 sm:mt-6">
          <div className="relative overflow-hidden temple-arch ring-1 ring-gold/40 shadow-card aspect-[4/5]">
            <img
              src={side.groupImage}
              alt={`${side.title} group portrait`}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
            />
            {/* Gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/10 to-transparent" />
            {/* Floating sparkles */}
            <span className="pointer-events-none absolute left-4 top-4 text-gold sparkle-twinkle" style={{ animationDuration: "3.2s" }} aria-hidden>
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="pointer-events-none absolute right-4 top-10 text-gold sparkle-twinkle" style={{ animationDuration: "4s", animationDelay: "0.8s" }} aria-hidden>
              <Sparkles className="h-3 w-3" />
            </span>
            {/* Surname plaque */}
            <div className="absolute inset-x-3 bottom-3 rounded-sm border border-gold/50 bg-maroon/85 px-3 py-2 backdrop-blur-sm">
              <p className="text-center font-display text-[10px] uppercase tracking-[0.35em] text-gold sm:text-xs">
                {side.surname}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 px-5 pb-7 pt-5 text-center sm:px-8 sm:pb-9 sm:pt-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/60 bg-gradient-to-r from-maroon via-vermilion to-maroon px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-ivory shadow-gold transition-all duration-500 hover:scale-105 hover:shadow-royal sm:text-xs"
            aria-label={`View ${side.title} members`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <Users className="h-3.5 w-3.5" />
            <span className="relative">View Family Members</span>
          </button>
          <p className="mt-3 font-serif-elegant text-xs italic text-muted-foreground">
            {isBride ? "Daughters carry the light of two homes" : "Sons honour the legacy of their lineage"}
          </p>
        </div>
      </article>

      {/* Members modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl border-gold/40 bg-gradient-ivory p-0 shadow-royal sm:rounded-md [&>button]:hidden">
          <div className="relative max-h-[85vh] overflow-y-auto">
            {/* Decorative top border */}
            <div className="sticky top-0 z-10 bg-gradient-ivory pb-3 pt-5 backdrop-blur-sm">
              <div className="px-5 sm:px-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 text-center">
                    <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-deep sm:text-xs">
                      {side.title}
                    </p>
                    <DialogTitle className="mt-1 font-display text-2xl text-maroon sm:text-3xl">
                      {side.subtitle}
                    </DialogTitle>
                    <DialogDescription className="mt-2 font-serif-elegant text-sm italic text-muted-foreground">
                      With love, blessings & cherished memories
                    </DialogDescription>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-gold/40 bg-ivory p-1.5 text-maroon transition hover:bg-sandal"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mx-auto mt-3 gold-divider w-32" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 px-5 pb-7 pt-4 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:pb-9 md:grid-cols-4">
              {side.members.map((m: FamilyMember, i: number) => (
                <div
                  key={m.name}
                  className="member-tile group/m relative opacity-0 animate-fade-up text-center"
                  style={{ animationDelay: `${i * 110}ms`, animationFillMode: "both" }}
                >
                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full ring-2 ring-gold/50 ring-offset-2 ring-offset-ivory shadow-card transition-all duration-500 group-hover/m:ring-gold group-hover/m:shadow-gold group-hover/m:scale-105">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/m:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-maroon/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/m:opacity-100" />
                  </div>
                  <h4 className="mt-3 font-display text-sm text-maroon sm:text-base">{m.name}</h4>
                  <p className="mt-1 font-serif-elegant text-xs italic text-gold-deep sm:text-sm">
                    {m.relation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function FamilyMemories() {
  return (
    <section id="family" className="relative bg-gradient-ivory px-4 py-20 sm:py-24">
      {/* Background decorative motifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float-soft" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-vermilion/10 blur-3xl animate-float-soft" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep animate-fade-up">
            With Gratitude
          </p>
          <h2 className="mt-3 font-display text-3xl text-maroon sm:text-5xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            With the Blessings of Our Families
          </h2>
          <div className="mx-auto mt-4 gold-divider w-40 animate-fade-up" style={{ animationDelay: "200ms" }} />
          <p className="mx-auto mt-5 max-w-xl font-serif-elegant italic text-muted-foreground animate-fade-up" style={{ animationDelay: "260ms" }}>
            Two families, one celebration — bound by love, tradition, and timeless blessings.
          </p>
        </div>

        {/* Two-side family cards */}
        <div className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-2">
          {familySides.map((s, i) => (
            <FamilySideCard key={s.side} side={s} index={i} />
          ))}
        </div>

        <OrnateDivider />

        {/* Our Moments Gallery */}
        <div className="text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">A Glimpse</p>
          <h2 className="mt-3 font-display text-3xl text-maroon sm:text-5xl">Our Moments</h2>
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

        {/* Blessings Wall */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">A Humble Note</p>
          <h2 className="mt-3 font-display text-3xl text-maroon sm:text-5xl">With Your Blessings</h2>
          <p className="mt-6 font-serif-elegant text-lg italic leading-relaxed text-maroon/80 sm:text-xl">
            Your presence, your prayers, and your love are the truest gifts we could ask for.
            May our journey carry the warmth of your blessings, today and always.
          </p>
        </div>
      </div>
    </section>
  );
}
