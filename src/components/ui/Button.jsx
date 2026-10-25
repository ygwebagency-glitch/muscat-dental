import { Link } from "react-router-dom";
import { CalendarDays, Phone } from "lucide-react";
import { site } from "../../data/siteConfig.js";

const sizes = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
  hero: "h-14 px-8 text-base lg:h-[clamp(44px,7.2vh,56px)]",
  nav: "h-[52px] px-7 text-[15px]",
  full: "h-[52px] w-full text-[15px]",
  bar: "h-14 flex-1 text-[15px]",
};

export function BookButton({ size = "md", label = "Book Appointment", to = "/contact#book", className = "", onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-accent-light to-accent font-bold text-white shadow-[0_8px_20px_rgba(245,130,32,.32)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(245,130,32,.45)] active:translate-y-0 ${sizes[size]} ${className}`}
    >
      <CalendarDays className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      {label}
    </Link>
  );
}

export function CallButton({ size = "bar", className = "" }) {
  return (
    <a
      href={site.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-teal-800 font-bold text-white shadow-md2 transition duration-200 hover:-translate-y-0.5 hover:bg-teal-900 active:translate-y-0 ${sizes[size]} ${className}`}
    >
      <Phone className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
      Call
    </a>
  );
}