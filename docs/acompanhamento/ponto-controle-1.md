# Ponto de Controle 1 — Brasil Hub

> **Equipe Dijkstra** • Sprints 1 a 6 concluídas • **100% dos requisitos MUST entregues na `main`**

---

## 1. O que o projeto faz

!!! info "Problema vs. Solução"
    - **Problema:** Dados do IDHM dos estados brasileiros (IBGE/IPEA) estão espalhados em planilhas brutas e difíceis de visualizar.
    - **Solução:** Plataforma web interativa para explorar, visualizar e atualizar indicadores de **Renda, Educação, Longevidade e IDHM Geral** das 27 UFs.

| Perfil | O que já faz hoje no sistema (`main`) |
| :--- | :--- |
| **Visitante (Público)** | • Explora o **mapa interativo** por cores (Leaflet)<br>• Filtra por **Estado** e **Dimensão do IDH**<br>• Usa **Acessibilidade** (`A+`, `A-`, Modo Escuro e Alto Contraste)<br>• Acessa pelo **Computador ou Celular** (Responsivo) |
| **Administrador (Restrito)** | • Faz **login seguro** (senhas em hash `bcrypt`)<br>• Envia novas **planilhas `.csv`** pelo painel web<br>• Atualiza o banco de dados relacional automaticamente |

---

### 1.1. Situação dos Requisitos: Atendidos vs. A Concluir

A tabela a seguir consolida o estado de atendimento de todos os requisitos do backlog (B-01 a B-11), discriminando o que já foi integralmente entregue até a Sprint 6 e o que compõe o cronograma de fechamento (Sprints 7 a 9):

| Código | Requisito | Tipo | Prioridade | Sprint Prevista | Situação Atual | O que foi entregue / Próximos passos |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- |
| **B-01** | Mapa Interativo | Funcional | **MUST** | 4 | **Atendido ✅** | Mapa do Brasil (Leaflet) com polígonos das 27 UFs coloridos por faixa de IDHM, legenda dinâmica e painel lateral de detalhes. |
| **B-02** | Filtros Dinâmicos | Funcional | **MUST** | 4 | **Atendido ✅** | Seleção combinada por Estado e Dimensão (Renda, Educação, Longevidade) integrada à API REST. |
| **B-03** | Recursos de Acessibilidade | Funcional | **MUST** | 6 | **Atendido ✅** | Botões de ajuste tipográfico (`A+`/`A-`), Modo Noturno e Alto Contraste no cabeçalho sem reload de página. |
| **B-04** | Gestão e Upload de Dados (Admin) | Funcional | **MUST** | 5 | **Atendido ✅** | Painel web autenticado com envio de arquivos CSV do IBGE, validação com Pandas e persistência atômica. |
| **B-05** | Desempenho da Consulta | Não Funcional | **MUST** | 3 | **Atendido ✅** | Consultas e filtros respondem com latência média inferior a 3 segundos (homologado via testes automatizados). |
| **B-08** | Compatibilidade e Responsividade | Não Funcional | **MUST** | 6 | **Atendido ✅** | Layout adaptável a telas mobile a partir de 360 px e validado nos navegadores Chrome, Firefox e Edge. |
| **B-09** | Segurança e Hash de Senhas | Não Funcional | **MUST** | 5 | **Atendido ✅** | Armazenamento de credenciais protegido com algoritmo criptográfico `bcrypt` e proteção de rotas restritas. |
| **B-06** | Comparação Lado a Lado entre Estados | Funcional | **SHOULD** | 7 | **Em andamento 🔄** | **Back-end concluído na `developer`** (endpoint `/api/comparacao`); integração visual da interface em andamento. |
| **B-10** | Visualização em Gráficos e Tabelas | Funcional | **SHOULD** | 7 | **A iniciar ⏳** | Modelagem de dados e endpoints analíticos planejados para a Sprint 7. |
| **B-07** | Linha do Tempo e Evolução Histórica | Funcional | **COULD** | 8 | **A iniciar ⏳** | Planejado para a Sprint 8 (funcionalidade incremental dependente de tempo extra). |
| **B-11** | Exportação de Dados em CSV/JSON | Funcional | **COULD** | 8 | **A iniciar ⏳** | Planejado para a Sprint 8 (download estruturado dos dados filtrados). |

---

### 1.2. Situação dos Testes de Software: Atendidos vs. A Concluir

