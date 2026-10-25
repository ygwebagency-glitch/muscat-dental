import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { services } from "../../data/siteConfig.js";
import { serviceImages } from "../../data/images.js";
import SmartImage from "../ui/SmartImage.jsx";

/** Static panel (design board mein bhi use hota hai). 3 columns x 3 rows. */
export function MegaPanel({ onNavigate, className = "" }) {
  return (
    <div className={`rounded-[22px] bg-white p-3 shadow-lg2 ring-1 ring-line ${className}`}>
      <ul className="grid grid-flow-col grid-rows-3 gap-x-0">
        {services.map((s, i) => (
          <li key={s.slug} className={`${i >= 3 ? "border-l border-line" : ""}`}>
            <Link
              to={`/services/${s.slug}`}
              onClick={onNavigate}
              className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-mint"
            >
              <SmartImage
                src={serviceImages[s.slug]}
                alt=""
                className="h-[54px] w-[54px] shrink-0 rounded-xl"
              />
              <span className="flex-1 text-[14.5px] font-semibold leading-tight text-teal-800">{s.name}</span>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-teal-500"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Animated wrapper jo asli navbar use karta hai. */
export default function MegaMenu({ onNavigate, onEnter }) {
  return (
    <div
      onMouseEnter={onEnter}
      className="absolute left-1/2 top-full z-40 ml-[110px] hidden w-[min(780px,92vw)] -translate-x-1/2 pt-2 lg:block"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <MegaPanel onNavigate={onNavigate} />
      </motion.div>
    </div>
  );
}