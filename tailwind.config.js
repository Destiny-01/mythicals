/** @type {import('tailwindcss').Config} */

module.exports = {
  // content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      bg: "#141625",
      white: "#ffffff",
      grey: "#C3C3C3",
      main: "#AB7F39",
      gradient: "#906C31",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "6rem",
      },
    },
    fontFamily: {
      display: ["Lora", "sans-serif"],
      body: ["Open Sans", "serif"],
    },
    extend: {
      backgroundImage: {
        "bg-hero": "url('./src/assets/Logo.svg')",
      },
    },
  },
};
