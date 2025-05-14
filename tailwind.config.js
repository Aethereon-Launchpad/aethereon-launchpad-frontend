/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ["Space Grotesk", "sans-serif"],
        splash: ["Splash", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        primary: "#6c5ce7", // Rich deep purple
        secondary: "#4B0082", // Darker rich purple
        cosmic: "#3498db", // Bright celestial blue
        deepspace: "#2c3e50", // Deeper darker blue
        softpurple: "#9575cd", // Soft pastel purple-blue
        skyblue: "#87ceeb", // Light airy blue
        silver: "#B1B1B1", // Light neutral silver
      },
      backgroundImage: {
        "space-gradient": "linear-gradient(to right, #6c5ce7, #3498db)",
        "cosmic-gradient": "linear-gradient(to bottom, #2c3e50, #4B0082)",
        "nebula-gradient": "linear-gradient(135deg, #6c5ce7, #9575cd, #3498db)",
      },
    },
  },
  plugins: [],
};
