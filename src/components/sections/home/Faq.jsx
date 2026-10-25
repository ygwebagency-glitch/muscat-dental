import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { faqImage } from "../../../data/images.js";
import { site } from "../../../data/siteConfig.js";
import SmartImage from "../../ui/SmartImage.jsx";
import DotPattern from "../../ui/DotPattern.jsx";
import TextReveal from "../../motion/TextReveal.jsx";
import { WhatsAppIcon, PlusMinus } from "../../ui/FaqIcons.jsx";

const EASE = [0.22, 1, 0.36, 1];

// Agar siteConfig.js mein whatsappHref hai to wohi use hoga, warna ye number.
const WA_LINK = site.whatsappHref ?? "https://wa.me/923007874031";

// NOTE: Pehla jawab design se hai. Baqi jawab maine likhe hain: client (Dr. Siddique) se ek dafa confirm zaroor karwayen.
const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "We recommend visiting your dentist every 6 months for a routine check-up and cleaning. Regular visits help us catch problems early, keep your gums healthy, and maintain your bright smile.",
  },
  {
    q: "Is teeth scaling harmful?",
    a: "No. Professional scaling is a safe, routine procedure that removes plaque and tartar your toothbrush cannot reach. You may feel mild sensitivity for a day or two, which settles on its own. Regular scaling actually helps protect your gums.",
  },
  {
    q: "Does root canal treatment hurt?",
    a: "No. The treatment is done under local anesthesia, so you should feel little more than you would during a filling. Any mild soreness afterwards usually settles within a few days.",
  },
  {
    q: "How long does a filling take?",
    a: "Most fillings take about 30 to 60 minutes, depending on the size and position of the tooth. We will tell you what to expect before we begin.",
  },
  {
    q: "Are braces only for children?",
    a: "Not at all. Braces work for teenagers and adults too, as long as your teeth and gums are healthy. We will examine your teeth and explain the best option and the approximate treatment time.",
  },
  {
    q: "What is the cost of teeth scaling in Multan?",
    a: "The cost depends on the amount of plaque and tartar and whether any extra treatment is needed. After a quick examination we will give you a clear price before we start. Call or WhatsApp us for a quote.",
  },
  {
    q: "Can children visit your clinic?",
    a: "Yes, children are always welcome. Our team is gentle and patient with young patients, and we take the time to explain things so their visits are calm and positive.",
  },
];

// Google search ke liye (FAQ rich results)
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const reduce = useReducedMotion();
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, amount: 0.25 });
  const show = reduce || inView;
  const [open, setOpen] = useState(0); // pehla jawab shuru mein khula
  const btnRefs = useRef([]);

  // Up / Down / Home / End se sawalon ke beech chalna (accessibility)
  const onKeyDown = (e, i) => {
    const last = faqs.length - 1;
    const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    btnRefs.current[next]?.focus();
  };

  // Har cheez neeche se (ya side se) ubhar kar aati hai
  const rise = (delay = 0, y = 24, x = 0) => ({
    initial: reduce ? false : { opacity: 0, y, x },
    animate: show ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  // Signature left se right "likha" jata hai
  const wipe = (delay, duration) => ({
    initial: false,
    animate: { clipPath: show ? "inset(-40% -12% -40% 0%)" : "inset(-40% 100% -40% 0%)" },
    transition: { duration, delay, ease: [0.65, 0, 0.35, 1] },
  });

  return (
    <section id="faq" aria-labelledby="faq-title" className="faq snap-sec">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <span className="faq-sep" aria-hidden="true" />

      <span className="faq-sep" aria-hidden="true" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="faq-blob-a" />
        <div className="faq-blob-b" />
        <DotPattern className="faq-dots hidden lg:block" />
      </div>

      <div ref={gridRef} className="faq-grid">
        {/* ---------- Left: heading ---------- */}
        <div className="faq-head">
          <motion.div className="faq-eyebrow" {...rise(0, 14)}>
            <span className="faq-line" />
            <span className="faq-pill">FAQs</span>
            <span className="faq-line" />
          </motion.div>

          <TextReveal
            id="faq-title"
            show={show}
            delay={0.1}
            lines={["Frequently Asked", "Questions"]}
            className="faq-title font-display font-semibold tracking-[-0.01em] text-teal-900"
          />

          <motion.p className="faq-lead" {...rise(0.35)}>
            We know you may have questions about your dental health. Here are some of the most common questions we
            receive from our patients in Multan.
          </motion.p>
        </div>

        {/* ---------- Right: accordion ---------- */}
        <ol className="faq-list" aria-label="Frequently asked questions">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const qid = `faq-q-${i}`;
            const aid = `faq-a-${i}`;
            return (
              <motion.li key={f.q} {...rise(0.25 + i * 0.08, 0, 40)}>
                <div className="faq-card" data-open={isOpen}>
                  <h3 className="faq-h">
                    <button
                      ref={(el) => (btnRefs.current[i] = el)}
                      id={qid}
                      type="button"
                      className="faq-q"
                      aria-expanded={isOpen}
                      aria-controls={aid}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                    >
                      <span className="faq-badge" aria-hidden="true">{i + 1}</span>
                      <span className="faq-question font-display">{f.q}</span>
                      <span className="faq-ctrl"><PlusMinus /></span>
                    </button>
                  </h3>
                  <div id={aid} role="region" aria-labelledby={qid} aria-hidden={!isOpen} className="faq-panel">
                    <div className="faq-panel-inner">
                      <p className="faq-answer">{f.a}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* ---------- Left: WhatsApp card ---------- */}
        <motion.div className="faq-wa" {...rise(0.45, 30)}>
          <div className="faq-wa-body">
            <span className="faq-wa-ico"><WhatsAppIcon /></span>
            <div>
              <p className="faq-wa-still">Still have questions?</p>
              <p className="faq-wa-name font-display">WhatsApp us</p>
            </div>
            <p className="faq-wa-desc">Our friendly team is here to help you.</p>
            <a className="faq-wa-btn" href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="faq-wa-glyph" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="faq-wa-arrow" strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
          <div className="faq-wa-photo">
            <SmartImage
              src={faqImage}
              alt="Friendly Muscat Dental Clinics team member answering a patient's call"
              className="h-full w-full object-cover object-[72%_25%]"
            />
          </div>
        </motion.div>

        {/* ---------- Left: signature (live text + code se bani swoosh line) ---------- */}
        <div className="faq-sig" role="img" aria-label="Your Smile Matters" style={{ marginTop: "clamp(14px, 1.6vw, 26px)" }}>
          <p className="faq-sig-text" aria-hidden="true">
            {["Your", "Smile", "Matters"].map((w, i) => (
              <motion.span key={w} className="faq-sig-word" {...wipe(1.0 + i * 0.5, 0.75)}>
                {w}
              </motion.span>
            ))}
          </p>
          <motion.svg className="faq-sig-line" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" {...wipe(2.6, 0.9)}>
            <path fill="currentColor" d="M0 18 C55 8 125 3 200 1.5 C128 6.5 58 13.5 0 18 Z" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
