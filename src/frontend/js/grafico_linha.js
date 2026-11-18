// Gráfico de linha em SVG para a Linha do Tempo (B-07).
//
// Só desenha: não conhece API nem selects. Recebe a série já ordenada
// ([{ periodo, valor }]) e um container, e substitui o conteúdo dele pelo SVG.
// As cores vêm das classes CSS (variáveis do tema), então o gráfico acompanha
// a troca de tema sem precisar ser redesenhado.

const NS = "http://www.w3.org/2000/svg";

// Espaço de desenho fixo; o viewBox faz o navegador escalar para a largura real.
const LARGURA = 640;
const ALTURA = 320;
const MARGEM = { topo: 28, direita: 24, baixo: 40, esquerda: 56 };

const QTD_MARCAS_Y = 5;
const DISTANCIA_MIN_ROTULO_X = 48; // em unidades do viewBox, evita anos sobrepostos

const formatoNumero = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 3 });

function criar(tag, atributos = {}, texto) {
    const el = document.createElementNS(NS, tag);
    for (const [nome, valor] of Object.entries(atributos)) el.setAttribute(nome, valor);
    if (texto !== undefined) el.textContent = texto;
    return el;
}

function temValor(ponto) {
    return typeof ponto.valor === "number" && Number.isFinite(ponto.valor);
}

// Domínio do eixo Y com uma folga de 10% para a linha não encostar nas bordas.
function calcularDominioY(valores) {
    let min = Math.min(...valores);
    let max = Math.max(...valores);
    if (min === max) {
        const folga = Math.abs(min) * 0.1 || 1;
        return [min - folga, max + folga];
    }
    const folga = (max - min) * 0.1;
    return [min - folga, max + folga];
}

// Escolhe quais anos ganham rótulo: sempre o primeiro e o último, e os do meio
// só se couberem sem encostar no vizinho (no celular não cabem os 16 anos).
function escolherRotulosX(anos, x) {
    const escolhidos = [];
    const ultimo = anos[anos.length - 1];
    for (const ano of anos) {
        const posicao = x(ano);
        const longeDoAnterior = escolhidos.length === 0
            || posicao - x(escolhidos[escolhidos.length - 1]) >= DISTANCIA_MIN_ROTULO_X;
        const longeDoUltimo = ano === ultimo || x(ultimo) - posicao >= DISTANCIA_MIN_ROTULO_X;
        if (longeDoAnterior && longeDoUltimo) escolhidos.push(ano);
    }
    return escolhidos;
}

// Divide a série em trechos contínuos. Um valor null encerra o trecho atual,
// então o ano sem dado vira um buraco na linha em vez de cair a zero.
function separarTrechos(serie, x, y) {
    const trechos = [];
    let atual = [];
    for (const ponto of serie) {
        if (!temValor(ponto)) {
            if (atual.length) trechos.push(atual);
            atual = [];
            continue;
        }
        atual.push([x(ponto.periodo).toFixed(1), y(ponto.valor).toFixed(1)]);
    }
    if (atual.length) trechos.push(atual);
    return trechos;
}

// "M" levanta a caneta e move; "L" desenha até o ponto.
function caminhoLinha(trechos) {
    return trechos
        .map((trecho) => trecho.map(([px, py], i) => `${i === 0 ? "M" : "L"} ${px},${py}`).join(" "))
        .join(" ");
}

// Área sob a linha: cada trecho vira um polígono fechado até a base do gráfico.
function caminhoArea(trechos, baseY) {
    return trechos
        .filter((trecho) => trecho.length > 1)
        .map((trecho) => {
            const primeiroX = trecho[0][0];
            const ultimoX = trecho[trecho.length - 1][0];
            const linha = trecho.map(([px, py], i) => `${i === 0 ? "M" : "L"} ${px},${py}`).join(" ");
            return `${linha} L ${ultimoX},${baseY} L ${primeiroX},${baseY} Z`;
        })
        .join(" ");
}

