import Hero from "../components/sections/home/Hero.jsx";
import TrustStrip from "../components/sections/home/TrustStrip.jsx";
import Highlights from "../components/sections/home/Highlights.jsx";
import AboutPreview from "../components/sections/home/AboutPreview.jsx";
import Services from "../components/sections/home/Services.jsx";
import WhyChooseUs from "../components/sections/home/WhyChooseUs.jsx";
import HowItWorks from "../components/sections/home/HowItWorks.jsx";
import GalleryPreview from "../components/sections/home/GalleryPreview.jsx";
import Testimonials from "../components/sections/home/Testimonials.jsx";
import Faq from "../components/sections/home/Faq.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Highlights />
      <AboutPreview />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <GalleryPreview />
      <Testimonials />
      <Faq />

    </>
  );
}