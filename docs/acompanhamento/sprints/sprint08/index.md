# Sprint 8 — Funcionalidades Complementares e Testes de Sistema

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 11/11/2026 a 17/11/2026 |
| **Objetivo** | Desenvolver as funcionalidades complementares COULD (B-07 Linha do Tempo e B-11 Exportação de Dados) e executar a suíte de testes de sistema integrados. |
| **Situação da Sprint** | Em andamento 🔄 |
| **Issues Planejadas** | 4 issues técnicas |
| **Taxa de Conclusão** | Em andamento (0% concluído no início do ciclo) |

---

## 2. Planejamento e Objetivos

Com 100% dos requisitos MUST e os requisitos SHOULD entregues e homologados na Sprint 7 para a Release 1, a Sprint 8 foi planejada para atender às funcionalidades complementares de prioridade **COULD** estabelecidas no Documento de Visão:

1. **B-07 (Linha do Tempo):** Permitir a navegação histórica e a observação da variação temporal dos índices socioeconômicos ao longo dos anos;
2. **B-11 (Exportação de Dados):** Disponibilizar o download dos dados filtrados em formatos abertos estruturados (CSV e JSON).

Além disso, o ciclo inclui a execução dos casos de teste de sistema formais **TC-11** e **TC-12** e testes de regressão de ponta a ponta.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **S8-01** | B-07 | Preparar endpoints e regras analíticas de evolução temporal | Back-end | César Augusto e Eduardo Brito | Em andamento 🔄 |
| **S8-02** | B-07 | Implementar componente interativo de Linha do Tempo na UI | Front-end | Josef Wojtyla e Felipe George | Em andamento 🔄 |
| **S8-03** | B-11 | Implementar serviço de geração de downloads nos formatos CSV e JSON | Back-end | Paulo Eduardo e Fabiana Reis | Em andamento 🔄 |
| **S8-04** | B-11 | Implementar botões e fluxo de exportação de dados na interface | Front-end | Lucas Nery e Ágatha Natasha | Em andamento 🔄 |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado Parcial | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **Em acompanhamento** | Acompanhamento diário realizado por meio do GitHub Projects e das Dailies no WhatsApp. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0 reportados) | Nenhum bug impeditivo aberto nas branches de trabalho. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: 0** | Sprint iniciada sem débitos herdados (Sprint 7 encerrou com 100% de débitos quitados). |

---

## 5. Testes Implementados e Garantia da Qualidade

O ciclo tem como foco a validação dos requisitos complementares por meio de novos testes automatizados e roteiros de sistema:

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_evolucao_temporal_ordem_cronologica` | Unitário | B-07 / TC-11 | `test_indicador_service.py` | Garante que os períodos apareçam estritamente ordenados no tempo. |
| `test_exportacao_csv_formato_e_campos` | Integração | B-11 / TC-12 | `test_funcionalidade_api.py` | Valida cabeçalhos e estrutura dos dados baixados em formato CSV. |
| `test_exportacao_json_estrutura` | Integração | B-11 / TC-12 | `test_funcionalidade_api.py` | Valida schema do payload JSON para download. |
| **TC-11 (Linha do Tempo)** | Sistema | B-07 | `mapa.html` / `timeline.js` | Navegação interativa na barra temporal e atualização dinâmica do mapa. |
| **TC-12 (Exportação de Dados)** | Sistema | B-11 | `mapa.html` / `export.js` | Disparo correto do download no navegador e validação de arquivo recebido. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Equipe iniciou o ciclo com base de código limpa, zero débitos herdados e 100 testes automatizados passando no CI. |
| **Dificuldades e impedimentos** | Necessidade de assegurar que dados faltantes em séries temporais antigas não quebrem a renderização da linha do tempo. |
| **Plano de ação / Próximos passos** | Finalizar os requisitos COULD, homologar TC-11 e TC-12 e preparar o encerramento do projeto para a Sprint 9. |

