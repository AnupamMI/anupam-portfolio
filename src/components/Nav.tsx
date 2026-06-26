import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navSections } from "../data";

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    navSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => go("hero")}
            aria-label="Home"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              fontSize: "clamp(22px, 3vw, 28px)",
              letterSpacing: "-0.02em",
              color: "rgba(255,255,255,0.92)",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7EE7FF")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.92)")
            }
          >
            AM
          </button>

          {/* Desktop nav pills */}
          <div className="hidden lg:flex items-center gap-1 rounded-full px-2 py-1.5 border border-white/[0.07] bg-white/[0.03] backdrop-blur-md">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="relative px-5 py-2 transition-colors"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: active === s.id ? "#fff" : "rgba(255,255,255,0.45)",
                  transition: "color 0.3s",
                }}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.10]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="mailto:anupsm.mishra123@gmail.com"
            className="hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2
              border border-white/[0.10] bg-white/[0.03]
              hover:border-[#7EE7FF]/25 hover:bg-[#7EE7FF]/[0.05]
              transition-all duration-300"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#28c840] animate-pulse flex-shrink-0" />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              hire me
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
          >
            <span
              className={`h-px w-5 bg-white/70 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`h-px w-5 bg-white/70 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`h-px w-5 bg-white/70 transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-b border-white/[0.06] bg-black/60 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navSections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(s.id)}
                  className="text-left py-3 border-b border-white/[0.05] last:border-0 transition-colors"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color:
                      active === s.id ? "#7EE7FF" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {active === s.id && (
                    <span style={{ color: "#5B8CFF", marginRight: "10px" }}>
                      →
                    </span>
                  )}
                  {s.label}
                </motion.button>
              ))}

              <a
                href="mailto:anupsm.mishra123@gmail.com"
                className="mt-4 flex items-center gap-2"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <span className="h-[5px] w-[5px] rounded-full bg-[#28c840] animate-pulse" />
                hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
