# Sprint 3 — Ambiente e Back-end Base

## 1. Identificação

**Período:** 07/10/2026 a 13/10/2026

**Objetivo da Sprint:** estabelecer a estrutura inicial do ambiente de desenvolvimento e do back-end do Brasil Hub, preparando a aplicação para o processamento dos dados socioeconômicos e a realização de consultas pela API.

**Entregáveis planejados:**
- Organização do repositório e da estrutura do projeto.
- Configuração do ambiente de desenvolvimento com Docker e Docker Compose.
- Estrutura inicial do front-end.
- Configuração do banco de dados SQLite e do repositório de indicadores.
- Leitura, validação e tratamento de arquivos CSV com Pandas.
- Implementação da API FastAPI para consulta de indicadores.
- Testes de integração e avaliação do requisito de desempenho B-05.

**Resultado geral:** objetivo parcialmente alcançado. Parte da estrutura inicial do projeto e do ambiente foi concluída, mas o processamento de CSV, a API de consulta e os testes de integração e desempenho permaneceram pendentes de conclusão ao final da Sprint.

---

## 2. Planejamento da Sprint

### 2.1. Objetivo planejado

A Sprint 3 foi planejada para estabelecer a base técnica necessária ao desenvolvimento do Brasil Hub.

Além da preparação do ambiente, o escopo previa iniciar o fluxo de tratamento dos dados provenientes de arquivos CSV, disponibilizar uma API de consulta e verificar o requisito B-05 do Documento de Visão, que determina um tempo de resposta de até três segundos para consultas com filtros.

### 2.2. Issues planejadas

A tabela apresenta as atividades inicialmente planejadas e a situação identificada ao final da Sprint.

| Issue | Entrega prevista | Situação ao encerramento |
|---|---|---|
| S3-01 | Política de branches, Pull Requests e revisão de código | Concluída, conforme planejamento informado |
| S3-02 | Estrutura inicial do projeto e configurações | Concluída, conforme planejamento informado |
| S3-03 | Configuração do Docker e Docker Compose | Concluída, conforme planejamento informado |
| S3-04 | Estrutura inicial do front-end | Concluída, conforme planejamento informado |
| S3-05 | SQLite e repositório de indicadores | Implementação informada como concluída; confirmar o estado final do Pull Request |
| S3-06 | Leitura e tratamento de CSV com Pandas | Iniciada, mas não concluída |
| S3-07 | API FastAPI para consulta de indicadores | Não concluída |
| S3-08 | Testes de integração e desempenho B-05 | Não concluída devido às dependências pendentes |

**Observação:** a situação definitiva de cada issue deve ser conferida no GitHub, considerando o estado registrado no encerramento da Sprint, os critérios de aceitação e a revisão das alterações.

### 2.3. Organização do trabalho

A equipe foi organizada em quatro duplas, com revisão cruzada entre as duplas da mesma área.

**Back-end e infraestrutura**

| Dupla | Integrantes | Responsabilidade de revisão |
|---|---|---|
| Dupla 1 | Ágatha e Eduardo | Revisar o trabalho da Dupla 2 |
| Dupla 2 | Josef e Paulo | Revisar o trabalho da Dupla 1 |

**Front-end**

| Dupla | Integrantes | Responsabilidade de revisão |
|---|---|---|
| Dupla 1 | César e Felipe | Revisar o trabalho da Dupla 2 |
| Dupla 2 | Fabiana e Lucas | Revisar o trabalho da Dupla 1 |

A organização buscou manter as responsabilidades de implementação e revisão entre as duplas, conforme a dinâmica de trabalho adotada pela equipe.

---

## 3. Execução e resultados

### 3.1. Entregas realizadas

Com base no acompanhamento da equipe, foram relatados avanços nas seguintes atividades:

- Definição das regras de branches, Pull Requests e revisão de código.
- Organização inicial dos diretórios e arquivos do projeto.
- Configuração do ambiente de desenvolvimento com Docker e Docker Compose.
- Criação da estrutura inicial do front-end.
- Implementação inicial de funções JavaScript e tratamento de erros na comunicação com a API.
- Preparação da estrutura do banco SQLite e implementação do repositório de indicadores, com Pull Request aberto para revisão.
- Revisões de código e resolução de conflitos de integração.

