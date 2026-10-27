# 4. Declaração de Escopo do Projeto

## 4.1. Backlog do produto

O levantamento de requisitos foi realizado através de sessões de brainstorming, traduzindo a visão do produto em funcionalidades práticas a serem feitas. O objetivo é unificar os dados dispersos em uma plataforma web funcional, acessível e prática. A priorização foi definida pela equipe conforme a contribuição de cada requisito para os objetivos da Seção 1.3, e o resultado consta na Tabela 13.

Para garantir que o desenvolvimento siga o fluxo de valor esperado pelos usuários, a Tabela 10 detalha a justificativa de negócio para as prioridades adotadas (MUST, SHOULD, COULD).

As funcionalidades foram definidas de acordo com as seguintes prioridades:

**Tabela 10 — Prioridade do produto.**

| Prioridade | Justificativa | Funcionalidades |
|---|---|---|
| **MUST** | Núcleo essencial do produto. Sem esses requisitos ele não cumpriria seu propósito central de centralizar dados e facilitar a visualização de fatores sociais e econômicos brasileiros. | Mapa Interativo; Filtro Dinâmico; Ferramenta de acessibilidade; Rota de administrador para gestão de dados; Compatibilidade; Desempenho; Segurança de dados. |
| **SHOULD** | Funcionalidades de alto valor que melhoram a experiência, mas não são necessárias para o produto. | Ferramenta de comparação lado a lado; Visualização de gráficos em tabelas. |
| **COULD** | Funcionalidades incrementais, mas de baixo impacto, não necessárias para o site, desenvolvidas apenas se houver tempo e recurso extra. | Linha do Tempo; Exportação de Dados. |

*Fonte: Elaborado por César e Lucas.*

## 4.2. Perfis

A plataforma possui níveis distintos de permissão para garantir a segurança dos dados. A Tabela 11 descreve os perfis de acesso mapeados.

**Tabela 11 — Perfis de acesso.**

| Nº | Nome do perfil | Características do perfil | Permissões de acesso |
|---:|---|---|---|
| 1 | Visitante/Público Geral | Acessante comum, não necessita de login para usar a plataforma. | Acesso livre para visualizar os dados e interagir com os mapas, aplicar filtros e utilizar funções de acessibilidade. |
| 2 | Administrador | Membro da equipe ou gestor do sistema/software, necessita de autenticação/login. | Acesso à página de admin, consegue editar elementos, adicionar dados novos ao servidor. |

*Fonte: Elaborado por César.*

## 4.3. Cenários

Com base nos perfis de acesso, os cenários funcionais primários do sistema foram elencados na Tabela 12.

**Tabela 12 — Cenários funcionais.**

| Numeração do cenário | Nome do cenário | Sprints |
|---:|---|---|
| 1 | Visualizador Interativo de Mapa | 4, 7 e 8 |
| 2 | Filtro de Dados (filtrar por estado e pelas dimensões do IDH: renda, educação e longevidade) | 3, 4 e 8 |
| 3 | Acessibilidade e Navegação do Sistema | 6 |
| 4 | Administração (criar a rota do admin e permitir adicionar dados) | 5 |

*Fonte: Elaborado por César.*

## 4.4. Tabela de Backlog do produto

Consolidando as prioridades e cenários, a Tabela 13 apresenta o Backlog do Produto completo, traduzindo as necessidades em Histórias de Usuário (User Stories).

**Tabela 13 — Backlog do produto.**

| Código | Sprint | Nome do requisito | Tipo de requisito | Prioridade | Descrição sucinta do requisito | User story associada |
|---|---:|---|---|---|---|---|
| **B-01** | 4 | Mapa Interativo | Funcional | MUST | O sistema deve apresentar um mapa interativo do Brasil exibindo os dados de IDH/IDHM por estados. | Como visitante, quero visualizar os dados socioeconômicos no mapa do Brasil para compreender a distribuição dos indicadores entre as regiões. |
| **B-02** | 4 | Filtro Dinâmico | Funcional | MUST | O sistema deve disponibilizar opções de filtro por Estado e pelas dimensões do IDH (Renda, Educação e Longevidade). | Como visitante, quero filtrar os dados por diferentes indicadores para analisar somente informações relevantes para a minha pesquisa. |
| **B-03** | 6 | Ferramenta de acessibilidade | Funcional | MUST | Interface deve incluir opções de acessibilidade de leitura como ajuste do tamanho das letras, modo noturno e alto contraste. | Como visitante, quero configurar os recursos de acessibilidade para utilizar o sistema de acordo com as minhas necessidades. |
| **B-04** | 5 | Rota de administrador para gestão de dados | Funcional | MUST | Área restrita, mediante login, onde o administrador pode fazer o upload de um novo arquivo CSV do IBGE para atualizar a base de dados do dashboard. | Como administrador, quero acessar a plataforma para adicionar novos dados e incrementar o site. |
| **B-05** | 3 | Desempenho da consulta de dados | Não Funcional | MUST | Processamento de dados e resposta da API (FastAPI) ao aplicar um filtro. | Como visitante, quero que os filtros apresentem resultados em até 3 segundos para realizar a minha análise sem atrasos. |
| **B-06** | 7 | Ferramenta de comparação lado a lado | Funcional | SHOULD | Permitir seleção de dois estados e comparação lado a lado junto de seus indicadores de IDH, socioeconômicos etc. | Como visitante, quero comparar dois estados lado a lado para identificar diferenças entre seus indicadores socioeconômicos. |
| **B-07** | 8 | Linha do Tempo | Funcional | COULD | Oferecer uma comparação baseada em uma linha do tempo para observar a mudança ao longo dos anos. | Como visitante, quero visualizar a evolução dos indicadores ao longo dos anos para analisar suas mudanças no tempo. |
| **B-08** | 6 | Compatibilidade em telas diferentes e navegadores | Não Funcional | MUST | O layout do dashboard deve ser responsivo, sem quebra de elementos visuais, em telas a partir de 360px de largura e nos navegadores Chrome, Firefox e Edge. | Como visitante, quero acessar a plataforma por meio de diferentes dispositivos para utilizá-la sem perda de funcionalidade. |
| **B-09** | 5 | Segurança de dados | Não Funcional | MUST | Armazenar as senhas de administração no banco de dados com hash. | Como administrador, quero que minha senha seja armazenada de forma protegida para reduzir o risco de acessos não autorizados. |
| **B-10** | 7 | Visualização em gráficos e tabelas | Funcional | SHOULD | Visualização de gráficos em tabelas funcionais. | Como visitante, quero visualizar os indicadores em formato de tabela para facilitar minha interpretação. |
| **B-11** | 8 | Exportação de dados | Funcional | COULD | Disponibilização de downloads fáceis em CSV ou JSON para uso dos visitantes. | Como visitante, quero exportar os dados apresentados para utilizá-los em outras ferramentas de análise. |

*Fonte: Elaborado por César e Lucas.*
