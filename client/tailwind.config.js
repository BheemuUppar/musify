/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        }
      }
    },
  },
  plugins: [],
}

