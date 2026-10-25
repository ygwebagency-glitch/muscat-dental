import { useEffect, useRef, useState } from "react";

function ToothGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[38%] w-[38%] max-h-12 max-w-12 text-teal-500/40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3.5c1.6-.9 3.2-.2 5 .6 1.8-.8 3.4-1.5 5-.6 2.3 1.3 2.3 4.4 1.4 7.2-.6 1.9-.7 4.3-1.3 6.2-.4 1.3-1.2 2.2-2.3 2.2-1.4 0-1.6-1.4-1.9-3.1-.2-1.3-.6-2.2-.9-2.2s-.7.9-.9 2.2c-.3 1.7-.5 3.1-1.9 3.1-1.1 0-1.9-.9-2.3-2.2-.6-1.9-.7-4.3-1.3-6.2C4.7 7.9 4.7 4.8 7 3.5Z" />
    </svg>
  );
}

/**
 * <img> jo:
 *  - load hone tak chhupi rehti hai aur load hote hi 0.7s mein halka fade-in karti hai
 *    (cache se foran aa jane wali image bina animation ke seedha dikhti hai)
 *  - file na milne par soft placeholder tile dikhati hai
 * Fade Web Animations API se chalta hai, is liye className ki transition/hover-zoom se takrata nahi.
 */
export default function SmartImage({ src, alt = "", className = "", style, onLoad, ...rest }) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setFailed(!src);
    const el = ref.current;
    setLoaded(Boolean(el && el.complete && el.naturalWidth > 0));
  }, [src]);

  const handleLoad = (e) => {
    if (!loaded) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && e.currentTarget.animate) {
        e.currentTarget.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 700,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        });
      }
      setLoaded(true);
    }
    if (onLoad) onLoad(e);
  };

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-mint via-white to-mint-100 ${className}`}
      >
        <ToothGlyph />
      </div>
    );
  }
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={() => setFailed(true)}
      style={loaded ? style : { ...style, opacity: 0 }}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}