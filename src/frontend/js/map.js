// MaxZoom deve mudar posteriormente 
// base do Guia do Leaflet
export function inicializarMapa(idContainer) {
    const mapa=L.map(idContainer).setView([-14,-54],4);
    mapa.setMaxBounds([[-35,-75],[8,-34]]);
    mapa.setMinZoom(3.7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 7 ,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

return mapa;
}
