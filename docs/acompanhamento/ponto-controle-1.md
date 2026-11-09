# Ponto de Controle 1 — Apresentação do Projeto (Sprints 1 a 6)

Esta página consolida o roteiro e os resultados do **1º Ponto de Controle** do **Brasil Hub** (Equipe Dijkstra), cobrindo o que o produto faz, como nossa metodologia ágil funciona na prática, os problemas reais que enfrentamos e resolvemos, como demonstrar a versão estável (`main`) e nossos próximos passos.

---

## 1. O que o Brasil Hub realmente faz

O **Brasil Hub** é uma plataforma web interativa que centraliza e traduz indicadores socioeconômicos oficiais dos 27 estados brasileiros (**IDHM Geral, Renda, Educação e Longevidade**, a partir de bases do IBGE/IPEA) em visualizações acessíveis.

- **Qual problema resolvemos:** Dados oficiais costumam estar espalhados em planilhas brutas extensas, difíceis de cruzar rapidamente por cidadãos, estudantes, jornalistas e gestores públicos.
- **Como o sistema funciona hoje (2 fluxos integrados na `main`):**
  1. **Fluxo do Visitante (Público):** Consulta visual em um **mapa coroplético interativo do Brasil** (Leaflet), filtros dinâmicos por **Estado** e **Dimensão do IDH**, painel lateral de detalhes da UF, ferramentas de **acessibilidade** (ajuste de fonte `A+`/`A-`, modo noturno e alto contraste) e layout **responsivo** para computador e celular.
  2. **Fluxo do Administrador (Restrito):** Login protegido com senhas criptografadas em banco (`bcrypt`) e painel administrativo para **upload de novas planilhas `.csv`**, que são validadas com `Pandas` e atualizadas no banco **PostgreSQL 17** via *upsert* transacional.

---

## 2. Como estamos desenvolvendo (Nossa Metodologia Ágil na prática)

Adotamos uma combinação enxuta de **Scrum + XP (Extreme Programming)**, adaptada à realidade de rotina da nossa equipe de 8 integrantes:

### 2.1. Ciclos semanais e divisão em duplas
- **Sprints de 7 dias:** Planejamento guiado pela priorização **MoSCoW** definida no [Documento de Visão](../documentos/visao/escopo-backlog.md). Nossa meta para este Ponto de Controle era entregar **100% dos requisitos MUST até a Sprint 6**, todos já integrados na `main`.
- **Programação em Pares com Rotação:** As issues de cada sprint são distribuídas entre **4 duplas** (alternando entre Front-end, Back-end, Banco de Dados e Testes).
- **Fluxo de Branches e Revisão Cruzada:**
  - Ninguém faz commit direto na `main` ou na `developer`.
  - Cada dupla cria sua branch de tarefa, desenvolve, roda os testes e abre um **Pull Request** para a `developer`.
  - **Outra dupla atua como revisora**: baixa a branch, testa na máquina, verifica o pipeline do GitHub Actions (`116 testes` no `pytest`) e só aprova o merge quando os critérios de aceitação estão cumpridos.
  - Ao final da sprint, após validarmos a `developer`, abrimos o PR consolidado para a `main`.

### 2.2. Adaptação de Processo: Por que substituímos reuniões síncronas pelas Dailies assíncronas?
No início do projeto, tentamos realizar reuniões síncronas tradicionais (como *Sprint Review* e *Planning* presenciais/online após a aula). Na prática, percebemos que esse formato **não estava sendo proveitoso**:
- Nas reuniões síncronas, **apenas cerca de 4 integrantes conseguiam permanecer do início ao fim**.
- Vários colegas precisavam chegar depois do início ou sair antes do término por motivos reais de rotina: deslocamento longo (morar longe e depender de transporte para voltar para casa com tranquilidade), trabalho, compromissos pessoais e atividades de outras disciplinas.
- Insistir em reuniões síncronas com metade do time ausente gerava retrabalho de comunicação e consumia tempo de desenvolvimento.

