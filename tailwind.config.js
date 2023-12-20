/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      color:{
        white:"white",
        none:"none",
      },
      borderWidth:{
        1: "1px"
      },
      fontFamily:{
        quicksand:["Quicksand","sans-serif"],

      }
    },
  },
  plugins: [],
}

