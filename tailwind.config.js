/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    fontFamily: {
      'sans': ['DM Sans', "PingFang TC", "Noto Sans TC", "Segoe UI", "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
    },
    extend: {
      colors: {
        'main-orange': '#ff6a21',
        'main-yellow': '#faa927',
        'main-blue': '#0552a4',
        'main-black': '#141414',
        'main-gray': '#e4e4e4',
        'main-neutral': '#fffcf7',
      },
      screens: {
        '3xl': '1792px',
        '4xl': '2148px',
      },
      spacing: {
        '128': '32rem',
      },
      transitionTimingFunction: {
        'power4': 'cubic-bezier(.05,.52,0,1)',
        'back': 'cubic-bezier(.81,.56,.54,1.36)',
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '16/9': '16 / 9',
      },
      // fontSize: {
      //   sm: '0.8rem',
      //   base: '1rem',
      //   xl: '1.25rem',
      //   '2xl': '1.563rem',
      //   '3xl': '1.953rem',
      //   '4xl': '2.441rem',
      //   '5xl': '3.052rem',
      // }
    },
  },
  plugins: [],
}
