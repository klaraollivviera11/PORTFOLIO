module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./next.config.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        dark: {
          bg: "#000000",
          container: "#1e1e1e",
        },
        light: {
          bg: "#ffffff",
          container: "#ececec",
        },
        accent: "#84a9ff",
        accentSoft: "#f5f8ff",
        gradient: {
          cool: "#84a9ff",
          blue: "#38476b",
          warm: "#b6192e",
          glow: "#ffc1ac",
        },
      },
      keyframes: {
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        spinSlow: "spinSlow 25s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
