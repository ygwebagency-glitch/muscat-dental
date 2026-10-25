import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { whyImage } from "../../../data/images.js";
import { useMediaQuery } from "../../../hooks/useMediaQuery.js";
import { whyIcons } from "../../ui/WhyIcons.jsx";
import SmartImage from "../../ui/SmartImage.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";
import ImageReveal from "../../motion/ImageReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

const features = [
  { key: "dentists", Icon: whyIcons.dentist, title: ["Experienced &", "Qualified Dentists"], text: "Skilled professionals who truly care about your smile." },
  { key: "hygiene", Icon: whyIcons.shield, title: ["Strict Hygiene &", "Sterilization"], text: "Your safety is our highest priority." },
  { key: "comfort", Icon: whyIcons.comfort, title: ["Comfortable", "Patient Experience"], text: "A calm, friendly environment for your peace of mind." },
  { key: "afford", Icon: whyIcons.afford, title: ["Affordable", "Treatment Plans"], text: "Quality care that fits your needs and budget." },
  { key: "tech", Icon: whyIcons.tech, title: ["Modern Dental", "Technology"], text: "Advanced tools for better, faster results." },
  { key: "care", Icon: whyIcons.family, title: ["Gentle Care for", "Children & Adults"], text: "Compassionate care for every stage of life." },
];

// Items ek ek karke ubharte hain; icon ka ring khud draw hota hai
const gridV = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } };
const itemV = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const iconV = {
  hidden: { scale: 0.6, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
};
const ringV = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

function Feature({ f, i }) {
  const Icon = f.Icon;
  const col = i % 3;
  const row = Math.floor(i / 3);

  // Mouse ke saath chalne wali halki roshni (spotlight)
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const borders = [
    "border-white/10",
    i < 5 ? "border-b" : "",
    row === 0 ? "lg:border-teal-500/20" : "lg:border-b-0",
    col > 0 ? "lg:border-l lg:border-teal-500/20" : "",
  ].join(" ");

  return (
    <motion.li variants={itemV} className={borders}>
      <div onMouseMove={onMove} className="why-item group relative h-full rounded-2xl">
        <span
          aria-hidden="true"
          className="why-spot pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex items-start gap-4 lg:block">
          {/* icon: hover par thora uthta hai, ring glow karta hai */}
          <span className="why-icon relative block shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <motion.span
              variants={iconV}
              className="absolute inset-0 grid place-items-center rounded-full bg-[#04292D]/70 text-[#5FE3DD] shadow-[inset_0_0_0_1px_rgba(24,195,189,.28)] transition-all duration-300 group-hover:bg-[#18C3BD]/20 group-hover:text-white group-hover:shadow-[inset_0_0_0_1px_rgba(24,195,189,.9),0_0_28px_rgba(24,195,189,.45)]"
            >
              <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90 text-[#18C3BD]">
                <motion.circle cx="50" cy="50" r="48.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" variants={ringV} />
              </svg>
              <Icon className="relative h-[64%] w-[64%] drop-shadow-[0_0_3px_rgba(95,227,221,.5)]" />
            </motion.span>
          </span>

          <div className="min-w-0">
            <h3 className="why-name font-display font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#4FE0DA]">
              {f.title[0]} <br className="hidden sm:block" />
              {f.title[1]}
            </h3>
            <p className="why-desc leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90">{f.text}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

/** Left photo: glow, scroll par halki harkat (sirf desktop), aur dheema zoom. */
function WhyMedia() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const k = wide && !reduce ? 1 : 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-30 * k, 30 * k]);
  const imgY = useTransform(scrollYProgress, [0, 1], [14 * k, -14 * k]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:w-auto lg:max-w-none">
      <motion.div
        aria-hidden="true"
        style={{ y: glowY }}
        className="absolute -inset-6 rounded-[40px] bg-[#18C3BD]/25 blur-3xl"
      />
      <div className="why-media relative">
        <motion.div
          style={{ y: imgY }}
          className="h-full w-full rounded-[28px] shadow-[0_0_0_1px_rgba(24,195,189,.35),0_0_70px_rgba(24,195,189,.40)]"
        >
          <ImageReveal className="h-full w-full rounded-[28px]">
            <motion.div
              className="h-full w-full"
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
              <SmartImage
                src={whyImage}
                alt="Dentist treating a smiling patient in a modern dental clinic"
                className="h-full w-full object-[50%_30%]"
              />
            </motion.div>
          </ImageReveal>
        </motion.div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const reduce = useReducedMotion();

  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="why snap-sec relative overflow-hidden bg-[linear-gradient(135deg,#03393E_0%,#02373C_50%,#02353A_100%)] py-16 md:py-20 lg:py-0"
    >
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[6%] top-[3%] h-[66%] w-[34%] rounded-full bg-gradient-to-b from-[#12B5AF]/70 via-[#0D9A96]/25 to-transparent blur-[1px]" />
        <div className="absolute bottom-0 left-0 h-[34%] w-[42%] bg-[radial-gradient(closest-side,rgba(24,195,189,.38),transparent)]" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[#18C3BD]/10 blur-3xl" />
      </div>

      <div className="why-wrap relative mx-auto w-full max-w-[1480px] px-5 md:px-8">
        <div className="why-layout grid items-center gap-10 lg:grid-cols-[auto_minmax(0,800px)] lg:justify-center">
          <WhyMedia />

          <div className="min-w-0">
            <Reveal className="flex items-center gap-3">
              <span className="h-0.5 w-9 rounded-full bg-accent lg:w-10" />
              <span className="why-eyebrow font-bold uppercase tracking-[0.18em] text-[#1FC4BE]">Why Choose Us</span>
            </Reveal>

            <TextReveal
              id="why-title"
              lines={["Why Patients Choose", "Muscat Dental"]}
              lineClasses={["", "text-[#19C5BF]"]}
              className="why-title mt-4 font-display font-semibold tracking-[-0.01em] text-white"
            />

            <Reveal as="p" delay={0.1} className="why-lead max-w-[640px] leading-[1.6] text-white/80">
              We combine experience, advanced technology and a caring approach to give you the best dental care in a
              comfortable and safe environment.
            </Reveal>

            <motion.ul
              className="why-grid grid sm:grid-cols-2 lg:grid-cols-3"
              variants={gridV}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {features.map((f, i) => (
                <Feature key={f.key} f={f} i={i} />
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}