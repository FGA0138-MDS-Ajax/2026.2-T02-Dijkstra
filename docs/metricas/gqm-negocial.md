# BRASIL HUB — TIME DIJKSTRA

## GQM Negocial: Cobertura dos Dados dos Indicadores por UF

# 1. Objetivo de medição

O Brasil Hub permite consultar e comparar indicadores socioeconômicos por estado. Uma comparação só é confiável se todas as UFs esperadas tiverem dado válido; um estado sem valor, ou com valor ausente exibido como zero, leva o usuário a uma conclusão errada.

**Tabela 1** - Objetivo de medição negocial (GQM)

| **Atributo**       | **Descrição**                                                                                        |
|--------------------|------------------------------------------------------------------------------------------------------|
| **Objeto**         | Dados dos indicadores socioeconômicos do Brasil Hub                                                  |
| **Propósito**      | Avaliar se os dados disponibilizados aos usuários estão completos                                    |
| **Foco**           | Existência de valor válido para cada unidade da Federação esperada                                   |
| **Ponto de vista** | Product Owner e usuários da aplicação                                                                |
| **Ambiente**       | Consultas e comparações de indicadores por estado, dimensão (renda, educação, longevidade) e período |

# 2. Esquema GQM

**Tabela 2** - Questões e métricas

| **Questão**                                         | **Métrica**                                                       | **Fórmula**                              |
|-----------------------------------------------------|-------------------------------------------------------------------|------------------------------------------|
| **Q1** — Qual a proporção de UFs com dado válido?   | **M1** — Percentual de cobertura                                  | M1 = (UFs válidas ÷ UFs esperadas) × 100 |
| **Q2** — Quantas e quais UFs estão sem dado válido? | **M2** — Quantidade de UFs sem valor válido (com a lista das UFs) | M2 = UFs esperadas − UFs válidas         |
| **Q3** — O indicador pode ser disponibilizado?      | M1 e M2 comparadas às faixas do item 4                            | —                                        |

**Premissas:**

- São esperadas 27 UFs (26 estados + Distrito Federal). Linhas de agregados, como "Brasil" e regiões, não contam.
- Um valor é inválido quando está vazio, não é numérico, está fora do domínio do indicador (ex.: IDHM fora de 0 a 1), possui UF não reconhecida ou aparece duplicado com valores diferentes.
- Dado ausente nunca é convertido em zero.
- A abrangência de 27 UFs deve ser confirmada no conjunto de dados utilizado na primeira medição.

# 3. Modelo de coleta de dados

**Tabela 3** - Ficha de definição da métrica

| **Atributo** | **Descrição** |
|---|---|
| **Nome da métrica** | Percentual de cobertura dos dados dos indicadores por UF |
| **Processo de medição** | 1. Selecionar o indicador, a dimensão e o período.<br>2. Contar as UFs esperadas com valor válido.<br>3. Calcular M1 e M2.<br>4. Classificar o resultado conforme o item 4.<br>5. Registrar no histórico: data, conjunto de dados, indicador, dimensão, período, M1, M2 e UFs faltantes. |
| **Fórmula de cálculo** | M1 = (UFs válidas ÷ UFs esperadas) × 100<br>M2 = UFs esperadas − UFs válidas |
| **Responsáveis** | Fabiana e Lucas |
| **Quando é feita** | Após carregar ou atualizar dados e antes de demonstrações ou entregas de versão |
| **Onde é armazenada** | `docs/metricas/gqm-negocial.md` |
| **Unidade (escala)** | M1: percentual (0 a 100%), escala de razão<br>M2: quantidade de UFs (0 a 27), escala de razão |
| **Agregações e visualização** | Tabela por indicador, dimensão e período<br>Gráfico de barras de M1<br>Cobertura geral = total de pares UF válidos ÷ total de pares esperados (não a média dos percentuais) |

# 4. Modelo de análise da métrica

A meta é 100% de cobertura. Os limites são definidos pela quantidade de UFs sem valor válido (M2).

Observação: o limite é definido por M2, e não pelo percentual de 96,3%, porque uma única UF ausente resulta em 26/27 = 96,296%, valor inferior a 96,3%.

**Tabela 4** - Faixas, limites, decisões e ações

| **Situação**   | **Valor-limite**    | **Decisão**                                                       | **Ações sugeridas**                                                                                                                  |
|----------------|---------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Completa**   | M2 = 0 (M1 = 100%)  | Disponibilizar o indicador                                        | Registrar a medição no histórico                                                                                                     |
| **Incompleta** | M2 = 1 (M1 ≈ 96,3%) | Verificar se a ausência é da fonte (justificada) ou erro de dados | Se justificada, disponibilizar com aviso; se for erro, conferir o arquivo de origem e o mapeamento da UF, corrigir e medir novamente |
| **Crítica**    | M2 ≥ 2 (M1 ≤ 92,6%) | Não disponibilizar até a investigação                             | Investigar importação, tratamento e mapeamento das UFs; abrir issue de bug; corrigir, reprocessar e medir novamente                  |
