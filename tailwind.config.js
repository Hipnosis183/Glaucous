module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          0: 'var(--color-theme-0)',
          100: 'var(--color-theme-100)',
          200: 'var(--color-theme-200)',
          300: 'var(--color-theme-300)',
          400: 'var(--color-theme-400)',
          500: 'var(--color-theme-500)',
          600: 'var(--color-theme-600)',
          700: 'var(--color-theme-700)',
          800: 'var(--color-theme-800)',
          900: 'var(--color-theme-900)',
        },
        color: {
          100: 'var(--color-color-100)',
          200: 'var(--color-color-200)',
          300: 'var(--color-color-300)',
          400: 'var(--color-color-400)',
          500: 'var(--color-color-500)',
          600: 'var(--color-color-600)',
          700: 'var(--color-color-700)',
          800: 'var(--color-color-800)',
          900: 'var(--color-color-900)',
        }
      },
      gridTemplateColumns: {
       'view': 'repeat(var(--grid-cols-view), minmax(0, 1fr))',
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
