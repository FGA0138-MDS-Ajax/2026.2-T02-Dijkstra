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

export async function verificarSaude() {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TEMPO_LIMITE_SAUDE);
    let resposta;
    try{
        resposta = await fetch(API_BASE_URL + "/health",{signal:controller.signal});
    } catch(erro){
        if(erro.name == "AbortError"){
            throw new ErroApi("tempo_esgotado", "A Api demorou muito para responder");
        }
        throw new ErroApi("rede", "Não foi possivel se concetar a API", {causa : erro});
    }
    finally{
        clearTimeout(timer);
    }

    if(!resposta.ok){
        throw new ErroApi("http","Erro na resposta do servidor" ,{status: resposta.status});
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

export async function buscarIndicadores(filtros = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TEMPO_LIMITE_MS);
    let resposta;
    try{
        resposta = await fetch(montarURL("/api/indicadores",filtros),{signal:controller.signal});
    } catch(erro){
        if(erro.name == "AbortError"){
            throw new ErroApi("tempo_esgotado", "A Api demorou muito para responder");
        }
        throw new ErroApi("rede", "Não foi possivel se concetar a API", {causa : erro});
    }
    finally{
        //reseta o timer
        clearTimeout(timer);
    }

    if(!resposta.ok){
        throw new ErroApi("http","Erro na resposta do servidor" ,{status: resposta.status});
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

export async function fazerLogin(usuario, senha) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TEMPO_LIMITE_MS);
    let resposta;
    try{
        resposta = await fetch(API_BASE_URL + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha }),
            signal: controller.signal,
        });
    } catch(erro){
        if(erro.name == "AbortError"){
            throw new ErroApi("tempo_esgotado", "A Api demorou muito para responder");
        }
        throw new ErroApi("rede", "Não foi possivel se concetar a API", {causa : erro});
    }
    finally{
        clearTimeout(timer);
    }

    if(!resposta.ok){
        throw new ErroApi("http", resposta.status === 401 ? "Credenciais inválidas." : "Erro na resposta do servidor", {status: resposta.status});
    }
    // guarda o cabeçalho Basic para as próximas rotas administrativas
    sessionStorage.setItem("auth", "Basic " + btoa(`${usuario}:${senha}`));
    return await resposta.json();
}

export async function buscarPainelAdmin() {
    const auth = sessionStorage.getItem("auth");
    let resposta;
    try{
        resposta = await fetch(API_BASE_URL + "/api/admin/painel", {
            headers: auth ? { Authorization: auth } : {},
        });
    } catch(erro){
        throw new ErroApi("rede", "Não foi possivel se concetar a API", {causa : erro});
    }
    if(resposta.status === 401){
        sessionStorage.removeItem("auth");
    }
    if(!resposta.ok){
        throw new ErroApi("http", "Acesso não autorizado", {status: resposta.status});
    }
    return await resposta.json();
}