**Como resolvemos (Inspeção e Adaptação):**
1. **Adoção definitiva das Dailies assíncronas no WhatsApp:** Todos os dias cada integrante envia sua atualização rápida (o que planejava fazer, o que fez, o que travou e próximos passos).
2. **Consolidação transparente no GitHub Pages com apoio de IA:** Coletamos os relatos diários do grupo, sintetizamos o panorama do dia com auxílio de IA e publicamos cada daily aqui no GitHub Pages (registrando de forma transparente tanto os avanços quanto quem não enviou registro no dia).
3. **Validação contínua nos Pull Requests:** Em vez de esperar uma reunião de *Sprint Review* para ver o código funcionando, a inspeção do incremento acontece diretamente na revisão cruzada dos Pull Requests e na execução documentada dos casos de teste (`TC-01` a `TC-10`).

Links rápidos do nosso acompanhamento:
- [Sprint 3 — Ambiente e Backend Base](sprints/sprint03/index.md) | [Dailies S3](sprints/sprint03/dailies/dailies.md)
- [Sprint 4 — Mapa Interativo e Filtros](sprints/sprint04/index.md) | [Dailies S4](sprints/sprint04/dailies/dailies.md)
- [Sprint 5 — Segurança e Área Administrativa](sprints/sprint05/index.md) | [Dailies S5](sprints/sprint05/dailies/dailies.md)
- [Sprint 6 — Acessibilidade, Responsividade e Confiabilidade](sprints/sprint06/index.md) | [Dailies S6](sprints/sprint06/dailies/dailies.md)
- [Sprint 7 — Comparação e Visualização (Em andamento)](sprints/sprint07/index.md) | [Dailies S7](sprints/sprint07/dailies/dailies.md)

---

## 3. Quais dificuldades já tivemos e como resolvemos

| Dificuldade enfrentada | Impacto observado | Como resolvemos |
|---|---|---|
| **Baixa presença nas reuniões síncronas** (apenas ~4 membros do início ao fim por distância/transporte, trabalho e outras matérias) | Perda de tempo e alinhamento incompleto entre os 8 membros. | Substituímos reuniões longas por **Dailies assíncronas diárias no WhatsApp** registradas no GitHub Pages e **Code Review rigoroso nos PRs**. |
| **Gargalo de dependência entre Back-end e Front-end na Sprint 5** | A tela de login/upload (`S5-04`) e a validação (`S5-05`) ficaram bloqueadas esperando os endpoints do back-end em semana de provas, fechando a Sprint 5 com **60% de conclusão**. | Na Sprint 6, priorizamos os 2 débitos mantendo os responsáveis originais (quitando **100% das pendências da S5** nos primeiros dias) e passamos a definir o contrato JSON da API antes, subindo a conclusão na Sprint 6 para **83,3%** (e 100% após o fechamento do `B-03`). |
| **Limitações do SQLite inicial para o fluxo de upload administrativo** | Dificuldade para garantir persistência isolada e *upsert* transacional entre containers. | Migramos o banco para **PostgreSQL 17 via Docker Compose** e configuramos um container PostgreSQL real também no **GitHub Actions** para rodar os testes de integração automaticamente. |
| **Bugs visuais e critérios incompletos detectados antes do merge** | Na revisão da acessibilidade (`B-03`), uma mudança de tag no rodapé quebrava o CSS e faltavam botões de fonte e alto contraste. | A dupla revisora segurou o merge na `developer`, documentou os ajustes na issue/PR e só integrou na `main` quando todos os itens e testes foram concluídos. |

---

## 4. Projeto rodando ao vivo (Baseado na `main` — até a Sprint 6)

### 4.1. Como subir o projeto rapidamente (Linux e Windows)

**1. Criar o arquivo `.env` a partir do `.env.example`:**

