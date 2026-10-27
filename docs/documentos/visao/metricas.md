# 5. Métricas e Medições

## 5.1. GQM de medições

O acompanhamento das métricas será feito utilizando a estrutura Goal-Question-Metric. A Tabela 14 define o objetivo geral, e a Tabela 15 estabelece a métrica de velocidade da equipe. A Tabela 16 define o objetivo de medição da qualidade técnica das entregas, e as Tabelas 17 e 18 detalham as métricas de defeitos e de débito técnico.

**Tabela 14 — Objetivo de medição 1: andamento da Sprint (GQM).**

| Atributo | Descrição |
|---|---|
| Objeto | Desenvolvimento do Brasil Hub (sprint) |
| Propósito | Acompanhar o avanço do projeto |
| Foco | Cumprir a proposta da sprint |
| Ponto de vista | Scrum master |
| Ambiente | Brasil Hub |

*Fonte: Elaborado por Felipe.*

### Tabela 15 — Métrica 1: conclusão das issues planejadas

**Q1:** A equipe está concluindo o que foi planejado na sprint?

| Atributo | Descrição |
|---|---|
| Definição | Quantidades de issues planejadas para a sprint comparada às feitas ao final da sprint. |
| Cálculo | (Issues fechadas na sprint / issues planejadas na sprint) x 100. |
| Escala | Variação de 0-100% |
| Valor esperado | >90% |
| Análise | Comparar o realizado com o planejado no gráfico de burndown ao final de cada sprint. |
| Responsável/Frequência/Fonte | Scrum master, ao final de cada sprint, GitHub Projects (Kanban). |

*Fonte: Elaborado por Paulo.*

**Tabela 16 — Objetivo de Medição 2: Qualidade técnica das entregas.**

| Atributo | Descrição |
|---|---|
| Objeto | Desenvolvimento do Brasil Hub (sprint) |
| Propósito | Avaliar a qualidade das entregas, para evitar retrabalho e acúmulo de problemas |
| Foco | Defeitos identificados e débito técnico acumulado nas entregas |
| Ponto de vista | Equipe de desenvolvimento |
| Ambiente | Brasil Hub |

*Fonte: Elaborado por Paulo.*

### Tabela 17 — Métrica 2: proporção de defeitos

**Q2:** Qual a proporção de defeitos em relação às entregas de cada sprint?

| Atributo | Descrição |
|---|---|
| Definição | Quantidade de defeitos (bugs) reportados em relação às issues/funcionalidades entregues na Sprint. |
| Cálculo | (Nº de bugs reportados na sprint ÷ Nº de issues entregues na sprint) × 100. |
| Escala | Sem limite superior |
| Valor esperado | <10% |
| Análise | Comparar a densidade de defeitos entre sprints ao longo do projeto; tendência de queda indica melhoria na qualidade, enquanto picos apontam sprints com entregas mais instáveis. Pode-se cruzar com a taxa de conclusão (M1); sprints com alta taxa de conclusão e alta densidade de defeitos sugerem entregas apressadas. |
| Responsável/Frequência/Fonte | Equipe de desenvolvimento; ao final de cada sprint; GitHub Projects, a partir das issues com label `bug`. |

*Fonte: Elaborado por Paulo Eduardo.*

### Tabela 18 — Métrica 3: débito técnico

**Q3:** O débito técnico diminuiu, se manteve ou aumentou a cada sprint?

| Atributo | Descrição |
|---|---|
| Definição | Quantidade de itens de débito técnico (refatorações pendentes e soluções provisórias) registrados na sprint, comparada à de itens resolvidos nela. |
| Cálculo | Nº de itens de débito técnico novos na sprint − Nº de itens resolvidos na sprint = saldo de débito técnico. |
| Escala | Contagem absoluta (saldo de itens) |
| Valor esperado | Saldo ≤ 0 por sprint |
| Análise | Comparar o saldo sprint a sprint; crescimento constante indica necessidade de priorizar refatoração na sprint seguinte. Pode-se cruzar com a taxa de conclusão (M1) — alta taxa de conclusão acompanhada de débito crescente sugere que o time está "empurrando" problemas para depois. |
| Responsável/Frequência/Fonte | Equipe de desenvolvimento (quem identifica e registra o débito técnico como issue); ao final de cada sprint; GitHub Projects, a partir das issues com label `tech-debt`. |

*Fonte: Elaborado por Paulo Eduardo.*
