/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // ✅ Enables dark mode using class strategy
  theme: {
    extend: {
      colors: {
        sidebar: '#9EA0A2',
        // Light color shades for panels and tables
        indigo: {
          25: '#f5f7ff',
          50: '#eef2ff'
        },
        amber: {
          25: '#fff9e6',
          50: '#fffbeb'
        },
        rose: {
          25: '#fff0f3',
          50: '#fff1f2'
        },
        blue: {
          25: '#f0f7ff',
          50: '#eff6ff'
        },
        purple: {
          25: '#f9f5ff',
          50: '#f5f3ff'
        },
        emerald: {
          25: '#e6fcf5',
          50: '#ecfdf5'
        },
        red: {
          25: '#fff0f0',
          50: '#fef2f2'
        },
        gray: {
          25: '#fcfcfc',
          50: '#f9fafb'
        },
        // Special chart background colors
        chart: {
          indigo: 'rgba(199, 210, 254, 0.3)',    // indigo-200 with opacity
          blue: 'rgba(191, 219, 254, 0.3)',      // blue-200 with opacity
          emerald: 'rgba(167, 243, 208, 0.3)',   // emerald-200 with opacity
          amber: 'rgba(253, 230, 138, 0.3)',     // amber-200 with opacity
          purple: 'rgba(221, 214, 254, 0.3)'     // purple-200 with opacity
        }
      },
      fontFamily: {
        'hina': ['"Hina Mincho"', 'serif'],
      },
    },
  },
  plugins: [],
}