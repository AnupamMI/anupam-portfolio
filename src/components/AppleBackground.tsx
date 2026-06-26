import { useEffect, useRef } from "react";

/**
 * Professional Apple-inspired background.
 * - Deep graphite base (#000 → #0a0a0f)
 * - Soft, slow-drifting aurora orbs (silver / blue / subtle violet)
 * - Fine grain noise overlay for that premium matte feel
 * - Subtle vignette
 * Fixed full-viewport, pointer-events: none, sits behind all content.
 */
export default function AppleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Grain noise via canvas (cheap, regenerated occasionally)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 180;
    canvas.width = size;
    canvas.height = size;

    let raf = 0;
    let last = 0;

    const draw = (t: number) => {
      if (t - last > 120) {
        const img = ctx.createImageData(size, size);
        const d = img.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = 12; // very subtle
        }
        ctx.putImageData(img, 0, 0);
        last = t;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #14141a 0%, #08080b 55%, #000 100%)" }}
    >
      {/* Aurora orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute rounded-full"
          style={{
            width: "55vw",
            height: "55vw",
            left: "-10vw",
            top: "-15vw",
            background: "radial-gradient(circle, rgba(120,160,220,0.18) 0%, rgba(120,160,220,0) 60%)",
            filter: "blur(40px)",
            animation: "apple-float-a 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "60vw",
            height: "60vw",
            right: "-15vw",
            top: "20vh",
            background: "radial-gradient(circle, rgba(170,140,210,0.14) 0%, rgba(170,140,210,0) 60%)",
            filter: "blur(50px)",
            animation: "apple-float-b 28s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            left: "20vw",
            bottom: "-20vw",
            background: "radial-gradient(circle, rgba(200,210,225,0.10) 0%, rgba(200,210,225,0) 60%)",
            filter: "blur(60px)",
            animation: "apple-float-c 34s ease-in-out infinite",
          }}
        />
      </div>

      {/* Subtle linear sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* Fine grid (almost invisible, adds depth) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Grain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-40 mix-blend-overlay"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <style>{`
        @keyframes apple-float-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(4vw, 3vh) scale(1.08); }
        }
        @keyframes apple-float-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-5vw, -2vh) scale(1.1); }
        }
        @keyframes apple-float-c {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3vw, -4vh) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
