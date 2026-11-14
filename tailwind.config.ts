import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core palette — dark rich shades
        'bistre-gold': '#7A5912',   // primary dark gold, text & accents
        'bistre-mid':  '#A07820',   // slightly lighter gold
        'finch':       '#3D6B1A',   // deep olive green — success
        'finch-soft':  '#EAF2E0',   // very light green tint
        'butter':      '#FBF3DC',   // pale warm cream — page bg & inputs
        'butter-mid':  '#F0E0A0',   // slightly deeper butter
        'indian-red':  '#963030',   // muted warm red — warning
        'garnet':      '#5A1818',   // deep dark red — danger & salary card
        // Surface & text
        'surface':     '#FFFFFF',
        'warm-bg':     '#F5EDD5',   // main app background
        'text-dark':   '#1E140A',   // primary text on light bg
        'text-mid':    '#6B5530',   // secondary text
      },
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 16px 0 rgba(122,89,18,0.08)',
        'card-lg': '0 6px 32px 0 rgba(122,89,18,0.14)',
      },
      animation: {
        'slide-in': 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-in-out',
        'confetti-fall': 'confettiFall 3s linear infinite',
        'count-up': 'countUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config

