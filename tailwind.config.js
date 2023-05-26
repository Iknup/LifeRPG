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
        primary: '#2e3136',
        secondary: '#424549',
        tertiary: '#36393e',
        textPrimary: '#ffffff',
        borderPrimary: '#1e2124',
        colorMain: 'rgb(255,197,29)',
        colorSub: 'rgb(38,181,119)',
      },
    },
  },
  plugins: [],
};
