// Visualização dos indicadores de um estado em tabela e gráfico de barras (S7-04 / B-10).
//
// Decisão: buscamos uma vez por estado (todas as dimensões e períodos) e filtramos o
// período no front. Trocar de período é instantâneo, não gera nova requisição, e
// tabela e gráfico sempre leem a mesma lista normalizada.

import { ESTADOS } from "./filters.js";
import { buscarIndicadoresEstado, ErroApi } from "./api_client.js";
import { renderizarGrafico } from "./grafico.js";

export const DIMENSOES = ["idhm_geral", "educacao", "longevidade", "renda"];

const ROTULOS = {
    idhm_geral: "IDHM Geral",
    educacao: "IDHM Educação",
    longevidade: "IDHM Longevidade",
    renda: "IDHM Renda",
};


export function formatarValor(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "Sem dados";
}

function nomeEstado(uf) {
    return ESTADOS.find((e) => e.valor === uf)?.rotulo ?? uf;
}


export function periodosDisponiveis(registros) {
    const periodos = new Set((registros ?? []).map((r) => String(r.periodo_referencia)));
    return [...periodos].sort((a, b) => Number(b) - Number(a));
}

 
export function normalizar(registros, periodo) {
    const periodoTexto = String(periodo);
    const doPeriodo = (registros ?? []).filter((r) => String(r.periodo_referencia) === periodoTexto);

    return DIMENSOES.map((dimensao) => {
        const registro = doPeriodo.find((r) => r.dimensao === dimensao);
        return {
            dimensao,
            rotulo: ROTULOS[dimensao],
            valor: registro?.valor ?? null,
            unidade_medida: registro?.unidade_medida ?? null,
            periodo_referencia: periodoTexto,
        };
    });
}

function celula(tag, texto, atributos = {}) {
    const el = document.createElement(tag);
    el.textContent = texto;
    for (const [nome, valor] of Object.entries(atributos)) el.setAttribute(nome, valor);
    return el;
}

// A tabela também é a alternativa textual do gráfico.
export function renderizarTabela(container, itens, { uf, periodo } = {}) {
    const tabela = document.createElement("table");
    tabela.className = "visualizacao__tabela";
    tabela.createCaption().textContent =
        `Indicadores de ${nomeEstado(uf)} (${uf}), período de referência ${periodo}`;

    const cabecalho = tabela.createTHead().insertRow();
    for (const titulo of ["Indicador", "Valor", "Unidade", "Período"]) {
        cabecalho.append(celula("th", titulo, { scope: "col" }));
    }

    const corpo = tabela.createTBody();
    for (const item of itens) {
        const ausente = item.valor === null;
        corpo.insertRow().append(
            celula("th", item.rotulo, { scope: "row" }),
            celula("td", formatarValor(item.valor), ausente ? { class: "visualizacao__sem-dados" } : {}),
            celula("td", ausente ? "—" : (item.unidade_medida ?? "—")),
            celula("td", item.periodo_referencia),
        );
    }
    container.replaceChildren(tabela);
}

export function inicializarVisualizacao() {
    const selectEstado = document.getElementById("visualizacao-estado");
    const selectPeriodo = document.getElementById("visualizacao-periodo");
    const textoStatus = document.getElementById("visualizacao-status");
    const textoErro = document.getElementById("visualizacao-erro");
    const resultado = document.getElementById("visualizacao-resultado");
    const containerTabela = document.getElementById("visualizacao-tabela");
    const containerGrafico = document.getElementById("visualizacao-grafico");

    // se a seção não existir na página, não faz nada (mesmo padrão do #76)
    if (!selectEstado || !selectPeriodo || !textoStatus || !textoErro
        || !resultado || !containerTabela || !containerGrafico) return;

    selectEstado.replaceChildren(new Option("Selecione um estado", ""));
    for (const { valor, rotulo } of ESTADOS) {
        selectEstado.add(new Option(`${rotulo} (${valor})`, valor));
    }

    let registrosAtuais = [];   // resposta da API para o estado atual (todos os períodos)
    let requisicaoAtual = 0;    // contador contra resposta atrasada

    function mostrarStatus(texto) {
        textoErro.hidden = true;
        textoStatus.textContent = texto;
    }

    function mostrarErro(texto) {
        resultado.hidden = true;
        textoStatus.textContent = "";
        textoErro.textContent = texto;
        textoErro.hidden = false;
    }

    function preencherPeriodos(periodos) {
        selectPeriodo.replaceChildren();
        for (const periodo of periodos) selectPeriodo.add(new Option(periodo, periodo));
        selectPeriodo.disabled = periodos.length === 0;
        if (periodos.length) selectPeriodo.value = periodos[0]; // o mais recente
    }

    // roda ao trocar o período: só filtra o que já está em memória, sem nova requisição
    function renderizar() {
        const uf = selectEstado.value;
        const periodo = selectPeriodo.value;
        const itens = normalizar(registrosAtuais, periodo);

        if (itens.every((item) => item.valor === null)) {
            resultado.hidden = true;
            mostrarStatus(`Não há dados de ${nomeEstado(uf)} para o período ${periodo}.`);
            return;
        }

        // tabela e gráfico recebem exatamente a mesma lista
        renderizarTabela(containerTabela, itens, { uf, periodo });
        renderizarGrafico(containerGrafico, itens, { uf, ano: periodo });
        resultado.hidden = false;
        mostrarStatus(`Exibindo indicadores de ${nomeEstado(uf)} (${uf}) em ${periodo}.`);
    }

    // roda ao trocar o estado: faz a requisição
    async function aoMudarEstado() {
        const id = ++requisicaoAtual;
        const uf = selectEstado.value;

        registrosAtuais = [];
        preencherPeriodos([]);
        resultado.hidden = true;

        if (!uf) {
            mostrarStatus("Selecione um estado para ver seus indicadores em tabela e gráfico.");
            return;
        }

        mostrarStatus(`Carregando indicadores de ${nomeEstado(uf)}...`);

        try {
            const dados = await buscarIndicadoresEstado(uf);
            if (id !== requisicaoAtual) return;   // chegou atrasada: já trocaram de estado

            registrosAtuais = Array.isArray(dados) ? dados : [];
            const periodos = periodosDisponiveis(registrosAtuais);
            if (periodos.length === 0) {
                mostrarStatus(`Nenhum indicador encontrado para ${nomeEstado(uf)}.`);
                return;
            }
            preencherPeriodos(periodos);
            renderizar();
        } catch (erro) {
            if (id !== requisicaoAtual) return;
            mostrarErro(erro instanceof ErroApi
                ? erro.message
                : "Não foi possível carregar os indicadores no momento.");
        }
    }

    selectEstado.addEventListener("change", aoMudarEstado);
    selectPeriodo.addEventListener("change", renderizar);
}
