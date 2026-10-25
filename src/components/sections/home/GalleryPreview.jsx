import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { galleryImages } from "../../../data/images.js";
import BeforeAfterSlider from "../../ui/BeforeAfterSlider.jsx";
import SmartImage from "../../ui/SmartImage.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Asli patient cases (written consent ke saath) milne tak ye placeholder note rahega.
const NOTE = "[Replace with real patient cases, with consent]";

const cases = [
  { key: "cosmetic", title: "Cosmetic Dentistry" },
  { key: "ortho", title: "Orthodontics & Braces" },
  { key: "implants", title: "Dental Implants" },
];

const list = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Custom gallery icon (khud banaya hua, rang currentColor se). */
function GalleryIcon({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="8" width="36" height="32" rx="6" />
      <circle cx="17" cy="19" r="3.4" />
      <path d="M6 33l10-8 8 7 6-5 12 9" />
    </svg>
  );
}

export default function GalleryPreview() {
  const reduce = useReducedMotion();

  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="relative flex scroll-mt-[70px] items-center overflow-hidden bg-[linear-gradient(180deg,#F7FCFB_0%,#F0FAF9_100%)] py-14 md:py-16 lg:min-h-[calc(100svh-70px)] lg:py-[clamp(28px,5vh,60px)]"
    >
      {/* Soft background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-teal-300/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-teal-300/15 blur-3xl" />
      </div>
      <DotPattern className="left-3 top-14 hidden h-24 w-20 md:block" />
      <DotPattern className="bottom-8 right-4 hidden h-24 w-24 lg:block" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">
        {/* Header */}
        <div className="text-center">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 rounded-full bg-accent/80 md:w-12" />
            <span className="inline-flex h-9 items-center rounded-full bg-mint-100 px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F8A87]">
              Our Results
            </span>
            <span className="h-0.5 w-10 rounded-full bg-accent/80 md:w-12" />
          </Reveal>

          <TextReveal
            id="results-title"
            lines={["Real Smiles. Real Results."]}
            className="mt-4 font-display text-[clamp(2rem,1rem_+_2.7vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-teal-900 lg:text-[clamp(2rem,min(1rem_+_2.7vw,6.4vh),3.4rem)]"
          />

          <Reveal
            delay={0.1}
            className="mx-auto mt-4 max-w-[640px] text-[15.5px] leading-[1.65] text-[#5B7480] md:text-[17px] lg:text-[clamp(14.5px,2.3vh,17px)]"
          >
            <p>
              See the difference professional dental care can make. Our patients&rsquo; smiles speak for themselves.
            </p>
          </Reveal>
        </div>

        {/* Slider + list */}
        <div className="mt-9 grid gap-8 md:mt-10 lg:mt-[clamp(24px,5vh,48px)] lg:grid-cols-[1.95fr_1fr] lg:items-start lg:gap-x-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="rounded-[26px] bg-white p-1.5 shadow-lg2 ring-1 ring-line/60 md:rounded-[30px]"
          >
            <BeforeAfterSlider
              before={galleryImages.before}
              after={galleryImages.after}
              beforeAlt="Patient's smile before teeth whitening"
              afterAlt="Patient's smile after teeth whitening"
              caption={NOTE}
              className="aspect-[4/3.4] rounded-[20px] md:aspect-[16/10] md:rounded-[24px] lg:aspect-auto lg:h-[clamp(300px,52vh,470px)]"
            />
          </motion.div>

          <div className="lg:pt-3">
            <Reveal className="flex items-center gap-4">
              <h3 className="font-display text-[22px] font-semibold text-teal-900 lg:text-[clamp(18px,1.7vw,24px)]">
                More Smile Transformations
              </h3>
              <span className="h-0.5 w-12 rounded-full bg-accent/80" />
            </Reveal>

            <motion.ul
              variants={list}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 space-y-3 lg:mt-[clamp(10px,2vh,18px)] lg:space-y-[clamp(8px,1.6vh,16px)]"
            >
              {cases.map(({ key, title }) => (
                <motion.li key={key} variants={item}>
                  <Link
                    to="/gallery"
                    className="group flex h-[92px] items-center gap-4 overflow-hidden rounded-[20px] bg-white/85 pr-4 shadow-sm2 ring-1 ring-line/60 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md2 md:h-[104px] lg:h-[clamp(78px,11.5vh,116px)]"
                  >
                    <div className="aspect-[1.7/1] h-full shrink-0 overflow-hidden rounded-[18px]">
                      <SmartImage
                        src={galleryImages[key]}
                        alt={`${title} smile example`}
                        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-bold leading-tight text-teal-900 lg:text-[clamp(14px,1.25vw,17px)]">
                        {title}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-snug text-muted">{NOTE}</p>
                    </div>
                    <ArrowRight
                      className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal
              delay={0.3}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-[clamp(14px,3vh,28px)]"
            >
              <Link
                to="/gallery"
                className="group inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-accent px-6 text-[15.5px] font-bold text-white shadow-[0_12px_28px_rgba(245,130,32,.32)] transition duration-200 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_16px_34px_rgba(245,130,32,.42)] sm:w-auto lg:h-[clamp(46px,6.4vh,56px)]"
              >
                <GalleryIcon className="h-5 w-5" />
                View Full Gallery
                <ChevronRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-[13px] text-muted">Results vary by patient.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}