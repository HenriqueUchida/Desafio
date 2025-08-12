let rodadaAnterior = document.querySelector('#btn-anterior');
let rodadaProxima = document.querySelector('#btn-proximo');
let identicadorRodada = document.querySelector('.rodada')
conteudoRodada = identifcador.value
rodadaAnterior.addEventListener('click', voltar());
rodadaProxima.addEventListener('click', avancar());
let rodadaInicial = 1;
const totalRodadas = 3;



function voltar() {
    botaoVoltar.disabled = true;
    if (conteudoRodada != '1ª RODADA') {
        botaoVoltar.disabled = false;
        identificadorRodada.innerHTML = ''

    };
        
};