// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // Adjust to your file structure
  theme: {
    extend: {
      colors: {
        rainBlue: '#89CFF0', // Primary button or action color
        secondgrey: '#707077',
        leafGreen: '#77DD77', // Accent color
        cloudWhite: '#F5F5F5', // Background
        pebbleGray: '#D9D9D9', // Secondary background or borders
        twilightPurple: '#847E89', // Text for headings
        textPrimary: '#F5F5F5',
      },
      fontFamily: {
        heading: ['"Source Serif 4"', 'serif'], // Elegant font for headings
        body: ['"Inter"', 'sans-serif'], // Clean sans-serif for body text
      },
      boxShadow: {
        soft: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadows
        focus: '0px 0px 10px rgba(121, 199, 253, 0.8)', // Glowy effect for focus
      },
      animation: {
        float: 'float 3s ease-in-out infinite', // For floating icons
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
