// @ts-check
// Page object da página do mapa (mapa.html): filtros, mapa Leaflet,
// comparação, linha do tempo e tabela/gráfico.

export class PaginaMapa {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.titulo = page.getByRole('heading', { name: 'Mapa do Brasil Interativo' });

    // caixa de status geral (erros de conexão, "Sem resultados"...)
    this.botaoTentarNovamente = page.getByRole('button', { name: 'Tentar novamente' });

    // filtros do mapa
    this.filtros = page.getByRole('region', { name: 'Filtros de indicadores' });
    this.selectEstado = this.filtros.getByLabel('Estados');
    this.selectDimensao = this.filtros.getByLabel('Dimensão do IDH');
    this.botaoLimparFiltros = this.filtros.getByRole('button', { name: 'Limpar filtros' });
    this.resumoFiltros = page.locator('#filtros-resumo');

    // mapa Leaflet
    this.mapa = page.locator('#mapa-brasil');
    this.estadosNoMapa = this.mapa.locator('path.leaflet-interactive');
    this.tooltip = page.locator('.leaflet-tooltip');
    this.painelEstado = this.mapa.locator('.info-estado');
    this.linhasPainelEstado = this.painelEstado.locator('.popup-row');

    // comparação lado a lado
    this.comparacao = page.getByRole('region', { name: 'Comparar Estados Lado a Lado' });
    this.selectEstadoA = this.comparacao.getByLabel('1º Estado');
    this.selectEstadoB = this.comparacao.getByLabel('2º Estado');
    this.statusComparacao = this.comparacao.getByRole('status');
    this.cardsComparacao = this.comparacao.locator('.comparacao__card');

    // seção unificada de evolução (linha do tempo) e indicadores (tabela e gráfico)
    this.evolucao = page.getByRole('region', { name: 'Evolução e Indicadores' });

    // linha do tempo
    this.linhaTempo = this.evolucao;
    this.selectEstadoLinhaTempo = this.evolucao.getByLabel('Estado');
    this.selectDimensaoLinhaTempo = this.evolucao.getByLabel('Dimensão do IDH');
    this.statusLinhaTempo = this.evolucao.locator('#linha-tempo-status');
    this.graficoLinhaTempo = this.evolucao.locator('#linha-tempo-grafico svg');

    // tabela e gráfico de um estado
    this.visualizacao = this.evolucao;
    this.selectEstadoVisualizacao = this.evolucao.getByLabel('Estado');
    this.selectPeriodo = this.evolucao.getByLabel('Ano de referência');
    this.statusVisualizacao = this.evolucao.locator('#visualizacao-status');
    this.erroVisualizacao = this.evolucao.locator('#visualizacao-erro');
    this.tabela = this.evolucao.locator('#visualizacao-tabela').getByRole('table');
    this.grafico = this.evolucao.locator('#visualizacao-grafico').getByRole('img');
  }

  async abrir() {
    await this.page.goto('/mapa.html');
  }

  /** Espera o mapa desenhar os 27 estados. */
  async esperarMapaCarregar() {
    await this.estadosNoMapa.first().waitFor();
  }

  /** @param {string} uf */
  async filtrarEstado(uf) {
    await this.selectEstado.selectOption(uf);
  }

  /** @param {string} dimensao idhm_geral | renda | educacao | longevidade */
  async filtrarDimensao(dimensao) {
    await this.selectDimensao.selectOption(dimensao);
  }

  /** @param {string} ufA @param {string} ufB */
  async compararEstados(ufA, ufB) {
    await this.selectEstadoA.selectOption(ufA);
    await this.selectEstadoB.selectOption(ufB);
  }

  /** @param {string} uf @param {string} dimensao */
  async verLinhaTempo(uf, dimensao) {
    await this.selectEstadoLinhaTempo.selectOption(uf);
    await this.selectDimensaoLinhaTempo.selectOption(dimensao);
  }

  /** @param {string} uf */
  async verIndicadoresDoEstado(uf) {
    await this.selectEstadoVisualizacao.selectOption(uf);
  }

  /**
   * Célula "Valor" de uma linha da tabela.
   * @param {string} indicador ex.: "IDHM Geral"
   */
  valorNaTabela(indicador) {
    return this.tabela.getByRole('row', { name: indicador }).getByRole('cell').first();
  }

  /** @param {string} uf */
  cardDoEstado(uf) {
    return this.cardsComparacao.filter({ hasText: `(${uf})` });
  }
}
