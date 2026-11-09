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