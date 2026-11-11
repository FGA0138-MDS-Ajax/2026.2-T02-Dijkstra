# Sprint 3 — Ambiente e Back-end Base

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 07/10/2026 a 13/10/2026 |
| **Objetivo** | Estabelecer a estrutura inicial do ambiente de desenvolvimento e do back-end do Brasil Hub. |
| **Situação da Sprint** | Parcialmente alcançada |
| **Issues Planejadas** | 8 issues técnicas |
| **Taxa de Conclusão** | 62,5% |

---

## 2. Planejamento e Objetivos

A Sprint 3 teve como meta estabelecer o alicerce técnico do projeto Brasil Hub: repositório padronizado, ambiente conteinerizado via Docker Compose, esqueleto do Front-end e módulos iniciais de persistência e ingestão de dados.

A equipe definiu a distribuição de tarefas entre 4 duplas de trabalho. Embora a infraestrutura base e a persistência tenham sido entregues, as tarefas de processamento de CSV e endpoints da API sofreram atrasos por dependências técnicas e foram transferidas para a Sprint 4.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#9 (S3-01)** | — | Política de branches, Pull Requests e revisão de código | Processo | Lucas Nery e Fabiana Reis | Concluída |
| **#10 (S3-02)** | — | Estrutura inicial do projeto e arquivos de configuração | Infra / DevOps | Ágatha Natasha e Eduardo Brito | Concluída |
| **#11 (S3-03)** | — | Configuração do Docker e Docker Compose | Infra / DevOps | Josef Wojtyla e Paulo Eduardo | Concluída |
| **#12 (S3-04)** | — | Estrutura inicial de diretórios e páginas do Front-end | Front-end | César Augusto e Felipe George | Concluída |
| **#13 (S3-05)** | — | Esquema de persistência e repositório de indicadores | Dados / Infra | Josef Wojtyla e Paulo Eduardo | Concluída |
| **#16 (S3-06)** | B-04 | Leitura, validação e tratamento de CSV com Pandas | Dados | Ágatha Natasha e Eduardo Brito | Pendente |
| **#14 (S3-07)** | B-05 | API FastAPI para consulta de indicadores | Back-end | Ágatha Natasha e Eduardo Brito | Pendente |
| **#15 (S3-08)** | B-05 | Testes de integração e avaliação do requisito B-05 | Testes | Lucas Nery e Fabiana Reis | Pendente |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **62,5%** (5/8) | Meta não atingida. Houve gargalo no tratamento de dados (Pandas) que bloqueou a API e os testes. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/5) | Meta atingida. O código de infraestrutura integrado não gerou bugs na branch principal. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: +3** (3 - 0) | Meta não atingida. 3 issues permaneceram incompletas e foram herdadas pela Sprint 4. |
| **Desempenho B-05** | Tempo de resposta da consulta $\le$ 3 s | $\le$ 3 s | **Não avaliado** | Dependência técnica de S3-07 e S3-08 não concluídas no ciclo. |

---

## 5. Testes Implementados e Garantia da Qualidade

Nesta Sprint foram estabelecidas as bases para a automação de testes unitários e de integração no Back-end:

| Teste / Validação | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| **Ambiente Conteinerizado** | Sistema | — | `docker-compose.yml` | Subida íntegra dos serviços locais sem dependência do SO do desenvolvedor. |
| **Persistência Inicial** | Unitário | — | `src/database/` | Inicialização de esquema tabular e operações básicas de conexão. |

*Nota: Os testes formais de integração da API (TC-01, TC-02 e TC-06) ficaram pendentes em S3-08 para finalização na Sprint 4.*

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Padronização bem-sucedida do repositório, branches, PRs e ambiente de desenvolvimento local via Docker. |
| **Dificuldades e impedimentos** | Curva de aprendizado no tratamento massivo de CSV com Pandas e configuração do Docker em ambientes Windows. |
| **Plano de ação / Próximos passos** | Priorizar imediatamente as 3 issues herdadas (S3-06, S3-07, S3-08) logo no primeiro dia da Sprint 4 para liberar o Front-end. |
