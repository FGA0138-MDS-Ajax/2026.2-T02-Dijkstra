<div class="bh-masthead">
  <span>UNB / FGA • MÉTODOS DE DESENVOLVIMENTO DE SOFTWARE • 2026.2</span>
  <span class="bh-masthead-status"><span class="bh-live-dot"></span> EQUIPE DIJKSTRA • RELEASE 1.0</span>
</div>

<div class="bh-hero" markdown>

<div class="bh-hero-text" markdown>

<span class="bh-kicker">OBSERVATÓRIO TERRITORIAL • IBGE & PNUD (1991–2024)</span>

### Cartografia e inteligência de dados sobre o <span class="bh-serif">desenvolvimento humano</span> brasileiro.

O **Brasil Hub** estrutura séries históricas oficiais de **IDHM Geral**, **Renda**, **Educação** e **Longevidade** das 27 Unidades Federativas em uma arquitetura orientada a serviços, combinando visualização coroplética interativa, comparação interestadual e evolução temporal.

[Documento de Visão →](documentos/visao/index.md){ .md-button .md-button--primary }
[Arquitetura de Software](documentos/arquitetura/index.md){ .md-button }
[Ponto de Controle 1](acompanhamento/ponto-controle-1.md){ .md-button }

</div>

<div class="bh-hero-image" markdown>

<span class="bh-specimen-header"><span>FIG. 01 — MALHA TERRITORIAL (27 UFs)</span><span>LEAFLET + GEOJSON</span></span>

![Malha Cartográfica Oficial do Brasil Hub](assets/brasil-map.png)

<span class="bh-choropleth-bar"><span class="bh-choropleth-title"><span>ESCALA COROPLÉTICA (IDHM)</span><span>[0,000 — 1,000]</span></span><span class="bh-choropleth-scale"><span class="bh-scale-1"></span><span class="bh-scale-2"></span><span class="bh-scale-3"></span><span class="bh-scale-4"></span><span class="bh-scale-5"></span></span><span class="bh-choropleth-labels"><span>&lt; 0,500 (Baixo)</span><span>0,650</span><span>&ge; 0,800 (Muito Alto)</span></span></span>

</div>

</div>

<div class="bh-stats-bar" markdown>

| 27 UFs | 1.728 REGISTROS | 11/11 (B-01..B-11) | 108 TESTES + CI |
| :---: | :---: | :---: | :---: |
| **COBERTURA TERRITORIAL (1991–2024)** | **4 DIMENSÕES × 16 PERÍODOS** | **REQUISITOS IMPLEMENTADOS** | **PYTEST & ROTEIRO TC-01..12** |

</div>

## Índice de Engenharia e Documentação

<div class="grid cards" markdown>

-   <span class="bh-card-index">01 / CONCEPÇÃO & PRODUTO</span>
    <strong class="bh-card-title">Documento de Visão</strong>

    ---

    Formulação do problema, diagrama de causa e efeito (Ishikawa), perfis de usuário, escopo MoSCoW e modelo híbrido Scrum/XP.

    [Explorar Documento de Visão →](documentos/visao/index.md)

-   <span class="bh-card-index">02 / DESENHO TÉCNICO</span>
    <strong class="bh-card-title">Arquitetura Three-Tier</strong>

    ---

    Decomposição em camadas (Apresentação, Aplicação FastAPI/Pandas e Persistência), visões UML, pacotes e restrições de implantação.

    [Explorar Arquitetura →](documentos/arquitetura/index.md)

-   <span class="bh-card-index">03 / BACKLOG & REGRAS</span>
    <strong class="bh-card-title">Engenharia de Requisitos</strong>

    ---

    Especificação formal dos requisitos funcionais e não funcionais (`B-01` a `B-11`), regras de negócio e critérios de aceitação.

    [Consultar Requisitos →](gestao/requisitos.md)

-   <span class="bh-card-index">04 / EXECUÇÃO ITERATIVA</span>
    <strong class="bh-card-title">Sprints, Dailies e Atas</strong>

    ---

    Rastreabilidade semanal das Sprints 01 a 09, entregas por dupla, dailies documentadas, retrospectivas e atas de reunião.

    [Inspecionar Sprints →](acompanhamento/sprints/sprint01/sprint01.md)

-   <span class="bh-card-index">05 / VERIFICAÇÃO & HOMOLOGAÇÃO</span>
    <strong class="bh-card-title">Matriz de Testes (TC-01 a TC-12)</strong>

    ---

    Estratégia em três níveis (Unitário, Integração e Sistema), suíte automatizada no GitHub Actions e evidências de homologação.

    [Ver Matriz de Qualidade →](acompanhamento/testes.md)

-   <span class="bh-card-index">06 / GOVERNANÇA & INDICADORES</span>
    <strong class="bh-card-title">Métricas GQM e Padrões</strong>

    ---

    Medições GQM de projeto (M1 conclusão, M2 defeitos, M3 débito técnico) e negociais (cobertura por UF), além de políticas de Git e PR.

    [Analisar Métricas GQM →](metricas/gqm-projeto.md)

</div>

## Topologia Arquitetural do Sistema

| Camada Arquitetural | Stack & Módulos | Contrato e Responsabilidade Técnica |
| :--- | :--- | :--- |
| **01. Apresentação (Client-Side)** | `HTML5` · `CSS3 Custom Properties` · `ES6 Modules` · `Leaflet.js` · `SVG` | Renderização coroplética das 27 UFs, comparação lado a lado (`B-06`), série temporal em gráfico de linha (`B-07`), gráficos/tabelas (`B-10`), exportação CSV (`B-11`) e acessibilidade (`B-03`). |
| **02. Aplicação & Serviços (API)** | `Python 3.12` · `FastAPI` · `Pydantic v2` · `Pandas` · `bcrypt` | Validação de contratos REST (`/api/indicadores`, `/comparar`, `/historico`, `/admin`), higienização tabular de CSVs (`B-04`) e autenticação com derivação criptográfica (`B-09`). |
| **03. Persistência & Qualidade** | `SQLite / Relacional` · `Pytest` · `Docker Compose` · `GitHub Actions` | Armazenamento transacional atômico dos 1.728 registros históricos, isolamento de ambiente em contêineres e pipeline de integração contínua validando tempo de resposta ≤ 3s (`B-05`). |

## Ficha Institucional

| Atributo | Registro Oficial |
| :--- | :--- |
| **Instituição & Unidade** | Universidade de Brasília (UnB) — Faculdade do Gama (FGA) |
| **Disciplina & Orientação** | FGA0138 — Métodos de Desenvolvimento de Software (2026.2) • Prof. Dr. Ajax |
| **Equipe de Engenharia** | **Equipe Dijkstra** — [Conhecer integrantes e papéis →](sobre.md) |
| **Código-Fonte & Governança** | [Repositório GitHub Oficial (`FGA0138-MDS-Ajax/2026.2-T02-Dijkstra`)](https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra) • [Padrões de Branches e PRs →](padroes/branches.md) |
