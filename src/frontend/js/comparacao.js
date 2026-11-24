import { ESTADOS } from "./filters.js";
import { buscarComparacao, buscarHistorico, ErroApi } from "./api_client.js"

const ID_ESTADO_A = "comparacao-estado-a";
const ID_ESTADO_B = "comparacao-estado-b";
const ID_LIMPAR = "comparacao-limpar";
const ID_STATUS = "comparacao-status";
const ID_RESULTADO = "comparacao-resultado";
const ID_ANO_COMP = "comparacao-ano";

function preencherSelectEstadoComp(select, textoInicial) {
    select.replaceChildren(); // limpa o select
    select.add(new Option(textoInicial, "")); // primeira opção vazia (ex: "Selecione o 1º estado")
    for (const { valor, rotulo } of ESTADOS) {
        select.add(new Option(`${rotulo} (${valor})`, valor));
    }
}

function bloquearEstadoRepetido(selectA, selectB) {
    const estadoA = selectA.value;
    const estadoB = selectB.value;

    for (const opcao of selectA.options) {
        opcao.disabled = opcao.value !== "" && opcao.value === estadoB;
    }

    for (const opcao of selectB.options) {
        opcao.disabled = opcao.value !== "" && opcao.value === estadoA;
    }
}


    const INDICADORES_COMP = [
    { chave: "idhm_geral",  rotulo: "IDHM Geral" },
    { chave: "renda",       rotulo: "IDHM Renda" },
    { chave: "educacao",    rotulo: "IDHM Educação" },
    { chave: "longevidade", rotulo: "IDHM Longevidade" },
];

function formatarValorComp(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "Sem dados";
}

function resetarAnoComp(select) {
    select.replaceChildren();
    select.add(new Option("Ano", ""));
    select.disabled = true;
}

function preencherSelectAnoComp(select, anos) {
    const anterior = select.value;
    if (!anos.length) { resetarAnoComp(select); return; }
    select.replaceChildren();
    for (const ano of anos) select.add(new Option(ano, ano));
    select.disabled = false;
    if (anos.includes(anterior)) select.value = anterior;
}

async function buscarAnosComuns(estadoA, estadoB) {
    const [a, b] = await Promise.all([
        buscarHistorico(estadoA, "idhm_geral"),
        buscarHistorico(estadoB, "idhm_geral"),
    ]);
    const anosA = new Set((a?.serie ?? []).map(p => String(p.periodo)));
    return (b?.serie ?? [])
        .map(p => String(p.periodo))
        .filter(ano => anosA.has(ano))
        .sort((x, y) => Number(y) - Number(x));

}


function criarCardEstadoComp(estado) {
    const card = document.createElement("div");
    card.className = "comparacao__card";

    const nome = ESTADOS.find(e => e.valor === estado.estado)?.rotulo ?? estado.estado;
    const titulo = document.createElement("h3");
    titulo.textContent = `${nome} (${estado.estado}) · ${estado.periodo_referencia ?? "—"}`;
    card.append(titulo);

    for (const ind of INDICADORES_COMP) { 
        const dado = estado.indicadores?.[ind.chave];
        const linha = document.createElement("div");
        linha.className = "comparacao__linha";
        linha.dataset.indicador = ind.chave;

        const rotulo = document.createElement("span");
        rotulo.textContent = ind.rotulo;

        const valor = document.createElement("span");
        valor.className = "comparacao__valor";
        let texto = formatarValorComp(dado?.valor); 
        if (typeof dado?.valor === "number" && dado.unidade_medida) {
            texto += ` (${dado.unidade_medida})`;
        }
        valor.textContent = texto;
        valor.dataset.valor = typeof dado?.valor === "number" ? dado.valor : "";

        linha.append(rotulo, valor);
        card.append(linha);
    }
    return card;
}

function destacarMaioresComp(cards) {
    if (cards.length !== 2) return;
    for (const ind of INDICADORES_COMP) {
        const valores = cards.map(c => c.querySelector(`[data-indicador="${ind.chave}"] .comparacao__valor`));
        const [a, b] = valores.map(v => (!v || v.dataset.valor === "") ? NaN : Number(v.dataset.valor));
        if (Number.isNaN(a) || Number.isNaN(b) || a === b) continue;
        valores[a > b ? 0 : 1].classList.add("comparacao__valor--maior");
    }
}

function renderizarComparacao(dados, containerResultado) {
    containerResultado.replaceChildren();
    const cards = [];
    for (const estado of dados.estados ?? []) {
        const card = criarCardEstadoComp(estado);
        cards.push(card);
        containerResultado.append(card);
    }
    destacarMaioresComp(cards);
    containerResultado.hidden = false;
}

export function inicializarComparacao() {
    const selectA = document.getElementById(ID_ESTADO_A);
    const selectB = document.getElementById(ID_ESTADO_B);
    const selectAno = document.getElementById(ID_ANO_COMP);
    const botaoLimpar = document.getElementById(ID_LIMPAR);
    const textoStatus = document.getElementById(ID_STATUS);
    const containerResultado = document.getElementById(ID_RESULTADO);

    if (!selectA || !selectB || !selectAno || !textoStatus || !containerResultado) return;

    preencherSelectEstadoComp(selectA, "Selecione o 1º estado");
    preencherSelectEstadoComp(selectB, "Selecione o 2º estado");
    resetarAnoComp(selectAno);

    let requisicaoAtual = 0;
    let parCarregado = "";



    async function atualizarComparacao() {
        const id = ++requisicaoAtual;
        bloquearEstadoRepetido(selectA, selectB);

        const estadoA = selectA.value;
        const estadoB = selectB.value;

        if (!estadoA || !estadoB) {
            parCarregado = "";
            resetarAnoComp(selectAno);
            containerResultado.hidden = true;
            textoStatus.textContent = "Selecione dois estados diferentes para comparar seus indicadores lado a lado.";
            return;
        }

        textoStatus.textContent = `Carregando comparação entre ${estadoA} e ${estadoB}...`;
        containerResultado.hidden = true;

        try {
            const par = `${estadoA}|${estadoB}`;
            if (par !== parCarregado) {
                const anos = await buscarAnosComuns(estadoA, estadoB);
                if (id !== requisicaoAtual) return;
                preencherSelectAnoComp(selectAno, anos);
                parCarregado = par;
                if (!anos.length) {
                    textoStatus.textContent = "Esses dois estados não têm nenhum ano em comum.";
                    return;
                }
            }

            const ano = selectAno.value;
            const dados = await buscarComparacao(estadoA, estadoB, { periodoA: ano || null, periodoB: ano || null});
            if (id !== requisicaoAtual) return;
            const periodo = dados.estados?.[0]?.periodo_referencia ?? "—";
            textoStatus.textContent = `Comparando ${estadoA} e ${estadoB} (Período de referência: ${periodo}).`;
            renderizarComparacao(dados, containerResultado);
        } catch (erro) {
            if (id !== requisicaoAtual) return;
            containerResultado.hidden = true;
            textoStatus.textContent = erro instanceof ErroApi
                ? erro.message
                : "Não foi possível carregar a comparação no momento.";
        }
    }

    selectA.addEventListener("change", atualizarComparacao);
    selectB.addEventListener("change", atualizarComparacao);
    selectAno.addEventListener("change", atualizarComparacao);

    botaoLimpar?.addEventListener("click", () => {
        selectA.value = "";
        selectB.value = "";
        atualizarComparacao();
    });
}