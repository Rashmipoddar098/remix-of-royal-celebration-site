import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { familySides, couple, guestName } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Phone, MessageCircle, Users, Utensils, Sparkles, Pencil, Send, X } from "lucide-react";
import { RoyalBackground } from "./RoyalBackground";

/* ─────────────────────────────────────────
   RSVP FORM TYPES & DEFAULTS
───────────────────────────────────────── */
type RsvpData = {
  guestCount: number;
  attending: "yes" | "no";
  events: string[];
  diet: "veg" | "non-veg" | "jain";
  note: string;
};

const DEFAULT_RSVP: RsvpData = {
  guestCount: 1,
  attending: "yes",
  events: ["Wedding"],
  diet: "veg",
  note: "",
};

const EVENT_OPTIONS = ["Haldi", "Mehndi", "Wedding", "Reception"];

/* ─────────────────────────────────────────
   RSVP FORM MODAL
───────────────────────────────────────── */
function RsvpFormModal({
  open,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial: RsvpData;
  onClose: () => void;
  onSubmit: (data: RsvpData) => void;
}) {
  const [data, setData] = useState<RsvpData>(initial);

  useEffect(() => {
    if (open) setData(initial);
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const toggleEvent = (evt: string) => {
    setData((d) => ({
      ...d,
      events: d.events.includes(evt) ? d.events.filter((e) => e !== evt) : [...d.events, evt],
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-maroon/70 via-black/60 to-maroon/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.55 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-hidden rounded-[2rem]"
            style={{
              background: "linear-gradient(145deg, rgba(255,250,240,0.98) 0%, rgba(250,245,230,0.96) 50%, rgba(245,235,210,0.98) 100%)",
              boxShadow: "0 25px 80px rgba(107,33,33,0.45), 0 0 0 1px rgba(212,175,55,0.5)",
            }}
          >
            {/* Gold top arch */}
            <div className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.9) 30%, rgba(255,216,107,1) 50%, rgba(212,175,55,0.9) 70%, transparent)" }}
            />

            {/* Corner ornaments */}
            {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} text-gold/50 text-base select-none pointer-events-none`}>❋</div>
            ))}

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ivory/80 text-maroon transition-all duration-300 hover:scale-110 hover:bg-maroon hover:text-ivory"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
                  <p className="font-serif-elegant text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold-deep">RSVP Details</p>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-gradient-royal leading-tight">
                  Share Your Details
                </h3>
                <p className="mt-2 font-serif-elegant text-xs sm:text-sm italic text-maroon/60">
                  Help us prepare for your warm presence
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(data);
                }}
                className="space-y-5"
              >
                {/* Attending */}
                <div>
                  <label className="font-serif-elegant text-xs uppercase tracking-[0.25em] text-gold-deep flex items-center gap-2 mb-2">
                    <Sparkles className="h-3.5 w-3.5" /> Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["yes", "no"] as const).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setData((d) => ({ ...d, attending: v }))}
                        className={`rounded-xl border-2 px-4 py-2.5 font-serif-elegant text-sm capitalize transition-all duration-300 ${
                          data.attending === v
                            ? "border-gold bg-gradient-to-br from-maroon to-vermilion text-ivory shadow-[0_6px_20px_rgba(107,33,33,0.35)]"
                            : "border-gold/30 bg-ivory/60 text-maroon hover:border-gold/60"
                        }`}
                      >
                        {v === "yes" ? "Yes, with joy" : "Sorry, no"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest count */}
                <div>
                  <label className="font-serif-elegant text-xs uppercase tracking-[0.25em] text-gold-deep flex items-center gap-2 mb-2">
                    <Users className="h-3.5 w-3.5" /> Number of guests
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setData((d) => ({ ...d, guestCount: Math.max(1, d.guestCount - 1) }))}
                      className="h-10 w-10 rounded-full border-2 border-gold/40 bg-ivory text-maroon text-lg font-bold transition hover:bg-maroon hover:text-ivory"
                    >−</button>
                    <div className="flex-1 text-center font-display text-3xl text-gradient-royal py-2 rounded-xl border-2 border-gold/30 bg-ivory/60">
                      {data.guestCount}
                    </div>
                    <button
                      type="button"
                      onClick={() => setData((d) => ({ ...d, guestCount: Math.min(20, d.guestCount + 1) }))}
                      className="h-10 w-10 rounded-full border-2 border-gold/40 bg-ivory text-maroon text-lg font-bold transition hover:bg-maroon hover:text-ivory"
                    >+</button>
                  </div>
                </div>

                {/* Events */}
                <div>
                  <label className="font-serif-elegant text-xs uppercase tracking-[0.25em] text-gold-deep mb-2 block">
                    Events you will join
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {EVENT_OPTIONS.map((evt) => {
                      const active = data.events.includes(evt);
                      return (
                        <button
                          type="button"
                          key={evt}
                          onClick={() => toggleEvent(evt)}
                          className={`rounded-xl border-2 px-3 py-2 font-serif-elegant text-sm transition-all duration-300 ${
                            active
                              ? "border-gold bg-gradient-to-br from-gold/30 to-kesar/20 text-maroon shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
                              : "border-gold/30 bg-ivory/60 text-maroon/70 hover:border-gold/60"
                          }`}
                        >
                          {active ? "✓ " : ""}{evt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Diet */}
                <div>
                  <label className="font-serif-elegant text-xs uppercase tracking-[0.25em] text-gold-deep flex items-center gap-2 mb-2">
                    <Utensils className="h-3.5 w-3.5" /> Meal preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["veg", "non-veg", "jain"] as const).map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setData((s) => ({ ...s, diet: d }))}
                        className={`rounded-xl border-2 px-2 py-2 font-serif-elegant text-xs sm:text-sm capitalize transition-all duration-300 ${
                          data.diet === d
                            ? "border-gold bg-gradient-to-br from-maroon to-vermilion text-ivory shadow-[0_4px_15px_rgba(107,33,33,0.3)]"
                            : "border-gold/30 bg-ivory/60 text-maroon hover:border-gold/60"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="font-serif-elegant text-xs uppercase tracking-[0.25em] text-gold-deep mb-2 block">
                    A message (optional)
                  </label>
                  <textarea
                    value={data.note}
                    onChange={(e) => setData((d) => ({ ...d, note: e.target.value }))}
                    rows={3}
                    placeholder="Your blessings or any special request…"
                    className="w-full rounded-xl border-2 border-gold/30 bg-ivory/70 px-4 py-3 font-serif-elegant text-sm text-maroon placeholder:text-maroon/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-serif-elegant text-base italic tracking-wider text-ivory shadow-[0_8px_24px_rgba(107,33,33,0.35)] transition-all"
                  style={{ background: "linear-gradient(135deg, #6B2121 0%, #C0392B 50%, #D4AF37 100%)" }}
                >
                  <Send className="h-4 w-4" />
                  Submit RSVP
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────
   FIREWORKS ENGINE
───────────────────────────────────────── */
const PALETTE = ["#fde58a","#f4a261","#e76f51","#d4af37","#ff9a3c","#ffd86b","#ffffff","#ff6b9d","#c084fc","#34d399","#fb923c","#a78bfa"];

function useBursts() {
  return [
    { id:"c",  x:50, y:40, delay:0,    scale:1.6 },
    { id:"tl", x:15, y:20, delay:200,  scale:1.1 },
    { id:"tr", x:85, y:18, delay:350,  scale:1.2 },
    { id:"bl", x:20, y:70, delay:550,  scale:1.0 },
    { id:"br", x:80, y:68, delay:720,  scale:1.1 },
    { id:"t",  x:50, y:8,  delay:900,  scale:1.3 },
    { id:"l",  x:8,  y:50, delay:1050, scale:0.95},
    { id:"r",  x:92, y:50, delay:1200, scale:0.95},
    { id:"m1", x:35, y:55, delay:400,  scale:1.0 },
    { id:"m2", x:65, y:30, delay:600,  scale:1.0 },
  ].map(b => ({
    ...b,
    sparks: Array.from({ length: 42 }).map((_, i) => {
      const angle = (i * 360) / 42;
      const dist  = (100 + Math.random() * 160) * b.scale;
      const rad   = (angle * Math.PI) / 180;
      return {
        id: i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        delay: b.delay + Math.random() * 150,
        duration: 900 + Math.random() * 700,
        size: 3 + Math.random() * 7,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    }),
  }));
}

function FireworksOverlay({ onDone }: { onDone: () => void }) {
  const bursts  = useBursts();
  const rockets = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: 3 + (i * 6.2),
    delay: i * 90 + Math.random() * 80,
    duration: 600 + Math.random() * 300,
  }));

  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden">
      {/* Full-screen golden flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,216,107,0.35) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* Rocket trails */}
      {rockets.map(r => (
        <span key={`rkt-${r.id}`}
          className="absolute bottom-0 w-[3px] rounded-full"
          style={{
            left: `${r.left}%`,
            height: "70vh",
            background: "linear-gradient(to top,transparent,#fde58a,#fff)",
            animation: `rocket-rise ${r.duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${r.delay}ms both`,
            filter: "drop-shadow(0 0 8px #ffd86b)",
          }}
        />
      ))}

      {/* Burst explosions */}
      {bursts.map(b => (
        <div key={`burst-${b.id}`}
          className="absolute"
          style={{ left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%,-50%)" }}
        >
          <div className="absolute left-1/2 top-1/2 h-40 w-40 rounded-full"
            style={{
              background: "radial-gradient(circle,rgba(255,255,255,0.98) 0%,rgba(255,216,107,0.75) 30%,transparent 70%)",
              animation: `cracker-flash 800ms ease-out ${b.delay}ms both`,
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 rounded-full border-2"
            style={{
              borderColor: "rgba(255,216,107,0.9)",
              animation: `cracker-ring 1200ms cubic-bezier(0.22,1,0.36,1) ${b.delay}ms both`,
            }}
          />
          {b.sparks.map(s => (
            <span key={`s-${b.id}-${s.id}`}
              className="cracker-spark absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: `${s.size}px`, height: `${s.size}px`,
                background: s.color,
                boxShadow: `0 0 ${s.size * 2}px ${s.color},0 0 ${s.size * 4}px ${s.color}`,
                ["--bx" as never]: `${s.dx}px`,
                ["--by" as never]: `${s.dy}px`,
                animationDelay: `${s.delay}ms`,
                animationDuration: `${s.duration}ms`,
              }}
            />
          ))}
        </div>
      ))}

      {/* Floating emoji confetti */}
      {["🌸","✨","💛","🌹","💮","🎊","🎉","🌺","💫","🎆"].map((emoji, i) => (
        <motion.span
          key={`emoji-${i}`}
          className="absolute text-2xl sm:text-3xl select-none"
          style={{ left: `${5 + i * 9.5}%`, bottom: "0%" }}
          initial={{ y: "100vh", opacity: 1, rotate: 0 }}
          animate={{
            y: [`${80 + Math.random() * 20}vh`, `${-10 - Math.random() * 20}vh`],
            opacity: [1, 1, 0],
            rotate: [0, 180 + Math.random() * 180],
            x: [(Math.random() - 0.5) * 120],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: 0.3 + i * 0.12,
            ease: "easeOut",
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED ACCEPT BUTTON
───────────────────────────────────────── */
function AcceptButton({ onAccept, bursting }: { onAccept: () => void; bursting: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onAccept}
      disabled={bursting}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="relative w-full overflow-hidden rounded-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(135deg, #6B2121 0%, #C0392B 40%, #E74C3C 60%, #D4AF37 100%)",
        padding: "1px",
        boxShadow: hovered
          ? "0 0 40px rgba(212,175,55,0.6), 0 12px 40px rgba(107,33,33,0.5)"
          : "0 6px 24px rgba(107,33,33,0.35)",
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Inner gradient fill */}
      <div className="relative flex items-center justify-center gap-3 rounded-full px-8 py-4 sm:py-5 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7B2D2D 0%, #C0392B 50%, #8B0000 100%)" }}>

        {/* Animated shimmer sweep */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)" }}
          animate={{ x: hovered ? ["−100%", "200%"] : "-100%" }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: hovered ? Infinity : 0 }}
        />

        {/* Pulsing glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(212,175,55,0.5)" }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.span
          animate={hovered ? { rotate: [0, -20, 20, 0], scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl"
        >🎉</motion.span>

        <span className="relative z-10 font-serif-elegant text-base sm:text-lg italic tracking-wider text-ivory drop-shadow-sm">
          {bursting ? "Celebrating…" : "Accept Invitation"}
        </span>

        <motion.span
          animate={hovered ? { rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl"
        >🎉</motion.span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   THANK YOU SCREEN
───────────────────────────────────────── */
function ThankYouScreen({ submitted, onOpenForm }: { submitted: boolean; onOpenForm: () => void }) {
  const petals = ["🌸","🌺","🌹","✨","💛","💮","🌼","💫"];

  return (
    <motion.div
      key="thankyou"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center gap-6 py-4 w-full"
    >
      {/* Glowing checkmark */}
      <div className="relative">
        <motion.div
          className="absolute -inset-4 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(255,216,107,0.2) 100%)",
            border: "2px solid rgba(212,175,55,0.7)",
            boxShadow: "0 0 30px rgba(212,175,55,0.4), inset 0 0 20px rgba(212,175,55,0.1)",
          }}
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            className="text-4xl"
          >✓</motion.div>
        </motion.div>

        {/* Orbiting petals */}
        {petals.map((p, i) => (
          <motion.span
            key={i}
            className="absolute text-lg select-none"
            style={{
              top: "50%", left: "50%",
              transformOrigin: "0 0",
            }}
            animate={{
              rotate: [i * 45, i * 45 + 360],
              x: Math.cos((i * Math.PI * 2) / 8) * 48 - 8,
              y: Math.sin((i * Math.PI * 2) / 8) * 48 - 8,
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              x: { duration: 0 },
              y: { duration: 0 },
            }}
          >
            {p}
          </motion.span>
        ))}
      </div>

      {/* Thank you text */}
      <div className="text-center space-y-3">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep"
        >
          With All Our Love
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl text-gradient-royal leading-tight"
        >
          Thank You,
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65, type: "spring", bounce: 0.5 }}
          className="font-script text-4xl sm:text-5xl text-vermilion drop-shadow-sm"
        >
          {guestName}!
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto gold-divider w-24"
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="font-serif-elegant text-sm sm:text-base italic leading-relaxed text-maroon/70 max-w-xs mx-auto"
        >
          Your presence will make our celebration truly divine. We are overjoyed you will be with us!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 backdrop-blur-sm"
        >
          <span className="text-sm">🗓️</span>
          <span className="font-serif-elegant text-xs sm:text-sm text-gold-deep">
            {couple.weddingDate} · {couple.destination}
          </span>
        </motion.div>

        {/* Submit / Edit RSVP CTA */}
        <motion.button
          onClick={onOpenForm}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-2 inline-flex items-center gap-2 rounded-full px-7 py-3 font-serif-elegant text-sm italic tracking-wider text-ivory shadow-[0_8px_24px_rgba(107,33,33,0.35)] transition-all"
          style={{
            background: submitted
              ? "linear-gradient(135deg, #D4AF37 0%, #C0392B 60%, #6B2121 100%)"
              : "linear-gradient(135deg, #6B2121 0%, #C0392B 50%, #D4AF37 100%)",
          }}
        >
          {submitted ? <Pencil className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {submitted ? "Edit RSVP" : "Submit RSVP"}
        </motion.button>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-serif-elegant text-[11px] italic text-maroon/50"
          >
            ✓ Your RSVP details have been recorded
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export function GuestAction() {
  const [accepted, setAccepted] = useState(false);
  const [bursting, setBursting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const handleAccept = () => {
    setBursting(true);
    setTimeout(() => { setAccepted(true); setBursting(false); }, 3800);
  };

  return (
    <section
      id="rsvp"
      className="relative px-4 pt-12 pb-8 sm:pt-20 sm:pb-12"
      style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 0%, #FAF6EE 0%, #F6EDE2 45%, #ECDDBE 80%, #E8D5B0 100%)",
      }}
    >
      {bursting && <FireworksOverlay onDone={() => setBursting(false)} />}
      <RoyalBackground idPrefix="ga" />

      <div className="relative mx-auto max-w-5xl z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.45em] text-gold-deep">
              Confirm Your Presence
            </p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-gradient-royal drop-shadow-md leading-none">
            RSVP
          </h2>
          <p className="mt-3 font-serif-elegant text-base sm:text-lg italic text-maroon/60">
            आप सादर आमंत्रित हैं
          </p>
        </motion.div>

        {/* ── RSVP Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-md sm:max-w-lg"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            ref={cardRef}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            {/* Outer glowing border */}
            <div
              className="absolute -inset-[2px] rounded-[2.5rem] opacity-70"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.8) 0%, rgba(255,216,107,0.4) 30%, rgba(200,150,50,0.6) 60%, rgba(212,175,55,0.9) 100%)",
                filter: "blur(1px)",
              }}
            />

            {/* Card body */}
            <div
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(255,250,240,0.97) 0%, rgba(250,245,230,0.93) 50%, rgba(245,235,210,0.97) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 60px rgba(107,33,33,0.2), 0 10px 30px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Rotating mandala bg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.05]">
                <svg viewBox="0 0 300 300" className="w-full h-full text-gold-deep animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="0.5">
                  {[40, 65, 90, 115, 140].map(r => <circle key={r} cx="150" cy="150" r={r} />)}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={i} x1="150" y1="10" x2="150" y2="290" transform={`rotate(${i * 22.5} 150 150)`} />
                  ))}
                </svg>
              </div>

              {/* Top golden arch accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-[2.5rem]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8) 30%, rgba(255,216,107,1) 50%, rgba(212,175,55,0.8) 70%, transparent)" }}
              />

              {/* Corner ornaments */}
              {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                <div key={i} className={`absolute ${pos} text-gold/40 text-lg select-none pointer-events-none`}>❋</div>
              ))}

              {/* The entire inner content switches between invitation & thank-you */}
              <AnimatePresence mode="wait">
                {!accepted ? (
                  <motion.div
                    key="invitation-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    transition={{ duration: 0.5 }}
                    className="relative px-8 py-10 sm:px-12 sm:py-14 text-center"
                  >
                    {/* Envelope icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.55 }}
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #7B2D2D 0%, #C0392B 100%)",
                        boxShadow: "0 8px 32px rgba(107,33,33,0.4), 0 0 0 6px rgba(212,175,55,0.15), 0 0 0 12px rgba(212,175,55,0.08)",
                      }}
                    >
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-9 w-9 text-ivory">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                    </motion.div>

                    {/* Dear Guest Name */}
                    <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.35em] text-gold-deep">Dear</p>
                    <p className="mt-1 font-script text-3xl sm:text-4xl text-maroon drop-shadow-sm">{guestName}</p>

                    {/* Divider */}
                    <div className="my-5 flex items-center gap-3">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
                      <span className="text-vermilion text-base">♥</span>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>

                    <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold-deep">With Great Joy</p>
                    <h3 className="mt-2 font-serif-elegant text-3xl sm:text-4xl font-light leading-tight text-gradient-royal drop-shadow-sm">
                      You Are Invited
                    </h3>

                    <p className="mt-4 font-script text-4xl sm:text-5xl text-vermilion drop-shadow-sm">
                      {couple.brideFirst} &amp; {couple.groomFirst}
                    </p>

                    <div
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 backdrop-blur-sm"
                      style={{ background: "rgba(212,175,55,0.08)" }}
                    >
                      <span className="text-sm">🗓️</span>
                      <span className="font-serif-elegant text-xs sm:text-sm text-gold-deep">
                        {couple.weddingDate} · {couple.destination}
                      </span>
                    </div>

                    <p className="mt-5 font-serif-elegant text-xs sm:text-sm italic leading-relaxed text-maroon/55">
                      "We request the honour of your presence at the celebration of our union. Your blessings and love would make our special day truly divine."
                    </p>

                    <div className="mt-8 w-full">
                      <AcceptButton onAccept={handleAccept} bursting={bursting} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thankyou-content"
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                    className="relative px-8 py-10 sm:px-12 sm:py-14"
                  >
                    <ThankYouScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Ornate Divider ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 sm:mt-24"
        >
          <OrnateDivider />
        </motion.div>

        {/* ── Contact Cards ── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
              <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep">Reach Us</p>
              <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient-royal leading-tight drop-shadow-sm">
              Family Contacts
            </h3>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {[
              { ...familySides[0].members[0], sideLabel: "Bride's Father", phone: "+919876543210", whatsapp: "919876543210" },
              { ...familySides[1].members[0], sideLabel: "Groom's Father", phone: "+919812345678", whatsapp: "919812345678" }
            ].map((c) => (
              <motion.div key={c.name} variants={fadeUp}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative overflow-hidden rounded-[2rem] border border-gold/40 bg-gradient-to-br from-ivory/95 to-ivory/80 backdrop-blur-sm shadow-[0_8px_32px_rgba(200,169,81,0.15)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:border-gold/70"
              >
                {/* Grand Lotus Floral Background */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-700 overflow-hidden">
                  <svg viewBox="0 0 200 150" className="w-[130%] sm:w-[110%] h-auto text-gold-deep translate-y-16 sm:translate-y-12 transition-transform duration-700 group-hover:-translate-y-4" fill="currentColor">
                    {/* Central petal */}
                    <path d="M100 10 C 115 50, 130 100, 100 150 C 70 100, 85 50, 100 10 Z" />
                    {/* Side petals 1 */}
                    <path d="M100 150 C 120 100, 160 60, 150 20 C 140 60, 115 100, 100 150 Z" opacity="0.8"/>
                    <path d="M100 150 C 80 100, 40 60, 50 20 C 60 60, 85 100, 100 150 Z" opacity="0.8"/>
                    {/* Side petals 2 */}
                    <path d="M100 150 C 140 110, 190 80, 190 40 C 170 80, 130 120, 100 150 Z" opacity="0.5"/>
                    <path d="M100 150 C 60 110, 10 80, 10 40 C 30 80, 70 120, 100 150 Z" opacity="0.5"/>
                    {/* Outer petals 3 */}
                    <path d="M100 150 C 150 130, 210 110, 210 80 C 180 110, 140 140, 100 150 Z" opacity="0.3"/>
                    <path d="M100 150 C 50 130, -10 110, -10 80 C 20 110, 60 140, 100 150 Z" opacity="0.3"/>
                  </svg>
                </div>

                {/* Floating Floral Petals */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.18] group-hover:opacity-[0.28] transition-opacity duration-700">
                  <svg viewBox="0 0 100 100" className="absolute top-12 left-10 w-8 h-8 text-gold-deep animate-pulse-slow" fill="currentColor">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0Z" transform="rotate(15 50 50)"/>
                  </svg>
                  <svg viewBox="0 0 100 100" className="absolute top-32 right-10 w-6 h-6 text-gold-deep animate-pulse-slow" style={{ animationDelay: "1s" }} fill="currentColor">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0Z" transform="rotate(-25 50 50)"/>
                  </svg>
                  <svg viewBox="0 0 100 100" className="absolute bottom-32 left-8 w-10 h-10 text-gold-deep animate-pulse-slow" style={{ animationDelay: "2s" }} fill="currentColor">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0Z" transform="rotate(45 50 50)"/>
                  </svg>
                  <svg viewBox="0 0 100 100" className="absolute bottom-16 right-16 w-5 h-5 text-gold-deep animate-pulse-slow" style={{ animationDelay: "0.5s" }} fill="currentColor">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0Z" transform="rotate(-15 50 50)"/>
                  </svg>
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 50%, transparent)" }}
                />
                <div className="royal-hover-sweep" aria-hidden />
                
                <div className="relative px-6 py-10 text-center flex flex-col items-center">
                  {/* Image with glowing animated frame */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 rounded-full border border-dashed border-gold/40 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-kesar/40 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      className="relative h-32 w-32 rounded-full object-cover border-4 border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  
                  <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-deep">{c.sideLabel}</p>
                  <p className="mt-2 font-serif-elegant text-xl sm:text-2xl text-maroon leading-snug">{c.name}</p>
                  <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  
                  <div className="mt-6 flex justify-center gap-3 sm:gap-4 w-full">
                    <a href={`tel:${c.phone}`}
                      className="flex-1 inline-flex justify-center items-center gap-2 rounded-full border border-maroon/30 bg-white/50 px-4 py-2.5 font-display text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-maroon transition-all duration-300 hover:bg-maroon hover:text-ivory hover:border-maroon hover:shadow-[0_8px_20px_rgba(107,33,33,0.2)]">
                      <Phone className="h-3.5 w-3.5" /> Call
                    </a>
                    <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="group/btn relative flex-1 inline-flex justify-center items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-maroon to-vermilion px-4 py-2.5 font-display text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ivory shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(107,33,33,0.4)]">
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                      <MessageCircle className="relative h-3.5 w-3.5" />
                      <span className="relative">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center pb-6"
        >
          <div className="mx-auto gold-divider w-32" />
          <p className="mt-6 font-script text-4xl sm:text-5xl text-vermilion drop-shadow-sm">{couple.brideFirst} &amp; {couple.groomFirst}</p>
          <p className="mt-2 font-serif-elegant text-sm italic text-muted-foreground">{couple.weddingDate} · {couple.destination}</p>
          <div className="mt-6 flex justify-center items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold/70">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.footer>

      </div>
    </section>
  );
}
