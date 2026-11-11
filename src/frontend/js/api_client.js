export const API_BASE_URL ="http://127.0.0.1:8000";

const TEMPO_LIMITE_MS = 8000;
const TEMPO_LIMITE_SAUDE = 3000;

export class ErroApi extends Error{
    // erro é uma classe padrão do js
    constructor(tipo,mensagem, {status = null , causa = null}={}){
        super(mensagem);
        this.name ="erroapi";
        this.tipo=tipo; // "rede", "tempo_esgotado", "http" , "resposta_invalida"
        this.status=status;
        this.causa=causa;
    }
}

function  montarURL(caminho, parametros={}){
    const consulta = new URLSearchParams(); 
    //vai deixar um pouco mais bonito a URL , sem estado==null ou =="", vai só não botar na url
    Object.entries(parametros).forEach(([chave,valor])=>{
        if(valor !== undefined && valor !== null && valor !== ""){
            consulta.append(chave,String(valor));
        }
    });
    const texto = consulta.toString();
    return API_BASE_URL + caminho + (texto ? "?" + texto: "");
}

export async function requisitarJSON(url, {tempoLimite = TEMPO_LIMITE_MS, ...opcoesFetch} = {}){
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), tempoLimite);
    let resposta;
    try{
        resposta = await fetch(url, {...opcoesFetch, signal: controller.signal});
    }
    catch(erro){
        if(erro.name == "AbortError"){
            throw new ErroApi("tempo_esgotado", "A Api demorou muito para responder");
        }
        throw new ErroApi("rede", "Não foi possivel se concetar a API", {causa : erro});
    }
    finally{
        clearTimeout(timer);
    }
    if(!resposta.ok){
        const corpoErro = await resposta.json().catch(() => null);
        // FastAPI manda {detail: "..."}; no 422 o detail é lista, então só usamos se for texto
        const detalhe = typeof corpoErro?.detail === "string" ? corpoErro.detail : "Erro na resposta do servidor";
        throw new ErroApi("http", detalhe, { status: resposta.status });
    }
    if(resposta.status===204){
        return null;
    }
    try{
        return await resposta.json();
    }
    catch(erro){
        throw new ErroApi("resposta_invalida", "A reposta da Api não é um JSON válido",{status: resposta.status , causa: erro});
    }
}
export async function verificarSaude() {
   return requisitarJSON(API_BASE_URL + "/health", { tempoLimite: TEMPO_LIMITE_SAUDE });

}

export async function buscarIndicadores(filtros = {}) {
   return requisitarJSON(montarURL("/api/indicadores", filtros));
}

export async function buscarIndicadoresEstado(estado) {
    return requisitarJSON(montarURL("/api/indicadores", { estado }));
}

export async function buscarComparacao(estadoA, estadoB, { periodoA = null, periodoB = null } = {}) {
    const url = montarURL("/api/indicadores/comparar", {
        estado_a: estadoA, estado_b: estadoB, periodo_a: periodoA, periodo_b: periodoB,
    });
    return requisitarJSON(url);
}

export async function fazerLogin(usuario, senha) {
    const dados = await requisitarJSON(API_BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
    });
    // guarda o cabeçalho Basic para as próximas rotas administrativas
    sessionStorage.setItem("auth", "Basic " + btoa(`${usuario}:${senha}`));
    return dados;
}

export async function buscarPainelAdmin() {
    const auth = sessionStorage.getItem("auth");
    try{
        return await requisitarJSON(API_BASE_URL + "/api/admin/painel", {
            headers: auth ? { Authorization: auth } : {},
        });
    } catch(erro){
        // sessão inválida: limpa as credenciais salvas
        if(erro instanceof ErroApi && erro.status === 401){
            sessionStorage.removeItem("auth");
        }
        throw erro;
    }
}