/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-primary": "#3892e2",
        "theme-secondary": "#314ad6",
        "theme-tertiary": "#ff9f46",
      },
      fontFamily: {
        'jost': ["Jost", "Helvetica", "Arial", "sans-serif"],
        'optician': ["OpticianSans", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        'base': '1.05rem'
      },
      maxWidth: {
        'layoutMax': '90rem'
      },
      keyframes: {
        enter: {
          '0%': { opacity: 10, transform: 'translateY(100%)' },
          '25%': { transform: 'scale(97%)' },
          '75%': { transform: 'scale(100%)' },
          '100%': { opacity: 100, transform: 'translateY(0)' }
        },
        fade: {
          '0%': { opacity: 10, transform: 'scale(95%)' },
          '25%': { opacity: 0 },
          '75%': { opacity: 70 },
          '100%': { opacity: 100, transform: 'scale(100%)' }
        },
        zoom: {
          '0%': { opacity: 0, transform: 'scale(.5) rotate(-25deg)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      },
      animation: {
        'player-display': 'enter 500ms ease',
        'iframe-display': 'fade 350ms ease-out',
        'icon-enter': 'zoom 750ms ease',
        'slow-fade-in': 'fade 750ms ease-out'
      }
    },
  },
  plugins: [],
};
