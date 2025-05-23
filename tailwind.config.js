module.exports = {
    darkMode: 'class', // Esto asegura que el tema oscuro funcione con la clase 'dark'
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de incluir todos los archivos relevantes
    ],
    safelist: [
      {
        pattern: /(?:bg|text|from|to|via)-(red|blue|green|yellow|purple|pink|indigo|gray|emerald|teal|orange|amber|lime|cyan|sky|violet|fuchsia|rose)-(100|200|300|400|500|600|700|800|900)/,
      },
    ],
    theme: {
      extend: {
        colors: {
          matrix: {
            DEFAULT: '#00FF00',
            dark: '#003300', 
          },
        },
      },
    },
    plugins: [],
  };