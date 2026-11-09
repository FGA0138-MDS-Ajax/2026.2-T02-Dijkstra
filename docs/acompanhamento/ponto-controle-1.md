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
| **Administrador (Restrito)** | • Faz **login seguro** (senhas em hash `bcrypt`)<br>• Envia novas **planilhas `.csv`** pelo painel web<br>• Atualiza o banco **PostgreSQL 17** automaticamente |

---

## 2. Como estamos desenvolvendo

!!! success "Nosso Fluxo na Prática (Scrum + XP)"
    1. **Sprints de 7 dias** com tarefas divididas em **4 duplas** (rotação entre Front-end, Back-end).
    2. **Proibido commit direto na `main` ou `developer`:** toda tarefa nasce em uma *branch* própria.
    3. **Revisão Cruzada (PR):** uma dupla faz o código -> outra dupla baixa, testa e aprova + **116 testes automatizados** rodam no GitHub Actions.

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
| **Limitação do SQLite para Upload de CSV** | Migramos para **PostgreSQL 17 em Docker** (e colocamos o Postgres também no GitHub Actions). Necessário atualizar documentação do uso do novo banco de dados. |

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
