import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

type Line = { type: "input" | "output" | "system"; text: string };

const HELP: Line[] = [
  { type: "system", text: "Available commands:" },
  { type: "output", text: "  help     — show this message" },
  { type: "output", text: "  about    — who is anupam" },
  { type: "output", text: "  contact  — reach out" },
  { type: "output", text: "  resume   — download résumé" },
  { type: "output", text: "  skills   — list capabilities" },
  { type: "output", text: "  clear    — clear terminal" },
];

const ABOUT: Line[] = [
  { type: "system", text: "// about" },
  {
    type: "output",
    text: "Anupam Mishra — AI Engineer, Researcher, Builder, Product Thinker.",
  },
  {
    type: "output",
    text: "Focus: belief-state RL, embedded AI, distributed training infra.",
  },
  {
    type: "output",
    text: "IEEE Best Paper awardee. CGPA 8.7/10. 5+ shipped projects.",
  },
];

const CONTACT: Line[] = [
  { type: "system", text: "// contact" },
  { type: "output", text: "→ email    anupsm.mishra123@gmail.com" },
  { type: "output", text: "→ github   github.com/AnupamMI" },
  {
    type: "output",
    text: "→ linkedin linkedin.com/in/anupam-mishra-662b8721a",
  },
  { type: "output", text: "→ status   open to research + product roles" },
];

const SKILLS: Line[] = [
  { type: "system", text: "// skills" },
  {
    type: "output",
    text: "AI/ML      PyTorch · RL · GNNs · Transformers · Quantization",
  },
  {
    type: "output",
    text: "Dev        Go · Rust · TypeScript · gRPC · Kubernetes",
  },
  {
    type: "output",
    text: "Embedded   C · CMSIS-NN · FreeRTOS · LoRaWAN · DMA",
  },
  {
    type: "output",
    text: "Research   POMDPs · Sim2Real · IEEE · Reproducibility",
  },
];

const QUICK = ["help", "about", "contact", "skills", "resume"];

export default function ContactTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "/dev/anupam — interactive shell v1.0" },
    { type: "system", text: 'type "help" to begin.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const newLines: Line[] = [...lines, { type: "input", text: raw }];
      if (!cmd) {
        setLines(newLines);
        return;
      }
      setHistory((h) => [raw, ...h]);
      setHIndex(-1);

      switch (cmd) {
        case "help":
          setLines([...newLines, ...HELP]);
          break;
        case "about":
          setLines([...newLines, ...ABOUT]);
          break;
        case "contact":
          setLines([...newLines, ...CONTACT]);
          break;
        case "skills":
          setLines([...newLines, ...SKILLS]);
          break;
        case "resume":
          setLines([
            ...newLines,
            { type: "system", text: "→ preparing cryptographic asset..." },
            { type: "output", text: "resume.pdf  ████████████████  done" },
          ]);
          setTimeout(() => {
            const a = document.createElement("a");
            a.href = "/Anupam_Resume.pdf";
            a.download = "Anupam_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }, 500);
          break;
        case "clear":
          setLines([]);
          break;
        case "sudo":
          setLines([
            ...newLines,
            {
              type: "output",
              text: "anupam is not in the sudoers file. this incident will be reported. 🜂",
            },
          ]);
          break;
        default:
          setLines([
            ...newLines,
            {
              type: "output",
              text: `command not found: ${cmd}. type "help" for options.`,
            },
          ]);
      }
    },
    [lines],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (next >= 0) {
        setHIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      if (next < 0) {
        setHIndex(-1);
        setInput("");
      } else {
        setHIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
          className="text-[9px] tracking-[.3em] uppercase text-[#DA3A16] mb-4"
        >
          Contact
        </motion.p>

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tighter leading-none mb-16"
        >
          Open a session.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-white/[0.08] backdrop-blur-xl bg-white/[0.015] hover:border-white/[0.13] transition-all duration-500"
        >
          {/* chrome bar */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06] bg-black/40">
            <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]/80" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]/80" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]/80" />
            <span
              className="ml-4 text-white/30"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "11px",
                letterSpacing: "0.08em",
              }}
            >
              /dev/anupam — zsh
            </span>
            <span
              className="ml-auto text-white/15"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.05em",
              }}
            >
              utf-8
            </span>
          </div>

          {/* terminal body */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="p-8 h-96 overflow-y-auto cursor-text"
            style={{ scrollbarWidth: "none" }}
          >
            {lines.map((l, i) => (
              <div
                key={i}
                className="mb-[5px] leading-relaxed"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color:
                    l.type === "input"
                      ? "#ffffff"
                      : l.type === "system"
                        ? "rgba(126,231,255,0.65)"
                        : "rgba(255,255,255,0.50)",
                }}
              >
                {l.type === "input" && (
                  <span style={{ color: "#5B8CFF", marginRight: "8px" }}>
                    $
                  </span>
                )}
                {l.text}
              </div>
            ))}

            {/* input row */}
            <div className="flex items-center mt-1">
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "13px",
                  color: "#5B8CFF",
                  marginRight: "8px",
                  letterSpacing: "0.04em",
                }}
              >
                $
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal input"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  color: "#ffffff",
                  caretColor: "#7EE7FF",
                }}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* quick commands */}
          <div className="flex flex-wrap gap-2 px-8 py-5 border-t border-white/[0.06] bg-black/20">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => run(q)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "10.5px",
                  letterSpacing: "0.12em",
                }}
                className="text-white/40 border border-white/[0.08] rounded-full px-4 py-[7px]
                  hover:text-[#7EE7FF] hover:border-[#7EE7FF]/25 transition-all duration-300
                  uppercase tracking-widest"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        {/* footer */}
        <p
          className="text-center text-white/20 mt-10"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 300,
            fontSize: "10px",
            letterSpacing: "0.15em",
          }}
        >
          built with intent · react · three.js · framer motion · gsap · lenis
        </p>
      </div>
    </section>
  );
}
