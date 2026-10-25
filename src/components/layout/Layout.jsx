import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import MobileStickyBar from "./MobileStickyBar.jsx";
import Footer from "./Footer.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

const WA_HREF =
  "https://wa.me/923007874031?text=" + encodeURIComponent("Hello, I would like to book an appointment.");

function WhatsAppFab() {
  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[88px] right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_26px_rgba(37,211,102,.45)] transition hover:-translate-y-0.5 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <path d="M16 4.5a11.5 11.5 0 0 0-9.9 17.3L4.5 27.5l5.9-1.5A11.5 11.5 0 1 0 16 4.5z" />
        <path d="M12.2 10.8c-.5.6-.8 1.5-.3 2.7 1.1 2.6 3 4.6 5.6 5.7 1.2.5 2.1.2 2.7-.4l.6-.9-2.4-1.3-.9.8c-1.3-.6-2.5-1.8-3.1-3.1l.8-.9-1.3-2.4z" />
      </svg>
    </a>
  );
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      {/* Offset: desktop par top bar 44px + navbar 88px, mobile par 64px */}
      <main className="pt-16 pb-24 md:pb-0 lg:pt-[132px]">
        <Outlet />
        <Footer />
      </main>
      <WhatsAppFab />
      <MobileStickyBar />
    </>
  );
}