/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        surface: "#050806",
        panel: "#090d0b",
        primary: {
          DEFAULT: "#10B981",
          hover: "#34D399",
          glow: "#00E676",
          dark: "#047857",
        },
        accent: "#059669",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#F43F5E",
        ink: "#F9FAFB",
        muted: "#9CA3AF",
        line: "#142a20",
      },
      boxShadow: {
        'amoled-glow': '0 0 30px -5px rgba(16, 185, 129, 0.25)',
        'emerald-card': '0 16px 48px rgba(0, 0, 0, 0.95), 0 0 20px rgba(16, 185, 129, 0.07)',
      }
    },
  },
  plugins: [],
};

