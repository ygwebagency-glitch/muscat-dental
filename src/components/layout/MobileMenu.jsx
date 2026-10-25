import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, X } from "lucide-react";
import { navLinks, services, site } from "../../data/siteConfig.js";
import { serviceImages } from "../../data/images.js";
import Logo from "../ui/Logo.jsx";
import SmartImage from "../ui/SmartImage.jsx";
import { WhatsAppIcon } from "../ui/icons.jsx";
import { BookButton, CallButton } from "../ui/Button.jsx";

const withChevron = new Set(["/about", "/services", "/gallery"]);

/** Main menu content (design board mein bhi use hota hai). */
export function MenuMain({ onNavigate, onServices, onClose, activePath, showLogo = true }) {
  const location = useLocation();
  const current = activePath ?? location.pathname;

  return (
    <div className="flex h-full flex-col">
      {showLogo && (
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-teal-800 hover:bg-mint"
          >
            <X className="h-7 w-7" strokeWidth={1.8} />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <ul>
          {navLinks.map((l) => {
            const active = l.to === "/" ? current === "/" : current.startsWith(l.to);
            const row =
              "flex h-14 w-full items-center justify-between border-b border-line text-left text-[16px] font-semibold";
            const chevron = withChevron.has(l.to) && (
              <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
            );
            return (
              <li key={l.to}>
                {l.mega ? (
                  <button type="button" onClick={onServices} className={`${row} text-ink`}>
                    {l.label}
                    {chevron}
                  </button>
                ) : (
                  <Link to={l.to} onClick={onNavigate} className={`${row} ${active ? "text-teal-800" : "text-ink"}`}>
                    <span className={active ? "border-b-2 border-accent pb-0.5" : ""}>{l.label}</span>
                    {chevron}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <BookButton size="full" className="mt-6" onClick={onNavigate} />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a href={site.phoneHref} className="flex items-center gap-3 rounded-2xl p-2">
            <Phone className="h-6 w-6 text-teal-500" strokeWidth={1.8} aria-hidden="true" />
            <span className="leading-tight">
              <span className="block text-[13px] font-bold text-teal-800">Call</span>
              <span className="block text-[12px] text-muted">{site.phone}</span>
            </span>
          </a>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl p-2">
            <WhatsAppIcon className="h-6 w-6 text-wa" />
            <span className="leading-tight">
              <span className="block text-[13px] font-bold text-teal-800">WhatsApp</span>
              <span className="block text-[12px] text-muted">Chat with us</span>
            </span>
          </a>
        </div>
      </div>

      <div className="flex shrink-0 gap-3 border-t border-line bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <CallButton size="bar" />
        <BookButton size="bar" label="Book Now" onClick={onNavigate} />
      </div>
    </div>
  );
}

/** Services list view (design board mein bhi use hota hai). */
export function MenuServices({ onNavigate, onClose, onBack }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <span className="flex items-center gap-1">
          {onBack && (
            <button type="button" onClick={onBack} aria-label="Back to menu" className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-teal-800 hover:bg-mint">
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          <span className="text-[17px] font-bold text-teal-800">Services</span>
        </span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-teal-800 hover:bg-mint">
          <X className="h-6 w-6" strokeWidth={1.8} />
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto px-5 pb-6">
        {services.map((s) => (
          <li key={s.slug}>
            <Link to={`/services/${s.slug}`} onClick={onNavigate} className="flex items-center gap-3.5 border-b border-line py-3">
              <SmartImage src={serviceImages[s.slug]} alt="" className="h-11 w-11 shrink-0 rounded-lg" />
              <span className="flex-1 text-[15px] font-semibold text-ink">{s.name}</span>
              <ChevronRight className="h-5 w-5 text-muted" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-screen slide-in menu (1024px se neeche). */
export default function MobileMenu({ open, onClose }) {
  const [view, setView] = useState("main");
  const { pathname } = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return undefined;
    setView("main");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] bg-white lg:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {view === "main" ? (
            <MenuMain onNavigate={onClose} onClose={onClose} onServices={() => setView("services")} />
          ) : (
            <MenuServices onNavigate={onClose} onClose={onClose} onBack={() => setView("main")} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}