As entregas devem ser vinculadas às respectivas issues e aos Pull Requests do GitHub, de modo a permitir a verificação dos resultados.

### 3.2. Entregas parcialmente concluídas

**S3-05 — SQLite e repositório de indicadores**

A implementação foi informada como concluída por Paulo, que abriu um Pull Request para revisão.

O estado final deve ser confirmado no GitHub. Enquanto não houver confirmação de que os critérios de aceitação foram atendidos e de que a integração ocorreu conforme o processo definido, não se deve considerar a entrega definitivamente aceita.

**S3-06 — Leitura e tratamento de CSV com Pandas**

Ágatha informou ter iniciado a implementação da rotina de leitura e tratamento dos arquivos CSV.

Entretanto, a atividade não foi concluída durante a Sprint, permanecendo pendentes a finalização da implementação, a validação do processamento e a execução dos testes previstos na issue.

### 3.3. Entregas não concluídas

**S3-07 — API FastAPI para consulta de indicadores**

A API de consulta não foi concluída conforme o planejamento original.

Sua implementação depende da disponibilidade da estrutura de persistência e do processamento dos dados necessários para fornecer respostas corretas aos usuários.

**S3-08 — Testes de integração e desempenho B-05**

Os testes de integração e desempenho não foram concluídos porque dependiam das entregas S3-05, S3-06 e S3-07.

Sem os componentes necessários e um conjunto de dados de teste adequado, não foi possível concluir a validação integrada da consulta nem registrar uma medição válida do requisito B-05.

---

## 4. Acompanhamento diário

Os registros de acompanhamento da equipe foram organizados por data na seção de Dailies da Sprint 3.

- [Acessar os registros das dailies](dailies/index.md)

Os registros apresentam os avanços relatados pelos integrantes, as atividades planejadas, as pendências e os encaminhamentos identificados durante o desenvolvimento.

Nem todos os dias tiveram uma daily formalmente registrada. A documentação considera apenas as informações efetivamente disponibilizadas pela equipe.

---

## 5. Testes e validações

### 5.1. Estratégia de testes

O Documento de Visão estabelece três níveis principais de testes:

- **Testes unitários:** verificam funções isoladas, como a validação e o tratamento dos dados.
- **Testes de integração:** verificam a interação entre componentes, como a API, os serviços e a persistência.
- **Testes de sistema:** verificam a aplicação integrada em funcionamento.

Na Sprint 3, o foco previsto estava nos testes do processamento de CSV, nos comportamentos da API e na avaliação do desempenho das consultas.

### 5.2. Situação das validações

| Validação | Resultado ao final da Sprint |
|---|---|
| Construção e inicialização do ambiente Docker | Concluída, conforme o estado informado da S3-03 |
| Persistência local do SQLite | Confirmar a evidência produzida na validação da S3-03 e da S3-05 |
| Leitura e tratamento de CSV | Não concluída |
| Testes unitários do processamento de CSV | Não concluídos |
| API de consulta de indicadores | Não concluída |
| Testes de integração da API | Não concluídos |
| Medição do requisito B-05 | Não executada |


### 5.3. Requisito de desempenho B-05

O requisito B-05 estabelece que as consultas com filtros devem responder em até três segundos.

**Meta:** tempo de resposta menor ou igual a 3 segundos.

**Resultado da Sprint 3:** não avaliado, pois a API de consulta e as dependências necessárias à medição não foram concluídas.

**Evidência:** não disponível para uma medição válida do requisito nesta Sprint.

A validação deverá ser realizada após a disponibilização da API e de um conjunto de dados de teste reproduzível.

O registro deverá incluir a versão ou o commit testado, o ambiente, a quantidade de registros, a operação executada, o tempo observado e o resultado obtido.

---

## 6. Sprint Review
[ A preencher
A Sprint Review tem como finalidade avaliar o incremento produzido em relação ao objetivo planejado. ]

### 6.1. Resultados apresentados

[ A preencher após a realização ou a consolidação do registro da revisão da Sprint.

Devem ser descritos os componentes efetivamente demonstrados, os critérios de aceitação verificados e os resultados observados. ]

### 6.2. Feedback recebido

[ A preencher após reunião]

---

## 7. Sprint Retrospective

