// @ts-check
// Page object da página inicial (index.html).
// Guarda os locators num lugar só: se o HTML mudar, ajusta aqui e não em cada teste.

export class PaginaInicial {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.menu = page.getByRole('banner');
    this.rodape = page.getByRole('navigation', { name: 'Rodapé' });
    this.tituloPrincipal = page.getByRole('heading', {
      name: 'Conheça o desenvolvimento humano do Brasil, estado por estado',
    });
    this.mapa = page.locator('#mapa-brasil');
    this.estadosNoMapa = this.mapa.locator('path.leaflet-interactive');
    this.legendaMapa = page.locator('#legenda-externa-mapa');
    this.botaoAumentarFonte = page.getByRole('button', { name: 'Aumentar fonte' });
    this.botaoDiminuirFonte = page.getByRole('button', { name: 'Diminuir fonte' });
  }

  async abrir() {
    await this.page.goto('/');
  }

  /** @param {string} nome */
  linkDoMenu(nome) {
    return this.menu.getByRole('link', { name: nome, exact: true });
  }

  /** @param {string} nome */
  linkDoRodape(nome) {
    return this.rodape.getByRole('link', { name: nome, exact: true });
  }
}
