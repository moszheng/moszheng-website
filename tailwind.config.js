/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['DM Sans', "PingFang TC", "Noto Sans TC", "Segoe UI", "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
      },
      colors: {
        'main-orange': '#ff6a21',
        'main-black': '#161616',
        'main-grey': '#e4e4e4',
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

