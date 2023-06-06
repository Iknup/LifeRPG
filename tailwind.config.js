/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        primary: '#242528',
        secondary: '#2F3034',
        tertiary: '#35373B',
        quaternary: '#3C3E42',
        quinary: '#46484C',
        colorMdwhite: '#6B6E72',
        textPrimary: '#ffffff',
        borderPrimary: '#1e2124',
        colorMain: 'rgb(255,197,29)',
        colorSub: 'rgb(38,181,119)',
        btnConfirm: '#B5F1CC',
        btnReject: '#FD8A8A',
      },
      animation: {
        bounceOnce: 'bounceOnce',
      },
      keyframes: {
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translate(20px)' },
        },
      },
    },
  },

  plugins: [],
};
