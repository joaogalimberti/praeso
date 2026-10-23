/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        ink: {
          950: '#1f2421',
          900: '#2a302c',
          800: '#3a403b',
          700: '#4a514c',
          600: '#5d655e',
          500: '#747b73',
          400: '#939a91',
          300: '#b6bcb3',
          200: '#d4d9d1',
          100: '#e7ebe4',
          50: '#f3f5f1',
        },
        paper: {
          50: '#ffffff',
          100: '#fafbf8',
          200: '#f4f6f1',
          300: '#e9ece4',
        },
        moss: {
          50: '#f2f6f0',
          100: '#e3ebdd',
          200: '#c7d7bc',
          300: '#a3bd93',
          400: '#7a9d6a',
          500: '#5a8050',
          600: '#446640',
          700: '#345234',
          800: '#284029',
          900: '#1f3321',
        },
        signal: {
          warn: '#b08438',
          danger: '#9b524a',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(31,36,33,0.04), 0 8px 24px -16px rgba(31,36,33,0.10)',
        lift: '0 2px 4px rgba(31,36,33,0.04), 0 24px 56px -28px rgba(31,36,33,0.18)',
        ring: '0 0 0 1px rgba(31,36,33,0.07)',
        glow: '0 0 0 1px rgba(122,157,106,0.25), 0 24px 56px -20px rgba(90,128,80,0.35)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'dot-blink': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.8)' },
        },
        'bar-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'toast-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'status-pop': {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '60%': { transform: 'scale(1.12)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'ring-pulse': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease both',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'slide-up': 'slideUp 0.3s ease-out',
        'dot-blink': 'dot-blink 2.6s ease-in-out infinite',
        'bar-grow': 'bar-grow 1.1s cubic-bezier(0.22,1,0.36,1) both',
        'toast-in': 'toast-in 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'status-pop': 'status-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) both',
        'slide-right': 'slide-right 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'ring-pulse': 'ring-pulse 2s ease-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float-soft': 'float-soft 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