export function desenharGraficoLinha(container, serie, { unidade = null, descricao = "" } = {}) {
    container.replaceChildren();

    const pontosComValor = (serie ?? []).filter(temValor);
    if (pontosComValor.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "Os períodos encontrados não possuem valores registrados.";
        container.append(aviso);
        return;
    }

    const anos = serie.map((p) => p.periodo);
    const anoMin = Math.min(...anos);
    const anoMax = Math.max(...anos);
    const [valorMin, valorMax] = calcularDominioY(pontosComValor.map((p) => p.valor));

    const larguraUtil = LARGURA - MARGEM.esquerda - MARGEM.direita;
    const alturaUtil = ALTURA - MARGEM.topo - MARGEM.baixo;

    // Escalas: o X usa o ano real (não a posição na lista), então o intervalo
    // 1991→2000 ocupa 9x mais espaço que 2012→2013, como deve ser.
    const x = (ano) => anoMax === anoMin
        ? MARGEM.esquerda + larguraUtil / 2
        : MARGEM.esquerda + ((ano - anoMin) / (anoMax - anoMin)) * larguraUtil;
    // No SVG o Y cresce para baixo, por isso o "1 -".
    const y = (valor) => MARGEM.topo + (1 - (valor - valorMin) / (valorMax - valorMin)) * alturaUtil;

    const svg = criar("svg", {
        viewBox: `0 0 ${LARGURA} ${ALTURA}`,
        class: "grafico-linha",
        role: "img",
        "aria-label": descricao || "Gráfico de linha da evolução do indicador ao longo dos anos.",
    });

    // Grade e eixo Y
    const grupoY = criar("g", { class: "grafico-linha__eixo" });
    for (let i = 0; i < QTD_MARCAS_Y; i++) {
        const valor = valorMin + ((valorMax - valorMin) * i) / (QTD_MARCAS_Y - 1);
        const posY = y(valor);
        grupoY.append(
            criar("line", {
                class: "grafico-linha__grade",
                x1: MARGEM.esquerda, x2: LARGURA - MARGEM.direita, y1: posY, y2: posY,
            }),
            criar("text", { x: MARGEM.esquerda - 8, y: posY, "text-anchor": "end", "dominant-baseline": "middle" },
                formatoNumero.format(valor)),
        );
    }
    if (unidade) {
        grupoY.append(criar("text", { x: MARGEM.esquerda, y: MARGEM.topo - 12, "text-anchor": "start" },
            `Valor (${unidade})`));
    }

    // Eixo X
    const grupoX = criar("g", { class: "grafico-linha__eixo" });
    const baseY = ALTURA - MARGEM.baixo;
    grupoX.append(criar("line", { x1: MARGEM.esquerda, x2: LARGURA - MARGEM.direita, y1: baseY, y2: baseY }));
    for (const ano of escolherRotulosX(anos, x)) {
        grupoX.append(criar("text", { x: x(ano), y: baseY + 20, "text-anchor": "middle" }, String(ano)));
    }

    // Área, linha e pontos
    const trechos = separarTrechos(serie, x, y);
    const area = criar("path", { class: "grafico-linha__area", d: caminhoArea(trechos, baseY) });
    const linha = criar("path", { class: "grafico-linha__linha", d: caminhoLinha(trechos), fill: "none" });

    const grupoPontos = criar("g", { class: "grafico-linha__pontos" });
    for (const ponto of pontosComValor) {
        const circulo = criar("circle", { cx: x(ponto.periodo), cy: y(ponto.valor), r: 4 });
        const sufixo = unidade ? ` ${unidade}` : "";
        circulo.append(criar("title", {}, `${ponto.periodo}: ${formatoNumero.format(ponto.valor)}${sufixo}`));
        grupoPontos.append(circulo);
    }

    svg.append(grupoY, area, grupoX, linha, grupoPontos);
    container.append(svg);
}
