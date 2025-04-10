/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        splash: ["Splash", "sans-serif"],
      },
      colors: {
        primary: "#7B4EEE",
      },
    },
  },
  plugins: [],
};
