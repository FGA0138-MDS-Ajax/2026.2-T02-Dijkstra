# BRASIL HUB — TIME DIJKSTRA

## GQM de Projeto: Acompanhamento de Sprints, Qualidade e Débito Técnico

## 1. Objetivo de Medição

Avaliar o percentual de conclusão das issues planejadas, a proporção de defeitos nas entregas e a evolução do saldo de débito técnico ao longo das Sprints, permitindo verificar se o planejamento está sendo cumprido, identificar desvios e orientar ações corretivas nos ciclos seguintes.

**Tabela 1** — Objetivo de medição da métrica de projeto (GQM)

| **Atributo** | **Descrição** |
|---|---|
| **Objeto** | Execução das Sprints e entregas incrementais do projeto Brasil Hub |
| **Propósito** | Avaliar e acompanhar o cumprimento do planejamento, a estabilidade das entregas e o controle de débitos técnicos |
| **Qualidade do foco** | Taxa de conclusão do escopo (M1), densidade de defeitos (M2) e saldo de débito técnico (M3) |
| **Ponto de vista** | Scrum Master e Equipe de Desenvolvimento |
| **Ambiente** | Acompanhamento das atividades por meio das Issues, Pull Requests e Milestones do GitHub |

---

## 2. Esquema de Questões e Métricas

As questões abaixo decompõem o objetivo de medição em indicadores quantitativos verificáveis ao final de cada Sprint.

**Tabela 2** — Questões e Métricas do Projeto

| **Questão** | **Métricas** | **Fórmula** | **Meta** |
|---|---|---|:---:|
| **QP1** — Qual o percentual das issues planejadas foi concluído na Sprint?<br>**QP2** — Quantas issues foram concluídas e quantas permaneceram abertas? | **M1 (MP1)** — Percentual de conclusão das issues planejadas<br>**MP2** — Issues planejadas concluídas<br>**MP3** — Issues planejadas não concluídas | **M1** = (Issues Concluídas ÷ Issues Planejadas) × 100<br><br>**MP3** = Planejadas − Concluídas | > 90% |
| **QP3** — Qual a proporção de defeitos (bugs) em relação às entregas de cada Sprint? | **M2** — Proporção de defeitos por entrega | **M2** = (Bugs Reportados ÷ Issues Entregues) × 100 | < 10% |
| **QP4** — O débito técnico diminuiu, manteve-se estável ou aumentou na Sprint? | **M3 (MP4)** — Saldo de débito técnico na Sprint | **M3** = Novos Débitos − Débitos Resolvidos | ≤ 0 |

---

## 3. Modelo de Coleta de Dados

**Tabela 3** — Ficha de definição e coleta das métricas de projeto

| **Atributo** | **Descrição** |
|---|---|
| **Nomes das métricas** | M1: Conclusão de Issues Planejadas (%)<br>M2: Proporção de Defeitos (%)<br>M3: Saldo de Débito Técnico (contagem absoluta) |
| **Processo de medição** | 1. Fixar o escopo de issues no Sprint Planning.<br>2. Acompanhar o progresso diário por meio das Dailies e do quadro Kanban.<br>3. No encerramento da Sprint (Sprint Review), contabilizar as issues fechadas/integradas na branch `developer`, os bugs reportados e os débitos técnicos gerados ou quitados.<br>4. Calcular M1, M2 e M3 e registrar na tabela histórica e na página da respectiva Sprint. |
| **Quando é feita** | Ao término de cada Sprint (ciclo semanal). |
| **Onde é armazenada** | `docs/metricas/gqm-projeto.md` e nas páginas individuais de cada Sprint (`docs/acompanhamento/sprints/`). |
| **Unidade (escala)** | M1 e M2: percentual (0% a 100%), escala de razão.<br>M3: número inteiro, escala absoluta. |

---

## 4. Modelo de Análise das Métricas

**Tabela 4** — Faixas de referência, decisões e ações sugeridas

| **Situação** | **Valor-limite** | **Decisão** | **Ações Sugeridas** |
|---|---|---|---|
| **Completa / Saudável** | M1 = 100%, M2 < 10% e M3 ≤ 0 | Planejamento da Sprint cumprido integralmente | Manter o ritmo de execução e registrar aprendizados na retrospectiva. |
| **Atenção / Parcial** | 90% ≤ M1 < 100% ou M3 = +1 | Escopo quase integralmente cumprido com leve pendência | Identificar o gargalo específico e priorizar a quitação do item pendente no início da próxima Sprint. |
| **Crítica** | M1 < 90% ou M3 ≥ +2 | Desvio relevante no cumprimento da Sprint | Reavaliar a granularidade e as dependências das issues no próximo Planning; alocar pares para quitar imediatamente os débitos herdados antes de abrir novas frentes. |

---

## 5. Coletas Realizadas e Histórico de Medições (Sprints 1 a 7)

A tabela a seguir consolida todas as coletas reais efetuadas pela equipe ao término de cada Sprint concluída até o momento:

**Tabela 5** — Histórico consolidado de coletas do GQM de Projeto

| **Sprint** | **Período** | **Planejadas** | **Concluídas (MP2)** | **Pendentes (MP3)** | **M1 (Conclusão)** | **M2 (Defeitos)** | **M3 (Saldo Débito)** | **Classificação** |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **[Sprint 1](../acompanhamento/sprints/sprint01/sprint01.md)** | 23/09 a 29/09/2026 | 6 | 6 | 0 | **100,0%** | **0,0%** (0/6) | **0** (0 − 0) | Completa ✅ |
| **[Sprint 2](../acompanhamento/sprints/sprint02/sprint02.md)** | 30/09 a 06/10/2026 | 8 | 8 | 0 | **100,0%** | **0,0%** (0/8) | **0** (0 − 0) | Completa ✅ |
| **[Sprint 3](../acompanhamento/sprints/sprint03/index.md)** | 07/10 a 13/10/2026 | 8 | 5 | 3 | **62,5%** | **0,0%** (0/5) | **+3** (3 − 0) | Crítica ⚠️ |
| **[Sprint 4](../acompanhamento/sprints/sprint04/index.md)** | 14/10 a 20/10/2026 | 7 (4 + 3 débitos) | 7 | 0 | **100,0%** | **0,0%** (0/7) | **−3** (0 − 3) | Completa ✅ |
| **[Sprint 5](../acompanhamento/sprints/sprint05/index.md)** | 21/10 a 27/10/2026 | 5 | 3 | 2 | **60,0%** | **0,0%** (0/3) | **+2** (2 − 0) | Crítica ⚠️ |
| **[Sprint 6](../acompanhamento/sprints/sprint06/index.md)** | 28/10 a 03/11/2026 | 6 (4 + 2 débitos) | 5 | 1 | **83,3%** | **0,0%** (0/5) | **−1** (1 − 2) | Atenção 🟡 |
| **[Sprint 7](../acompanhamento/sprints/sprint07/index.md)** | 04/11 a 10/11/2026 | 5 (4 + 1 débito) | 5 | 0 | **100,0%** | **0,0%** (0/5) | **−1** (0 − 1) | Completa ✅ |
| **Acumulado** | **Sprints 1 a 7** | **39 issues líquidas** | **39 entregues** | **0 abertas** | **100,0% acumulado** | **0,0%** | **Saldo Final: 0** | **Estável ✅** |

---

## 6. Análise Crítica dos Resultados e Tomada de Decisão

Com base nos dados coletados na **Tabela 5**, registraram-se as seguintes análises e decisões gerenciais ao longo do projeto:

1. **Estabilidade na Fase de Concepção (Sprints 1 e 2):**  
   Ambas as sprints iniciais atingiram **M1 = 100%** e **M3 = 0**, garantindo a entrega integral do Documento de Visão e do Documento de Arquitetura sem pendências para o início da codificação.
2. **Identificação de Gargalos por Dependência Técnica (Sprint 3 → Ação na Sprint 4):**  
   Na Sprint 3, a métrica **M1 caiu para 62,5%** (M3 = +3) porque a tarefa de limpeza de CSV com Pandas (`S3-06`) bloqueou a conclusão da API (`S3-07`) e dos testes (`S3-08`). Aplicando a ação corretiva prevista na Tabela 4, a equipe priorizou os 3 débitos logo no início da Sprint 4, alcançando **M1 = 100%** e **M3 = −3**, zerando o passivo técnico.
3. **Impacto do Calendário Acadêmico e Recuperação Gradual (Sprints 5, 6 e 7):**  
   Na Sprint 5, devido ao período de provas na universidade, o Front-end administrativo (`S5-04` e `S5-05`) ficou pendente (**M1 = 60%**, **M3 = +2**). Na Sprint 6, a equipe quitou 100% dos débitos da Sprint 5 e reduziu o saldo de débito (**M3 = −1**, **M1 = 83,3%**), restando apenas a finalização de acessibilidade (`S6-01`). Na Sprint 7, todas as 5 issues foram concluídas (**M1 = 100%**, **M3 = −1**), encerrando a Release 1 com **zero débitos técnicos acumulados**.
4. **Qualidade Técnica e Prevenção de Defeitos (M2 = 0%):**  
   A manutenção de **M2 = 0%** nas entregas integradas deveu-se diretamente à exigência de revisão de código cruzada (Code Review) e à esteira de Integração Contínua (GitHub Actions + Pytest), que barrou regressões antes do merge na branch `developer`.
