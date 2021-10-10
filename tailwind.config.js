module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        'image': 'var(--rounded-image)',
        'list': 'var(--rounded-list)'
      },
      boxShadow: {
        'color': '0 1px 3px 0 rgba(var(--color-theme-700), 0.1), 0 1px 2px 0 rgba(var(--color-theme-700), 0.06)'
      },
      colors: {
        theme: {
          0: 'rgb(var(--color-theme-0))',
          100: 'rgb(var(--color-theme-100))',
          200: 'rgb(var(--color-theme-200))',
          300: 'rgb(var(--color-theme-300))',
          400: 'rgb(var(--color-theme-400))',
          500: 'rgb(var(--color-theme-500))',
          600: 'rgb(var(--color-theme-600))',
          700: 'rgb(var(--color-theme-700))',
          800: 'rgb(var(--color-theme-800))',
          900: 'rgb(var(--color-theme-900))'
        },
        color: {
          100: 'rgb(var(--color-color-100))',
          200: 'rgb(var(--color-color-200))',
          300: 'rgb(var(--color-color-300))',
          400: 'rgb(var(--color-color-400))',
          500: 'rgb(var(--color-color-500))',
          600: 'rgb(var(--color-color-600))',
          700: 'rgb(var(--color-color-700))',
          800: 'rgb(var(--color-color-800))',
          900: 'rgb(var(--color-color-900))'
        }
      },
      gridTemplateColumns: {
        'list': 'repeat(var(--grid-cols-list), minmax(0, 1fr))',
        'image': 'repeat(var(--grid-cols-image), minmax(0, 1fr))'
      },
      scale: {
        '1005': '1.005',
        '101': '1.01',
        '102': '1.02'
      },
      spacing: {
        '34': '8.5rem',
        '68': '17rem'
      },
      zIndex: {
        5: 5,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
