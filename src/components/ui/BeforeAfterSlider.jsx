import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "./SmartImage.jsx";

/**
 * Before/After slider: mouse drag, touch, click, keyboard (arrow keys, Home, End).
 * Pehli dafa dikhne par handle halka sa idhar-udhar hota hai (hint).
 */
export default function BeforeAfterSlider({ before, after, beforeAlt, afterAlt, caption, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const anim = useRef(null);

  const stopHint = () => {
    touched.current = true;
    anim.current?.stop();
  };

  useEffect(() => {
    if (!inView || reduce) return undefined;
    let cancelled = false;
    const go = (from, to) =>
      new Promise((resolve) => {
        anim.current = animate(from, to, {
          duration: 0.65,
          ease: "easeInOut",
          onUpdate: setPos,
          onComplete: resolve,
        });
      });
    const t = setTimeout(async () => {
      let from = 50;
      for (const to of [36, 64, 50]) {
        if (cancelled || touched.current) return;
        await go(from, to);
        from = to;
      }
    }, 900);
    return () => {
      cancelled = true;
      clearTimeout(t);
      anim.current?.stop();
    };
  }, [inView, reduce]);

  const move = useCallback((clientX) => {
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e) => {
    stopHint();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };
  const onPointerMove = (e) => dragging && move(e.clientX);
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
    stopHint();
  };

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison. Use the left and right arrow keys to move."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% before`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className={`group relative touch-pan-y select-none overflow-hidden bg-mint outline-none focus-visible:ring-4 focus-visible:ring-teal-500/50 ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
    >
      {/* After neeche, Before upar (left se clip hota hai) */}
      <SmartImage
        src={after}
        alt={afterAlt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={before} alt={beforeAlt} draggable={false} className="h-full w-full" />
      </div>

      {/* Labels */}
      <span
        className={`pointer-events-none absolute left-4 top-4 rounded-full bg-white/75 px-4 py-1.5 text-[13px] font-semibold text-ink/70 backdrop-blur-sm transition-opacity duration-200 md:left-5 md:top-5 ${
          pos > 14 ? "opacity-100" : "opacity-0"
        }`}
      >
        Before
      </span>
      <span
        className={`pointer-events-none absolute right-4 top-4 rounded-full bg-teal-500 px-4 py-1.5 text-[13px] font-semibold text-white transition-opacity duration-200 md:right-5 md:top-5 ${
          pos < 86 ? "opacity-100" : "opacity-0"
        }`}
      >
        After
      </span>

      {/* Divider + handle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,.25)]"
        style={{ left: `${pos}%` }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-teal-900 shadow-md2 transition-transform duration-200 md:h-14 md:w-14 ${
          dragging ? "scale-110" : "group-hover:scale-105"
        }`}
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft className="-mr-0.5 h-4 w-4" strokeWidth={2.8} />
        <ChevronRight className="-ml-0.5 h-4 w-4" strokeWidth={2.8} />
      </div>

      {caption && (
        <span className="pointer-events-none absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full bg-teal-900/80 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm md:bottom-5 md:left-5 md:text-[13px]">
          {caption}
        </span>
      )}
    </div>
  );
}