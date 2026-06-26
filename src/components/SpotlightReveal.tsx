import { useEffect, useRef, useCallback } from "react";

interface SpotlightRevealProps {
  imageSrc: string;
  videoSrc: string;
  isPlaying?: boolean;
  baseRadius?: number;
}

const NUM_TRAILS = 8;
const LERP_HEAD  = 0.18;
const LERP_TAIL  = 0.32;

export default function SpotlightReveal({
  imageSrc,
  videoSrc,
  isPlaying = true,
  baseRadius = 460,
}: SpotlightRevealProps) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const svgRef    = useRef<SVGSVGElement>(null);
  const rafRef    = useRef<number>(0);
  const mouseRef  = useRef({ x: -2000, y: -2000 });
  const pointsRef = useRef(
    Array.from({ length: NUM_TRAILS }, () => ({ x: -2000, y: -2000 }))
  );
  // separate RGB trail heads for chromatic aberration
  const rgbRef = useRef({
    r: { x: -2000, y: -2000 },
    b: { x: -2000, y: -2000 },
  });

  // ── video play/pause ───────────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    isPlaying ? v.play().catch(() => {}) : v.pause();
  }, [isPlaying]);

  // ── mouse tracking ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -2000, y: -2000 };
    };
    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── animation loop ─────────────────────────────────────────────────────────
  const animate = useCallback(() => {
    const pts   = pointsRef.current;
    const mouse = mouseRef.current;
    const rgb   = rgbRef.current;

    // main trail chain
    pts[0].x += (mouse.x - pts[0].x) * LERP_HEAD;
    pts[0].y += (mouse.y - pts[0].y) * LERP_HEAD;
    for (let i = 1; i < NUM_TRAILS; i++) {
      pts[i].x += (pts[i - 1].x - pts[i].x) * LERP_TAIL;
      pts[i].y += (pts[i - 1].y - pts[i].y) * LERP_TAIL;
    }

    // chromatic offset trails (offset ±10px from head)
    rgb.r.x += (pts[0].x + 10 - rgb.r.x) * 0.14;
    rgb.r.y += (pts[0].y - 6  - rgb.r.y) * 0.14;
    rgb.b.x += (pts[0].x - 10 - rgb.b.x) * 0.14;
    rgb.b.y += (pts[0].y + 6  - rgb.b.y) * 0.14;

    const svg = svgRef.current;
    if (svg) {
      // update main trail circles
      for (let i = 0; i < NUM_TRAILS; i++) {
        const el = svg.getElementById(`trail-${i}`);
        if (el) {
          el.setAttribute("cx", pts[i].x.toFixed(1));
          el.setAttribute("cy", pts[i].y.toFixed(1));
        }
      }
      // update RGB aberration circles
      const rEl = svg.getElementById("trail-r");
      const bEl = svg.getElementById("trail-b");
      if (rEl) { rEl.setAttribute("cx", rgb.r.x.toFixed(1)); rEl.setAttribute("cy", rgb.r.y.toFixed(1)); }
      if (bEl) { bEl.setAttribute("cx", rgb.b.x.toFixed(1)); bEl.setAttribute("cy", rgb.b.y.toFixed(1)); }

      // update feDisplacementMap scale for lens-distortion feel on fastest movement
      const dx = mouse.x - pts[0].x;
      const dy = mouse.y - pts[0].y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const distEl = svg.getElementById("disp-scale");
      if (distEl) distEl.setAttribute("scale", Math.min(speed * 0.18, 18).toFixed(1));
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // radii — each step shrinks and fades
  const trailRadius  = (i: number) => baseRadius - i * 32;
  const trailOpacity = (i: number) => Math.max(0, 1 - i * 0.11);

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-black overflow-hidden">

      {/* ── video layer ─────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
      />

      {/* ── SVG spotlight mask ───────────────────────────────────────────── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          {/* ── Spotlight hole gradient — sharp centre, soft edge ────── */}
          <radialGradient id="holeGrad">
            <stop offset="0%"   stopColor="black" stopOpacity="1" />
            <stop offset="55%"  stopColor="black" stopOpacity="0.95" />
            <stop offset="80%"  stopColor="black" stopOpacity="0.55" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          {/* ── Chromatic red ghost ──────────────────────────────────── */}
          <radialGradient id="holeGradR">
            <stop offset="0%"   stopColor="black" stopOpacity="0.5" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          {/* ── Chromatic blue ghost ─────────────────────────────────── */}
          <radialGradient id="holeGradB">
            <stop offset="0%"   stopColor="black" stopOpacity="0.5" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>

          {/* ── Inner hot glow — tight bright ring at cursor ─────────── */}
          <radialGradient id="glowGrad">
            <stop offset="0%"   stopColor="white" stopOpacity="0.06" />
            <stop offset="40%"  stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* ── Lens distortion filter ───────────────────────────────── */}
          <filter id="lens-distort" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              id="disp-scale"
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          {/* ── Edge vignette gradient ───────────────────────────────── */}
          <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.72" />
          </radialGradient>

          {/* ── Main composite mask ──────────────────────────────────── */}
          <mask
            id="spotlight-mask"
            maskContentUnits="userSpaceOnUse"
            x="0" y="0" width="100%" height="100%"
          >
            {/* base: entire frame is WHITE = visible */}
            <rect width="100%" height="100%" fill="white" />

            {/* chromatic aberration — blue ghost (punches hole slightly bigger) */}
            <circle
              id="trail-b"
              cx="-2000" cy="-2000"
              r={trailRadius(0) + 14}
              fill="url(#holeGradB)"
              opacity="0.35"
            />

            {/* chromatic aberration — red ghost */}
            <circle
              id="trail-r"
              cx="-2000" cy="-2000"
              r={trailRadius(0) + 14}
              fill="url(#holeGradR)"
              opacity="0.35"
            />

            {/* main trail circles (reversed so largest renders first) */}
            {Array.from({ length: NUM_TRAILS })
              .reverse()
              .map((_, rev) => {
                const i = NUM_TRAILS - 1 - rev;
                return (
                  <circle
                    key={i}
                    id={`trail-${i}`}
                    cx="-2000" cy="-2000"
                    r={trailRadius(i)}
                    fill="url(#holeGrad)"
                    opacity={trailOpacity(i)}
                  />
                );
              })}
          </mask>
        </defs>

        {/* ── Reveal layer: image masked by spotlight ──────────────────── */}
        <image
          href={imageSrc}
          width="100%" height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#spotlight-mask)"
          filter="url(#lens-distort)"
        />

        {/* ── Hot glow ring at cursor tip ──────────────────────────────── */}
        <circle
          id="trail-0-glow"
          cx="-2000" cy="-2000"
          r={trailRadius(0) * 0.42}
          fill="url(#glowGrad)"
          style={{ mixBlendMode: "screen" }}
        >
          {/* re-use trail-0 position via JS below */}
        </circle>

        {/* ── Edge vignette (always on) ─────────────────────────────────── */}
        <rect
          width="100%" height="100%"
          fill="url(#vignetteGrad)"
          style={{ pointerEvents: "none" }}
        />

        {/* ── Scan-line grain overlay ───────────────────────────────────── */}
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="1" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%" height="100%"
          filter="url(#grain)"
          opacity="0.028"
          style={{ mixBlendMode: "overlay", pointerEvents: "none" }}
        />
      </svg>

      {/* ── Outer dark vignette (CSS — doesn't affect mask) ─────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}