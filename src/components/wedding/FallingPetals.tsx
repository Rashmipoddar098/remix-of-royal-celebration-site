import { motion } from "framer-motion";
import { useMemo } from "react";

export function FallingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const scale = Math.random() * 0.8 + 0.6; // 0.6 to 1.4
      const isForeground = Math.random() > 0.8;
      const isBackground = Math.random() < 0.25;
      
      // Depth of field effect
      let blur = "blur(0px)";
      let zIndex = 1;
      let finalScale = scale;
      
      if (isForeground) {
        blur = "blur(2px)";
        zIndex = 20;
        finalScale = scale * 1.8;
      } else if (isBackground) {
        blur = "blur(3px)";
        zIndex = 0;
        finalScale = scale * 0.5;
      }

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 12, // 12 to 22 seconds falling
        sway: Math.random() * 60 + 20, // 20 to 80 px sway
        rotStartX: Math.random() * 360,
        rotEndX: Math.random() * 360 + 360,
        rotStartY: Math.random() * 360,
        rotEndY: Math.random() * 360 + 360,
        rotStartZ: Math.random() * 360,
        rotEndZ: Math.random() * 360 + 360,
        scale: finalScale,
        blur,
        zIndex,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden style={{ zIndex: 1 }}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute origin-center"
          style={{
            left: p.left,
            top: "-10vh",
            width: `${16 * p.scale}px`,
            height: `${24 * p.scale}px`,
            filter: p.blur,
            zIndex: p.zIndex,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, p.sway, -p.sway, p.sway/2, 0],
            rotateX: [p.rotStartX, p.rotEndX],
            rotateY: [p.rotStartY, p.rotEndY],
            rotateZ: [p.rotStartZ, p.rotEndZ],
            opacity: [0, 0.85, 0.85, 0], // Fade in at top, fade out at bottom
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
            opacity: { times: [0, 0.1, 0.9, 1] },
            x: { duration: p.duration, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }
          }}
        >
          {/* Stunning Crimson Rose Petal SVG */}
          <svg viewBox="0 0 28 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            <defs>
              <radialGradient id={`petalGrad-${p.id}`} cx="35%" cy="25%" r="70%">
                <stop offset="0%" stopColor="#FF8FA3" />
                <stop offset="45%" stopColor="#C41E3A" />
                <stop offset="100%" stopColor="#6B0F1A" />
              </radialGradient>
            </defs>
            <path
              d="M14 2 C18 6 24 10 22 20 C20 30 14 38 14 38 C14 38 8 30 6 20 C4 10 10 6 14 2 Z"
              fill={`url(#petalGrad-${p.id})`}
              opacity="0.95"
            />
            {/* Subtle highlight/vein */}
            <path
              d="M14 5 C17 9 20 14 19 22 C18 28 14 35 14 35"
              stroke="#FF6B6B"
              strokeWidth="0.5"
              strokeOpacity="0.5"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
