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

function gerarNomeArquivo(filtros = {}){
    const partes = ["brasil-hub"];
    if(filtros.dimensao) partes.push(filtros.dimensao);
    if(filtros.estado) partes.push(filtros.estado.toLowerCase());
    if(filtros.periodo) partes.push(String(filtros.periodo));

    if(partes.length === 1){
        partes.push("todos-indicadores")
    }
    return `${partes.join("_")}.csv`;
}

export function converterParaCSV(registros,delimitador=";"){
    if(!Array.isArray(registros) || registros.length === 0){
        return "";
    }
    
    const possuiUnidade = registros.some((item => item?.unidade_medida !== null))
    const possuiFonte = registros.some((item) => item?.fonte !== null)
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
