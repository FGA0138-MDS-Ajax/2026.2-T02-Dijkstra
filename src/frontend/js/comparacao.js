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

function renderizarComparacao(dados, containerResultado) {
    // montar os cards
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

    async function atualizarComparacao() {
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
            const periodo = dados.estados?.[0]?.periodo_referencia ?? "—";
            textoStatus.textContent = `Comparando ${estadoA} e ${estadoB} (Período de referência: ${periodo}).`;
            renderizarComparacao(dados, containerResultado);
        } catch (erro) {
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