/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}',  // This ensures Tailwind CSS scans all your JS/JSX files
    ],
    theme: {
      extend: {
        colors:{
          sidebar: '#9EA0A2',
        },
        fontFamily: {
        'hina': ['"Hina Mincho"', 'serif'],  // Add your custom font here
      },
      },
    },
    plugins: [],
  }
  