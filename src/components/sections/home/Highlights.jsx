import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarDays, Cpu, Users } from "lucide-react";
import { highlightImages } from "../../../data/images.js";
import SmartImage from "../../ui/SmartImage.jsx";

const EASE = [0.22, 1, 0.36, 1];

/** Image load hone tak mint dabba, phir halka fade-in (achanak nahi aati). */
function FadeImage({ src, alt, className = "" }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Cache se foran aa jane wali image ke liye
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <div className={`bg-mint ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        width="1200"
        height="391"
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

const cards = [
  {
    key: "dentists",
    icon: Users,
    title: "Experienced Dentists",
    text: "Skilled and compassionate care from our experienced dental team.",
    to: "/about",
    alt: "Dentist treating a smiling patient in a bright dental clinic",
  },
  {
    key: "appointments",
    icon: CalendarDays,
    title: "Easy Appointments",
    text: "Simple and flexible booking for your convenience.",
    to: "/contact#book",
    alt: "Friendly reception desk at Muscat Dental Clinics",
  },
  {
    key: "technology",
    icon: Cpu,
    title: "Advanced Technology",
    text: "Modern equipment for safer, more comfortable treatments.",
    to: "/services",
    alt: "Modern dental chair and digital x-ray screen",
  },
];

const list = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Highlights() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-10 lg:pb-10">
      <h2 className="sr-only">Why patients choose Muscat Dental Clinics</h2>

      {/* Phone/tablet: swipe carousel. Desktop: 3 column grid. */}
      <motion.ul
        variants={list}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 pt-1 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map(({ key, icon: Icon, title, text, to, alt }) => (
          <motion.li
            key={key}
            variants={item}
            className="w-[84%] shrink-0 snap-center md:w-[44%] lg:w-auto"
          >
            <article className="group flex h-full flex-col rounded-[22px] bg-white p-3.5 shadow-sm2 ring-1 ring-line/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-lg2 lg:shadow-md2">
              <div className="overflow-hidden rounded-2xl">
                  <FadeImage
                  src={highlightImages[key]}
                  alt={alt}
                  className="..."
                />
              </div>

              <div className="flex flex-1 gap-4 px-2 pb-3 pt-5 lg:px-3">
                <Icon className="mt-1 h-8 w-8 shrink-0 text-teal-500" strokeWidth={1.4} aria-hidden="true" />
                <div className="flex flex-1 flex-col">
                  <h3 className="text-[19px] font-semibold leading-snug text-teal-900">{title}</h3>
                  <p className="mt-1.5 max-w-[32ch] text-[15px] leading-relaxed text-muted">{text}</p>
                  <Link
                    to={to}
                    className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-bold text-teal-900 transition-colors hover:text-teal-500"
                  >
                    Learn more
                    <ArrowRight
                      className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}