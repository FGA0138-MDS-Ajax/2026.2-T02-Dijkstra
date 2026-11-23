// @ts-check
// Page object da área do administrador: login (area-adm.html) e painel de upload (painel-adm.html).

export class PaginaAdmin {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // login
    this.campoUsuario = page.getByLabel('E-mail');
    this.campoSenha = page.getByLabel('Senha');
    this.botaoEntrar = page.getByRole('button', { name: 'Entrar' });

    // caixa de status (usada no login e no painel)
    this.tituloStatus = page.locator('#status-titulo');

    // painel
    this.boasVindas = page.getByText(/Bem-vindo,/);
    this.campoArquivo = page.getByLabel('Arquivo CSV');
    this.botaoEnviar = page.getByRole('button', { name: 'Enviar' });
    this.resultadoEnvio = page.locator('#resultado');
  }

  async abrirLogin() {
    await this.page.goto('/area-adm.html');
  }

  /** @param {string} usuario @param {string} senha */
  async fazerLogin(usuario, senha) {
    await this.campoUsuario.fill(usuario);
    await this.campoSenha.fill(senha);
    await this.botaoEntrar.click();
  }

  /**
   * Abre o painel como se o login já tivesse sido feito, gravando no sessionStorage
   * o mesmo que o front grava após um login bem-sucedido (api_client.js).
   * Credenciais fictícias: só servem com o upload simulado por route.fulfill.
   * @param {string} usuario
   */
  async abrirPainelComSessao(usuario = 'admin-teste') {
    await this.page.addInitScript((nome) => {
      sessionStorage.setItem('auth', 'Basic ' + btoa(`${nome}:senha-ficticia`));
      sessionStorage.setItem('usuario_admin', nome);
    }, usuario);
    await this.page.goto('/painel-adm.html');
  }

  async abrirPainelSemSessao() {
    await this.page.goto('/painel-adm.html');
  }

  /** @param {string} nome @param {string} conteudo @param {string} mimeType */
  async enviarArquivo(nome, conteudo, mimeType = 'text/csv') {
    await this.campoArquivo.setInputFiles({ name: nome, mimeType, buffer: Buffer.from(conteudo) });
    await this.botaoEnviar.click();
  }
}
