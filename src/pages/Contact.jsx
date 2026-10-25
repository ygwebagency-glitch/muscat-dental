import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Lock,
  Check,
  Copy,
  Navigation,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  User,
  X,
} from "lucide-react";
import { contactImage } from "../data/images.js";
import clinicExterior from "../assets/clinic-exterior.jpg";
import SmartImage from "../components/ui/SmartImage.jsx";
import ToothIcon from "../components/ui/ToothIcon.jsx";
import DotPattern from "../components/ui/DotPattern.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import TextReveal from "../components/motion/TextReveal.jsx";

const EASE = [0.22, 1, 0.36, 1];

/* ---------- clinic info (siteConfig se bhi le sakte hain) ---------- */
const PHONE_DISPLAY = "+92 300 7874031";
const PHONE_HREF = "tel:+923007874031";
const WA_HREF = `https://wa.me/923007874031?text=${encodeURIComponent("Hello, I would like to book an appointment.")}`;
const EMAIL = "dr.siddiquesattar@gmail.com";
const ADDRESS = "11B Shaheena Avenue North, Gulgasht, Multan, Punjab, Pakistan 66000";
const MAP_QUERY = encodeURIComponent("11B Shaheena Avenue North, Gulgasht, Multan");
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const services = [
  "General Dentistry",
  "Cosmetic Dentistry",
  "Scaling & Polishing",
  "Dental Implants",
  "Root Canal Treatment",
  "Pediatric Dentistry",
  "Orthodontics & Braces",
  "Crowns & Bridges",
  "Tooth Extraction",
];

/* ---------- backend ----------
   client/.env mein VITE_API_URL=http://localhost:5000 likhein jab backend tayyar ho.
   Jab tak ye set nahi, form "demo mode" mein chalta hai (success dikhata hai, par kuch save nahi hota). */
