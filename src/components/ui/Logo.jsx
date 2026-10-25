import { Link } from "react-router-dom";

const sizes = {
  md: {
    word: "text-[34px]",
    sub: "text-[12px] tracking-[0.36em]",
  },
  sm: {
    word: "text-[24px]",
    sub: "text-[9px] tracking-[0.34em]",
  },
};

export default function Logo({
  size = "md",
  light = false,
  asLink = true,
}) {
  const z = sizes[size];

  const inner = (
    <span className="flex flex-col">
      <span
        className={`font-extrabold leading-none tracking-[0.05em] ${z.word} ${
          light ? "text-white" : "text-teal-800"
        }`}
      >
        MUSCAT
      </span>

      <span
        className={`mt-1 font-semibold leading-none ${z.sub} ${
          light ? "text-teal-300" : "text-teal-500"
        }`}
      >
        DENTAL CLINICS
      </span>
    </span>
  );

  return asLink ? (
    <Link
      to="/"
      aria-label="Muscat Dental Clinics - Home"
      className="inline-flex"
    >
      {inner}
    </Link>
  ) : (
    inner
  );
}