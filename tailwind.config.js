/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dream: { 900: '#020617', 800: '#0f172a', accent: '#10b981', gold: '#FFD700' }
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
}
