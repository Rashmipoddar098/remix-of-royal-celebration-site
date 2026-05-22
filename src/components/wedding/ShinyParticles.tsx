import { motion } from "framer-motion";
import { useMemo } from "react";

export function ShinyParticles() {
  // Generate 50 beautiful falling shiny particles
  const particles = useMemo(() => {
    const colors = ["#FFE97A", "#D4AF37", "#FFFFFF", "#FFD700"];
    
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      // Start slightly above the screen
      top: `-${Math.random() * 20 + 5}vh`,
      size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
      delay: Math.random() * 10, // stagger the falls heavily
      duration: Math.random() * 12 + 10, // 10s to 22s fall time
      sway: Math.random() * 60 - 30, // -30px to 30px horizontal sway
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}80`,
          }}
          animate={{
            y: ["0vh", "120vh"], // FALL DOWNWARDS
            x: [0, p.sway, -p.sway/2, p.sway], // gentle falling sway
            opacity: [0, 1, 0.4, 1, 0], // twinkle
            scale: [0.5, 1.2, 0.8, 1.5, 0.5], // pulse
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        />
      ))}
      
      {/* 15 larger, extra shiny "fairy dust" particles falling */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`hero-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10vh`,
            width: Math.random() * 2 + 2.5,
            height: Math.random() * 2 + 2.5,
            boxShadow: "0 0 8px #FFF, 0 0 15px #FFE97A, 0 0 25px #D4AF37",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, -40, 20, -20, 0],
            opacity: [0, 1, 0.6, 1, 0],
            scale: [0.8, 1.6, 0.9, 1.8, 0.8],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
}
