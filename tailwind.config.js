// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Incluye todas las páginas y subcarpetas en `app`
    "./app/components/**/*.{js,ts,jsx,tsx}", // Incluye todos los componentes en `app/components` y sus subcarpetas
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#CBDCEB",
          DEFAULT: "#608BC1",
          dark: "#133E87",
        },
        secondary: {
          DEFAULT: "#F3F3E0",
        },
      },
    },
  },
  plugins: [],
};