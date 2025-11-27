const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let todosOsJogos = [];
let todaClassificacao = [];
let controleRodada = [
    {grupo: 'A', rodadaAtual: 1},
    {grupo: 'B', rodadaAtual: 1},
    {grupo: 'C', rodadaAtual: 1},
    {grupo: 'D', rodadaAtual: 1},
    {grupo: 'E', rodadaAtual: 1},
    {grupo: 'F', rodadaAtual: 1},
    {grupo: 'G', rodadaAtual: 1},
    {grupo: 'H', rodadaAtual: 1}
]

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
    // Adicionei 'p-4' para dar um respiro na borda da tela
    containerMain.classList.add('@container', 'w-full', 'flex', 'flex-col', 'items-center','p-4'); 
    
    const parametrosClassificacao = ['#', 'CLASSIFICACAO', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];
    
    listaGrupos.forEach(element => {
        let containerPai = document.createElement('section');
        let sessaoGrupo = document.createElement('section');
        
        containerPai.id = `container-grupo-${element}`;
        
        // --- ALTERAÇÃO 1: O GRID ---
        // Mobile: 1 coluna | Desktop (md): 2 colunas | gap-4 para espaçamento
        containerPai.classList.add('grupo', 'w-5/6', 'md:w-3/4', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'mb-8');
        
        containerMain.appendChild(containerPai);
        
        let tituloGrupo = document.createElement('h2');
        tituloGrupo.classList.add('mb-1');
        tituloGrupo.textContent = `Grupo ${element}`;
        
        // --- ALTERAÇÃO 2: O TÍTULO ---
        // O título ocupa as 2 colunas no desktop (ficando sozinho na linha 1)
        tituloGrupo.classList.add('titulo-grupo', 'font-bold', 'text-2xl', 'md:col-span-2');
        
        containerPai.appendChild(tituloGrupo);
        
        let classificacao = document.createElement('table');
        classificacao.classList.add('h-full', 'w-full');
        
        sessaoGrupo.classList.add('h-full', 'overflow-x-auto', 'bg-white', 'shadow-md', 'rounded-lg', 'border', 'border-gray-200'); 
        
        sessaoGrupo.appendChild(classificacao);
        containerPai.appendChild(sessaoGrupo);

        let cabecalhoTabela = document.createElement('tr');
        cabecalhoTabela.id = `cabecalho-grupo${element}`;
        cabecalhoTabela.classList.add('cabecalho', 'bg-gray-100', 'text-gray-600', 'text-xs', 'uppercase', 'leading-normal');
        classificacao.appendChild(cabecalhoTabela);
        parametrosClassificacao.forEach(elementosCabecalho => {
            let colunaCabecalho = document.createElement('th');
            colunaCabecalho.textContent = `${elementosCabecalho}`;
            colunaCabecalho.classList.add('py-3', 'px-2', 'text-center', 'font-bold', 'tracking-wider');
            if (elementosCabecalho === 'CLASSIFICACAO') {
                colunaCabecalho.classList.remove('text-center');
                colunaCabecalho.classList.add('text-left');
            }
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
        gerarJogos(element, jogosGrupo, containerPai);
    })
};

function renderizarLinhasTime(tabelaClassificao, timesGrupo) {
    let tbody = document.createElement('tbody');
    tbody.classList.add('text-gray-700', 'text-sm'); // Define cor e tamanho base do texto

    timesGrupo.forEach((time, index) => {
        const linhaTime = document.createElement('tr');

        // LÓGICA DE DESTAQUE:
        // Se index < 2 (1º e 2º), aplica fundo verde claro e borda lateral verde
        if (index < 2) {
            linhaTime.classList.add('border-b', 'border-gray-200', 'bg-green-50', 'border-l-4', 'border-l-green-500');
        } else {
            linhaTime.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-50');
        }

        // Classes utilitárias para evitar repetição no HTML abaixo
        const cellPadrao = "py-3 px-2 text-center whitespace-nowrap";
        const cellTime = "py-3 px-2 text-left font-semibold whitespace-nowrap text-gray-900";
        const cellPontos = "py-3 px-2 text-center font-bold text-gray-900 bg-gray-50"; 

        linhaTime.innerHTML = `
            <td class="${cellPadrao}">${index + 1}</td>
            <td class="${cellTime}">${time.time}</td>
            <td class="${cellPontos}">${time.P}</td>
            <td class="${cellPadrao}">${time.J}</td>
            <td class="${cellPadrao}">${time.V}</td>
            <td class="${cellPadrao}">${time.E}</td>
            <td class="${cellPadrao}">${time.D}</td>
            <td class="${cellPadrao}">${time.GP}</td>
            <td class="${cellPadrao}">${time.GC}</td>
            <td class="${cellPadrao}">${time.SG}</td>
            <td class="${cellPadrao}">${time.per}%</td> 
        `;
        tbody.appendChild(linhaTime);
    })
    tabelaClassificao.appendChild(tbody);
};

function gerarJogos(grupo, jogosDoGrupo, elementoPai){
    let containerJogos = document.createElement('section');
    containerJogos.id = `jogos-grupo-${grupo}`
    containerJogos.classList.add('jogos', 'h-full', 'w-full', 'md:max-w-[400px]','flex', 'flex-col', 'gap-1');

    let cabecalhoJogos = document.createElement('header');
    cabecalhoJogos.classList.add('flex', 'justify-between', 'items-center', 'mb-1', 'border-t', 'border-b', 'border-gray-300', 'p-1'); // Estilização básica flex
    containerJogos.appendChild(cabecalhoJogos);
    
    let btnVoltar = document.createElement('button');
    btnVoltar.textContent = '<';
    btnVoltar.id = `btn-voltar-${grupo}`
    btnVoltar.dataset.funcao = 'voltar';
    btnVoltar.dataset.grupo = `${grupo}`
    btnVoltar.classList.add('botao', 'p-2', 'bg-gray-200', 'rounded', 'cursor-not-allowed'); // Estilo básico
    cabecalhoJogos.appendChild(btnVoltar);
    
    let textCabecalho = document.createElement('h3');
    textCabecalho.innerHTML = `<span id="rodada-grupo-${grupo}">1</span>ª Partida`;
    textCabecalho.classList.add('font-black');
    cabecalhoJogos.appendChild(textCabecalho);

    let btnAvancar = document.createElement('button');
    btnAvancar.textContent = '>';
    btnAvancar.id = `btn-avancar-${grupo}`;
    btnAvancar.dataset.funcao = 'avancar';
    btnAvancar.dataset.grupo = `${grupo}`
    btnAvancar.classList.add('botao','p-2', 'bg-gray-200', 'rounded', 'cursor-pointer'); // Estilo básico
    cabecalhoJogos.appendChild(btnAvancar);

    for(let i = 0; i < 2; i++){
        let jogo = jogosDoGrupo[i];
        let [mandanteNome, visitanteNome] = jogo.partida.split(" x ");
        let bandeiraMandante = jogo.mandante;
        let bandeiraVisitante = jogo.visitante;
        let golsMandante = jogo.gols_mandante;
        let golsVisitante = jogo.gols_visitante;
        let data = jogo.data;
        let diaSemana = jogo.diaSemana;
        let horario = jogo.hora;
        let estadio = jogo.estadio;
        let containerJogo = document.createElement('div');
        containerJogo.id = `linha-jogo-${i+1}-${grupo}`;
        containerJogo.classList.add(`jogos-${grupo}`, 'w-full', 'h-full', 'grid', 'grid-cols-3', 'place-items-center', 'gap-3', 'text-2xl', 'font-light', 'grid-cols-[auto_auto_auto]');

        let containerData = document.createElement('div');
        containerData.classList.add('col-span-3');
        containerData.innerHTML = `<span class="text-xs font-semibold">${estadio} - ${data} - ${diaSemana} - ${horario}</span>`;
        containerJogo.appendChild(containerData);

        let containerEsq = document.createElement('div');
        containerEsq.id = `container-mandante-${i+1}-${grupo}`;
        containerEsq.classList.add('container-mandante', 'flex','items-center');
        // <img src="imagens/bandeiras/alemanha.png" alt=""></img>
        containerEsq.innerHTML = `<span>${mandanteNome}</span><img class="w-[34px] h-[34px] ml-3" src="./imagens/bandeiras/${bandeiraMandante}"></img>`;
        // containerEsq.textContent = mandanteNome;
        containerJogo.appendChild(containerEsq);


        let containerPlacar = document.createElement('div');
        containerPlacar.classList.add('h-full', 'w-1/2', 'grid', 'grid-cols-3', 'justify-items-center', 'items-end', 'place-content-center')
        containerJogo.appendChild(containerPlacar);

        let placarMandante = document.createElement('span');
        placarMandante.textContent = golsMandante
        placarMandante.classList.add('col-start-1', 'font-bold', 'w-auto');
        containerPlacar.appendChild(placarMandante);

        let divisorPlacar = document.createElement('span');
        divisorPlacar.textContent = 'X';
        divisorPlacar.classList.add('col-start-2', 'text-sm', 'font-semibold', 'justify-center', 'mb-1', 'mx-2', 'text-gray-300');
        containerPlacar.appendChild(divisorPlacar);


        let containerDir = document.createElement('div');
        containerDir.textContent = visitanteNome;
        containerDir.id = `container-visitante-${i+1}-${grupo}`;
        containerDir.classList.add('container-visitante', 'flex','items-center', 'justify-center');
        containerDir.innerHTML = `<img class="w-[34px] h-[34px] mr-3" src="./imagens/bandeiras/${bandeiraVisitante}"></img><span>${visitanteNome}</span>`;
        containerJogo.appendChild(containerDir);

        let placarVisitante = document.createElement('span');
        placarVisitante.textContent = golsVisitante
        placarVisitante.classList.add('col-start-3', 'font-bold');
        containerPlacar.appendChild(placarVisitante);

        containerJogos.appendChild(containerJogo);
        
    }
    elementoPai.appendChild(containerJogos);
}

function criaEventos(){
    const containerMain = document.querySelector('main');
    containerMain.addEventListener('click', function(event){
        if(event.target.matches('.botao')){
            let funcao = event.target.dataset.funcao;
            let grupo = event.target.dataset.grupo;
            controleRodadas(funcao, grupo);
            console.log(funcao, grupo);
        }
    })
};

function controleRodadas(funcao, grupo){
    if(funcao == 'voltar'){
        
    }
};

function iniciarPagina(){
    carregarDados();
    criaEventos();
}

document.addEventListener("DOMContentLoaded", iniciarPagina);