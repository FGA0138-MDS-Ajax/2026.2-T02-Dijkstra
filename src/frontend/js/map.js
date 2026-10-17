import { buscarIndicadores } from "./api_client.js";

const COR_SEM_DADOS = '#011f83';
const DIMENSAO_COR = "idhm_geral";

const FAIXAS_IDHM = [
    { min: 0.800, cor: "#95150e", rotulo: "Muito alto (≥ 0,800)" },
    { min: 0.700, cor: "#7e570e", rotulo: "Alto (0,700 - 0,799)" },
    { min: 0.600, cor: "#c1b01d", rotulo: "Médio (0,600 - 0,699)" },
    { min: 0.500, cor: "#16d857", rotulo: "Baixo (0,500 - 0,599)" },
    { min: 0,     cor: "#edf8b1", rotulo: "Muito baixo (< 0,500)" },
];

function corPorIdh(valor) {
    if (typeof valor !== "number") return COR_SEM_DADOS;
    const faixa = FAIXAS_IDHM.find(f => valor >= f.min);
    return faixa ? faixa.cor : COR_SEM_DADOS;
}

function obterValorIdhParaAno(listaIndicadores,  ano){
    if(!listaIndicadores){
        return null;
    }
   const ind = listaIndicadores.find(i=>
    i.periodo_referencia === ano && i.dimensao === DIMENSAO_COR
   );
   return ind ? ind.valor : null;
}

function formatarValor(valor) {
    return typeof valor === "number" ? valor.toFixed(3).replace(".", ",") : "N/D";
}



export function inicializarMapa(idContainer) {
    const mapa=L.map(idContainer).setView([-14,-54],4);
    mapa.setMaxBounds([[-35,-75],[8,-34]]);
    mapa.setMinZoom(4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6 ,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

    let indicadoresporUf = {};
    let anosDisponiveis = [];
    let anoSelecionado = null;
    let camadaEstados = null;
    
    //funcções para separar as cores por estado
    function indicadoresDoEstado(feature){
        return indicadoresporUf[feature.properties.sigla] || [];
    }

    function estiloEstado(feature){
        const valor = obterValorIdhParaAno(indicadoresDoEstado(feature), anoSelecionado);
        return {
            color: '#000000',    
            weight: 2,            
            fillColor: corPorIdh(valor),    
            fillOpacity: 0.2  
        };
    }

    function montarPopup(feature) {
        const nome = feature.properties.name;
        const doAno = indicadoresDoEstado(feature).filter(
            ind => ind.periodo_referencia === anoSelecionado
        );

        let html = `<div class="popup-container">`;
        html += `<h3 class="popup-titulo">${feature.properties.name}<span class="popup-periodo">(${anoSelecionado ?? "—"})</span></h3>`;
        html += `<div class="popup-divider">`;
        if (doAno.length > 0) {
            doAno.forEach(ind => {
                html += `<p class="popup-item"><strong>${ind.dimensao}:</strong> ${ind.valor ?? 'N/D'}</p>`;
            });
        } else {
            html += `<p class="popup-vazio">Sem dados disponíveis para este estado neste ano.</p>`;
        }
        html += `</div></div>`;
        return html;
    }

    function aplicarAno(ano) {
        anoSelecionado = ano;
        mapa.closePopup();
        camadaEstados.setStyle(estiloEstado);
    }

    // Cria no canto um select do html que pode escolher o ano
    const seletorAno = L.control({position: 'topright'});
    seletorAno.onAdd = function(){
        const div = L.DomUtil.create('div','info-legenda');
        const opcoes = [...anosDisponiveis].reverse() //pra adcionar o mais novo primeiro
            .map(a => `<option value="${a}" ${a === anoSelecionado ? 'selected' : ''}> ${a}</option>`).join('');
            div.innerHTML= `
            <label for="seletor-ano"><strong>Ano:</strong></label>
            <select id="seletor-ano"> ${opcoes} </select>
            `;
            //clicar nao vai mexer no mapa
            L.DomEvent.disableClickPropagation(div); 
        div.querySelector('select').addEventListener('change',e=>aplicarAno(e.target.value));
        return div;
    };

    Promise.all([
        buscarIndicadores().catch(erro => {
            console.warn("Brasil Hub - Não foi possível carregar os indicadores", erro);
            return [];
        }),
    //Chama o geojson que contem as informações de cada ponto do estado
    //tem uma função de criar poligono com pontos no leaflet, ai tem uma função especifica do geojson;
    fetch('assets/geojson/brazil-states.geojson').then(response => response.json()),
    ])
    .then(([dados, geojson]) => {
        const indicadores = Array.isArray(dados) ? dados : [];
 
        indicadores.forEach(item => {
            const uf = item.unidade_territorial;
            if (!uf) return;
            if (!indicadoresporUf[uf]) {
                indicadoresporUf[uf] = [];
            }
            indicadoresporUf[uf].push(item);
        });
 
        //adiciona os anos e pega o mais recente, que vai ser o inicial
        anosDisponiveis = [...new Set(indicadores.map(i => String(i.periodo_referencia)))].sort();
        anoSelecionado = anosDisponiveis[anosDisponiveis.length - 1] || null;
 
        camadaEstados = L.geoJSON(geojson, {
            style: estiloEstado,
            onEachFeature: function (feature, layer) {
                if (!feature.properties.name) return;
                //Aparecer os nomes do estado, não permanente pra não ficar feio. Só ao passar o mouse por cima
                layer.bindTooltip(feature.properties.name, { permanent: false, direction: "center", className: "rotulo-estado" });
                //popup montado ao clicar, com o ano atual
                layer.bindPopup(() => montarPopup(feature));
            }
        }).addTo(mapa);
 
        if (anosDisponiveis.length > 0) {
            seletorAno.addTo(mapa);
        }
    })
    .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
 
    //legenda no canto, com as faixas de IDHM
    const legenda = L.control({ position: 'bottomright' });
    legenda.onAdd = function () {
        const div = L.DomUtil.create('div', 'info-legenda');
        const itens = [...FAIXAS_IDHM, { cor: COR_SEM_DADOS, rotulo: "Sem dados" }]
            .map(f => `
                <div class="legenda-item">
                    <span class="cor-amostra" style="background:${f.cor}; opacity:0.7;"></span>
                    <span>${f.rotulo}</span>
                </div>`)
            .join('');
        div.innerHTML = `<h4>IDHM</h4>${itens}`;
        return div;
    };
    legenda.addTo(mapa);
 
    return mapa;
}