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
        const timesGrupo = classificacaoData.filter(time => time.grupo === element).sort((a,b)=>{
            if (a.P > b.P) return -1;
            if (a.P < b.P) return 1;
            if (a.SG > b.SG) return -1;
            
            if (a.SG < b.SG) return 1;

            if (a.GP > b.GP) return -1;
            if (a.GP < b.GP) return 1;

            return 0;

        });
        renderizarLinhasTime(classificacao, timesGrupo);

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

function gerarJogos(grupo, todosOsJogos){
    return
}



document.addEventListener("DOMContentLoaded", carregarDados());