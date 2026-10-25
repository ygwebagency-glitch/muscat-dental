import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { heroImage } from "../../../data/images.js";
import SmartImage from "../../ui/SmartImage.jsx";
import ToothIcon from "../../ui/ToothIcon.jsx";
import DotPattern from "../../ui/DotPattern.jsx";

const EASE = [0.22, 1, 0.36, 1];
// Reference design jaisa organic blob mask
const BLOB = "58% 42% 46% 54% / 40% 46% 54% 60%";
// Ek dafa image ready ho jaye to dobara kabhi nahi chhupti (component dobara mount ho tab bhi)
let heroWasReady = false;

/** Glass card: entry animation (bahar) + halka floating loop (andar). */
function FloatCard({ className = "", delay = 0, duration = 5.5, reduce, show, children }) {
  return (
    <motion.div
      className={`absolute z-10 ${className}`}
      initial={reduce || heroWasReady ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        className="rounded-2xl bg-white shadow-[0_12px_30px_rgba(11,59,60,.12)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function HeroVisual({ className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [wide, setWide] = useState(false);

  // Image pehle load + decode hoti hai, animation uske baad shuru hota hai (jhatka nahi aata)
  const [ready, setReady] = useState(heroWasReady);
  const show = reduce || ready;
  useEffect(() => {
    let alive = true;
    const done = () => {
      heroWasReady = true;
      if (alive) setReady(true);
    };
    const img = new Image();
    img.src = heroImage;
    if (img.decode) img.decode().then(done).catch(done);
    else {
      img.onload = done;
      img.onerror = done;
    }
    const safety = setTimeout(done, 2500); // image na aaye to bhi page rukega nahi
    return () => {
      alive = false;
      clearTimeout(safety);
    };
  }, [heroImage]);

  // Parallax sirf desktop par
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, wide && !reduce ? 20 : 0]);

  return (
    <div
      ref={ref}
      className={`relative mx-auto w-full max-w-[640px] lg:mx-0 lg:max-w-none lg:self-stretch ${className}`}
    >
      <DotPattern className="-right-4 top-[6%] hidden h-24 w-28 lg:block" />
      <DotPattern className="-bottom-[4%] right-[4%] hidden h-20 w-24 lg:block" />

      {/* Desktop par image hero ki height ke mutabiq fit hoti hai (height-driven) */}
      <div className="relative aspect-square md:aspect-[4/3] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-[1.15/1] lg:h-full lg:w-auto lg:max-w-full">
        {/* photo ke peeche soft teal blobs */}
        <div aria-hidden="true" className="absolute -left-[5%] top-[12%] h-[76%] w-[60%] rounded-full bg-gradient-to-br from-[#C6EAE7] to-[#8ED3CF]/70" />
        <div aria-hidden="true" className="absolute left-[12%] -top-[3%] h-[42%] w-[74%] rounded-[50%] bg-[#CDEDEA]/70" />

        {/* right edge ki patli orange arcs */}
        <svg aria-hidden="true" viewBox="0 0 40 150" fill="none" className="absolute -right-[3%] bottom-[10%] hidden h-[28%] w-auto md:block">
          <path d="M36 4 C 28 30 16 52 4 66" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 134 C 14 126 22 118 30 108" stroke="#F58220" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* photo */}
                <motion.div
          className="absolute inset-0 overflow-hidden border-[5px] border-white bg-white shadow-lg2"
          style={{ borderRadius: BLOB }}
          initial={reduce || heroWasReady ? false : { opacity: 0, scale: 0.95 }}
          animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <motion.div
            style={{ y: imgY }}
            initial={reduce || heroWasReady ? false : { scale: 1.16 }}
            animate={{ scale: show ? 1.08 : 1.16 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="h-full w-full"
          >
            <SmartImage
              src={heroImage}
              alt="Dentist examining a smiling patient at Muscat Dental Clinics, Multan"
              loading="eager"
              className="h-full w-full object-[50%_30%]"
            />
          </motion.div>
        </motion.div>

                {/* rating card */}
        <FloatCard reduce={reduce} show={show} delay={0.5} duration={5.5} className="-left-[3%] top-[6%] md:-left-[5%] md:top-[10%]">
          <div className="px-3 py-2.5 xl:px-4 xl:py-3">
            <div className="flex items-center gap-2">
              <Star className="h-[17px] w-[17px] fill-none text-accent xl:h-[18px] xl:w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              <span className="text-[20px] font-bold leading-none text-teal-900 xl:text-[24px]">4.9</span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-none text-[#5B7480] xl:text-[14px]">Patient Rating</p>
            <p className="mt-1 text-[10px] leading-none text-teal-500 xl:text-[10.5px]">[CONFIRM]</p>
          </div>
        </FloatCard>

        {/* painless card (phone par hidden) */}
        <FloatCard reduce={reduce} show={show} delay={0.7} duration={6.2} className="-right-[3%] bottom-[16%] hidden md:block lg:-right-[6%] lg:bottom-[16%]">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 xl:px-4">
            <ToothIcon className="h-6 w-6 text-teal-500 xl:h-7 xl:w-7" strokeWidth={1.4} />
            <span className="text-[13.5px] font-medium leading-tight text-[#3C5A63] xl:text-[15px]">
              Painless
              <br />
              Treatments
            </span>
          </div>
        </FloatCard>

      </div>
    </div>
  );
}