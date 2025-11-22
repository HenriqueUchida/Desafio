const grupos = ['A'];//, 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
    // Adicionei 'p-4' para dar um respiro na borda da tela
    containerMain.classList.add('h-screen', '@container', 'w-screen', 'flex', 'flex-col', 'p-4'); 
    
    const parametrosClassificacao = ['#', 'CLASSIFICACAO', 'P', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', '%'];
    
    listaGrupos.forEach(element => {
        let containerPai = document.createElement('section');
        let sessaoGrupo = document.createElement('section');
        
        containerPai.id = `container-grupo-${element}`;
        
        // --- ALTERAÇÃO 1: O GRID ---
        // Mobile: 1 coluna | Desktop (md): 2 colunas | gap-4 para espaçamento
        containerPai.classList.add('grupo', 'w-full', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4', 'mb-8');
        
        containerMain.appendChild(containerPai);
        
        let tituloGrupo = document.createElement('h2');
        tituloGrupo.classList.add('mb-1');
        tituloGrupo.textContent = `Grupo ${element}`;
        
        // --- ALTERAÇÃO 2: O TÍTULO ---
        // O título ocupa as 2 colunas no desktop (ficando sozinho na linha 1)
        tituloGrupo.classList.add('titulo-grupo', 'font-bold', 'text-2xl', 'md:col-span-2');
        
        containerPai.appendChild(tituloGrupo);
        
        let classificacao = document.createElement('table');
        
        // --- ALTERAÇÃO 3: A TABELA ---
        // Removemos row-span desnecessários. Adicionei overflow-x-auto para a tabela não quebrar em telas pequenas
        sessaoGrupo.classList.add('h-auto', 'overflow-x-auto'); 
        
        sessaoGrupo.appendChild(classificacao);
        containerPai.appendChild(sessaoGrupo);

        // ... (Resto do código da tabela permanece igual) ...
        let cabecalhoTabela = document.createElement('tr');
        cabecalhoTabela.id = `cabecalho-grupo${element}`;
        cabecalhoTabela.classList.add('cabecalho');
        classificacao.appendChild(cabecalhoTabela);
        parametrosClassificacao.forEach(elementosCabecalho => {
            let colunaCabecalho = document.createElement('th');
            colunaCabecalho.textContent = `${elementosCabecalho}`;
            // Sugestão: Adicionar padding nas células
            colunaCabecalho.classList.add('px-2', 'text-center'); 
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
    
    // --- ALTERAÇÃO 4: OS JOGOS ---
    // Removemos as classes de grid manuais antigas. 
    // Ele cairá naturalmente na segunda coluna no desktop, pois o título ocupou 2 slots e a tabela ocupou o slot 1 da linha 2.
    containerJogos.classList.add('h-auto', 'flex', 'flex-col', 'gap-2');

    let cabecalhoJogos = document.createElement('header');
    cabecalhoJogos.classList.add('flex', 'justify-between', 'items-center', 'mb-2'); // Estilização básica flex
    containerJogos.appendChild(cabecalhoJogos);
    
    let btnVoltar = document.createElement('button');
    btnVoltar.textContent = '<';
    btnVoltar.classList.add('p-2', 'bg-gray-200', 'rounded'); // Estilo básico
    cabecalhoJogos.appendChild(btnVoltar);
    
    let textCabecalho = document.createElement('h3');
    textCabecalho.textContent = '1ª Partida';
    cabecalhoJogos.appendChild(textCabecalho);

    let btnAvancar = document.createElement('button');
    btnAvancar.textContent = '>'
    btnAvancar.classList.add('p-2', 'bg-gray-200', 'rounded'); // Estilo básico
    cabecalhoJogos.appendChild(btnAvancar);

    // Exemplo de card de jogo
    let containerJogo1 = document.createElement('div');
    containerJogo1.textContent = 'Time A vs Time B';
    containerJogo1.classList.add('p-4', 'border', 'rounded', 'bg-gray-50');
    containerJogos.appendChild(containerJogo1);

    let containerJogo2 = document.createElement('div');
    containerJogo2.textContent = 'Time C vs Time D';
    containerJogo2.classList.add('p-4', 'border', 'rounded', 'bg-gray-50');
    containerJogos.appendChild(containerJogo2);

    elementoPai.appendChild(containerJogos);
}



document.addEventListener("DOMContentLoaded", carregarDados());