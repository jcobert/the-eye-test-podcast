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
        "theme-secondary": "#3f9ddb",
        "theme-tertiary": "#eea72a",
      },
      fontFamily: {
        'jost': ["Jost", "Helvetica", "Arial", "sans-serif"],
        'optician': ["OpticianSans", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        'base': '1.05rem'
      }
    },
  },
  plugins: [],
};
