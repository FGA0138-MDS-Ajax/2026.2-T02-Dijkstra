import { ESTADOS } from "./filters.js";
import { buscarComparacao, ErroApi } from "./api_client.js"

const ID_ESTADO_A = "comparacao-estado-a";
const ID_ESTADO_B = "comparacao-estado-b";
const ID_LIMPAR = "comparacao-limpar";
const ID_STATUS = "comparacao-status";
const ID_RESULTADO = "comparacao-resultado";

function preencherSelectEstado(select, textoInicial) {
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


    const INDICADORES = [
    { chave: "idhm_geral",  rotulo: "IDHM Geral" },
    { chave: "renda",       rotulo: "IDHM Renda" },
    { chave: "educacao",    rotulo: "IDHM Educação" },
    { chave: "longevidade", rotulo: "IDHM Longevidade" },
];

function formatarValor(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "Sem dados";
}

function criarCardEstado(estado) {
    const card = document.createElement("div");
    card.className = "comparacao__card";

    const nome = ESTADOS.find(e => e.valor === estado.estado)?.rotulo ?? estado.estado;
    const titulo = document.createElement("h3");
    titulo.textContent = `${nome} (${estado.estado})`;
    card.append(titulo);

    const anoBase = document.createElement("p");
    anoBase.textContent = "Ano base: " + (estado.periodo_referencia ?? "—");
    card.append(anoBase);

    for (const ind of INDICADORES) {
        const dado = estado.indicadores?.[ind.chave];
        const linha = document.createElement("p");
        linha.className = "comparacao__item";
        let texto = `${ind.rotulo}: ${formatarValor(dado?.valor)}`;
        if (typeof dado?.valor === "number" && dado.unidade_medida) {
            texto += ` (${dado.unidade_medida})`;
        }
        linha.textContent = texto;
        card.append(linha);
    }

    return card;
}

function renderizarComparacao(dados, containerResultado) {
    containerResultado.replaceChildren();
    for (const estado of dados.estados ?? []) {
        containerResultado.append(criarCardEstado(estado));
    }
    containerResultado.hidden = false;
}

export function inicializarComparacao() {
    const selectA = document.getElementById(ID_ESTADO_A);
    const selectB = document.getElementById(ID_ESTADO_B);
    const botaoLimpar = document.getElementById(ID_LIMPAR);
    const textoStatus = document.getElementById(ID_STATUS);
    const containerResultado = document.getElementById(ID_RESULTADO);

    if (!selectA || !selectB || !textoStatus || !containerResultado) return;

    preencherSelectEstado(selectA, "Selecione o 1º estado");
    preencherSelectEstado(selectB, "Selecione o 2º estado");


    let requisicaoAtual = 0;

    async function atualizarComparacao() {
        const id = ++requisicaoAtual;
        bloquearEstadoRepetido(selectA, selectB);

        const estadoA = selectA.value;
        const estadoB = selectB.value;

        if (!estadoA || !estadoB) {
            containerResultado.hidden = true;
            textoStatus.textContent = "Selecione dois estados diferentes para comparar seus indicadores lado a lado.";
            return;
        }

        textoStatus.textContent = `Carregando comparação entre ${estadoA} e ${estadoB}...`;
        containerResultado.hidden = true;

        try {
            const dados = await buscarComparacao(estadoA, estadoB);
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

    botaoLimpar?.addEventListener("click", () => {
        selectA.value = "";
        selectB.value = "";
        atualizarComparacao();
    });
}