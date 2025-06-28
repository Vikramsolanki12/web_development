/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'robo-blue': '#3498db',
        'robo-dark': '#2c3e50',
        'robo-light': '#ecf0f1',
        'robo-accent': '#f39c12',
      },
      fontFamily: {
        'futuristic': ['"Segoe UI Variable"', 'sans-serif'], // Example futuristic font
      },
    },
  },
  plugins: [],
}

