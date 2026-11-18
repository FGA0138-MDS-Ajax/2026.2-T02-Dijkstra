import { ESTADOS } from "./filters.js";
import { buscarHistorico, ErroApi } from "./api_client.js";
import { desenharGraficoLinha } from "./grafico_linha.js";

const ID_ESTADO = "linha-tempo-estado";
const ID_DIMENSAO = "linha-tempo-dimensao";
const ID_LIMPAR = "linha-tempo-limpar";
const ID_STATUS = "linha-tempo-status";
const ID_RESULTADO = "linha-tempo-resultado";
const ID_TITULO_RESULTADO = "linha-tempo-resultado-titulo";
const ID_GRAFICO = "linha-tempo-grafico";

function preencherSelectEstado(select, textoInicial) {
    select.replaceChildren(); // limpa o select
    select.add(new Option(textoInicial, "")); // primeira opção vazia (ex: "Selecione o estado")
    for (const { valor, rotulo } of ESTADOS) {
        select.add(new Option(`${rotulo} (${valor})`, valor));
    }
}   

const INDICADORES = [
    { chave: "idhm_geral",  rotulo: "IDHM Geral" },
    { chave: "renda",       rotulo: "IDHM Renda" },
    { chave: "educacao",    rotulo: "IDHM Educação" },
    { chave: "longevidade", rotulo: "IDHM Longevidade" },
];

function formatarValor(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "Sem dados";
}   

function preencherSelectDimensao(select, textoInicial) {
    select.replaceChildren();
    select.add(new Option(textoInicial, "")); // primeira opção vazia (ex: "Selecione a dimensão")
    for (const ind of INDICADORES) {
        select.add(new Option(ind.rotulo, ind.chave));
    }
}   

export function inicializarLinhaTempo() {
    const selectEstado = document.getElementById(ID_ESTADO);
    const selectDimensao = document.getElementById(ID_DIMENSAO);
    const botaoLimpar = document.getElementById(ID_LIMPAR);
    const status = document.getElementById(ID_STATUS);
    const resultado = document.getElementById(ID_RESULTADO);
    const tituloResultado = document.getElementById(ID_TITULO_RESULTADO);
    const grafico = document.getElementById(ID_GRAFICO);

    if (!selectEstado || !selectDimensao || !botaoLimpar || !status || !resultado || !tituloResultado || !grafico) {
        console.error("Elementos do DOM não encontrados para a linha do tempo.");
        return;
    }
    preencherSelectEstado(selectEstado, "Selecione o estado");
    preencherSelectDimensao(selectDimensao, "Selecione a dimensão");

    const MENSAGEM_INICIAL = status.textContent.trim();
    let requisicaoAtual = 0;

    async function atualizarResultado() {
        const id = ++requisicaoAtual;
        const estado = selectEstado.value;
        const dimensao = selectDimensao.value;

        if (!estado || !dimensao) {
            resultado.hidden = true;
            status.textContent = MENSAGEM_INICIAL;
            return;
        }

        status.textContent = "Carregando...";
        resultado.hidden = true;

        try {
            const historico = await buscarHistorico(estado, dimensao);
            if (id !== requisicaoAtual) return; // descarta resultados antigos

            if (!historico?.serie?.length) {
                status.textContent = "Não há dados históricos disponíveis para esse estado e dimensão.";
                return;
            }

            const rotulo = INDICADORES.find((ind) => ind.chave === dimensao)?.rotulo ?? dimensao;
            const nomeEstado = ESTADOS.find((e) => e.valor === estado)?.rotulo ?? estado;
            const identificacao = `${rotulo}, ${nomeEstado} (${estado})`;
            const primeiro = historico.serie[0].periodo;
            const ultimo = historico.serie[historico.serie.length - 1].periodo;

            tituloResultado.textContent = historico.unidade
                ? `${identificacao}, em ${historico.unidade}`
                : identificacao;
            desenharGraficoLinha(grafico, historico.serie, {
                unidade: historico.unidade,
                descricao: `Evolução de ${identificacao} de ${primeiro} a ${ultimo}.`,
            });
            status.textContent = `Exibindo a evolução de ${rotulo} em ${estado}, de ${primeiro} a ${ultimo}.`;
            resultado.hidden = false;
        } catch (erro) {
            if (id !== requisicaoAtual) return;
            resultado.hidden = true;
            status.textContent = erro instanceof ErroApi
                ? erro.message
                : "Não foi possível carregar a linha do tempo no momento.";
        }
    }

    selectEstado.addEventListener("change", atualizarResultado);
    selectDimensao.addEventListener("change", atualizarResultado);

    botaoLimpar.addEventListener("click", () => {
        selectEstado.value = "";
        selectDimensao.value = "";
        atualizarResultado();
    })
}