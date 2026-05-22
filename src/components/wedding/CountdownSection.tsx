import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { couple, guestName } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { RoyalBackground } from "./RoyalBackground";

function useCountdown(target: string) {
  const [time, setTime] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const INITIAL_BLESSINGS = [
  { text: "May your sacred union be blessed with eternal love, laughter, and endless devotion. A truly magnificent match!", author: "Aarav Sharma" },
  { text: "Wishing you both a lifetime of shared dreams, warm sunrises, and deep trust. Congratulations!", author: "Priya & Rohan Verma" },
  { text: "May Lord Ganesha shower your new journey with pure joy, prosperity, and beautiful blessings.", author: "Devendra Rajvanshi" },
  { text: "Two beautiful souls, one sacred bond. May your house be filled with laughter, light, and harmony.", author: "Dr. Anjali Mehta" },
  { text: "Through every season of life, may your love for each other only deepen and grow. With all our love!", author: "Karan & Neha Gupta" },
  { text: "May your hearts beat as one, and may your pathway be paved with golden moments and endless happiness.", author: "Smt. Shanti Devi" },
];

interface Blessing {
  text: string;
  author: string;
}

function BlessingMarquee({ items, direction = "left", speed = 25 }: { items: Blessing[]; direction?: "left" | "right"; speed?: number }) {
  // Triple the list to create a seamless scrolling loop in marquee
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Soft gradient edge diffusers */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-ivory via-ivory/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-ivory via-ivory/50 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 sm:gap-6 w-max"
        animate={{
          x: direction === "left" ? [0, -1200] : [-1200, 0],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        whileHover={{ animationPlayState: "paused" }} // Smoothly pause scrolling when guest reads it
      >
        {duplicatedItems.map((b, idx) => (
          <motion.div
            key={idx}
            className="w-[280px] sm:w-[350px] flex-shrink-0 group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ivory/95 via-ivory/70 to-ivory/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(200,169,81,0.15)] transition-all duration-700 hover:shadow-[0_15px_40px_rgba(212,175,55,0.35)] hover:-translate-y-3 hover:scale-[1.06] border border-white/60 cursor-pointer"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4.5 + (idx % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.4,
            }}
          >
            {/* Ambient backlight glow on card hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: "radial-gradient(circle at center, color-mix(in oklab, var(--gold) 15%, transparent), transparent 70%)" }} 
            />

            {/* Sweep light shine */}
            <div className="royal-hover-sweep" aria-hidden />

            {/* Soft slowly spinning background mandala */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
              <svg className="w-[110%] h-[110%] text-gold-deep animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = i * 45;
                  return (
                    <line key={i} x1="50" y1="10" x2="50" y2="90" transform={`rotate(${angle} 50 50)`} stroke="currentColor" strokeWidth="0.5" />
                  );
                })}
              </svg>
            </div>

            {/* Drifting golden embers inside card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                { top: "20%", left: "10%", delay: 0.1, scale: 0.4 },
                { top: "80%", left: "85%", delay: 0.5, scale: 0.5 },
              ].map((spark, sIdx) => (
                <motion.span
                  key={sIdx}
                  className="absolute h-1 w-1 rounded-full bg-gold"
                  style={{ top: spark.top, left: spark.left }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.1, 0.7, 0.1],
                  }}
                  transition={{
                    duration: 3 + sIdx,
                    repeat: Infinity,
                    delay: spark.delay + idx * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Elegant nested border overlay with active flowing gold trace - ALWAYS active */}
            <div className="absolute inset-2 pointer-events-none rounded-2xl overflow-hidden select-none w-[calc(100%-16px)] h-[calc(100%-16px)] left-2 top-2">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Outer gold line */}
                <rect x="0.5" y="0.5" width="99" height="99" rx="12" ry="12" fill="none" stroke="var(--gold)" strokeWidth="0.75" className="opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                
                {/* Active Flowing Laser beam - ALWAYS active, slightly brighter on hover */}
                <motion.rect
                  x="0.5"
                  y="0.5"
                  width="99"
                  height="99"
                  rx="12"
                  ry="12"
                  fill="none"
                  stroke={`url(#blessingGoldGradient-${direction}-${idx})`}
                  strokeWidth="1.5"
                  strokeDasharray="25 100"
                  animate={{ strokeDashoffset: [0, -125] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <defs>
                  <linearGradient id={`blessingGoldGradient-${direction}-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--gold-deep)" />
                    <stop offset="50%" stopColor="var(--gold)" />
                    <stop offset="100%" stopColor="var(--gold-deep)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Inner dashed breathing outline */}
            <motion.div 
              className="absolute inset-4 pointer-events-none rounded-xl border border-dashed border-gold/15" 
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: (idx % 6) * 0.2 }}
            />

            {/* Floating quote mark */}
            <motion.span 
              aria-hidden 
              className="absolute -top-1 left-4 font-script text-6xl text-gold/15 group-hover:text-gold/30 transition-colors duration-500 leading-none select-none"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
            >
              "
            </motion.span>

            {/* Golden Star corners that rotate continuously on hover */}
            <div className="absolute top-2 right-2 w-3.5 h-3.5 text-gold/30 group-hover:text-gold/75 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110 pointer-events-none select-none">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
              </svg>
            </div>

            <div className="relative flex flex-col justify-between h-full z-10">
              <p className="font-serif-elegant text-xs sm:text-sm italic leading-relaxed text-maroon/80 group-hover:text-maroon transition-colors duration-300">
                {b.text}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/30 group-hover:to-gold/50 transition-colors duration-300" />
                <span className="font-display text-[9px] uppercase tracking-[0.25em] text-gold-deep group-hover:text-vermilion transition-colors duration-300 whitespace-nowrap">{b.author}</span>
                <span className="h-[1px] w-4 bg-gold/30 group-hover:bg-gold/50 transition-colors duration-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function CountdownSection() {
  const t = useCountdown(couple.countdownTarget);

  // Staggered Title Animations
  const titleWords = ["Counting", "the", "Moments"];
  
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const titleWordVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 14,
      },
    },
  };

  // State management for Dynamic blessings
  const [wishes, setWishes] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [blessingText, setBlessingText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize and load saved wishes on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wedding_wishes");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWishes(parsed);
          }
        } catch (e) {
          console.error("Failed to parse saved blessings:", e);
        }
      }
    }
  }, []);

  const handleSubmitBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingText.trim()) return;

    const newBlessing: Blessing = {
      text: blessingText.trim(),
      author: guestName, // automatically grab from pre-populated guest data
    };

    const updated = [newBlessing, ...wishes];
    setWishes(updated);
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));

    // Reset input & trigger blossom burst success feedback
    setBlessingText("");
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  // Partition wishes into two rows for dual horizontal marquees
  const row1 = wishes.filter((_, idx) => idx % 2 === 0);
  const row2 = wishes.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      id="countdown"
      className="relative overflow-hidden px-4 pt-12 pb-3 sm:pt-16"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #FAF6EE 0%, #F6EDE2 45%, #ECDDBE 80%, #E8D5B0 100%)",
      }}
    >
      <RoyalBackground idPrefix="cs" />

      <div className="relative mx-auto max-w-5xl">

        {/* ── Header ── */}
        <div className="text-center">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow"
          >
            The Sacred Day Approaches
          </motion.p>
          
          <motion.h2
            variants={titleContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl drop-shadow-sm leading-tight flex justify-center items-center flex-wrap gap-x-3 gap-y-1 select-none"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={titleWordVariants}
                className="inline-block text-shimmer-royal font-semibold"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            className="mx-auto mt-5 gold-divider w-24 sm:w-32" 
          />
        </div>

        {/* ── Countdown Cards ── */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
          {[
            { v: t.days,    l: "Days",    delay: 0.1 },
            { v: t.hours,   l: "Hours",   delay: 0.2 },
            { v: t.minutes, l: "Minutes", delay: 0.3 },
            { v: t.seconds, l: "Seconds", delay: 0.4 },
          ].map((b) => (
            <motion.div
              key={b.l}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: b.delay, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card via-ivory to-card py-6 xs:py-8 sm:py-9 md:py-11 text-center shadow-card transition-all duration-500 hover:scale-[1.03] hover:shadow-royal royal-card-tilt border border-gold/20"
            >
              {/* Radial glow diffuser on card hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(circle at center, color-mix(in oklab, var(--gold) 15%, transparent), transparent 70%)" }} 
              />
              
              {/* Hover sweep light shine */}
              <div className="royal-hover-sweep" aria-hidden />

              {/* Slowly spinning royal background mandala */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
                <motion.svg
                  className="w-[130%] h-[130%] text-gold/10 group-hover:text-gold/20 transition-colors duration-700"
                  viewBox="0 0 200 200"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
                >
                  <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3,6" />
                  <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="1" />
                  {Array.from({ length: 16 }).map((_, idx) => {
                    const angle = (idx * 360) / 16;
                    return (
                      <g key={idx} transform={`rotate(${angle} 100 100)`}>
                        <path d="M100,25 C105,45 105,65 100,75 C95,65 95,45 100,25" fill="currentColor" opacity="0.3" />
                        <line x1="100" y1="25" x2="100" y2="75" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="100" cy="45" r="2" fill="currentColor" />
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />
                  <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="1" />
                </motion.svg>
              </div>

              {/* Floating magical sparkles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                  { top: "15%", left: "15%", delay: 0, scale: 0.5 },
                  { top: "80%", left: "80%", delay: 1, scale: 0.7 },
                  { top: "25%", left: "75%", delay: 0.5, scale: 0.4 },
                  { top: "75%", left: "20%", delay: 1.5, scale: 0.6 },
                ].map((spark, idx) => (
                  <motion.span
                    key={idx}
                    className="absolute h-1.5 w-1.5 rounded-full bg-gold"
                    style={{ top: spark.top, left: spark.left }}
                    animate={{
                      y: [0, -12, 0],
                      opacity: [0.1, 0.7, 0.1],
                      scale: [spark.scale, spark.scale * 1.5, spark.scale],
                    }}
                    transition={{
                      duration: 3 + idx,
                      repeat: Infinity,
                      delay: spark.delay,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Elegant nested borders with active flowing gold trace */}
              <div className="absolute inset-2 pointer-events-none rounded-2xl overflow-hidden select-none w-[calc(100%-16px)] h-[calc(100%-16px)] left-2 top-2">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Outer base gold border */}
                  <rect x="0.5" y="0.5" width="99" height="99" rx="12" ry="12" fill="none" stroke="var(--gold)" strokeWidth="0.75" className="opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Flowing Laser Golden Trace */}
                  <motion.rect
                    x="0.5"
                    y="0.5"
                    width="99"
                    height="99"
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke={`url(#goldGradient-${b.l})`}
                    strokeWidth="1.5"
                    strokeDasharray="30 120"
                    animate={{ strokeDashoffset: [0, -150] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  />
                  
                  <defs>
                    <linearGradient id={`goldGradient-${b.l}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--gold-deep)" />
                      <stop offset="50%" stopColor="var(--gold)" />
                      <stop offset="100%" stopColor="var(--gold-deep)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Inner dashed breathing border */}
              <motion.div 
                className="absolute inset-4 pointer-events-none rounded-xl border border-dashed border-gold/15" 
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
              />

              {/* Hand-crafted Palace Corner Motifs with hover translation expansion */}
              <div className="absolute inset-2 pointer-events-none select-none">
                {/* Top-Left */}
                <div className="absolute top-0 left-0 w-6 h-6 text-gold/45 group-hover:text-gold transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
                    <path d="M2,12 V2 H12" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
                    <path d="M2,2 L7,7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Top-Right */}
                <div className="absolute top-0 right-0 w-6 h-6 text-gold/45 group-hover:text-gold transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full rotate-90">
                    <path d="M2,12 V2 H12" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
                    <path d="M2,2 L7,7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Bottom-Left */}
                <div className="absolute bottom-0 left-0 w-6 h-6 text-gold/45 group-hover:text-gold transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:translate-y-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full -rotate-90">
                    <path d="M2,12 V2 H12" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
                    <path d="M2,2 L7,7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* Bottom-Right */}
                <div className="absolute bottom-0 right-0 w-6 h-6 text-gold/45 group-hover:text-gold transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full rotate-180">
                    <path d="M2,12 V2 H12" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="5" cy="5" r="1.2" fill="currentColor" />
                    <path d="M2,2 L7,7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Digit Content Frame */}
              <div className="relative font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-maroon overflow-hidden h-[1.3em] w-full flex items-center justify-center z-10 select-none">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={b.v}
                    initial={{ opacity: 0, y: "90%", scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: "-90%", scale: 0.85 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.25 }}
                    className="absolute tabular-nums font-bold tracking-tight text-gradient-royal drop-shadow-[0_2px_8px_rgba(91,15,31,0.2)]"
                  >
                    {String(b.v).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Label & Accent Divider */}
              <div className="relative mt-2 xs:mt-3 z-10">
                <div className="mx-auto mb-2.5 h-[1.5px] w-8 bg-gradient-to-r from-transparent via-gold-deep to-transparent group-hover:w-16 transition-all duration-500 ease-out" />
                <div className="font-serif-elegant text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-deep group-hover:text-vermilion transition-colors duration-300">
                  {b.l}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <OrnateDivider />
        </motion.div>

        {/* ── Blessing Wall ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="mt-2 text-center relative z-20"
        >
          <div className="inline-flex items-center gap-3">
            <span aria-hidden className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold" />
            <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep drop-shadow-sm">
              Wishes &amp; Vows
            </p>
            <span aria-hidden className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h3 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl text-gradient-royal drop-shadow-md leading-tight animate-float-soft">
            Blessing Wall
          </h3>
        </motion.div>

        {/* Dual dynamic scrolling marquees with background drifting sparks */}
        {wishes.length > 0 && (
          <div className="mt-12 flex flex-col gap-4 overflow-hidden w-full relative pb-8">
            
            {/* Majestic floating background lotuses/lanterns for deep animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`bg-lotus-${i}`}
                  className="absolute opacity-[0.08]"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${10 + (i % 2) * 50}%`,
                    width: "120px",
                    height: "120px",
                  }}
                  animate={{
                    y: [0, -60, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.5,
                  }}
                >
                  <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold-deep w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]">
                    <path d="M50 0 C60 30 90 40 100 50 C90 60 60 70 50 100 C40 70 10 60 0 50 C10 40 40 30 50 0 Z" />
                    <circle cx="50" cy="50" r="15" fill="#FFE97A" />
                  </svg>
                </motion.div>
              ))}

              {/* Ambient drifting golden embers */}
              {[
                { top: "10%", left: "5%", delay: 0.2, scale: 0.8 },
                { top: "85%", left: "92%", delay: 0.8, scale: 1.2 },
                { top: "40%", left: "87%", delay: 0.5, scale: 0.6 },
                { top: "70%", left: "8%", delay: 1.2, scale: 1.0 },
                { top: "50%", left: "48%", delay: 1.8, scale: 0.7 },
              ].map((spark, idx) => (
                <motion.span
                  key={`ember-${idx}`}
                  className="absolute h-3 w-3 rounded-full bg-gradient-to-tr from-kesar to-gold blur-[1px] shadow-[0_0_10px_rgba(255,233,122,0.8)]"
                  style={{ top: spark.top, left: spark.left }}
                  animate={{
                    y: [0, -60, 0],
                    x: [0, 30, 0],
                    opacity: [0.1, 0.7, 0.1],
                    scale: [spark.scale, spark.scale * 1.8, spark.scale],
                  }}
                  transition={{
                    duration: 6 + idx,
                    repeat: Infinity,
                    delay: spark.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <BlessingMarquee items={row1} direction="left" speed={35} />
              <BlessingMarquee items={row2} direction="right" speed={40} />
            </div>
          </div>
        )}

        {/* ── Live Blessing Submission Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="mt-6 mx-auto w-full max-w-xl px-2 relative z-10"
        >
          <div className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-ivory/80 via-ivory/40 to-ivory/80 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_10px_40px_rgba(212,175,55,0.2)] royal-card-tilt transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
            {/* Success Confetti/Flower Petal Burst Shower */}
            {isSubmitted && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {Array.from({ length: 18 }).map((_, idx) => {
                  const xDir = (Math.random() - 0.5) * 180;
                  const yDir = -90 - Math.random() * 140;
                  const rot = Math.random() * 360;
                  return (
                    <motion.span
                      key={idx}
                      className="absolute left-1/2 bottom-8 text-xl select-none"
                      initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
                      animate={{
                        opacity: [1, 1, 0],
                        scale: [0.5, 1.2, 0.4],
                        x: xDir,
                        y: yDir,
                        rotate: rot,
                      }}
                      transition={{
                        duration: 1.6,
                        ease: "easeOut",
                      }}
                    >
                      {["🌸", "✨", "💛", "🌹", "💮", "💮"][idx % 6]}
                    </motion.span>
                  );
                })}
              </div>
            )}

            <div aria-hidden className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-gold/15" />
            <div className="royal-hover-sweep" aria-hidden />

            <h4 className="text-center font-display text-lg sm:text-xl text-gradient-royal leading-tight uppercase tracking-wider select-none">
              Send Your Vows &amp; Blessings
            </h4>
            <p className="text-center font-serif-elegant text-xs italic text-gold-deep/80 mt-1 select-none">
              Your message will automatically appear on the scrolling wall above
            </p>
            <div className="mx-auto mt-3 mb-6 gold-divider w-20 select-none" />

            <form onSubmit={handleSubmitBlessing} className="relative z-10 flex flex-col gap-4">

              <div>
                <label className="block font-serif-elegant text-xs uppercase tracking-wider text-gold-deep mb-1.5">
                  Blessing Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={blessingText}
                  onChange={(e) => setBlessingText(e.target.value)}
                  placeholder="Type your heartfelt wishes..."
                  className="w-full rounded-2xl border border-gold/40 bg-white/60 backdrop-blur-sm px-5 py-4 font-serif-elegant text-base text-maroon placeholder-maroon/40 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none transition-all duration-500 shadow-inner resize-none focus:bg-white/90"
                />
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-2 py-3 bg-gold/5 rounded-xl border border-gold/20"
                  >
                    <span className="text-xl">🌸</span>
                    <p className="font-display text-xs text-gold-deep uppercase tracking-wider">
                      Blessing Sent Successfully!
                    </p>
                  </motion.div>
                ) : (
                  <motion.button
                    key="submit-btn"
                    type="submit"
                    className="relative mt-4 w-full overflow-hidden rounded-full border border-gold bg-gradient-to-r from-maroon via-vermilion to-maroon py-4 font-serif-elegant text-lg italic tracking-wider text-ivory shadow-[0_4px_20px_rgba(107,33,33,0.4)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] active:scale-95 cursor-pointer group/btn"
                  >
                    <span className="relative z-10">Send Blessing</span>
                    {/* Glowing sweep over button */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover/btn:translate-x-full" />
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
