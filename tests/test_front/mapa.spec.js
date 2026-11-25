// @ts-check
// Pré-condição: site (porta 3000) e API (porta 8000) rodando, com os dados de data/raw importados.
import { test, expect } from '@playwright/test';
import { PaginaMapa } from './pages/PaginaMapa.js';

/** @type {PaginaMapa} */
let mapa;

test.beforeEach(async ({ page }) => {
  mapa = new PaginaMapa(page);
  await mapa.abrir();
});

test.describe('CT-FE-01 · Carregamento da página do mapa', () => {
  test('mostra mapa, filtros e área de indicadores', async () => {
    await expect(mapa.titulo).toBeVisible();
    await expect(mapa.estadosNoMapa).toHaveCount(27);
    await expect(mapa.selectEstado).toBeVisible();
    await expect(mapa.selectDimensao).toBeVisible();
    await expect(mapa.comparacao).toBeVisible();
    await expect(mapa.linhaTempo).toBeVisible();
    await expect(mapa.visualizacao).toBeVisible();
  });
});

test.describe('CT-FE-02 · Filtro por estado', () => {
  test('filtro do mapa: resumo e painel mostram só o estado escolhido', async () => {
    await mapa.esperarMapaCarregar();
    await mapa.filtrarEstado('DF');

    await expect(mapa.resumoFiltros).toHaveText('Filtrando por estado: DF.');
    await expect(mapa.painelEstado.getByRole('heading')).toContainText('Distrito Federal');
  });

  test('tabela e gráfico mostram só o estado escolhido', async () => {
    await mapa.verIndicadoresDoEstado('DF');

    await expect(mapa.statusVisualizacao).toContainText('Exibindo indicadores de Distrito Federal (DF)');
    await expect(mapa.tabela).toContainText('Indicadores de Distrito Federal (DF)');
    await expect(mapa.tabela.getByRole('row')).toHaveCount(5); // cabeçalho + 4 indicadores
    await expect(mapa.grafico).toHaveAttribute('aria-label', /indicadores de DF/);
  });

  test('limpar filtros volta ao estado inicial', async () => {
    await mapa.filtrarEstado('DF');
    await mapa.filtrarDimensao('renda');
    await expect(mapa.resumoFiltros).toHaveText('Filtrando por estado: DF, dimensão: renda.');

    await mapa.botaoLimparFiltros.click();
    await expect(mapa.resumoFiltros).toHaveText('Escolha um estado e/ou uma dimensão para filtrar.');
  });
});

test.describe('CT-FE-03 · Filtro por índice', () => {
  for (const dimensao of ['idhm_geral', 'renda', 'longevidade', 'educacao']) {
    test(`dimensão ${dimensao} atualiza o mapa sem recarregar a página`, async ({ page }) => {
      await mapa.esperarMapaCarregar();
      await mapa.filtrarEstado('SP');
      // marca a página: se ela recarregar, a marca some
      await page.evaluate(() => { /** @type {any} */ (window).__semRecarregar = true; });

      const resposta = page.waitForResponse((r) =>
        r.url().includes('/api/indicadores?') && r.url().includes(`dimensao=${dimensao}`));
      await mapa.filtrarDimensao(dimensao);
      expect((await resposta).ok()).toBe(true);

      await expect(mapa.resumoFiltros).toHaveText(`Filtrando por estado: SP, dimensão: ${dimensao}.`);
      // o painel do estado passa a mostrar só a dimensão escolhida
      await expect(mapa.linhasPainelEstado).toHaveCount(1);
      await expect(mapa.linhasPainelEstado).toContainText(dimensao);
      expect(await page.evaluate(() => /** @type {any} */ (window).__semRecarregar)).toBe(true);
    });
  }
});

test.describe('CT-FE-05 · Comparação entre estados', () => {
  test('mostra um card por estado, com os 4 indicadores', async () => {
    await mapa.compararEstados('DF', 'SP');

    await expect(mapa.statusComparacao).toContainText('Comparando DF e SP');
    await expect(mapa.cardsComparacao).toHaveCount(2);
    await expect(mapa.cardDoEstado('DF').getByRole('heading')).toHaveText(/^Distrito Federal \(DF\) · \d{4}$/);
    await expect(mapa.cardDoEstado('SP').getByRole('heading')).toHaveText(/^São Paulo \(SP\) · \d{4}$/);
    for (const uf of ['DF', 'SP']) {
      await expect(mapa.cardDoEstado(uf).locator('.comparacao__linha')).toHaveCount(4);
    }
  });

  test('valores da comparação são iguais aos da tabela do mesmo estado', async () => {
    await mapa.compararEstados('DF', 'SP');
    await expect(mapa.cardsComparacao).toHaveCount(2);

    await mapa.verIndicadoresDoEstado('DF');
    await expect(mapa.tabela).toBeVisible();

    for (const indicador of ['IDHM Geral', 'IDHM Renda', 'IDHM Educação', 'IDHM Longevidade']) {
      const valorTabela = (await mapa.valorNaTabela(indicador).textContent())?.trim() ?? '';
      await expect(mapa.cardDoEstado('DF').locator('.comparacao__linha', { hasText: indicador }))
        .toContainText(valorTabela);
    }
  });

  test('não deixa escolher o mesmo estado nos dois lados', async () => {
    await mapa.selectEstadoA.selectOption('DF');

    await expect(mapa.selectEstadoB.locator('option[value="DF"]')).toBeDisabled();
  });
});

test.describe('Extra · Linha do Tempo (evolução ao longo dos anos)', () => {
  test('linha do tempo mostra a série completa do estado', async () => {
    await mapa.verLinhaTempo('AM', 'longevidade');

    await expect(mapa.statusLinhaTempo).toHaveText('Exibindo a evolução de IDHM Longevidade em AM, de 1991 a 2024.');
    await expect(mapa.linhaTempo.getByRole('heading', { name: /IDHM Longevidade, Amazonas \(AM\)/ })).toBeVisible();
    await expect(mapa.graficoLinhaTempo).toBeVisible();
  });

});

test.describe('CT-FE-06 · Mapa interativo (Leaflet)', () => {
  test('passar o mouse mostra o nome e clicar abre o painel do estado', async () => {
    await mapa.esperarMapaCarregar();
    const estado = mapa.estadosNoMapa.nth(12);

    await estado.hover();
    await expect(mapa.tooltip).toBeVisible();
    const nome = (await mapa.tooltip.textContent())?.trim() ?? '';
    expect(nome).not.toBe('');

    await estado.click();
    await expect(mapa.painelEstado.getByRole('heading')).toContainText(nome);
    await expect(mapa.linhasPainelEstado).toHaveCount(4); // geral, renda, educação, longevidade
  });

});
