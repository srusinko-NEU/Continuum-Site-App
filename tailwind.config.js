/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#F7F6F3',
        card: '#FFFFFF',
        border: {
          DEFAULT: '#E2E5E0',
          subtle: '#E2E5E0',
        },
        carbon: '#151B17',
        forest: {
          DEFAULT: '#455249',
          dark: '#364339',
          deep: '#151B17',
        },
        terracotta: {
          DEFAULT: '#B85233',
          hover: '#9E4429',
          light: '#F8ECE8',
        },
        olive: {
          DEFAULT: '#364339',
          dark: '#263028',
          light: '#EAECE9',
        },
        sage: {
          DEFAULT: '#2D6A4F',
          light: '#E8F1EC',
        },
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Newsreader', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
