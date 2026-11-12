# Sprint 8 — Funcionalidades Complementares e Validação do Sistema

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 11/11/2026 a 17/11/2026 |
| **Objetivo** | Implementar a visualização temporal dos indicadores (B-07), disponibilizar a exportação de dados em CSV (B-11), executar testes automatizados e de sistema e preparar a plataforma para a etapa final de estabilização. |
| **Situação da Sprint** | Em andamento |
| **Issues Planejadas** | 4 issues |
| **Débitos Técnicos Herdados** | 0 |
| **Taxa de Conclusão** | A apurar ao final da Sprint |
| **Foco Principal** | Funcionalidades complementares, testes e validação das entregas anteriores. |

---

## 2. Planejamento e Objetivos

A Sprint 8 representa a etapa de implementação das últimas funcionalidades complementares previstas no backlog do Brasil Hub, conforme o planejamento definido no Documento de Visão.

As atividades concentram-se nos requisitos classificados como **COULD**:

- **B-07 — Linha do Tempo:** permitir que o visitante visualize a evolução dos indicadores socioeconômicos ao longo dos anos.
- **B-11 — Exportação de Dados:** permitir que o visitante exporte os dados apresentados na plataforma para utilização em outras ferramentas de análise.

Além dessas funcionalidades, a Sprint contempla a execução de testes automatizados e de sistema, buscando verificar o comportamento integrado da aplicação e identificar possíveis regressões antes da etapa de estabilização.

A implementação da linha do tempo terá como foco uma visualização temporal simples, preferencialmente por meio de um gráfico de linha, utilizando os dados históricos já disponíveis. Para a exportação, será priorizado o formato CSV, sem necessidade de implementar simultaneamente a exportação em JSON.

As atividades de qualidade foram divididas entre a validação automatizada da API e os testes de sistema pela interface, permitindo que essas verificações aconteçam paralelamente ao desenvolvimento das funcionalidades.

Considerando que a Sprint ocorre durante o período de avaliações acadêmicas, o escopo foi mantido reduzido, priorizando entregas objetivas e evitando dependências desnecessárias entre as issues.

A Sprint começa sem débitos técnicos herdados, uma vez que todas as atividades planejadas para a Sprint 7 foram concluídas.

Ao término desta etapa, a expectativa é que os requisitos funcionais previstos no planejamento macro estejam implementados, permitindo que a Sprint 9 seja dedicada principalmente à estabilização, correção de defeitos e preparação da apresentação final.

---

## 3. Issues Planejadas

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Revisores | Situação |
|---|:---:|---|:---:|---|---|:---:|
| **S8-01** | B-07 | Implementar a visualização da evolução dos indicadores ao longo dos anos, utilizando os dados históricos disponíveis. | Back-end / Integração | Ágatha Natasha e Josef Wojtyla | Fabiana Reis e César Augusto | Planejada |
| **S8-02** | B-11 | Implementar a exportação dos indicadores filtrados em formato CSV. | Front-end / Integração | Fabiana Reis e César Augusto | Eduardo Brito e Paulo Eduardo | Planejada |
| **S8-03** | Qualidade | Revisar e executar testes automatizados e de integração da API, verificando possíveis regressões. | Back-end / Testes | Eduardo Brito e Paulo Eduardo | Lucas Abdalla e Felipe George | Planejada |
| **S8-04** | Qualidade | Executar testes de sistema pela interface e registrar evidências do funcionamento da plataforma. | Front-end / Testes | Lucas Abdalla e Felipe George | Ágatha Natasha e Josef Wojtyla | Planejada |

**Observação:** a distribuição das atividades busca equilibrar o trabalho entre as quatro duplas. Cada dupla ficará responsável pelo desenvolvimento de uma issue e pela revisão de outra.

As situações das issues deverão ser atualizadas ao longo da Sprint, considerando o desenvolvimento, a abertura dos Pull Requests, as revisões e a integração na branch de desenvolvimento.

---

## 4. Métricas da Sprint

O acompanhamento da Sprint seguirá as métricas definidas no modelo GQM do Documento de Visão.

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | (Issues concluídas / Issues planejadas) × 100 | > 90% | A apurar (0/4 inicialmente) | Será calculada ao final da Sprint, considerando as quatro issues planejadas. |
| **M2: Proporção de Defeitos** | (Bugs registrados / Issues entregues) × 100 | < 10% | A apurar | Será calculada a partir dos bugs efetivamente registrados durante a Sprint. |
| **M3: Saldo de Débito Técnico** | Novos débitos técnicos − Débitos técnicos resolvidos | ≤ 0 | A apurar | A Sprint inicia com saldo de débito técnico herdado igual a zero. Novos débitos, caso existam, deverão ser registrados e contabilizados. |

### Considerações sobre as métricas

- **M1:** serão consideradas as quatro issues planejadas para a Sprint 8. Uma issue somente será considerada concluída após o atendimento dos critérios de aceitação e a integração correspondente.
- **M2:** a ausência de bugs registrados não deverá ser interpretada automaticamente como ausência de defeitos. O resultado deverá considerar os testes efetivamente executados.
- **M3:** a Sprint começa sem débitos técnicos herdados da Sprint 7. Novas pendências somente deverão ser classificadas como débito técnico quando corresponderem efetivamente a uma solução provisória, refatoração necessária ou pendência técnica registrada.

