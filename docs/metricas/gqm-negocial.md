# BRASIL HUB — TIME DIJKSTRA

## GQM Negocial: Cobertura dos Dados dos Indicadores por UF

## 1. Objetivo de Medição

O Brasil Hub permite consultar e comparar indicadores socioeconômicos por estado. Uma comparação só é confiável se todas as Unidades Federativas (UFs) esperadas tiverem dado válido; um estado sem valor, ou com valor ausente exibido indevidamente como zero, leva o usuário a uma conclusão equivocada.

**Tabela 1** — Objetivo de medição negocial (GQM)

| **Atributo**       | **Descrição**                                                                                        |
|--------------------|------------------------------------------------------------------------------------------------------|
| **Objeto**         | Dados dos indicadores socioeconômicos do Brasil Hub                                                  |
| **Propósito**      | Avaliar se os dados disponibilizados aos usuários estão completos e íntegros                         |
| **Foco**           | Existência de valor válido para cada Unidade da Federação esperada em cada período                   |
| **Ponto de vista** | Product Owner e usuários da aplicação                                                                |
| **Ambiente**       | Consultas e comparações de indicadores por estado, dimensão (IDHM Geral, renda, educação, longevidade) e período |

---

## 2. Esquema GQM

**Tabela 2** — Questões e métricas

| **Questão**                                         | **Métrica**                                                       | **Fórmula**                              |
|-----------------------------------------------------|-------------------------------------------------------------------|------------------------------------------|
| **Q1** — Qual a proporção de UFs com dado válido?   | **M1** — Percentual de cobertura territorial                      | **M1** = (UFs válidas ÷ UFs esperadas) × 100 |
| **Q2** — Quantas e quais UFs estão sem dado válido? | **M2** — Quantidade de UFs sem valor válido (com a lista das UFs) | **M2** = UFs esperadas − UFs válidas         |
| **Q3** — O indicador pode ser disponibilizado?      | M1 e M2 comparadas às faixas do item 4                            | —                                        |

**Premissas:**

- São esperadas **27 UFs** (26 estados + Distrito Federal). Linhas de agregados, como "Brasil" e macrorregiões, são filtradas no pré-processamento.
- Um valor é inválido quando está vazio, não é numérico, está fora do domínio do indicador (ex.: IDHM fora do intervalo de 0 a 1), possui UF não reconhecida ou aparece duplicado com valores divergentes.
- Dado ausente (`null`/`None`) nunca é convertido em zero (`0.0`).

---

## 3. Modelo de Coleta de Dados

**Tabela 3** — Ficha de definição da métrica

| **Atributo** | **Descrição** |
|---|---|
| **Nome da métrica** | Percentual de cobertura dos dados dos indicadores por UF |
| **Processo de medição** | 1. Selecionar o arquivo/indicador, a dimensão e os períodos de referência.<br>2. Executar o pipeline `tratar_csv()` e contar as UFs esperadas com valor válido.<br>3. Calcular M1 e M2.<br>4. Classificar o resultado conforme a Tabela 4.<br>5. Registrar no histórico (Seção 5): data, conjunto de dados, dimensão, períodos, M1, M2 e UFs faltantes. |
| **Fórmula de cálculo** | **M1** = (UFs válidas ÷ 27) × 100<br>**M2** = 27 − UFs válidas |
| **Responsáveis** | Fabiana Reis e Lucas Nery |
| **Quando é feita** | Após carregar ou atualizar arquivos CSV na base e antes de demonstrações ou entregas de release |
| **Onde é armazenada** | `docs/metricas/gqm-negocial.md` |
| **Unidade (escala)** | M1: percentual (0% a 100%), escala de razão<br>M2: quantidade absoluta de UFs (0 a 27), escala de razão |

---

## 4. Modelo de Análise da Métrica

A meta é **100% de cobertura** (M2 = 0). Os limites decisórios são definidos pela quantidade de UFs sem valor válido (M2).

*Observação:* o limite operacional é definido por M2 porque uma única UF ausente resulta em 26 / 27 = 96,296%.

**Tabela 4** — Faixas, limites, decisões e ações

