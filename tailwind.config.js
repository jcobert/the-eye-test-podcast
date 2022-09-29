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
        "theme-secondary": "#344e95",
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
        }
      },
      animation: {
        'player-display': 'enter 500ms ease'
      }
    },
  },
  plugins: [],
};
