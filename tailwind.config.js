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
        ColorOne: '#242528',
        ColorTwo: '#292A2D',
        ColorThree: '#303235',
        ColorFour: '#3C3E42',
        ColorFive: '#46484C',
        ColorSix: '#6B6E72',
        colorMain: 'rgb(255,197,29)',
        colorSub: 'rgb(38,181,119)',
        btnConfirm: '#B5F1CC',
        btnReject: '#FD8A8A',
        TextColor: '#E5E5E5',
        DarkRed: '#7F1F1F',
        DarkGreen: '#1F7F4F',
        LightRed: '#b22828',
      },
      boxShadow: {
        menuShadow: '1px 2px 2px rgba(0,0,0,0.25)',
        addButtonShadow: '0px 0px 2px rgba(38,181,119,0.30)',
        confModalShadow: '0px 5px 5px rgba(0,0,0,0.25)',
      },
      animation: {
        bounceOnce: 'bounceOnce',
        wiggleOnce: 'wiggleOnce 1s ease-in-out infinite',
      },
      keyframes: {
        bounceOnce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translate(20px)' },
        },
        wiggleOnce: {
          '0% 100%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-12deg)' },
          '75%': { transform: 'rotate(12deg)' },
        },
      },
    },
  },

  plugins: [],
};
