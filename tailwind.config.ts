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
        kidsYellow: "#FFD93D",
        kidsBlue: "#6BCFFF",
        kidsGreen: "#6EE7B7",
        kidsPurple: "#C084FC",
        kidsOrange: "#FB923C",
        kidsPink: "#F472B6",
        kidsBg: "#FFF8F0",
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
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        pop: "pop 0.3s ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        kids: "0 6px 0 rgba(0,0,0,0.15)",
        "kids-hover": "0 8px 0 rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
