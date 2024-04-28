/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
   
    extend: {
      colors:{
        dark:{
          700:"#121212",
          600:"#282828",
          500:"#181818"
        },
        black:{
          900:"#000000"
        },
        green:{
          400:"#1ed760",
        },
        customWhite:{
          // 600:"#FFFFFF",
          // 900:"#fff"
          400:"#e5dfdf;"
        },
        lightHover:"#e4e5f1"
      }
    },
  },
  plugins: [],
}

