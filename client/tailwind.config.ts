import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B4BFF',
        accent: '#FF6B6B',
        muted: '#f5f6fa'
      }
    }
  },
  plugins: []
} satisfies Config;
