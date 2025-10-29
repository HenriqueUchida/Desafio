const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function gerarTabelas(listaGrupos) {
    const containerMain = document.querySelector('main');
    containerMain.classList.add('h-screen', 'w-screen', 'flex', 'flex-col', 'gap-5', 'col-span-1')
    const parametrosClassificacao = ['#', 'CLASSIFICACAO', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];
    listaGrupos.forEach(element => {
        let sessaoGrupo = document.createElement('section');
        sessaoGrupo.id = `container-grupo${element}`;
        sessaoGrupo.classList.add('grupo', 'flex', 'flex-col', 'gap-2');
        containerMain.appendChild(sessaoGrupo);
        let tituloGrupo = document.createElement('h2');
        tituloGrupo.textContent = `Grupo ${element}`;
        tituloGrupo.classList.add('titulo-grupo', 'font-bold', 'text-2xl');
        sessaoGrupo.appendChild(tituloGrupo);
        let classificacao = document.createElement('table');
        sessaoGrupo.appendChild(classificacao);
        let cabecalhoTabela = document.createElement('tr');
        cabecalhoTabela.id = `cabecalho-grupo${element}`;
        cabecalhoTabela.classList.add('cabecalho', 'gap-2');
        classificacao.appendChild(cabecalhoTabela);
        parametrosClassificacao.forEach(elementosCabecalho => {
            let colunaCabecalho = document.createElement('th');
            colunaCabecalho.textContent = `${elementosCabecalho}`;
            cabecalhoTabela.appendChild(colunaCabecalho);
        })
        carregarDados();
    });
}

async function carregarDados() {
    try {
        const response = await fetch('../json-jogos/jogos-fase1.json');
        todosOsJogos = await response.json(); // Salva todos os 48 jogos na variável
        
        // Renderiza o estado inicial (Grupo A, Rodada 1)
        renderizarJogos();

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function renderizarJogos() {
    console.log(todosOsJogos);
}


document.addEventListener("DOMContentLoaded", gerarTabelas(grupos));