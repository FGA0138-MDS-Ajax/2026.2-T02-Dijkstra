# Brasil Hub

> Plataforma integrada para consulta, visualização e análise de indicadores socioeconômicos das unidades federativas brasileiras.

---

## Sobre o Projeto  

O **Brasil Hub** é uma aplicação web desenvolvida para tornar os dados socioeconômicos do Brasil acessíveis e compreensíveis. A plataforma centraliza indicadores públicos fundamentais (como **IDHM**, **renda**, **educação** e **longevidade**), oferecendo visualização geográfica em mapas interativos e ferramentas de comparação direta entre estados e períodos.

O projeto é desenvolvido na disciplina de **Métodos de Desenvolvimento de Software (MDS)** da **Universidade de Brasília**, sob orientação do **Prof. Ajax**, no semestre **2026.2**, pela **Equipe Dijkstra**.

---

## Navegação Rápida

Acesse diretamente as principais seções da documentação:

| Seção | Objetivo | Acesso Direto |
| :--- | :--- | :--- |
|  **Sobre & Equipe** | Contexto do problema, proposta de valor e membros do time. | [Ir para Sobre](sobre.md) |
|  **Documentação do Projeto** | Documentos de Visão e de Arquitetura. | [Ir para Documento de Visão](documentos/visao/index.md) [Ir para Documento de Arquitetura](documentos/arquitetura/index.md)|
|  **Estratégia & Metodologia** | Processo ágil (Scrum/Kanban), papéis e critérios de DoR e DoD. | [Ir para Metodologia](estrategia/metodologia.md) |
|  **Acompanhamento & Sprints** | Cronograma da disciplina, atas de reunião e histórico de Sprints. | [Ir para Cronograma](acompanhamento/cronograma.md) |
|  **Padrões de Engenharia** | Padrões de branches, commits semânticos, Pull Requests e code review. | [Ir para Padrões](padroes/branches.md) |

---

## Tecnologias e Arquitetura

O sistema adota uma arquitetura em camadas para assegurar desacoplamento e testabilidade:

- **Interface:** HTML5 semântico, CSS moderno e JavaScript modular com integração à biblioteca Leaflet para mapas.
- **Serviços & API:** Python 3.12 estruturado com FastAPI, separando contratos de rotas e regras de negócio.
- **Processamento de Dados:** Pandas para ingestão, limpeza e validação de dados em CSV, com persistência em SQLite.
- **Ambiente & Qualidade:** Isolamento com Docker e Docker Compose, testes automatizados via Pytest e documentação via MkDocs Material.

---

## Links Úteis

- [Repositório Oficial no GitHub](https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra)
- [Guia de Contribuição](https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra)
