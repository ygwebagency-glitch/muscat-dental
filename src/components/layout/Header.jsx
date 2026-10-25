import { useState } from "react";
import { useScroll } from "../../hooks/useScroll.js";
import ScrollProgress from "./ScrollProgress.jsx";
import TopBar from "./TopBar.jsx";
import NavbarInner from "./Navbar.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function Header() {
  const { y } = useScroll();
  const scrolled = y > 80;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      {/* Desktop par 80px scroll ke baad 44px ka top bar upar chala jata hai. */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          scrolled ? "lg:-translate-y-11" : ""
        }`}
      >
        <TopBar />
        <NavbarInner scrolled={scrolled} onMenuClick={() => setMenuOpen(true)} />
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}