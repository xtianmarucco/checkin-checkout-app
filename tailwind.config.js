// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Incluye todas las páginas dentro de 'app'
    "./components/**/*.{js,ts,jsx,tsx}", // Incluye todos los componentes
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
