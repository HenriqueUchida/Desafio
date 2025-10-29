/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Diz ao Tailwind para "assistir" seu HTML
    "./script/*.js"         // Diz ao Tailwind para "assistir" qualquer arquivo .js
  ],
  theme: {
    extend: {fontFamily: {
        // 3. Adicione 'Roboto' como a fonte 'sans' padrão
        //    Isso coloca 'Roboto' no início da lista de fontes sans-serif
        sans: ['Open Sans', 'Montserrat', defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}