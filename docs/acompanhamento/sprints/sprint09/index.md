# Sprint 9 — Estabilização, Testes Finais e Preparação da Apresentação

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 18/11/2026 a 24/11/2026 |
| **Objetivo** | Estabilizar o Brasil Hub, executar testes finais, corrigir defeitos, consolidar a documentação e preparar a apresentação final. |
| **Situação da Sprint** | Encerrada com pendências transferidas para a Sprint 10 |
| **Issues Planejadas** | 4 issues |
| **Taxa de Conclusão** | 71% (3/5) |

---

## 2. Planejamento e Objetivos

A Sprint 9 teve como foco a estabilização do Brasil Hub e a hospedagem para a entrega final da disciplina de Métodos de Desenvolvimento de Software.

As atividades envolveram a revisão técnica do projeto, a preparação da apresentação, a execução dos testes finais e a consolidação da documentação.

Das quatro issues planejadas, duas foram concluídas (**S9-02 e S9-04**). As atividades de testes e auditoria de segurança (**S9-01**) e de revisão e consolidação da documentação (**S9-03**) não foram finalizadas e foram transferidas para a Sprint 10. A (**S8-04**) ficou como débito técnico da sprint 8, mas foi finalizada nesta sprint 9.

Durante esse período, também foram atualizados os documentos principais do projeto, resultando no Documento de Visão versão 1.2 e no Documento de Arquitetura versão 3.0.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **S9-01** | B-01 a B-11 | Executar a suíte de regressão e realizar auditoria de segurança | Qualidade | Josef Wojtyla e Paulo Eduardo | Transferida para S10 |
| **S9-02** | — | Realizar refatoração preventiva, verificar padrões de código e configurações de Docker | Infra / Back-end | Ágatha Natasha e César Augusto | Concluída |
| **S9-03** | — | Realizar revisão editorial e consolidar a documentação no GitHub Pages | Documentação | Fabiana Reis e Felipe George | Transferida para S10 |
| **S9-04** | — | Elaborar material visual, roteiro e preparação da apresentação final | Apresentação | Lucas Abdalla e Eduardo Brito | Concluída |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | (Issues Concluídas ÷ Issues Planejadas) × 100 | > 90% | **50%** (2/4) | Meta não atingida. Duas issues foram concluídas e duas permaneceram pendentes para a Sprint 10. |
| **M2: Proporção de Defeitos** | (Bugs Reportados ÷ Issues Entregues) × 100 | < 10% | Não consolidado | Os defeitos ainda não eram registrados sistematicamente como issues com a label `bug`, impossibilitando uma medição histórica confiável. |
| **M3: Saldo de Débito Técnico** | Novos Débitos − Débitos Resolvidos | ≤ 0 | A verificar | Necessário conferir as issues classificadas como débito técnico durante a Sprint. |

---

## 5. Testes Implementados e Garantia da Qualidade

A Sprint 9 previa a execução de testes de regressão, verificações de segurança e homologação da interface em diferentes navegadores.

Entretanto, a issue S9-01 não foi concluída integralmente. Por isso, a validação final do roteiro de testes permaneceu como atividade da Sprint 10.

| Tipo de Verificação | Nível | Escopo Coberto | Situação ao Encerrar a Sprint |
|---|:---:|---|---|
| **Regressão Automatizada** | Unitário e Integração | Requisitos B-01 a B-11 | Pendente de conclusão e consolidação. |
| **Auditoria de Segurança** | Integração | B-09 / TC-08 | Pendente de conclusão e registro. |
| **Homologação Cross-Browser** | Sistema | B-08 / TC-07 | Pendente de consolidação das evidências. |
| **Demonstração Integrada** | Sistema | TC-01 a TC-12 | Validação final transferida para a Sprint 10. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Conclusão das atividades de revisão técnica e preparação da apresentação. Também houve atualização dos documentos principais, com a publicação das versões 1.2 da Visão e 3.0 da Arquitetura. |
| **Dificuldades e impedimentos** | A execução completa dos testes de regressão e a consolidação final da documentação não foram concluídas dentro do período planejado. |
| **Plano de ação / Próximos passos** | Transferir as issues S9-01 e S9-03 para a Sprint 10, finalizar o roteiro de testes, registrar os defeitos encontrados, consolidar a documentação e validar a versão final do sistema. |