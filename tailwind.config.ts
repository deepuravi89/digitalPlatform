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
          950: "#4a1030",
          900: "#5c143a",
          800: "#701846",
          700: "#842153",
          600: "#993061"
        },
        oat: {
          50: "#fbf3e6",
          100: "#f5ead8",
          200: "#eddcc2",
          300: "#e2c8a5",
          400: "#d2ad82",
          500: "#bf915f"
        },
        coral: {
          400: "#8a1f4c",
          500: "#731942",
          600: "#621438"
        },
        lime: {
          400: "#d8b86f",
          500: "#c79f4f"
        },
        rose: {
          50: "#f6e6ec",
          100: "#ecd0db",
          200: "#d9a8be",
          300: "#c37a9a",
          400: "#a95377",
          500: "#8b3d60"
        },
        blush: {
          50: "#f9eee7",
          100: "#f1ddd1",
          200: "#e6c2ad",
          300: "#d3a183",
          400: "#bd7f5e",
          500: "#a86748"
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
