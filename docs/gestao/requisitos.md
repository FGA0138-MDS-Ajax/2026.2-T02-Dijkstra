# Requisitos do Produto — Brasil Hub

## 1. Visão Geral do Levantamento de Requisitos

O levantamento de requisitos do Brasil Hub foi conduzido pela Equipe Dijkstra com o objetivo de traduzir a necessidade de democratização dos indicadores socioeconômicos públicos em funcionalidades de software claras, testáveis e orientadas a valor.

O processo de elicitação considerou o fluxo de trabalho típico de pesquisadores e cidadãos ao explorarem dados estaduais, bem como as necessidades operacionais de administração e segurança da base de dados.

---

## 2. Critérios de Priorização (Método MoSCoW)

Para gerenciar o escopo e planejar as entregas incrementais das Sprints, os requisitos foram categorizados utilizando o método **MoSCoW** (Tabela 1).

**Tabela 1 — Justificativa de prioridades MoSCoW**

| Prioridade | Justificativa de Negócio | Funcionalidades Contempladas |
|---|---|---|
| **MUST** | Núcleo essencial do produto. Sem esses requisitos o sistema não atinge sua finalidade primária de centralizar, tratar e visualizar os dados. | Mapa Interativo (B-01), Filtros Dinâmicos (B-02), Acessibilidade (B-03), Gestão Administrativa de Dados (B-04), Desempenho da API (B-05), Compatibilidade (B-08) e Segurança (B-09). |
| **SHOULD** | Funcionalidades de alto valor agregado que ampliam a capacidade analítica, mas cuja ausência não inviabiliza a operação básica da plataforma. | Comparação lado a lado entre estados (B-06) e Visualização complementar em gráficos e tabelas (B-10). |
| **COULD** | Recursos complementares que refinam a experiência do usuário, implementados mediante capacidade e tempo disponível nas Sprints finais. | Linha do tempo histórica (B-07) e Exportação de dados em formatos abertos (B-11). |

*Fonte: Elaborado pela Equipe Dijkstra (2026).*

---

## 3. Perfis de Usuário (Atores do Sistema)

A Tabela 2 estabelece os perfis de acesso mapeados para a plataforma e seus respectivos privilégios.

**Tabela 2 — Perfis de acesso**

| Perfil | Descrição | Permissões de Acesso |
|---|---|---|
| **Visitante (Público Geral)** | Cidadão, pesquisador, estudante ou jornalista que acessa a plataforma sem necessidade de autenticação. | Visualizar o mapa interativo, consultar indicadores socioeconômicos, aplicar filtros por estado e dimensão, utilizar ferramentas de acessibilidade e recursos de comparação. |
| **Administrador** | Usuário autorizado responsável pela sustentação e atualização dos dados da plataforma, com acesso condicionado a login e senha. | Todas as permissões do Visitante acrescidas do acesso ao painel administrativo restrito para upload de novos arquivos CSV do IBGE e auditoria de ingestão. |

*Fonte: Elaborado pela Equipe Dijkstra (2026).*

---

## 4. Backlog de Requisitos do Produto

A Tabela 3 consolida o catálogo completo de requisitos funcionais e não funcionais do Brasil Hub, organizados por código, sprint de implementação prevista, tipo, prioridade e História de Usuário (*User Story*).

**Tabela 3 — Catálogo de requisitos do produto**

