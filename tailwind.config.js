/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfcfb',
          100: '#f9f7f4',
          200: '#f3ede6',
          300: '#e8ddd1',
          400: '#d9c6b0',
          500: '#c9ae8f',
          600: '#b4936d',
          700: '#9a7a56',
          800: '#7d6347',
          900: '#66513b',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e6e3',
          200: '#c7cdc7',
          300: '#a3aca3',
          400: '#7f8b7f',
          500: '#647064',
          600: '#4f5a4f',
          700: '#414941',
          800: '#373d37',
          900: '#2f332f',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
