// grafico de barra dos indicadores (HTML/CSS) 
// decidi nao fazer com SVG/CSS para melhorar responsividade mobile

const ESCALA_GRAFICO = [0, 0.25, 0.5, 0.75, 1];

const ROTULOS = {
    idhm_geral: "IDHM GERAL",
    renda: "Renda",
    educacao: "Educação",
    longevidade: "Longevidade"
};

const formatarValor = (valor) =>
    valor.toLocaleString("pt-BR", {style: "percent", minimumFractionDigits: 3, maximumFractionDigits: 3});

const formatarMarca = (valor) =>
    valor.toLocaleString("pt-BR", {style: "percent", minimumFractionDigits: 0, maximumFractionDigits: 2});

// normaliza o valor para entre 0 e 1 - null ou undefined vira null
function normalizarValor(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
        }
    const n = Number(valor);
    return Number.isFinite(n) ? n : null;

}

function rotuloDe(item) {
    return item.ROTULOS ?? ROTULOS[item.dimensao] ?? String(item.dimensao ?? "Indicador");
}

function criar(tag, item, texto) {
    const novo = document.createElement(tag);
    if (classe) { 
        novo.className = classe;
    }
    if (texto !== undefined) {
        novo.textContent = texto;
    }
    return novo;
}

function montarLinha({rotulo, valor}) {
    const linha = criar("div", "linha");
    const trilho = criar("div", "trilho");
    const campoValor = criar("div", "campo-valor", formatarValor(valor));

    if (valor === null) {
        trilho.classList.add("vazio");
        trilho.append(criar("span", "grafico-sem-dados", "Sem dados"));
        campoValor.textContent = "";
    } else {
        const barra = criar("span", "barra");
        const proporcao = Math.min(Math.max(valor, 0), 1); // escala 0-1
        barra.style.width = `${proporcao * 100}%`;
        trilho.append(barra);
        campoValor.textContent = formatarValor(valor);
    }

    linha.append(criar("span", "grafico-rotulo", rotulo), trilho, campoValor);
    return linha;
}

function montarEixo() {
    const eixo = criar("div", "eixo");
    const linha = criar("div", "linha-eixo");
    MARCAS.forEach((m, i) => {
        const marca = criar("span", "marca-eixo", formatarMarca(m));
        marca.style.left = `${m * 100}%`;
        if (i === 0) {
            marca.classList.add("inicio");
        }
        if (i === MARCAS.length - 1) {
            marca.classList.add("fim");
        }
        eixo.append(marca);
    });
    linha.append(eixo);
    return linha;
}

/**
 *  @param {HTMLElement} container
 *  @param {Array<{dimensao: string, valor:number|null, periodo_referencia?: string|number, rotulo?:string}>} itens
 *  @param {uf?: string, ano? string|number}} [contexto] usado so no aria-label
 */
export function renderizarGrafico(container, itens, contexto = {}) {
    const dados = (itens ?? []).map((item) => ({
        rotulo: rotuloDe(item),
        valor: normalizarValor(item.valor),
    }));

    // sem itens ou tudo null - vazio
    if (dados.every((d) => d.valor === null)) {
        container.removeAttribute("role");
        container.removeAttribute("aria-label");
        const msg = criar("p", "grafico-sem-dados", "Sem dados disponíveispara exibir");
        msg.setAtribute("role", "status");
        container.replaceChildren(msg);
        return;
    }

    const grafico = criar("div", "grafico");
    dados.forEach((d) => grafico.append(montarLinha(d)));
    grafico.append(montarEixo());
    grafico.append(criar("p", "grafico-legenda", "escala de 0 a 1"));

    // acessibilidade: container -> texto
    const onde = contexto.uf ? `de ${contexto.uf}` : "";
    const quando = contexto.ano ? `em ${contexto.ano}` : "";
    const resumo = dados.map((d) => `${d.rotulo}: ${d.valor === null ? "sem dados" : formatarValor(d.valor)}`).join("; ");
    container.setAttribute("role", "imagem");
    container.setAttribute("aria-label", `Gráfico de barras dos indicadores ${onde} ${quando}. ${resumo}.`);
    container.replaceChildren(grafico);
}

// -------------------- Mocks ------------------------------
export const MOCK_NORMAL = [
    { dimensao: "idhm_geral",  valor: 0.806, periodo_referencia: 2021 },
    { dimensao: "renda",       valor: 0.789, periodo_referencia: 2021 },
    { dimensao: "educacao",    valor: 0.742, periodo_referencia: 2021 },
    { dimensao: "longevidade", valor: 0.855, periodo_referencia: 2021 },
];
export const MOCK_COM_NULL = [
    { dimensao: "idhm_geral",  valor: 0.7,  periodo_referencia: 2021 },
    { dimensao: "renda",       valor: null, periodo_referencia: 2021 },
    { dimensao: "educacao",    valor: 0,    periodo_referencia: 2021 },
    { dimensao: "longevidade", valor: 1,    periodo_referencia: 2021 },
];
export const MOCK_TODOS_NULL = MOCK_NORMAL.map((i) => ({ ...i, valor: null }));