import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './app.vue',
  ],
  theme: {
    extend: {
      // Palette Tolkien : parchemin, or, vert forêt, brun ancien
      colors: {
        parchment: {
          50:  '#fdfbf3',
          100: '#f9f3dc',
          200: '#f2e4b3',
          300: '#e8cf7f',
          400: '#dbb84d',
          500: '#c9a227',  // or principal
          600: '#a8841a',
          700: '#856614',
          800: '#644d11',
          900: '#4a380d',
          950: '#2d2108',
        },
        forest: {
          50:  '#f0f7f0',
          100: '#ddeedd',
          200: '#bcddbc',
          300: '#8fc48f',
          400: '#5fa65f',
          500: '#3d8b3d',  // vert forêt principal
          600: '#2d6e2d',
          700: '#245824',
          800: '#1e451e',
          900: '#183818',
          950: '#0c200c',
        },
        mordor: {
          900: '#1a0808',
          800: '#2d1010',
          700: '#4a1a1a',
        },
        shire: {
          900: '#0c1a08',
          800: '#162810',
          700: '#1e3816',
        },
        ancient: {
          950: '#1a1208',  // fond principal — brun très sombre
          900: '#261a0a',
          800: '#362410',
          700: '#4a3218',
          600: '#6b4a24',
          500: '#8b6432',
          400: '#a87c42',
        },
      },

      // Typographie Tolkien
      fontFamily: {
        display: ['Cinzel', 'serif'],          // titres — style inscription elfique
        body:    ['Crimson Text', 'Georgia', 'serif'],  // texte courant — style manuscrit
        mono:    ['Fira Code', 'monospace'],   // code (docs API)
      },

      fontSize: {
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        'display-lg': ['2.5rem', { lineHeight: '1.2', letterSpacing: '0.04em' }],
      },

      // Ombres dorées
      boxShadow: {
        'gold':     '0 0 20px rgba(201, 162, 39, 0.3)',
        'gold-lg':  '0 0 40px rgba(201, 162, 39, 0.5)',
        'card':     '0 4px 24px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.8)',
      },

      // Bordures ornementales
      borderWidth: {
        '3': '3px',
      },

      // Animations
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      backgroundImage: {
        // Texture parchemin subtile
        'parchment-texture': "url('/textures/parchment.svg')",
        // Dégradé fond principal
        'ancient-gradient': 'linear-gradient(135deg, #1a1208 0%, #261a0a 50%, #1e3816 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