- **Linux:**
  ```bash
  cp .env.example .env
  ```
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```

**2. Subir Banco (PostgreSQL), Back-end (FastAPI) e Front-end (Nginx) com Docker:**
```bash
docker compose up -d --build
```

**3. Carregar os 4 CSVs iniciais do IBGE/IPEA (1.728 registros) e criar o Admin:**
```bash
docker compose exec backend python -m src.data.importar_csv
docker compose exec backend python -m scripts.seed_admin
```

---

### 4.2. Roteiro de verificação passo a passo na apresentação

Com os containers ativos, acesse **<http://localhost:3000/index.html>** e verifique cada entrega:

1. **Acessibilidade (`B-03`) — Topo de qualquer página:**
   - Clique em **`A+`** e **`A-`** para aumentar e diminuir o tamanho da fonte em toda a interface.
   - Clique no botão de **Tema Escuro / Claro** (ícone de lua/sol).
   - Clique no botão de **Alto Contraste** e navegue entre `index.html`, `sobre.html` e `mapa.html` para ver que a preferência fica salva.
2. **Mapa Interativo e Filtros (`B-01`, `B-02` e `B-05`) — `<http://localhost:3000/mapa.html>`:**
   - Clique em diferentes estados no mapa para ver o painel fixo exibir o nome da UF, a dimensão, o valor do indicador e o ano.
   - Filtre por **Estado** (ex: `Distrito Federal`) e por **Dimensão do IDH** (`Renda`, `Educação`, `Longevidade`) e observe a resposta imediata (< 3 segundos).
   - Clique em **Limpar filtros** para restaurar o mapa completo.
3. **Responsividade Mobile (`B-08`):**
   - Pressione `F12` no navegador e ative a visualização de dispositivo móvel (`414x846`) para mostrar a adaptação do cabeçalho, dos filtros, da legenda e do zoom do mapa.
4. **Área do Administrador: Login e Upload de CSV (`B-09` e `B-04`) — `<http://localhost:3000/area-adm.html>`:**
   - **Teste de segurança:** tente entrar com uma senha incorreta e veja o bloqueio (`Credenciais inválidas`).
   - **Login válido:** entre com as credenciais padrão criadas pelo `seed_admin`:
     - **Usuário:** `admin`
     - **Senha:** `troque-esta-senha` *(ou a definida em `ADMIN_SENHA` no seu `.env`)*
   - **Upload de CSV no Painel (`painel-adm.html`):** selecione um dos arquivos oficiais da pasta `data/raw/` do projeto (ex: `data/raw/idhm_geral_uf.csv`) e clique em **Enviar**. O sistema valida o arquivo com Pandas, faz o *upsert* no PostgreSQL e retorna mensagem de sucesso.
5. **API FastAPI e Suíte de 116 Testes Automatizados (`pytest`):**
   - Abra o Swagger em **<http://127.0.0.1:8000/docs>** para mostrar os endpoints documentados.
   - Para rodar os testes automatizados no terminal:
     - **Linux:** `PYTEST_DISABLE_PLUGIN_AUTOLOAD=1 python -m pytest -q`
     - **Windows:** `.\.venv\Scripts\python.exe -m pytest -q`

---

## 5. Próximos passos e expectativas (Sprints 7 a 9)

Com **100% dos requisitos MUST concluídos e entregues na `main`**, nosso foco nas semanas finais segue o planejamento do backlog:

- **Sprint 7 (Atual — `04/11 a 10/11`):** Requisitos **SHOULD**:
  - **`B-06` — Ferramenta de comparação lado a lado entre dois estados:** o endpoint `GET /api/indicadores/comparar` no Back-end (`S7-01`) **já foi concluído e integrado na `developer`**, e a interface de comparação no Front-end (`S7-02`) já está em desenvolvimento.
  - **`B-10` — Visualização em gráficos e tabelas dinâmicos:** evolução das visualizações complementares ao mapa.
- **Sprint 8 (`11/11 a 17/11`):** Requisitos **COULD** (`B-11` exportação de dados filtrados e `B-07` linha do tempo de evolução histórica) e execução de testes de sistema integrados.
- **Sprint 9 (`18/11 a 24/11`):** Estabilização geral, quitação de eventuais débitos técnicos, bateria final de testes e preparação da apresentação final da disciplina.

