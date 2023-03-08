/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  mode: 'jit',
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./public/**/*.html",
  ],

  plugins: [
    require("flowbite/plugin")
  ],

  darkTheme: true,

  theme: {
    extend: {
      fontFamily: {
        'nunito-sans': ['"Nunito Sans"', 'sans-serif'],
      }
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dark-blue': 'hsl(209, 23%, 22%)',
      'very-dark-blue-1': 'hsl(207, 26%, 17%)',
      'very-dark-blue-2': 'hsl(200, 15%, 8%)',
      'dark-gray': 'hsl(0, 0%, 52%)',
      'very-light-gray': 'hsl(0, 0%, 98%)',
    },
  },
};
