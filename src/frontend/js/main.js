import { inicializarMapa } from "./map.js";
import { inicializarFiltros, obterFiltros } from "./filters.js";
import { buscarIndicadores, API_BASE_URL, ErroApi, verificarSaude } from "./api_client.js";

const esconder_mensagem_MS = 5000;

const caixaStatus = document.getElementById("status-api");
const tituloStatus = document.getElementById("status-titulo");
const mensagemStatus = document.getElementById("status-mensagem");
const botaoTentar = document.getElementById("status-tentar");
const {mapa, atualizarIndicadores} = inicializarMapa("mapa-brasil")

const Estado = Object.freeze({
    carregando : "carregando",
    sucesso: "sucesso",
    erro : "erro",
});

let timerSucesso = null;

function mostrarStatus(tipoestado,titulo,mensagem,{permitirNovaTentativa=false}={}){
    // só chamo quando tem erro
    clearTimeout(timerSucesso);
    caixaStatus.hidden=false;
    caixaStatus.dataset.estado=tipoestado;
    tituloStatus.textContent=titulo;
    mensagemStatus.textContent=mensagem;
    botaoTentar.hidden = !permitirNovaTentativa;

    //verifica se o estado mudou, ai faz a caixa status esconder com base no tempo esconder_mensagem_MS
    if(tipoestado === Estado.sucesso && esconder_mensagem_MS > 0){
        timerSucesso = setTimeout(()=>{caixaStatus.hidden=true;},esconder_mensagem_MS);
    }
}


//função que passsa por todos os tipos de erro decididos no api client e muda a mensagem especifica
//pra mostrar na pagina
function descreverErro(erro) {
    if (!(erro instanceof ErroApi)) {
        return "Ocorreu um erro inesperado. Tente novamente em instantes.";
    }
 
    switch (erro.tipo) {
        case "tempo_esgotado":
            return "O servidor demorou demais para responder. Tente novamente em instantes.";
        case "rede":
            return "Não foi possível conectar ao servidor de dados. Verifique sua conexão e tente novamente.";
        case "http":
            return erro.status >= 500
                ? "O servidor encontrou um problema ao processar o pedido. Tente novamente em instantes."
                : "O servidor não conseguiu atender ao pedido (código " + erro.status + ").";
        case "resposta_invalida":
            return "O servidor enviou uma resposta em um formato inesperado.";
        default:
            return "Ocorreu um erro inesperado. Tente novamente em instantes.";
    }
}
async function verificarConexaoApi(){
    mostrarStatus(Estado.carregando, "Carregando", "Verificando a conexão com a API.");
    try {
        await verificarSaude();
        mostrarStatus(Estado.sucesso, "Conectado", "Servidor online e pronto.");
    } catch (erro) {
        // Os detalhes técnicos vão para o console (para a equipe); o usuário vê só a mensagem simples.
        console.warn("[Brasil Hub] Falha ao consultar a API em " + API_BASE_URL + ":", erro);
        mostrarStatus(Estado.erro, "Servidor indisponível", descreverErro(erro), {
            permitirNovaTentativa: true,
        });
    }
}

function TentarNovamente(){
    verificarConexaoApi();
    aoMudarFiltros(obterFiltros());
}

function iniciar(){
    //aperta sozinho o tentar novamente pra garantir que ta funcionando
    botaoTentar.addEventListener("click", TentarNovamente);
    inicializarFiltros(aoMudarFiltros);
    verificarConexaoApi();
}

//filters ligação

const resumoFiltros = document.getElementById("filtros-resumo");
let ultimaRequisicao = 0;

function atualizarResumo(filtros) {
    if (!resumoFiltros) return;
    const partes = [];
    if (filtros.estado) partes.push("estado: " + filtros.estado);
    if (filtros.dimensao) partes.push("dimensão: " + filtros.dimensao);
    resumoFiltros.textContent = partes.length
    ? "Filtrando por " + partes.join(", ") + "."
    : "Escolha um estado e/ou uma dimensão para filtrar.";
}

async function aoMudarFiltros(filtros) {
    const idRequisicao = ++ultimaRequisicao;
    atualizarResumo(filtros);
    console.log("[Brasil Hub] filtros:", filtros); 

try {
    const dados = await buscarIndicadores(filtros);
    if (idRequisicao !== ultimaRequisicao) return; 
    console.log("[Brasil Hub] indicadores recebidos:", dados);

    if(!dados || dados.length === 0){
        mostrarStatus(Estado.erro, "Sem resultados", "Nenhum indicador encontrado para os filtros selecionados.");
        atualizarIndicadores([], filtros.dimensao);
    } else {
        atualizarIndicadores(dados, filtros.dimensao);
    }
} catch (erro) {
    if (idRequisicao !== ultimaRequisicao) return;
    mostrarStatus(Estado.erro, "Não foi possível aplicar os filtros", descreverErro(erro), {permitirNovaTentativa: true});
}
}

iniciar();