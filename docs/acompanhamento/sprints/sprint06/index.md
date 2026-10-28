# Sprint 6 — Acessibilidade, Compatibilidade e Confiabilidade

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | Início em 28/10/2026 a 03/11/2026. |
| Objetivo | Aprimorar a acessibilidade e a compatibilidade do Brasil Hub, ampliar a cobertura dos testes automatizados da API, revisar os mecanismos de validação e tratamento de erros e dar continuidade às pendências técnicas da Sprint 5. |
| Resultado | Em andamento. Os resultados serão consolidados ao final da Sprint. |
| 4 Issues novas planejadas + 2 pendentes | 6 |
| Débitos técnicos herdados | Pendências da Sprint 5 que permanecerem abertas após a verificação do backlog. |
| Foco principal | Acessibilidade, responsividade, qualidade dos testes, confiabilidade da API e conclusão das pendências priorizadas. |

## 2. Planejamento e objetivos

A Sprint 6 dá continuidade ao desenvolvimento do Brasil Hub, buscando aprimorar a experiência de uso, a qualidade técnica e a confiabilidade da aplicação. Após a Sprint 5, que concentrou esforços na segurança e na área administrativa, esta etapa amplia o foco para a acessibilidade da interface, a compatibilidade com diferentes dispositivos e a melhoria dos mecanismos de validação e testes do back-end.

No front-end, as atividades estão direcionadas à acessibilidade da plataforma e à adaptação da interface a diferentes tamanhos de tela e ambientes de navegação. O objetivo é tornar o sistema mais acessível e garantir que seus principais recursos, como mapa, filtros e navegação, continuem utilizáveis em diferentes dispositivos.

No back-end, a Sprint busca ampliar a cobertura dos testes automatizados da API e revisar a validação dos parâmetros e o tratamento de erros. Essas atividades devem contribuir para identificar comportamentos inesperados, reduzir falhas e facilitar a manutenção da aplicação.

Além das novas funcionalidades e melhorias, a equipe deverá acompanhar as pendências herdadas da Sprint 5 que permanecerem abertas, especialmente as relacionadas à interface administrativa e à validação do fluxo de gerenciamento de dados. A continuidade dessas atividades deverá respeitar os responsáveis já definidos no backlog, evitando a perda de rastreabilidade entre as sprints.

Como a Sprint está em andamento, o planejamento poderá ser ajustado de acordo com a evolução das issues, os resultados das revisões de código e os impedimentos identificados durante a execução.

## 3. Issues planejadas

### 3.1. Novas issues da Sprint 6

| Issue | Entrega planejada | Área | Responsáveis | Revisores | Situação inicial |
|---|---|---|---|---|---|
| S6-01 | Aprimorar a acessibilidade da interface (B-03). | Front-end | Paulo Eduardo e Ágatha Natasha | Josef e Eduardo Brito | Planejada |
| S6-02 | Melhorar a responsividade e a compatibilidade da plataforma (B-08). | Front-end | Josef e Eduardo Brito | Paulo Eduardo e Ágatha Natasha | Planejada |
| S6-03 | Ampliar os testes automatizados e a cobertura funcional da API. | Back-end | Lucas e César Augusto | Felipe George e Fabiana Reis | Planejada |
| S6-04 | Revisar a validação de parâmetros e o tratamento de erros da API. | Back-end | Felipe George e Fabiana Reis | Lucas e César Augusto | Planejada |

**Observação:** as situações deverão ser atualizadas de acordo com o estado real das issues no GitHub. As atribuições de responsáveis e revisores devem permanecer alinhadas ao backlog oficial.

## 4. Pendências herdadas da Sprint 5

Além das quatro novas issues, a Sprint 6 deverá acompanhar as atividades que permaneceram pendentes ao final da Sprint 5.

| Issue de origem | Entrega | Situação registrada ao final da Sprint 5 | Encaminhamento |
|---|---|---|---|
| S5-04 | Implementar a interface administrativa para login e upload de CSV (B-04). | Não finalizada no prazo previsto. | Confirmar o estado atual da issue e, caso continue aberta, manter a atividade como débito técnico da Sprint 6. |
| S5-05 | Validar o fluxo administrativo e atualizar a documentação da Sprint 5. | Não finalizada integralmente no período. | Verificar quais atividades permanecem pendentes e transferir apenas o trabalho não concluído. |

**Importante:** a transferência das pendências deverá ser confirmada no GitHub. Caso alguma issue tenha sido concluída ou integrada após o encerramento da Sprint 5, sua situação deverá ser atualizada, sem mantê-la artificialmente como débito técnico.

As issues herdadas deverão preservar seus responsáveis originais e seus critérios de aceitação. A mudança de sprint não significa que a responsabilidade pela entrega foi transferida para uma nova dupla.

## 5. Organização do trabalho

A distribuição das novas atividades considera a participação de todos os pares e a alternância entre as áreas de desenvolvimento.

| Par | Área na Sprint 6 | Atividade principal |
|---|---|---|
| Paulo Eduardo e Ágatha Natasha | Front-end | Acessibilidade da interface — S6-01 |
| Josef e Eduardo Brito | Front-end | Responsividade e compatibilidade — S6-02 |
| Lucas e César Augusto | Back-end | Cobertura dos testes automatizados da API — S6-03 |
| Felipe George e Fabiana Reis | Back-end | Validação de parâmetros e tratamento de erros — S6-04 |

