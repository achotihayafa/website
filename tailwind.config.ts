import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        podcast: {
          yellow: '#FCFE14',
          magenta: '#FF006E',
          darkgray: '#1A1A1A',
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
