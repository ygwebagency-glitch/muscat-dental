import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import FloatingWhatsApp from "./FloatingWhatsApp.jsx";
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
      <FloatingWhatsApp />
      <MobileStickyBar />
    </>
  );
}