// Custom icons (khud banaye hue, 48x48 grid). Rang `currentColor` se aata hai,
// is liye hover par text-white karne se icon bhi white ho jata hai.
const base = (className) => ({
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className,
  "aria-hidden": "true",
});

const Dentist = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-3.507 -3.564) scale(1.1461)" strokeWidth="1.832">
      <path d="M17.5 16.5 V14 C17.5 9.2 20.4 6.6 24 6.6 S30.5 9.2 30.5 14 V16.5 C30.5 21.8 27.7 25 24 25 S17.5 21.8 17.5 16.5 Z" />
      <path d="M17.6 14.2 C21 14 23 12.4 24 10.2 C25 12.4 27 14 30.4 14.2" />
      <path d="M17.5 17.8 C16 17.7 16 20.9 17.6 20.8" />
      <path d="M30.5 17.8 C32 17.7 32 20.9 30.4 20.8" />
      <path d="M21.4 24.6 V28.2 M26.6 24.6 V28.2" />
      <path d="M7.5 41.5 V38 C7.5 33.4 11.4 30.2 16.6 29.2 L21.4 28.2 L24 33.4 L26.6 28.2 L31.4 29.2 C36.6 30.2 40.5 33.4 40.5 38 V41.5 Z" />
      <path d="M15.6 31.4 V37 a2.5 2.5 0 0 0 5 0" />
      <path d="M32.4 31.4 V37 a2.5 2.5 0 0 1 -5 0" />
    </g>
  </svg>
);

const Shield = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-0.870 -1.181) scale(1.0363)" strokeWidth="2.026">
      <path d="M24 5 L40.8 10.8 V22.4 C40.8 31.8 34.2 39.4 24 43.6 C13.8 39.4 7.2 31.8 7.2 22.4 V10.8 Z" />
      <path d="M24 14.8 V30.2 M16.4 22.5 H31.6" />
    </g>
  </svg>
);

const Comfort = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-6.837 -3.883) scale(1.2162)" strokeWidth="1.727">
      <path d="M9 9.4 C8.6 8.2 9.6 7 10.8 7.3 L15.2 8.4 C16.2 8.7 16.9 9.4 17.2 10.3 L23.4 27.6 L16.4 30 Z" />
      <path d="M30.6 12.2 a4.3 4.3 0 1 1 -8.6 0 a4.3 4.3 0 0 1 8.6 0 Z" />
      <path d="M22.6 19 L27.6 22.8 C28.6 23.5 29.6 23.9 30.8 23.9 H35 C37.2 23.9 39 25.4 39 27.5" />
      <path d="M23.4 27.6 L25.2 30 H38.4 C40.6 30 41.8 28.4 41.8 26.4" />
      <path d="M16.4 30 L14.6 38.6 M25.2 30 L26.6 38.6 M11.4 38.6 H29.8" />
    </g>
  </svg>
);

const Afford = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-1.053 -1.326) scale(1.1331)" strokeWidth="1.853">
      <path d="M31 12 a7.3 7.3 0 1 1 -14.6 0 a7.3 7.3 0 0 1 14.6 0 Z" />
      <path d="M23.7 6.6 V17.4" />
      <path d="M26.6 9.6 C26 8.2 21.1 8 21.1 10.5 C21.1 13.2 26.6 11.8 26.6 14.5 C26.6 16.8 21.7 16.6 21 15" />
      <path d="M4.6 28.6 L10.8 27.4 L12.8 37.6 L6.6 38.8 Z" />
      <path d="M12 30.2 L17.4 28.9 C19.4 28.4 21.4 29.2 22.8 30.6 H29.6 C31.6 30.6 32.4 33 30.6 33.8 L22.4 33.8" />
      <path d="M12.6 37.4 L17.6 39.4 C19.6 40.2 21.8 40.2 23.8 39.4 L38.4 32.6 C40.4 31.6 39.8 29 37.6 29.4 L30.6 31" />
    </g>
  </svg>
);

const Tech = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-4.072 -2.882) scale(1.1180)" strokeWidth="1.878">
      <path d="M21.60 13.64C19.20 13.64 15.84 10.47 12.00 10.86C8.16 11.43 6.53 15.66 7.49 21.03C8.45 26.41 9.50 29.96 10.66 35.43C11.42 39.08 12.58 42.34 14.88 41.58C17.38 40.71 18.14 36.01 19.10 32.55C19.87 30.06 20.54 29.10 21.60 29.10C22.66 29.10 23.33 30.06 24.10 32.55C25.06 36.01 25.82 40.71 28.32 41.58C30.62 42.34 31.78 39.08 32.54 35.43C33.70 29.96 34.75 26.41 35.71 21.03C36.67 15.66 35.04 11.43 31.20 10.86C27.36 10.47 24.00 13.64 21.60 13.64Z" />
      <path d="M37.4 6.4 C37.8 10.4 38.8 11.8 43 12.2 C38.8 12.6 37.8 14 37.4 18 C37 14 36 12.6 31.8 12.2 C36 11.8 37 10.4 37.4 6.4 Z" />
    </g>
  </svg>
);

const Family = ({ className }) => (
  <svg {...base(className)}>
    <g transform="translate(-1.208 -4.335) scale(1.0417)" strokeWidth="2.016">
      <path d="M40.2 16.8 a7.4 7.4 0 1 1 -14.8 0 a7.4 7.4 0 0 1 14.8 0 Z" />
      <path d="M25.7 15 C29.6 14.8 32.2 12.6 33 10 C34.2 12.8 37 14.6 39.9 15" />
      <path d="M29.9 17.8 h.01 M35.7 17.8 h.01" />
      <path d="M30.1 21.2 C31.7 22.6 33.9 22.6 35.5 21.2" />
      <path d="M26.2 44 C26.2 33.6 29.2 27.8 32.8 27.8 S43.4 33.6 43.4 44" />
      <path d="M22 31 a6.8 6.8 0 1 1 -13.6 0 a6.8 6.8 0 0 1 13.6 0 Z" />
      <path d="M8.9 29.6 C12 29.4 13.8 27.6 14.4 25.6 C15.4 27.8 17.8 29.2 21.7 29.4" />
      <path d="M12.2 32.4 h.01 M18.2 32.4 h.01" />
      <path d="M12.6 35.2 C13.9 36.5 16.5 36.5 17.8 35.2" />
      <path d="M5 45 C5 41.4 8 39.8 11.4 39.4 M19 39.4 C22.4 39.8 24.8 41.4 24.8 45" />
    </g>
  </svg>
);

export const whyIcons = {
  dentist: Dentist,
  shield: Shield,
  comfort: Comfort,
  afford: Afford,
  tech: Tech,
  family: Family,
};