# Sprint 2 — Documento de Arquitetura

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 30/09/2026 a 06/10/2026 |
| **Objetivo** | Definir a estrutura técnica, componentes e visões do Brasil Hub (Documento de Arquitetura). |
| **Situação da Sprint** | Concluída com sucesso ✅ |
| **Issues Planejadas** | 8 issues documentais |
| **Taxa de Conclusão** | 100% |

---

## 2. Planejamento e Objetivos

A Sprint 2 foi dedicada à elaboração do **Documento de Arquitetura v1.0**, transformando os requisitos do Documento de Visão em uma proposta concreta de organização de software. 

A equipe adotou o estilo **Cliente-Servidor em Três Camadas (Three-Tier)**, dividindo o sistema em Apresentação (Leaflet), Aplicação (FastAPI/Pandas) e Persistência (SQLite). As responsabilidades foram distribuídas entre os pares para modelagem dos diagramas UML essenciais (Casos de Uso, Atividades, Pacotes, Classes, Componentes e Implantação).

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#1 (S2-ARQ-01)** | — | Textos de fundação, justificativa em camadas e metas | Arquitetura | Josef Wojtyla | Concluída |
| **#2 (S2-ARQ-02)** | — | Diagrama Arquitetural Genérico (Figura 1) | Arquitetura | Lucas Nery e Paulo Eduardo | Concluída |
| **#3 (S2-ARQ-03)** | B-01, B-02 | Diagrama de Casos de Uso (Figura 2) | Visão de Uso | Felipe George | Concluída |
| **#4 (S2-ARQ-04)** | B-04, B-09 | Diagrama de Atividades do Administrador (Figura 3) | Visão de Uso | Fabiana Reis | Concluída |
| **#5 (S2-ARQ-05)** | — | Diagrama de Pacotes e módulos lógicos (Figura 4) | Visão Lógica | Ágatha Natasha | Concluída |
| **#6 (S2-ARQ-06)** | — | Diagrama de Classes e modelo de dados (Figura 6) | Estrutural | César Augusto | Concluída |
| **#7 (S2-ARQ-07)** | — | Diagrama de Componentes de execução (Figura 5) | Estrutural | César Augusto | Concluída |
| **#8 (S2-ARQ-08)** | B-08, B-09 | Diagrama de Implantação e restrições (Figura 7) | Infraestrutura | Eduardo Brito | Concluída |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **100%** (8/8) | Meta atingida. Todos os diagramas e seções técnicas foram integrados. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/8) | Meta atingida. Nenhuma inconformidade impeditiva identificada na revisão cruzada. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: 0** (0 - 0) | Meta atingida. Nenhuma pendência técnica transferida para a Sprint 3. |

---

## 5. Testes Implementados e Garantia da Qualidade

Por se tratar de uma Sprint exclusivamente para documentação, não houve testagem dos requisitos ainda.

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Divisão modular de diagramas entre duplas com papéis bem definidos e conformidade com a UML. |
| **Dificuldades e impedimentos** | Alinhamento sobre a representação da persistência e contratos de interface entre front-end e back-end. |
| **Plano de ação / Próximos passos** | Iniciar a Sprint 3 configurando o ambiente Docker e criando as bases executáveis de código do Front-end e Back-end. |
