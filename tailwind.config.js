/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMt")

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
