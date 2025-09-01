let rodadaAnterior = document.querySelector('#btn-anterior');
let rodadaProxima = document.querySelector('#btn-proximo');
let identicadorRodada = document.querySelector('.rodada')
conteudoRodada = identifcador.value
rodadaAnterior.addEventListener('click', voltar());
rodadaProxima.addEventListener('click', avancar());
let rodadaInicial = 1;
const totalRodadas = 3;
rodadaAnterior.disabled = true;


function voltar() {
    if (conteudoRodada != '1ª RODADA') {
        rodadaAnterior.disabled = false;
    };
        
};