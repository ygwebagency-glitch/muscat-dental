export default function DotPattern({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute opacity-40 ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, #14A3A0 1.3px, transparent 1.6px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}