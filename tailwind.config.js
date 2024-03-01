module.exports = {
  content: ['./*.html', './src/**/*.tsx', './src/**/*.ts'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-theme': '#00A4EF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
