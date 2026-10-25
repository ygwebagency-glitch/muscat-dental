import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { site } from "../../data/siteConfig.js";
import { WhatsAppIcon } from "../ui/FaqIcons.jsx";
import {
  ServiceIcons,
  Facebook,
  Instagram,
  TikTok,
  Pin,
  Phone,
  Mail,
  Clock,
  Chevron,
  Arrow,
  ArrowUp,
  Calendar,
  Directions,
  ShieldCheck,
  Person,
  Heart,
  Smile,
} from "../ui/FooterIcons.jsx";

const EASE = [0.22, 1, 0.36, 1];

/* ====== Yahan apni asli details badlein ====== */
const ADDRESS_LINE_1 = "11B Shaheena Avenue North,";
const ADDRESS_LINE_2 = "Gulgasht, Multan, Pakistan 66000";
const MAP_QUERY = "11B Shaheena Ave, North Gulgasht Multan, Multan, 66000, Pakistan";
const PHONE_SHOW = "+92 300 7874031";
const PHONE_TEL = "tel:+923007874031";
const WA_LINK = site.whatsappHref ?? "https://wa.me/923007874031";
const EMAIL = "dr.siddiquesattar@gmail.com";
const PORTFOLIO_URL = "https://your-portfolio-link.com"; // baad mein apne portfolio ka asli link yahan likhein
const TIMINGS = "[ADD TIMINGS]"; // client se timings le kar yahan likhein, e.g. "Mon - Sat: 10:00 AM - 8:00 PM"
const SOCIAL = {
  facebook: site.social?.facebook ?? "#",
  instagram: site.social?.instagram ?? "#",
  tiktok: site.social?.tiktok ?? "#",
};
/* ============================================ */

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`;
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const services = [
  { label: "General Dentistry", slug: "general-dentistry", icon: "general" },
  { label: "Cosmetic Dentistry", slug: "cosmetic-dentistry", icon: "cosmetic" },
  { label: "Scaling & Polishing", slug: "scaling-polishing", icon: "scaling" },
  { label: "Dental Implants", slug: "dental-implants", icon: "implants" },
  { label: "Root Canal Treatment", slug: "root-canal-treatment", icon: "rootcanal" },
  { label: "Pediatric Dentistry", slug: "pediatric-dentistry", icon: "pediatric" },
  { label: "Orthodontics & Braces", slug: "orthodontics-braces", icon: "braces" },
  { label: "Crowns & Bridges", slug: "crowns-bridges", icon: "crown" },
  { label: "Tooth Extraction", slug: "tooth-extraction", icon: "extraction" },
];

const perks = [
  { label: ["Modern", "Facilities"], Icon: ShieldCheck },
  { label: ["Expert", "Care"], Icon: Person },
  { label: ["Comfortable", "Experience"], Icon: Heart },
  { label: ["Healthier", "Smiles"], Icon: Smile },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Muscat Dental Clinics (Multan)",
  telephone: "+923007874031",
  email: EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "11B Shaheena Avenue North, Gulgasht",
    addressLocality: "Multan",
    addressRegion: "Punjab",
    postalCode: "66000",
    addressCountry: "PK",
  },
};

// "YH" ka chhota logo (khud banaya hua)
function YhLogo({ className }) {
  return (
    <svg viewBox="0 0 31 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 1h3.6L8 8.6 12.4 1H16L9.6 11.6V19H6.4v-7.4Z" />
      <path d="M18 1h3.2v7h6.6V1H31v18h-3.2v-7.8h-6.6V19H18Z" />
    </svg>
  );
}

export default function Footer() {
  const reduce = useReducedMotion();
  const [mapOn, setMapOn] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const urduRef = useRef(null);
  const urduIn = useInView(urduRef, { once: true, amount: 0.5 });
  const showUrdu = reduce || urduIn;

  // Back-to-top sirf thora scroll karne ke baad nazar aaye
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll ke saath neeche se ubharna
  const up = (delay = 0, y = 26) => ({
    initial: reduce ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer id="book" className="ft snap-sec">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ================= Book Your Visit band ================= */}
      <section
        className="ft-cta-wrap"
        aria-labelledby="ft-cta-title"
        style={{
          paddingTop: "clamp(16px, 2vw, 28px)",
          paddingBottom: "clamp(18px, 2.2vw, 32px)",
        }}
      >
        <motion.div className="ft-cta" {...up(0, 30)}>
          <div className="ft-cta-text">
            <p className="ft-cta-eyebrow">
              <span className="ft-cta-dash" />
              Take the first step
            </p>
            <h2 id="ft-cta-title" className="ft-cta-title font-display">
              Book Your Visit Today
            </h2>
            <p className="ft-cta-lead">
              Your smile matters. Schedule an appointment and let our expert team take care of your dental health.
            </p>
          </div>

          <div className="ft-cta-action">
            <Link to="/contact" className="ft-cta-btn">
              <Calendar className="ft-cta-btn-ico" />
              <span>Book Appointment</span>
              <Arrow className="ft-cta-btn-arrow" />
            </Link>
            <p className="ft-cta-note">Quick • Easy • Hassle Free</p>
          </div>

          <ul className="ft-perks">
            {perks.map(({ label, Icon }, i) => (
              <motion.li key={label.join(" ")} className="ft-perk" {...up(0.15 + i * 0.1, 18)}>
                <Icon className="ft-perk-ico" />
                <span>
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ================= Wave ================= */}
      <div className="ft-wave" aria-hidden="true">
        <svg viewBox="0 0 1672 58" preserveAspectRatio="none" className="ft-wave-back">
          <path d="M0 26.0C10 24.5 40 19.2 60 17.0C80 14.8 100 13.3 120 13.0C140 12.7 160 13.3 180 15.0C200 16.7 220 20.0 240 23.0C260 26.0 280 29.5 300 33.0C320 36.5 340 41.0 360 44.0C380 47.0 400 49.3 421 51.0C441 52.7 461 53.5 481 54.0C501 54.5 521 54.8 541 54.0C561 53.2 581 50.8 601 49.0C621 47.2 641 45.3 661 43.0C681 40.7 701 37.3 721 35.0C741 32.7 761 30.8 781 29.0C801 27.2 821 25.0 841 24.0C861 23.0 881 22.7 901 23.0C921 23.3 941 24.8 961 26.0C981 27.2 1001 28.2 1021 30.0C1041 31.8 1061 34.8 1081 37.0C1101 39.2 1121 41.5 1141 43.0C1161 44.5 1181 45.7 1201 46.0C1221 46.3 1241 46.5 1262 45.0C1282 43.5 1302 40.5 1322 37.0C1342 33.5 1362 28.2 1382 24.0C1402 19.8 1422 14.5 1442 12.0C1462 9.5 1482 8.8 1502 9.0C1522 9.2 1542 10.5 1562 13.0C1582 15.5 1604 20.0 1622 24.0C1640 28.0 1663 34.8 1673 37.0V58H0Z" />
        </svg>
        <svg viewBox="0 0 1672 58" preserveAspectRatio="none" className="ft-wave-front">
          <path d="M0 26.0C10 24.5 40 19.2 60 17.0C80 14.8 100 13.3 120 13.0C140 12.7 160 13.3 180 15.0C200 16.7 220 20.0 240 23.0C260 26.0 280 29.5 300 33.0C320 36.5 340 41.0 360 44.0C380 47.0 400 49.3 421 51.0C441 52.7 461 53.5 481 54.0C501 54.5 521 54.8 541 54.0C561 53.2 581 50.8 601 49.0C621 47.2 641 45.3 661 43.0C681 40.7 701 37.3 721 35.0C741 32.7 761 30.8 781 29.0C801 27.2 821 25.0 841 24.0C861 23.0 881 22.7 901 23.0C921 23.3 941 24.8 961 26.0C981 27.2 1001 28.2 1021 30.0C1041 31.8 1061 34.8 1081 37.0C1101 39.2 1121 41.5 1141 43.0C1161 44.5 1181 45.7 1201 46.0C1221 46.3 1241 46.5 1262 45.0C1282 43.5 1302 40.5 1322 37.0C1342 33.5 1362 28.2 1382 24.0C1402 19.8 1422 14.5 1442 12.0C1462 9.5 1482 8.8 1502 9.0C1522 9.2 1542 10.5 1562 13.0C1582 15.5 1604 20.0 1622 24.0C1640 28.0 1663 34.8 1673 37.0V58H0Z" />
        </svg>
      </div>

      {/* ================= Main footer ================= */}
      <div className="ft-main">
        <div className="ft-grid">
          {/* ---- Brand ---- */}
          <motion.div className="ft-col ft-brand" {...up(0)}>
            <Link to="/" className="ft-logo" aria-label="Muscat Dental Clinics (Multan) - Home">
              <img src="/images/footer/muscat-logo-footer.svg" alt="" className="ft-logo-mark" width="92" height="92" />
              <span className="ft-logo-text">
                <span className="ft-logo-name">MUSCAT</span>
                <span className="ft-logo-sub">DENTAL CLINICS</span>
                <span className="ft-logo-city">(Multan)</span>
              </span>
            </Link>

            <p className="ft-tag">Trusted Dental Care for Every Smile in Multan</p>
            <p className="ft-about">Modern technology, gentle care and a team that truly cares about your smile.</p>

            <ul className="ft-social">
              <li>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook />
                </a>
              </li>
              <li>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram />
                </a>
              </li>
              <li>
                <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <TikTok />
                </a>
              </li>
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
              </li>
            </ul>

            <div ref={urduRef} className="ft-urdu-wrap" role="img" aria-label="Har muskurahat ke peechhe hamara azm">
              <motion.p
                className="ft-urdu"
                lang="ur"
                dir="rtl"
                aria-hidden="true"
                initial={false}
                animate={{ clipPath: showUrdu ? "inset(-30% 0% -30% 0%)" : "inset(-30% 0% -30% 100%)" }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              >
                ہر مسکراہٹ کے پیچھے ہمارا عزم
              </motion.p>
              <motion.svg
                className="ft-urdu-line"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                aria-hidden="true"
                initial={false}
                animate={{ clipPath: showUrdu ? "inset(-60% 0% -60% 0%)" : "inset(-60% 100% -60% 0%)" }}
                transition={{ duration: 0.9, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
              >
                <path fill="currentColor" d="M0 11.5C50 6 125 3 200 2.2 130 5.4 56 9.2 0 11.5Z" />
              </motion.svg>
            </div>
          </motion.div>

          {/* ---- Quick links ---- */}
          <motion.nav className="ft-col ft-links" aria-label="Quick links" {...up(0.1)}>
            <h3 className="ft-h font-display">Quick Links</h3>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="ft-link">
                    <Chevron className="ft-link-chev" />
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ---- Services ---- */}
          <motion.nav className="ft-col ft-services" aria-label="Our services" {...up(0.2)}>
            <h3 className="ft-h font-display">Our Services</h3>
            <ul>
              {services.map((s) => {
                const Icon = ServiceIcons[s.icon];
                return (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="ft-link ft-svc">
                      <Icon className="ft-svc-ico" />
                      <span>{s.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>

          {/* ---- Contact ---- */}
          <motion.div className="ft-col ft-contact" {...up(0.3)}>
            <h3 className="ft-h font-display">Contact Us</h3>
            <ul>
              <li>
                <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="ft-ct">
                  <Pin className="ft-ct-ico" />
                  <span>
                    {ADDRESS_LINE_1}
                    <br />
                    {ADDRESS_LINE_2}
                  </span>
                </a>
              </li>
              <li>
                <a href={PHONE_TEL} className="ft-ct">
                  <Phone className="ft-ct-ico" />
                  <span>
                    {PHONE_SHOW}
                    <small>(Call / WhatsApp)</small>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="ft-ct">
                  <Mail className="ft-ct-ico" />
                  <span className="ft-mail">{EMAIL}</span>
                </a>
              </li>
              <li>
                <div className="ft-ct">
                  <Clock className="ft-ct-ico" />
                  <span>{TIMINGS}</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* ---- Google Map card ---- */}
          <motion.div className="ft-col ft-mapcol" {...up(0.4)}>
            <div className="ft-map">
              <div className="ft-map-frame">
                <iframe
                  title="Muscat Dental Clinics (Multan) on Google Maps"
                  src={MAP_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {!mapOn && (
                  <button type="button" className="ft-map-shield" onClick={() => setMapOn(true)} aria-label="Map ko hilane ke liye click karein">
                    <span>Click to explore map</span>
                  </button>
                )}
              </div>
              <div className="ft-map-addr">
                <Pin className="ft-map-pin" />
                <p>
                  {ADDRESS_LINE_1}
                  <br />
                  {ADDRESS_LINE_2}
                </p>
              </div>
              <a href={MAP_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="ft-map-btn">
                <Directions className="ft-map-btn-ico" />
                <span>Get Directions</span>
                <Arrow className="ft-map-btn-arrow" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="ft-bottom">
          <p>
            © {new Date().getFullYear()} Muscat Dental Clinics (Multan). All rights reserved.
          </p>
          <a className="ft-powered" href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer">
            <span>Powered by</span>
            <YhLogo className="ft-yh" />
            <i aria-hidden="true" />
            <span>Premium Web Solutions</span>
          </a>
        </div>
      </div>

      {/* Back to top: WhatsApp button ke bilkul upar, scroll karne par hi aata hai */}
      <button type="button" className={`ft-top${showTop ? " is-on" : ""}`} onClick={toTop} aria-label="Back to top" tabIndex={showTop ? 0 : -1}>
        <ArrowUp />
      </button>
    </footer>
  );
}
