module.exports = {
    darkMode: 'class', // Esto asegura que el tema oscuro funcione con la clase 'dark'
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de incluir todos los archivos relevantes
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