import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { navLinks } from "../../data/siteConfig.js";
import Logo from "../ui/Logo.jsx";
import { BookButton } from "../ui/Button.jsx";
import MegaMenu from "./MegaMenu.jsx";

/**
 * scrolled      -> chhota hota hai + glass blur
 * forceMegaOpen -> mega menu khula rakhta hai (design board)
 * activePath    -> kaunsa link active dikhe (design board)
 */
export default function NavbarInner({
  scrolled = false,
  forceMegaOpen = false,
  activePath,
  onMenuClick,
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const location = useLocation();
  const isOpen = forceMegaOpen || open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const openMega = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };

  const closeMega = () => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  };

  const linkBase =
    "relative inline-flex items-center gap-1 py-2 text-[15px] font-semibold transition-colors duration-200 hover:text-teal-500 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100";

  const checkActive = (to, routerActive) =>
    activePath ? activePath === to : routerActive;

  return (
    <div
      onMouseLeave={closeMega}
      className={`relative transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "bg-white/85 shadow-md2 backdrop-blur-xl"
          : "bg-white shadow-md2 lg:rounded-b-[26px]"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1240px] items-center justify-between px-5 transition-[height] duration-300 md:px-8 ${
          scrolled ? "h-16 lg:h-[70px]" : "h-16 lg:h-[88px]"
        }`}
      >
        {/* =====================================================
            BRAND
            New PNG logo + OLD TEXT STYLE
            Old ring logo is NOT used.
           ===================================================== */}

        <div className="inline-flex shrink-0 items-center">
          {/* NEW LOGO ONLY (click par Home) */}
          <Link
            to="/"
            aria-label="Muscat Dental Clinics, Home"
            className="inline-flex shrink-0 items-center"
          >
            <img
              src="/images/logo/muscat-logo-256.png"
              alt=""
              width="256"
              height="256"
              decoding="async"
              className={`w-auto object-contain transition-[height] duration-300 ${
                scrolled ? "h-11 lg:h-12" : "h-11 lg:h-14"
              }`}
            />
          </Link>

          {/* OLD TEXT ONLY — Logo.jsx ka existing text style (ye khud ek link hai) */}
          <span className="ml-2">
            <Logo size="md" showIcon={false} />
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-11">
            {navLinks.map((l) => (
              <li
                key={l.to}
                onMouseEnter={l.mega ? openMega : closeMega}
              >
                <NavLink to={l.to} end={l.to === "/"}>
                  {({ isActive }) => {
                    const active = checkActive(l.to, isActive);

                    return (
                      <span
                        aria-current={active ? "page" : undefined}
                        className={`${linkBase} ${
                          active
                            ? "text-teal-800 after:scale-x-100"
                            : "text-ink after:scale-x-0"
                        }`}
                      >
                        {l.label}

                        {l.mega && (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    );
                  }}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Book Appointment */}
        <div className="hidden lg:block">
          <BookButton size="nav" />
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-teal-800 transition-colors hover:bg-mint lg:hidden"
        >
          <Menu className="h-7 w-7" strokeWidth={1.8} />
        </button>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {isOpen && (
          <MegaMenu
            onNavigate={() => setOpen(false)}
            onEnter={openMega}
          />
        )}
      </AnimatePresence>
    </div>
  );
}