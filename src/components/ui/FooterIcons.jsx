// Footer ke icons (khud banaye hue, 24x24 grid). Rang `currentColor` se aata hai.
const line = (className, extra = {}) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  "aria-hidden": "true",
  ...extra,
});

const TOOTH =
  "M12 6.2C10.6 4.6 8.9 3.5 7.2 3.5 4.7 3.5 3.6 5.6 3.6 8 3.6 11 5.2 13.2 5.9 16.2 6.4 18.4 6.7 20.5 8.2 20.5 9.8 20.5 9.9 17 10.4 15.6 10.7 14.8 11.3 14.2 12 14.2 12.7 14.2 13.3 14.8 13.6 15.6 14.1 17 14.2 20.5 15.8 20.5 17.3 20.5 17.6 18.4 18.1 16.2 18.8 13.2 20.4 11 20.4 8 20.4 5.6 19.3 3.5 16.8 3.5 15.1 3.5 13.4 4.6 12 6.2Z";

/* ---------- Services ---------- */
export const ServiceIcons = {
  general: ({ className }) => (
    <svg {...line(className)}>
      <path d={TOOTH} />
    </svg>
  ),
  cosmetic: ({ className }) => (
    <svg {...line(className)}>
      <path d="M12 3C12.6 8.4 15.6 11.4 21 12 15.6 12.6 12.6 15.6 12 21 11.4 15.6 8.4 12.6 3 12 8.4 11.4 11.4 8.4 12 3Z" />
    </svg>
  ),
  scaling: ({ className }) => (
    <svg {...line(className)}>
      <path d={TOOTH} />
      <path d="M7.6 8.2C8 7.3 8.8 6.8 9.7 6.9" />
    </svg>
  ),
  implants: ({ className }) => (
    <svg {...line(className)}>
      <path d="M6.8 3.5h10.4c0 4.2-1.2 6.2-2.8 6.8H9.6C8 9.7 6.8 7.7 6.8 3.5Z" />
      <path d="M9.4 12.4h5.2M9.9 15h4.2M10.5 17.6h3M11 20.2h2" />
    </svg>
  ),
  rootcanal: ({ className }) => (
    <svg {...line(className)}>
      <path d={TOOTH} />
      <path d="M10 9.2v4.4M14 9.2v4.4" />
    </svg>
  ),
  pediatric: ({ className }) => (
    <svg {...line(className)}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M9 10.2h.01M15 10.2h.01" strokeWidth="2.2" />
      <path d="M8.6 14c.9 1.6 2.1 2.3 3.4 2.3s2.5-.7 3.4-2.3" />
    </svg>
  ),
  braces: ({ className }) => (
    <svg {...line(className)}>
      <rect x="2.8" y="8" width="18.4" height="8" rx="4" />
      <path d="M3.6 12h16.8" />
      <rect x="6.2" y="10.6" width="2.8" height="2.8" rx=".6" />
      <rect x="10.6" y="10.6" width="2.8" height="2.8" rx=".6" />
      <rect x="15" y="10.6" width="2.8" height="2.8" rx=".6" />
    </svg>
  ),
  crown: ({ className }) => (
    <svg {...line(className)}>
      <path d="M4.6 17.4 3.4 7.8l5 3.8L12 5.6l3.6 6 5-3.8-1.2 9.6Z" />
      <path d="M4.6 20.4h14.8" />
    </svg>
  ),
  extraction: ({ className }) => (
    <svg {...line(className)}>
      <path d={TOOTH} />
      <path d="M9.4 9.6h5.2" />
    </svg>
  ),
};

/* ---------- Social ---------- */
export const Facebook = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6V21h3Z" />
  </svg>
);
export const Instagram = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.7 })}>
    <rect x="4" y="4" width="16" height="16" rx="4.6" />
    <circle cx="12" cy="12" r="3.7" />
    <path d="M16.9 7.2h.01" strokeWidth="2.2" />
  </svg>
);
export const TikTok = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M14.8 3.5h2.7c.2 2 1.4 3.4 3.4 3.6v2.7c-1.3 0-2.5-.4-3.4-1.1v5.6c0 3.1-2.4 5.2-5.3 5.2s-5-2-5-4.8c0-3.1 2.7-5.2 5.8-4.7v2.8c-1.4-.4-3 .4-3 1.9 0 1.1.9 2 2.1 2 1.3 0 2.1-.9 2.1-2.4V3.5Z" />
  </svg>
);