| **Situação**   | **Valor-limite**    | **Decisão**                                                       | **Ações sugeridas**                                                                                                                  |
|----------------|---------------------|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Completa**   | M2 = 0 (M1 = 100%)  | Disponibilizar o indicador na plataforma                          | Registrar a medição no histórico e liberar para visualização no mapa e nos gráficos.                                                 |
| **Incompleta** | M2 = 1 (M1 ≈ 96,3%) | Verificar se a ausência é da fonte oficial (IBGE/PNUD) ou falha de ingestão | Se justificada pela fonte, disponibilizar mantendo `null` na UI; se for erro de processamento, corrigir mapeamento e reprocessar. |
| **Crítica**    | M2 ≥ 2 (M1 ≤ 92,6%) | Não disponibilizar o lote até investigação                        | Investigar importação, tratamento Pandas e mapeamento das UFs; abrir issue de correção, reprocessar o CSV e medir novamente.          |

---

## 5. Coletas Realizadas nos Conjuntos de Dados Oficiais

As coletas abaixo foram realizadas sobre as 4 bases oficiais em `data/raw/` após o processamento pelo módulo `src/data/processamento_csv.py` e validadas pela suíte de testes automatizados (`tests/data/test_processamento_csv.py`):

**Tabela 5** — Registro de medições de cobertura dos dados (Sprints 4 a 7)

| **Data da Coleta** | **Arquivo / Conjunto de Dados** | **Dimensão** | **Períodos Avaliados** | **UFs Esperadas** | **UFs Válidas** | **M1 (Cobertura)** | **M2 (Faltantes)** | **Situação / Decisão** |
|:---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|
| 18/10/2026 (S4) | `data/raw/idhm_geral_uf.csv` | `idhm_geral` | 1991, 2000, 2010 e 2012–2024 (16 anos) | 27 | 27 | **100,0%** | **0** (Nenhuma) | **Completa ✅** (Liberado) |
| 18/10/2026 (S4) | `data/raw/idhm_renda_uf.csv` | `renda` | 1991, 2000, 2010 e 2012–2024 (16 anos) | 27 | 27 | **100,0%** | **0** (Nenhuma) | **Completa ✅** (Liberado) |
| 18/10/2026 (S4) | `data/raw/idhm_educacao_uf.csv` | `educacao` | 1991, 2000, 2010 e 2012–2024 (16 anos) | 27 | 27 | **100,0%** | **0** (Nenhuma) | **Completa ✅** (Liberado) |
| 18/10/2026 (S4) | `data/raw/idhm_longevidade_uf.csv` | `longevidade` | 1991, 2000, 2010 e 2012–2024 (16 anos) | 27 | 27 | **100,0%** | **0** (Nenhuma) | **Completa ✅** (Liberado) |
| 08/11/2026 (S7) | Base consolidada pós-upload (`TC-05`, `TC-09`, `TC-10`) | Todas as 4 dimensões | 16 períodos (Total = 1.728 pares UF/ano) | 27 por ano | 27 por ano | **100,0%** | **0** (Nenhuma) | **Completa ✅** (Homologado Release 1) |

---

## 6. Análise dos Resultados Negociais

1. **Cobertura Integral das 27 Unidades Federativas (M1 = 100%, M2 = 0):**  
   Em todas as 4 dimensões (`idhm_geral`, `renda`, `educacao` e `longevidade`) e ao longo dos 16 períodos históricos disponíveis (1991, 2000, 2010 e 2012 a 2024), todas as 27 UFs apresentaram valores numéricos válidos dentro da escala de 0 a 1, totalizando **432 registros válidos por dimensão** (**1.728 registros no total**).
2. **Proteção Automática contra Degradação de Cobertura (B-04):**  
   Para impedir que uploads administrativos futuros introduzam dados incompletos (M2 ≥ 1) ou corrompidos, a regra de validação atômica foi automatizada em `tratar_csv()` e no serviço de importação: planilhas com siglas ausentes, valores fora de domínio ou linhas corrompidas sofrem *rollback* integral, preservando **M1 = 100%** na base ativa.
3. **Preservação de Valores Ausentes (`RN-02`):**  
   Mesmo em cenários de teste com períodos sem coleta (`valor = None`), os testes unitários (`test_salvar_indicadores_converte_valor_ausente` e `test_valor_ausente_e_preservado_e_zero_nao_vira_ausente`) comprovaram que lacunas permanecem como `null`, nunca distorcendo comparações estaduais com zeros artificiais.