---

## 5. Testes Planejados e Garantia da Qualidade

A Sprint 8 contempla a execução dos testes automatizados e de sistema previstos na estratégia de testes do Documento de Visão.

A divisão das atividades de qualidade busca validar tanto o comportamento interno da API quanto a experiência do usuário na interface.

### 5.1. Testes automatizados e de integração — S8-03

A issue S8-03 será responsável pela revisão e execução dos testes relacionados ao back-end, contemplando os seguintes casos:

| Caso de Teste | Nível | Requisito | Objetivo da Validação |
|---|:---:|:---:|---|
| **TC-01** | Unitário | B-02 | Verificar se os filtros retornam corretamente os registros selecionados. |
| **TC-02** | Integração | B-02 | Validar a comunicação entre os parâmetros enviados e os resultados retornados pela API. |
| **TC-06** | Integração | B-05 | Verificar se o tempo de resposta das consultas permanece dentro do limite de 3 segundos. |
| **TC-08** | Integração | B-09 | Verificar se as credenciais administrativas são armazenadas de forma protegida. |

A atividade também deverá verificar a execução da suíte `pytest` e o resultado dos testes no GitHub Actions.

### 5.2. Testes de sistema — S8-04

A issue S8-04 será responsável pela validação da aplicação em funcionamento pela interface.

| Caso de Teste | Nível | Requisito | Objetivo da Validação |
|---|:---:|:---:|---|
| **TC-03** | Sistema | B-01 | Verificar se os dados são apresentados corretamente no mapa. |
| **TC-04** | Sistema | B-03 | Validar o funcionamento dos recursos de acessibilidade. |
| **TC-05** | Sistema | B-04 | Verificar a autenticação administrativa e o upload de arquivos CSV. |
| **TC-07** | Sistema | B-08 | Validar a compatibilidade em diferentes navegadores e tamanhos de tela. |
| **TC-09** | Sistema | B-06 | Validar a comparação entre duas Unidades Federativas. |
| **TC-10** | Sistema | B-10 | Verificar a coerência entre gráficos, tabelas e filtros. |

### 5.3. Testes das novas funcionalidades

As novas funcionalidades também deverão possuir validações próprias, conduzidas pelas respectivas duplas responsáveis pelo desenvolvimento.

| Issue | Caso de Teste | Requisito | Objetivo da Validação |
|---|---|---|---|
| **S8-01** | TC-11 | B-07 | Verificar se os períodos são apresentados em ordem cronológica e se os valores correspondem aos dados históricos. |
| **S8-02** | TC-12 | B-11 | Verificar se o arquivo CSV contém os mesmos registros e valores apresentados na consulta filtrada. |

### 5.4. Registro das evidências

Cada execução de teste deverá registrar:

- Versão ou commit utilizado.
- Ambiente de execução.
- Data da execução.
- Responsável pelo teste.
- Dados utilizados.
- Resultado esperado.
- Resultado obtido.
- Evidência da execução.
- Situação do teste.
- Ciclo da execução.
- Reparo realizado, quando necessário.

Os resultados deverão seguir as classificações definidas no Documento de Visão:

- **Aprovado:** resultado corresponde ao esperado e possui evidência.
- **Reprovado:** resultado diverge do esperado; registrar o defeito e encaminhar a correção.
- **Bloqueado:** teste não pôde ser executado devido à falta de ambiente ou dados.
- **Não executado:** teste ainda não realizado.

---

## 6. Retrospectiva, Dificuldades e Aprendizados

A retrospectiva será consolidada ao término da Sprint, considerando o resultado das entregas, a disponibilidade dos integrantes, os testes realizados e os eventuais impedimentos encontrados.

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | A preencher ao término da Sprint, considerando a organização das quatro duplas, o desenvolvimento das funcionalidades e a execução dos testes. |
| **Dificuldades e impedimentos** | O período de avaliações acadêmicas representa um fator de atenção, pois reduz o tempo disponível dos integrantes para o desenvolvimento. Também será acompanhado o acesso aos dados históricos e a integração das funcionalidades com os componentes já existentes. |
| **Organização do trabalho** | As atividades foram divididas entre quatro duplas, com uma issue de desenvolvimento e uma revisão para cada par, buscando evitar sobrecarga e dependências entre tarefas. |
| **Plano de ação / Próximos passos** | Concluir as funcionalidades complementares, validar as entregas e consolidar as evidências dos testes para iniciar a Sprint 9 com foco em estabilização e preparação da apresentação final. |

### Pontos de atenção

- **Disponibilidade da equipe:** a Sprint ocorre durante o período de avaliações. O planejamento prioriza entregas pequenas e objetivas, respeitando a disponibilidade dos integrantes.
- **Escopo das funcionalidades COULD:** a linha do tempo e a exportação devem permanecer dentro do escopo mínimo definido, evitando recursos adicionais que comprometam a conclusão.
- **Independência das issues:** as atividades foram organizadas para que as duplas possam iniciar seus trabalhos sem depender formalmente da conclusão de outra issue.
- **Qualidade das entregas:** os testes devem acompanhar o desenvolvimento, e as evidências precisam ser registradas no roteiro oficial.
- **Preparação da Sprint 9:** problemas identificados durante os testes deverão ser registrados e encaminhados, permitindo que a próxima Sprint concentre seus esforços na estabilização do sistema.

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax