import { useScroll } from "../../hooks/useScroll.js";

/** Orange progress line. Design board mein value + inline pass karte hain. */
export default function ScrollProgress({ value, inline = false, className = "" }) {
  const { progress } = useScroll();
  const v = value ?? progress;
  return (
    <div
      aria-hidden="true"
      className={`${inline ? "absolute" : "fixed"} left-0 top-0 z-[60] h-[3px] w-full ${className}`}
    >
      <div
        className="h-full origin-left rounded-r-full bg-accent"
        style={{ transform: `scaleX(${v})` }}
      />
    </div>
  );
}