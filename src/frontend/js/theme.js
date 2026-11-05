(function () {
    var CHAVE = "brasil-hub-theme";
    var CHAVE_FONTE = "brasil-hub-font-scale";
    var ESCALAS_FONTE = ["normal", "large", "xlarge"];
    var raiz = document.documentElement;
 
    function lerSalvo() {
        try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
    }
    function salvar(tema) {
        try { localStorage.setItem(CHAVE, tema); } catch (e) { /* modo privado: ignora */ }
    }

    function lerEscalaFonte() {
        try {
            var escalaSalva = localStorage.getItem(CHAVE_FONTE);
            return ESCALAS_FONTE.includes(escalaSalva) ? escalaSalva : "normal";
        } catch (e) {
            return "normal";
        }
    }

    function aplicarEscalaFonte(escala) {
        if (escala === "normal") {
            raiz.removeAttribute("data-font-scale");
        } else {
            raiz.setAttribute("data-font-scale", escala);
        }
        try { localStorage.setItem(CHAVE_FONTE, escala); } catch (e) { /* modo privado: ignora */ }
    }

    aplicarEscalaFonte(lerEscalaFonte());

    // 1) escolha salva; 2) tema do sistema; 3) claro
    var inicial = lerSalvo() ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    raiz.setAttribute("data-theme", inicial);
 
    document.addEventListener("DOMContentLoaded", function () {
        var btAumentar = document.getElementById("btAumentar");
        var btDiminuir = document.getElementById("btDiminuir");
        var escalaAtual = ESCALAS_FONTE.indexOf(lerEscalaFonte());

        function atualizarBotoesFonte() {
            if (btDiminuir) btDiminuir.disabled = escalaAtual === 0;
            if (btAumentar) btAumentar.disabled = escalaAtual === ESCALAS_FONTE.length - 1;
        }

        if (btAumentar) {
            btAumentar.addEventListener("click", function () {
                escalaAtual = Math.min(escalaAtual + 1, ESCALAS_FONTE.length - 1);
                aplicarEscalaFonte(ESCALAS_FONTE[escalaAtual]);
                atualizarBotoesFonte();
            });
        }

        if (btDiminuir) {
            btDiminuir.addEventListener("click", function () {
                escalaAtual = Math.max(escalaAtual - 1, 0);
                aplicarEscalaFonte(ESCALAS_FONTE[escalaAtual]);
                atualizarBotoesFonte();
            });
        }
        atualizarBotoesFonte();

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