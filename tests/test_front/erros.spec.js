// @ts-check
// CT-FE-07: a API é simulada com page.route/route.fulfill para forçar erros e respostas vazias.
// Não depende do banco: só do site (porta 3000).
import { test, expect } from '@playwright/test';
import { PaginaMapa } from './pages/PaginaMapa.js';

/** URL da listagem de indicadores (sem pegar /comparar nem /historico). */
const ehListaIndicadores = (/** @type {URL} */ url) => url.pathname === '/api/indicadores';

test.describe('CT-FE-07 · Estado vazio e erro', () => {
  test('API fora do ar mostra aviso e botão de tentar de novo', async ({ page }) => {
    await page.route('**/health', (route) => route.fulfill({ status: 503, body: 'indisponível' }));
    const mapa = new PaginaMapa(page);
    await mapa.abrir();

    await expect(page.getByRole('heading', { name: 'Servidor indisponível' })).toBeVisible();
    await expect(mapa.botaoTentarNovamente).toBeVisible();
    // o resto da página continua de pé
    await expect(mapa.titulo).toBeVisible();
    await expect(mapa.selectEstado).toBeEnabled();
  });

  test('filtro sem resultados mostra "Sem resultados"', async ({ page }) => {
    const mapa = new PaginaMapa(page);
    await mapa.abrir();
    await mapa.esperarMapaCarregar();

    await page.route(ehListaIndicadores, (route) => route.fulfill({ json: [] }));
    await mapa.filtrarEstado('DF');

    await expect(page.getByRole('heading', { name: 'Sem resultados' })).toBeVisible();
    await expect(page.getByText('Nenhum indicador encontrado para os filtros selecionados.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Exportar CSV' })).toBeDisabled();
  });

  test('estado sem dados na tabela mostra mensagem em vez de tabela vazia', async ({ page }) => {
    await page.route(ehListaIndicadores, (route) => route.fulfill({ json: [] }));
    const mapa = new PaginaMapa(page);
    await mapa.abrir();

    await mapa.verIndicadoresDoEstado('DF');

    await expect(mapa.statusVisualizacao).toHaveText('Nenhum indicador encontrado para Distrito Federal.');
    await expect(mapa.tabela).toBeHidden();
  });

  test('erro 500 na tabela mostra a mensagem do servidor', async ({ page }) => {
    const mapa = new PaginaMapa(page);
    await mapa.abrir();
    await mapa.esperarMapaCarregar();

    await page.route(ehListaIndicadores, (route) =>
      route.fulfill({ status: 500, json: { detail: 'Falha ao consultar o banco' } }));
    await mapa.verIndicadoresDoEstado('DF');

    await expect(mapa.erroVisualizacao).toHaveText('Falha ao consultar o banco');
    await expect(mapa.tabela).toBeHidden();
  });

  test('sem conexão com a API, a comparação avisa em vez de quebrar', async ({ page }) => {
    await page.route('**/api/indicadores/comparar**', (route) => route.abort('connectionrefused'));
    const mapa = new PaginaMapa(page);
    await mapa.abrir();

    await mapa.compararEstados('DF', 'SP');

    await expect(mapa.statusComparacao).not.toContainText('Carregando');
    await expect(mapa.statusComparacao).not.toContainText('Comparando');
    await expect(mapa.cardsComparacao).toHaveCount(0);
  });

  test('linha do tempo sem dados históricos mostra aviso', async ({ page }) => {
    await page.route('**/api/indicadores/historico**', (route) =>
      route.fulfill({ json: { estado: 'AM', dimensao: 'renda', unidade: null, serie: [] } }));
    const mapa = new PaginaMapa(page);
    await mapa.abrir();

    await mapa.verLinhaTempo('AM', 'renda');

    await expect(mapa.statusLinhaTempo).toHaveText('Não há dados históricos disponíveis para esse estado e dimensão.');
    await expect(mapa.graficoLinhaTempo).toBeHidden();
  });
});
