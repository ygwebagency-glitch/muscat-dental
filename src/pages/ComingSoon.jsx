import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, Home, Phone } from "lucide-react";
import ToothIcon from "../components/ui/ToothIcon.jsx";
import DotPattern from "../components/ui/DotPattern.jsx";
import Reveal from "../components/motion/Reveal.jsx";

const EASE = [0.22, 1, 0.36, 1];
const PHONE_DISPLAY = "+92 300 7874031";
const PHONE_HREF = "tel:+923007874031";

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 4.5a11.5 11.5 0 0 0-9.9 17.3L4.5 27.5l5.9-1.5A11.5 11.5 0 1 0 16 4.5z" />
      <path d="M12.2 10.8c-.5.6-.8 1.5-.3 2.7 1.1 2.6 3 4.6 5.6 5.7 1.2.5 2.1.2 2.7-.4l.6-.9-2.4-1.3-.9.8c-1.3-.6-2.5-1.8-3.1-3.1l.8-.9-1.3-2.4z" />
    </svg>
  );
}

export default function ComingSoon({ page = "This page" }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.title = `${page} - Coming Soon | Muscat Dental Clinics, Multan`;
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section
      aria-labelledby="soon-title"
      className="relative isolate flex min-h-[clamp(520px,calc(100svh_-_132px),920px)] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0A5557_0%,#0B4A4D_45%,#0C3F42_100%)] px-5 py-8 text-white md:py-6"
    >
      {/* decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-white/5" />
      <DotPattern className="bottom-8 left-4 hidden h-28 w-28 opacity-60 md:block" />
      <DotPattern className="right-4 top-8 hidden h-28 w-28 opacity-40 md:block" />

      <div className="mx-auto w-full max-w-[760px] text-center">
        {/* floating tooth */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 md:h-24 md:w-24"
        >
          <ToothIcon className="h-10 w-10 text-white md:h-12 md:w-12" strokeWidth={1.4} />
        </motion.div>

        <Reveal className="mt-5 flex items-center justify-center gap-4">
          <span className="h-0.5 w-10 rounded-full bg-accent" />
          <span className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white/90">
            {page}
          </span>
          <span className="h-0.5 w-10 rounded-full bg-accent" />
        </Reveal>

        <Reveal delay={0.05}>
          <h1
            id="soon-title"
            className="mt-3 font-display text-[clamp(2.6rem,1.2rem_+_5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-0.01em]"
          >
            Coming <span className="text-accent-light">Soon</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12} className="mx-auto mt-4 max-w-[520px] text-[15.5px] leading-[1.65] text-white/85 md:text-[17px]">
          <p>
            We are working hard to bring you something great. In the meantime, our team is always happy to help you
            with your dental care.
          </p>
        </Reveal>

        {/* animated progress bar */}
        <Reveal delay={0.18} className="mx-auto mt-6 max-w-[320px]">
          <div className="h-2 overflow-hidden rounded-full bg-white/15" role="presentation">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent-light to-accent"
              initial={{ width: reduce ? "72%" : "0%" }}
              animate={{ width: "72%" }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
            />
          </div>
          <p className="mt-2.5 text-[13px] tracking-wide text-white/70">Almost there</p>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.26} className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact#book"
            className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-accent-light to-accent px-7 text-[16px] font-bold text-white shadow-[0_10px_26px_rgba(245,130,32,.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(245,130,32,.5)] sm:w-auto"
          >
            <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
            Book Appointment
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            to="/"
            className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full border-2 border-white/60 px-7 text-[16px] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-teal-900 sm:w-auto"
          >
            <Home className="h-[18px] w-[18px]" aria-hidden="true" />
            Back to Home
          </Link>
        </Reveal>

        {/* quick contact */}
        <Reveal delay={0.32} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14.5px] text-white/80">
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 hover:text-white hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/923007874031?text=${encodeURIComponent("Hello, I would like to know more.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white hover:underline"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
          </a>
        </Reveal>
      </div>
    </section>
  );
}