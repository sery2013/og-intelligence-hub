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
        'og-dark': '#0F0C29',
      },
      backgroundImage: {
        'og-gradient': 'linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243E 100%)',
      },
      borderRadius: {
        'og': '2%',
      },
    },
  },
  plugins: [],
}