[ A retrospectiva deve identificar oportunidades para melhorar o processo de trabalho da equipe. ]

### 7.1. Aspectos positivos observados

- A equipe estabeleceu uma estrutura inicial para o repositório e o ambiente de desenvolvimento.
- Foram iniciadas as práticas de revisão de código por meio de Pull Requests.
- Os registros diários ajudaram a identificar dependências e atividades pendentes.
- Houve avanço na documentação e na organização das atividades do projeto.

### 7.2. Dificuldades identificadas

- Algumas atividades permaneceram pendentes devido à dependência de outras issues.
- O processamento de CSV e a implementação da API não foram concluídos conforme o planejamento.
- Os testes de integração e desempenho ficaram comprometidos pelas dependências técnicas.
- A equipe precisou conciliar o desenvolvimento com provas e outras atividades acadêmicas.
- Nem todos os acompanhamentos diários foram realizados ou registrados.
- A preparação da atividade acadêmica de GQM e da apresentação do Documento de Visão demandou tempo durante o período de desenvolvimento.
- Atraso na elaboração das issues atrapalhou no desenvolvimento da Sprint.

### 7.3. Ações de melhoria propostas

As ações abaixo deverão ser discutidas e validadas pela equipe.

| Ação proposta | Objetivo |
|---|---|
| Atualizar diariamente o estado das issues | Melhorar a visibilidade do progresso do trabalho |
| Comunicar bloqueios assim que forem identificados | Evitar atrasos em atividades dependentes |
| Confirmar dependências antes de assumir novas tarefas | Reduzir bloqueios durante a execução da Sprint |
| Planejar o escopo considerando a disponibilidade acadêmica dos integrantes | Tornar as metas mais realistas |
| Reservar tempo para testes e revisão de código | Reduzir o risco de encerrar a Sprint com entregas não validadas |

As ações adotadas para a Sprint 4 devem ser registradas após a discussão da retrospectiva.

---

## 8. Pendências e próximos passos

| Pendência | Situação identificada | Encaminhamento proposto |
|---|---|---|
| S3-06 — Leitura e tratamento de CSV | Iniciada, mas não concluída | Finalizar processamento, validação e testes |
| S3-07 — API FastAPI | Não concluída | Implementar e validar os endpoints de consulta |
| S3-08 — Testes de integração e desempenho | Não concluída | Executar os testes após a conclusão das dependências |
| Requisito B-05 | Não avaliado | Medir o tempo de resposta da API e registrar as evidências |
| Pull Requests pendentes | Situação a confirmar | Concluir revisões e integração das alterações |


---

## 9. Critérios de conclusão da Sprint 3

Esta seção apresenta os principais critérios utilizados para verificar as entregas planejadas.

### 9.1. Repositório e processo

- [x] A política de branches, Pull Requests e commits foi definida.
- [x] A estrutura inicial do projeto foi criada.
- [x] O processo de revisão de código foi estabelecido.
- [x] O README e as instruções de execução do ambiente foram preparados.

### 9.2. Ambiente

- [x] A configuração Docker foi preparada para execução local.
- [x] O Docker Compose foi configurado para iniciar os serviços previstos.
- [x] As configurações locais e credenciais foram tratadas conforme as regras de versionamento do projeto.

**Observação:** os critérios acima devem permanecer marcados como concluídos somente se as respectivas evidências existirem e os critérios de aceitação das issues tiverem sido atendidos.

### 9.3. Back-end e dados

- [ ] O CSV de teste é lido corretamente com Pandas.
- [ ] Os dados são validados e padronizados.
- [ ] Os valores ausentes são tratados sem substituição indevida por zero.
- [ ] O SQLite armazena e consulta os indicadores corretamente.
- [ ] A API oferece um endpoint funcional de consulta em JSON.
- [ ] A documentação automática da API está disponível.
- [ ] Os testes automatizados previstos para o processamento e a API foram executados.

### 9.4. Front-end

- [x] A estrutura-base da interface foi criada.
- [x] O cliente JavaScript da API foi iniciado.
- [ ] A integração com o back-end foi validada de ponta a ponta.

### 9.5. Qualidade e desempenho

