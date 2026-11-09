import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const skillCategories = [
  {
    id: "core",
    label: "Core expertise",
    weapon: "Crimson Gradient",
    art: "/armory/crimson.svg",
    color: "#DA3A16",
    proficiency: 92,
    skills: [
      { name: "Deep Reinforcement Learning", level: 95 },
      { name: "Natural Language Processing", level: 88 },
      { name: "Machine Learning", level: 90 },
      { name: "Research & Experimentation", level: 85 },
      { name: "AI & Data Science", level: 92 },
      { name: "PyTorch", level: 88 },
      { name: "scikit-learn", level: 80 },
      { name: "Sequence Modeling", level: 82 },
      { name: "Feature Engineering", level: 78 },
      { name: "Model Evaluation", level: 84 },
      { name: "Data Analysis", level: 86 },
    ],
  },
  {
    id: "software",
    label: "Software development",
    weapon: "Compiler Edge",
    art: "/armory/tech.svg",
    color: "#5B8CFF",
    proficiency: 78,
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 72 },
      { name: "C++", level: 68 },
      { name: "React Native", level: 74 },
      { name: "TypeScript", level: 76 },
      { name: "JavaScript", level: 78 },
    ],
  },
  {
    id: "embedded",
    label: "Embedded & IoT",
    weapon: "Sensor Cleaver",
    art: "/armory/stone.svg",
    color: "#5DCAA5",
    proficiency: 70,
    skills: [
      { name: "Arduino", level: 80 },
      { name: "Raspberry Pi", level: 75 },
      { name: "Sensor Fusion", level: 68 },
      { name: "Embedded Systems", level: 72 },
      { name: "IoT Development", level: 70 },
    ],
  },
  {
    id: "foundations",
    label: "Engineering foundations",
    weapon: "Golden Algorithm",
    art: "/armory/gilded.svg",
    color: "#E6B830",
    proficiency: 82,
    skills: [
      { name: "Data Structures & Algorithms", level: 88 },
      { name: "Object-Oriented Programming", level: 84 },
      { name: "Git & GitHub", level: 90 },
      { name: "Technical Writing", level: 82 },
      { name: "Research Methodology", level: 85 },
    ],
  },
];

function ProficiencyBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-5 pt-4 border-t border-white/[0.06]">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
          Power
        </span>
        <span className="font-mono text-[11px]" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animated ? `${value}%` : "0%",
            background: color,
            transitionDelay: "80ms",
          }}
        />
      </div>
    </div>
  );
}

function SkillTag({
  name,
  level,
  color,
}: {
  name: string;
  level: number;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={`${level}% proficiency`}
      className="inline-block font-mono text-[11px] rounded-full px-3 py-1.5 border transition-all duration-150 cursor-default"
      style={{
        color: hovered ? color : "rgba(255,255,255,0.5)",
        borderColor: hovered ? `${color}55` : "rgba(255,255,255,0.08)",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
      }}
    >
      {name}
    </span>
  );
}

function WeaponRow({
  cat,
  index = 0,
}: {
  cat: (typeof skillCategories)[0];
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const sorted = [...cat.skills].sort((a, b) => b.level - a.level);
  const avg = Math.round(
    cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center
        rounded-2xl border bg-white/[0.018] backdrop-blur-xl p-6 md:p-8 transition-all duration-300"
      style={{
        borderColor: hovered ? `${cat.color}55` : "rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 60px ${cat.color}14` : "none",
      }}
    >
      {/* weapon on its rack */}
      <div className="lg:col-span-6 flex items-center gap-5">
        <span
          className="flex-shrink-0 w-10 h-10 rounded-full border-2 grid place-items-center font-serif text-lg transition-colors"
          style={{ borderColor: hovered ? cat.color : "rgba(255,255,255,0.25)", color: hovered ? cat.color : "rgba(255,255,255,0.7)" }}
        >
          {index + 1}
        </span>
        <div className="relative flex-1">
          {/* rack pegs */}
          <span className="absolute left-[18%] top-1/2 -translate-y-1/2 w-2 h-8 rounded-sm bg-white/[0.06]" />
          <span className="absolute right-[18%] top-1/2 -translate-y-1/2 w-2 h-8 rounded-sm bg-white/[0.06]" />
          <motion.img
            src={cat.art}
            alt={`${cat.weapon}: a double-bladed weapon representing ${cat.label}`}
            draggable={false}
            className="relative w-full h-auto select-none"
            animate={{
              rotate: hovered ? -4 : 0,
              scale: hovered ? 1.06 : 1,
              y: hovered ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            style={{
              filter: hovered
                ? `drop-shadow(0 0 14px ${cat.color}aa) drop-shadow(0 10px 18px rgba(0,0,0,.6))`
                : "drop-shadow(0 8px 14px rgba(0,0,0,.55))",
            }}
          />
        </div>
      </div>

      {/* stats */}
      <div className="lg:col-span-6">
        <div className="flex items-baseline gap-3 flex-wrap mb-1">
          <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight">
            {cat.weapon}
          </h3>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: cat.color }}>
            {cat.label}
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 mb-4">
          {cat.skills.length} abilities
        </p>
        <div className="flex flex-wrap gap-2">
          {sorted.map((s) => (
            <SkillTag key={s.name} name={s.name} level={s.level} color={cat.color} />
          ))}
        </div>
        <ProficiencyBar value={avg} color={cat.color} />
      </div>
    </motion.div>
  );
}

const TABS = [
  { id: "all", label: "All" },
  { id: "core", label: "Core expertise" },
  { id: "software", label: "Software dev" },
  { id: "embedded", label: "Embedded & IoT" },
  { id: "foundations", label: "Foundations" },
];

export default function Skills() {
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === active);

  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#DA3A16] mb-4"
        >
          Capabilities · The Armory
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            text-white tracking-tighter leading-none mb-12"
        >
          Skills, forged.
        </motion.h2>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-1.5 rounded-full border font-mono text-[10px] tracking-[.12em]
                uppercase transition-all duration-200 cursor-pointer
                ${
                  active === tab.id
                    ? "bg-[#5B8CFF]/15 border-[#5B8CFF]/35 text-[#7EE7FF]"
                    : "bg-white/[0.015] border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/70"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <div key={active} className="grid gap-4 grid-cols-1">
            {visible.map((cat, i) => (
              <WeaponRow key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}
