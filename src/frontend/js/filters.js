const ID_ESTADO = "filtro-estado";
const ID_DIMENSAO = "filtro-dimensao";
const ID_LIMPAR = "filtro-limpar";

export const ESTADOS = [
    { valor: "AC", rotulo: "Acre" },
    { valor: "AL", rotulo: "Alagoas" },
    { valor: "AP", rotulo: "Amapá" },
    { valor: "AM", rotulo: "Amazonas" },
    { valor: "BA", rotulo: "Bahia" },
    { valor: "CE", rotulo: "Ceará" },
    { valor: "DF", rotulo: "Distrito Federal" },
    { valor: "ES", rotulo: "Espírito Santo" },
    { valor: "GO", rotulo: "Goiás" },
    { valor: "MA", rotulo: "Maranhão" },
    { valor: "MT", rotulo: "Mato Grosso" },
    { valor: "MS", rotulo: "Mato Grosso do Sul" },
    { valor: "MG", rotulo: "Minas Gerais" },
    { valor: "PA", rotulo: "Pará" },
    { valor: "PB", rotulo: "Paraíba" },
    { valor: "PR", rotulo: "Paraná" },
    { valor: "PE", rotulo: "Pernambuco" },
    { valor: "PI", rotulo: "Piauí" },
    { valor: "RJ", rotulo: "Rio de Janeiro" },
    { valor: "RN", rotulo: "Rio Grande do Norte" },
    { valor: "RS", rotulo: "Rio Grande do Sul" },
    { valor: "RO", rotulo: "Rondônia" },
    { valor: "RR", rotulo: "Roraima" },
    { valor: "SC", rotulo: "Santa Catarina" },
    { valor: "SP", rotulo: "São Paulo" },
    { valor: "SE", rotulo: "Sergipe" },
    { valor: "TO", rotulo: "Tocantins" },
];

export const DIMENSOES = [
    { valor: "renda", rotulo: "Renda" },
    { valor: "educacao", rotulo: "Educação" },
    { valor: "longevidade", rotulo: "Longevidade" },
];

export function normalizarFiltros(valores) {
    const filtros = {};
    for (const [chave, valor] of Object.entries(valores)) {
        if (valor === null || valor === undefined) continue;
        const texto = String(valor).trim();
        if (texto !== "") filtros[chave] = texto;
    }
    return filtros;
}

export function obterFiltros() {
    return normalizarFiltros({
        estado: document.getElementById(ID_ESTADO)?.value,
        dimensao: document.getElementById(ID_DIMENSAO)?.value,
    });
}

export function limparFiltros() {
    for (const id of [ID_ESTADO, ID_DIMENSAO]) {
        const select = document.getElementById(id);
        if (select) select.value = "";
    }
}

function preencherSelect(select, opcoes, rotuloTodos) {
    select.replaceChildren();
    select.add(new Option(rotuloTodos, ""));
    for (const { valor, rotulo } of opcoes) {
        select.add(new Option(rotulo, valor));
    }
}

export function inicializarFiltros(aoMudar) {
    const selectEstado = document.getElementById(ID_ESTADO);
    const selectDimensao = document.getElementById(ID_DIMENSAO);
    const botaoLimpar = document.getElementById(ID_LIMPAR);

    if (!selectEstado || !selectDimensao) {
        console.warn("[Brasil Hub] Elementos de filtro não encontrados no HTML.");
        return;
    }

    preencherSelect(selectEstado, ESTADOS, "Todos os estados");
    preencherSelect(selectDimensao, DIMENSOES, "Todas as dimensões");

    const avisar = () => aoMudar(obterFiltros());
    selectEstado.addEventListener("change", avisar);
    selectDimensao.addEventListener("change", avisar);

    botaoLimpar?.addEventListener("click", () => {
        limparFiltros();
        avisar();
    });
}