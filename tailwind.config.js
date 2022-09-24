/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dashboard-image': "url('../public/images/background.svg')"
      }
    },
  },
  plugins: [],
}
