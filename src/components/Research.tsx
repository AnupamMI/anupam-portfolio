import { motion } from "framer-motion";

export default function ResearchLab() {
  return (
    <section id="research" className="relative w-full py-24 md:py-32 overflow-hidden">

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#DA3A16] mb-4"
        >
          IEEE BEST PAPER • ICICGR 2026
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-none"
        >
          Research Lab<span className="text-[#7EE7FF]"> // </span>POMDP Frameworks
        </motion.h2>
      </div>

      {/* Academic Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Core Research Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 rounded-3xl border border-white/[0.07] bg-white/[0.018] p-8 md:p-10 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_0_50px_rgba(91,140,255,0.03)] group"
        >
          <div>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-6 leading-tight">
              Belief-State Learning in Partially Observable Environments using DRQN
            </h3>

            <p className="font-mono text-xs tracking-widest text-[#5B8CFF] mb-6">
              DEEP RECURRENT Q-NETWORK • PARTIALLY OBSERVABLE MARKOV DECISION PROCESS
            </p>

            <p className="text-lg text-white/75 leading-relaxed font-light">
              The study investigates how temporal memory influences decision-making under partial observability by
              comparing DQN and DRQN agents in a custom 8×8 gridworld where only a local 5×5 observation window is available.
              Across 16 independent training seeds, DRQN consistently outperformed DQN with <span className="text-[#7EE7FF] font-medium">~23% performance improvement</span>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-10">
            {["POMDPs", "DRQN", "LSTM", "Belief States", "Reinforcement Learning", "IEEE"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="text-xs font-mono text-white/60 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 hover:bg-white/[0.08] hover:text-white/90 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 rounded-3xl border border-white/[0.07] bg-white/[0.018] p-8 flex flex-col backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_0_50px_rgba(91,140,255,0.03)]"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">
            ARCHITECTURE FLOW
          </p>

          <div className="flex-1 flex items-center justify-center py-4">
            <svg
              className="w-full h-auto"
              viewBox="0 0 680 280"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <title>DRQN architecture</title>
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </marker>
              </defs>

              {/* Step labels */}
              <text x="105" y="38" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="13">Observation</text>
              <text x="255" y="38" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="13">Memory</text>
              <text x="415" y="38" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="13">Belief</text>
              <text x="572" y="38" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="13">Output</text>

              {/* Box 1 — coral */}
              <rect x="30" y="55" width="150" height="130" rx="10" fill="rgba(216,90,48,0.12)" stroke="#D85A30" strokeWidth="1.5"/>
              <text x="105" y="112" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="22" fontWeight="600">5 × 5</text>
              <text x="105" y="146" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.5)" fontSize="13">grid input</text>

              {/* Arrow 1 */}
              <line x1="182" y1="120" x2="174" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
              <line x1="174" y1="120" x2="178" y2="120" stroke="rgba(255,255,255,0.0)" strokeWidth="0"/>
              <line x1="182" y1="120" x2="176" y2="120" stroke="rgba(255,255,255,0)" strokeWidth="0"/>
              <line x1="183" y1="120" x2="220" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" markerEnd="url(#arrow)"/>
              <text x="201" y="109" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11">partial obs.</text>

              {/* Box 2 — purple */}
              <rect x="224" y="55" width="150" height="130" rx="10" fill="rgba(127,119,221,0.12)" stroke="#7F77DD" strokeWidth="1.5"/>
              <text x="299" y="112" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="22" fontWeight="600">LSTM</text>
              <text x="299" y="146" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.5)" fontSize="13">hidden state h_t</text>

              {/* Arrow 2 */}
              <line x1="376" y1="120" x2="410" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" markerEnd="url(#arrow)"/>
              <text x="393" y="109" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11">belief state</text>

              {/* Box 3 — teal */}
              <rect x="414" y="55" width="150" height="130" rx="10" fill="rgba(29,158,117,0.12)" stroke="#1D9E75" strokeWidth="1.5"/>
              <text x="489" y="112" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="22" fontWeight="600">Belief</text>
              <text x="489" y="146" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.5)" fontSize="13">P(s | o₁…oₜ)</text>

              {/* Arrow 3 */}
              <line x1="566" y1="120" x2="496" y2="120" stroke="rgba(255,255,255,0)" strokeWidth="0"/>
              <line x1="566" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" markerEnd="url(#arrow)"/>
              <text x="583" y="109" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="11">action values</text>

              {/* Box 4 — amber with Q-value bars */}
              <rect x="604" y="55" width="60" height="130" rx="10" fill="rgba(186,117,23,0.12)" stroke="#BA7517" strokeWidth="1.5"/>
              <rect x="616" y="74"  width="8" height="44" rx="2" fill="#EF9F27" opacity="0.65"/>
              <rect x="628" y="90"  width="8" height="28" rx="2" fill="#EF9F27" opacity="0.65"/>
              <rect x="616" y="126" width="8" height="10" rx="2" fill="#EF9F27" opacity="0"/>
              <rect x="640" y="82"  width="8" height="36" rx="2" fill="#EF9F27" opacity="0.65"/>
              <rect x="628" y="74"  width="8" height="26" rx="2" fill="#EF9F27" opacity="0"/>
              <rect x="616" y="74"  width="8" height="44" rx="2" fill="#EF9F27" opacity="0.65"/>
              <rect x="628" y="86"  width="8" height="32" rx="2" fill="#EF9F27" opacity="0.65"/>
              <rect x="640" y="80"  width="8" height="38" rx="2" fill="#EF9F27" opacity="0.65"/>
              <text x="634" y="148" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="10" fontWeight="600">Q-vals</text>

              {/* Recurrent feedback loop */}
              <path
                d="M299 187 Q299 225 390 225 Q480 225 489 187"
                fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"
                strokeDasharray="5 4" markerEnd="url(#arrow)"
              />
              <text x="394" y="244" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="11">
                recurrent memory across timesteps
              </text>
            </svg>
          </div>

          <div className="pt-6 border-t border-white/[0.08] mt-auto">
            <p className="font-mono text-[9px] tracking-widest text-center text-white/30">
              RECURRENT HIDDEN STATE TRACKING
            </p>
          </div>
        </motion.div>

        {/* Card 3: Statistical Results */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 rounded-3xl border border-white/[0.07] bg-white/[0.018] p-8 flex flex-col backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_0_50px_rgba(91,140,255,0.03)]"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-7 font-mono text-sm">
            <div className="space-y-4">
              <p className="text-white/30 text-[10px] tracking-[0.2em] border-b border-white/[0.06] pb-2">PROTOCOL</p>
              <div><span className="text-white/50 text-xs block">SEEDS</span><span className="text-2xl font-semibold text-white">16</span></div>
              <div><span className="text-white/50 text-xs block">EPISODES</span><span className="text-2xl font-semibold text-white">600</span></div>
              <div><span className="text-white/50 text-xs block">GRID</span><span className="text-2xl font-semibold text-white">8×8</span></div>
              <div><span className="text-white/50 text-xs block">WINDOW</span><span className="text-2xl font-semibold text-white">5×5</span></div>
            </div>

            <div className="space-y-4">
              <p className="text-white/30 text-[10px] tracking-[0.2em] border-b border-white/[0.06] pb-2">RESULTS</p>
              <div>
                <span className="text-white/50 text-xs block">DRQN MEAN</span>
                <span className="text-2xl font-semibold text-[#7EE7FF]">-39.67</span>
              </div>
              <div>
                <span className="text-white/50 text-xs block">DQN MEAN</span>
                <span className="text-2xl font-semibold text-white/70">-51.63</span>
              </div>
              <div>
                <span className="text-white/50 text-xs block">IMPROVEMENT</span>
                <span className="text-3xl font-bold text-[#7EE7FF]">+23.17%</span>
              </div>
              <div>
                <span className="text-white/50 text-xs block">p-value</span>
                <span className="text-xl font-medium">0.020</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/[0.08]">
            <p className="font-mono text-[9px] tracking-widest text-white/30">
              STATISTICALLY SIGNIFICANT • 16 SEEDS
            </p>
          </div>
        </motion.div>

        {/* Card 4: Epistemological Insight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 rounded-3xl border border-white/[0.07] bg-white/[0.018] p-10 md:p-12 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-amber-500/25 hover:shadow-[0_0_50px_rgba(232,168,124,0.03)] group"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 border border-amber-500/10 rounded-full" />

          <div>
            <p className="font-mono text-amber-400 text-xs tracking-[0.25em] mb-6">CORE INSIGHT</p>
            <blockquote className="font-serif text-[22px] md:text-3xl leading-tight text-white/90 italic">
              "Temporal memory enables the agent to form implicit belief-state representations, resulting in faster convergence,
              reduced variance, and more reliable decision-making under partial observability."
            </blockquote>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-amber-400/90">IEEE BEST PAPER</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