A tabela a seguir apresenta o mapeamento dos Casos de Teste (TC-01 a TC-12) do Documento de Visão, demonstrando o nível de teste, a abordagem de execução e a cobertura atual de qualidade:

| Caso | Requisito Associado | Nível de Teste | Abordagem | Situação Atual | Evidência / Onde está implementado |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **TC-01** | B-02 (Filtros) | Unitário | Automatizado | **Atendido ✅** | `test_filtros_sao_enviados_como_parametros()` em `tests/test_indicador_repository.py`. |
| **TC-02** | B-02 (API Filtros) | Integração | Automatizado | **Atendido ✅** | `test_sucesso_busca_indicadores_via_http()` e validações de borda em `tests/test_funcionalidade_api.py`. |
| **TC-03** | B-01 (Mapa) | Sistema | Manual (Interface) | **Atendido ✅** | Renderização das 27 UFs e abertura de cards informativos em `src/frontend/mapa.html`. |
| **TC-04** | B-03 (Acessibilidade) | Sistema | Manual (Interface) | **Atendido ✅** | Controles `A+`/`A-`, contraste e tema escuro validados na interface (PR #71). |
| **TC-05** | B-04 (Upload CSV) | Integração / Sistema | Misto (Auto + Manual) | **Atendido ✅** | Testes de autenticação e validação em `tests/test_upload_indicadores.py` + tela `painel-adm.html`. |
| **TC-06** | B-05 (Desempenho ≤ 3s) | Integração | Automatizado | **Atendido ✅** | Medição via `time.perf_counter()` em `test_b05_dados_corretos_e_desempenho()` (`test_funcionalidade_api.py`). |
| **TC-07** | B-08 (Responsividade) | Sistema | Manual (Interface) | **Atendido ✅** | Testes em resoluções mobile (`414x846`, `712x1138`) e navegadores Chrome, Firefox e Edge (PR #63). |
| **TC-08** | B-09 (Hash de Senhas) | Integração | Automatizado | **Atendido ✅** | Validação de derivação `bcrypt` e bloqueio de vazamento em `tests/test_auth_service.py`. |
| **TC-09** | B-06 (Comparação de UFs) | Integração / Sistema | Misto (Auto + Manual) | **Em andamento 🔄** | Testes unitários e de API prontos (`test_comparacao_estados_sucesso()`); validação de UI em execução na Sprint 7. |
| **TC-10** | B-10 (Gráficos/Tabelas) | Sistema | Manual (Interface) | **A iniciar ⏳** | Roteiro de testes de componentes gráficos e ordenação tabular previsto para a Sprint 7. |
| **TC-11** | B-07 (Linha do Tempo) | Sistema | Manual (Interface) | **A iniciar ⏳** | Roteiro de testes cronológicos previsto para a Sprint 8 (COULD). |
| **TC-12** | B-11 (Exportação CSV/JSON) | Integração / Sistema | Automatizado + Manual | **A iniciar ⏳** | Validação de integridade de downloads prevista para a Sprint 8 (COULD). |

---

## 2. Como estamos desenvolvendo

!!! success "Nosso Fluxo na Prática (Scrum + XP)"
    1. **Sprints de 7 dias** com tarefas divididas em **4 duplas** (rotação entre Front-end e Back-end).
    2. **Proibido commit direto na `main` ou `developer`:** toda tarefa nasce em uma *branch* própria.
    3. **Revisão Cruzada (PR):** uma dupla faz o código -> outra dupla baixa, testa e aprova + **116 testes automatizados** rodam no GitHub Actions.
    4. **Rotação de Responsabilidades:** todos passam pelo front, back e banco de dados. Em cada Sprint ocorre essa alternância. 

!!! warning "Adaptação Real: Por que trocamos reuniões longas por Dailies assíncronas?"
    - **O que acontecia nas reuniões:** só **~4 integrantes** conseguiam ficar do início ao fim. Vários chegavam depois ou saíam antes por **morarem longe (horário de ônibus/volta para casa), trabalho, outras matérias e questões pessoais**.
    - **O que mudamos:** paramos de fazer reunião síncrona improdutiva e adotamos **100% Dailies assíncronas no WhatsApp + Validação direto nos Pull Requests**.
    - **Como registramos:** coletamos os relatos diários no WhatsApp e usamos IA para resumir o dia aqui no GitHub Pages (mostrando quem fez o quê e quem não enviou).

| Sprint | Foco da Entrega | Status | Acesso Rápido |
| :--- | :--- | :---: | :--- |
| **Sprint 3** | Ambiente Docker, Pandas e API Base (`B-05`) | ✅ | [Visão Geral](sprints/sprint03/index.md) • [Dailies](sprints/sprint03/dailies/dailies.md) |
| **Sprint 4** | Mapa Interativo e Filtros (`B-01`, `B-02`) | ✅ | [Visão Geral](sprints/sprint04/index.md) • [Dailies](sprints/sprint04/dailies/dailies.md) |
| **Sprint 5** | Login Admin e Upload CSV (`B-09`, `B-04`) | ✅ | [Visão Geral](sprints/sprint05/index.md) • [Dailies](sprints/sprint05/dailies/dailies.md) |
| **Sprint 6** | Acessibilidade, Mobile e Testes (`B-03`, `B-08`) | ✅ | [Visão Geral](sprints/sprint06/index.md) • [Dailies](sprints/sprint06/dailies/dailies.md) |
| **Sprint 7** | Comparação entre Estados e Gráficos (`B-06`, `B-10`) | 🔄 | [Visão Geral](sprints/sprint07/index.md) • [Dailies](sprints/sprint07/dailies/dailies.md) |

---

## 3. Dificuldades que tivemos e como resolvemos

| Problema que enfrentamos | Como resolvemos |
| :--- | :--- |
| **Reuniões com só metade do grupo presente** | Migramos para **Dailies no WhatsApp** documentadas no GitHub Pages e **Sprint Review dentro dos PRs**. |
| **Atraso em cascata na Sprint 5 (60% concluída)**<br>*(Front-end ficou esperando o Back-end em semana de provas)* | Na Sprint 6, mantivemos os responsáveis originais para **quitar 100% das pendências da S5 logo no início** e passamos a combinar o JSON da API antes. |
| **Concorrência e atomicidade em uploads de dados** | Estruturamos a ingestão com Pandas e transações controladas no banco de dados, assegurando tratamento atômico e rollback em caso de inconsistência de arquivos. |

---

## 4. Rodando o projeto no dia 09-11 (`main` — até a Sprint 6)

??? note "Comandos para subir o projeto (clique para abrir)"

    **1. Criar o `.env`:**
    ```bash
    # Linux
    cp .env.example .env

    # Windows (PowerShell)
    Copy-Item .env.example .env
    ```

    **2. Subir containers e carregar dados:**
    ```bash
    docker compose up -d --build
    docker compose exec backend python -m src.data.importar_csv
    docker compose exec backend python -m scripts.seed_admin
    ```

### O que vamos mostrar na tela agora:

- [x] **1. Acessibilidade (`B-03`) — Topo do site (`http://localhost:3000`):**
  Testar botões **`A+` / `A-`**, **Modo Noturno** e **Alto Contraste**.
- [x] **2. Mapa e Filtros (`B-01`, `B-02`, `B-05`) — `mapa.html`:**
  Clicar nos estados para ver o painel lateral + filtrar por **Estado** e **Dimensão** (`Renda`, `Educação`, `Longevidade`).
- [x] **3. Responsividade (`B-08`) — Modo Celular (`F12`):**
  Mostrar adaptação do menu, filtros e zoom do mapa em tela mobile.
- [x] **4. Área do Administrador (`B-09` e `B-04`) — `area-adm.html`:**
  1. Testar senha errada (bloqueio `401`).
  2. Logar com usuário **`admin`** e senha **`troque-esta-senha`**.
  3. No painel (`painel-adm.html`), enviar o arquivo **`data/raw/idhm_geral_uf.csv`** e ver a atualização no banco.
- [x] **5. API e Testes (`http://127.0.0.1:8000/docs`):**
  Mostrar rotas no Swagger e os **116 testes automatizados** (`pytest`).

---

## 5. Próximos Passos (Sprints 7 a 9)

| Etapa | O que vem agora |
| :--- | :--- |
| **Sprint 7 (Atual)** | • **Comparação lado a lado entre 2 estados (`B-06`):** Back-end já pronto na `developer`; Front-end em andamento.<br>• **Gráficos e tabelas dinâmicos (`B-10`).** |
| **Sprint 8** | • Funcionalidades extras: **Exportação de dados (`B-11`)** e **Linha do tempo (`B-07`)** + Testes de sistema. |
| **Sprint 9** | • Ajustes finais, revisão geral e apresentação final da disciplina. |
