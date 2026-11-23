import { inicializarMapa } from "./map.js";
import { inicializarFiltros, obterFiltros } from "./filters.js";
import { buscarIndicadores, API_BASE_URL, ErroApi, verificarSaude } from "./api_client.js";
import { inicializarComparacao } from "./comparacao.js";
import { inicializarPainelExportacao } from "./export_panel.js";

import { inicializarLinhaTempo } from "./linha_tempo.js";
import { inicializarVisualizacao } from "./visualizacao.js";

const esconder_mensagem_MS = 5000;

const caixaStatus = document.getElementById("status-api");
const tituloStatus = document.getElementById("status-titulo");
const mensagemStatus = document.getElementById("status-mensagem");
const botaoTentar = document.getElementById("status-tentar");
const botaoExportar = document.getElementById("btn-exportar-csv");



const { mapa, atualizarIndicadores } = inicializarMapa("mapa-brasil", {
    aoCarregarDadosIniciais(dados) {
        if (ultimaRequisicao > 0) return;
        dadosFiltradosAtuais = Array.isArray(dados) ? dados : [];
        atualizarEstadoExportacao();
    },
    aoClicarEstado: aoClicarNoMapa,
});

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

function sincronizarPeriodoVisualizacao(selectPeriodo, anoAlvo) {
    if (!anoAlvo) return;
    const existeOpcao = [...selectPeriodo.options].some(opt => opt.value === String(anoAlvo));
    if (existeOpcao && selectPeriodo.value !== String(anoAlvo)) {
        selectPeriodo.value = String(anoAlvo);
        selectPeriodo.dispatchEvent(new Event("change"));
    }
}

function aplicarPadraoEvolucao() {
    const selectEstado = document.getElementById("linha-tempo-estado");
    const selectDimensao = document.getElementById("linha-tempo-dimensao");
    const selectVisEstado = document.getElementById("visualizacao-estado");
    const selectPeriodo = document.getElementById("visualizacao-periodo");
    
    if (!selectEstado || !selectDimensao) return;

    const opcaoValida = [...selectEstado.options].find(o => o.value !== "");
    if (!opcaoValida) return;

    selectEstado.value = opcaoValida.value;
    selectDimensao.value = "idhm_geral";
    selectEstado.dispatchEvent(new Event("change"));

    if (selectVisEstado) {
        selectVisEstado.value = opcaoValida.value;
        selectVisEstado.dispatchEvent(new Event("change"));
    }

    if (selectPeriodo) {
        const escolherAnoMaisRecente = () => {
            const anos = [...selectPeriodo.options].map(o => Number(o.value)).filter(a => a > 0);
            if (anos.length) {
                sincronizarPeriodoVisualizacao(selectPeriodo, Math.max(...anos));
            }
        };
        setTimeout(escolherAnoMaisRecente, 200);
    }
}

function espelharEstadoNaVisualizacao() {
    const selectEstado = document.getElementById("linha-tempo-estado");
    const selectVisEstado = document.getElementById("visualizacao-estado");
    if (!selectEstado || !selectVisEstado) return;

    selectEstado.addEventListener("change", (evento) => {
        if (!evento.isTrusted) return; // mudanças feitas pelo código (mapa, padrão) já se cuidam
        selectVisEstado.value = selectEstado.value;
        selectVisEstado.dispatchEvent(new Event("change"));
    });
}

function preencherSecoesDoEstado(uf, ano, dimensao = "idhm_geral") {
    if (!uf) return;

    // 1. Linha do Tempo
    const selectLinhaEstado = document.getElementById("linha-tempo-estado");
    const selectLinhaDimensao = document.getElementById("linha-tempo-dimensao");

    if (selectLinhaEstado && selectLinhaDimensao) {
        selectLinhaEstado.value = uf;
        // se a dimensão do filtro não existir no select da linha do tempo, usa IDHM geral
        const temDimensao = [...selectLinhaDimensao.options].some(o => o.value === dimensao);
        selectLinhaDimensao.value = temDimensao ? dimensao : "idhm_geral";
        selectLinhaEstado.dispatchEvent(new Event("change"));
    }

    // 2. Tabela e gráfico do estado
    const selectVisEstado = document.getElementById("visualizacao-estado");
    const selectVisPeriodo = document.getElementById("visualizacao-periodo");

    if (selectVisEstado && selectVisPeriodo) {
        // se o estado já é o mesmo, não haverá recarga de períodos: só sincroniza o ano
        if (selectVisEstado.value === uf) {
            sincronizarPeriodoVisualizacao(selectVisPeriodo, ano);
            return;
        }

        const observer = new MutationObserver(() => {
            if (!selectVisPeriodo.disabled && selectVisPeriodo.options.length > 0) {
                observer.disconnect();
                sincronizarPeriodoVisualizacao(selectVisPeriodo, ano);
            }
        });
        observer.observe(selectVisPeriodo, {
            childList: true,
            attributes: true,
            attributeFilter: ["disabled"],
        });
        setTimeout(() => observer.disconnect(), 8000);

        selectVisEstado.value = uf;
        selectVisEstado.dispatchEvent(new Event("change"));
    }
}

