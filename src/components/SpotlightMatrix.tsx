import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { projects, type Project } from "../data";

// ─── Bento layout config ──────────────────────────────────────────────────────

const LAYOUT = [
  { idx: 0, className: "md:col-span-2 lg:col-span-2" }, // wide feature
  { idx: 2, className: "md:col-span-1 lg:col-span-1" }, // tall-ish
  { idx: 3, className: "md:col-span-1 lg:col-span-1" }, // standard
  { idx: 1, className: "md:col-span-2 lg:col-span-2" }, // wide feature
];

// ─── Root section ─────────────────────────────────────────────────────────────

export default function SpotlightMatrix() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="relative w-full py-24 md:py-32 overflow-hidden">

      {/* header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-12 md:mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#DA3A16] mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            text-white tracking-tighter leading-none"
        >
          Things I've built,<br className="hidden sm:block" />
          <em className="font-serif italic text-white/60"> shipped, and defended.</em>
        </motion.h2>
      </div>

      {/* bento grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[300px] md:auto-rows-[340px]">
          {LAYOUT.map(({ idx, className }, layoutIdx) => (
            <SpotlightCard
              key={projects[idx].id}
              project={projects[idx]}
              className={className}
              delay={layoutIdx * 0.08}
              onClick={() => setSelected(projects[idx])}
            />
          ))}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <ProjectDeepDive project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Spotlight card ───────────────────────────────────────────────────────────

function SpotlightCard({
  project,
  className,
  delay,
  onClick,
}: {
  project: Project;
  className: string;
  delay: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);

  // spring-smoothed spotlight
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  // 3-D tilt
  const rotateX = useTransform(springY, (v) => {
    if (!cardRef.current) return 0;
    return -(v / cardRef.current.offsetHeight - 0.5) * 10;
  });
  const rotateY = useTransform(springX, (v) => {
    if (!cardRef.current) return 0;
    return (v / cardRef.current.offsetWidth - 0.5) * 10;
  });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(520px circle at ${x}px ${y}px, ${project.accent}1a, transparent 60%)`
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    },
    [mouseX, mouseY]
  );

  const onLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer h-full ${className}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* card shell */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col
          border border-white/[0.07] bg-white/[0.018]
          group-hover:border-white/[0.14] transition-colors duration-300"
        style={{ transform: "translateZ(0)" }}
      >
        {/* spotlight gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlightBg }}
        />

        {/* micro grid */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`g-${project.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#g-${project.id})`} />
          </svg>
        </div>

        {/* accent radial wash */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]"
          style={{
            background: `radial-gradient(90% 60% at 50% 0%, ${project.accent} 0%, transparent 70%)`,
          }}
        />

        {/* content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          {/* top */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: project.accent, boxShadow: `0 0 6px ${project.accent}` }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                {project.category}
              </span>
              <span className="ml-auto font-mono text-[10px] text-white/20">{project.year}</span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white tracking-tight leading-[1.1] mb-2">
              {project.title}
            </h3>

            <p className="text-[13px] text-white/45 leading-relaxed line-clamp-2 max-w-xl">
              {project.tagline}
            </p>
          </div>

          {/* bottom */}
          <div>
            {/* stack chips */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] text-white/40 bg-white/[0.03]
                    border border-white/[0.06] rounded-md px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="font-mono text-[10px] text-white/25 px-1">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* stat bar */}
            <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-[0.15em]">
                Key metric
              </span>

              <div className="flex items-center gap-2">
                {/* mini sparkline */}
                <svg width="44" height="16" viewBox="0 0 44 16" fill="none">
                  <polyline
                    points="2,14 10,10 18,11 26,6 34,8 42,3"
                    stroke={project.accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                  />
                </svg>
                <span
                  className="font-mono text-[11px] font-medium tracking-[0.12em]
                    px-2.5 py-1 rounded-md border"
                  style={{
                    background: `${project.accent}12`,
                    borderColor: `${project.accent}28`,
                    color: project.accent,
                  }}
                >
                  {project.metrics[0]?.value ?? "Production"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* border glow on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-20
            opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ boxShadow: `inset 0 0 0 1px ${project.accent}30` }}
        />

        {/* click hint */}
        <div
          className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5
            opacity-0 group-hover:opacity-100 transition-all duration-300
            translate-y-1 group-hover:translate-y-0"
        >
          <span className="font-mono text-[10px] text-white/30 tracking-wide">Open</span>
          <span style={{ color: project.accent }} className="text-sm">↗</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tabs config ──────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",      label: "Overview"      },
  { id: "architecture",  label: "Architecture"  },
  { id: "metrics",       label: "Metrics"       },
  { id: "repository",    label: "Repository"    },
  { id: "learnings",     label: "Learnings"     },
];