| Código | Sprint | Nome do Requisito | Tipo | Prioridade | Descrição Sucinta | User Story Associada |
|:---:|:---:|---|:---:|:---:|---|---|
| **B-01** | 4 | Mapa Interativo | Funcional | **MUST** | Apresentar um mapa interativo do Brasil renderizando as Unidades da Federação e coloração temático-coroplética baseada nos indicadores socioeconômicos. | *Como visitante, quero visualizar os dados socioeconômicos no mapa do Brasil para compreender a distribuição dos indicadores entre as regiões.* |
| **B-02** | 4 | Filtros Dinâmicos | Funcional | **MUST** | Disponibilizar seletores combinados por Estado (UF), dimensão temática (Renda, Educação, Longevidade) e período de referência. | *Como visitante, quero filtrar os dados por diferentes indicadores para analisar somente informações relevantes para a minha pesquisa.* |
| **B-03** | 6 | Acessibilidade Universal | Funcional | **MUST** | Prover controles de interface para ajuste escalável do tamanho da fonte tipográfica, alternância para tema escuro (*Dark Mode*) e modo de alto contraste. | *Como visitante, quero configurar os recursos de acessibilidade para utilizar o sistema de acordo com as minhas necessidades visuais.* |
| **B-04** | 5 | Gestão e Upload de Dados | Funcional | **MUST** | Área administrativa autenticada para upload de arquivos CSV oficiais, validação de formato e ingestão de novos dados na base. | *Como administrador, quero acessar a plataforma para adicionar novos dados oficiais e atualizar a base do dashboard.* |
| **B-05** | 3 | Desempenho da API | Não Funcional | **MUST** | O processamento e o retorno das requisições de consulta e filtros pela API REST devem ocorrer em até 3 segundos em ambiente estável. | *Como visitante, quero que as consultas apresentem resultados em até 3 segundos para realizar análises com fluidez.* |
| **B-06** | 7 | Comparação entre Estados | Funcional | **SHOULD** | Permitir a seleção de duas Unidades da Federação e exibição lado a lado dos indicadores socioeconômicos para contraste direto. | *Como visitante, quero comparar dois estados lado a lado para identificar disparidades entre seus indicadores socioeconômicos.* |
| **B-07** | 8 | Linha do Tempo | Funcional | **COULD** | Apresentar componente cronológico para observar a evolução dos indicadores de uma UF ao longo dos anos de coleta. | *Como visitante, quero visualizar a evolução dos indicadores ao longo dos anos para analisar sua trajetória no tempo.* |
| **B-08** | 6 | Compatibilidade e Responsividade | Não Funcional | **MUST** | O layout da aplicação deve adaptar-se sem perda funcional a telas a partir de 360px de largura e operar nos navegadores Chrome, Firefox e Edge. | *Como visitante, quero acessar a plataforma em diferentes dispositivos e navegadores sem quebra visual da interface.* |
| **B-09** | 5 | Segurança de Credenciais | Não Funcional | **MUST** | Armazenar credenciais administrativas no banco SQLite utilizando hash criptográfico forte (`bcrypt`) com salt individual, bloqueando acesso não autorizado. | *Como administrador, quero que minha senha seja armazenada de forma segura para mitigar riscos de vazamento ou acesso indevido.* |
| **B-10** | 7 | Gráficos e Tabelas Complementares | Funcional | **SHOULD** | Apresentar os dados de indicadores em tabelas paginadas/ordenáveis e gráficos analíticos complementares ao mapa. | *Como visitante, quero visualizar os indicadores em formato de tabela e gráficos para facilitar a leitura detalhada.* |
| **B-11** | 8 | Exportação de Dados | Funcional | **COULD** | Permitir o download direto do conjunto de dados filtrados em formatos abertos e estruturados (CSV e JSON). | *Como visitante, quero exportar os dados exibidos para utilizá-los em ferramentas externas de análise estatística.* |

*Fonte: Elaborado pela Equipe Dijkstra (2026).*

---

## 5. Rastreabilidade de Testes

Cada requisito do catálogo está formalmente vinculado a casos de teste (TC — *Test Cases*) na suíte de testes automatizados e no roteiro de verificação do projeto:

- **B-01 (Mapa):** Verificado nos testes de integração e testes de sistema de renderização cartográfica via Leaflet;
- **B-02 (Filtros):** Validado em suíte de testes unitários da API (`test_indicators.py`) e testes de contrato HTTP;
- **B-03 (Acessibilidade):** Coberto pelos testes de interface e validação de acessibilidade DOM (`test_accessibility.js`);
- **B-04 (Upload de Dados):** Coberto pelas suítes de validação de ingestão CSV com Pandas (`test_ingestion.py`, `test_validation.py`);
- **B-05 (Desempenho):** Aferido nos testes de carga e tempo de resposta da API (verificação do limiar $\le$ 3 s);
- **B-06 (Comparação):** Validado pelo endpoint `/api/comparacao` e testes de regras de seleção de UFs distintas;
- **B-08 (Compatibilidade):** Verificado em testes cross-browser e testes responsivos em viewport de 360 px;
- **B-09 (Segurança):** Validado nos testes de autenticação, hashing de senhas e proteção de rotas restritas (`test_auth.py`).
