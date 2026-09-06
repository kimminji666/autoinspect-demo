/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#2563EB',
        'brand-dark': '#1D4ED8',
        ok: '#16A34A',
        defect: '#DC2626',
        recheck: '#EA580C',
        surface: '#FFFFFF',
        'surface-alt': '#F7F8FA',
        ink: '#1F2937',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Malgun Gothic"',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
      },
      keyframes: {
        'toast-in': {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'toast-in': 'toast-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
