import { ESTADOS } from "./js/filters.js";

const MOCK = {
  "estados": [
      {
        "estado": "SP",
        "periodo_referencia": 2021,
        "indicadores": {
          "idhm_geral":  { "valor": 0.806, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "renda":       { "valor": 0.774, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "educacao":    { "valor": 0.789, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "longevidade": { "valor": 0.859, "unidade_medida": "índice", "fonte": "Atlas Brasil" }
        }
      },
      {
        "estado": "RJ",
        "periodo_referencia": 2021,
        "indicadores": {
          "idhm_geral":  { "valor": 0.762, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "renda":       { "valor": 0.759, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "educacao":    { "valor": 0.754, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "longevidade": { "valor": 0.775, "unidade_medida": "índice", "fonte": "Atlas Brasil" }
        }
      }
    ]
  }

const INDICADORES = [
    { chave: "idhm_geral",  rotulo: "IDHM Geral" },
    { chave: "renda",       rotulo: "IDHM Renda" },
    { chave: "educacao",    rotulo: "IDHM Educação" },
    { chave: "longevidade", rotulo: "IDHM Longevidade"},
];

   function formatarValor(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "Sem dados";
}

  function criarCardEstado(estado){ 
    const card =document.createElement("div");
    card.className = "comparacao__card";
    
    const titulo = document.createElement("h3");
    card.append(titulo);
    
   const anoBase = document.createElement("p");
   anoBase.textContent = "Ano base: " + estado.periodo_referencia;
   card.append(anoBase);
   const achado = ESTADOS.find(e => e.valor === estado.estado);
   titulo.textContent = achado.rotulo + " (" + estado.estado + ")";


   for (const ind of INDICADORES) {
    const dado = estado.indicadores[ind.chave];
    const linha = document.createElement("p");
    linha.className = "comparacao__item";
    linha.textContent = ind.rotulo + ": " + formatarValor(dado.valor);
    card.append(linha);  
} 
   return card;
  }
const container = document.getElementById("comparacao-resultado");

  for (const estado of MOCK.estados) {
    container.append(criarCardEstado(estado));
}
  
  console.log(MOCK.estados[0]); 
  console.log(MOCK.estados[1]);


