const API_BASE_URL ="http://127.0.0.1:8000";
export async function verificarSaude() {
    const resposta = await fetch(API_BASE_URL + "/health");
    if(!resposta.ok){
        throw new Error ("API indisponível: "  + resposta.status);

    }
    return await resposta.json();
}
    
export async function buscarIndicadores(filtros = {}) {
        const parametros = new URLSearchParams(filtros);
        const resposta = await fetch(API_BASE_URL +"/api/indicadores?" + parametros);
         if (!resposta.ok){
            throw new Error("Erro ao buscar indicadores: " + resposta.status);

         }
        
         return await resposta.json();
    }
