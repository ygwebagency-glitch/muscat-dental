import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const HIDDEN = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const SHOWN = "inset(0% 0% 0% 0%)";

/**
 * Photo clip-path se khulti hai + andar ki image halki zoom-out hoti hai.
 * Trigger bahar wale (kabhi na chhupne wale) div par hai, taake animation zaroor shuru ho.
 */
export default function ImageReveal({ children, className = "", delay = 0, direction = "up" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = reduce || inView;

  return (
    <div ref={ref} className="h-full w-full">
      <motion.div
        className={`overflow-hidden ${className}`}
        initial={false}
        animate={{ clipPath: show ? SHOWN : HIDDEN[direction] }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          initial={false}
          animate={{ scale: show ? 1 : 1.2 }}
          transition={{ duration: 1.5, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}