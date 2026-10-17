import { buscarIndicadores } from "./api_client.js";

// MaxZoom deve mudar posteriormente 
// base do Guia do Leaflet

export function inicializarMapa(idContainer) {
    const mapa=L.map(idContainer).setView([-14,-54],4);
    mapa.setMaxBounds([[-35,-75],[8,-34]]);
    mapa.setMinZoom(4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6 ,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

    let indicadoresporUf = {};

    buscarIndicadores()
    .then(dados => {
        if (Array.isArray(dados)) {
            dados.forEach(item => {
                const uf = item.estado || item.uf;
                if (uf) {
                    if (!indicadoresporUf[uf]) {
                        indicadoresporUf[uf] = [];
                    }
                    indicadoresporUf[uf].push(item);
                }
            });
        }
    })
    .catch(erro => {
        console.warn("Brasil Hub - Não foi possível carregar os indicadores", erro);
    });

    //Chama o geojson que contem as informações de cada ponto do estado
    //tem uma função de criar poligono com pontos no leaflet, ai tem uma função especifica do geojson;
    fetch('assets/geojson/brazil-states.geojson') 
    .then (response => response.json())
        // cor do desenho dos estados. Ainda há de mudar para modificar a call em relação ao IDHs dos estados , ai teria que mudar lá em baixo a legenda tmb
        .then(data => {
            L.geoJSON(data, {
            style: {
                color: '#086ce5',    
                weight: 2,            
                fillColor: '#011f83',    
                fillOpacity: 0.2       
            },

        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.name) {
                const nomeEstado = feature.properties.name;
                const siglaEstado = feature.properties.siglaEstado || feature.properties.uf;
            //Aparecer os nomes do estado, não permanente pra não ficar feio. Só ao passar o mouse por cima
            layer.bindTooltip(nomeEstado, {permanent: false, direction: "center", className: "rotulo-estado"});
            }

            layer.on('click',function () {
                const listaIndicadores = indicadoresporUf[siglaEstado] || indicadoresporUf[nomeEstado] || [];
                let conteudoHtml = `<div class="popup-container">`;
                conteudoHtml += `<h3 class="popup-titulo">${nomeEstado}</h3>`;
                conteudoHtml += `<div class="popup-divider">`;

                if(listaIndicadores.length > 0){
                    listaIndicadores.forEach(ind =>{
                        conteudoHtml += `<p class = "popup-item"<strong>${ind.dimensao || 'Indicador'}:</strong> ${ind.valor ?? 'N/D'} <span class="popup-periodo">`
                    });
                }
                else{
                    conteudoHtml += `<p class="popup-vazio">Sem dados disponíveis para este estado.</p>`;
                }
                conteudoHtml += `</div>`;
                layer.bindPopup(conteudoHtml).openPopup();
                //cria um popup com informações do estado ao clicar com o mouse
            });
        }
        }).addTo(mapa);
    })
    .catch(error => console.error('Erro ao carregar o GeoJSON:', error));

    //legenda no canto. Até agora só aparece que a cor representa a separação dos estados
    const legenda = L.control({position: 'bottomright'});
    legenda.onAdd = function(map){
        const div = L.DomUtil.create('div','info-legenda');
        div.innerHTML = `
                <h4>Índices do Brasil</h4>
                <div class="legenda-item">
                    <span class="cor-amostra" style="background: #011f83; opacity: 0.4; border: 2px solid #086ce5;"></span>
                    <span>Limites Estaduais</span>
                </div>
                `;
                // Futuramente pode adicionar mais itens aqui (ex: cores para alta/baixa renda)
                return div;
    };
    legenda.addTo(mapa);

return mapa;
}
