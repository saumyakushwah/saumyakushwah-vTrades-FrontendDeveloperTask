import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        background: '#17181E',
        primary: '#ffffff',
        buttonBg: '#1D1E26',
        buttonBorder: '#30303D',
      },
    },
  },
  plugins: [],
}
export default config;
