import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { familySides, gallery, type FamilySide, type FamilyMember } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Users, Sparkles, X, ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

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
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          type: "spring", 
          stiffness: 40, 
          damping: 20, 
          delay: index * 0.3,
          mass: 1.2
        }}
        className="group relative flex w-full max-w-sm sm:max-w-md md:max-w-none flex-col items-center mx-auto overflow-hidden rounded-t-[140px] rounded-b-2xl bg-sandal/10 p-[3px] shadow-2xl transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
      >
        {/* Animated Rotating Gradient Border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_270deg,rgba(212,175,55,0.8)_360deg)] opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_180deg,transparent_0_270deg,rgba(128,0,0,0.6)_360deg)] opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Inner frame with a luxury double border and rich paper background */}
        <div className="relative z-10 flex h-full w-full flex-col items-center rounded-t-[137px] rounded-b-[13px] bg-gradient-to-b from-ivory via-ivory to-sandal/10 p-5 sm:p-7 md:p-8 backdrop-blur-md overflow-hidden border-[3px] border-double border-gold/40 shadow-inner">
          
          {/* Intricate Royal Corner Filigrees (All 4 Corners) */}
          {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 left-4 -rotate-90", "bottom-4 right-4 rotate-180"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-7 h-7 sm:w-10 sm:h-10 text-gold/50 pointer-events-none transition-all duration-700 group-hover:text-gold group-hover:scale-105 z-20`}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M10,10 L90,10 M10,10 L10,90" strokeWidth="3" />
                <path d="M10,30 C20,30 30,20 30,10" />
                <path d="M10,50 C30,50 50,30 50,10" />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="40" cy="15" r="2.5" fill="currentColor" />
                <circle cx="15" cy="40" r="2.5" fill="currentColor" />
              </svg>
            </div>
          ))}

          {/* Animated background glow inside the frame */}
          <motion.div 
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gold/15 blur-3xl pointer-events-none" 
          />

          {/* Elegant Indian Lotus Mandala (Floral Design) */}
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 w-64 sm:w-80 aspect-square text-gold/15 transition-all duration-1000 group-hover:text-gold/25 group-hover:scale-105 group-hover:rotate-6">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-sm">
              <circle cx="50" cy="50" r="6" />
              <path d="M50 44 C35 15 15 15 50 0 C85 15 65 15 50 44 Z" />
              <path d="M50 56 C35 85 15 85 50 100 C85 85 65 85 50 56 Z" />
              <path d="M44 50 C15 35 15 15 0 50 C15 85 35 85 44 50 Z" />
              <path d="M56 50 C85 35 85 15 100 50 C85 85 65 85 56 50 Z" />
              <path d="M45.5 45.5 C25 20 10 30 15 15 C30 10 20 25 45.5 45.5 Z" />
              <path d="M54.5 45.5 C75 20 90 30 85 15 C70 10 80 25 54.5 45.5 Z" />
              <path d="M45.5 54.5 C25 80 10 70 15 85 C30 90 20 75 45.5 54.5 Z" />
              <path d="M54.5 54.5 C75 80 90 70 85 85 C70 90 80 75 54.5 54.5 Z" />
              <circle cx="28" cy="28" r="1.5" />
              <circle cx="72" cy="28" r="1.5" />
              <circle cx="28" cy="72" r="1.5" />
              <circle cx="72" cy="72" r="1.5" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 2" />
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.2" />
            </svg>
          </div>

          {/* Left Responsive Floral Vine */}
          <div className="pointer-events-none absolute left-1 sm:left-3 top-1/3 bottom-12 w-3 sm:w-6 md:w-8 text-gold/25 transition-all duration-700 group-hover:text-gold/40 group-hover:-translate-x-0.5">
            <svg viewBox="0 0 30 200" fill="currentColor" className="w-full h-full object-contain">
              <path d="M15,0 L15,200" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
              <path d="M15,20 C22,15 28,20 22,28 C15,35 15,22 15,20 Z" />
              <path d="M15,50 C8,45 2,50 8,58 C15,65 15,52 15,50 Z" />
              <path d="M15,80 C22,75 28,80 22,88 C15,95 15,82 15,80 Z" />
              <path d="M15,110 C8,105 2,110 8,118 C15,125 15,112 15,110 Z" />
              <path d="M15,140 C22,135 28,140 22,148 C15,155 15,142 15,140 Z" />
              <path d="M15,170 C8,165 2,170 8,178 C15,185 15,172 15,170 Z" />
            </svg>
          </div>

          {/* Right Responsive Floral Vine */}
          <div className="pointer-events-none absolute right-1 sm:right-3 top-1/3 bottom-12 w-3 sm:w-6 md:w-8 text-gold/25 transition-all duration-700 group-hover:text-gold/40 group-hover:translate-x-0.5 transform -scale-x-100">
            <svg viewBox="0 0 30 200" fill="currentColor" className="w-full h-full object-contain">
              <path d="M15,0 L15,200" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
              <path d="M15,20 C22,15 28,20 22,28 C15,35 15,22 15,20 Z" />
              <path d="M15,50 C8,45 2,50 8,58 C15,65 15,52 15,50 Z" />
              <path d="M15,80 C22,75 28,80 22,88 C15,95 15,82 15,80 Z" />
              <path d="M15,110 C8,105 2,110 8,118 C15,125 15,112 15,110 Z" />
              <path d="M15,140 C22,135 28,140 22,148 C15,155 15,142 15,140 Z" />
              <path d="M15,170 C8,165 2,170 8,178 C15,185 15,172 15,170 Z" />
            </svg>
          </div>

          {/* Header */}
          <div className="relative z-10 text-center mb-10 pt-6">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
              className="font-display text-[10px] uppercase tracking-[0.4em] text-gold-deep sm:text-xs"
            >
              {side.title}
            </motion.p>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 + 0.5, duration: 0.8, ease: "easeOut" }}
              className="mt-4 font-display text-2xl text-maroon sm:text-3xl lg:text-4xl leading-tight drop-shadow-sm"
            >
              {side.subtitle}
            </motion.h3>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 + 0.8, duration: 0.8, ease: "circOut" }}
              className="mx-auto mt-5 h-[1px] w-16 bg-gradient-to-r from-transparent via-gold to-transparent origin-center" 
            />
          </div>

          {/* Arch Image Container - Jharokha Palace Balcony Window Design */}
          <div className="relative z-10 w-full max-w-[260px] flex-grow mt-4">
            {/* The Dome/Crown SVG of the Royal Jharokha */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[108%] h-9 text-gold-deep/80 z-20 pointer-events-none drop-shadow-md transition-all duration-700 group-hover:text-gold group-hover:scale-105">
              <svg viewBox="0 0 200 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Intricate Indian Royal triple-dome peak */}
                <path d="M0,40 C20,40 30,35 45,35 C60,35 70,40 85,25 C92,15 95,5 100,5 C105,5 108,15 115,25 C130,40 140,35 155,35 C170,35 180,40 200,40 L200,36 C180,36 170,31 155,31 C140,31 130,36 115,22 C108,12 105,2 100,2 C95,2 92,12 85,22 C70,36 60,31 45,31 C30,31 20,36 0,36 Z" />
                {/* Ornamental finial beads on dome peaks */}
                <circle cx="100" cy="2" r="2.5" />
                <circle cx="45" cy="31" r="1.5" />
                <circle cx="155" cy="31" r="1.5" />
              </svg>
            </div>

            {/* Background glow on hover */}
            <div className="absolute inset-0 rounded-t-[120px] rounded-b-lg bg-gold/20 blur-2xl transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
            
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[120px] rounded-b-lg border-[3px] border-gold/50 shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-700 group-hover:border-gold group-hover:shadow-[0_15px_40px_rgba(212,175,55,0.45)]">
              {/* Ken Burns effect: continuous slow scale and pan */}
              <motion.img
                src={side.groupImage}
                alt={`${side.title} group portrait`}
                loading="lazy"
                width={600}
                height={800}
                animate={{ scale: [1.05, 1.15, 1.05], objectPosition: ["50% 50%", "55% 45%", "50% 50%"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-125"
              />
              
              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
              
              {/* Floating Sparkles */}
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], rotate: [0, 45, 90] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-1/2 -translate-x-1/2 text-gold opacity-80"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              
              {/* Surname text centered at bottom of arch */}
              <div className="absolute inset-x-0 bottom-8 text-center transform transition-transform duration-500 group-hover:-translate-y-1">
                <span className="inline-block border-b border-gold/40 pb-1.5 font-display text-sm uppercase tracking-[0.35em] text-gold drop-shadow-md sm:text-base">
                  {side.surname}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="relative z-10 mt-8 sm:mt-10 text-center w-full">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group/btn relative mx-auto flex w-[90%] sm:w-auto items-center justify-center gap-3 sm:gap-4 overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-maroon via-[#7a1b1b] to-maroon px-6 sm:px-8 py-3.5 sm:py-4 font-display text-[11px] sm:text-[13px] uppercase tracking-[0.25em] text-ivory shadow-[0_5px_15px_rgba(128,0,0,0.3)] transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.35)] focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"
            >
              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-transform duration-[800ms] ease-out group-hover/btn:translate-x-full" />
              
              {/* Subtle inner animated ring */}
              <span className="absolute inset-1 rounded-full border border-gold/20 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100 group-hover/btn:animate-pulse" />
              
              <Users className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-gold/90 transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:rotate-6" />
              
              <span className="relative z-10 font-semibold tracking-[0.3em] text-ivory drop-shadow-md">
                Meet The Family
              </span>
            </button>
            
            <p className="mt-5 px-4 font-serif-elegant text-[12px] sm:text-[13.5px] italic text-muted-foreground transition-colors duration-500 group-hover:text-gold-deep">
              {isBride ? "Daughters carry the light of two homes" : "Sons honour the legacy of their lineage"}
            </p>
          </div>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile screen size for responsive 3D cover flow positions
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play timer (transitions center card every 6 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const getCardProps = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -gallery.length / 2) diff += gallery.length;
    if (diff > gallery.length / 2) diff -= gallery.length;

    const isActive = diff === 0;
    
    let x = "0%";
    let scale = 1;
    let rotateY = 0;
    let zIndex = 10 - Math.abs(diff);
    let opacity = 1;
    let pointerEvents: "auto" | "none" = "auto";

    if (diff === 0) {
      x = "0%";
      scale = 1;
      rotateY = 0;
      opacity = 1;
    } else if (diff === -1) {
      x = isMobile ? "-60%" : "-105%";
      scale = isMobile ? 0.76 : 0.84;
      rotateY = isMobile ? 25 : 35;
      opacity = isMobile ? 0.55 : 0.65;
    } else if (diff === 1) {
      x = isMobile ? "60%" : "105%";
      scale = isMobile ? 0.76 : 0.84;
      rotateY = isMobile ? -25 : -35;
      opacity = isMobile ? 0.55 : 0.65;
    } else {
      x = diff > 0 ? "200%" : "-200%";
      scale = 0.6;
      rotateY = diff > 0 ? -45 : 45;
      opacity = 0;
      pointerEvents = "none";
    }

    return { x, scale, rotateY, zIndex, opacity, pointerEvents, isActive, diff };
  };

  const royalQuotes = [
    {
      title: "Sacred Union",
      quote: "Two souls, one heart, a lifetime of beautiful moments in our royal palace fairytale.",
      desc: "Aanya & Arjun"
    },
    {
      title: "The Bride's Grace",
      quote: "A majestic grace, a soul so pure. Under the canopy of love, she stands elegant and demure.",
      desc: "Aanya's Radiance"
    },
    {
      title: "The Groom's Promise",
      quote: "A royal demeanor, a promise of protection, walking into a lifetime of endless affection.",
      desc: "Arjun's Honor"
    },
    {
      title: "Sacred Marigolds",
      quote: "Woven in sacred marigolds and infinite love, blessed by the heavens and stars above.",
      desc: "Divine Blessings"
    }
  ];

  // Precomputed petal data to avoid Math.random() on every render
  const PETALS = [
    { left: 8,  delay: 0,    dur: 14, swayAmp: 38, swayPhase: 0,    scale: 1.1, rot: [0,120,240,360] },
    { left: 17, delay: 1.8,  dur: 18, swayAmp: 50, swayPhase: 1,    scale: 0.8, rot: [0,90,180,360]  },
    { left: 26, delay: 3.5,  dur: 15, swayAmp: 30, swayPhase: 2,    scale: 1.3, rot: [0,60,180,360]  },
    { left: 35, delay: 0.6,  dur: 20, swayAmp: 55, swayPhase: 0.5,  scale: 0.9, rot: [0,45,270,360]  },
    { left: 44, delay: 2.2,  dur: 16, swayAmp: 42, swayPhase: 1.5,  scale: 1.2, rot: [0,135,225,360] },
    { left: 53, delay: 4.1,  dur: 22, swayAmp: 35, swayPhase: 2.5,  scale: 0.7, rot: [0,80,200,360]  },
    { left: 62, delay: 1.0,  dur: 17, swayAmp: 48, swayPhase: 0.8,  scale: 1.0, rot: [0,100,260,360] },
    { left: 71, delay: 5.0,  dur: 19, swayAmp: 60, swayPhase: 1.8,  scale: 1.4, rot: [0,150,300,360] },
    { left: 80, delay: 2.8,  dur: 21, swayAmp: 32, swayPhase: 3.0,  scale: 0.85,rot: [0,70,220,360]  },
    { left: 89, delay: 0.3,  dur: 13, swayAmp: 45, swayPhase: 0.2,  scale: 1.15,rot: [0,50,170,360]  },
    { left: 12, delay: 6.0,  dur: 24, swayAmp: 40, swayPhase: 1.2,  scale: 0.95,rot: [0,110,230,360] },
    { left: 23, delay: 3.0,  dur: 16, swayAmp: 52, swayPhase: 2.8,  scale: 1.05,rot: [0,95,185,360]  },
    { left: 47, delay: 1.4,  dur: 20, swayAmp: 36, swayPhase: 0.6,  scale: 1.2, rot: [0,145,290,360] },
    { left: 58, delay: 4.5,  dur: 18, swayAmp: 58, swayPhase: 2.1,  scale: 0.75,rot: [0,55,215,360]  },
    { left: 76, delay: 0.9,  dur: 23, swayAmp: 44, swayPhase: 1.7,  scale: 1.3, rot: [0,85,250,360]  },
    { left: 91, delay: 3.7,  dur: 15, swayAmp: 33, swayPhase: 2.4,  scale: 0.88,rot: [0,130,265,360] },
    { left: 5,  delay: 5.5,  dur: 19, swayAmp: 47, swayPhase: 0.9,  scale: 1.0, rot: [0,160,310,360] },
    { left: 38, delay: 2.5,  dur: 17, swayAmp: 53, swayPhase: 1.3,  scale: 1.18,rot: [0,75,195,360]  },
  ];

  return (
    <section
      id="family"
      className="relative px-4 pt-12 pb-4 sm:pt-16 sm:pb-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #FAF6EE 0%, #F6EDE2 45%, #ECDDBE 80%, #E8D5B0 100%)",
      }}
    >
      {/* ─── Layer 1 : Mughal Jaali SVG Repeating Watermark ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='none'/%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23C8A951' stroke-width='0.7' stroke-opacity='0.18'/%3E%3Ccircle cx='30' cy='30' r='7' fill='none' stroke='%23C8A951' stroke-width='0.5' stroke-opacity='0.14'/%3E%3Ccircle cx='0' cy='0' r='4' fill='none' stroke='%23C8A951' stroke-width='0.5' stroke-opacity='0.14'/%3E%3Ccircle cx='60' cy='0' r='4' fill='none' stroke='%23C8A951' stroke-width='0.5' stroke-opacity='0.14'/%3E%3Ccircle cx='0' cy='60' r='4' fill='none' stroke='%23C8A951' stroke-width='0.5' stroke-opacity='0.14'/%3E%3Ccircle cx='60' cy='60' r='4' fill='none' stroke='%23C8A951' stroke-width='0.5' stroke-opacity='0.14'/%3E%3Cline x1='30' y1='0' x2='30' y2='60' stroke='%23C8A951' stroke-width='0.3' stroke-opacity='0.1'/%3E%3Cline x1='0' y1='30' x2='60' y2='30' stroke='%23C8A951' stroke-width='0.3' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "60px 60px",
          opacity: 1,
        }}
      />

      {/* ─── Layer 2 : Left Palace Arch Column ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[9vw] min-w-[44px] max-w-[90px] flex-shrink-0"
        style={{ zIndex: 1 }}
      >
        <svg
          viewBox="0 0 90 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          {/* Outer arch border */}
          <rect x="2" y="0" width="86" height="800" rx="0" fill="url(#colGradL)" opacity="0.18" />
          <defs>
            <linearGradient id="colGradL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C8A951" />
              <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Vertical border line */}
          <line x1="78" y1="0" x2="78" y2="800" stroke="#C8A951" strokeWidth="1.2" strokeOpacity="0.35" />
          <line x1="74" y1="0" x2="74" y2="800" stroke="#C8A951" strokeWidth="0.4" strokeOpacity="0.18" />
          {/* Decorative lotus repeating along column */}
          {[80, 200, 320, 440, 560, 680].map((cy, idx) => (
            <g key={idx} transform={`translate(39, ${cy})`} opacity="0.45">
              <ellipse cx="0" cy="0" rx="14" ry="18" fill="#C8A951" fillOpacity="0.15" stroke="#C8A951" strokeWidth="0.6" strokeOpacity="0.5" />
              <path d="M0,-18 C-8,-9 -8,9 0,18 C8,9 8,-9 0,-18 Z" fill="#C8A951" fillOpacity="0.25" />
              <path d="M-14,0 C-7,-8 7,-8 14,0 C7,8 -7,8 -14,0 Z" fill="#C8A951" fillOpacity="0.25" />
              <circle cx="0" cy="0" r="3" fill="#C8A951" fillOpacity="0.6" />
            </g>
          ))}
          {/* Top arch capital */}
          <path d="M0,0 Q45,40 90,0" fill="#C8A951" fillOpacity="0.12" />
          <path d="M0,0 Q45,55 90,0" fill="none" stroke="#C8A951" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* ─── Layer 2 : Right Palace Arch Column ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-[9vw] min-w-[44px] max-w-[90px] flex-shrink-0"
        style={{ zIndex: 1 }}
      >
        <svg
          viewBox="0 0 90 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <rect x="2" y="0" width="86" height="800" rx="0" fill="url(#colGradR)" opacity="0.18" />
          <defs>
            <linearGradient id="colGradR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#C8A951" />
              <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="78" y1="0" x2="78" y2="800" stroke="#C8A951" strokeWidth="1.2" strokeOpacity="0.35" />
          <line x1="74" y1="0" x2="74" y2="800" stroke="#C8A951" strokeWidth="0.4" strokeOpacity="0.18" />
          {[80, 200, 320, 440, 560, 680].map((cy, idx) => (
            <g key={idx} transform={`translate(39, ${cy})`} opacity="0.45">
              <ellipse cx="0" cy="0" rx="14" ry="18" fill="#C8A951" fillOpacity="0.15" stroke="#C8A951" strokeWidth="0.6" strokeOpacity="0.5" />
              <path d="M0,-18 C-8,-9 -8,9 0,18 C8,9 8,-9 0,-18 Z" fill="#C8A951" fillOpacity="0.25" />
              <path d="M-14,0 C-7,-8 7,-8 14,0 C7,8 -7,8 -14,0 Z" fill="#C8A951" fillOpacity="0.25" />
              <circle cx="0" cy="0" r="3" fill="#C8A951" fillOpacity="0.6" />
            </g>
          ))}
          <path d="M0,0 Q45,40 90,0" fill="#C8A951" fillOpacity="0.12" />
          <path d="M0,0 Q45,55 90,0" fill="none" stroke="#C8A951" strokeWidth="1" strokeOpacity="0.3" />
        </svg>
      </div>

      {/* ─── Layer 3 : Left Hanging Golden Jhumar ─── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-[2vw] w-[13vw] min-w-[56px] max-w-[120px] origin-top"
        style={{ zIndex: 2 }}
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id="jhumGoldL" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE97A" />
              <stop offset="60%" stopColor="#C8A951" />
              <stop offset="100%" stopColor="#8B6914" />
            </radialGradient>
            <radialGradient id="gemRedL" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#8B0000" />
            </radialGradient>
          </defs>
          {/* Chain */}
          {[0,14,28,42,56].map((y,i)=>(
            <ellipse key={i} cx="60" cy={y+6} rx="5" ry="4" fill="url(#jhumGoldL)" opacity="0.9"/>
          ))}
          {/* Main crown disc */}
          <ellipse cx="60" cy="75" rx="36" ry="9" fill="url(#jhumGoldL)" opacity="0.95" />
          <ellipse cx="60" cy="73" rx="30" ry="6" fill="#FFE97A" opacity="0.35" />
          {/* Gem stones on crown */}
          {[-22,-11,0,11,22].map((dx,i)=>(
            <ellipse key={i} cx={60+dx} cy="75" rx="4.5" ry="5" fill="url(#gemRedL)" opacity="0.9"/>
          ))}
          {/* Central body orb */}
          <ellipse cx="60" cy="98" rx="20" ry="15" fill="url(#jhumGoldL)" opacity="0.95" />
          <ellipse cx="60" cy="93" rx="12" ry="7" fill="#FFE97A" opacity="0.4" />
          {/* Second tier disc */}
          <ellipse cx="60" cy="115" rx="28" ry="7" fill="url(#jhumGoldL)" opacity="0.9" />
          {[-18,-9,0,9,18].map((dx,i)=>(
            <ellipse key={i} cx={60+dx} cy="115" rx="3.5" ry="4" fill="url(#gemRedL)" opacity="0.85"/>
          ))}
          {/* Hanging chains / strands */}
          {[-24,-16,-8,0,8,16,24].map((dx,i)=>(
            <g key={i}>
              <line x1={60+dx} y1="122" x2={60+dx} y2={148+(i%3)*8} stroke="#C8A951" strokeWidth="1" opacity="0.7"/>
              <ellipse cx={60+dx} cy={152+(i%3)*8} rx="4" ry="5.5" fill="url(#jhumGoldL)" opacity="0.9"/>
              <ellipse cx={60+dx} cy={150+(i%3)*8} rx="2.5" ry="1.5" fill="#FFE97A" opacity="0.5"/>
            </g>
          ))}
          {/* Bottom fringe drops */}
          {[-20,-10,0,10,20].map((dx,i)=>(
            <g key={i}>
              <line x1={60+dx} y1={168+(i%2)*10} x2={60+dx} y2={195+(i%2)*10} stroke="#C8A951" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2"/>
              <circle cx={60+dx} cy={198+(i%2)*10} r="3.5" fill="url(#gemRedL)" opacity="0.9"/>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* ─── Layer 3 : Right Hanging Golden Jhumar ─── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 right-[2vw] w-[13vw] min-w-[56px] max-w-[120px] origin-top"
        style={{ zIndex: 2 }}
        animate={{ rotate: [2.5, -2.5, 2.5] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg" style={{ transform: "scaleX(-1)" }}>
          <defs>
            <radialGradient id="jhumGoldR" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE97A" />
              <stop offset="60%" stopColor="#C8A951" />
              <stop offset="100%" stopColor="#8B6914" />
            </radialGradient>
            <radialGradient id="gemRedR" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#8B0000" />
            </radialGradient>
          </defs>
          {[0,14,28,42,56].map((y,i)=>(
            <ellipse key={i} cx="60" cy={y+6} rx="5" ry="4" fill="url(#jhumGoldR)" opacity="0.9"/>
          ))}
          <ellipse cx="60" cy="75" rx="36" ry="9" fill="url(#jhumGoldR)" opacity="0.95" />
          <ellipse cx="60" cy="73" rx="30" ry="6" fill="#FFE97A" opacity="0.35" />
          {[-22,-11,0,11,22].map((dx,i)=>(
            <ellipse key={i} cx={60+dx} cy="75" rx="4.5" ry="5" fill="url(#gemRedR)" opacity="0.9"/>
          ))}
          <ellipse cx="60" cy="98" rx="20" ry="15" fill="url(#jhumGoldR)" opacity="0.95" />
          <ellipse cx="60" cy="93" rx="12" ry="7" fill="#FFE97A" opacity="0.4" />
          <ellipse cx="60" cy="115" rx="28" ry="7" fill="url(#jhumGoldR)" opacity="0.9" />
          {[-18,-9,0,9,18].map((dx,i)=>(
            <ellipse key={i} cx={60+dx} cy="115" rx="3.5" ry="4" fill="url(#gemRedR)" opacity="0.85"/>
          ))}
          {[-24,-16,-8,0,8,16,24].map((dx,i)=>(
            <g key={i}>
              <line x1={60+dx} y1="122" x2={60+dx} y2={148+(i%3)*8} stroke="#C8A951" strokeWidth="1" opacity="0.7"/>
              <ellipse cx={60+dx} cy={152+(i%3)*8} rx="4" ry="5.5" fill="url(#jhumGoldR)" opacity="0.9"/>
              <ellipse cx={60+dx} cy={150+(i%3)*8} rx="2.5" ry="1.5" fill="#FFE97A" opacity="0.5"/>
            </g>
          ))}
          {[-20,-10,0,10,20].map((dx,i)=>(
            <g key={i}>
              <line x1={60+dx} y1={168+(i%2)*10} x2={60+dx} y2={195+(i%2)*10} stroke="#C8A951" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2"/>
              <circle cx={60+dx} cy={198+(i%2)*10} r="3.5" fill="url(#gemRedR)" opacity="0.9"/>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* ─── Layer 4 : Floating Crimson Rose Petals ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden style={{ zIndex: 1 }}>
        {PETALS.map((p, i) => (
          <motion.div
            key={`rose-${i}`}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: 0,
              width: `${14 * p.scale}px`,
              height: `${20 * p.scale}px`,
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [
                `${-p.swayAmp * Math.sin(p.swayPhase)}px`,
                `${p.swayAmp * Math.sin(p.swayPhase + 1)}px`,
                `${-p.swayAmp * Math.sin(p.swayPhase + 2)}px`,
              ],
              rotate: p.rot,
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
              times: [0, 0.08, 0.92, 1],
            }}
          >
            <svg viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
              <defs>
                <radialGradient id={`petalGrad${i}`} cx="35%" cy="25%" r="70%">
                  <stop offset="0%" stopColor="#FF8FA3" />
                  <stop offset="45%" stopColor="#C41E3A" />
                  <stop offset="100%" stopColor="#6B0F1A" />
                </radialGradient>
              </defs>
              <path
                d="M14 2 C18 6 24 10 22 20 C20 30 14 38 14 38 C14 38 8 30 6 20 C4 10 10 6 14 2 Z"
                fill={`url(#petalGrad${i})`}
                opacity="0.88"
              />
              <path
                d="M14 5 C17 9 20 14 19 22 C18 28 14 35 14 35"
                stroke="#FF6B6B"
                strokeWidth="0.5"
                strokeOpacity="0.4"
                fill="none"
              />
            </svg>
          </motion.div>
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
          className="text-center mb-8"
        >
          <motion.p variants={fadeUpVariant} className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">A Glimpse</motion.p>
          <motion.h2 variants={fadeUpVariant} className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-gradient-royal drop-shadow-sm leading-tight">Our Moments</motion.h2>
          <motion.div variants={fadeUpVariant} className="mx-auto mt-5 gold-divider w-32" />
        </motion.div>

        {/* Palace Balcony 3D Cover Flow Gallery Stage */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full flex flex-col items-center justify-center py-8 select-none"
        >
          {/* Main 3D Stage Viewport */}
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] h-[390px] sm:h-[460px] md:h-[490px] flex items-center justify-center [perspective:1000px] overflow-visible">
            {gallery.map((img, i) => {
              const { x, scale, rotateY, zIndex, opacity, pointerEvents, isActive } = getCardProps(i);
              const data = royalQuotes[i % royalQuotes.length];
              
              return (
                <motion.div
                  key={i}
                  style={{ 
                    zIndex,
                    pointerEvents,
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    x,
                    scale,
                    rotateY,
                    opacity
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26
                  }}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(i);
                    }
                  }}
                  className={`absolute w-full h-full cursor-pointer rounded-2xl transition-shadow duration-500 ${
                    isActive 
                      ? "shadow-[0_20px_50px_rgba(212,175,55,0.4)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.55)]" 
                      : "shadow-md hover:shadow-lg"
                  }`}
                >
                  {/* Elegant Front Card Frame */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-ivory p-[3px] border border-gold/45 shadow-inner flex flex-col">
                    <div className="relative w-full h-full overflow-hidden rounded-xl bg-sandal/10 border border-gold/25 p-3 flex flex-col justify-between">
                      
                      {/* Intricate Royal Jharokha Dome SVG Crown on Active Card */}
                      {isActive && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[104%] h-8 text-gold-deep z-20 pointer-events-none drop-shadow-md transition-all duration-700">
                          <svg viewBox="0 0 200 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M0,40 C20,40 30,35 45,35 C60,35 70,40 85,25 C92,15 95,5 100,5 C105,5 108,15 115,25 C130,40 140,35 155,35 C170,35 180,40 200,40 L200,36 C180,36 170,31 155,31 C140,31 130,36 115,22 C108,12 105,2 100,2 C95,2 92,12 85,22 C70,36 60,31 45,31 C30,31 20,36 0,36 Z" />
                            <circle cx="100" cy="2" r="2" />
                            <circle cx="45" cy="31" r="1" />
                            <circle cx="155" cy="31" r="1" />
                          </svg>
                        </div>
                      )}

                      {/* Traditional corner filigree design */}
                      {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 left-4 -rotate-90", "bottom-4 right-4 rotate-180"].map((pos, idx) => (
                        <span key={idx} className={`absolute ${pos} w-4 h-4 text-gold/50 pointer-events-none z-20`} aria-hidden>
                          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                            <path d="M0,0 L100,0 C100,0 80,10 70,30 C60,50 50,40 40,60 C30,80 10,80 0,100 Z" />
                          </svg>
                        </span>
                      ))}

                      {/* Image Frame */}
                      <div className="relative w-full flex-grow overflow-hidden rounded-lg border border-gold/15 shadow-inner">
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          width={800}
                          height={1000}
                          className="w-full h-full object-cover transition-transform duration-[4000ms] ease-out hover:scale-110"
                        />
                        {/* Ambient elegant gradient layer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-maroon/80 via-transparent to-transparent opacity-75" />
                        
                        {/* Pulsing overlay for active image */}
                        {isActive && (
                          <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gold/5 pointer-events-none"
                          />
                        )}

                        {/* Floating stars */}
                        {isActive && (
                          <motion.div 
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8], rotate: [0, 45, 90] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-4 right-4 text-gold/80"
                          >
                            <Sparkles className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>

                      {/* Premium Text Panel at Card Bottom */}
                      <div className="mt-2 text-center z-10 min-h-[58px] flex flex-col justify-center">
                        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-deep font-semibold">
                          {data.title}
                        </p>
                        {isActive ? (
                          <motion.p 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-1 font-serif-elegant text-[11px] sm:text-[12px] text-maroon font-medium italic px-2 leading-relaxed"
                          >
                            "{data.quote}"
                          </motion.p>
                        ) : (
                          <span className="mt-0.5 inline-block font-serif-elegant text-[9px] text-muted-foreground italic">
                            Click to Focus
                          </span>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Luxury Gold Control Panel */}
          <div className="mt-8 flex items-center justify-between gap-6 w-full max-w-[280px] sm:max-w-[320px] px-2">
            
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="group relative flex items-center justify-center p-3 rounded-full border border-gold/40 bg-gradient-to-r from-maroon to-[#6b0f0f] text-gold hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_10px_rgba(128,0,0,0.3)]"
              aria-label="Previous Moment"
            >
              <span className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-full" />
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Lotus Flower Dot Indicators */}
            <div className="flex items-center gap-2.5">
              {gallery.map((_, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    className="relative flex items-center justify-center h-6 w-6 focus:outline-none"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="activeLotus"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="text-gold-deep"
                      >
                        <svg viewBox="0 0 100 100" fill="currentColor" className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]">
                          <path d="M50 20 C35 35 35 60 50 80 C65 60 65 35 50 20 Z" />
                          <path d="M50 40 C20 45 15 70 50 80 C85 70 80 45 50 40 Z" />
                          <path d="M50 55 C10 60 5 80 50 85 C95 80 90 60 50 55 Z" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors duration-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="group relative flex items-center justify-center p-3 rounded-full border border-gold/40 bg-gradient-to-r from-maroon to-[#6b0f0f] text-gold hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_10px_rgba(128,0,0,0.3)]"
              aria-label="Next Moment"
            >
              <span className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-full" />
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
