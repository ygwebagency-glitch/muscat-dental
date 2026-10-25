const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const TOOTH =
  "M7 3.5c1.6-.9 3.2-.2 5 .6 1.8-.8 3.4-1.5 5-.6 2.3 1.3 2.3 4.4 1.4 7.2-.6 1.9-.7 4.3-1.3 6.2-.4 1.3-1.2 2.2-2.3 2.2-1.4 0-1.6-1.4-1.9-3.1-.2-1.3-.6-2.2-.9-2.2s-.7.9-.9 2.2c-.3 1.7-.5 3.1-1.9 3.1-1.1 0-1.9-.9-2.3-2.2-.6-1.9-.7-4.3-1.3-6.2C4.7 7.9 4.7 4.8 7 3.5Z";

const General = () => (
  <svg {...base}>
    <path d={TOOTH} />
  </svg>
);

const Cosmetic = () => (
  <svg {...base}>
    <g transform="translate(-1.5 2.5) scale(.82)">
      <path d={TOOTH} />
    </g>
    <path d="M19 2.5v4M17 4.5h4" />
    <path d="M21 10v2M20 11h2" />
  </svg>
);

const Scaling = () => (
  <svg {...base}>
    <g transform="translate(-2 1) scale(.86)">
      <path d={TOOTH} />
    </g>
    <circle cx="19" cy="6" r=".7" />
    <circle cx="21" cy="9" r=".7" />
    <circle cx="18.6" cy="11.2" r=".7" />
  </svg>
);

const Implant = () => (
  <svg {...base}>
    <path d="M7 3.2c1.5-.8 3-.1 5 .5 2-.6 3.5-1.3 5-.5 1.9 1.1 1.7 3.5 1 5.3-.2.5-.3 1-.4 1.5H6.4c-.1-.5-.2-1-.4-1.5-.7-1.8-.9-4.2 1-5.3Z" />
    <path d="M9.5 10v1.5h5V10" />
    <path d="M9.8 12l.9 8.5h2.6l.9-8.5" />
    <path d="M9.9 14h4.2M10.1 16h3.8M10.4 18h3.2" />
  </svg>
);

const RootCanal = () => (
  <svg {...base}>
    <path d={TOOTH} />
    <path d="M10 8.5v7M14 8.5v7" />
  </svg>
);

const Pediatric = () => (
  <svg {...base}>
    <circle cx="12" cy="12.5" r="8" />
    <path d="M9 11v.5M15 11v.5" />
    <path d="M8.8 14.6c.9 1.2 2 1.8 3.2 1.8s2.3-.6 3.2-1.8" />
    <path d="M12 4.5c-.2-1.2.6-2 1.6-2" />
  </svg>
);

const Braces = () => (
  <svg {...base}>
    <path d="M3.5 8.5c0-1.2.9-2.2 2.2-2.2h12.6c1.3 0 2.2 1 2.2 2.2v6c0 1.2-.9 2.2-2.2 2.2H5.7c-1.3 0-2.2-1-2.2-2.2z" />
    <path d="M3.5 11.5h17" />
    <rect x="5.5" y="10" width="3" height="3" rx=".6" />
    <rect x="10.5" y="10" width="3" height="3" rx=".6" />
    <rect x="15.5" y="10" width="3" height="3" rx=".6" />
  </svg>
);

const Crown = () => (
  <svg {...base}>
    <g transform="translate(0 4) scale(.5)">
      <path d={TOOTH} />
    </g>
    <g transform="translate(12 4) scale(.5)">
      <path d={TOOTH} />
    </g>
    <path d="M4 6.5h16" />
  </svg>
);

const Extraction = () => (
  <svg {...base}>
    <g transform="translate(-1.5 0) scale(.9)">
      <path d={TOOTH} />
    </g>
    <path d="M20 15V6M17.5 8.5L20 6l2.5 2.5" />
  </svg>
);

export const serviceIcons = {
  "general-dentistry": General,
  "cosmetic-dentistry": Cosmetic,
  "scaling-polishing": Scaling,
  "dental-implants": Implant,
  "root-canal-treatment": RootCanal,
  "pediatric-dentistry": Pediatric,
  "orthodontics-braces": Braces,
  "crowns-bridges": Crown,
  "tooth-extraction": Extraction,
};