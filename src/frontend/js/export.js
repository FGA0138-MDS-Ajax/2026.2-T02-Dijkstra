function formatarCelulaCSV(valor, delimitador = ";"){
    if(valor === null || valor === undefined || Number.isNaN(valor)){
        return "";
    }
    const texto = String(valor);
    const precisaAspas = texto.includes(delimitador) || texto.includes('"') || texto.includes("\n") || texto.includes("\r");

    if(precisaAspas){
        return `"${texto.replace(/"/g, '""')}"`;

    }
    return texto;
}
//mudança para ter varios estados e varios periodos no mesmo csv. Fazer um checklist do que quer para criar o csv
function resumirListaParaArquivo(lista, sufixoPlural) {
    if (!Array.isArray(lista) || lista.length === 0) return "";
    if (lista.length <= 3) {
        return lista.map((item) => String(item).toLowerCase()).join("-");
    }
    return `${lista.length}-${sufixoPlural}`;
}

function gerarNomeArquivo(filtros = {}) {
    const partes = ["brasil-hub"];

    const dimensoes = filtros.dimensoes ?? (filtros.dimensao ? [filtros.dimensao] : []);
const resumoDimensoes = resumirListaParaArquivo(dimensoes, "dimensoes");
if (resumoDimensoes) partes.push(resumoDimensoes);
    //mudança para ter varios estados 
    const estados = filtros.estados ?? (filtros.estado ? [filtros.estado] : []);
    const resumoEstados = resumirListaParaArquivo(estados, "estados");
    //mudança pros varios periodos
    if (resumoEstados) partes.push(resumoEstados);
    const periodos = filtros.periodos ?? (filtros.periodo ? [filtros.periodo] : []);
    const resumoPeriodos = resumirListaParaArquivo(periodos, "periodos");
    if (resumoPeriodos) partes.push(resumoPeriodos);

    if (partes.length === 1) {
        partes.push("todos-indicadores");
    }
    return `${partes.join("_")}.csv`;
}

export function converterParaCSV(registros,delimitador=";"){
    if(!Array.isArray(registros) || registros.length === 0){
        return "";
    }
    
    const possuiUnidade = registros.some((item) => item?.unidade_medida !== null && item?.unidade_medida !== undefined);
    const possuiFonte = registros.some((item) => item?.fonte !== null && item?.fonte !== undefined);
    const cabecalhos = ["Estados/UF", "Indicador", "Dimensão", "Período", "Valor"];
    
    // pro arquivo csv
    if(possuiUnidade) cabecalhos.push("Unidade");
    if(possuiFonte) cabecalhos.push("Fonte");

    const linhas = [
        cabecalhos.map((col) => formatarCelulaCSV(col,delimitador)).join(delimitador),
    ];
    //Fazer as linhas do CSV
    for(const item of registros){
        const linha = [
            formatarCelulaCSV(item.unidade_territorial,delimitador),
            formatarCelulaCSV(item.nome_indicador,delimitador),
            formatarCelulaCSV(item.dimensao,delimitador),
            formatarCelulaCSV(item.periodo_referencia,delimitador),
            formatarCelulaCSV(item.valor,delimitador),
        ];
        if(possuiUnidade){
            linha.push(formatarCelulaCSV(item.unidade_medida,delimitador));
        }
        if(possuiFonte){
            linha.push(formatarCelulaCSV(item.fonte,delimitador));
        }
        linhas.push(linha.join(delimitador));
    }
    return linhas.join("\r\n");

}

export function exportarDadosCSV(registros,filtros={}){
    if(!Array.isArray(registros)||registros.length===0){
        return false;
    }

    const conteudoCSV= converterParaCSV(registros);
    //Cria o objeto pra fazer a string virar um arquivo csv
    //\uFEFF no inicio do arquivo pro CSV abrir com excel
    const blob = new Blob(["\uFEFF" + conteudoCSV], {
        type: "text/csv;charset=utf-8;",
    });

    //cria um link temporario com o blob pra depois mandar baixar
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = gerarNomeArquivo(filtros);
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //remove da memoria
    setTimeout(() => URL.revokeObjectURL(url), 100);
    return true;
}

export function filtrarParaExportacao(registros, { estados = [], periodos = [], dimensoes = [] } = {}) {
    const ufs = new Set(estados);
    const anos = new Set(periodos.map(String));
    const dims = new Set(dimensoes);
    return registros.filter((r) =>
        (ufs.size === 0 || ufs.has(r.unidade_territorial)) &&
        (anos.size === 0 || anos.has(String(r.periodo_referencia))) &&
        (dims.size === 0 || dims.has(r.dimensao))
    );
}