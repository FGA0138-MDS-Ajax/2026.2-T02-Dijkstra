# Sprint 7 — Comparação, Visualização e Consolidação da Release 1

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 04/11/2026 a 10/11/2026 |
| Objetivo | Implementar a comparação entre duas Unidades Federativas (B-06), implementar a visualização de indicadores em gráficos e tabelas (B-10), concluir a pendência de acessibilidade (B-03) herdada da Sprint 6 e consolidar a primeira Release para o Ponto de Controle. |
| Status | Sprint em andamento |
| Issues planejadas | 4 novas issues + 1 débito técnico herdado |
| Pendência herdada | S6-01 (#50) — B-03 |
| Foco principal | Comparação entre estados, visualização de indicadores, conclusão da acessibilidade e estabilização da Release 1. |

---

## 2. Planejamento e objetivos

A Sprint 7 tem como objetivo principal avançar na implementação dos requisitos de prioridade **SHOULD** previstos no Documento de Visão, especificamente o **B-06 — Comparação entre estados** e o **B-10 — Visualização de indicadores em gráficos e tabelas**.

Paralelamente, a Sprint mantém como prioridade a conclusão da pendência referente ao requisito **MUST B-03 — Acessibilidade**, herdada da Sprint 6. Essa pendência deve ser tratada como **débito técnico/carryover**, uma vez que sua implementação foi iniciada anteriormente, mas não foi concluída integralmente dentro da Sprint 6.

As atividades da Sprint estão organizadas em quatro novas issues:

- **S7-01** — Implementar a API para comparação entre dois estados;
- **S7-02** — Implementar a interface de comparação lado a lado;
- **S7-03** — Preparar os dados e a API para gráficos e tabelas;
- **S7-04** — Implementar a visualização de indicadores em gráficos e tabelas.

Além dessas atividades, permanece em acompanhamento a **S6-01 (#50)**, referente à acessibilidade.

A estratégia adotada busca separar as responsabilidades entre back-end e front-end, estabelecendo previamente os contratos de dados necessários para que as interfaces possam consumir os endpoints desenvolvidos.

O escopo da Sprint será mantido controlado, priorizando as funcionalidades necessárias para a demonstração da Release 1. Funcionalidades de prioridade **COULD**, como histórico/timeline (B-07) e exportação (B-11), não fazem parte do escopo desta Sprint.

---

## 3. Issues planejadas

| Issue | Entrega planejada | Requisito | Área | Responsáveis | Revisores | Situação |
|---|---|---|---|---|---|---|
| S7-01 | Implementar a API para comparação entre duas Unidades Federativas. | B-06 | Back-end / Integração | Paulo Eduardo e Fabiana Reis | César Augusto e Eduardo Brito | Planejada |
| S7-02 | Implementar a interface de comparação lado a lado entre dois estados. | B-06 | Front-end | Josef Wojtyla e Felipe George | Ágatha Natasha e Lucas Abdalla | Planejada |
| S7-03 | Preparar os dados e endpoints necessários para gráficos e tabelas. | B-10 | Back-end | César Augusto e Eduardo Brito | Paulo Eduardo e Fabiana Reis | Planejada |
| S7-04 | Implementar gráficos e tabelas dinâmicos na interface de exploração. | B-10 | Front-end | Ágatha Natasha e Lucas Abdalla | Josef Wojtyla e Felipe George | Planejada |

> **Observação:** a distribuição acima representa o planejamento técnico da Sprint. Caso a equipe identifique indisponibilidade, conflito de agenda ou necessidade de redistribuição antes do início efetivo das atividades, os responsáveis poderão ser ajustados nas respectivas issues.

---

## 4. Débito técnico herdado da Sprint 6

Além das quatro novas issues, a Sprint 7 possui uma pendência herdada da Sprint 6.

A atividade corresponde à **S6-01 (#50) — Implementar melhorias de acessibilidade na plataforma**, relacionada ao requisito **B-03 — Acessibilidade**, classificado como **MUST** no Documento de Visão.

A atividade foi iniciada durante a Sprint 6, mas não foi concluída integralmente dentro do período planejado. Dessa forma, a issue permanece aberta e é carregada para a Sprint 7 como **débito técnico/carryover**, preservando seu histórico, responsáveis e revisores originais.

| Issue | Requisito | Entrega pendente | Responsáveis | Revisores | Situação inicial |
|---|---|---|---|---|---|
| S6-01 (#50) | B-03 — Acessibilidade | Concluir ajuste de tamanho de fonte, alto contraste, correções de CSS e execução/documentação do TC-04. | Paulo Eduardo e Ágatha Natasha | Josef Wojtyla e Eduardo Brito | Carryover da Sprint 6 |

A conclusão da S6-01 deve contemplar os critérios de aceitação já definidos na issue original, incluindo a validação dos controles de acessibilidade e o registro das evidências do teste **TC-04**.

Por se tratar de um requisito **MUST**, a conclusão dessa pendência possui prioridade durante a Sprint e deve ser considerada na preparação da Release 1.

---

## 5. Organização do trabalho

A Sprint mantém o modelo de programação em pares adotado pela equipe, com desenvolvimento realizado pelos responsáveis pelas issues e revisão por outro par.

| Par | Atuação na Sprint 7 | Foco principal |
|---|---|---|
| Paulo Eduardo e Ágatha Natasha | Acessibilidade / Front-end | Conclusão da S6-01 (#50) e participação nas atividades relacionadas à Sprint 7 conforme disponibilidade |
| Josef Wojtyla e Felipe George | Front-end | Implementação da interface de comparação (S7-02) e visualização de gráficos/tabelas conforme revisão |
| César Augusto e Eduardo Brito | Back-end | Implementação da API de comparação (S7-01) e preparação dos dados/endpoints para B-10 (S7-03) |
| Fabiana Reis e Lucas Abdalla | Back-end / Front-end | Desenvolvimento e integração das funcionalidades da Sprint, conforme distribuição das issues |

Cada issue deve conter seus próprios testes correspondentes à funcionalidade implementada.

Os responsáveis pela implementação são responsáveis também pela produção das evidências de teste necessárias. Os revisores devem verificar código, critérios de aceitação, testes e evidências antes da aprovação do Pull Request.

---

## 6. Relação com os requisitos do Documento de Visão

As principais entregas da Sprint 7 possuem rastreabilidade direta com os requisitos definidos no Documento de Visão.

| Requisito | Descrição | Issue relacionada | Tipo |
|---|---|---|---|
| B-03 | Acessibilidade — tamanho de fonte, modo noturno e alto contraste | S6-01 (#50) | MUST / Débito técnico |
| B-06 | Comparação lado a lado entre duas Unidades Federativas | S7-01 e S7-02 | SHOULD |
| B-10 | Visualização de indicadores em gráficos e tabelas | S7-03 e S7-04 | SHOULD |

A implementação do B-06 foi dividida entre back-end e front-end para permitir que a API forneça os dados necessários e a interface realize a comparação de forma integrada.

Da mesma forma, o B-10 foi dividido entre preparação dos dados/API e implementação das visualizações, mantendo a separação de responsabilidades entre as camadas.

Os requisitos **B-07 — Timeline/Histórico** e **B-11 — Exportação CSV/JSON**, classificados como **COULD**, permanecem fora do escopo desta Sprint.

---

## 7. Testes e critérios de acompanhamento

O acompanhamento das funcionalidades seguirá a estratégia de testes definida no Documento de Visão, contemplando testes unitários, de integração e, quando aplicável, testes de sistema.

| Entrega | Testes previstos | Critério de acompanhamento |
|---|---|---|
| S6-01 — B-03 | Testes de sistema conforme **TC-04** | Controles de tamanho de fonte, modo noturno e alto contraste funcionando e sem ocultar elementos da interface. |
| S7-01 — B-06 | Testes unitários e de integração; preparação para **TC-09** | API retornando corretamente os dados necessários para comparar duas UFs e tratando combinações inválidas. |
| S7-02 — B-06 | Testes de integração e sistema conforme **TC-09** | Usuário consegue selecionar duas UFs e visualizar seus indicadores lado a lado, respeitando indicador e período. |
| S7-03 — B-10 | Testes unitários e de integração; preparação para **TC-10** | API disponibilizando dados consistentes para as visualizações, sem transformar valores ausentes em zero. |
| S7-04 — B-10 | Testes de integração e sistema conforme **TC-10** | Gráficos e tabelas apresentam os mesmos valores, indicadores, unidades e períodos dos dados fornecidos pela API. |

Cada execução de teste deve manter as evidências necessárias, incluindo:

- versão/commit utilizado;
- ambiente de execução;
- data;
- responsável pelo teste;
- dados utilizados;
- resultado esperado;
- resultado obtido;
- evidência da execução;
- ciclo da execução;
- correção realizada, quando houver falha.

Os testes devem ser executados novamente após correções relevantes, preservando o histórico das tentativas.

---

## 8. Critérios de acompanhamento da Sprint

| Aspecto acompanhado | Como será verificado | Resultado esperado |
|---|---|---|
| Conclusão das issues | Comparação entre as issues planejadas e as concluídas ao final da Sprint. | Mais de 90% das issues planejadas concluídas. |
| Débito técnico B-03 | Verificação da conclusão da S6-01 (#50) e execução do TC-04. | B-03 concluído e integrado à `developer`. |
| Comparação B-06 | Execução dos testes da API e da interface de comparação. | Comparação entre duas UFs funcionando de ponta a ponta. |
| Visualização B-10 | Verificação dos gráficos e tabelas com diferentes filtros. | Dados apresentados corretamente e de forma consistente. |
| Testes automatizados | Execução da suíte `pytest` e verificações de integração. | Testes passando sem regressões nas funcionalidades existentes. |
| Integração | Verificação dos Pull Requests e da branch `developer`. | Funcionalidades revisadas e integradas sem conflitos ou regressões. |
| Release 1 | Execução do fluxo integrado da plataforma. | Sistema estável para apresentação no Ponto de Controle. |

---

## 9. Riscos e pontos de atenção

Durante a Sprint 7, os seguintes pontos deverão ser acompanhados:

- **Prioridade do débito técnico B-03:** a S6-01 corresponde a um requisito MUST e deve ser concluída para evitar que a Release 1 permaneça com um requisito obrigatório pendente.

- **Integração entre back-end e front-end:** as issues S7-01/S7-02 e S7-03/S7-04 possuem dependência entre as camadas. O contrato dos dados deve ser definido antes da integração final para reduzir retrabalho.

- **Conflitos no front-end:** as funcionalidades de comparação, gráficos e tabelas alteram a página de exploração e podem envolver os mesmos arquivos. A sincronização frequente com a branch `developer` deve ser utilizada para reduzir conflitos.

- **Disponibilidade da equipe:** a Sprint ocorre em período de avaliações e outras atividades acadêmicas. A distribuição das issues deve considerar a disponibilidade real dos pares, evitando compromissos que não possam ser cumpridos durante o período.

- **Estabilização antes do Ponto de Controle:** alterações integradas próximo à apresentação devem passar pelos testes automatizados e por validação manual, incluindo visualização em desktop e mobile.

- **Não ampliação do escopo:** B-07 e B-11 não devem ser incorporados à Sprint caso isso comprometa a conclusão de B-03, B-06 e B-10.

---

## 10. Acompanhamento e documentação

Os registros diários da Sprint 7 estão organizados na seção de dailies:

- [Acessar as dailies da Sprint 7](dailies/dailies.md)

O acompanhamento técnico deve ser realizado principalmente por meio de:

- issues do GitHub;
- Pull Requests;
- revisões de código;
- testes automatizados;
- evidências de testes;
- registros diários;
- atualizações da branch `developer`.

A situação de cada issue deve ser atualizada durante a Sprint conforme o desenvolvimento, revisão e integração efetivamente realizados.

---

## 11. Consolidação da Release 1

A Sprint 7 também possui como objetivo preparar a primeira Release do Brasil Hub para o Ponto de Controle.

Antes da demonstração, deverá ser realizado um fluxo integrado contemplando, no mínimo:

1. acesso à plataforma;
2. carregamento e utilização dos indicadores;
3. utilização dos filtros;
4. visualização do mapa;
5. comparação entre duas UFs;
6. visualização dos gráficos e tabelas;
7. utilização dos recursos de acessibilidade;
8. verificação da responsividade;
9. funcionamento da área administrativa;
10. execução dos testes automatizados;
11. verificação da branch `developer` e do estado final integrado do sistema.

A Release 1 deverá ser considerada pronta para demonstração somente após a verificação das funcionalidades efetivamente entregues e dos requisitos que compõem o escopo da apresentação.

---

## 12. Resultado final da Sprint

Ao término do período, em **10/11/2026**, esta página deverá ser atualizada com:

- quantidade de issues planejadas;
- quantidade de issues concluídas;
- quantidade de issues não concluídas;
- situação final da S6-01 (#50);
- situação dos requisitos B-03, B-06 e B-10;
- resultados dos testes;
- Pull Requests integrados;
- eventuais bugs encontrados;
- débitos técnicos identificados;
- percentual de conclusão da Sprint;
- resultado do Ponto de Controle;
- retrospectiva da Sprint.

A análise final deverá considerar os resultados efetivamente observados durante a Sprint, sem classificar automaticamente toda atividade não concluída como débito técnico. Novos débitos somente deverão ser registrados quando houver uma decisão técnica, solução provisória, refatoração necessária ou pendência que gere trabalho futuro.

---

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax