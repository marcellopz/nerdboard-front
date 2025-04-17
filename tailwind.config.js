/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3BA57C",
        secondary: "#5D6E7B",
        accent: "#2B8C6D",
        background: "#F9FCFD",
        paper: "#FFFFFF",
        textMain: "#1F2D3D",
        textSecondary: "#5D6E7B",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.08)",
        md: "0 3px 6px rgba(0,0,0,0.1)",
        lg: "0 6px 12px rgba(0,0,0,0.12)",
        xl: "0 4px 8px rgba(0,0,0,0.15)",
        focus: "0 0 0 4px rgba(59, 165, 124, 0.25)",
      },
      spacing: {
        18: "4.5rem", // Para espaçamento entre seções
      },
      fontSize: {
        h1: "2rem", // 32px
        h2: "1.5rem", // 24px
        base: "1rem", // 16px
        sm: "0.875rem", // 14px
      },
    },
  },
  plugins: [],
};
