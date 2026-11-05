(function () {
    var CHAVE_TEMA = "brasil-hub-theme";
    var CHAVE_CONTRASTE = "brasil-hub-contrast";
    var CHAVE_FONTE = "brasil-hub-font-scale";
    var ESCALAS_FONTE = ["normal", "large", "xlarge"];
    var raiz = document.documentElement;

    function ler(chave) {
        try { return localStorage.getItem(chave); } catch (e) { return null; }
    }
    function salvar(chave, valor) {
        try { localStorage.setItem(chave, valor); } catch (e) {}
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

    // tema base (claro ou escuro)
    var base = ler(CHAVE_TEMA);
    if (base !== "dark" && base !== "light") {
        base = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // alto contraste
    var salvoContraste = ler(CHAVE_CONTRASTE);
    var contraste = salvoContraste === null
        ? window.matchMedia("(prefers-contrast: more)").matches
        : salvoContraste === "1";

    function aplicar() {
        raiz.setAttribute("data-theme", contraste ? "high-contrast" : base);
    }
    aplicar();

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

        var botaoTema = document.getElementById("theme-toggle");
        var destino = botaoTema ? botaoTema.parentNode : document.querySelector(".links");
        if (!destino) return;

        var botaoContraste = document.createElement("button");
        botaoContraste.type = "button";
        botaoContraste.id = "contrast-toggle";
        botaoContraste.className = "theme-toggle";
        botaoContraste.setAttribute("aria-label", "Alto contraste");
        botaoContraste.innerHTML =
            '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" ' +
            'fill="none" stroke="currentColor" stroke-width="2">' +
            '<circle cx="12" cy="12" r="9"/>' +
            '<path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor"/></svg>';

        if (botaoTema) {
            botaoTema.insertAdjacentElement("afterend", botaoContraste);
        } else {
            destino.appendChild(botaoContraste);
        }

        function sincronizar() {
            botaoContraste.setAttribute("aria-pressed", String(contraste));
            if (botaoTema) {
                // em alto contraste não tem claro/escuro, então o botão de tema some
                botaoTema.hidden = contraste;
                botaoTema.setAttribute("aria-pressed", String(base === "dark"));
                botaoTema.setAttribute("aria-label", "Tema escuro");
            }
        }
        sincronizar();

        if (botaoTema) {
            botaoTema.addEventListener("click", function () {
                base = base === "dark" ? "light" : "dark";
                salvar(CHAVE_TEMA, base);
                aplicar();
                sincronizar();
            });
        }

        botaoContraste.addEventListener("click", function () {
            contraste = !contraste;
            salvar(CHAVE_CONTRASTE, contraste ? "1" : "0");
            aplicar();
            sincronizar();
        });

    });
})();