import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { serviceImages } from "../../../data/images.js";
import { serviceIcons } from "../../ui/ServiceIcons.jsx";
import SmartImage from "../../ui/SmartImage.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import Reveal from "../../motion/Reveal.jsx";
import TextReveal from "../../motion/TextReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

const items = [
  { slug: "general-dentistry", name: "General Dentistry", text: "Routine checkups, cleanings and preventive care.", pos: "28% 50%" },
  { slug: "cosmetic-dentistry", name: "Cosmetic Dentistry", text: "Whitening, veneers and smile makeovers.", pos: "45% 50%" },
  { slug: "scaling-polishing", name: "Scaling & Polishing", text: "Remove plaque, tartar and stains for a fresher smile.", pos: "72% 50%" },
  { slug: "dental-implants", name: "Dental Implants", text: "Durable, natural-looking replacements for missing teeth.", pos: "40% 50%" },
  { slug: "root-canal-treatment", name: "Root Canal Treatment", text: "Comfortable care that saves infected teeth.", pos: "45% 50%" },
  { slug: "pediatric-dentistry", name: "Pediatric Dentistry", text: "Gentle, friendly dental care for children.", pos: "38% 50%" },
  { slug: "orthodontics-braces", name: "Orthodontics & Braces", text: "Straighten teeth with modern orthodontic solutions.", pos: "50% 50%" },
  { slug: "crowns-bridges", name: "Crowns & Bridges", text: "Strong, custom-made restorations for your smile.", pos: "60% 50%" },
  { slug: "tooth-extraction", name: "Tooth Extraction", text: "Safe, comfortable removal of damaged teeth.", pos: "65% 50%" },
];

// Cards ek ek karke ubharte hain (stagger); photo andar se halka zoom-out hoti hai
const list = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const cardV = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
const photoV = {
  hidden: { scale: 1.15 },
  show: { scale: 1, transition: { duration: 1.2, ease: EASE } },
};

function ServiceCard({ item }) {
  const Icon = serviceIcons[item.slug];
  return (
    <motion.li variants={cardV} className="svc-item">
      {/* Hover effects is andar wale article par hain (entry animation bahar wale li par) */}
      <article className="svc-card group relative h-full bg-white shadow-sm2 ring-1 ring-line/70 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-teal-800 hover:shadow-lg2 hover:ring-teal-500">
        <div className="svc-media relative">
          <div className="svc-photo relative overflow-hidden">
            <motion.div variants={photoV} className="h-full w-full">
              <SmartImage
                src={serviceImages[item.slug]}
                alt={`${item.name} treatment`}
                style={{ objectPosition: item.pos }}
                className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]"
              />
            </motion.div>
            {/* hover par neeche se teal overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-teal-800 via-teal-800/45 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
          <span className="svc-icon absolute z-10 grid place-items-center rounded-full bg-white text-teal-500 shadow-md2 ring-1 ring-line transition-colors duration-300 group-hover:bg-teal-800 group-hover:text-white group-hover:ring-white">
            <Icon />
          </span>
        </div>

        <div className="svc-body">
          <h3 className="svc-name font-display font-semibold leading-tight text-teal-900 transition-colors duration-300 group-hover:text-white">
            {item.name}
          </h3>
          <p className="svc-desc leading-snug text-[#6A8794] transition-colors duration-300 group-hover:text-white/85">
            {item.text}
          </p>
          {/* Pura card clickable (stretched link) */}
          <Link
            to={`/services/${item.slug}`}
            className="svc-link inline-flex items-center gap-2 font-semibold text-teal-900 transition-all duration-300 after:absolute after:inset-0 after:content-[''] group-hover:translate-y-1 group-hover:opacity-0"
          >
            Learn more
            <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
          </Link>
        </div>

        {/* Hover par "Learn more" ki jagah Book button */}
        <Link
          to="/contact#book"
          className="svc-book pointer-events-none absolute z-10 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-accent px-4 font-bold text-white opacity-0 shadow-[0_8px_18px_rgba(245,130,32,.35)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          Book
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </article>
    </motion.li>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-title"
        className="svc snap-sec relative overflow-hidden bg-gradient-to-b from-[#F7FCFB] via-[#EAF7F5] to-[#F7FCFB] py-14 md:py-20 lg:py-0"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <DotPattern className="left-2 top-4 hidden h-24 w-32 md:block" />
        <DotPattern className="bottom-4 right-3 hidden h-20 w-28 md:block" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-300/20 blur-2xl" />
        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-teal-300/15 blur-2xl" />
      </div>

      <div className="svc-wrap relative mx-auto w-full max-w-[1240px] px-5 md:px-8">
        <header className="text-center">
          <Reveal className="flex items-center justify-center gap-3 md:gap-4">
            <span className="h-0.5 w-8 rounded-full bg-accent md:w-11" />
            <span className="svc-pill inline-flex items-center rounded-full bg-mint-100 px-5 font-bold uppercase tracking-[0.18em] text-teal-500 md:px-6">
              Our Services
            </span>
            <span className="h-0.5 w-8 rounded-full bg-accent md:w-11" />
          </Reveal>

          <TextReveal
            id="services-title"
            lines={["Our Dental Services"]}
            className="svc-title font-display font-semibold tracking-[-0.01em] text-teal-900"
          />

          <Reveal as="p" delay={0.1} className="svc-sub text-[#6A8794]">
            Comprehensive care for healthy, confident smiles.
          </Reveal>
        </header>

        <motion.ul
          className="svc-grid"
          variants={list}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item) => (
            <ServiceCard key={item.slug} item={item} />
          ))}
        </motion.ul>

        <Reveal delay={0.2} className="svc-cta text-center">
          <Link
            to="/services"
            className="svc-btn group inline-flex items-center gap-2 rounded-full border-[1.5px] border-teal-500 bg-white/60 font-semibold text-teal-900 transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md2"
          >
            View All Services
            <ArrowRight className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}