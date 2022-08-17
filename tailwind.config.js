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
        "theme-tertiary": "#ffc258",
      },
      fontFamily: {
        'jost': ["Jost", "Helvetica", "Arial", "sans-serif"],
        'optician': ["OpticianSans", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
