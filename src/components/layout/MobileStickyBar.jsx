import { BookButton, CallButton } from "../ui/Button.jsx";

/** Buttons ki row (design board mein bhi use hoti hai). */
export function StickyBarButtons() {
  return (
    <div className="flex gap-3">
      <CallButton size="bar" />
      <BookButton size="bar" label="Book Now" />
    </div>
  );
}

/** Sirf 768px se neeche nazar aata hai. */
export default function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(11,59,60,.10)] backdrop-blur md:hidden">
      <StickyBarButtons />
    </div>
  );
}