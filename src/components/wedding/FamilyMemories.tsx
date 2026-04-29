import { useState } from "react";
import { familySides, gallery, type FamilySide, type FamilyMember } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Sparkles, X, Heart, Crown } from "lucide-react";
import mandala from "@/assets/divider-mandala.png";

function CornerOrnament({ pos }: { pos: string }) {
  return (
    <span className={`pointer-events-none absolute ${pos} h-8 w-8 sm:h-10 sm:w-10`} aria-hidden>
      <svg viewBox="0 0 40 40" className="h-full w-full text-gold drop-shadow-[0_0_6px_color-mix(in_oklab,var(--gold)_50%,transparent)]">
        <path d="M2 2 L14 2 M2 2 L2 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="2" cy="2" r="1.6" fill="currentColor" />
        <path d="M6 6 Q12 8 14 14" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
        <path d="M10 4 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1 z" fill="currentColor" opacity="0.85" />
      </svg>
    </span>
  );
}

function FamilySideCard({ side, index }: { side: FamilySide; index: number }) {
  const [open, setOpen] = useState(false);
  const isBride = side.side === "bride";

  return (
    <>
      <article
        className="group relative opacity-0 animate-fade-up"
        style={{ animationDelay: `${index * 220}ms`, animationFillMode: "both" }}
      >
        {/* Animated golden border wrapper */}
        <div className="gold-border-anim relative overflow-hidden rounded-[28px] shadow-royal">
          {/* Inner ivory canvas */}
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-ivory p-1">
            {/* Rotating background mandalas */}
            <img
              src={mandala}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 opacity-[0.08] animate-slow-spin"
            />
            <img
              src={mandala}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 opacity-[0.07] animate-slow-spin-rev"
            />

            {/* Corner ornaments */}
            <CornerOrnament pos="top-3 left-3" />
            <CornerOrnament pos="top-3 right-3 rotate-90" />
            <CornerOrnament pos="bottom-3 left-3 -rotate-90" />
            <CornerOrnament pos="bottom-3 right-3 rotate-180" />

            {/* Header crest */}
            <div className="relative z-10 px-5 pt-8 text-center sm:px-8 sm:pt-10">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/50 bg-maroon/90 px-4 py-1.5 shadow-gold">
                {isBride ? (
                  <Heart className="h-3.5 w-3.5 text-gold sparkle-twinkle" />
                ) : (
                  <Crown className="h-3.5 w-3.5 text-gold sparkle-twinkle" />
                )}
                <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">
                  {side.title}
                </p>
              </div>
              <h3 className="mt-4 font-display text-2xl text-maroon sm:text-3xl">
                {side.subtitle}
              </h3>
              <p className="mt-1 font-script text-2xl text-gold-deep sm:text-3xl">
                {side.surname}
              </p>
              <div className="mx-auto mt-3 gold-divider w-24" />
            </div>

            {/* Group portrait — temple arch with layered sparkle */}
            <div className="relative z-10 mx-5 mt-6 sm:mx-10 sm:mt-7">
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-2 rounded-t-full opacity-60 blur-2xl bg-gradient-to-b from-gold/40 to-vermilion/20" aria-hidden />
                <div className="relative overflow-hidden temple-arch ring-2 ring-gold/60 shadow-card aspect-[4/5]">
                  <img
                    src={side.groupImage}
                    alt={`${side.title} group portrait`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                  />
                  {/* Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/15 to-transparent" />
                  {/* Hover light sweep */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-full" />

                  {/* Sparkles */}
                  <span className="pointer-events-none absolute left-4 top-5 text-gold sparkle-twinkle" style={{ animationDuration: "3s" }} aria-hidden>
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="pointer-events-none absolute right-5 top-12 text-gold sparkle-twinkle" style={{ animationDuration: "4s", animationDelay: "0.6s" }} aria-hidden>
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="pointer-events-none absolute left-8 bottom-20 text-gold sparkle-twinkle" style={{ animationDuration: "3.6s", animationDelay: "1.2s" }} aria-hidden>
                    <Sparkles className="h-3 w-3" />
                  </span>

                  {/* Bottom plaque with running shimmer */}
                  <div className="absolute inset-x-4 bottom-4 overflow-hidden rounded-sm border border-gold/60 bg-maroon/90 px-4 py-2.5 backdrop-blur-sm">
                    <p className="text-center font-display text-[10px] uppercase tracking-[0.35em] text-gold sm:text-xs">
                      With Love & Blessings
                    </p>
                    <span className="royal-plaque-shimmer" aria-hidden />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="relative z-10 px-5 pb-9 pt-6 text-center sm:px-10 sm:pb-10 sm:pt-7">
              <p className="mb-4 font-serif-elegant text-xs italic text-muted-foreground sm:text-sm">
                {isBride
                  ? "“Daughters carry the light of two homes.”"
                  : "“Sons honour the legacy of their lineage.”"}
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-gold/60 bg-gradient-to-r from-maroon via-vermilion to-maroon px-6 py-3 font-display text-[11px] uppercase tracking-[0.35em] text-ivory shadow-gold transition-all duration-500 hover:scale-[1.03] hover:shadow-royal sm:w-auto sm:text-xs"
                aria-label={`View ${side.title} members`}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-transform duration-[900ms] group-hover/btn:translate-x-full" />
                <Users className="h-3.5 w-3.5" />
                <span className="relative">Meet the Family</span>
                <Sparkles className="h-3 w-3 sparkle-twinkle" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Members modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl border-gold/40 bg-gradient-ivory p-0 shadow-royal sm:rounded-[20px] [&>button]:hidden">
          <div className="relative max-h-[85vh] overflow-y-auto">
            {/* Decorative top header */}
            <div className="sticky top-0 z-10 border-b border-gold/30 bg-gradient-ivory/95 pb-4 pt-5 backdrop-blur-md">
              <div className="px-5 sm:px-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 text-center">
                    <div className="inline-flex items-center gap-2">
                      {isBride ? <Heart className="h-3 w-3 text-gold-deep" /> : <Crown className="h-3 w-3 text-gold-deep" />}
                      <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-deep sm:text-xs">
                        {side.title}
                      </p>
                    </div>
                    <DialogTitle className="mt-1 font-display text-2xl text-maroon sm:text-3xl">
                      {side.subtitle}
                    </DialogTitle>
                    <DialogDescription className="mt-1 font-script text-xl text-gold-deep sm:text-2xl">
                      {side.surname}
                    </DialogDescription>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-gold/40 bg-ivory p-1.5 text-maroon transition hover:bg-sandal hover:scale-110"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mx-auto mt-3 gold-divider w-32" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 px-5 pb-9 pt-6 sm:gap-7 sm:px-8 sm:pb-10 md:grid-cols-4">
              {side.members.map((m: FamilyMember, i: number) => (
                <div
                  key={m.name}
                  className="group/m relative opacity-0 animate-fade-up text-center"
                  style={{ animationDelay: `${i * 110}ms`, animationFillMode: "both" }}
                >
                  <div className="relative mx-auto aspect-square w-full">
                    {/* Animated golden ring */}
                    <div className="gold-border-anim absolute inset-0 rounded-full" />
                    <div className="absolute inset-[3px] overflow-hidden rounded-full ring-1 ring-ivory shadow-card transition-all duration-500 group-hover/m:scale-105 group-hover/m:shadow-gold">
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover/m:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/m:opacity-100" />
                    </div>
                    {/* Floating sparkle on hover */}
                    <Sparkles className="pointer-events-none absolute -right-1 -top-1 h-4 w-4 text-gold opacity-0 transition-all duration-500 group-hover/m:opacity-100 group-hover/m:rotate-12" />
                  </div>
                  <h4 className="mt-3 font-display text-sm text-maroon sm:text-base">{m.name}</h4>
                  <p className="mt-0.5 font-serif-elegant text-xs italic text-gold-deep sm:text-sm">
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
    <section id="family" className="relative bg-peacock-royal px-4 py-20 sm:py-28">
      {/* Background decorative motifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-float-soft" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-vermilion/10 blur-3xl animate-float-soft" style={{ animationDelay: "1.5s" }} />
        <img
          src={mandala}
          alt=""
          aria-hidden
          className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 opacity-[0.05] animate-slow-spin"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 animate-fade-up">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            <p className="font-serif-elegant text-sm uppercase tracking-[0.4em] text-gold-deep">
              With Gratitude
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
          <h2 className="mt-4 font-display text-3xl text-maroon sm:text-5xl animate-fade-up" style={{ animationDelay: "120ms" }}>
            With the Blessings of Our Families
          </h2>
          <div className="mx-auto mt-4 gold-divider w-40 animate-fade-up" style={{ animationDelay: "200ms" }} />
          <p className="mx-auto mt-5 max-w-xl font-serif-elegant italic text-muted-foreground animate-fade-up" style={{ animationDelay: "260ms" }}>
            Two families, one celebration — bound by love, tradition, and timeless blessings.
          </p>
        </div>

        {/* Two-side family cards with central crest */}
        <div className="relative mt-14">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {familySides.map((s, i) => (
              <FamilySideCard key={s.side} side={s} index={i} />
            ))}
          </div>

          {/* Central crest — desktop only */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block">
            <div className="crest-pulse relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/70 bg-gradient-to-br from-maroon via-vermilion to-maroon shadow-royal">
                <span className="font-script text-4xl text-gold">&</span>
              </div>
            </div>
          </div>
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
