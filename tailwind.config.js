/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#040f12",
        background: "#eff8fb",
        primary: "#39afcf",
        secondary: "#e184bb",
        accent: "#db716c",
        card:"#26A3C60D",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["winter", "dark"],  
  },
}

