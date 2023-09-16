/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      lineClamp:{
        "1":"1",
        "2":"2",
        "3":"3",
      }
    },
  },
  plugins: [],
}
