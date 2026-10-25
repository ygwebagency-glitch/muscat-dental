import { motion, useReducedMotion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { site } from "../../../data/siteConfig.js";
import { BookButton } from "../../ui/Button.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import HeroVisual from "./HeroVisual.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Heading ki har line. `accent` wale lafz par teal color + orange swoosh lagta hai.
const lines = [
  [{ t: "Trusted" }, { t: "Dental" }, { t: "Care" }],
  [{ t: "for" }, { t: "Every" }, { t: "Smile", accent: true }],
  [{ t: "in" }, { t: "Multan" }],
];

function Swoosh({ reduce }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 230 44"
      fill="none"
      className="pointer-events-none absolute left-[-4%] top-[82%] w-[114%] overflow-visible"
    >
      <motion.path
        d="M6 34 C 46 26 78 20 108 24 C 84 33 134 30 168 20 C 190 14 208 11 224 8"
        stroke="#F58220"
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
      />
    </svg>
  );
}

function Word({ word, delay, reduce }) {
  return (
    <span className="relative mr-[0.26em] inline-block">
      <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
        <motion.span
          className={`inline-block ${word.accent ? "text-teal-500" : ""}`}
          initial={reduce ? false : { y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay, ease: EASE }}
        >
          {word.t}
        </motion.span>
      </span>
      {word.accent && <Swoosh reduce={reduce} />}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  let wordIndex = 0;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-x-clip bg-[linear-gradient(180deg,#F7FCFB_0%,#E6F5F3_100%)]"
    >
      {/* Background decoration (alag layer, taake content clip na ho) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -bottom-48 h-[34rem] w-[34rem] rounded-full bg-teal-300/20 blur-3xl" />
        <div className="absolute -right-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-teal-500/10 blur-3xl" />
        <DotPattern className="left-3 top-10 hidden h-24 w-16 md:block" />
      </div>

      {/* Desktop par hero ki height = screen height - 132px.
          Neeche 60px extra jagah: counters strip is par overlap hoti hai. */}
            <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 px-5 py-8 md:gap-10 md:px-8 md:py-10 lg:min-h-[clamp(440px,calc(100svh-132px),860px)] lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:py-[clamp(16px,3vh,48px)]">
        {/* Visual: phone/tablet par pehle, desktop par right column.
            lg:-mb-[60px] se image strip ke neeche tak jati hai (reference jaisa). */}
                <HeroVisual className="lg:col-start-2 lg:row-start-1" />

        {/* Text */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-center">
          <motion.div
            {...fade(0.05)}
            className="inline-flex h-[42px] items-center gap-2.5 rounded-full bg-mint-100 px-5 text-[15px] font-medium text-teal-800 lg:h-[clamp(34px,5.4vh,42px)] lg:text-[clamp(13px,2.2vh,15px)]"
          >
            <Star className="h-[18px] w-[18px] fill-teal-500 text-teal-500" aria-hidden="true" />
            18+ Years of Dental Excellence
          </motion.div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.3rem,1rem_+_3.9vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] text-teal-900 lg:mt-[clamp(10px,2.4vh,24px)] lg:text-[clamp(2.1rem,min(1rem_+_3.9vw,7vh),3.9rem)]"
          >
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map((word) => {
                  const delay = 0.15 + wordIndex++ * 0.07;
                  return <Word key={word.t} word={word} delay={delay} reduce={reduce} />;
                })}
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(0.75)}
            className="mt-7 max-w-[540px] text-[17px] leading-[1.65] text-[#5B7480] md:text-[19px] lg:mt-[clamp(10px,2.4vh,28px)] lg:max-w-[560px] lg:text-[clamp(15px,2.5vh,19px)]"
          >
            Modern dental care with a gentle touch, advanced technology and a team that truly cares about your smile.
          </motion.p>

          <motion.div {...fade(0.9)} className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-[clamp(14px,3.2vh,32px)]">
            <BookButton size="hero" className="w-full sm:w-auto" />
            <a
              href={site.phoneHref}
              className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border-2 border-teal-500 bg-white/40 px-8 text-base font-bold text-teal-800 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md2 sm:w-auto lg:h-[clamp(44px,7.2vh,56px)]"
            >
              <Phone className="h-[18px] w-[18px] text-teal-500" strokeWidth={2} aria-hidden="true" />
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}