# Sprint 4 — Integração e Funcionalidades Principais

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 14/10/2026 a 20/10/2026 |
| Objetivo | Finalizar as pendências técnicas da Sprint 3 e avançar na implementação do mapa interativo, dos filtros dinâmicos e da integração com a API. |
| Foco | Back-end, integração, front-end e testes |
| Issues planejadas | S3-06, S3-07, S3-08, S4-01, S4-02, S4-03 e S4-04 |

## 2. Objetivos da Sprint

A Sprint 4 busca disponibilizar os componentes necessários para que o visitante consulte os indicadores socioeconômicos do Brasil Hub por meio do mapa interativo e dos filtros.

Para isso, será necessário concluir as pendências de processamento dos dados e da API, validar as consultas e integrar os componentes de front-end ao back-end.

Também está prevista a configuração de integração contínua para automatizar a execução dos testes do back-end, desde que a estrutura de testes esteja pronta para execução.

## 3. Issues planejadas

| Issue | Entrega | Responsáveis | Dependências |
|---|---|---|---|
| S3-06 | Finalizar a ingestão, validação e padronização dos arquivos CSV | Ágatha e Eduardo | — |
| S3-07 | Finalizar a API FastAPI para consulta de indicadores | Josef e Paulo | S3-05 e S3-06 |
| S3-08 | Executar testes de integração e avaliar o requisito B-05 | Fabiana e Lucas | S3-05, S3-06 e S3-07 |
| S4-01 | Implementar o mapa interativo com Leaflet | César e Felipe | Estrutura inicial do front-end |
| S4-02 | Implementar os filtros dinâmicos | Fabiana e Lucas | Estrutura inicial do front-end e definição dos parâmetros da API |
| S4-03 | Integrar o mapa e os filtros à API | Josef e Paulo | S3-07, S4-01 e S4-02 |
| S4-04 | Configurar a execução automatizada dos testes com GitHub Actions | Josef e Paulo | Testes automatizados executáveis |

**Observação:** as responsabilidades e dependências devem permanecer alinhadas às issues do GitHub. A S4-04 depende de os testes do back-end já poderem ser executados localmente.

## 4. Entregáveis esperados

| Área | Resultado esperado |
|---|---|
| Processamento de dados | Arquivos CSV processados e dados disponíveis para consulta no SQLite. |
| Back-end | API capaz de consultar e retornar os indicadores em JSON. |
| Mapa interativo | Componente de mapa implementado com Leaflet. |
| Filtros | Seleção de estado e dimensão integrada à consulta dos indicadores. |
| Integração | Mapa e filtros consumindo a API e apresentando os resultados correspondentes. |
| Testes | Testes de integração executados e resultados documentados. |
| Desempenho | Avaliação do requisito B-05, cuja meta é responder às consultas em até 3 segundos. |
| Integração contínua | Workflow do GitHub Actions executando os testes automatizados do back-end. |

## 5. Critérios gerais de conclusão

A Sprint será avaliada considerando os seguintes critérios:

- [ ] Pendências de processamento dos dados e API concluídas ou formalmente replanejadas.
- [ ] Mapa interativo implementado e funcional.
- [ ] Filtros dinâmicos implementados.
- [ ] Mapa e filtros integrados à API.
- [ ] Consultas sem resultados e falhas de comunicação tratadas.
- [ ] Testes executados e evidências registradas.
- [ ] Requisito de desempenho B-05 medido e resultado documentado.
- [ ] Workflow de testes automatizados configurado e validado, caso a estrutura de testes esteja pronta.
- [ ] Pull Requests revisados e alterações integradas conforme o fluxo de branches do projeto.
- [ ] Documentação e registros da Sprint atualizados.

Os critérios devem ser avaliados com base nas evidências produzidas. Itens não concluídos deverão permanecer registrados como pendências, sem serem considerados entregas finalizadas.

## 6. Acompanhamento

O andamento das atividades será acompanhado pelas issues do GitHub e pelos registros diários da equipe.

- [Acessar as dailies da Sprint 4](dailies/dailies.md)

As dailies devem registrar as atividades realizadas, os impedimentos encontrados e os próximos passos. As issues devem ser atualizadas conforme o progresso e as revisões de código.

## 7. Resultado esperado

Ao final da Sprint 4, espera-se que o Brasil Hub tenha avançado da estrutura técnica inicial para uma aplicação capaz de consultar indicadores por meio da API e apresentá-los em conjunto com o mapa interativo e os filtros.

A Sprint também deverá produzir evidências de testes e uma avaliação do desempenho das consultas. O cumprimento desses objetivos será verificado na revisão da Sprint, considerando as entregas efetivamente concluídas e os critérios de aceitação das issues.