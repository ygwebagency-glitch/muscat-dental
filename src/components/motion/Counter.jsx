import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Number 0 se `to` tak ginta hai, sirf ek dafa, jab screen par aaye. */
export default function Counter({ to, suffix = "", duration = 1.8, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return undefined;
    }
    if (!inView) return undefined;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}