import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { familySides, gallery, type FamilySide, type FamilyMember } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Sparkles, X } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

function FamilySideCard({ side, index }: { side: FamilySide; index: number }) {
  const [open, setOpen] = useState(false);
  const isBride = side.side === "bride";

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="family-card group relative overflow-hidden rounded-sm bg-card royal-card-tilt"
      >
        {/* Animated gold shimmer frame */}
        <div className="pointer-events-none absolute inset-0 rounded-sm royal-shimmer-frame" aria-hidden />

        {/* Hover sweep light */}
        <div className="royal-hover-sweep" aria-hidden />

        {/* Corner mandalas */}
        {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
          <span
            key={i}
            className={`royal-corner-motif pointer-events-none absolute ${pos} h-6 w-6 text-gold-deep/70`}
            style={{ '--rot': i % 2 === 0 ? '45deg' : '-45deg' } as any}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
              <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm0 8l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            </svg>
          </span>
        ))}

        <div className="relative z-10 px-4 pt-6 text-center sm:px-8 sm:pt-9">
          <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-deep sm:text-xs animate-text-glow">
            {side.title}
          </p>
          <div className="mx-auto mt-2 gold-divider w-16" />
          <h3 className="royal-name mt-3 font-display text-2xl text-maroon sm:text-3xl lg:text-4xl text-gradient-royal drop-shadow-sm leading-tight">{side.subtitle}</h3>
        </div>

        {/* Group portrait with unique animated square frame */}
        <div className="relative z-10 mx-auto mt-6 mb-2 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          {/* Animated spinning background halo */}
          <div aria-hidden className="absolute inset-0 animate-spin-slow opacity-70">
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="h-full w-full text-gold-deep/50">
              <circle cx="50" cy="50" r="48" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="41" strokeWidth="1" />
              <path d="M50 9 L54 46 L91 50 L54 54 L50 91 L46 54 L9 50 L46 46 Z" strokeWidth="0.5" fill="currentColor" fillOpacity="0.15" />
              <path d="M50 9 L54 46 L91 50 L54 54 L50 91 L46 54 L9 50 L46 46 Z" strokeWidth="0.5" fill="currentColor" fillOpacity="0.15" transform="rotate(45 50 50)" />
            </svg>
          </div>

          <div className="relative h-[82%] w-[82%] overflow-hidden rounded-xl border border-gold/60 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-700 group-hover:scale-110 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] group-hover:rotate-3">
            <img
              src={side.groupImage}
              alt={`${side.title} group portrait`}
              loading="lazy"
              width={512}
              height={512}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
            />
            {/* Gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Floating sparkles */}
            <motion.span 
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-2 top-2 text-gold" aria-hidden>
              <Sparkles className="h-4 w-4" />
            </motion.span>
            
            {/* Surname plaque inside the square */}
            <div className="absolute inset-x-2 bottom-2 overflow-hidden rounded-md border border-gold/40 bg-maroon/95 px-2 py-1.5 backdrop-blur-md transition-colors duration-500 group-hover:border-gold">
              <div className="royal-plaque-shimmer" aria-hidden />
              <p className="relative text-center font-display text-[9px] uppercase tracking-[0.3em] text-gold sm:text-[10px]">
                {side.surname}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 px-4 pb-6 pt-5 text-center sm:px-8 sm:pb-9 sm:pt-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/60 bg-gradient-to-r from-maroon via-vermilion to-maroon px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.3em] text-ivory shadow-gold transition-all duration-500 hover:scale-105 hover:shadow-royal hover:border-gold sm:text-xs"
            aria-label={`View ${side.title} members`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <Users className="h-3.5 w-3.5" />
            <span className="relative">View Family Members</span>
          </button>
          <p className="mt-3 font-serif-elegant text-xs italic text-muted-foreground group-hover:text-gold-deep transition-colors duration-500">
            {isBride ? "Daughters carry the light of two homes" : "Sons honour the legacy of their lineage"}
          </p>
        </div>
      </motion.article>

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
                    className="rounded-full border border-gold/40 bg-ivory p-1.5 text-maroon transition hover:bg-sandal hover:text-maroon hover:scale-110"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mx-auto mt-3 gold-divider w-32" />
              </div>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 px-4 pb-7 pt-4 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:pb-9 md:grid-cols-4"
            >
              {side.members.map((m: FamilyMember, i: number) => (
                <motion.div
                  key={m.name}
                  variants={fadeUpVariant}
                  className="member-tile group/m relative text-center"
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
                  <h4 className="mt-3 font-display text-sm text-maroon transition-colors duration-300 group-hover/m:text-gold-deep sm:text-base">{m.name}</h4>
                  <p className="mt-1 font-serif-elegant text-xs italic text-gold-deep sm:text-sm">
                    {m.relation}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function FamilyMemories() {
  return (
    <section id="family" className="relative px-4 pt-12 pb-4 sm:pt-16 sm:pb-6 overflow-hidden">
      {/* Background decorative motifs & floating petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div 
          animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" 
        />
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
          transition={{ duration: 8, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-vermilion/15 blur-3xl" 
        />
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-gold/40 blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.p variants={fadeUpVariant} className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">
            With Gratitude
          </motion.p>
          <motion.h2 variants={fadeUpVariant} className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-shimmer-royal drop-shadow-sm leading-tight">
            With the Blessings of Our Families
          </motion.h2>
          <motion.div variants={fadeUpVariant} className="mx-auto mt-6 gold-divider w-48" />
        </motion.div>

        {/* Two-side family cards */}
        <div className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-2">
          {familySides.map((s, i) => (
            <FamilySideCard key={s.side} side={s} index={i} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 mb-12 sm:mt-24 sm:mb-16"
        >
          <OrnateDivider />
        </motion.div>

        {/* Our Moments Gallery */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.p variants={fadeUpVariant} className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">A Glimpse</motion.p>
          <motion.h2 variants={fadeUpVariant} className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-gradient-royal drop-shadow-sm leading-tight">Our Moments</motion.h2>
          <motion.div variants={fadeUpVariant} className="mx-auto mt-5 gold-divider w-32" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-10 sm:mt-14 columns-2 gap-3 sm:columns-3 sm:gap-4 md:columns-4 lg:columns-4 pb-8 sm:pb-12"
        >
          {gallery.map((img, i) => (
            <motion.div
              variants={fadeUpVariant}
              key={i}
              className="group relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-md shadow-card ornate-border royal-card-tilt bg-card p-1 sm:p-2"
            >
              <div className="relative w-full overflow-hidden rounded-sm bg-muted/20">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="w-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-maroon/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="royal-hover-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                
                <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full p-3 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="mx-auto mb-1.5 gold-divider w-10" />
                  <p className="text-center font-serif-elegant text-xs italic text-gold-deep opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    Forever &amp; Always
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
