// @ts-check
// Pré-condição: site (porta 3000) e API (porta 8000) rodando, com os dados de data/raw importados.
import { test, expect } from '@playwright/test';
import { PaginaInicial } from './pages/PaginaInicial.js';

test.describe('CT-FE-01 · Carregamento da página inicial', () => {
  test('abre sem erros de console e mostra título, mapa e legenda', async ({ page }) => {
    /** @type {string[]} */
    const erros = [];
    page.on('console', (msg) => { if (msg.type() === 'error') erros.push(msg.text()); });
    page.on('pageerror', (erro) => erros.push(erro.message));

    const inicial = new PaginaInicial(page);
    await inicial.abrir();

    await expect(page).toHaveTitle(/Brasil Hub/);
    await expect(inicial.tituloPrincipal).toBeVisible();
    await expect(inicial.estadosNoMapa).toHaveCount(27);
    await expect(inicial.legendaMapa.getByText('Muito alto (≥ 0,800)')).toBeVisible();

    expect(erros, 'erros no console do navegador').toEqual([]);
  });
});

test.describe('Página inicial · navegação e acessibilidade básica', () => {
  /** @type {PaginaInicial} */
  let inicial;

  test.beforeEach(async ({ page }) => {
    inicial = new PaginaInicial(page);
    await inicial.abrir();
  });

  test('link Sobre do menu leva para a página Sobre', async ({ page }) => {
    await inicial.linkDoMenu('Sobre').click();

    await expect(page).toHaveURL(/sobre\.html/);
    await expect(page.getByRole('heading', { name: 'Sobre o Brasil Hub' })).toBeVisible();
  });

  test('botão Conheça-nos leva para a página Sobre', async ({ page }) => {
    await page.getByRole('link', { name: 'Conheça-nos' }).click();

    await expect(page).toHaveURL(/sobre\.html/);
  });

  test('botão Explorar o Mapa rola até a seção do mapa', async ({ page }) => {
    await page.getByRole('link', { name: 'Explorar o Mapa' }).click();

    await expect(page).toHaveURL(/#mapa/);
  });

  test('link Mapa do rodapé leva para a página do mapa', async ({ page }) => {
    await inicial.linkDoRodape('Mapa').click();

    await expect(page).toHaveURL(/mapa\.html/);
    await expect(page.getByRole('heading', { name: 'Mapa do Brasil Interativo' })).toBeVisible();
  });

  test('botões A+ e A- mudam o tamanho da fonte', async ({ page }) => {
    const html = page.locator('html');

    await inicial.botaoAumentarFonte.click();
    await expect(html).toHaveAttribute('data-font-scale', 'large');

    await inicial.botaoDiminuirFonte.click();
    await expect(html).not.toHaveAttribute('data-font-scale');
  });
});
