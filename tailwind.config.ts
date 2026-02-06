import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0f14",
          900: "#111821",
          800: "#1b2430",
          700: "#2a3646",
          600: "#3a4b60"
        },
        oat: {
          50: "#faf7f2",
          100: "#f4efe6",
          200: "#e9e0d0",
          300: "#dccbb2",
          400: "#ccb28e",
          500: "#b4946a"
        },
        coral: {
          400: "#ff8b6a",
          500: "#ff6f42",
          600: "#f25c2a"
        },
        lime: {
          400: "#b8f06a",
          500: "#99e24a"
        }
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "ui-sans-serif", "system-ui"],
        body: ["\"Instrument Sans\"", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        "soft-xl": "0 20px 60px -30px rgba(15, 23, 42, 0.45)",
        "soft-lg": "0 14px 40px -22px rgba(15, 23, 42, 0.4)",
        "soft": "0 10px 30px -20px rgba(15, 23, 42, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
