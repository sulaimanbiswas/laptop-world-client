/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        laptopWorld: {
          primary: "#f254a0",
          secondary: "#67b21c",
          accent: "#f9bffc",
          neutral: "#1C1E26",
          "base-100": "#ffffff",
          info: "#9DC1F6",
          success: "#3DD1C3",
          warning: "#FDB85E",
          error: "#E5668C",
        },
      },
      "night",
    ],
  },
  plugins: [require("daisyui")],
};
