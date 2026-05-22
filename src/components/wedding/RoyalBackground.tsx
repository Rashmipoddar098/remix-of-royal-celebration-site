/**
 * RoyalBackground — shared luxury palace background component
 * Drop this as the first child inside any section's wrapper.
 *
 * variant="light"  → sandalwood/ivory palette (for all content sections)
 * variant="dark"   → deep maroon/charcoal palette (for Welcome & Envelope screens)
 *
 * showJhumars  — render hanging golden chandeliers at top corners  (default true for light, false for dark)
 * showPetals   — render floating crimson rose petals               (default true for light, false for dark)
 * showColumns  — render ornate palace arch column borders          (default true)
 */

import { motion } from "framer-motion";

const PETALS = [
  { left: 8,  delay: 0,    dur: 14, swayAmp: 38, swayPhase: 0,    scale: 1.1,  rot: [0,120,240,360] },
  { left: 17, delay: 1.8,  dur: 18, swayAmp: 50, swayPhase: 1,    scale: 0.8,  rot: [0,90,180,360]  },
  { left: 26, delay: 3.5,  dur: 15, swayAmp: 30, swayPhase: 2,    scale: 1.3,  rot: [0,60,180,360]  },
  { left: 35, delay: 0.6,  dur: 20, swayAmp: 55, swayPhase: 0.5,  scale: 0.9,  rot: [0,45,270,360]  },
  { left: 44, delay: 2.2,  dur: 16, swayAmp: 42, swayPhase: 1.5,  scale: 1.2,  rot: [0,135,225,360] },
  { left: 53, delay: 4.1,  dur: 22, swayAmp: 35, swayPhase: 2.5,  scale: 0.7,  rot: [0,80,200,360]  },
  { left: 62, delay: 1.0,  dur: 17, swayAmp: 48, swayPhase: 0.8,  scale: 1.0,  rot: [0,100,260,360] },
  { left: 71, delay: 5.0,  dur: 19, swayAmp: 60, swayPhase: 1.8,  scale: 1.4,  rot: [0,150,300,360] },
  { left: 80, delay: 2.8,  dur: 21, swayAmp: 32, swayPhase: 3.0,  scale: 0.85, rot: [0,70,220,360]  },
  { left: 89, delay: 0.3,  dur: 13, swayAmp: 45, swayPhase: 0.2,  scale: 1.15, rot: [0,50,170,360]  },
  { left: 12, delay: 6.0,  dur: 24, swayAmp: 40, swayPhase: 1.2,  scale: 0.95, rot: [0,110,230,360] },
  { left: 23, delay: 3.0,  dur: 16, swayAmp: 52, swayPhase: 2.8,  scale: 1.05, rot: [0,95,185,360]  },
  { left: 47, delay: 1.4,  dur: 20, swayAmp: 36, swayPhase: 0.6,  scale: 1.2,  rot: [0,145,290,360] },
  { left: 58, delay: 4.5,  dur: 18, swayAmp: 58, swayPhase: 2.1,  scale: 0.75, rot: [0,55,215,360]  },
  { left: 76, delay: 0.9,  dur: 23, swayAmp: 44, swayPhase: 1.7,  scale: 1.3,  rot: [0,85,250,360]  },
  { left: 91, delay: 3.7,  dur: 15, swayAmp: 33, swayPhase: 2.4,  scale: 0.88, rot: [0,130,265,360] },
  { left: 5,  delay: 5.5,  dur: 19, swayAmp: 47, swayPhase: 0.9,  scale: 1.0,  rot: [0,160,310,360] },
  { left: 38, delay: 2.5,  dur: 17, swayAmp: 53, swayPhase: 1.3,  scale: 1.18, rot: [0,75,195,360]  },
];

interface RoyalBackgroundProps {
  variant?: "light" | "dark";
  showJhumars?: boolean;
  showPetals?: boolean;
  showColumns?: boolean;
  showJaali?: boolean;
  showOverlay?: boolean;
  /** prefix for SVG gradient IDs to avoid collisions between multiple instances */
  idPrefix?: string;
}

