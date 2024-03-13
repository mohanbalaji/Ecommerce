// tailwind.config.js

module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }
  