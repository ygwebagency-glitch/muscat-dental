import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, Heart, MapPin, Pause, Play, ShieldCheck, Star } from "lucide-react";
import { showGoogleBadge, testimonials } from "../../../data/testimonials.js";
import { site } from "../../../data/siteConfig.js";
import SmartImage from "../../ui/SmartImage.jsx";
import ToothIcon from "../../ui/ToothIcon.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 7000;

/* ---------- small pieces ---------- */
function GoogleG({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function CheckBadge({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#0F9C98" />
      <path d="M4.6 8.4l2.2 2.2 4.6-4.8" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PeopleIcon({ className }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="24" cy="12" r="5.5" />
      <path d="M14 36v-5c0-4.4 4-7.5 10-7.5s10 3.1 10 7.5v5z" />
      <circle cx="10" cy="19" r="3.8" />
      <path d="M3 35c0-3.6 2.7-5.8 7-5.8" />
      <circle cx="38" cy="19" r="3.8" />
      <path d="M45 35c0-3.6-2.7-5.8-7-5.8" />
    </svg>
  );
}

function Stars({ starClass }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${starClass} fill-accent text-accent`} strokeWidth={1.5} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Asli photo ho to photo, warna initials ka circle. */
function Avatar({ t, className }) {
  if (t.avatar) {
    return (
      <span aria-hidden="true" className={`block shrink-0 overflow-hidden rounded-full bg-mint ${className}`}>
        <img
          src={t.avatar}
          alt=""
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-white ${
        t.tone === "orange" ? "bg-accent" : "bg-[#0F9C98]"
      } ${className}`}
    >
      {t.initials}
    </span>
  );
}

/* ---------- featured (big) card ---------- */
function Featured({ item, active, total, playing, onDot }) {
  const quote = item.quote ?? item.text;
  const long = quote.length > 125;

  return (
    <div className="tst-feat bg-white shadow-md2">
      <div className="tst-feat-in bg-gradient-to-br from-[#E2F4F2] via-[#E9F7F6] to-[#F3FAFA]">
        {/* photo (desktop: gol curve ke andar) */}
        <div className="tst-photo">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              className="h-full w-full"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {item.photo ? (
                <SmartImage src={item.photo} alt={`${item.name}, a happy patient`} className="h-full w-full object-[60%_25%]" />
              ) : (
                <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-[#CDEDEA] via-[#A9DDD9] to-[#79C9C4]">
                  <ToothIcon
                    className="absolute -bottom-6 -right-6 h-40 w-40 text-white/25"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                  <span className="relative font-display text-6xl font-semibold text-white/90">{item.initials}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="tst-body">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              className="flex flex-1 flex-col"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              aria-live={playing ? "off" : "polite"}
            >
              <span aria-hidden="true" className="tst-qmark font-display font-black text-[#0F9C98]">&ldquo;</span>
              <blockquote className={`tst-quote font-display font-medium text-[#0E3F42] ${long ? "tst-quote-sm" : ""}`}>
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div className="tst-author mt-auto flex flex-wrap items-center">
                <Avatar t={item} className="tst-avatar" />
                <div className="min-w-0">
                  <p className="tst-aname font-semibold text-[#0E3F42]">{item.name}</p>
                  <span className="tst-apill mt-1 inline-block rounded-full bg-[#CFEDEA] font-semibold text-[#0B6F6C]">
                    {item.treatment}
                  </span>
                </div>
                <span aria-hidden="true" className="hidden h-10 w-px bg-teal-800/15 sm:block" />
                <div>
                  <Stars starClass="tst-astar" />
                  {showGoogleBadge && (
                    <p className="tst-averify mt-1 flex items-center gap-1.5 text-[#4A6B72]">
                      <GoogleG className="h-4 w-4" />
                      Verified patient
                      <CheckBadge className="h-4 w-4" />
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots: active dot par agle review tak ki progress bar */}
          <div className="tst-dots flex items-center gap-2" role="group" aria-label="Choose a patient story">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onDot(i)}
                aria-label={`Show story ${i + 1} of ${total}`}
                aria-current={i === active}
                className={`relative h-2.5 overflow-hidden rounded-full bg-[#0F9C98]/25 transition-all duration-300 ${
                  i === active ? "w-8" : "w-2.5 hover:bg-[#0F9C98]/50"
                }`}
              >
                {i === active && (
                  <motion.span
                    key={`${active}-${playing}`}
                    className="absolute inset-0 origin-left rounded-full bg-[#0F9C98]"
                    initial={{ scaleX: playing ? 0 : 1 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: playing ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- small review card ---------- */
const cardV = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

function ReviewCard({ t, onPick }) {
  return (
    <motion.li
      layout
      variants={cardV}
      exit="exit"
      transition={{ layout: { duration: 0.55, ease: EASE } }}
      className="relative z-10"
    >
      <button
        type="button"
        onClick={() => onPick(t.id)}
        aria-label={`Show ${t.name}'s review`}
        className="tst-card group flex h-full w-full flex-col overflow-hidden bg-white text-left shadow-sm2 ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg2 hover:ring-teal-500/40"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar t={t} className="tst-cavatar" />
            <Stars starClass="tst-cstar" />
          </div>
          {showGoogleBadge && (
            <span className="flex shrink-0 flex-col items-start gap-1 leading-none">
              <GoogleG className="h-3.5 w-3.5" />
              <span className="flex items-center gap-1 text-[#0F9C98]">
                <CheckBadge className="h-2.5 w-2.5 shrink-0" />
                <span className="tst-vtxt tst-vsmall whitespace-nowrap">Verified patient</span>
              </span>
            </span>
          )}
        </div>
        <h3 className="tst-cname font-semibold leading-tight text-[#0E3F42] transition-colors group-hover:text-[#0F9C98]">{t.name}</h3>
        <span className="tst-cpill inline-block self-start rounded-full bg-[#DDF2F0] font-semibold text-[#0B6F6C]">{t.treatment}</span>
        <p className="tst-ctext text-[#5B7480]">{t.text}</p>
      </button>
    </motion.li>
  );
}

/* ---------- bottom trust strip ---------- */
const perks = [
  { Icon: ToothIcon, title: "Quality Care", sub: "Every visit matters" },
  { Icon: ShieldCheck, title: "Safe & Clean", sub: "Always" },
  { Icon: Heart, title: "Your Smile", sub: "Our Priority" },
  { Icon: MapPin, title: site.location, sub: "[ADD TIMINGS]" },
];

function TrustBar() {
  return (
    <Reveal delay={0.1}>
      <div className="tst-bar flex flex-col gap-5 bg-gradient-to-r from-[#DFF3F1] to-[#E9F8F6] ring-1 ring-white/70 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center gap-4 rounded-2xl bg-teal-50 px-6 py-4">
          <PeopleIcon className="tst-bicon shrink-0 text-[#0F9C98]" />
          <p className="tst-btext font-semibold leading-snug text-[#0E3F42]">
            Join thousands of happy patients <br className="hidden lg:block" />
            who trust Muscat Dental Clinics.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex lg:flex-1 lg:justify-between lg:gap-3">
          {perks.map(({ Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-3 lg:border-l lg:border-teal-800/15 lg:pl-5">
              <Icon className="h-7 w-7 shrink-0 text-[#0F9C98]" strokeWidth={1.5} aria-hidden="true" />
              <span className="leading-tight">
                <span className="tst-ptitle block font-semibold text-[#0E3F42]">{title}</span>
                <span className="tst-psub block text-[#6A8794]">{sub}</span>
              </span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact#book"
          className="tst-bbtn group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-accent-light to-accent font-bold text-white shadow-[0_8px_20px_rgba(245,130,32,.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(245,130,32,.45)]"
        >
          <CalendarDays className="h-[18px] w-[18px]" aria-hidden="true" />
          Book Appointment
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  );
}

/* ---------- main section ---------- */
const listV = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } };

export default function Testimonials() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const revealed = useInView(sectionRef, { once: true, amount: 0.2 });
  const visible = useInView(sectionRef, { amount: 0.35 });

  const total = testimonials.length;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const playing = visible && !hovering && !userPaused && !reduce;

  // Auto-rotation: hover / focus / Pause button par ruk jati hai
  useEffect(() => {
    if (!playing) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [playing, active, total]);

  const next = () => setActive((a) => (a + 1) % total);
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const pick = (id) => setActive(testimonials.findIndex((t) => t.id === id));

  const current = testimonials[active];
  const others = testimonials.filter((_, i) => i !== active);
  const state = reduce || revealed ? "show" : "hidden";

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="tst-title"
      className="tst snap-sec relative overflow-hidden bg-gradient-to-b from-[#F7FCFB] via-[#EEF9F8] to-[#F7FCFB] py-14 md:py-20 lg:py-0"
    >
      {/* Background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-80 w-[26rem] rounded-[50%] bg-[#DDF2F0]/70" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#DDF2F0]/60" />
      </div>

      <div className="tst-wrap relative mx-auto w-full max-w-[1480px] px-5 md:px-8">
        <header className="text-center">
          <Reveal className="flex items-center justify-center gap-3 md:gap-4">
            <span className="h-0.5 w-8 rounded-full bg-accent md:w-12" />
            <span className="tst-pill inline-flex items-center rounded-full bg-[#CFEDEA] px-5 font-bold uppercase tracking-[0.16em] text-[#0F9C98] md:px-7">
              What our patients say
            </span>
            <span className="h-0.5 w-8 rounded-full bg-accent md:w-12" />
          </Reveal>

          <TextReveal
            id="tst-title"
            lines={["Real People. Real Smiles."]}
            className="tst-title font-display font-semibold tracking-[-0.01em] text-teal-900"
          />

          <Reveal as="p" delay={0.1} className="tst-sub text-[#5B7480]">
            We&rsquo;re grateful for the trust our patients place in us. Here&rsquo;s what they have to say about their
            experience at Muscat Dental Clinics.
          </Reveal>
        </header>

        <div
          className="tst-row"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <Reveal className="lg:h-full">
            <Featured item={current} active={active} total={total} playing={playing} onDot={setActive} />
          </Reveal>

          <motion.ul
            className="tst-cards"
            variants={listV}
            initial={reduce ? false : "hidden"}
            animate={state}
            aria-label="More patient reviews"
          >
            <AnimatePresence mode="popLayout">
              {others.map((t) => (
                <ReviewCard key={t.id} t={t} onPick={pick} />
              ))}
            </AnimatePresence>

            {/* Arrows tile */}
            <li className="tst-tile relative place-items-center text-center">
              <span aria-hidden="true" className="pointer-events-none absolute inset-[-8%] z-0 rounded-full bg-gradient-to-br from-[#DDF2F0]/70 to-transparent" />
              <div className="relative z-20">
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous patient story"
                    className="tst-arrow grid place-items-center rounded-full border border-[#0F9C98]/30 bg-white/70 text-[#0F9C98] transition duration-200 hover:-translate-y-0.5 hover:border-[#0F9C98] hover:bg-white hover:shadow-md2"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next patient story"
                    className="tst-arrow grid place-items-center rounded-full border border-[#0F9C98]/30 bg-white/70 text-[#0F9C98] transition duration-200 hover:-translate-y-0.5 hover:border-[#0F9C98] hover:bg-white hover:shadow-md2"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <p className="tst-note mt-3 leading-snug text-[#5B7480]">
                  More patient stories
                  <br />
                  coming soon...
                </p>
                {!reduce && (
                  <button
                    type="button"
                    onClick={() => setUserPaused((p) => !p)}
                    aria-pressed={userPaused}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F9C98] hover:underline"
                  >
                    {userPaused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
                    {userPaused ? "Play" : "Pause"}
                  </button>
                )}
              </div>
            </li>
          </motion.ul>
        </div>

        <TrustBar />
      </div>
    </section>
  );
}