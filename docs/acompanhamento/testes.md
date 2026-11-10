# Testes e Garantia de Qualidade

Quando começamos a desenvolver o **Brasil Hub**, sabíamos que lidar com dados públicos do IBGE e IPEA exigiria muito cuidado: um cálculo errado ou uma resposta truncada na API comprometeria a confiabilidade de toda a plataforma. Por isso, desde as primeiras sprints, estruturamos uma estratégia de testes que acompanhou o crescimento do sistema.

Esta página registra com transparência o que testamos até aqui (até o fechamento da Sprint 6), como testamos e o mapeamento exato de quais testes cobrem cada caso planejado no Documento de Visão.

---

## 1. Como nós testamos na prática?

Nem todo teste é igual. Ao longo das entregas, dividimos nossos testes em três níveis:

```
[ Testes Unitários ]       -> Testam funções isoladas (ex: tratamento de planilhas Pandas)
        ↓
[ Testes de Integração ]    -> Testam a conversa entre API (FastAPI) e Banco (PostgreSQL)
        ↓
[ Testes de Sistema ]       -> Testam o produto pronto na mão do usuário (pela interface web)
```

### O que temos rodando de forma automatizada hoje
No back-end, construímos uma suíte com **116 testes automatizados usando Pytest**. 

Para não depender da boa vontade de lembrar de rodar os testes antes de subir código, amarramos tudo no **GitHub Actions**:
- Toda vez que uma dupla abre um Pull Request para a `developer` ou para a `main`, um servidor sobe um container real do **PostgreSQL 17**, instala as dependências e roda a suíte completa.
- Se algum teste quebrar, o GitHub bloqueia o merge. Isso nos deu segurança para refatorar código sem medo de quebrar o que já estava pronto.

---

## 2. O que já está coberto no código?

Nossa suíte automatizada foca nas partes mais críticas da aplicação:

1. **Tratamento de Dados e Regras de Negócio (Pandas):**
   - Garantimos que nomes de estados com acento, siglas maiúsculas/minúsculas e colunas em ordens diferentes sejam padronizados.
   - Tratamos erros como planilhas corrompidas, arquivos sem extensão ou dados vazios sem que a aplicação trave.

2. **Segurança e Acesso Administrativo (bcrypt e sessões):**
   - Testamos se o login funciona com a senha correta e rejeita senhas erradas ou usuários inexistentes.
   - Garantimos uma regra de segurança essencial: **a senha pura nunca é gravada no banco** e o hash nunca é devolvido na resposta da API.

3. **Consultas da API e Desempenho (FastAPI):**
   - Validamos se os filtros de estado e dimensão retornam exatamente os registros pedidos.
   - Validamos o requisito **B-05**: as respostas da API acontecem em menos de 3 segundos.

4. **Upload de Indicadores e Banco de Dados (PostgreSQL):**
   - Testamos se apenas o administrador autenticado consegue enviar arquivos.
   - Testamos o comportamento transacional: se o arquivo tiver uma linha com defeito no meio, o banco cancela a operação inteira em vez de salvar dados pela metade.

---

## 3. Relação com os Casos de Teste (TC-01 a TC-12)

A tabela abaixo correlaciona diretamente cada caso de teste definido no Documento de Visão com os testes reais executados no projeto, indicando a função de teste e o arquivo responsável:

| Caso | Requisito | Nível | Como foi testado | Teste(s) responsável(is) / Evidência | Arquivo |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **TC-01** (Filtrar dados) | B-02 | Unitário | Automatizado | `test_filtros_sao_enviados_como_parametros()`<br>`test_filtros_combinados_chegam_ao_servico_com_tipos_corretos()`<br>`test_b05_filtros_validos()` | `tests/test_indicador_repository.py`<br>`tests/test_funcionalidade_api.py` |
| **TC-02** (API de filtros) | B-02 | Integração | Automatizado | `test_sucesso_busca_indicadores_via_http()`<br>`test_validacao_estado_vazio()`<br>`test_validacao_dimensao_invalida_ou_vazia()`<br>`test_validacao_periodo_limites_e_tipos_invalidos()`<br>`test_indicadores_sem_resultados_retorna_lista_vazia()` | `tests/test_funcionalidade_api.py` |
| **TC-03** (Exibição no mapa) | B-01 | Sistema | Manual (Interface) | Validação visual da pintura das UFs por faixa de IDHM e abertura do painel fixo de detalhes do estado. Evidências registradas em `docs/assets/testes/S4-03/` (TI-01 a TI-04). | `src/frontend/mapa.html` |
| **TC-04** (Acessibilidade) | B-03 | Sistema | Manual (Interface) | Testes funcionais dos controles de tamanho de fonte (`A+`/`A-`), modo escuro e alto contraste integrados à barra de navegação. Homologado no PR #71. | `src/frontend/js/theme.js`<br>`src/frontend/css/style.css` |
| **TC-05** (Upload de CSV) | B-04 | Sistema / Integração | Misto | **API (Automatizado):**<br>`test_upload_sem_autenticacao_retorna_401()`<br>`test_upload_com_senha_errada_retorna_401()`<br>`test_upload_valido_retorna_sucesso()`<br>`test_csv_vazio_e_rejeitado()`<br>`test_csv_latin1_retorna_400_pedindo_utf8()`<br>**UI (Manual):** Envio via tela `painel-adm.html` | `tests/test_upload_indicadores.py`<br>`src/frontend/painel-adm.html` |
| **TC-06** (Desempenho ≤ 3s) | B-05 | Integração | Automatizado | `test_b05_dados_corretos_e_desempenho()` (medição precisa com `time.perf_counter()`). | `tests/test_funcionalidade_api.py` |
| **TC-07** (Dispositivos/Telas) | B-08 | Sistema | Manual (Interface) | Validação de responsividade no Chrome, Firefox e Edge em resoluções desktop (`1280x950`) e mobile (`414x846`, `712x1138`, `800x1280`) na issue S6-02 (PR #63). | `src/frontend/css/style.css` |
| **TC-08** (Senha com hash) | B-09 | Integração | Automatizado | `test_autenticacao_sucesso()` (hash bcrypt e ausência de vazamento de `password_hash`)<br>`test_autenticacao_senha_incorreta()`<br>`test_login_com_credenciais_validas()` | `tests/test_auth_service.py`<br>`tests/test_funcionalidade_api.py` |
| **TC-09** (Comparar UFs) | B-06 | Sistema / Integração | Em andamento (S7) | `test_comparacao_estados_sucesso()`<br>`test_comparacao_estados_iguais_mesmo_ano()` | `tests/test_funcionalidade_api.py` |
| **TC-10** (Gráficos/Tabelas) | B-10 | Sistema | Não iniciado | Previsto para a Sprint 7. | — |
| **TC-11** (Linha do tempo) | B-07 | Sistema | Não iniciado | Previsto para a Sprint 8 (COULD). | — |
| **TC-12** (Exportação) | B-11 | Sistema | Não iniciado | Previsto para a Sprint 8 (COULD). | — |

---

## 4. Como rodar os testes na sua máquina

Para quem quiser reproduzir a suíte completa localmente:

1. Inicie o banco de dados de teste:
   ```bash
   docker compose up -d db
   ```

2. Com a `.venv` ativada, rode o Pytest:
   ```bash
   python -m pytest -q
   ```

*(Se quiser ver o nome de cada teste individual passando na tela, troque o `-q` por `-v`).*