const API = import.meta.env.VITE_API_URL;
async function submitAppointment(data) {
  if (!API) {
    await new Promise((r) => setTimeout(r, 900));
    return { demo: true };
  }
  const res = await fetch(`${API}/api/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

const todayStr = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^(03\d{9}|\+923\d{9})$/.test(v.phone.replace(/[\s-]/g, "")))
    e.phone = "Enter a valid number, e.g. 0300 1234567 or +92 300 1234567.";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.service) e.service = "Please choose a service.";
  if (!v.date) e.date = "Please pick a preferred date.";
  else if (v.date < todayStr()) e.date = "Please pick today or a future date.";
  return e;
}

/* ---------- custom WhatsApp icon ---------- */
function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 4.5a11.5 11.5 0 0 0-9.9 17.3L4.5 27.5l5.9-1.5A11.5 11.5 0 1 0 16 4.5z" />
      <path d="M12.2 10.8c-.5.6-.8 1.5-.3 2.7 1.1 2.6 3 4.6 5.6 5.7 1.2.5 2.1.2 2.7-.4l.6-.9-2.4-1.3-.9.8c-1.3-.6-2.5-1.8-3.1-3.1l.8-.9-1.3-2.4z" />
    </svg>
  );
}

/* ---------- form pieces ---------- */
const inputBase =
  "relative h-[46px] w-full rounded-xl border border-[#D5E6E4] bg-white pl-11 pr-3 text-[14.5px] text-ink outline-none transition placeholder:text-[#8CA0A6] hover:border-[#B7D6D3] focus:border-[#0F9C98] focus:ring-4 focus:ring-[#0F9C98]/15 lg:h-[max(36px,calc(var(--u)*38))] lg:text-[max(12.5px,calc(var(--u)*14.5))]";
const iconCls = "pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#7E939B]";

function Field({ id, label, required, optional, error, className = "", children }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13.5px] font-medium text-[#33505A] lg:mb-[max(3px,calc(var(--u)*6))] lg:text-[max(12px,calc(var(--u)*14.5))]"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
        {optional && <span className="font-normal text-[#7E939B]"> (Optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-[13px] leading-tight text-[#D64545]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Custom dropdown (keyboard: Arrow keys, Enter, Esc). */
function ServiceSelect({ id, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const wrap = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  const openList = () => {
    setOpen(true);
    setHi(Math.max(0, services.indexOf(value)));
  };
  const choose = (s) => {
    onChange(s);
    setOpen(false);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) openList();
      else setHi((i) => Math.min(services.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) openList();
      else setHi((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) openList();
      else if (hi >= 0) choose(services[hi]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open && hi >= 0 ? `${id}-opt-${hi}` : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${inputBase} flex items-center text-left ${
          open ? "border-[#0F9C98] ring-4 ring-[#0F9C98]/15" : ""
        }`}
      >
        <ToothIcon className={iconCls} strokeWidth={1.6} />
        <span className={`truncate ${value ? "text-ink" : "text-[#8CA0A6]"}`}>{value || "Select a service"}</span>
        <ChevronDown
          className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5A63] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            aria-label="Services"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[270px] overflow-auto rounded-xl border border-[#D5E6E4] bg-white p-1.5 shadow-lg2"
          >
            {services.map((s, i) => (
              <li
                key={s}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={s === value}
                onMouseEnter={() => setHi(i)}
                onClick={() => choose(s)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-[13.5px] transition-colors ${
                  i === hi ? "bg-[#EAF6F5] text-[#0B3B3C]" : "text-[#3C5A63]"
                } ${s === value ? "font-semibold" : ""}`}
              >
                {s}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessView({ onReset }) {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex min-h-[320px] flex-col items-center justify-center py-8 text-center"
      role="status"
    >
      <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" aria-hidden="true">
        <motion.circle
          cx="32" cy="32" r="28" stroke="#0F9C98" strokeWidth="3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE }}
        />
        <motion.path
          d="M20 33l8 8 16-17" stroke="#0F9C98" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        />
      </svg>
      <h3 className="mt-5 font-display text-[28px] font-semibold text-teal-900">Thank you!</h3>
      <p className="mt-2 max-w-[320px] text-[15px] leading-relaxed text-[#5B7480]">
        We have received your request and will call you shortly to confirm your appointment.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-md2"
        >
          <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-11 items-center rounded-full border border-[#CFE3E2] px-5 text-[14px] font-semibold text-teal-900 transition hover:bg-mint"
        >
          New request
        </button>
      </div>
    </motion.div>
  );
}

const emptyValues = { name: "", phone: "", email: "", service: "", date: "", message: "", website: "" };

function BookingForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (k) => (e) => {
    const val = e?.target ? e.target.value : e;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const a11y = (k) => ({
    "aria-invalid": errors[k] ? "true" : undefined,
    "aria-describedby": errors[k] ? `c-${k}-err` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    if (values.website) {
      setStatus("done"); // honeypot: bots ko chup chaap "success" dikha do
      return;
    }
    setStatus("sending");
    try {
      await submitAppointment({
        name: values.name.trim(),
        phone: values.phone.replace(/[\s-]/g, ""),
        email: values.email.trim(),
        service: values.service,
        preferredDate: values.date,
        message: values.message.trim(),
        source: "contact-page",
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <SuccessView key="done" onReset={reset} />
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-5 grid gap-x-4 gap-y-3.5 sm:grid-cols-2 lg:mt-[max(10px,calc(var(--u)*18))] lg:gap-y-[max(6px,calc(var(--u)*12))]"
        >
          {/* honeypot */}
          <input
            type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={values.website} onChange={set("website")}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <Field id="c-name" label="Full Name" required error={errors.name}>
            <div className="relative">
              <User className={iconCls} aria-hidden="true" />
              <input id="c-name" type="text" autoComplete="name" placeholder="Enter your full name"
                value={values.name} onChange={set("name")} className={inputBase} {...a11y("name")} />
            </div>
          </Field>

          <Field id="c-phone" label="Phone" required error={errors.phone}>
            <div className="relative">
              <Phone className={iconCls} aria-hidden="true" />
              <input id="c-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 300 1234567"
                value={values.phone} onChange={set("phone")} className={inputBase} {...a11y("phone")} />
            </div>
          </Field>

          <Field id="c-email" label="Email" optional error={errors.email} className="sm:col-span-2">
            <div className="relative">
              <Mail className={iconCls} aria-hidden="true" />
              <input id="c-email" type="email" autoComplete="email" placeholder="you@example.com"
                value={values.email} onChange={set("email")} className={inputBase} {...a11y("email")} />
            </div>
          </Field>

          <Field id="c-service" label="Service" required error={errors.service}>
            <ServiceSelect id="c-service" value={values.service} onChange={set("service")} error={errors.service} />
          </Field>

          <Field id="c-date" label="Preferred Date" required error={errors.date}>
            <div className="relative">
              <Calendar className={iconCls} aria-hidden="true" />
              <input
                id="c-date" type="date" min={todayStr()} value={values.date} onChange={set("date")}
                onClick={(e) => {
                  try { e.currentTarget.showPicker?.(); } catch { /* ignore */ }
                }}
                className={`${inputBase} pr-10 ${values.date ? "" : "text-transparent"} [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0`}
                {...a11y("date")}
              />
              {!values.date && (
                <span className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-[14.5px] text-[#8CA0A6] lg:text-[max(12.5px,calc(var(--u)*14.5))]">
                  Select date
                </span>
              )}
              <CalendarDays className="pointer-events-none absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#3C5A63]" aria-hidden="true" />
            </div>
          </Field>

          <Field id="c-message" label="Message" optional className="sm:col-span-2">
            <textarea
              id="c-message" rows={3} placeholder="Tell us about your concern"
              value={values.message} onChange={set("message")}
              className="min-h-[84px] w-full resize-y rounded-xl border border-[#D5E6E4] bg-white px-3.5 py-3 text-[14.5px] text-ink outline-none transition placeholder:text-[#8CA0A6] hover:border-[#B7D6D3] focus:border-[#0F9C98] focus:ring-4 focus:ring-[#0F9C98]/15 lg:min-h-[max(48px,calc(var(--u)*62))] lg:text-[max(12.5px,calc(var(--u)*14.5))]"
            />
          </Field>

          <div className="sm:col-span-2">
            {status === "error" && (
              <p role="alert" className="mb-3 rounded-xl bg-[#FDECEC] px-4 py-2.5 text-[13.5px] leading-snug text-[#B23A3A]">
                Sorry, something went wrong. Please try again, or call us on{" "}
                <a href={PHONE_HREF} className="font-semibold underline">{PHONE_DISPLAY}</a>.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-accent-light to-accent text-[16px] font-bold text-white shadow-[0_10px_26px_rgba(245,130,32,.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(245,130,32,.5)] disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0 lg:h-[max(40px,calc(var(--u)*48))] lg:text-[max(13.5px,calc(var(--u)*17))]"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending...
                </>
              ) : (
                <>
                  Confirm Appointment
                  <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[13px] text-[#5B7480] lg:text-[max(11px,calc(var(--u)*13))]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" /> We will call you to confirm
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ---------- hero ---------- */
function ContactHero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(105deg,#0A5557_0%,#0B4A4D_40%,#0C3F42_100%)] pb-12 pt-8 md:pb-16 md:pt-10 lg:flex lg:min-h-[clamp(560px,calc(100svh_-_132px),920px)] lg:items-center lg:py-0 lg:[--u:min(1px,calc((100svh_-_132px)/790))]"
    >
      {/* Background photo: left side teal mein ghul jati hai */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-full opacity-40 [mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,#000_38%)] lg:w-[74%] lg:opacity-100">
          <motion.div
            className="h-full w-full"
            initial={reduce ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
          >
            <SmartImage src={contactImage} alt="" loading="eager" className="h-full w-full object-[70%_30%]" />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A5557]/85 via-[#0A5557]/45 to-transparent lg:from-[#0A5557]/70 lg:via-[#0A5557]/15" />
      </div>
      <DotPattern className="bottom-8 left-2 hidden h-28 w-28 opacity-60 lg:block" />

      <div className="relative mx-auto grid w-full max-w-[1680px] gap-9 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_clamp(400px,33.7vw,562px)] lg:items-center lg:gap-[max(24px,calc(var(--u)*50))] lg:px-10 lg:py-[max(18px,calc(var(--u)*32))]">
        {/* Left text */}
        <div className="text-white lg:max-w-[760px]">
          <Reveal className="flex items-center gap-4">
            <span className="h-0.5 w-12 rounded-full bg-accent lg:w-[max(30px,calc(var(--u)*43))]" />
            <span className="text-[12.5px] font-medium uppercase tracking-[0.16em] text-white/90 lg:text-[max(11px,calc(var(--u)*15))]">
              Muscat Dental Clinics (Multan)
            </span>
          </Reveal>

          <TextReveal
            as="h1"
            id="contact-title"
            lines={["Ready for a", "Healthier Smile?"]}
            className="mt-5 font-display text-[clamp(2.4rem,1.2rem_+_4.6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.01em] text-white lg:mt-[max(12px,calc(var(--u)*26))] lg:text-[max(40px,calc(var(--u)*88))]"
          />

          <Reveal
            delay={0.1}
            className="mt-5 max-w-[520px] text-[16px] leading-[1.65] text-white/90 md:text-[17.5px] lg:mt-[max(10px,calc(var(--u)*24))] lg:max-w-[max(360px,calc(var(--u)*560))] lg:text-[max(13.5px,calc(var(--u)*20))]"
          >
            <p>
              Expert dental care, modern technology and a gentle touch &mdash; because your smile matters. Book your
              appointment today and take the first step towards a healthier, more confident you.
            </p>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-[max(14px,calc(var(--u)*38))]"
          >
            <a
              href={PHONE_HREF}
              className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-accent-light to-accent px-7 text-[16px] font-bold text-white shadow-[0_10px_26px_rgba(245,130,32,.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(245,130,32,.5)] lg:h-[max(42px,calc(var(--u)*56))] lg:px-[max(20px,calc(var(--u)*30))] lg:text-[max(13.5px,calc(var(--u)*17))]"
            >
              <Phone className="h-[18px] w-[18px] fill-white" strokeWidth={1.8} aria-hidden="true" />
              Call Now
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full border-2 border-white/70 px-7 text-[16px] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 lg:h-[max(42px,calc(var(--u)*56))] lg:px-[max(20px,calc(var(--u)*30))] lg:text-[max(13.5px,calc(var(--u)*17))]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.3} className="mt-7 flex items-center gap-3 text-white/90 lg:mt-[max(12px,calc(var(--u)*40))]">
            <Clock className="h-9 w-9 text-white/70" strokeWidth={1.3} aria-hidden="true" />
            <p className="leading-tight">
              <span className="block text-[13.5px]">Clinic Timings</span>
              <span className="block text-[13.5px] tracking-wide">[ADD TIMINGS]</span>
            </p>
          </Reveal>
        </div>

        {/* Booking card */}
        <motion.div
          id="book"
          initial={reduce ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="relative scroll-mt-[150px] rounded-[28px] bg-white p-6 shadow-[0_30px_70px_rgba(4,40,42,.35)] md:p-8 lg:rounded-[max(20px,calc(var(--u)*28))] lg:p-[max(16px,calc(var(--u)*28))]"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#DDF2F0] text-[#0F9C98] lg:h-[max(40px,calc(var(--u)*66))] lg:w-[max(40px,calc(var(--u)*66))]">
              <CalendarCheck className="h-7 w-7 lg:h-[52%] lg:w-[52%]" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-[26px] font-semibold leading-tight text-teal-900 md:text-[30px] lg:text-[max(19px,calc(var(--u)*32))]">
                Book Your Appointment
              </h2>
              <p className="mt-1.5 text-[14px] leading-snug text-[#6A8794] lg:text-[max(11.5px,calc(var(--u)*15))]">
                Fill in the details below and we&rsquo;ll get back to you shortly to confirm your appointment.
              </p>
            </div>
          </div>
          <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- find us: info panel + map ---------- */
function InfoRow({ Icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/60">{title}</p>
        <div className="mt-1 text-[15.5px] leading-snug text-white">{children}</div>
      </div>
    </div>
  );
}

function FindUs() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      aria-labelledby="find-title"
      className="bg-[linear-gradient(180deg,#F4FAF9_0%,#FFFFFF_100%)] py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="text-center">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 rounded-full bg-accent/80" />
            <span className="inline-flex h-9 items-center rounded-full bg-mint-100 px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F8A87]">
              Find Us
            </span>
            <span className="h-0.5 w-10 rounded-full bg-accent/80" />
          </Reveal>
          <TextReveal
            id="find-title"
            lines={["Visit Our Clinic in Gulgasht"]}
            className="mt-4 font-display text-[clamp(1.9rem,1rem_+_2.6vw,3rem)] font-semibold leading-[1.12] text-teal-900"
          />
          <Reveal delay={0.1} className="mx-auto mt-3 max-w-[520px] text-[15.5px] leading-relaxed text-[#5B7480]">
            <p>Walk in or call ahead. We are happy to guide you to the clinic.</p>
          </Reveal>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 overflow-hidden rounded-[30px] bg-white shadow-[0_30px_70px_rgba(4,40,42,.18)] ring-1 ring-line/60 lg:grid lg:grid-cols-[0.82fr_1.18fr]"
        >
          {/* info panel */}
          <div className="relative overflow-hidden bg-[linear-gradient(160deg,#0A5557_0%,#0B4A4D_55%,#0C3F42_100%)] p-6 text-white md:p-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/5" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white/90 ring-1 ring-white/15">
                <MapPin className="h-3.5 w-3.5 text-accent-light" aria-hidden="true" /> Muscat Dental Clinics
              </span>

              <h3 className="mt-4 font-display text-[26px] font-semibold leading-tight md:text-[30px]">
                11B Shaheena Avenue North
              </h3>
              <p className="mt-1.5 text-[15px] leading-snug text-white/75">Gulgasht, Multan, Punjab 66000</p>

              <button
                type="button"
                onClick={copyAddress}
                className="mt-3 inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/85 underline-offset-4 transition hover:text-white hover:underline"
              >
                {copied ? <Check className="h-4 w-4 text-[#7FE3C8]" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? "Address copied" : "Copy address"}
              </button>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex h-[54px] w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-accent-light to-accent text-[16px] font-bold text-white shadow-[0_10px_26px_rgba(245,130,32,.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(245,130,32,.5)]"
              >
                <Navigation className="h-[18px] w-[18px]" aria-hidden="true" />
                Get Directions
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={PHONE_HREF}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/60 text-[15px] font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-teal-900 hover:shadow-md2"
                >
                  <Phone className="h-4 w-4 transition-colors duration-200 group-hover:fill-teal-900" aria-hidden="true" /> Call
                </a>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/60 text-[15px] font-semibold transition duration-200 hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_10px_26px_rgba(37,211,102,.45)]"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" /> WhatsApp
                </a>
              </div>

              <div className="my-7 h-px bg-white/15" />

              <div className="grid gap-5">
                <InfoRow Icon={Clock} title="Clinic Timings">
                  <p>[ADD TIMINGS]</p>
                </InfoRow>
                <InfoRow Icon={Phone} title="Phone">
                  <a href={PHONE_HREF} className="font-semibold hover:underline">{PHONE_DISPLAY}</a>
                </InfoRow>
                <InfoRow Icon={Mail} title="Email">
                  <a href={`mailto:${EMAIL}`} className="break-all hover:underline">{EMAIL}</a>
                </InfoRow>
              </div>
            </div>
          </div>

          {/* map */}
          <div className="relative min-h-[340px] overflow-hidden bg-mint lg:min-h-[560px]">
            <iframe
              title="Muscat Dental Clinics on Google Maps"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-x-0 -top-[150px] h-[calc(100%+150px)] w-full border-0"
            />

            {/* label + button, upar-left mein */}
            <div className="absolute left-4 top-4 flex flex-col items-start gap-2.5">
              <div className="pointer-events-none flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lg2 ring-1 ring-black/5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold text-teal-900">Muscat Dental Clinics</p>
                  <p className="truncate text-[13px] text-[#5B7480]">Shaheena Avenue North, Gulgasht</p>
                </div>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13.5px] font-bold text-teal-900 shadow-md2 transition hover:-translate-y-0.5"
              >
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" /> Open in Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        {/* tip strip */}
        <Reveal delay={0.1} className="mx-auto mt-6 max-w-[760px]">
          <p className="flex items-center justify-center gap-3 rounded-full bg-mint-100 px-5 py-3 text-center text-[14.5px] leading-snug text-[#0B3B3C]">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0F9C98] text-white">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            Look for our large <strong className="mx-1 font-semibold">Muscat Dental Clinics</strong> signboard above the entrance.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
/* ---------- clinic exterior photos ---------- */
const EXTERIOR_MAIN = {
  label: "Muscat Dental Clinics signboard and entrance",
  size: "100% 152%",
  pos: "0% 0%",
  ratio: "800 / 522",
};
const EXTERIOR_THUMBS = [
  { label: "Clinic signboards in the lane", size: "302% 301%", pos: "0% 100%", ratio: "1 / 1" },
  { label: "Clinic signboard from the street", size: "302% 301%", pos: "50% 100%", ratio: "1 / 1" },
  { label: "Clinic building and street view", size: "302% 301%", pos: "100% 100%", ratio: "1 / 1" },
];

function ExteriorPhoto({ view, className = "", onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${view.label}`}
      style={{ aspectRatio: view.ratio }}
      className={`group relative block w-full overflow-hidden ${className}`}
    >
      <span
        role="img"
        aria-label={view.label}
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${clinicExterior})`,
          backgroundSize: view.size,
          backgroundPosition: view.pos,
          backgroundRepeat: "no-repeat",
        }}
      />
      <span className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-teal-900 shadow-md2 transition lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
      </span>
    </button>
  );
}

function Lightbox({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Clinic exterior photos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#04282A]/85 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-teal-900 shadow-md2 transition hover:scale-105"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <img
        src={clinicExterior}
        alt="Muscat Dental Clinics building, signboards and street view"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-auto max-w-full rounded-2xl shadow-lg2"
      />
    </motion.div>
  );
}

function ClinicExterior() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const tips = [
    "Large Muscat Dental Clinics signboard above the entrance",
    "White building with a dark brown gate",
    "More signboards on the street corner and in the lane",
  ];

  return (
    <section aria-labelledby="exterior-title" className="bg-white py-14 md:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
        {/* text */}
        <div>
          <Reveal className="flex items-center gap-4">
            <span className="h-0.5 w-10 rounded-full bg-accent/80" />
            <span className="inline-flex h-9 items-center rounded-full bg-mint-100 px-5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F8A87]">
              Easy to Find
            </span>
          </Reveal>
          <TextReveal
            id="exterior-title"
            lines={["Spot Our Clinic", "Easily"]}
            className="mt-4 font-display text-[clamp(1.9rem,1rem_+_2.6vw,3rem)] font-semibold leading-[1.12] text-teal-900"
          />
          <Reveal delay={0.1} className="mt-4 max-w-[480px] text-[15.5px] leading-relaxed text-[#5B7480]">
            <p>
              We are at 11B Shaheena Avenue North, Gulgasht. These photos of our building will help you recognise
              the clinic as soon as you arrive.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-6 grid gap-3">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] leading-snug text-[#33505A]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F9C98]" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-accent-light to-accent px-7 text-[16px] font-bold text-white shadow-[0_10px_26px_rgba(245,130,32,.38)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(245,130,32,.5)]"
            >
              <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
              Get Directions
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* photos */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-[30px] bg-mint p-3 shadow-lg2 ring-4 ring-white md:p-4"
        >
          <div className="relative">
            <ExteriorPhoto view={EXTERIOR_MAIN} onOpen={() => setOpen(true)} className="rounded-[20px]" />
            <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[13px] font-semibold text-teal-900 shadow-md2 md:bottom-4 md:left-4">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" /> Gulgasht, Multan
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 md:mt-4 md:gap-4">
            {EXTERIOR_THUMBS.map((v) => (
              <ExteriorPhoto key={v.label} view={v} onOpen={() => setOpen(true)} className="rounded-2xl" />
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>{open && <Lightbox onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
export default function Contact() {
  useEffect(() => {
    document.title = "Contact & Book Appointment | Muscat Dental Clinics, Multan";
  }, []);

  return (
    
        <>
           <ContactHero />
           <FindUs />
           <ClinicExterior />
        </>
  );
}