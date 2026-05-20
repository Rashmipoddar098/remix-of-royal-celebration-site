import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contacts, couple, travel } from "@/data/wedding";
import { OrnateDivider } from "./OrnateDivider";
import { Phone, MessageCircle, Plane, Hotel, CheckCircle2 } from "lucide-react";

const PALETTE = ["#fde58a","#f4a261","#e76f51","#d4af37","#ff9a3c","#ffd86b","#ffffff","#ff6b9d","#c084fc","#34d399"];

function useBursts() {
  const centers = [
    { id:"c",  x:50, y:45, delay:0,    scale:1.4 },
    { id:"tl", x:18, y:25, delay:180,  scale:1.0 },
    { id:"tr", x:82, y:22, delay:320,  scale:1.1 },
    { id:"bl", x:22, y:68, delay:500,  scale:0.95},
    { id:"br", x:78, y:65, delay:660,  scale:1.05},
    { id:"t",  x:50, y:12, delay:820,  scale:1.2 },
    { id:"l",  x:10, y:50, delay:950,  scale:0.9 },
    { id:"r",  x:90, y:50, delay:1100, scale:0.9 },
  ];
  return centers.map(b => ({
    ...b,
    sparks: Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 360) / 36 + Math.random() * 8;
      const dist  = (90 + Math.random() * 140) * b.scale;
      const rad   = (angle * Math.PI) / 180;
      return {
        id: i,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        delay: b.delay + Math.random() * 120,
        duration: 900 + Math.random() * 600,
        size: 3 + Math.random() * 6,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    }),
  }));
}

function useRockets() {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    delay: i * 110 + Math.random() * 100,
    duration: 650 + Math.random() * 250,
  }));
}

