import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import NavbarShowcase from "./pages/NavbarShowcase.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<ComingSoon page="About" />} />
        <Route path="/services" element={<ComingSoon page="Services" />} />
        <Route path="/services/:slug" element={<ComingSoon page="Services" />} />
        <Route path="/gallery" element={<ComingSoon page="Gallery" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Placeholder title="404 - Page not found" />} />
      </Route>
      {/* Design review board (layout ke baghair) */}
      <Route path="/navbar-preview" element={<NavbarShowcase />} />
    </Routes>
  );
}