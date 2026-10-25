// FAQ section ke icons (khud banaye hue). Rang `currentColor` se aata hai.

/** WhatsApp: bubble ki ring + andar phone handset. */
export function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeWidth="2.9"
        d="M9.6 39 L12.2 31.4 C10.8 29.1 10 26.5 10 23.6 C10 15.5 16.5 9 24.4 9 C32.3 9 38.8 15.5 38.8 23.5 C38.8 31.5 32.3 38 24.4 38 C21.6 38 19 37.2 16.8 35.8 Z"
      />
      <path
        fill="currentColor"
        strokeWidth="1"
        d="M20.4 17 C19.2 17 17.8 18.1 17.8 19.7 C17.8 25.7 22.7 30.6 28.7 30.6 C30.3 30.6 31.4 29.2 31.4 28 L31.2 27 L27.9 25.2 L26.4 26.6 C24.5 25.8 22.8 24.1 22 22.2 L23.4 20.7 L21.6 17.4 Z"
      />
    </svg>
  );
}

/** Plus jo khulne par minus ban jata hai (CSS `.faq-card[data-open]` se animate hota hai). */
export function PlusMinus() {
  return (
    <svg viewBox="0 0 16 16" className="faq-pm" aria-hidden="true">
      <path d="M3 8h10" />
      <path className="faq-pm-v" d="M8 3v10" />
    </svg>
  );
}
