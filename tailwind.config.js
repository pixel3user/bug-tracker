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
    colors: {
      navBar: '#F1F1F1',
      navBarBorder: '#77DD73',
      borderBlack: '#979797',
      todoListColor: '#FFF8DE',
      todoListBorder: '#C6B988',
      formColor: '#FAFAFA',
      formBorderColor: '#D5D5D5',
      inputBorderColor: '#979797',
      white: '#FFFFFF',
      blue: '#1a73e8',
      darkBlue: '#1557ad',
      red: '#FF0000',
      darkRed: '#8B0000',
      black: '#000000'
    },
  },
  plugins: [],
}
