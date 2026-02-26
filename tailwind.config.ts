import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sanfte Pastellfarben – warm, einladend, nicht grell
        kidsYellow: "#FFD166",
        kidsBlue: "#74C2E1",
        kidsGreen: "#6BC5A0",
        kidsPurple: "#A78BFA",
        kidsOrange: "#F4956A",
        kidsPink: "#F48FB1",
        kidsBg: "#F7F3FF",       // zartes Lavendel als Basis
        kidsBg2: "#EEF6FF",
        kidsCard: "#FFFFFF",
      },
      fontFamily: {
        kids: ["var(--font-nunito)", "Comic Sans MS", "sans-serif"],
      },
      fontSize: {
        "kids-sm": ["1.125rem", { lineHeight: "1.6" }],
        "kids-md": ["1.375rem", { lineHeight: "1.6" }],
        "kids-lg": ["1.75rem", { lineHeight: "1.4" }],
        "kids-xl": ["2.25rem", { lineHeight: "1.2" }],
      },
      borderRadius: {
        kids: "1.5rem",
        "kids-lg": "2rem",
        "kids-xl": "2.5rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
        "blob-move": {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%" },
          "25%": { borderRadius: "40% 60% 45% 55% / 55% 45% 55% 45%" },
          "50%": { borderRadius: "50% 50% 60% 40% / 40% 60% 40% 60%" },
          "75%": { borderRadius: "45% 55% 40% 60% / 60% 40% 60% 40%" },
        },
        "jelly": {
          "0%, 100%": { transform: "scale(1, 1)" },
          "25%": { transform: "scale(0.95, 1.05)" },
          "50%": { transform: "scale(1.05, 0.95)" },
          "75%": { transform: "scale(0.97, 1.03)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wobble: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "25%": { transform: "rotate(-5deg) scale(1.05)" },
          "75%": { transform: "rotate(5deg) scale(1.05)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.5", transform: "scale(0.7) rotate(180deg)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.6)" },
        },
        "heart-beat": {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.2)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
        "rainbow-border": {
          "0%": { borderColor: "#A78BFA" },
          "25%": { borderColor: "#74C2E1" },
          "50%": { borderColor: "#6BC5A0" },
          "75%": { borderColor: "#FFD166" },
          "100%": { borderColor: "#A78BFA" },
        },
      },
      animation: {
        wiggle: "wiggle 0.6s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        pop: "pop 0.3s ease-in-out",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float 5s ease-in-out infinite",
        wobble: "wobble 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        twinkle: "twinkle 2.5s ease-in-out infinite",
        "heart-beat": "heart-beat 1.5s ease-in-out infinite",
        "rainbow-border": "rainbow-border 4s linear infinite",
        "blob-move": "blob-move 8s ease-in-out infinite",
        "jelly": "jelly 0.5s ease-in-out",
      },
      boxShadow: {
        kids: "0 5px 0 rgba(0,0,0,0.08)",
        "kids-hover": "0 9px 0 rgba(0,0,0,0.10)",
        "kids-card": "0 4px 20px rgba(167,139,250,0.12), 0 2px 6px rgba(0,0,0,0.05)",
        "kids-card-hover": "0 8px 30px rgba(167,139,250,0.22), 0 4px 12px rgba(0,0,0,0.07)",
        "kids-glow-purple": "0 0 20px rgba(167,139,250,0.4)",
        "kids-glow-blue": "0 0 20px rgba(116,194,225,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