export function RoyalBackground({
  variant = "light",
  showJhumars,
  showPetals,
  showColumns = true,
  showJaali = true,
  showOverlay = true,
  idPrefix = "rb",
}: RoyalBackgroundProps) {
  const isLight = variant === "light";

  // Defaults: jhumars & petals on for light, off for dark
  const withJhumars = showJhumars !== undefined ? showJhumars : isLight;
  const withPetals  = showPetals  !== undefined ? showPetals  : isLight;

  /* ── color tokens ── */
  const goldStroke    = isLight ? "#C8A951" : "#D4AF37";
  const goldFill      = isLight ? "#C8A951" : "#D4AF37";
  const colGradStart  = isLight ? "rgba(200,169,81,0.22)" : "rgba(212,175,55,0.15)";
  const jaaliOpacity  = isLight ? "0.18" : "0.10";
  const jaaliColor    = isLight ? "%23C8A951" : "%23D4AF37";

  /* ── Mughal Jaali SVG data-URL ── */
  const jaaliSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect width='60' height='60' fill='none'/%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='${jaaliColor}' stroke-width='0.7' stroke-opacity='${jaaliOpacity}'/%3E%3Ccircle cx='30' cy='30' r='7' fill='none' stroke='${jaaliColor}' stroke-width='0.5' stroke-opacity='${isLight ? "0.14" : "0.09"}'/%3E%3Ccircle cx='0' cy='0' r='4' fill='none' stroke='${jaaliColor}' stroke-width='0.5' stroke-opacity='${isLight ? "0.14" : "0.08"}'/%3E%3Ccircle cx='60' cy='0' r='4' fill='none' stroke='${jaaliColor}' stroke-width='0.5' stroke-opacity='${isLight ? "0.14" : "0.08"}'/%3E%3Ccircle cx='0' cy='60' r='4' fill='none' stroke='${jaaliColor}' stroke-width='0.5' stroke-opacity='${isLight ? "0.14" : "0.08"}'/%3E%3Ccircle cx='60' cy='60' r='4' fill='none' stroke='${jaaliColor}' stroke-width='0.5' stroke-opacity='${isLight ? "0.14" : "0.08"}'/%3E%3Cline x1='30' y1='0' x2='30' y2='60' stroke='${jaaliColor}' stroke-width='0.3' stroke-opacity='0.10'/%3E%3Cline x1='0' y1='30' x2='60' y2='30' stroke='${jaaliColor}' stroke-width='0.3' stroke-opacity='0.10'/%3E%3C/svg%3E")`;

  const ColumnSvg = ({ flip = false }: { flip?: boolean }) => (
    <svg
      viewBox="0 0 90 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={`${idPrefix}ColGrad${flip ? "R" : "L"}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={goldFill} stopOpacity={isLight ? "0.28" : "0.18"} />
          <stop offset="100%" stopColor={goldFill} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="0" width="86" height="800" rx="0" fill={`url(#${idPrefix}ColGrad${flip ? "R" : "L"})`} />
      <line x1="78" y1="0" x2="78" y2="800" stroke={goldStroke} strokeWidth="1.2" strokeOpacity={isLight ? "0.38" : "0.22"} />
      <line x1="74" y1="0" x2="74" y2="800" stroke={goldStroke} strokeWidth="0.4" strokeOpacity={isLight ? "0.20" : "0.12"} />
      {[70, 200, 330, 460, 590, 720].map((cy, idx) => (
        <g key={idx} transform={`translate(39, ${cy})`} opacity={isLight ? "0.50" : "0.30"}>
          <ellipse cx="0" cy="0" rx="14" ry="18" fill={goldFill} fillOpacity="0.15" stroke={goldStroke} strokeWidth="0.6" strokeOpacity="0.55" />
          <path d="M0,-18 C-8,-9 -8,9 0,18 C8,9 8,-9 0,-18 Z" fill={goldFill} fillOpacity="0.28" />
          <path d="M-14,0 C-7,-8 7,-8 14,0 C7,8 -7,8 -14,0 Z" fill={goldFill} fillOpacity="0.28" />
          <circle cx="0" cy="0" r="3" fill={goldFill} fillOpacity="0.65" />
        </g>
      ))}
      <path d="M0,0 Q45,40 90,0" fill={goldFill} fillOpacity={isLight ? "0.14" : "0.08"} />
      <path d="M0,0 Q45,55 90,0" fill="none" stroke={goldStroke} strokeWidth="1" strokeOpacity={isLight ? "0.32" : "0.18"} />
    </svg>
  );

  const JhumarSvg = ({ id }: { id: string }) => (
    <svg viewBox="0 0 120 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      <defs>
        <radialGradient id={`${idPrefix}jhumGold${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE97A" />
          <stop offset="60%" stopColor="#C8A951" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
        <radialGradient id={`${idPrefix}gemRed${id}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#8B0000" />
        </radialGradient>
      </defs>
      {/* Chain links */}
      {[0,14,28,42,56].map((y,i) => (
        <ellipse key={i} cx="60" cy={y+6} rx="5" ry="4" fill={`url(#${idPrefix}jhumGold${id})`} opacity="0.9"/>
      ))}
      {/* Crown disc */}
      <ellipse cx="60" cy="75" rx="36" ry="9" fill={`url(#${idPrefix}jhumGold${id})`} opacity="0.95" />
      <ellipse cx="60" cy="73" rx="30" ry="6" fill="#FFE97A" opacity="0.35" />
      {[-22,-11,0,11,22].map((dx,i) => (
        <ellipse key={i} cx={60+dx} cy="75" rx="4.5" ry="5" fill={`url(#${idPrefix}gemRed${id})`} opacity="0.9"/>
      ))}
      {/* Orb */}
      <ellipse cx="60" cy="98" rx="20" ry="15" fill={`url(#${idPrefix}jhumGold${id})`} opacity="0.95" />
      <ellipse cx="60" cy="93" rx="12" ry="7" fill="#FFE97A" opacity="0.4" />
      {/* Second tier */}
      <ellipse cx="60" cy="115" rx="28" ry="7" fill={`url(#${idPrefix}jhumGold${id})`} opacity="0.9" />
      {[-18,-9,0,9,18].map((dx,i) => (
        <ellipse key={i} cx={60+dx} cy="115" rx="3.5" ry="4" fill={`url(#${idPrefix}gemRed${id})`} opacity="0.85"/>
      ))}
      {/* Hanging strands */}
      {[-24,-16,-8,0,8,16,24].map((dx,i) => (
        <g key={i}>
          <line x1={60+dx} y1="122" x2={60+dx} y2={148+(i%3)*8} stroke="#C8A951" strokeWidth="1" opacity="0.7"/>
          <ellipse cx={60+dx} cy={152+(i%3)*8} rx="4" ry="5.5" fill={`url(#${idPrefix}jhumGold${id})`} opacity="0.9"/>
          <ellipse cx={60+dx} cy={150+(i%3)*8} rx="2.5" ry="1.5" fill="#FFE97A" opacity="0.5"/>
        </g>
      ))}
      {/* Fringe drops */}
      {[-20,-10,0,10,20].map((dx,i) => (
        <g key={i}>
          <line x1={60+dx} y1={168+(i%2)*10} x2={60+dx} y2={195+(i%2)*10} stroke="#C8A951" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2"/>
          <circle cx={60+dx} cy={198+(i%2)*10} r="3.5" fill={`url(#${idPrefix}gemRed${id})`} opacity="0.9"/>
        </g>
      ))}
    </svg>
  );

  return (
    <>
      {/* ── Layer 1: Mughal Jaali SVG Repeating Watermark ── */}
      {showJaali && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: jaaliSvg,
            backgroundRepeat: "repeat",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Layer 2: Left & Right Palace Arch Columns ── */}
      {showColumns && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-[9vw] min-w-[44px] max-w-[90px]"
            style={{ zIndex: 1 }}
          >
            <ColumnSvg />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-[9vw] min-w-[44px] max-w-[90px]"
            style={{ zIndex: 1 }}
          >
            <ColumnSvg flip />
          </div>
        </>
      )}

      {/* ── Layer 3: Hanging Golden Jhumars ── */}
      {withJhumars && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-[2vw] w-[13vw] min-w-[56px] max-w-[120px] origin-top"
            style={{ zIndex: 2 }}
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <JhumarSvg id="L" />
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 right-[2vw] w-[13vw] min-w-[56px] max-w-[120px] origin-top"
            style={{ zIndex: 2, transform: "scaleX(-1)" }}
            animate={{ rotate: [2.5, -2.5, 2.5] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <JhumarSvg id="R" />
          </motion.div>
        </>
      )}

      {/* ── Layer 4: Floating Crimson Rose Petals ── */}
      {withPetals && (
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{ zIndex: 1 }}>
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {PETALS.map((p, i) => (
              <motion.div
                key={`${idPrefix}-rose-${i}`}
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
                  opacity: [0, 0.82, 0.82, 0],
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
                    <radialGradient id={`${idPrefix}petalGrad${i}`} cx="35%" cy="25%" r="70%">
                      <stop offset="0%" stopColor={isLight ? "#FF8FA3" : "#FF6B8A"} />
                      <stop offset="45%" stopColor="#C41E3A" />
                      <stop offset="100%" stopColor="#6B0F1A" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M14 2 C18 6 24 10 22 20 C20 30 14 38 14 38 C14 38 8 30 6 20 C4 10 10 6 14 2 Z"
                    fill={`url(#${idPrefix}petalGrad${i})`}
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
        </div>
      )}

      {/* ── Layer 5: Ambient top/bottom gradient vignettes (light only) ── */}
      {isLight && showOverlay && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{
              background: "linear-gradient(to bottom, rgba(250,246,238,0.55) 0%, transparent 100%)",
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{
              background: "linear-gradient(to top, rgba(232,213,176,0.35) 0%, transparent 100%)",
              zIndex: 0,
            }}
          />
        </>
      )}

      {/* ── Layer 5: Dark radial glow overlay (dark variant only) ── */}
      {!isLight && showOverlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(140,25,40,0.18) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Top gold rule */}
      {showOverlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${isLight ? "rgba(200,169,81,0.55)" : "rgba(212,175,55,0.35)"}, transparent)`,
            zIndex: 3,
          }}
        />
      )}
    </>
  );
}
