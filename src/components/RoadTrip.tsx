import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  detail: string;
  color: string;
};

const MILESTONES: Milestone[] = [
  { year: "2023", title: "Started B.Tech CSE (AI & ML)", detail: "VIT-AP University", color: "#7EE7FF" },
  { year: "2024", title: "SignTalk", detail: "Best Socially Relevant Project", color: "#5B8CFF" },
  { year: "2025", title: "CareLink", detail: "1st Place · APPTHETICS 3.0", color: "#F0ABFC" },
  { year: "2026", title: "IEEE Best Paper", detail: "ICICGR 2026 · DRQN for POMDPs", color: "#FCD34D" },
  { year: "2026", title: "AI/ML Intern", detail: "MiMD Lab, IIT Delhi", color: "#FF4FD8" },
  { year: "2026", title: "Annotation ExE goes live", detail: "Whole-slide annotation platform", color: "#7EE7FF" },
];

/** One roadside sign: rises from the horizon, grows, and passes off to one side. */
function Sign({
  m,
  index,
  total,
  progress,
}: {
  m: Milestone;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span * 1.25; // slight overlap so the road is never empty
  const side = index % 2 === 0 ? -1 : 1;

  const scale = useTransform(progress, [start, end], [0.18, 1.15]);
  const x = useTransform(progress, [start, end], ["0vw", `${side * 30}vw`]);
  const y = useTransform(progress, [start, end], ["6vh", "-14vh"]);
  const opacity = useTransform(
    progress,
    [start, start + span * 0.2, end - span * 0.3, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ scale, x, y, opacity }}
      className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div
        className="relative w-[min(78vw,360px)] rounded-xl border-2 bg-black/70 backdrop-blur-sm px-6 py-5 text-center"
        style={{
          borderColor: m.color,
          boxShadow: `0 0 24px ${m.color}80, inset 0 0 18px ${m.color}33`,
        }}
      >
        <p className="font-mono text-[11px] tracking-[0.3em]" style={{ color: m.color }}>
          {m.year}
        </p>
        <p className="font-serif text-3xl md:text-4xl text-white leading-tight mt-1">{m.title}</p>
        <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-white/60 mt-2">
          {m.detail}
        </p>
        {/* sign post */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-full w-1 h-10 opacity-60"
          style={{ background: `linear-gradient(${m.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function Odometer({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(80vw,420px)]">
      <div className="flex justify-between font-mono text-[9px] tracking-[0.25em] uppercase text-white/45 mb-2">
        <span>2023</span>
        <span>{total} stops</span>
        <span>Now</span>
      </div>
      <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ width, background: "linear-gradient(90deg,#7EE7FF,#FF4FD8)" }}
        />
      </div>
    </div>
  );
}

export default function RoadTrip() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [1, 0.9, 0.9, 0]);

  // Reduced motion: a still scene with the milestones as a simple list.
  if (reduce) {
    return (
      <section id="journey" className="relative w-full py-24">
        <div className="relative max-w-5xl mx-auto px-4 overflow-hidden rounded-3xl border border-white/10">
          <img src="/synthwave-road.svg" alt="" className="w-full h-auto block" />
        </div>
        <ol className="max-w-3xl mx-auto px-6 mt-10 space-y-4">
          {MILESTONES.map((m) => (
            <li key={m.title} className="flex gap-4 items-baseline">
              <span className="font-mono text-xs" style={{ color: m.color }}>{m.year}</span>
              <span className="font-serif text-2xl text-white">{m.title}</span>
              <span className="font-mono text-[11px] uppercase text-white/50">{m.detail}</span>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={ref}
      className="relative w-full"
      style={{ height: `${MILESTONES.length * 70 + 60}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The scene: grid scrolls, sun pulses, car hovers (animated inside the SVG) */}
        <img
          src="/synthwave-road.svg"
          alt="Retro car driving down a neon grid road toward a striped sunset"
          className="absolute inset-0 w-full h-full object-cover object-bottom select-none"
          draggable={false}
        />
        {/* blend into the rest of the page */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-24 md:top-28 inset-x-0 text-center px-4"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF4FD8] mb-3">
            Journey
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow-[0_0_24px_rgba(255,79,216,0.45)]">
            The road so far.
          </h2>
        </motion.div>

        {MILESTONES.map((m, i) => (
          <Sign key={m.title} m={m} index={i} total={MILESTONES.length} progress={scrollYProgress} />
        ))}

        <Odometer progress={scrollYProgress} total={MILESTONES.length} />
      </div>
    </section>
  );
}
