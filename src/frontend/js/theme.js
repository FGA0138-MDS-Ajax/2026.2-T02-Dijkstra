(function () {
    var CHAVE_TEMA = "brasil-hub-theme";
    var CHAVE_CONTRASTE = "brasil-hub-contrast";
    var raiz = document.documentElement;

    function ler(chave) {
        try { return localStorage.getItem(chave); } catch (e) { return null; }
    }
    function salvar(chave, valor) {
        try { localStorage.setItem(chave, valor); } catch (e) {}
    }

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