// @ts-check
// CT-FE-10 (acessibilidade) e CT-FE-11 (responsividade).
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PaginaMapa } from './pages/PaginaMapa.js';

const PAGINAS = [
  { nome: 'inicial', caminho: '/' },
  { nome: 'mapa', caminho: '/mapa.html' },
  { nome: 'sobre', caminho: '/sobre.html' },
  { nome: 'login admin', caminho: '/area-adm.html' },
];

/**
 * Abre a página e espera o conteúdo principal (título e, se houver, o mapa) aparecer.
 * @param {import('@playwright/test').Page} page
 * @param {string} caminho
 */
async function abrirECarregar(page, caminho) {
  await page.goto(caminho);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const mapa = page.locator('#mapa-brasil path.leaflet-interactive');
  if (await page.locator('#mapa-brasil').count()) await mapa.first().waitFor();
}

test.describe('CT-FE-10 · Acessibilidade', () => {
  for (const { nome, caminho } of PAGINAS) {
    test(`página ${nome} não tem violações críticas (axe)`, async ({ page }) => {
      await abrirECarregar(page, caminho);

      const { violations } = await new AxeBuilder({ page }).analyze();
      const criticas = violations
        .filter((v) => v.impact === 'critical')
        .map((v) => `${v.id}: ${v.help} (${v.nodes.length} elemento(s))`);

      expect(criticas, 'violações críticas de acessibilidade').toEqual([]);
    });
  }

  test('filtros do mapa funcionam só com o teclado', async ({ page, browserName }) => {
    // O Safari/WebKit não leva o foco para <select> e <button> com Tab por padrão.
    test.skip(browserName === 'webkit', 'WebKit não foca controles de formulário com Tab por padrão.');

    const mapa = new PaginaMapa(page);
    await mapa.abrir();
    await mapa.filtrarEstado('DF');
    await expect(mapa.resumoFiltros).toHaveText('Filtrando por estado: DF.');

    // volta o foco para o select de estado e anda com Tab até o botão Limpar
    await mapa.selectEstado.focus();
    await page.keyboard.press('Tab');
    await expect(mapa.selectDimensao).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(mapa.botaoLimparFiltros).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(mapa.resumoFiltros).toHaveText('Escolha um estado e/ou uma dimensão para filtrar.');
  });

  test('é possível chegar aos filtros a partir do topo da página usando Tab', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'WebKit não foca controles de formulário com Tab por padrão.');

    const mapa = new PaginaMapa(page);
    await mapa.abrir();

    let chegou = false;
    for (let i = 0; i < 40 && !chegou; i++) {
      await page.keyboard.press('Tab');
      chegou = await mapa.selectEstado.evaluate((el) => el === document.activeElement);
    }
    expect(chegou, 'o select de estado deve receber foco via Tab').toBe(true);
  });
});

const TELAS = [
  { nome: 'celular', viewport: { width: 375, height: 667 } },
  { nome: 'desktop', viewport: { width: 1280, height: 800 } },
];

test.describe('CT-FE-11 · Responsividade', () => {
  for (const { nome: tela, viewport } of TELAS) {
    test.describe(`tela ${tela} (${viewport.width}px)`, () => {
      test.use({ viewport });

      for (const { nome, caminho } of PAGINAS) {
        test(`página ${nome} não tem rolagem horizontal`, async ({ page }) => {
          await abrirECarregar(page, caminho);

          const { larguraConteudo, larguraTela } = await page.evaluate(() => ({
            larguraConteudo: document.documentElement.scrollWidth,
            larguraTela: document.documentElement.clientWidth,
          }));
          expect(larguraConteudo, `conteúdo (${larguraConteudo}px) maior que a tela (${larguraTela}px)`)
            .toBeLessThanOrEqual(larguraTela);
          await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
        });
      }
    });
  }
});
