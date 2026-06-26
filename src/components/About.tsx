import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { experiences } from "../data";

// ─── Experience card — collapsed = big heading only, hover = full details ─────

const ACCENT = ["#7EE7FF", "#5B8CFF", "#DA3A16", "#1d9e75"];

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[index % ACCENT.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      // touch support
      onTapStart={() => setHovered((h) => !h)}
      style={{
        borderColor: hovered ? `${accent}44` : "rgba(255,255,255,0.06)",
      }}
      className="relative rounded-2xl border bg-white/[0.018] backdrop-blur-xl overflow-hidden
        cursor-pointer transition-all duration-300 select-none hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]"
    >
      {/* glowing accent line at top */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          transformOrigin: "left",
        }}
        className="absolute top-0 left-0 right-0 h-[2px]"
      />

      {/* subtle background glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${accent}0d, transparent)`,
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative px-6 py-5">
        {/* collapsed view — always visible */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p
              className="font-mono text-[9px] tracking-[.18em] uppercase mb-2 transition-colors duration-300"
              style={{ color: hovered ? accent : "rgba(255,255,255,0.28)" }}
            >
              {exp.period}
            </p>
            <h3
              className="font-serif leading-tight transition-colors duration-300"
              style={{
                fontSize: "clamp(20px, 3vw, 28px)",
                color: hovered ? "#fff" : "rgba(255,255,255,0.82)",
                letterSpacing: "-0.02em",
              }}
            >
              {exp.role}
            </h3>
            <p
              className="font-mono text-[11px] mt-1 transition-colors duration-300"
              style={{
                color: hovered ? `${accent}cc` : "rgba(255,255,255,0.3)",
              }}
            >
              {exp.org}
            </p>
          </div>

          {/* expand indicator */}
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
            style={{ color: accent }}
            className="flex-shrink-0 mt-1 text-lg font-light"
          >
            +
          </motion.div>
        </div>

        {/* expanded detail panel */}
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 20 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* divider */}
              <div
                className="w-full h-px mb-4"
                style={{
                  background: `linear-gradient(90deg, ${accent}44, transparent)`,
                }}
              />

              <p className="text-[13px] text-white/50 leading-relaxed mb-4">
                {exp.summary}
              </p>

              <ul className="flex flex-col gap-2">
                {exp.highlights.slice(0, 3).map((h: string) => (
                  <li
                    key={h}
                    className="flex gap-3 font-mono text-[11px] text-white/40"
                  >
                    <span
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: accent }}
                    >
                      →
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ExperienceCards() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <span
          style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
          className="text-[9px] tracking-[.3em] uppercase text-white/25"
        >
          Experience & milestones
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {experiences.slice(0, 4).map((exp, i) => (
          <ExperienceCard key={exp.id} exp={exp} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Root section ─────────────────────────────────────────────────────────────

export default function About() {
  const [cardFlipped, setCardFlipped] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[.25em] uppercase text-[#DA3A16] mb-4"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            text-white tracking-tighter leading-none mb-16"
        >
          The person behind
          <br className="hidden sm:block" /> the systems.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ── Left: portrait + stats ── */}
          <div className="lg:col-span-5">
            {/* Flip card wrapper */}
            <div
              className="relative aspect-[4/5]"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setCardFlipped(true)}
              onMouseLeave={() => setCardFlipped(false)}
              onClick={() => setCardFlipped((f) => !f)} // touch support
            >
              <motion.div
                animate={{ rotateY: cardFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* ── FRONT ── */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/[0.08]
                    bg-white/[0.018] backdrop-blur-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src="/profile.png"
                    alt="Anupam Mishra"
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <span
                    className="absolute top-4 right-4 bg-[#DA3A16]/15 border border-[#DA3A16]/30
                    rounded-full px-3 py-1 font-mono text-[10px] text-[#DA3A16] tracking-wide"
                  >
                    VIT-AP · 2027
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="font-serif text-3xl text-white tracking-tight">
                      Anupam Mishra
                    </p>
                    <p className="font-mono text-[10px] tracking-[.2em] uppercase text-white/45 mt-2">
                      AI Engineer · Researcher
                    </p>
                  </div>
                  <span
                    className="absolute bottom-4 right-4 font-mono text-[9px] tracking-[.15em]
                    text-white/20 uppercase"
                  >
                    →
                  </span>
                </div>

                {/* ── BACK ── */}
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden border border-white/[0.09]
                    bg-[#0c0c0c] backdrop-blur-xl flex flex-col justify-end px-7 pb-7 pt-8"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(91,140,255,0.06), transparent 60%)",
                    }}
                  />

                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 300,
                    }}
                    className="text-[9px] tracking-[.3em] uppercase text-white/22 mb-[22px]"
                  >
                    Quick facts
                  </p>

                  {[
                    { key: "CGPA", val: "8.7", suffix: "/10", large: true },
                    { key: "Uni", val: "VIT-AP" },
                    { key: "Awards", val: "3", suffix: "+", large: true },
                    { key: "Paper", val: "IEEE · ICICGR 2026", small: true },
                  ].map(({ key, val, suffix, large, small }) => (
                    <div
                      key={key}
                      className="flex justify-between items-baseline py-[13px] border-b border-white/[0.055] last:border-0 gap-3"
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontWeight: 300,
                        }}
                        className="text-[9.5px] tracking-[.18em] uppercase text-white/25 flex-shrink-0"
                      >
                        {key}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontWeight: large ? 500 : 400,
                          fontSize: large ? "26px" : small ? "17px" : "22px",
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                          color: large ? "#fff" : "rgba(255,255,255,0.88)",
                        }}
                      >
                        {val}
                        {suffix && (
                          <span
                            style={{
                              fontSize: "16px",
                              color: "rgba(255,255,255,0.4)",
                              fontWeight: 300,
                            }}
                          >
                            {suffix}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}

                  <div
                    className="inline-flex items-center gap-2 mt-[22px] w-full rounded-full px-4 py-2"
                    style={{
                      background: "rgba(91,140,255,0.07)",
                      border: "1px solid rgba(91,140,255,0.18)",
                    }}
                  >
                    <span className="text-[11px] text-[#7EE7FF] flex-shrink-0">
                      ★
                    </span>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        color: "rgba(126,231,255,0.85)",
                        letterSpacing: "0.01em",
                        lineHeight: 1.2,
                      }}
                    >
                      Best Paper — DRQN in POMDPs
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Right: bio + experience cards ── */}
          <div className="lg:col-span-7 flex flex-col gap-8 pt-0">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28 }}
              className="w-full"
            >
              <ExperienceCards />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
