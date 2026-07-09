import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F2D2E",
        pine: "#294C4A",
        sage: "#DCE8ED",
        mint: "#EEF4F5",
        clay: "#B97962",
        coral: "#B97962",
        linen: "#F8FAF9",
        oat: "#DCE8ED",
        graphite: "#4B5C5D",
        steel: "#6F8FA0"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(31, 45, 46, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
