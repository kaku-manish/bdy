/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        birthday: {
          dark: '#0B0A1A',
          purple: '#2E1065',
          pink: '#EC4899',
          rose: '#F43F5E',
          gold: '#FBBF24',
          amber: '#F59E0B',
          neonPink: '#FF2E93',
          neonCyan: '#00F0FF',
          neonViolet: '#8A2BE2'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        serif: ['Playfair Display', 'serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
