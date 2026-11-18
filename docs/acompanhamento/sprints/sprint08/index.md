**# Sprint 8 — Linha do Tempo, Exportação de Dados e Qualidade**

**## 1. Identificação**

| Informação | Descrição |
|---|---|
| **Período** | 11/11/2026 a 17/11/2026 |
| **Objetivo** | Implementar a visualização da evolução temporal dos indicadores (B-07), a exportação de dados em CSV (B-11) e ampliar os testes automatizados e de sistema. |
| **Situação da Sprint** | Encerrada com uma atividade pendente |
| **Issues Planejadas** | 4 issues |
| **Taxa de Conclusão** | 75% |

---

**## 2. Planejamento e Objetivos**

A Sprint 8 teve como foco a implementação de funcionalidades complementares do Brasil Hub e o fortalecimento da qualidade do sistema.

Foram desenvolvidas a visualização da evolução temporal dos indicadores (**B-07**) e a exportação de dados em CSV (**B-11**), além da ampliação dos testes automatizados e de integração da API.

Das quatro issues planejadas, três foram concluídas e integradas à branch `developer`. A issue **S8-04 (#83)**, referente à execução dos testes de sistema pela interface e ao registro de evidências, permaneceu pendente e deverá ser acompanhada na Sprint 9.

---

**## 3. Issues Planejadas e Situação Final**

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | PR / Commit | Situação |
|---|:---:|---|:---:|---|---|:---:|
| **#80 (S8-01)** | B-07 | Implementar visualização da evolução temporal dos indicadores (linha do tempo) | Back-end / Front-end | Ágatha Natasha e Josef Wojtyla | PR #87 (`a09e311`) | Concluída |
| **#81 (S8-02)** | B-11 | Implementar exportação dos indicadores filtrados em formato CSV | Front-end | Fabiana Reis e César Augusto | PR #86 (`fbe3b5d`) | Concluída |
| **#82 (S8-03)** | Qualidade | Ampliar e revisar os testes automatizados e de integração da API | Back-end | Eduardo Brito e Paulo Eduardo | PR #85 (`1846655`) | Concluída |
| **#83 (S8-04)** | Qualidade | Executar testes de sistema pela interface e registrar evidências (TC-03, TC-04, TC-05, TC-07, TC-09 e TC-10) | Front-end | Lucas Abdalla e Felipe George | — | Pendente |

---

**## 4. Métricas da Sprint**

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | (Issues Concluídas ÷ Issues Planejadas) × 100 | > 90% | **75%** (3/4) | Meta não atingida. Três issues foram concluídas, enquanto a S8-04 permaneceu pendente. |
| **M2: Proporção de Defeitos** | (Bugs Reportados ÷ Issues Entregues) × 100 | < 10% | A confirmar | Verificar a quantidade de bugs registrados durante a Sprint antes de consolidar o resultado. |
| **M3: Saldo de Débito Técnico** | Novos Débitos − Débitos Resolvidos | ≤ 0 | A confirmar | Verificar os débitos técnicos registrados e resolvidos. A S8-04 pendente não representa automaticamente um débito técnico. |

---

**## 5. Testes Implementados e Garantia da Qualidade**

A Sprint 8 adicionou testes automatizados relacionados à linha do tempo, à segurança da senha administrativa e ao envio de arquivos CSV. Ao final do levantamento, o repositório contabilizava **108 funções de teste automatizado** (`def test_...`) no Pytest.

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_consultar_historico_ordena_periodos_e_preserva_nulos` | Unitário | B-07 / TC-11 | `test_indicador_service.py` | Garante a ordenação cronológica dos períodos e a preservação dos valores nulos. |
| `test_consultar_historico_sem_dados_retorna_serie_vazia` | Unitário | B-07 / TC-11 | `test_indicador_service.py` | Valida o retorno de série vazia quando não existem dados históricos. |
| `test_consultar_historico_estado_invalido` | Unitário | B-07 | `test_indicador_service.py` | Verifica a rejeição de siglas de estados inválidas. |
| `test_integracao_historico_sucesso` | Integração | B-07 / TC-11 | `test_funcionalidade_api.py` | Valida a resposta HTTP 200 e o contrato de dados da rota de histórico. |
| `test_integracao_historico_estado_invalido_retorna_442` | Integração | B-07 | `test_funcionalidade_api.py` | Verifica a rejeição de UF inválida na consulta histórica. |
| `test_senha_administrativa_nao_fica_legivel_no_banco` | Integração | B-09 / TC-08 | `test_funcionalidade_api.py` | Verifica se a senha administrativa não é armazenada em texto puro. |
| `test_upload_extensao_csv_maiuscula_deveria_ser_aceita` | Integração | B-04 / TC-05 | `test_funcionalidade_api.py` | Valida a aceitação de arquivos com extensão `.CSV` em letras maiúsculas. |
| **TC-11 (Evolução Temporal)** | Sistema | B-07 | `mapa.html` / `linha_tempo.js` / `grafico_linha.js` | Verificação da visualização do gráfico de linha, ordenação cronológica e tratamento de lacunas de dados (PR #87). |
| **TC-12 (Exportação CSV)** | Sistema | B-11 | `mapa.html` / `export.js` / `export_panel.js` | Verificação da exportação dos indicadores filtrados em arquivo CSV, incluindo estados, períodos e dimensões (PR #86). |

A execução e aprovação dos casos de sistema devem ser registradas mediante evidências correspondentes. Os testes de sistema previstos na S8-04 (TC-03, TC-04, TC-05, TC-07, TC-09 e TC-10) permaneceram pendentes.

---

**## 6. Retrospectiva, Dificuldades e Aprendizados**

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Conclusão e integração das funcionalidades de linha do tempo e exportação CSV, além da ampliação dos testes automatizados da API. A equipe também conseguiu concluir a inspeção do grupo Hamilton. |
| **Dificuldades e impedimentos** | Compromissos acadêmicos e atividades externas atrasaram o início de algumas issues. Além disso, a inspeção do Hamilton e as atualizações documentais exigiram tempo da equipe, reduzindo a disponibilidade para o desenvolvimento. Como resultado, a S8-04 não foi concluída integralmente. |
| **Plano de ação / Próximos passos** | Transferir o acompanhamento da issue S8-04 (#83) para a Sprint 9, concluir os testes de sistema pendentes e realizar a validação final das funcionalidades implementadas. |

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax