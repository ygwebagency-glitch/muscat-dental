import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/** Fade + halka upar uthna, jab screen par aaye (sirf ek dafa). */
export default function Reveal({ children, delay = 0, y = 28, x = 0, className = "", as = "div", amount = 0.25 }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}