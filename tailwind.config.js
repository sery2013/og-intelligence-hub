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
        'og-orange': '#FF8C00',
        'og-cyan': '#00D9FF',
        'og-purple': '#9D4EDD',
        'og-emerald': '#10B981',
      },
      borderRadius: { 'og': '2%' },
    },
  },
  plugins: [],
}
