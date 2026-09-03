/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F5F6F2',
          soft: '#EFF1EB',
        },
        ink: {
          DEFAULT: '#10151F',
          soft: '#2B3240',
          muted: '#5B6472',
          faint: '#8B93A0',
        },
        line: {
          DEFAULT: '#DFE2DC',
          soft: '#E9EBE5',
        },
        forest: {
          50: '#EEF4F0',
          100: '#D9E8DD',
          300: '#7FAE8E',
          500: '#2F6F4E',
          600: '#255A3E',
          700: '#1D4631',
        },
        amber: {
          50: '#FBF1E5',
          100: '#F3DDB9',
          300: '#DDA463',
          500: '#C97A2B',
          600: '#A96322',
        },
        brick: {
          50: '#F8E9E7',
          300: '#D68F86',
          500: '#B23A2E',
          600: '#953025',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 21, 31, 0.04), 0 1px 1px rgba(16, 21, 31, 0.03)',
        lift: '0 8px 24px rgba(16, 21, 31, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
