import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { processImages } from "../../../data/images.js";
import { processIcons } from "../../ui/ProcessIcons.jsx";
import SmartImage from "../../ui/SmartImage.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

const steps = [
  {
    key: "book",
    icon: "calendar",
    title: "Book Appointment",
    text: "Schedule your visit at your convenience. Call, WhatsApp or book online.",
    alt: "Smiling patient booking an appointment by phone at Muscat Dental Clinics",
  },
  {
    key: "consult",
    icon: "doctor",
    title: "Consultation & Diagnosis",
    text: "We examine your teeth, discuss your concerns and identify the best solution for you.",
    alt: "Dentist consulting a patient and checking an x-ray",
  },
  {
    key: "plan",
    icon: "tooth",
    title: "Personalized Treatment Plan",
    text: "We create a plan just for you, explaining the steps and answering all your questions.",
    alt: "Dentist explaining a personalized treatment plan on a tablet",
  },
  {
    key: "smile",
    icon: "smile",
    title: "Healthy Smile & Follow-up",
    text: "We ensure your recovery is smooth and your smile stays healthy with regular check-ups.",
    alt: "Happy patient smiling in the dental chair after treatment",
  },
];

function Step({ step, index, last, reduce }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const show = reduce || inView;
  const Icon = processIcons[step.icon];
  const d = index * 0.18;

  return (
    <motion.li
      ref={ref}
      className="group relative w-[78%] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 28 }}
      transition={{ duration: 0.7, delay: d, ease: EASE }}
    >
      {/* Number circle (pop-in) */}
      <motion.span
        className="absolute left-3 top-3 z-10 md:-left-2 md:-top-5"
        initial={false}
        animate={{ scale: show ? 1 : 0.6, opacity: show ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 16, delay: d + 0.2 }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500 text-[19px] font-bold text-white shadow-md2 ring-4 ring-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 md:h-[52px] md:w-[52px] md:text-[22px]">
          {index + 1}
        </span>
      </motion.span>

      {/* Photo + connector */}
      <div className="relative">
        <div className="overflow-hidden rounded-[20px] bg-mint shadow-md2 ring-4 ring-white transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lg2 md:rounded-[24px]">
          <SmartImage
            src={processImages[step.key]}
            alt={step.alt}
            className="aspect-[16/9] w-full transition-transform duration-700 ease-out group-hover:scale-105 md:aspect-[1.36/1] lg:max-h-[clamp(150px,27vh,230px)]"
          />
        </div>

        {/* Desktop: dashed arrow agle step ki taraf (draw hota hai) */}
        {!last && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-full top-1/2 ml-3 hidden h-4 w-[calc(var(--gap)-24px)] -translate-y-1/2 items-center lg:flex"
          >
            <motion.span
              className="h-[2px] flex-1 origin-left bg-[repeating-linear-gradient(90deg,#14A3A0_0_6px,transparent_6px_12px)]"
              initial={false}
              animate={{ scaleX: show ? 1 : 0 }}
              transition={{ duration: 0.6, delay: d + 0.55, ease: EASE }}
            />
            <motion.span
              initial={false}
              animate={{ opacity: show ? 1 : 0, x: show ? 0 : -6 }}
              transition={{ duration: 0.4, delay: d + 1.05, ease: EASE }}
            >
              <ChevronRight
                className="-ml-1 h-4 w-4 text-teal-500 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2.2}
              />
            </motion.span>
          </span>
        )}
      </div>

      {/* Icon + title + text */}
      <div className="mt-5 lg:mt-[clamp(14px,2.6vh,26px)]">
        <Icon className="h-7 w-7 text-teal-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
        <h3 className="mt-3 font-display text-[21px] font-semibold leading-snug text-teal-900 transition-colors duration-200 group-hover:text-teal-500 lg:text-[clamp(17px,1.5vw,22px)]">
          {step.title}
        </h3>
        <p className="mt-2 max-w-[250px] text-[14.5px] leading-[1.65] text-muted lg:text-[clamp(13.5px,1.1vw,15.5px)]">
          {step.text}
        </p>
      </div>
    </motion.li>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion();
    const listRef = useRef(null);
  const [active, setActive] = useState(0);

  // Swipe karne par kaun sa step dikh raha hai (dots ke liye)
  const onScroll = () => {
    const el = listRef.current;
    if (!el || !el.children.length) return;
    const stepWidth = el.children[0].offsetWidth + 16; // card + gap
    setActive(Math.min(steps.length - 1, Math.max(0, Math.round(el.scrollLeft / stepWidth))));
  };
  const goTo = (i) => {
    listRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section
      id="how-it-works"
      aria-labelledby="process-title"
      className="relative flex scroll-mt-[70px] items-center overflow-hidden bg-[linear-gradient(180deg,#F4FBFA_0%,#E9F7F5_100%)] py-14 md:py-16 lg:min-h-[calc(100svh-70px)] lg:py-[clamp(28px,5vh,64px)]"
    >
      {/* Soft background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-white/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-teal-300/15 blur-3xl" />
      </div>
      <DotPattern className="left-3 top-10 hidden h-24 w-20 md:block" />
      <DotPattern className="bottom-8 right-4 hidden h-24 w-24 lg:block" />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">
        <div className="text-center">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 rounded-full bg-accent/80 md:w-12" />
            <span className="inline-flex h-9 items-center rounded-full bg-mint-100 px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F8A87]">
              Our Process
            </span>
            <span className="h-0.5 w-10 rounded-full bg-accent/80 md:w-12" />
          </Reveal>

          <TextReveal
            id="process-title"
                        lines={[
              <>
                Your{" "}
                <span style={{ fontVariationSettings: '"opsz" 14', fontOpticalSizing: "none" }}>J</span>
                ourney to a Healthier Smile
              </>,
            ]}
            className="mt-4 font-display text-[clamp(1.9rem,1rem_+_2.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-teal-900 lg:text-[clamp(2rem,min(1rem_+_2.6vw,6.2vh),3.25rem)]"
          />

          <Reveal
            delay={0.1}
            className="mx-auto mt-4 max-w-[680px] text-[15.5px] leading-[1.65] text-[#5B7480] md:text-[17px] lg:text-[clamp(14.5px,2.3vh,17px)]"
          >
            <p>
              We make dental care simple, comfortable and stress-free. Our clear 4-step process ensures you get the
              right treatment at the right time.
            </p>
          </Reveal>
        </div>

        <ol
        
          ref={listRef}
          onScroll={onScroll}
          className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-2 [--gap:clamp(48px,5.5vw,76px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:overflow-visible md:px-0 md:pb-0 md:pt-0 lg:mt-[clamp(32px,7vh,72px)] lg:grid-cols-4 lg:gap-x-[var(--gap)] lg:gap-y-0"
        >
          {steps.map((s, i) => (
            <Step key={s.key} step={s} index={i} last={i === steps.length - 1} reduce={reduce} />
          ))}
        </ol>
              
        {/* Phone: swipe dots */}
        <div className="mt-2 flex items-center justify-center gap-2 md:hidden" role="group" aria-label="Process steps">
          {steps.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show step ${i + 1}: ${s.title}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-teal-500" : "w-2 bg-teal-500/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}