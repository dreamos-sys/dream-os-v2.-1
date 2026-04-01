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
        // Dream OS Primary
        dream: {
          900: '#022c22',  // Background dark
          800: '#064e3b',  // Surface dark
          700: '#047857',  // Primary action
          600: '#059669',  // Hover
          500: '#10b981',  // Accent
          400: '#34d399',  // Success
          300: '#6ee7b7',  // Subtle
        },
        // Neutral grayscale
        neutral: {
          900: '#0f172a',  // Text primary
          700: '#334155',  // Text secondary
          500: '#64748b',  // Placeholder
          300: '#cbd5e1',  // Border
          100: '#f1f5f9',  // Background light
        },
        // Semantic status
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        // Spiritual accent
        spiritual: {
          gold: '#fbbf24',
          glow: 'rgba(251, 191, 36, 0.15)',
        },
        // Command Center specific
        cc: {
          bg: 'rgba(15,23,42,.88)',
          panel: 'rgba(255,255,255,.03)',
          border: 'rgba(16,185,129,.22)',
          accent: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
          purple: '#a855f7',
          pink: '#ec4899',
        },
      },
      fontFamily: {
        sans: ['var(--font-rajdhani)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gentle': 'pulseGentle 2s infinite',
        'bismillah-glow': 'bismillahGlow 3s ease-in-out infinite',
        'cc-sweep': 'ccSweep 4s ease-in-out infinite',
        'cc-pulse': 'ccPulse 2s infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(8px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseGentle: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.85 } },
        bismillahGlow: { 
          '0%,100%': { boxShadow: '0 0 0 0 rgba(251, 191, 36, 0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(251, 191, 36, 0.3)' },
        },
        ccSweep: {
          '0%,100%': { left: '-100%' },
          '50%': { left: '100%' },
        },
        ccPulse: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(1.4)' },
        },
      },
      borderColor: {
        'dream-soft': 'rgba(16,185,129,.22)',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
