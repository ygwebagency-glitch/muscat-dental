import { Clock, MapPin, Phone } from "lucide-react";
import { site } from "../../data/siteConfig.js";
import { WhatsAppIcon } from "../ui/icons.jsx";

/** Slim utility bar. Sirf desktop (1024px+), `force` sirf design board ke liye. */
export default function TopBar({ force = false }) {
  return (
    <div className={`${force ? "block" : "hidden lg:block"} bg-teal-800 text-white`}>
      <div className="mx-auto flex h-11 max-w-[1240px] items-center justify-between px-8 text-[13px] font-medium">
        <div className="flex items-center gap-8">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {site.location}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {site.timings}
          </span>
        </div>
        <div className="flex items-center gap-7">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-teal-300">
            <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-teal-300"
          >
            <WhatsAppIcon className="h-[17px] w-[17px]" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}