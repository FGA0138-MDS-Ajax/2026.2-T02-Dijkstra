# Sprint 9 — Estabilização, Testes Finais e Preparação da Apresentação

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 18/11/2026 a 24/11/2026 |
| **Objetivo** | Executar testes finais de regressão, assegurar débito técnico zero, consolidar a documentação no GitHub Pages e preparar a apresentação final de MDS. |
| **Situação da Sprint** | Planejada ⏳ |
| **Issues Planejadas** | 4 issues de fechamento |
| **Taxa de Conclusão** | Planejada (início em 18/11/2026) |

---

## 2. Planejamento e Objetivos

A Sprint 9 encerra o ciclo de desenvolvimento do Brasil Hub na disciplina de Métodos de Desenvolvimento de Software. O foco central não é a abertura de novos requisitos, mas sim a **estabilização absoluta da plataforma**, a realização de testes de regressão de ponta a ponta, a consolidação da documentação técnica e o ensaio da apresentação final.

Todas as duplas atuarão de forma coordenada para garantir que o software entregue na branch `main` atenda a 100% dos critérios de aceitação, sem débitos técnicos residuais e com a esteira de CI validando a integridade da aplicação.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **S9-01** | B-01 a B-11 | Execução da suíte completa de regressão e auditoria de segurança | Qualidade | Josef Wojtyla e Paulo Eduardo | Planejada ⏳ |
| **S9-02** | — | Refatoração preventiva, verificação de linters (PEP 8 / ESLint) e Docker | Infra / Back | Ágatha Natasha e César Augusto | Planejada ⏳ |
| **S9-03** | — | Revisão editorial e consolidação da documentação no GitHub Pages | Docs | Fabiana Reis e Felipe George | Planejada ⏳ |
| **S9-04** | — | Elaboração do material visual, roteiro e ensaio da apresentação final | Apresentação | Lucas Nery e Eduardo Brito | Planejada ⏳ |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Planejado para o Fechamento | Análise Esperada |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **Meta: 100%** (4/4) | Conclusão rigorosa de todas as tarefas de finalização do produto. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **Meta: 0%** | Resolução imediata de qualquer inconsistência encontrada nos testes finais. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Meta: Saldo $\le$ 0** | Encerramento formal do semestre acadêmico com débito técnico zerado. |

---

## 5. Testes Implementados e Garantia da Qualidade

A garantia da qualidade na Sprint 9 concentra-se na verificação de regressão total em ambiente homologado:

| Tipo de Verificação | Nível | Escopo Coberto | Procedimento de Homologação |
|---|:---:|:---:|---|
| **Regressão Automatizada** | Unitário e Integração | B-01 a B-11 | Execução completa da suíte Pytest no GitHub Actions com banco relacional limpo e seed inicial. |
| **Auditoria de Segurança** | Integração | B-09 / TC-08 | Verificação de proteção de rotas restritas e garantia de hashing `bcrypt` sem vazamento de segredos. |
| **Homologação Cross-Browser** | Sistema | B-08 / TC-07 | Teste de fumaça (*Smoke Test*) nos navegadores Chrome, Firefox e Edge em desktop e celular (360 px). |
| **Demonstração Integrada** | Sistema | TC-01 a TC-12 | Simulação completa do roteiro da apresentação final da disciplina. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Planejamento de um ciclo inteiramente dedicado à qualidade técnica, estabilização e preparação da equipe. |
| **Dificuldades e impedimentos** | Coordenação da agenda final da equipe em semana de encerramento do semestre na UnB. |
| **Plano de ação / Próximos passos** | Realizar o ensaio geral da apresentação, consolidar a tag final `v1.0.0` / `R3` na branch `main` e defender o projeto. |

