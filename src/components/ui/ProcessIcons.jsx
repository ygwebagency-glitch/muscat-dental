// Custom icons (khud banaye hue, 48x48 grid). Rang `currentColor` se aata hai.
const base = (className) => ({
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  "aria-hidden": "true",
});

const CalendarSmile = ({ className }) => (
  <svg {...base(className)}>
    <rect x="6" y="9" width="36" height="33" rx="6" />
    <path d="M16 5v8M32 5v8M6 19h36" />
    <path d="M18 27v.01M30 27v.01" />
    <path d="M17.5 32.5c3.8 4 9.2 4 13 0" />
  </svg>
);

const Doctor = ({ className }) => (
  <svg {...base(className)}>
    <path d="M15 15c0-6 3.4-9 9-9s9 3 9 9" />
    <path d="M13 15h22" />
    <path d="M16.5 15v6c0 5.5 3.3 9 7.5 9s7.5-3.5 7.5-9v-6" />
    <path d="M16.5 22.5c3.5 2.6 11.5 2.6 15 0v3.5c0 3-3.3 5-7.5 5s-7.5-2-7.5-5z" />
    <path d="M8 42v-3c0-4.5 3.6-7 8.4-8M31.6 31c4.8 1 8.4 3.5 8.4 8v3" />
    <path d="M20 32l4 5 4-5" />
    <path d="M8 42h32" />
  </svg>
);

const Tooth = ({ className }) => (
  <svg {...base(className)}>
    <g transform="scale(2)" strokeWidth="1.2">
      <path d="M7 3.5c1.6-.9 3.2-.2 5 .6 1.8-.8 3.4-1.5 5-.6 2.3 1.3 2.3 4.4 1.4 7.2-.6 1.9-.7 4.3-1.3 6.2-.4 1.3-1.2 2.2-2.3 2.2-1.4 0-1.6-1.4-1.9-3.1-.2-1.3-.6-2.2-.9-2.2s-.7.9-.9 2.2c-.3 1.7-.5 3.1-1.9 3.1-1.1 0-1.9-.9-2.3-2.2-.6-1.9-.7-4.3-1.3-6.2C4.7 7.9 4.7 4.8 7 3.5Z" />
    </g>
  </svg>
);

const Smile = ({ className }) => (
  <svg {...base(className)}>
    <circle cx="24" cy="24" r="18" />
    <path d="M16 21c1.2-2.4 3.6-2.4 4.8 0M27.2 21c1.2-2.4 3.6-2.4 4.8 0" />
    <path d="M15.5 28c2.2 5.4 14.8 5.4 17 0" />
  </svg>
);

export const processIcons = {
  calendar: CalendarSmile,
  doctor: Doctor,
  tooth: Tooth,
  smile: Smile,
};