Os responsáveis pelas novas issues deverão conduzir a implementação e os testes correspondentes, enquanto os revisores deverão avaliar as alterações submetidas por meio dos Pull Requests.

A equipe também deverá manter o acompanhamento das dependências entre as tarefas. Quando uma issue bloquear o avanço de outra, o impedimento deverá ser comunicado e encaminhado para resolução, evitando que uma atividade permaneça parada sem uma definição clara de prioridade.

As pendências da Sprint 5 deverão continuar sob responsabilidade das duplas originalmente atribuídas, mesmo quando houver novas distribuições de trabalho na Sprint 6.

## 6. Critérios de acompanhamento

O acompanhamento da Sprint será realizado por meio das issues do GitHub, dos Pull Requests, das revisões de código, dos testes automatizados e dos registros diários da equipe.

| Aspecto | Como será acompanhado | Resultado |
|---|---|---|
| Conclusão das issues | Comparação entre as issues planejadas e as efetivamente concluídas. | A preencher ao final da Sprint. |
| Acessibilidade (B-03) | Verificação dos critérios de aceitação da S6-01 e registro dos testes realizados. | A preencher durante a execução. |
| Responsividade e compatibilidade (B-08) | Verificação do comportamento da interface em diferentes dispositivos e ambientes de navegação. | A preencher durante a execução. |
| Cobertura de testes da API | Registro dos cenários implementados e dos resultados de execução da suíte automatizada. | A preencher durante a execução. |
| Validação e tratamento de erros | Registro dos problemas identificados, das correções realizadas e dos testes correspondentes. | A preencher durante a execução. |
| Débitos técnicos da Sprint 5 | Verificação das pendências herdadas, dos responsáveis e do andamento das correções. | A preencher durante a execução. |
| Revisões e integração | Acompanhamento da abertura, revisão, correção e integração dos Pull Requests. | A preencher durante a execução. |

As metas quantitativas definitivas deverão ser confirmadas no planejamento da Sprint. Durante a execução, os resultados deverão ser atualizados de acordo com as evidências disponíveis, sem registrar como concluídas atividades que ainda estejam em implementação, teste ou revisão.

## 7. Riscos e pontos de atenção

A experiência da Sprint 5 demonstrou que as dependências entre issues podem comprometer o andamento das atividades quando não são identificadas e acompanhadas antecipadamente.

Por esse motivo, a Sprint 6 deverá dar atenção especial aos seguintes pontos:

- **Dependências entre tarefas:** identificar antecipadamente as atividades que precisam ser concluídas para permitir o avanço de outras issues.
- **Disponibilidade da equipe:** distribuir o trabalho considerando as demais demandas acadêmicas e os prazos do projeto.
- **Execução contínua de testes:** desenvolver e executar os testes durante a implementação, evitando concentrar toda a validação no encerramento da sprint.
- **Revisões antecipadas:** abrir Pull Requests assim que as alterações estiverem prontas e reservar tempo para os ajustes solicitados.
- **Controle dos débitos técnicos:** acompanhar as pendências herdadas e evitar que sua transferência para a Sprint 6 prejudique as novas entregas.
- **Comunicação dos impedimentos:** registrar e comunicar rapidamente os bloqueios que comprometam o andamento de uma issue ou de outra atividade dependente.

Esses pontos deverão orientar as decisões de priorização e os ajustes necessários durante a execução do ciclo.

## 8. Acompanhamento e documentação

Os registros diários da Sprint 6 serão organizados na seção de dailies:

- [Acessar as dailies da Sprint 6](dailies/dailies.md)

As issues e os Pull Requests deverão ser utilizados como fontes de referência para acompanhar o andamento das atividades, as decisões técnicas, as discussões de Code Review e as evidências de validação.

A documentação da sprint será atualizada ao longo do ciclo, registrando as atividades concluídas, as alterações no planejamento, os impedimentos encontrados e as pendências transferidas.

Ao final da Sprint, deverão ser consolidados os resultados efetivamente obtidos, as métricas disponíveis e os aprendizados que possam contribuir para a melhoria do processo de desenvolvimento.

## 9. Conclusão e atualização dos resultados

A Sprint 6 tem como foco inicial aprimorar a acessibilidade e a compatibilidade do Brasil Hub, fortalecer a qualidade dos testes automatizados e melhorar a robustez da API. Paralelamente, deverá dar continuidade às pendências da Sprint 5 que permanecerem abertas, especialmente as relacionadas à interface administrativa e à validação do fluxo de gerenciamento de dados.

A definição inicial do escopo contempla quatro novas issues, distribuídas entre os pares de front-end e back-end. Entretanto, o cumprimento das entregas dependerá da evolução das implementações, da resolução de dependências e da conclusão dos testes e das revisões de código.

Como a sprint está em andamento, não é possível determinar antecipadamente seu percentual final de conclusão nem confirmar quais atividades serão integralmente entregues. Esses resultados deverão ser registrados ao final do ciclo, com base nas situações verificadas no GitHub e nas evidências produzidas pela equipe.

O principal objetivo do acompanhamento é assegurar que o planejamento permaneça alinhado ao trabalho efetivamente executado, permitindo identificar desvios, reorganizar prioridades e registrar de forma transparente os resultados da Sprint 6.

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax