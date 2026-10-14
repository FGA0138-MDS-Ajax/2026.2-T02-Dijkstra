# BRASIL HUB — TIME DIJKSTRA

## GQM de Projeto: Percentual de Conclusão das Issues Planejadas

# 1. Medição

Avaliar o percentual de conclusão das Issues permitindo avaliar se o planejamento das sprints foi cumprido, identificando desvios, débitos e mudar o comportamento/ações para a próxima sprint.

**Tabela 1** - Objetivo de medição da métrica de projeto (GQM)

| **Atributo** | **Descrição** |
|---|---|
| **Objetivo** | Analisar a execução das issues inicialmente planejadas para as Sprints do projeto Brasil Hub |
| **Propósito** | Com a finalidade de avaliar e acompanhar o cumprimento do planejamento da Sprint |
| **Qualidade do foco** | Percentual de conclusão do escopo inicialmente planejado |
| **Pontos de vista** | Equipe de desenvolvimento |
| **Ambiente** | Acompanhamento das atividades por meio das Issues do GitHub e Milestones. |

# 2. Esquema de métricas e Questões

As questões esclarecem o objetivo e permitem concluir se ele foi alcançado.

**Tabela 2** - Questões e Métricas do Projeto

| **Questão** | **Métricas** | **Fórmula** |
|---|---|---|
| **QP1** - Qual o percentual das issues foi concluído?<br>**QP2** - Quantas issues foram concluídas e quantas permanecem abertas? | **MP1** - Percentual de conclusão das issues planejadas<br>**MP2** - Quantidade de issues planejadas concluídas<br>**MP3** - Quantidade de issues planejadas não concluídas | Conclusão da Sprint (%) = (Número de issues planejadas concluídas / Número total de issues inicialmente planejadas) × 100<br><br>MP3 - Issues não concluídas = Total de issues inicialmente planejadas − Issues planejadas concluídas |
| **QP3** - O percentual da conclusão está dentro da faixa esperada? | Utilizar o resultado da MP1 | — |
| **QP4** - Quais fatores contribuíram para o não cumprimento do planejamento? | Bloqueios, dependências técnicas e dificuldades de integração<br><br>**MP4** - Quantidade de issues pendentes (débito técnico) | — |

**Tabela 3** - Modelo de coleta de dados do projeto

| **Atributos** | **Descrição** |
|---|---|
| **Nome da métrica** | Percentual de conclusão das Issues planejadas para a Sprint (MP1). |
| **Processo de medição** | 1. Não modificar o escopo das issues já atribuídas durante uma sprint.<br>2. Acompanhar diariamente seguindo as Dailys e o Kanban.<br>3. No encerramento da Sprint, fazer uma reunião e extrair as quantidades exatas de issues concluídas em relação às planejadas.<br>4. Aplicar o cálculo da MP1.<br>5. Registrar os resultados e verificar de acordo com a tabela o que deve ser feito. |
| **Fórmula do cálculo** | MP1 = (Número de issues planejadas concluídas / Número total de issues inicialmente planejadas) × 100 |
| **Quando é feita** | Após a finalização de uma Sprint, onde vai haver uma reunião e análise dos resultados. |
| **Onde é armazenada** | `docs/metricas/gqm-negocial.md` |
| **Unidade (escala)** | MP1: percentual (0 a 100%), escala de razão |
| **Agregações e visualização** | Tabelas de históricos e que mostram visualmente as conclusões dos ciclos e porcentagens. |

# 3. Análise das Métricas

**Tabela 4** - Modelo de análise das métricas do projeto

| **Situação** | **Valor-limite** | **Decisão** | **Ações Sugeridas** |
|---|---|---|---|
| **Completa** | MP1 = 100% | Considerar o planejamento da Sprint como concluído | — |
| **Incompleto** | 100% > MP1 > 90% | Identificar os gargalos específicos e transferir os débitos para a próxima Sprint. | Debater com o grupo as causas dos impedimentos e gargalos e planejar melhor para evitar esse problema |
| **Critica** | MP1 < 90% | Revisar o escopo da Sprint e do Projeto, adequando à quantidade de membros | Executar outro planejamento de escopo, ver impactos nas próximas Sprints e planejar adequadamente. |