# Brasil Hub

> **Plataforma integrada para consulta, visualização e análise de indicadores socioeconômicos das 27 Unidades Federativas brasileiras.**

<div class="bh-hero" markdown>

<div class="bh-hero-text" markdown>

<span class="bh-badge"><span class="bh-badge-dot"></span> MDS 2026.2 • Universidade de Brasília • Equipe Dijkstra</span>

### Indicadores do Brasil com Clareza e Rigor

Centralizamos indicadores públicos fundamentais (**IDHM**, **renda**, **educação** e **longevidade**), oferecendo visualização geográfica em mapas interativos e ferramentas de comparação direta entre estados e períodos históricos.

[Documento de Visão →](documentos/visao/index.md){ .md-button .md-button--primary }
[Documento de Arquitetura →](documentos/arquitetura/index.md){ .md-button }
[Ponto de Controle 1 →](acompanhamento/ponto-controle-1.md){ .md-button }

</div>

<div class="bh-hero-image" markdown>

![Mapa Oficial do Brasil](assets/brasil-map.png)

*Cartografia Interativa: Leaflet.js + GeoJSON IBGE*

</div>

</div>

<div class="bh-stats-bar" markdown>

| 27 | 11/11 | 12 | 100% |
| :---: | :---: | :---: | :---: |
| **UFs Mapeadas** | **Requisitos (B-01..11)** | **Casos de Teste (TC)** | **Sprints 1 a 7 Concluídas** |

</div>

---

## Estrutura da Documentação

Acesse diretamente os núcleos conceituais, técnicos e gerenciais do projeto:

<div class="grid cards" markdown>

-   ### 📄 Documento de Visão

    ---

    Contexto do problema, diagrama de Ishikawa, personas, objetivos estratégicos e modelo de processo de desenvolvimento de software.

    [Acessar Documento de Visão →](documentos/visao/index.md)

-   ### 🏛️ Documento de Arquitetura

    ---

    Visão lógica, casos de uso, diagrama de pacotes, persistência em SQLite, isolamento em contêineres Docker e restrições de implantação.

    [Acessar Documento de Arquitetura →](documentos/arquitetura/index.md)

-   ### 📋 Gestão do Produto

    ---

    Solução proposta, especificação de requisitos funcionais e não funcionais (B-01 a B-11) com rastreabilidade formal e critérios de aceitação.

    [Ver Requisitos do Sistema →](gestao/requisitos.md)

-   ### ⚡ Histórico de Sprints

    ---

    Planejamento semanal homogêneo (Sprints 01 a 09), acompanhamento de issues, registro de dailies, retrospectivas e métricas GQM.

    [Acompanhar Sprints →](acompanhamento/sprints/sprint01/sprint01.md)

-   ### 🧪 Matriz de Testes (TC)

    ---

    Roteiros de validação e testes de sistema (TC-01 a TC-12) cobrindo mapa territorial, acessibilidade, upload CSV e responsividade.

    [Ver Roteiro de Testes →](acompanhamento/testes.md)

-   ### 📐 Métricas & Padrões

    ---

    Abordagem GQM (M1 produtividade, M2 qualidade, M3 cobertura de testes), convenções de branch git, commits semânticos e code review.

    [Ver Métricas & Padrões →](metricas/gqm-projeto.md)

</div>

---

## Arquitetura Tecnológica e Camadas

A plataforma segue o princípio de separação de responsabilidades para assegurar testabilidade, manutenibilidade e baixo acoplamento:

| Camada | Tecnologia | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Apresentação (Frontend)** | HTML5, CSS3 Moderno, JavaScript ES6+ e Leaflet.js | Interface responsiva, mapa coroplético vetorial e acessibilidade (A+, A-, Alto Contraste). |
| **Serviços & API (Backend)** | Python 3.12 estruturado com FastAPI | Endpoints RESTful, serialização de contratos e orquestração de regras de negócio. |
| **Persistência de Dados** | SQLite 3.x com ingestão via Pandas | Armazenamento relacional dos indicadores históricos dos 26 estados e Distrito Federal. |
| **Qualidade & Homologação** | Pytest, Pytest-Cov e Testes de Sistema | Automação de testes unitários, de integração e validação de sistema (TC-01 a TC-12). |
| **Infraestrutura & DevOps** | Docker, Docker Compose e GitHub Actions | Paridade de ambientes de desenvolvimento/teste e pipeline contínuo de integração. |

---

## Governança e Informações Institucionais

- **Disciplina:** Métodos de Desenvolvimento de Software (MDS) — Semestre 2026.2
- **Instituição:** Universidade de Brasília (UnB) — Faculdade do Gama (FGA)
- **Orientação:** Prof. Ajax
- **Equipe:** Dijkstra
- **Repositório Oficial:** [GitHub FGA0138-MDS-Ajax/2026.2-T02-Dijkstra](https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra)
- **Mais Detalhes sobre a Equipe:** Consulte a seção [Sobre a Equipe Dijkstra](sobre.md).
