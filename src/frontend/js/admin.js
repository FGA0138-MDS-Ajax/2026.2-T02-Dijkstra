import { fazerLogin, buscarPainelAdmin } from "./api_client.js";

//REVISAR ESSE CÓDIGO

// Ajuste estes três valores conforme o back-end (S5-02 e S5-03).
const API_URL = "http://localhost:8000";
const ENDPOINT_LOGIN = "/api/admin/login";
const ENDPOINT_UPLOAD = "/api/admin/indicadores/upload";

const statusBox = document.getElementById("status-api");
const statusTitulo = document.getElementById("status-titulo");
const statusMensagem = document.getElementById("status-mensagem");

// estado: "info" (carregando), "sucesso" ou "erro" (usa o data-estado já definido no CSS)
function mostrarStatus(estado, titulo, mensagem) {
    statusBox.hidden = false;
    statusBox.dataset.estado = estado;
    statusTitulo.textContent = titulo;
    statusMensagem.textContent = mensagem;
}

async function lerErro(resposta) {
    try {
        const dados = await resposta.json();
        const motivo = dados.detail || dados.mensagem;
        if (typeof motivo === "string") return motivo;
    } catch (erro) {
        // resposta sem JSON: usa a mensagem padrão abaixo
    }
    return "O servidor recusou a requisição (código " + resposta.status + ").";
}

// ---------- Login (area-adm.html) ----------
const loginForm = document.getElementById("login-form");

if (loginForm) {
    const botao = loginForm.querySelector("button[type=submit]");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        botao.disabled = true;
        mostrarStatus("info", "Entrando", "Verificando suas credenciais...");

        try {
            const usuario = loginForm.usuario.value;
            const senha = loginForm.senha.value;

            await fazerLogin(usuario,senha);

            sessionStorage.setItem("usuario_admin",usuario);
            window.location.href = "./painel-adm.html";
        } catch (erro) {
            console.error(erro);
            mostrarStatus("erro", "Erro no login", erro.message || "Ocorreu um erro inesperado.");
        } finally {
            botao.disabled = false;
        }
    });
}

// ---------- Painel (painel-adm.html) ----------
const uploadForm = document.getElementById("upload-form");

if (uploadForm) {
    const auth = sessionStorage.getItem("auth");

    const resultado = document.getElementById("resultado");
    const botao = uploadForm.querySelector("button[type=submit]");

    // Só conveniência de navegação: quem protege o upload é o back-end.
    if (!auth) {
        window.location.href = "./area-adm.html";
    }
    else {
        document.getElementById("usuario").textContent = sessionStorage.getItem("usuario_admin");

        document.getElementById("sair").addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = "./area-adm.html";
        });
        uploadForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const arquivo = uploadForm.arquivo.files[0];

            if (!arquivo || !arquivo.name.toLowerCase().endsWith(".csv")) {
                mostrarStatus("erro", "Arquivo inválido", "Selecione um arquivo no formato .csv.");
                return;
            }

            const dados = new FormData();
            dados.append("file", arquivo);

            botao.disabled = true;
            mostrarStatus("info", "Enviando", "Aguarde a confirmação do servidor...");

            try {
                const resposta = await fetch(API_URL + ENDPOINT_UPLOAD, {
                    method: "POST",
                    headers: { "Authorization": auth },
                    body: dados,
                });

                if (resposta.status === 401 || resposta.status === 403) {
                    sessionStorage.clear();
                    mostrarStatus("erro", "Sessão expirada", "Faça login novamente para enviar arquivos.");
                    resultado.textContent = "Envio não autorizado.";
                    return;
                }

                if (!resposta.ok) {
                    const motivo = await lerErro(resposta);
                    mostrarStatus("erro", "Arquivo rejeitado", motivo);
                    resultado.textContent = arquivo.name + ": " + motivo;
                    return;
                }

                mostrarStatus("sucesso", "Dados atualizados", "O servidor confirmou o recebimento de " + arquivo.name + ".");
                resultado.textContent = arquivo.name + ": atualização concluída.";
                uploadForm.reset();
            } catch (erro) {
                console.error(erro);
                mostrarStatus("erro", "Sem conexão", "Não foi possível falar com o servidor. Nada foi atualizado.");
                resultado.textContent = arquivo.name + ": envio não concluído.";
            } finally {
                botao.disabled = false;
            }
        });
    }
}