// ─── Deep-dive modal ──────────────────────────────────────────────────────────

function ProjectDeepDive({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto"
    >
      <div className="min-h-screen flex items-start justify-center p-4 md:p-8">
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 24 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{   scale: 0.97,  opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="relative z-10 w-full max-w-6xl my-8 rounded-3xl overflow-hidden
            border border-white/[0.09] bg-[#080810]"
          style={{ boxShadow: `0 0 80px ${project.accent}18, 0 40px 120px rgba(0,0,0,0.7)` }}
        >
          {/* top accent bar */}
          <div
            className="h-[3px] w-full"
            style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 70%)` }}
          />

          {/* hero */}
          <div
            className="relative h-44 md:h-60 lg:h-72 flex items-end
              p-6 md:p-8 lg:p-10 border-b border-white/[0.06]"
            style={{
              background: `
                radial-gradient(110% 100% at 50% 0%, ${project.accent}28 0%, transparent 65%),
                linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)
              `,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 md:top-6 md:right-6 h-9 w-9 rounded-full
                bg-white/[0.06] border border-white/[0.1] flex items-center justify-center
                text-white/50 hover:text-white hover:rotate-90 transition-all text-lg leading-none"
            >
              ✕
            </button>

            <div className="relative z-10">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                {project.category} · {project.year}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
                {project.title}
              </h2>
              <p className="text-[14px] text-white/50 mt-2 max-w-xl leading-relaxed">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* body */}
          <div className="flex flex-col lg:flex-row min-h-[460px]">
            {/* sidebar nav */}
            <div className="lg:w-56 border-b lg:border-b-0 lg:border-r border-white/[0.06]
              p-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-shrink-0 text-left px-4 py-2.5 rounded-xl
                      transition-all duration-200 group"
                    style={{
                      background: isActive ? `${project.accent}14` : "transparent",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                        style={{ background: project.accent }}
                      />
                    )}
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* content area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                {activeTab === "overview"     && <OverviewTab     key="ov"   project={project} />}
                {activeTab === "architecture" && <ArchitectureTab key="ar"   project={project} />}
                {activeTab === "metrics"      && <MetricsTab      key="me"   project={project} />}
                {activeTab === "repository"   && <RepositoryTab   key="re"   project={project} />}
                {activeTab === "learnings"    && <LearningsTab    key="le"   project={project} />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Shared tab wrapper ───────────────────────────────────────────────────────

function TabWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8"
    >
      {children}
    </motion.div>
  );
}

function TabHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-xl md:text-2xl text-white tracking-tight leading-tight mb-6">
      {children}
    </h3>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewTab({ project }: { project: Project }) {
  return (
    <TabWrapper>
      <div>
        <TabHeading>Problem</TabHeading>
        <p className="text-[15px] text-white/60 leading-[1.75]">{project.overview}</p>
      </div>

      <div>
        <TabHeading>Impact</TabHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
            >
              <p className="font-serif text-3xl text-white leading-none mb-2">{m.value}</p>
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/35">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <TabHeading>Stack</TabHeading>
        <div className="flex flex-wrap gap-2.5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] text-white/55 border border-white/[0.09]
                rounded-full px-4 py-1.5 bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </TabWrapper>
  );
}

// ─── Architecture ─────────────────────────────────────────────────────────────

function ArchitectureTab({ project }: { project: Project }) {
  const nodes = project.architecture ?? [
    "Data Ingestion",
    "Processing Layer",
    "Model Inference",
    "Output Interface",
  ];
  const W = 560;
  const STEP = Math.floor(W / (nodes.length + 1));

  return (
    <TabWrapper>
      <TabHeading>System Architecture</TabHeading>

      {/* flow diagram */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} 160`} className="w-full min-w-[360px]" fill="none">
          <defs>
            <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={project.accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={project.accent} stopOpacity="0.9" />
            </linearGradient>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill={project.accent} opacity="0.7" />
            </marker>
          </defs>

          {nodes.map((label, i) => {
            const cx = STEP * (i + 1);
            return (
              <g key={label}>
                {/* connector */}
                {i < nodes.length - 1 && (
                  <line
                    x1={cx + 28} y1={80}
                    x2={STEP * (i + 2) - 28} y2={80}
                    stroke="url(#flowLine)"
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                  />
                )}
                {/* node circle */}
                <circle
                  cx={cx} cy={80} r={26}
                  fill={`${project.accent}18`}
                  stroke={project.accent}
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <text
                  x={cx} y={84}
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.7"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                {/* label below */}
                <text
                  x={cx} y={124}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {label.length > 12 ? label.slice(0, 11) + "…" : label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* layer cards */}
      <div className="space-y-3">
        {nodes.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 items-start rounded-xl p-4 border border-white/[0.06]
              bg-white/[0.015]"
            style={{ borderLeftColor: project.accent, borderLeftWidth: 3 }}
          >
            <span
              className="font-mono text-[10px] mt-0.5 flex-shrink-0"
              style={{ color: project.accent }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-[13px] text-white/60 leading-relaxed">{label}</p>
          </motion.div>
        ))}
      </div>
    </TabWrapper>
  );
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

function MetricsTab({ project }: { project: Project }) {
  return (
    <TabWrapper>
      <TabHeading>Key Metrics</TabHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {project.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8
              hover:border-white/[0.12] transition-colors"
          >
            <p className="font-serif text-5xl text-white tracking-tight mb-3">{m.value}</p>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35">
              {m.label}
            </p>
            {/* fake bar */}
            <div className="mt-5 h-px bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: project.accent }}
                initial={{ width: 0 }}
                animate={{ width: `${30 + i * 22}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </TabWrapper>
  );
}

// ─── Repository ───────────────────────────────────────────────────────────────

function RepositoryTab({ project }: { project: Project }) {
  return (
    <TabWrapper>
      <TabHeading>Repository</TabHeading>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <p className="font-serif text-xl text-white mb-1">{project.title}</p>
            <p className="text-[13px] text-white/45 leading-relaxed">{project.tagline}</p>
          </div>
          {/* language dot */}
          <span className="flex items-center gap-1.5 flex-shrink-0 mt-1">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: project.accent }}
            />
            <span className="font-mono text-[10px] text-white/35">{project.stack[0]}</span>
          </span>
        </div>

        {/* stat row */}
        <div className="flex gap-6 pb-6 border-b border-white/[0.06] mb-6">
          {[
            { label: "Modules",   value: "4"                          },
            { label: "Stack",     value: String(project.stack.length) },
            { label: "Metrics",   value: String(project.metrics.length) },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-2xl text-white">{s.value}</p>
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/30 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <a
          href={project.repository ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl
            border border-white/[0.1] bg-white/[0.04]
            font-mono text-[11px] text-white/70 hover:text-white
            hover:border-white/[0.18] transition-all"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current" aria-hidden>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
              0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
              0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27
              1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95
              .29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2
              0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          View on GitHub ↗
        </a>
      </div>
    </TabWrapper>
  );
}

// ─── Learnings ────────────────────────────────────────────────────────────────

const LEARNING_CARDS = [
  {
    label: "Challenges",
    accent: "#e6b830",
    text: (t: string) =>
      `Navigating real constraints in ${t} required tight iteration cycles — each blocker forced a sharper model of the problem.`,
  },
  {
    label: "Trade-offs",
    accent: "#5b8cff",
    text: () =>
      "Completeness vs. ship date. Core experience won every time — nice-to-haves were catalogued, not deleted.",
  },
  {
    label: "Failures",
    accent: "#DA3A16",
    text: (t: string) =>
      `Initial ${t} integration was overengineered. Rebuilding with a narrower interface cut complexity and made the system easier to reason about.`,
  },
  {
    label: "Optimisations",
    accent: "#1d9e75",
    text: () =>
      "Profiling surfaced two hot paths that accounted for 80% of latency. Targeted fixes, not rewrites.",
  },
  {
    label: "Next steps",
    accent: "#c45ab3",
    text: (t: string) =>
      `Expanded ${t} coverage, improved accessibility, and a proper evaluation harness are on the roadmap.`,
  },
];

function LearningsTab({ project }: { project: Project }) {
  return (
    <TabWrapper>
      <TabHeading>Learnings</TabHeading>

      <div className="space-y-3">
        {LEARNING_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl p-5 border border-white/[0.06] bg-white/[0.015]"
            style={{ borderLeftColor: card.accent, borderLeftWidth: 3 }}
          >
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase mb-2"
               style={{ color: card.accent }}>
              {card.label}
            </p>
            <p className="text-[13px] text-white/55 leading-relaxed">
              {card.text(project.stack[0])}
            </p>
          </motion.div>
        ))}
      </div>
    </TabWrapper>
  );
}