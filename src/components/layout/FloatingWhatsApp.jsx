import { site } from "../../data/siteConfig.js";
import { WhatsAppIcon } from "../ui/icons.jsx";

/** Green circle (design board mein bhi use hota hai). */
export function WhatsAppButton({ className = "" }) {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-[0_10px_26px_rgba(37,211,102,.45)] transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full bg-wa animate-pulseRing" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}

/** Fixed bottom-right. Phone par sticky bar ke upar rehta hai. */
export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <WhatsAppButton />
    </div>
  );
}