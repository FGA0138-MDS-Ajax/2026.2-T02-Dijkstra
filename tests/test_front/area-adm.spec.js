// @ts-check
// CT-FE-08 (login) usa a API real. CT-FE-09 (upload) simula a API com route.fulfill,
// então nenhum teste altera o banco.
//
// O login com sucesso só roda se as credenciais estiverem no ambiente:
//   ADMIN_USUARIO=admin ADMIN_SENHA=sua-senha npx playwright test
import { test, expect } from '@playwright/test';
import { PaginaAdmin } from './pages/PaginaAdmin.js';

const ROTA_UPLOAD = '**/api/admin/indicadores/upload';
const CSV_VALIDO = 'Sigla;Código;Estado;2024;\nDF;53;Distrito Federal;0,866;\n';

test.describe('CT-FE-08 · Área admin: login', () => {
  test('sem login, o painel redireciona para a tela de login', async ({ page }) => {
    const admin = new PaginaAdmin(page);
    await admin.abrirPainelSemSessao();

    await expect(page).toHaveURL(/area-adm\.html/);
    await expect(admin.botaoEntrar).toBeVisible();
  });

  test('senha errada mostra erro e não libera o painel', async ({ page }) => {
    const admin = new PaginaAdmin(page);
    await admin.abrirLogin();
    await admin.fazerLogin('usuario-inexistente', 'senha-errada');

    await expect(admin.tituloStatus).toHaveText('Erro no login');
    await expect(page).toHaveURL(/area-adm\.html/);
  });

  test('com credenciais certas, o painel é liberado', async ({ page }) => {
    const usuario = process.env.ADMIN_USUARIO;
    const senha = process.env.ADMIN_SENHA;
    test.skip(!usuario || !senha, 'Defina ADMIN_USUARIO e ADMIN_SENHA para rodar este teste.');

    const admin = new PaginaAdmin(page);
    await admin.abrirLogin();
    await admin.fazerLogin(/** @type {string} */ (usuario), /** @type {string} */ (senha));

    await expect(page).toHaveURL(/painel-adm\.html/);
    await expect(admin.boasVindas).toContainText(`Bem-vindo, ${usuario}!`);
  });
});

test.describe('CT-FE-09 · Área admin: upload de CSV', () => {
  test('CSV válido mostra confirmação de dados atualizados', async ({ page }) => {
    /** @type {import('@playwright/test').Request | null} */
    let requisicao = null;
    await page.route(ROTA_UPLOAD, (route) => {
      requisicao = route.request();
      return route.fulfill({ json: { mensagem: 'ok' } });
    });
    const admin = new PaginaAdmin(page);
    await admin.abrirPainelComSessao();

    await admin.enviarArquivo('idhm_teste.csv', CSV_VALIDO);

    await expect(admin.tituloStatus).toHaveText('Dados atualizados');
    await expect(admin.resultadoEnvio).toHaveText('idhm_teste.csv: atualização concluída.');
    // o front mandou o arquivo com o cabeçalho de autenticação
    expect(requisicao).not.toBeNull();
    expect(await /** @type {any} */ (requisicao).headerValue('authorization')).toMatch(/^Basic /);
  });

  test('arquivo que não é .csv é barrado sem chamar a API', async ({ page }) => {
    let chamouApi = false;
    await page.route(ROTA_UPLOAD, (route) => { chamouApi = true; return route.abort(); });
    const admin = new PaginaAdmin(page);
    await admin.abrirPainelComSessao();

    await admin.enviarArquivo('dados.txt', 'qualquer coisa', 'text/plain');

    await expect(admin.tituloStatus).toHaveText('Arquivo inválido');
    await expect(admin.resultadoEnvio).toHaveText('Nenhum arquivo enviado nesta sessão.');
    expect(chamouApi).toBe(false);
  });

  test('CSV rejeitado pelo servidor mostra o motivo e não confirma atualização', async ({ page }) => {
    await page.route(ROTA_UPLOAD, (route) =>
      route.fulfill({ status: 422, json: { detail: 'Colunas obrigatórias ausentes' } }));
    const admin = new PaginaAdmin(page);
    await admin.abrirPainelComSessao();

    await admin.enviarArquivo('quebrado.csv', 'coluna_errada\n1\n');

    await expect(admin.tituloStatus).toHaveText('Arquivo rejeitado');
    await expect(admin.resultadoEnvio).toHaveText('quebrado.csv: Colunas obrigatórias ausentes');
  });

  test('sessão expirada no upload pede login de novo', async ({ page }) => {
    await page.route(ROTA_UPLOAD, (route) => route.fulfill({ status: 401, json: { detail: 'Não autorizado' } }));
    const admin = new PaginaAdmin(page);
    await admin.abrirPainelComSessao();

    await admin.enviarArquivo('idhm_teste.csv', CSV_VALIDO);

    await expect(admin.tituloStatus).toHaveText('Sessão expirada');
    await expect(admin.resultadoEnvio).toHaveText('Envio não autorizado.');
  });
});
