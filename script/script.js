const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let todosOsJogos = [];
let todaClassificacao = [];

async function carregarDados() {
    try {
        // Carrega os dois arquivos ao mesmo tempo
        const [jogosResponse, classResponse] = await Promise.all([
            fetch('./json-jogos/jogos-fase1.json'),
            fetch('./json-jogos/classificacao.json') // <- Carrega o novo JSON
        ]);

        todosOsJogos = await jogosResponse.json();
        todaClassificacao = await classResponse.json(); // <- Salva os dados de classificação

        // Agora chame sua função principal, passando os dados que ela precisa
        gerarTabelas(grupos, todaClassificacao);
    
        

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

function gerarTabelas(listaGrupos, classificacaoData) {
    const containerMain = document.querySelector('main');
    containerMain.classList.add('h-screen', '@container', 'w-screen', 'flex', 'flex-col');
    const parametrosClassificacao = ['#', 'CLASSIFICACAO', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];
    listaGrupos.forEach(element => {
        let containerPai = document.createElement('section');
        let sessaoGrupo = document.createElement('section');
        containerPai.id = `container-grupo${element}`;
        containerPai.classList.add('grupo', 'w-full', 'grid', 'grid-cols-1', 'grid-rows-3', 'md:grid-cols-2', 'col-span-2');
        containerMain.appendChild(containerPai);
        let tituloGrupo = document.createElement('h2');
        tituloGrupo.classList.add('mb-1');
        tituloGrupo.textContent = `Grupo ${element}`;
        tituloGrupo.classList.add('titulo-grupo', 'h-auto', 'w-full','font-bold', 'text-2xl', 'row-span-1');
        sessaoGrupo.appendChild(tituloGrupo);
        let classificacao = document.createElement('table');
        sessaoGrupo.classList.add('row-span-2', 'h-auto', 'md:col-span-1', 'md:row-span-2')
        sessaoGrupo.appendChild(classificacao);
        containerPai.appendChild(sessaoGrupo);
        let cabecalhoTabela = document.createElement('tr');
        cabecalhoTabela.id = `cabecalho-grupo${element}`;
        cabecalhoTabela.classList.add('cabecalho');
        classificacao.appendChild(cabecalhoTabela);
        parametrosClassificacao.forEach(elementosCabecalho => {
            let colunaCabecalho = document.createElement('th');
            colunaCabecalho.textContent = `${elementosCabecalho}`;
            cabecalhoTabela.appendChild(colunaCabecalho);
        })
        const timesGrupo = classificacaoData.filter(time => time.grupo === element).sort((a,b)=>{
            if (a.P > b.P) return -1;
            if (a.P < b.P) return 1;
            if (a.SG > b.SG) return -1;
            
            if (a.SG < b.SG) return 1;

            if (a.GP > b.GP) return -1;
            if (a.GP < b.GP) return 1;

            return 0;

        });
        const jogosGrupo = todosOsJogos.filter(jogos => jogos.grupo === element); 
        renderizarLinhasTime(classificacao, timesGrupo);
        gerarJogos(jogosGrupo, containerPai);
    })
};

function renderizarLinhasTime(tabelaClassificao, timesGrupo) {
    let tbody = document.createElement('tbody');
    timesGrupo.forEach((time, index) => {
        const linhaTime = document.createElement('tr');
        linhaTime.innerHTML = `
            <td>${index + 1}</td>
            <td>${time.time}</td>
            <td>${time.P}</td>
            <td>${time.J}</td>
            <td>${time.V}</td>
            <td>${time.E}</td>
            <td>${time.D}</td>
            <td>${time.GP}</td>
            <td>${time.GC}</td>
            <td>${time.SG}</td>
            <td>${time.per}</td> 
        `;
        tbody.appendChild(linhaTime);
    })
    tabelaClassificao.appendChild(tbody);
};

function gerarJogos(jogosDoGrupo, elementoPai){
    let containerJogos = document.createElement('section');
    containerJogos.classList.add('h-auto', 'row-span-3', 'md:col-span-2', 'md:row-span-2');

    let cabecalhoJogos = document.createElement('header');
    containerJogos.appendChild(cabecalhoJogos);
    
    let btnVoltar = document.createElement('button');
    btnVoltar.textContent = 'voltar';
    cabecalhoJogos.appendChild(btnVoltar);
    
    let textCabecalho = document.createElement('h3');
    textCabecalho.textContent = '1° Partida';
    cabecalhoJogos.appendChild(textCabecalho);

    let btnAvancar = document.createElement('button');
    btnAvancar.textContent = 'avancar'
    cabecalhoJogos.appendChild(btnAvancar);

    let containerJogo1 = document.createElement('div');
    containerJogo1.textContent = 'Jogo linha de cima';
    containerJogos.appendChild(containerJogo1);

    let containerJogo2 = document.createElement('div');
    containerJogo2.textContent = 'Jogo linha de baixo';
    containerJogos.appendChild(containerJogo2);

    elementoPai.appendChild(containerJogos);
}



document.addEventListener("DOMContentLoaded", carregarDados());