(function () {
    var CHAVE = "brasil-hub-theme";
    var raiz = document.documentElement;
 
    function lerSalvo() {
        try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
    }
    function salvar(tema) {
        try { localStorage.setItem(CHAVE, tema); } catch (e) { /* modo privado: ignora */ }
    }
 
    // 1) escolha salva; 2) tema do sistema; 3) claro
    var inicial = lerSalvo() ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    raiz.setAttribute("data-theme", inicial);
 
    document.addEventListener("DOMContentLoaded", function () {
        var botao = document.getElementById("theme-toggle");
        if (!botao) return;
 
        function sincronizar() {
            var escuro = raiz.getAttribute("data-theme") === "dark";
            botao.setAttribute("aria-pressed", String(escuro));
            botao.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
        }
        sincronizar();
 
        botao.addEventListener("click", function () {
            var proximo = raiz.getAttribute("data-theme") === "dark" ? "light" : "dark";
            raiz.setAttribute("data-theme", proximo);
            salvar(proximo);
            sincronizar();
        });
    });
})();