function FireworksOverlay({ onDone }: { onDone: () => void }) {
  const bursts  = useBursts();
  const rockets = useRockets();
  useState(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); });
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/25 via-vermilion/10 to-transparent animate-fade-out" style={{ animationDuration:"1.4s" }} />
      {rockets.map(r => (
        <span key={`rkt-${r.id}`} className="absolute bottom-0 w-[3px] rounded-full"
          style={{ left:`${r.left}%`, height:"65vh",
            background:"linear-gradient(to top,transparent,#fde58a,#fff)",
            animation:`rocket-rise ${r.duration}ms cubic-bezier(0.25,0.46,0.45,0.94) ${r.delay}ms both`,
            filter:"drop-shadow(0 0 6px #ffd86b)" }} />
      ))}
      {bursts.map(b => (
        <div key={`burst-${b.id}`} className="absolute" style={{ left:`${b.x}%`, top:`${b.y}%`, transform:"translate(-50%,-50%)" }}>
          <div className="absolute left-1/2 top-1/2 h-36 w-36 rounded-full"
            style={{ background:"radial-gradient(circle,rgba(255,255,255,0.95) 0%,rgba(255,216,107,0.7) 35%,transparent 70%)", animation:`cracker-flash 750ms ease-out ${b.delay}ms both` }} />
          <div className="absolute left-1/2 top-1/2 h-20 w-20 rounded-full border-2"
            style={{ borderColor:"rgba(255,216,107,0.9)", animation:`cracker-ring 1100ms cubic-bezier(0.22,1,0.36,1) ${b.delay}ms both` }} />
          {b.sparks.map(s => (
            <span key={`s-${b.id}-${s.id}`} className="cracker-spark absolute left-1/2 top-1/2 rounded-full"
              style={{ width:`${s.size}px`, height:`${s.size}px`, background:s.color,
                boxShadow:`0 0 ${s.size*2}px ${s.color},0 0 ${s.size*4}px ${s.color}`,
                ["--bx" as never]:`${s.dx}px`, ["--by" as never]:`${s.dy}px`,
                animationDelay:`${s.delay}ms`, animationDuration:`${s.duration}ms` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const stagger = { hidden:{opacity:0}, visible:{opacity:1,transition:{staggerChildren:0.12}} };
const fadeUp  = { hidden:{opacity:0,y:24}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1] as const}} };

export function GuestAction() {
  const [accepted, setAccepted] = useState(false);
  const [bursting, setBursting] = useState(false);

  const handleAccept = () => {
    setBursting(true);
    setTimeout(() => { setAccepted(true); setBursting(false); }, 3200);
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-4 pt-12 pb-3 sm:pt-16"
    >
      {bursting && <FireworksOverlay onDone={() => setBursting(false)} />}

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-vermilion/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-kesar/10 blur-3xl" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-deep to-transparent" />

      <div className="relative mx-auto max-w-5xl">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">
            Confirm Your Presence
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl text-gradient-royal drop-shadow-sm leading-tight">
            RSVP
          </h2>
          <div className="mx-auto mt-5 gold-divider w-24 sm:w-32" />
        </motion.div>

        {/* ── RSVP Card ── */}
        <motion.div
          initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          transition={{duration:0.9,ease:[0.22,1,0.36,1]}}
          className="mx-auto max-w-sm sm:max-w-md"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-b from-card to-ivory p-[1.5px] shadow-royal royal-card-tilt">
            <div aria-hidden className="absolute inset-0 royal-shimmer-frame rounded-3xl" />
            <div className="royal-hover-sweep" aria-hidden />
            <div className="relative rounded-[22px] bg-gradient-ivory px-8 py-10 sm:px-12 sm:py-14 text-center">
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-2xl border border-gold/25" />
              <div aria-hidden className="pointer-events-none absolute inset-5 rounded-2xl border border-dashed border-gold/15" />
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]">
                <svg viewBox="0 0 200 200" className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold-deep" fill="none" stroke="currentColor" strokeWidth="0.5">
                  {[30,50,70,90].map(r => <circle key={r} cx="100" cy="100" r={r} />)}
                  {Array.from({length:12}).map((_,i) => <line key={i} x1="100" y1="10" x2="100" y2="190" transform={`rotate(${i*30} 100 100)`} strokeOpacity="0.7" />)}
                </svg>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <motion.div initial={{scale:0,rotate:-10}} whileInView={{scale:1,rotate:0}} viewport={{once:true}} transition={{duration:0.6,type:"spring",bounce:0.5}}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gradient-to-br from-maroon to-vermilion shadow-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7 text-ivory">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>

                <motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.15}}
                  className="mt-6 font-display text-[10px] sm:text-xs uppercase tracking-[0.45em] text-gold-deep animate-text-glow">
                  With Great Joy
                </motion.p>
                <motion.h3 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.25}}
                  className="mt-3 font-serif-elegant text-4xl sm:text-5xl font-light leading-tight text-gradient-royal drop-shadow-sm">
                  You Are Invited
                </motion.h3>
                <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.35}}
                  className="mt-2 font-serif-elegant text-base sm:text-lg italic text-gold-deep/70">
                  आप सादर आमंत्रित हैं
                </motion.p>

                <motion.div initial={{opacity:0,scaleX:0}} whileInView={{opacity:1,scaleX:1}} viewport={{once:true}} transition={{duration:0.7,delay:0.4}}
                  className="mt-5 flex w-full items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 flex-shrink-0 text-vermilion/70">
                    <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                  </svg>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
                </motion.div>

                <motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.5}}
                  className="mt-5 font-script text-4xl sm:text-5xl text-vermilion drop-shadow-sm">
                  {couple.brideFirst} &amp; {couple.groomFirst}
                </motion.p>
                <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.6}}
                  className="mt-4 inline-flex items-center rounded-full border border-gold/40 bg-gold/5 px-5 py-2">
                  <span className="font-serif-elegant text-xs sm:text-sm text-gold-deep">
                    {couple.weddingDate} · {couple.destination}
                  </span>
                </motion.div>
                <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.7}}
                  className="mt-6 font-serif-elegant text-xs sm:text-sm italic leading-relaxed text-maroon/50">
                  "We request the honor of your presence at the celebration of our union.
                  Your blessings and love would make our special day truly memorable."
                </motion.p>

                <AnimatePresence mode="wait">
                  {!accepted ? (
                    <motion.div key="invite" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{delay:0.8}} className="mt-8 w-full">
                      <button
                        onClick={handleAccept}
                        disabled={bursting}
                        className="group/btn relative w-full overflow-hidden rounded-full border border-gold/60 bg-gradient-to-r from-maroon via-vermilion to-maroon px-6 py-3.5 font-serif-elegant text-sm sm:text-base italic text-ivory shadow-royal transition-all duration-500 hover:scale-105 hover:shadow-[0_8px_30px_rgba(107,33,33,0.4)] hover:border-gold disabled:opacity-60"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                        <span className="relative flex items-center justify-center gap-3">
                          <span>🎉</span>
                          <span>{bursting ? "Celebrating…" : "Accept Invitation"}</span>
                          <span>🎉</span>
                        </span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="accepted" initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:0.6,type:"spring",bounce:0.4}} className="mt-8 flex flex-col items-center gap-3">
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-gold/20 to-kesar/20 shadow-gold">
                        <div className="absolute inset-0 animate-ping rounded-full border border-gold/30 opacity-60" />
                        <CheckCircle2 className="h-8 w-8 text-gold-deep" strokeWidth={1.5} />
                      </div>
                      <p className="font-display text-xl text-maroon sm:text-2xl">Your Blessings Are Received</p>
                      <p className="font-serif-elegant text-xs italic text-muted-foreground">We look forward to celebrating with you.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.8}} className="mt-16 sm:mt-20">
          <OrnateDivider />
        </motion.div>

        {/* ── Contact Cards ── */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{once:true}} className="mt-12">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">Reach Us</p>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-gradient-royal leading-tight drop-shadow-sm">Family Contacts</h3>
            <div className="mx-auto mt-4 gold-divider w-20" />
          </motion.div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {contacts.map((c, idx) => (
              <motion.div key={c.name} variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-b from-card to-ivory shadow-card transition-all duration-500 hover:shadow-royal royal-card-tilt">
                <div className="royal-hover-sweep" aria-hidden />
                <div aria-hidden className="pointer-events-none absolute inset-2.5 rounded-xl border border-dashed border-gold/20 transition-colors duration-500 group-hover:border-gold/40" />
                <div className="relative px-5 py-7 sm:px-6 sm:py-8 text-center flex flex-col items-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/15 to-kesar/15 shadow-[0_0_12px_rgba(212,175,55,0.2)] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:border-gold/70">
                    <span className="font-display text-sm text-gold-deep">{String(idx+1).padStart(2,"0")}</span>
                  </div>
                  <p className="font-display text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-deep">{c.side}</p>
                  <p className="mt-2 font-serif-elegant text-base sm:text-lg text-maroon leading-snug">{c.name}</p>
                  <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  <div className="mt-5 flex justify-center gap-2 sm:gap-3">
                    <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 rounded-full border border-maroon/30 px-4 py-2 font-display text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-maroon transition-all duration-300 hover:bg-maroon hover:text-ivory hover:border-maroon">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                    <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-maroon to-vermilion px-4 py-2 font-display text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-ivory shadow-card transition-all duration-300 hover:scale-105 hover:shadow-royal">
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                      <MessageCircle className="relative h-3 w-3" />
                      <span className="relative">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.8}} className="mt-16 sm:mt-20">
          <OrnateDivider />
        </motion.div>

        {/* ── Travel & Stay ── */}
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.9}} className="mt-12 mx-auto max-w-3xl">
          <div className="group relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-card to-ivory p-[1.5px] shadow-royal royal-card-tilt">
            <div aria-hidden className="absolute inset-0 royal-shimmer-frame rounded-2xl" />
            <div className="royal-hover-sweep" aria-hidden />
            <div className="relative rounded-2xl bg-gradient-ivory px-6 py-10 sm:px-10 sm:py-12">
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl border border-gold/20" />
              <div className="text-center mb-8">
                <p className="font-serif-elegant text-xs sm:text-sm uppercase tracking-[0.4em] text-gold-deep animate-text-glow">Stay &amp; Travel</p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl text-gradient-royal leading-tight drop-shadow-sm">A Note for Outstation Guests</h3>
                <div className="mx-auto mt-4 gold-divider w-20" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-4 rounded-xl border border-gold/20 bg-gold/5 p-4 sm:p-5 transition-colors hover:bg-gold/10 hover:border-gold/40">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-kesar/20">
                    <Plane className="h-4 w-4 text-gold-deep" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-deep">Airport</p>
                    <p className="mt-1 font-serif-elegant text-sm text-maroon/85 leading-snug">{travel.airport}</p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border border-gold/20 bg-gold/5 p-4 sm:p-5 transition-colors hover:bg-gold/10 hover:border-gold/40">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-kesar/20">
                    <Hotel className="h-4 w-4 text-gold-deep" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-deep">Stay</p>
                    <p className="mt-1 font-serif-elegant text-sm text-maroon/85 leading-snug">{travel.stay}</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center font-serif-elegant text-sm italic text-muted-foreground">{travel.note}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Footer ── */}
        <motion.footer initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:1}} className="mt-20 text-center">
          <div className="mx-auto gold-divider w-32" />
          <p className="mt-6 font-script text-4xl text-vermilion drop-shadow-sm">{couple.brideFirst} &amp; {couple.groomFirst}</p>
          <p className="mt-2 font-serif-elegant text-sm italic text-muted-foreground">{couple.weddingDate} · {couple.destination}</p>
          <div className="mt-6 flex justify-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.footer>

      </div>
    </section>
  );
}
