/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        teal: { 900: "#0B3B3C", 800: "#0B4A4C", 500: "#14A3A0", 300: "#7FD1CE" },
        mint: { DEFAULT: "#E8F6F5", 100: "#D5EEEC" },
        warm: "#FAFCFC",
        accent: { DEFAULT: "#F58220", light: "#FF9440", dark: "#D96A0B" },
        ink: "#1B2B34",
        muted: "#6B7C85",
        line: "#E3EEEE",
        wa: "#25D366",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Fraunces", "serif"],
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm2: "0 2px 8px rgba(11,59,60,.06)",
        md2: "0 12px 32px rgba(11,59,60,.10)",
        lg2: "0 28px 64px rgba(11,59,60,.16)",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: ".55" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: { pulseRing: "pulseRing 2.2s ease-out infinite" },
    },
  },
  plugins: [],
};