/* ---------- Contact ---------- */
export const Pin = ({ className }) => (
  <svg {...line(className)}>
    <path d="M12 21.2s6.6-5.6 6.6-11.2a6.6 6.6 0 1 0-13.2 0c0 5.6 6.6 11.2 6.6 11.2Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);
export const Phone = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M6.5 3.4h2.7c.4 0 .8.3.9.7l.9 2.8c.1.4 0 .8-.3 1.1L9.3 9.1c1 2 2.6 3.7 4.7 4.7l1.2-1.4c.3-.3.7-.4 1.1-.3l2.8.9c.4.1.7.5.7.9v2.7c0 1.1-.9 2-2 2C10.6 18.7 5.3 13.4 4.5 5.4c-.1-1.1.8-2 2-2Z" />
  </svg>
);
export const Mail = ({ className }) => (
  <svg {...line(className)}>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="m3.6 7.4 8.4 6.2 8.4-6.2" />
  </svg>
);
export const Clock = ({ className }) => (
  <svg {...line(className)}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

/* ---------- UI ---------- */
export const Chevron = ({ className }) => (
  <svg {...line(className, { strokeWidth: 2.2 })}>
    <path d="m9.5 6 6 6-6 6" />
  </svg>
);
export const Arrow = ({ className }) => (
  <svg {...line(className, { strokeWidth: 2 })}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" />
  </svg>
);
export const ArrowUp = ({ className }) => (
  <svg {...line(className, { strokeWidth: 2.2 })}>
    <path d="M12 19.5v-15M6 10.5l6-6 6 6" />
  </svg>
);
export const Calendar = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.7 })}>
    <rect x="3.6" y="5.2" width="16.8" height="15.2" rx="3" />
    <path d="M3.6 10h16.8M8.2 3.2v4M15.8 3.2v4" />
    <path d="M8.4 14h.01M12 14h.01M15.6 14h.01M8.4 17.2h.01M12 17.2h.01" strokeWidth="2.1" />
  </svg>
);
export const Directions = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.7 })}>
    <path d="m3.4 6.6 5.5-2.2 6.2 2.2 5.5-2.2v13l-5.5 2.2-6.2-2.2-5.5 2.2Z" />
    <path d="M8.9 4.4v13M15.1 6.6v13" />
  </svg>
);

/* ---------- CTA band ---------- */
export const ShieldCheck = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.5 })}>
    <path d="M12 3 19.4 5.6v5.5c0 4.5-3 8.2-7.4 10-4.4-1.8-7.4-5.5-7.4-10V5.6Z" />
    <path d="m8.6 11.8 2.5 2.5 4.4-4.6" />
  </svg>
);
export const Person = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.5 })}>
    <circle cx="12" cy="7.6" r="3.9" />
    <path d="M4.6 20.6c0-4 3.3-6.4 7.4-6.4s7.4 2.4 7.4 6.4" />
    <path d="M12 14.2v2.2" />
  </svg>
);
export const Heart = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.5 })}>
    <path d="M12 20.4C5.4 15.6 3 12.6 3 8.9 3 6.2 5 4.3 7.5 4.3c1.8 0 3.4 1 4.5 2.7 1.1-1.7 2.7-2.7 4.5-2.7C19 4.3 21 6.2 21 8.9c0 3.7-2.4 6.7-9 11.5Z" />
  </svg>
);
export const Smile = ({ className }) => (
  <svg {...line(className, { strokeWidth: 1.5 })}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10.2h.01M15 10.2h.01" strokeWidth="2.2" />
    <path d="M8.2 14.2c1 1.9 2.3 2.8 3.8 2.8s2.8-.9 3.8-2.8" />
  </svg>
);
