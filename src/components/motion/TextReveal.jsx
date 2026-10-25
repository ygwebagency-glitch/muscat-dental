import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Heading ki har line mask ke andar se ubharti hai.
 * Animation khatam hote hi mask hat jata hai, taake J, y, g jaise letters
 * ka neeche wala hissa kabhi na kate.
 * Trigger bahar wale heading tag par hai (mask ke andar wala hissa chhupa hota hai).
 */
export default function TextReveal({ lines, as: Tag = "h2", className = "", delay = 0, id, show: showProp }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduce || (showProp ?? inView);
  const [done, setDone] = useState(0);
  const allDone = reduce || done >= lines.length;

  return (
    <Tag id={id} ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`-my-[0.3em] block py-[0.3em] ${allDone ? "overflow-visible" : "overflow-hidden"}`}
        >
          <motion.span
            className="block"
            initial={false}
            animate={{ y: show ? 0 : "150%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: EASE }}
            onAnimationComplete={() => show && setDone((n) => n + 1)}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}