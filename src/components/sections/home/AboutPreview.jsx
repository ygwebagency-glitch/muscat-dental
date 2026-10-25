import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { aboutImages } from "../../../data/images.js";
import { site } from "../../../data/siteConfig.js";
import { useMediaQuery } from "../../../hooks/useMediaQuery.js";
import SmartImage from "../../ui/SmartImage.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";
import ImageReveal from "../../motion/ImageReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

// 2 columns ke liye row-wise order: (1 | 2) / (3 | 4)
const checks = ["Qualified Dentists", "Affordable Treatment Plans", "Strict Sterilization", "Stress-free Environment"];

/** Tick: circle aur check-mark khud draw hote hain. */
function CheckItem({ label, delay }) {
  const reduce = useReducedMotion();
  const draw = (extra = 0, duration = 0.8) => ({
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration, delay: delay + extra, ease: EASE },
  });
  return (
    <motion.li
      className="flex items-center gap-3.5"
      initial={reduce ? false : { opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 shrink-0 text-teal-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <motion.circle cx="16" cy="16" r="13" {...draw(0, 0.8)} />
        <motion.path d="M10.5 16.5l4 4 7-8" {...draw(0.35, 0.5)} />
      </svg>
      <span className="text-[15px] font-semibold text-teal-900 xl:whitespace-nowrap">{label}</span>
    </motion.li>
  );
}

/** Left collage: 2 photos + 18+ badge, scroll par alag alag raftar (parallax, sirf desktop). */
function Collage() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const k = wide && !reduce ? 1 : 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-30 * k, 30 * k]);
  const mainY = useTransform(scrollYProgress, [0, 1], [16 * k, -16 * k]);
  const secY = useTransform(scrollYProgress, [0, 1], [40 * k, -40 * k]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [-20 * k, 20 * k]);

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[1/1.04] w-full max-w-[640px] [container-type:inline-size] md:aspect-[1.25/1] lg:aspect-[1.02/1]"
    >
      {/* Soft teal shapes peeche */}
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute -bottom-[8%] -left-[10%] h-[72%] w-[96%] rounded-[46%] bg-gradient-to-br from-[#D9F1EE] to-[#BFE6E2]/80"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute right-[2%] top-[22%] h-[44%] w-[34%] rounded-full bg-[#CFEDEA]/60"
      />

      {/* Main portrait */}
      <motion.div
        style={{ y: mainY }}
        className="absolute left-0 top-0 h-[88%] w-[72%] rounded-[28px] shadow-lg2 lg:h-[94%] lg:w-[69%]"
      >
        <ImageReveal className="h-full w-full rounded-[28px] border-[6px] border-white bg-white">
          <SmartImage
            src={aboutImages.main}
            alt="Dr. Siddique Sattar, dentist at Muscat Dental Clinics, Multan"
            className="h-full w-full object-[50%_20%]"
          />
        </ImageReveal>
      </motion.div>

      {/* Secondary photo */}
      <motion.div
        style={{ y: secY }}
        className="absolute bottom-0 right-0 z-10 h-[46%] w-[50%] rounded-[26px] shadow-lg2 lg:h-[50%] lg:w-[46%]"
      >
        <ImageReveal delay={0.25} direction="left" className="h-full w-full rounded-[26px] border-[6px] border-white bg-white">
          <SmartImage
            src={aboutImages.secondary}
            alt="Dr. Siddique Sattar explaining a treatment to a patient"
            className="h-full w-full object-[50%_30%]"
          />
        </ImageReveal>
      </motion.div>

      {/* 18+ Years badge */}
      <motion.div
        style={{ y: badgeY }}
        className="absolute left-[62%] top-[2%] z-20 aspect-square w-[24%] lg:left-[66%] lg:top-[7%] lg:w-[19%]"
      >
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 0, rotate: -30, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.9 }}
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -7, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-accent-light to-accent text-white shadow-[0_16px_40px_rgba(245,130,32,.35)] ring-[6px] ring-white"
          >
            <span className="text-[8cqw] font-extrabold leading-none lg:text-[7cqw]">18+</span>
            <span className="mt-[0.6cqw] text-[3.6cqw] font-medium leading-none lg:text-[3.1cqw]">Years</span>
            <span className="mt-[1cqw] h-px w-[4cqw] bg-white/80" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AboutPreview() {
  const reduce = useReducedMotion();

  // Heading ek hi trigger se chale (photos ke saath), signature alag
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const sigRef = useRef(null);
  const sigInView = useInView(sigRef, { once: true, amount: 0.6 });
  const sigShow = reduce || sigInView;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative overflow-x-clip bg-gradient-to-b from-warm via-[#F1FAF9] to-warm pb-12 pt-8 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14"
    >
      <DotPattern className="left-3 top-16 hidden h-28 w-20 md:block" />
      <DotPattern className="bottom-10 right-4 hidden h-28 w-24 lg:block" />

      <div
        ref={gridRef}
        className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 md:gap-12 md:px-8 lg:grid-cols-[1.12fr_1fr] lg:gap-12"
      >
        <Collage />

        <div>
          <Reveal className="flex items-center gap-4">
            <span className="inline-flex h-9 items-center rounded-full bg-mint-100 px-5 text-[14.5px] font-semibold text-teal-800">
              About Us
            </span>
            <span className="h-0.5 w-14 rounded-full bg-accent/80" />
          </Reveal>

          <TextReveal
            id="about-title"
            show={gridInView}
            delay={0.15}
            lines={["Care You Can Trust,", "Experience You Can Feel"]}
            className="mt-5 font-display text-[clamp(2rem,0.9rem_+_2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-teal-900"
          />

          <Reveal
            delay={0.1}
            className="mt-5 max-w-[500px] space-y-3.5 text-[15px] leading-[1.65] text-[#5B7480] md:text-[15.5px] lg:text-[16px]"
          >
            <p>
              At Muscat Dental Clinics (Multan), we believe that a healthy smile brings confidence and happiness. Our
              goal is to provide you with comfortable, safe and high-quality dental care, using modern technology and the
              highest standards of hygiene.
            </p>
            <p>
              From your first visit to every appointment after, we make sure you feel relaxed, informed and well cared
              for.
            </p>
          </Reveal>

          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {checks.map((c, i) => (
              <CheckItem key={c} label={c} delay={0.1 + i * 0.12} />
            ))}
          </ul>

                    <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
            <div ref={sigRef} className="shrink-0">
              {/* Signature: left se right "likhi" jati hai */}
              <motion.p
                className="inline-block whitespace-nowrap px-1 pb-0.5 pt-1 text-[34px] leading-none text-teal-900 md:text-[36px]"
                style={{ fontFamily: "'Mr De Haviland', cursive" }}
                initial={false}
                animate={{
                  clipPath: sigShow ? "inset(-20px -12px -20px 0px)" : "inset(-20px 100% -20px 0px)",
                }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              >
                Dr. Siddique Sattar
              </motion.p>
              <motion.span
                className="block h-[1.5px] w-[230px] origin-left bg-accent"
                initial={false}
                animate={{ scaleX: sigShow ? 1 : 0 }}
                transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
              />
              <p className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-teal-800">
                {site.doctor.name}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.04em] text-muted">{site.doctor.line}</p>
            </div>

            <Reveal delay={0.2} className="shrink-0">
              <Link
                to="/about"
                className="group inline-flex h-[42px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-teal-500 bg-white/40 px-5 text-[14px] font-semibold text-teal-900 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md2"
              >
                Meet Our Doctor
                <ChevronRight className="h-4 w-4 text-teal-900 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}