# Sprint 4 — Integração, Mapas e Filtros

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 14/10/2026 a 20/10/2026 |
| **Objetivo** | Quitar débitos técnicos da Sprint 3, implementar o mapa interativo, os filtros dinâmicos, a integração cliente-servidor e a esteira de CI. |
| **Situação da Sprint** | Concluída com sucesso |
| **Issues Planejadas** | 7 issues (4 novas + 3 herdadas) |
| **Taxa de Conclusão** | 100% |

---

## 2. Planejamento e Objetivos

A Sprint 4 concentrou-se na entrega do núcleo funcional de visualização do Brasil Hub: o **Mapa Interativo (B-01)**, os **Filtros Dinâmicos (B-02)** e a **API de Alto Desempenho (B-05)**.

Logo no início do ciclo, os débitos herdados da Sprint 3 (tratamento de dados com Pandas e API FastAPI) foram quitados, liberando o Front-end para construir a interface em Leaflet e integrar a comunicação REST via JSON. Além disso, a esteira de Integração Contínua (CI) foi implementada no GitHub Actions.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#16 (S3-06)** | B-04 | Finalizar leitura, validação e padronização dos CSVs com Pandas | Dados | Ágatha Natasha e Eduardo Brito | Concluída |
| **#14 (S3-07)** | B-05 | Finalizar API FastAPI para consulta de indicadores | Back-end | Ágatha Natasha e Eduardo Brito | Concluída |
| **#15 (S3-08)** | B-05 | Testes de integração e validação do requisito B-05 | Testes | Lucas Nery e Fabiana Reis | Concluída |
| **#27 (S4-01)** | B-01 | Implementar componente de mapa interativo com Leaflet | Front-end | César Augusto e Felipe George | Concluída |
| **#29 (S4-02)** | B-02 | Implementar componentes de filtros dinâmicos (UF e Dimensão) | Front-end | Lucas Nery e Fabiana Reis | Concluída |
| **#28 (S4-03)** | B-01, B-02 | Integrar mapa e filtros dinâmicos à API de indicadores | Fullstack | Josef Wojtyla e Paulo Eduardo | Concluída |
| **#30 (S4-04)** | — | Configurar execução automatizada de testes no GitHub Actions | DevOps | Josef Wojtyla e César Augusto | Concluída |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **100%** (7/7) | Meta atingida. Todas as 4 novas issues e os 3 débitos técnicos foram 100% entregues. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/7) | Meta atingida. Nenhum defeito crítico registrado na integração com a branch estável. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: -3** (0 - 3) | Meta atingida com excelência. Todas as pendências da Sprint 3 foram quitadas. |
| **Desempenho B-05** | Tempo de resposta da API nas consultas $\le$ 3 s | $\le$ 3 s | **Aprovado (< 0,5 s)** | Validado por medição automatizada com `test_b05_dados_corretos_e_desempenho`. |

---

## 5. Testes Implementados e Garantia da Qualidade

A suíte automatizada de testes foi formalmente criada nesta Sprint, totalizando **24 testes de back-end** validados no pipeline de CI, além de testes manuais de sistema:

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_coluna_de_ano` | Unitário | B-04 / TC-05 | `test_processamento_csv.py` | Valida extração e tipagem da coluna temporal no CSV. |
| `test_colunas_ausentes` | Unitário | B-04 / TC-05 | `test_processamento_csv.py` | Garante rejeição caso faltem colunas obrigatórias. |
| `test_arquivo_sem_dimensao` | Unitário | B-04 / TC-05 | `test_processamento_csv.py` | Valida domínio temático das dimensões. |
| `test_processamento_e_idh` | Unitário | B-04 | `test_processamento_csv.py` | Valida cálculos e normalização do índice. |
| `test_sigla_ou_estado_vazios` | Unitário | B-04 | `test_processamento_csv.py` | Valida integridade territorial dos dados. |
| `test_codigo_uf` | Unitário | B-04 | `test_processamento_csv.py` | Valida conformidade com códigos IBGE (11 a 53). |
| `test_b05_dados_corretos_e_desempenho` | Integração | B-05 / TC-06 | `test_funcionalidade_api.py` | Mede tempo de resposta da API ($\le$ 3s). |
| `test_sucesso_busca_indicadores_via_http` | Integração | B-02 / TC-02 | `test_funcionalidade_api.py` | Valida contrato HTTP da consulta de filtros. |
| `test_validacao_estado_minusculo_rejeitado` | Integração | B-02 / TC-02 | `test_funcionalidade_api.py` | Rejeita siglas fora do padrão em caixa alta. |
| `test_b05_parametros_invalidos_retornam_422` | Integração | B-05 | `test_funcionalidade_api.py` | Retorno rápido sem onerar o processador. |
| `test_b05_filtros_validos` | Integração | B-02, B-05 | `test_funcionalidade_api.py` | Consulta com combinações válidas de filtros. |
| `test_b05_consulta_sem_resultados` | Integração | B-02 | `test_funcionalidade_api.py` | Retorno controlado (200 com lista vazia). |
| `test_validacao_dimensao_invalida_ou_vazia` | Integração | B-02 / TC-02 | `test_funcionalidade_api.py` | Bloqueio de dimensões inexistentes. |
| `test_validacao_periodo_limites_e_tipos` | Integração | B-02 / TC-02 | `test_funcionalidade_api.py` | Valida limites de anos e tipos numéricos. |
| `test_health` | Integração | — | `test_funcionalidade_api.py` | Disponibilidade do serviço da API. |
| `test_falha_operacional_do_banco_retorna_503` | Integração | B-05 | `test_funcionalidade_api.py` | Resiliência contra indisponibilidade de banco. |
| `test_falha_operacional_e_traduzida_e_registrada` | Unitário | — | `test_indicador_service.py` | Logging estruturado de erros internos. |
| **TI-01 a TI-04 (Evidências de Sistema)** | Sistema | B-01 / TC-03 | `mapa.html` / `docs/assets/testes/S4-03/` | Validação visual da pintura de UFs e painel de detalhes no navegador. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Quitação ágil dos débitos técnicos da Sprint 3 e integração fluida entre Leaflet e FastAPI via chamadas assíncronas. |
| **Dificuldades e impedimentos** | Ajuste fino das coordenadas geoespaciais e sincronização entre os seletores de filtros e a camada do mapa. |
| **Plano de ação / Próximos passos** | Iniciar o ciclo de segurança na Sprint 5, com foco na autenticação de administradores (B-09) e upload seguro de arquivos (B-04). |
