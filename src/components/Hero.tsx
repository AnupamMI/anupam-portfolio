import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  tiltAmount?: number;
  glowColor?: string;
  delay?: number;
  initialY?: number;
  accent?: string;
}

function TiltCard({
  children,
  className = "",
  innerClassName = "",
  tiltAmount = 6,
  glowColor = "rgba(91, 140, 255, 0.08)",
  delay = 0,
  initialY = 40,
  accent,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // spring animations for the spotlight and tilt
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(springY, (v) => {
    if (!cardRef.current) return 0;
    return -(v / cardRef.current.offsetHeight - 0.5) * tiltAmount;
  });
  const rotateY = useTransform(springX, (v) => {
    if (!cardRef.current) return 0;
    return (v / cardRef.current.offsetWidth - 0.5) * tiltAmount;
  });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(350px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`,
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    },
    [mouseX, mouseY],
  );

  const onLeave = useCallback(() => {
    if (!cardRef.current) return;
    mouseX.set(cardRef.current.offsetWidth / 2);
    mouseY.set(cardRef.current.offsetHeight / 2);
  }, [mouseX, mouseY]);

  // Set initial coordinates to center
  const initializeCoordinates = () => {
    if (cardRef.current && mouseX.get() === 0 && mouseY.get() === 0) {
      mouseX.set(cardRef.current.offsetWidth / 2);
      mouseY.set(cardRef.current.offsetHeight / 2);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={initializeCoordinates}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
        borderColor: accent ? `${accent}1a` : "rgba(255,255,255,0.07)",
      }}
      className={`relative group rounded-3xl border bg-white/[0.015] backdrop-blur-xl
        transition-colors duration-300 hover:border-white/[0.14] overflow-hidden flex flex-col ${className}`}
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0"
        style={{ background: spotlightBg }}
      />

      {/* Content wrapper to preserve Z-indexing */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className={`relative z-10 flex flex-col flex-1 w-full h-full ${innerClassName}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left card — Research Mindset */}
        <TiltCard
          delay={0.1}
          glowColor="rgba(126, 231, 255, 0.08)"
          accent="#7EE7FF"
          className="lg:col-span-3 min-h-[420px] order-2 lg:order-1"
          innerClassName="p-9 justify-between"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5B8CFF] shadow-[0_0_6px_#5B8CFF]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">
                  Research Mindset
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-snug text-white/92 mb-5 tracking-tight">
                Deep ML &amp; <br />
                Reinforcement <br />
                Learning.
              </h2>

              <p className="text-[14px] text-white/50 leading-relaxed font-light mt-5">
                Belief-state reasoning, partial observability, and reproducible
                training pipelines. I treat every model as a hypothesis worth
                stress-testing.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["POMDPs", "DRQN", "Sim2Real"].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-white/60 bg-white/[0.05] border border-white/[0.10]
                    rounded-lg px-3 py-1.5 hover:bg-white/[0.10] hover:text-[#7EE7FF] hover:border-[#7EE7FF]/30 transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Center — Core persona */}
        <TiltCard
          delay={0}
          tiltAmount={4}
          glowColor="rgba(250, 70, 30, 0.12)"
          accent="#DA3A16"
          className="lg:col-span-6 min-h-[420px] liquid border-white/[0.12] order-1 lg:order-2"
          innerClassName="p-10 md:p-14 items-center justify-center text-center"
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DA3A16]/25 bg-[#DA3A16]/10 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#DA3A16] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70">
                Available for Research &amp; Projects
              </span>
            </div>

            {/* Name */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.85] text-white tracking-tighter flex flex-col mb-6">
              <span className="font-sans font-bold tracking-tight">ANUPAM</span>
              <span className="font-serif italic font-normal text-gradient tracking-tight">
                MISHRA
              </span>
            </h1>

            {/* Title / Description */}
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">
              AI Engineer · Researcher
            </p>

            <p className="text-[14px] md:text-[15px] text-white/50 max-w-sm mx-auto leading-relaxed font-serif font-normal">
              Building intelligent systems at the intersection of deep
              reinforcement learning, embedded hardware, and user-centric
              design.
            </p>
          </div>
        </TiltCard>

        {/* Right card — Product Thinking */}
        <TiltCard
          delay={0.2}
          glowColor="rgba(91, 140, 255, 0.08)"
          accent="#5B8CFF"
          className="lg:col-span-3 min-h-[420px] order-3"
          innerClassName="p-9 justify-between"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7EE7FF] shadow-[0_0_6px_#7EE7FF]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono">
                  Product Thinking
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-snug text-white/92 mb-5 tracking-tight">
                Where edge <br />
                silicon meets <br />
                architecture.
              </h2>

              <p className="text-[14px] text-white/50 leading-relaxed font-light mt-5">
                I ship end-to-end: from quantized neural kernels on constrained
                edge microcontrollers to real-time control planes and refined
                developer tools.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["Edge AI", "Quantization", "Infra"].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-white/60 bg-white/[0.05] border border-white/[0.10]
                    rounded-lg px-3 py-1.5 hover:bg-white/[0.10] hover:text-[#5B8CFF] hover:border-[#5B8CFF]/30 transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 font-mono">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent relative">
          <motion.div
            className="absolute top-0 left-0 right-0 w-full bg-[#7EE7FF] h-3 rounded-full"
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