function aoClicarNoMapa(uf, anoAtualMapa) {
    preencherSecoesDoEstado(uf, anoAtualMapa);
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
        return true;
    } catch (erro) {
        // Os detalhes técnicos vão para o console (para a equipe); o usuário vê só a mensagem simples.
        console.warn("[Brasil Hub] Falha ao consultar a API em " + API_BASE_URL + ":", erro);
        mostrarStatus(Estado.erro, "Servidor indisponível", descreverErro(erro), {
            permitirNovaTentativa: true,
        });
        return false;
    }
}

async function TentarNovamente() {
    const servidorOnline = await verificarConexaoApi();
    
    if (servidorOnline) {
        await aoMudarFiltros(obterFiltros());
    }
}

function iniciar(){
    //aperta sozinho o tentar novamente pra garantir que ta funcionando
    botaoTentar.addEventListener("click", TentarNovamente);
    inicializarPainelExportacao({
        botaoAbrir: botaoExportar,
        obterFiltrosAtuais: () => filtrosAtuais,
    });
    inicializarFiltros(aoMudarFiltros);
    verificarConexaoApi();
    inicializarComparacao();
    inicializarLinhaTempo();
    inicializarVisualizacao();
    espelharEstadoNaVisualizacao();
    
    document.getElementById("linha-tempo-limpar")?.addEventListener("click", (e) => {
        e.preventDefault();
        aplicarPadraoEvolucao();
    });    
    
    setTimeout(() => {
        aplicarPadraoEvolucao();
    }, 300);
}

let dadosFiltradosAtuais = [];
let filtrosAtuais = {};

//filters ligação

const resumoFiltros = document.getElementById("filtros-resumo");
let ultimaRequisicao = 0;

function atualizarResumo(filtros) {
    if (!resumoFiltros) return;
    const partes = [];
    if (filtros.estado) partes.push("estado: " + filtros.estado);
    if (filtros.dimensao) partes.push("dimensão: " + filtros.dimensao);
    if (filtros.periodo) partes.push("periodo: " + filtros.periodo);
    resumoFiltros.textContent = partes.length
    ? "Filtrando por " + partes.join(", ") + "."
    : "Escolha um estado e/ou uma dimensão para filtrar.";
}

async function aoMudarFiltros(filtros) {
    const idRequisicao = ++ultimaRequisicao;
    filtrosAtuais = filtros;
    atualizarResumo(filtros);
    console.log("[Brasil Hub] filtros:", filtros);

    try {
        const dados = await buscarIndicadores(filtros);
        if (idRequisicao !== ultimaRequisicao) return;
        console.log("[Brasil Hub] indicadores recebidos:", dados);

        dadosFiltradosAtuais = Array.isArray(dados) ? dados : [];
        atualizarEstadoExportacao();

        if (dadosFiltradosAtuais.length === 0) {
            mostrarStatus(Estado.erro, "Sem resultados", "Nenhum indicador encontrado para os filtros selecionados.");
            atualizarIndicadores([], filtros.dimensao, filtros.estado);
        } else {
            if(caixaStatus.dataset.estado === Estado.erro){
                caixaStatus.hidden = true;
            }
            atualizarIndicadores(dadosFiltradosAtuais, filtros.dimensao, filtros.estado);
            if(filtros.estado){
                const anos = dadosFiltradosAtuais.map(d => String(d.periodo_referencia)).sort();
                const anoMapa = anos[anos.length - 1];
                preencherSecoesDoEstado(filtros.estado, anoMapa);
            }
        }
    } catch (erro) {
        if (idRequisicao !== ultimaRequisicao) return;
        dadosFiltradosAtuais = [];
        atualizarEstadoExportacao();
        mostrarStatus(Estado.erro, "Não foi possível aplicar os filtros", descreverErro(erro), {
            permitirNovaTentativa: true,
        });
    }
}

///exportar csv

function atualizarEstadoExportacao(){
        if(!botaoExportar) return;
        const semRegistros = dadosFiltradosAtuais.length === 0;
        botaoExportar.disabled = semRegistros;
        botaoExportar.title = semRegistros
            ? "Não há registros disponíveis para os filtros atuais"
            : `Exportar ${dadosFiltradosAtuais.length} registros em CSV`;
}

iniciar();