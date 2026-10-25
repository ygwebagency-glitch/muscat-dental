import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, ShieldCheck, Users } from "lucide-react";
import ToothIcon from "../../ui/ToothIcon.jsx";
import Counter from "../../motion/Counter.jsx";

const EASE = [0.22, 1, 0.36, 1];

// `note` wali cheez client se confirm hone tak [CONFIRM] ke saath rahegi.
const stats = [
  { icon: CalendarCheck, to: 18, suffix: "+", label: "Years Experience" },
  { icon: Users, to: 5000, suffix: "+", label: "Patients Treated", note: "[CONFIRM]" },
  { icon: ToothIcon, to: 9, suffix: "", label: "Dental Services" },
  { icon: ShieldCheck, to: 100, suffix: "%", label: "Sterilized Instruments" },
];

export default function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    // Hero ke neeche normal jagah par (overlap nahi), is liye sirf scroll karne par nazar aati hai.
    <section aria-label="Clinic in numbers" className="relative z-20 px-5 pt-6 md:px-8 md:pt-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-[960px]"
      >
        <ul className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-[22px] bg-white px-4 py-4 shadow-md2 ring-1 ring-line/70 md:grid-cols-4 md:gap-0 md:divide-x md:divide-line md:rounded-[24px] md:px-3">
          {stats.map(({ icon: Icon, to, suffix, label, note }) => (
            <li key={label} className="flex items-center gap-3 md:justify-center md:px-3">
              <Icon
                className="h-7 w-7 shrink-0 text-teal-500 md:h-8 md:w-8"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <span className="leading-none">
                <span className="block text-[20px] font-bold text-teal-900 md:text-[22px]">
                  <Counter to={to} suffix={suffix} />
                </span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted md:text-[13.5px]">
                  {label}
                  {note && <span className="ml-1 text-[10.5px] text-teal-500">{note}</span>}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}