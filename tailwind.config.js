/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  mode: 'jit',
  
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        'nunito-sans': ['"Nunito Sans"', 'sans-serif'],
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

      animation: {
        'slide': '100ms linear slide',
        'fadeIn': '300ms linear fadeIn'
      },

      keyframes: {
        slide: {
          '0%' : { transform: 'scaleY(0)' },
          '100%' : { transform: 'scaleY(1)' },
        },

        fadeIn: {
          '0%' : { opacity: 0 },
          '100%' : { opacity: 1 },
        }
      }
    },
    
  },
};