- [ ] Os testes de integração foram executados.
- [ ] O tempo de resposta da API foi medido.
- [ ] O resultado da medição do B-05 foi registrado.
- [ ] Os Pull Requests relacionados às entregas da Sprint foram revisados e integrados conforme o processo estabelecido.

**Resultado:** os critérios de conclusão foram atendidos parcialmente. As pendências de processamento de dados, API e validação integrada impediram a conclusão de todo o escopo planejado.

---

## 10. Métricas da Sprint 3

O Documento de Visão estabelece métricas para acompanhar o andamento e a qualidade do projeto.

A avaliação deverá considerar o escopo originalmente planejado para a Sprint e os registros efetivamente disponíveis no GitHub.

### 10.1. Métrica 1 — Percentual de conclusão das issues planejadas

**Objetivo:** avaliar o cumprimento do planejamento da Sprint.

**Fórmula:**

Conclusão (%) = (Número de issues planejadas concluídas / Total de issues inicialmente planejadas) × 100

**Total de issues inicialmente planejadas:** 8.

**Meta estabelecida no Documento de Visão:** superior a 90%.

**Apuração preliminar:**

Considerando as 5 issues iniciais finalizadas:

Conclusão (%) = (5 / 8) × 100 = 62,5%.

**Avaliação:** a meta de conclusão superior a 90% não foi alcançada em nenhum dos dois cenários acima.

**Fonte:** GitHub Projects e histórico das issues da Sprint 3.

### 10.2. Métrica 2 — Proporção de defeitos

**Objetivo:** avaliar a proporção de defeitos identificados em relação às issues entregues.

**Fórmula:**

Proporção de defeitos (%) = (Número de bugs registrados na Sprint / Número de issues entregues na Sprint) × 100

**Meta estabelecida no Documento de Visão:** inferior a 10%.

**Resultado:** Não identificamos bugs, pois necessitamos de testes.

Não foram identificados bugs ainda.

**Fonte:** GitHub Projects e issues identificadas com a etiqueta `bug`.

### 10.3. Métrica 3 — Saldo de débito técnico

**Objetivo:** acompanhar a evolução do débito técnico ao longo das Sprints.

**Fórmula:**

Saldo de débito técnico = Número de itens novos de débito técnico − Número de itens de débito técnico resolvidos

**Meta estabelecida no Documento de Visão:** saldo menor ou igual a zero por Sprint.

**Resultado:** 3 issues não finalizadas. Logo, saldo maior que zero na Sprint.

**Fonte:** GitHub Projects e issues identificadas com a etiqueta `tech-debt`.

### 10.4. Resumo das métricas

| Métrica | Meta | Resultado da Sprint 3 | Avaliação |
|---|---|---|---|
| Conclusão das issues | Superior a 90% | 50% ou 62,5%, conforme o estado final da S3-05 | Meta não atingida |
| Proporção de defeitos | Inferior a 10% | Pendente de apuração | Não avaliada |
| Saldo de débito técnico | Menor ou igual a zero | Pendente de apuração | Não avaliado |
| Desempenho B-05 | Tempo de resposta de até 3 segundos | Não medido | Não avaliado |

As métricas ainda não apuradas deverão ser calculadas a partir das evidências do projeto. A ausência de medição não deve ser registrada como resultado aprovado ou como comprovação de que a meta foi atingida.

---

## 11. Conclusão

A Sprint 3 permitiu avançar na estrutura inicial do Brasil Hub, na configuração do ambiente de desenvolvimento, na organização do repositório e na preparação da persistência dos dados.

Entretanto, o objetivo da Sprint foi alcançado apenas parcialmente. O processamento de CSV permaneceu incompleto, a API de consulta não foi concluída e os testes de integração e desempenho não puderam ser finalizados.

A métrica de conclusão das issues também indica um resultado abaixo da meta estabelecida no Documento de Visão, considerando os estados preliminares apresentados nesta página.

As pendências deverão ser avaliadas durante o planejamento da Sprint 4, priorizando as dependências necessárias para disponibilizar os dados por meio da API e, posteriormente, integrar os filtros e o mapa interativo.

Os resultados desta Sprint devem orientar ajustes no planejamento, no acompanhamento das atividades e na coordenação entre as duplas, de modo a melhorar a previsibilidade e a qualidade das próximas entregas.