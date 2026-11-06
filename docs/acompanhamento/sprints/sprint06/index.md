# Sprint 6 — Acessibilidade, Compatibilidade e Confiabilidade

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 28/10/2026 a 03/11/2026 |
| Objetivo | Aprimorar a acessibilidade e a compatibilidade do Brasil Hub, ampliar a cobertura dos testes automatizados da API, revisar os mecanismos de validação e tratamento de erros e concluir as pendências técnicas herdadas da Sprint 5. |
| Resultado | Sprint encerrada com 5 das 6 atividades concluídas (3 das 4 novas issues da Sprint 6 + as 2 pendências herdadas da Sprint 5) e 1 issue (S6-01) transferida como continuidade para a Sprint 7. |
| Issues consideradas no ciclo | 6 (4 novas da Sprint 6 + 2 herdadas da Sprint 5) |
| Percentual de conclusão das issues | 83,3% no escopo total do ciclo (75% considerando apenas as 4 novas issues da Sprint 6) |
| Foco principal | Acessibilidade, responsividade, qualidade dos testes, confiabilidade da API e conclusão das pendências priorizadas. |

## 2. Planejamento e resultados

A Sprint 6 deu continuidade ao desenvolvimento do Brasil Hub, buscando aprimorar a experiência de uso, a qualidade técnica e a confiabilidade da aplicação. Após a Sprint 5, que concentrou esforços na segurança e na área administrativa, esta etapa ampliou o foco para a acessibilidade da interface, a compatibilidade com diferentes dispositivos e a melhoria dos mecanismos de validação e testes do back-end.

No front-end, as atividades foram direcionadas à acessibilidade da plataforma e à adaptação da interface a diferentes tamanhos de tela e ambientes de navegação. O objetivo foi tornar o sistema mais acessível e garantir que seus principais recursos, como mapa, filtros, navegação e área administrativa, continuassem utilizáveis em diferentes dispositivos (responsividade).

No back-end, a Sprint buscou ampliar a cobertura dos testes automatizados da API e revisar a validação dos parâmetros e o tratamento de erros. Essas atividades contribuíram para identificar comportamentos inesperados, padronizar respostas de erro e aumentar a confiabilidade da manutenção da aplicação.

Além das novas funcionalidades e melhorias, a equipe concluiu integralmente as duas pendências herdadas da Sprint 5 relacionadas à interface administrativa (`S5-04`) e à validação integrada do fluxo de gerenciamento de dados (`S5-05`), respeitando os responsáveis originalmente definidos no backlog.

## 3. Issues da Sprint 6 e situação final

### 3.1. Novas issues da Sprint 6

