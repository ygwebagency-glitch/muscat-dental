import { ShieldCheck, Users } from "lucide-react";
import ToothIcon from "../../ui/ToothIcon.jsx";

const items = [
  { icon: Users, value: "18+", label: "Years of Experience" },
  { icon: Users, value: "5000+", label: "Happy Patients", note: "[CONFIRM]" },
  { icon: ToothIcon, title: "Modern Equipment" },
  { icon: ShieldCheck, title: "Hygiene-first Practice" },
];

export default function HeroTrustRow() {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:mt-[clamp(16px,3.8vh,48px)] lg:flex lg:items-stretch lg:gap-0">
      {items.map(({ icon: Icon, value, label, note, title }) => (
        <li
          key={value || title}
          className="flex items-start gap-3 lg:border-l lg:border-teal-500/25 lg:px-4 lg:first:border-l-0 lg:first:pl-0 xl:px-6"
        >
          <Icon
            className="mt-0.5 h-7 w-7 shrink-0 text-teal-500 lg:h-[clamp(22px,3.8vh,28px)] lg:w-[clamp(22px,3.8vh,28px)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {value ? (
            <span className="leading-tight">
              <span className="block text-[22px] font-bold text-teal-900 lg:text-[clamp(18px,3vh,22px)]">{value}</span>
              <span className="block text-[13px] text-muted">{label}</span>
              {note && <span className="block text-[12px] text-teal-500">{note}</span>}
            </span>
          ) : (
            <span className="max-w-[140px] text-[15px] font-semibold leading-snug text-teal-900">{title}</span>
          )}
        </li>
      ))}
    </ul>
  );
}