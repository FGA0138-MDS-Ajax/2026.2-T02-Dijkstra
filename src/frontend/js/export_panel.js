import { ESTADOS, DIMENSOES } from "./filters.js";
import { buscarIndicadores } from "./api_client.js";
import { exportarDadosCSV, filtrarParaExportacao } from "./export.js";

function criarOpcoes(container, opcoes, marcados, aoMudar) {
    container.replaceChildren();
    for (const { valor, rotulo } of opcoes) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = valor;
        input.checked = marcados.includes(valor);
        input.addEventListener("change", aoMudar);
        label.append(input, rotulo);
        container.append(label);
    }
}

function lerMarcados(container) {
    return [...container.querySelectorAll("input:checked")].map((i) => i.value);
}

export function inicializarPainelExportacao({ botaoAbrir, obterFiltrosAtuais }) {
    const dialogo = document.getElementById("dialogo-exportar");
    const resumo = document.getElementById("exportar-resumo");
    const botaoBaixar = document.getElementById("exportar-baixar");
    const botaoFechar = document.getElementById("exportar-fechar");
    const botaoLimpar = document.getElementById("exportar-limpar");
    const grupos = {
        estados: document.querySelector("#exportar-estados .exportar__opcoes"),
        periodos: document.querySelector("#exportar-periodos .exportar__opcoes"),
        dimensoes: document.querySelector("#exportar-dimensoes .exportar__opcoes"),
    };
    if (!botaoAbrir || !dialogo || !botaoBaixar) return;

    let todos = [];

    const selecao = () => ({
        estados: lerMarcados(grupos.estados),
        periodos: lerMarcados(grupos.periodos),
        dimensoes: lerMarcados(grupos.dimensoes),
    });

    function atualizarResumo() {
        const total = filtrarParaExportacao(todos, selecao()).length;
        botaoBaixar.disabled = total === 0;
        resumo.textContent = total === 0
            ? "Nenhum registro encontrado para essa seleção."
            : `${total} registros serão exportados.`;
    }

    botaoAbrir.addEventListener("click", async () => {
        const filtros = obterFiltrosAtuais();
        botaoBaixar.disabled = true;
        resumo.textContent = "Carregando dados...";
        dialogo.showModal();

        try {
            todos = (await buscarIndicadores()) ?? [];
        } catch {
            todos = [];
            resumo.textContent = "Não foi possível carregar os dados para exportação. Tente novamente.";
            return;
        }

        const periodos = [...new Set(todos.map((r) => String(r.periodo_referencia)))].sort().reverse();
        criarOpcoes(
            grupos.estados,
            ESTADOS.map((e) => ({ valor: e.valor, rotulo: `${e.rotulo} (${e.valor})` })),
            filtros.estado ? [filtros.estado] : [],
            atualizarResumo,
        );
        criarOpcoes(
            grupos.periodos,
            periodos.map((ano) => ({ valor: ano, rotulo: ano })),
            filtros.periodo ? [filtros.periodo] : [],
            atualizarResumo,
        );
        criarOpcoes(
            grupos.dimensoes,
            DIMENSOES,
            filtros.dimensao ? [filtros.dimensao] : [],
            atualizarResumo,
        );
        atualizarResumo();
    });

    botaoBaixar.addEventListener("click", () => {
        const escolha = selecao();
        if (exportarDadosCSV(filtrarParaExportacao(todos, escolha), escolha)) {
            dialogo.close();
        }
    });

    botaoLimpar?.addEventListener("click", () => {
        dialogo.querySelectorAll("input:checked").forEach((i) => { i.checked = false; });
        atualizarResumo();
    });

    botaoFechar?.addEventListener("click", () => dialogo.close());
}