| Issue | Entrega planejada | Área | Responsáveis | Revisores | Situação ao final da Sprint |
|---|---|---|---|---|---|
| S6-01 (#50) | Aprimorar a acessibilidade da interface (B-03). | Front-end | Paulo Eduardo e Ágatha Natasha | Josef e Eduardo Brito | Não finalizada integralmente no prazo. Avanços parciais na branch `feature/B-03-acessibilidade` (PR #61); transferida como continuidade priorizada para a Sprint 7. |
| S6-02 (#51) | Melhorar a responsividade e a compatibilidade da plataforma (B-08). | Front-end | Josef e Eduardo Brito | Paulo Eduardo e Ágatha Natasha | Finalizada e integrada à `developer` (PR #63). |
| S6-03 | Ampliar os testes automatizados e a cobertura funcional da API. | Back-end | Lucas e César Augusto | Felipe George e Fabiana Reis | Finalizada e integrada à `developer` (PR #60). |
| S6-04 (#53) | Revisar a validação de parâmetros e o tratamento de erros da API. | Back-end | Felipe George e Fabiana Reis | Lucas e César Augusto | Finalizada e integrada à `developer` (PR #64). |

**Observação:** as situações apresentadas refletem o estado real das issues e dos Pull Requests no GitHub ao término do ciclo.

## 4. Pendências herdadas da Sprint 5

Além das quatro novas issues, a Sprint 6 acompanhou e concluiu as duas atividades que haviam permanecido pendentes ao final da Sprint 5.

| Issue de origem | Entrega | Situação ao final da Sprint 5 | Situação ao final da Sprint 6 |
|---|---|---|---|
| S5-04 | Implementar a interface administrativa para login e upload de CSV (B-04). | Não finalizada no prazo previsto. | Finalizada e integrada à `developer` (PR #58), entregando as telas `area-adm.html`, `painel-adm.html` e integração com a API. |
| S5-05 (#44) | Validar o fluxo administrativo e atualizar a documentação da Sprint 5. | Não finalizada integralmente no período. | Finalizada e integrada à `developer` (PR #59), registrando a validação de login/upload, regressão do mapa, atualização do `README.md` e serviço PostgreSQL no GitHub Actions. |

As issues herdadas preservaram seus responsáveis originais e seus critérios de aceitação, encerrando integralmente os débitos técnicos provenientes da Sprint 5.

## 5. Organização do trabalho

A distribuição das atividades considerou a participação de todos os pares e a alternância entre as áreas de desenvolvimento:

| Par | Área na Sprint 6 | Atividade principal |
|---|---|---|
| Paulo Eduardo e Ágatha Natasha | Front-end | Acessibilidade da interface — S6-01 (#50) |
| Josef e Eduardo Brito | Front-end | Responsividade e compatibilidade — S6-02 (#51) + Validação S5-05 (#44) |
| Lucas e César Augusto | Back-end | Cobertura dos testes automatizados da API — S6-03 |
| Felipe George e Fabiana Reis | Back-end | Validação de parâmetros e tratamento de erros — S6-04 (#53) |

Os responsáveis pelas issues conduziram a implementação e os testes correspondentes, enquanto os revisores avaliaram as alterações submetidas por meio dos Pull Requests antes da integração na branch `developer`.

## 6. Resultados e métricas de acompanhamento

O acompanhamento da Sprint foi realizado por meio das issues do GitHub, dos Pull Requests, das revisões de código, dos testes automatizados e dos registros diários da equipe.

| Aspecto / Métrica | Como foi acompanhado | Resultado final na Sprint 6 |
|---|---|---|
| Conclusão das issues | Comparação entre as issues planejadas/herdadas e as efetivamente concluídas. | 5 de 6 atividades concluídas (**83,3%** do total do ciclo; **75%** das novas issues da Sprint 6 e **100%** dos débitos da Sprint 5). |
| Acessibilidade (B-03) | Verificação dos critérios de aceitação da S6-01 (#50) e revisão de código. | Entrega parcial: implementados modo noturno (`theme.js`), ajustes de reconexão (PR #61) e landmarks semânticos. Controles de fonte, alto contraste e teste TC-04 permanecem pendentes e foram transferidos para a Sprint 7. |
| Responsividade e compatibilidade (B-08) | Verificação em diferentes resoluções (`1280x950`, `800x1280`, `712x1138` e `414x846`) no Firefox e Chrome/Edge. | Concluída (PR #63): navbar responsiva nas páginas públicas e no painel administrativo, textos adaptados para mobile, zoom inicial adaptativo e limites `maxBounds` ajustados no mapa com legenda externa. |
| Cobertura de testes da API | Execução da suíte automatizada (`pytest`) localmente e no GitHub Actions com PostgreSQL 17. | Concluída (PR #60 e PR #64): suíte ampliada de 63 para **116 testes automatizados** (`115 passed, 1 xpassed`), cobrindo consultas, autenticação, upload e falhas operacionais. |
| Validação e tratamento de erros | Inspeção dos endpoints e testes de casos de borda na S6-04 (#53). | Concluída (PR #64): normalização da extensão `.csv` (maiúsculas/minúsculas), captura de `UnicodeDecodeError`, `ParserError` e `EmptyDataError` com retorno HTTP `400` controlado e captura de `psycopg.Error` na persistência. |
| Débitos técnicos da Sprint 5 | Acompanhamento da conclusão e integração das issues S5-04 e S5-05. | **100% quitados** (PR #58 e PR #59 integrados à `developer`). |
| Revisões e integração | Acompanhamento da abertura, revisão, correção e integração dos Pull Requests. | PRs #58, #59, #60, #63 e #64 revisados e integrados à `developer`. Na S6-01, a revisão identificou impacto visual no seletor `.footer-col h3` e pendências de escopo, mantendo a branch em desenvolvimento para a Sprint 7. |

## 7. Riscos e pontos de atenção observados

Ao longo da Sprint 6, os pontos de atenção monitorados produziram os seguintes desdobramentos:

- **Quitação dos débitos técnicos da Sprint 5:** a priorização das entregas `S5-04` e `S5-05` logo no início do ciclo permitiu destravar e validar o fluxo administrativo completo sem comprometer as entregas de responsividade e back-end da Sprint 6.
- **Execução contínua de testes e CI:** a configuração do serviço PostgreSQL no workflow `.github/workflows/backend-ci.yml` garantiu que todos os testes de integração fossem executados automaticamente a cada Pull Request.
- **Rigor no Code Review e controle do DoD:** na revisão da issue `S6-01 (#50)`, os revisores identificaram que a alteração de tags no rodapé afetava o estilo CSS e que requisitos essenciais do `B-03` (ajuste de tamanho de fonte, alto contraste e execução do `TC-04`) ainda não haviam sido atendidos, evitando a integração prematura na `developer`.

## 8. Acompanhamento e documentação

Os registros diários da Sprint 6 estão organizados na seção de dailies:

- [Acessar as dailies da Sprint 6](dailies/dailies.md)

As issues (#44, #50, #51, #53) e os Pull Requests (#58, #59, #60, #61, #63, #64) do GitHub documentam o histórico detalhado das decisões técnicas, das discussões de *Code Review* e das evidências de validação produzidas na sprint.

## 9. Retrospectiva, pendências e conclusão

A Sprint 6 apresentou uma evolução expressiva na maturidade técnica e no ritmo de entrega da equipe em comparação ao ciclo anterior. Enquanto a Sprint 5 havia encerrado com 60% de conclusão e duas pendências críticas no fluxo administrativo, a Sprint 6 concluiu **100% dos débitos herdados** (`S5-04` e `S5-05`) e **3 das 4 novas issues planejadas** (`S6-02`, `S6-03` e `S6-04`), atingindo **83,3% de conclusão global**.

Entre os principais avanços consolidados na branch `developer`, destacam-se:

- **Fluxo administrativo completo e validado (`S5-04` e `S5-05`):** telas de login e painel administrativo integradas aos endpoints protegidos de autenticação e upload de CSV.
- **Compatibilidade e responsividade (`S6-02` / B-08):** adaptação da interface para desktops, tablets e smartphones, incluindo melhorias de usabilidade no mapa interativo em telas móveis e reposicionamento da legenda de IDHM.
- **Confiabilidade e cobertura de testes no back-end (`S6-03` e `S6-04`):** tratamento controlado de exceções de leitura de CSV e de banco de dados, acompanhado da ampliação da suíte para **116 testes automatizados**.

### 9.1. Encaminhamento para a Sprint 7

| Pendência transferida | Responsáveis mantidos | Encaminhamento para a Sprint 7 |
|---|---|---|
| S6-01 (#50) — Implementar melhorias de acessibilidade na plataforma (B-03) | Paulo Eduardo e Ágatha Natasha | Concluir os controles de ajuste de tamanho de fonte e alto contraste, corrigir o seletor CSS do rodapé, executar e registrar o caso de teste **TC-04** do Documento de Visão e integrar a branch `feature/B-03-acessibilidade` à `developer`. |

Com esses resultados, o Brasil Hub chega ao ponto de controle da primeira release com sua arquitetura em camadas consolidada, persistência em PostgreSQL via Docker, fluxo público (mapa e filtros) e administrativo (login e upload de CSV) integrados e testados, restando a finalização dos recursos de acessibilidade (`B-03`) como prioridade imediata para a Sprint 7.

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax