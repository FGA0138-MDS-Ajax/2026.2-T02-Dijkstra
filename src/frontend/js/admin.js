import { fazerLogin, buscarPainelAdmin } from "./api.js";

const form = document.getElementById("login-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try{
        await fazerLogin(form.usuario.value, form.senha.value);
        const painel = await buscarPainelAdmin();
        mensagem.textContent = painel.mensagem;
    } catch(erro){
        mensagem.textContent = erro.mensagem;
    }
});