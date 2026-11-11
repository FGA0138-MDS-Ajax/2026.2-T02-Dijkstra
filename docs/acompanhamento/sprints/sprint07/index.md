# Sprint 7 — Comparação, Visualização e Consolidação da Release 1

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 04/11/2026 a 10/11/2026 |
| **Objetivo** | Concluir o requisito MUST de acessibilidade (B-03), implementar a comparação entre estados (B-06), a visualização em gráficos e tabelas (B-10) e consolidar a Release 1. |
| **Situação da Sprint** | Concluída com sucesso |
| **Issues Planejadas** | 5 issues (4 novas + 1 herdada) |
| **Taxa de Conclusão** | 100% |

---

## 2. Planejamento e Objetivos

A Sprint 7 teve como foco central a conclusão de todos os requisitos planejados para a **Release 1** do Brasil Hub, antecipando as demonstrações do Ponto de Controle.

As atividades englobaram a finalização dos controles de acessibilidade herdados da Sprint 6 (**B-03**), a construção da funcionalidade de comparação direta entre dois estados (**B-06**) — dividida entre endpoint analítico no Back-end e componente visual no Front-end — e a implementação da visualização complementar de indicadores em gráficos de barras e tabelas dinâmicas (**B-10**). Todas as entregas foram integradas e validadas com sucesso.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#50 (S6-01)** | B-03 | Concluir controles de acessibilidade (tamanho de fonte e alto contraste) | Front-end | Paulo Eduardo e Ágatha Natasha | Concluída |
| **#65 (S7-01)** | B-06 | Implementar consulta e regras da API para comparação de dois estados | Back-end | César Augusto e Eduardo Brito | Concluída |
| **#66 (S7-02)** | B-06 | Implementar interface de comparação lado a lado entre duas UFs | Front-end | Josef Wojtyla e Felipe George | Concluída |
| **#67 (S7-03)** | B-10 | Preparar consulta da API para visualização em gráficos e tabelas | Back-end | Paulo Eduardo e Fabiana Reis | Concluída |
| **#68 (S7-04)** | B-10 | Implementar visualização dos indicadores em gráficos e tabelas na UI | Front-end | Lucas Nery e Ágatha Natasha | Concluída |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **100%** (5/5) | Meta atingida com excelência. Todas as 4 novas issues e o débito técnico foram entregues e mergeados. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/5) | Meta atingida. Nenhum bug impeditivo aberto após a integração das funcionalidades. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: -1** (0 - 1) | Meta atingida com perfeição. O débito de acessibilidade (S6-01) foi totalmente quitado e nenhum novo débito foi gerado. |

---

## 5. Testes Implementados e Garantia da Qualidade

A Sprint 7 adicionou **29 novos testes automatizados** no Back-end, atingindo a marca de **100 testes automatizados**, além de homologar 3 casos de teste de sistema na interface web:

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_comparacao_mesmo_ano_se_ano_b_nao_informado` | Unitário | B-06 / TC-09 | `test_indicador_service.py` | Preenchimento automático do ano base na comparação. |
| `test_comparacao_com_sucesso_anos_diferentes` | Unitário | B-06 / TC-09 | `test_indicador_service.py` | Valida cálculo comparativo entre anos distintos. |
| `test_sem_anos_com_mesmo_estado_nao_consulta` | Unitário | B-06 / RN-04 | `test_indicador_service.py` | Bloqueia comparação redundante da mesma UF no mesmo ano. |
| `test_valor_ausente_e_preservado_e_zero_nao_vira_ausente` | Unitário | B-06, B-10 / RN-02 | `test_indicador_service.py` | Garante integridade do dado nulo sem mascarar como zero. |
| `test_comparacao_sem_anos_encontra_mais_recente_comum` | Unitário | B-06 | `test_indicador_service.py` | Busca inteligente do ano mais recente compartilhado por ambas as UFs. |
| `test_validacoes_de_entrada_comparacao_rejeitada` | Unitário | B-06 | `test_indicador_service.py` | Rejeição de parâmetros malformados ou incompletos. |
| `test_consultar_organizacao_dos_indicadores` | Unitário | B-10 / TC-10 | `test_indicador_service.py` | Estruturação determinística para renderização de gráficos e tabelas. |
| `test_consultar_repassa_filtros_ao_repositorio` | Unitário | B-10 | `test_indicador_service.py` | Integridade do repasse de filtros de dimensão e ano. |
| `test_consultar_preservacao_de_valores_e_periodos` | Unitário | B-10 | `test_indicador_service.py` | Coerência de métricas para plotagem gráfica. |
| `test_integracao_comparar_estados_iguais_mesmo_ano` | Integração | B-06 / TC-09 | `test_funcionalidade_api.py` | Validação de regra de negócio no endpoint `/api/comparacao`. |
| `test_integracao_comparar_sem_ano_informado` | Integração | B-06 | `test_funcionalidade_api.py` | Resposta da rota de comparação com inferência de período. |
| `test_integracao_comparar_estado_invalido_url` | Integração | B-06 | `test_funcionalidade_api.py` | Validação de formato das siglas de UF na URL. |
| `test_integracao_consulta_estrutura_tabela_e_grafico` | Integração | B-10 / TC-10 | `test_funcionalidade_api.py` | Contrato de dados JSON para montagem do gráfico e da tabela. |
| `test_integracao_contrato_dados_para_tabela_e_grafico` | Integração | B-10 / TC-10 | `test_funcionalidade_api.py` | Validação estrita dos campos necessários para visualização. |
| `test_listar_inclui_ordenacao_consistente` | Unitário | B-10 | `test_indicador_repository.py` | Ordenação consistente de registros para a interface. |
| **TC-04 (Acessibilidade)** | Sistema | B-03 | `mapa.html` / `theme.js` | Homologação dos controles de fonte (`A+`/`A-`), modo escuro e alto contraste (PR #70, #71). |
| **TC-09 (Comparação de UFs)** | Sistema | B-06 | `mapa.html` / `comparacao.js` | Seleção de duas UFs, validação visual e contraste lado a lado (PR #76). |
| **TC-10 (Gráficos e Tabelas)** | Sistema | B-10 | `mapa.html` / `visualizacao.js` | Renderização dinâmica de gráfico de barras e tabela analítica sincronizada (PR #78, #79). |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Desempenho exemplar da equipe: 100% de conclusão das issues, quitação integral de débitos técnicos e entrega de todos os requisitos previstos para a Release 1. |
| **Dificuldades e impedimentos** | Alinhamento fino dos seletores de comparação para sincronizar a busca de anos comuns e layout responsivo de tabelas em telas menores. |
| **Plano de ação / Próximos passos** | Apresentar o sistema consolidado no Ponto de Controle 1 e iniciar a Sprint 8 com foco nos requisitos COULD (B-07 Linha do Tempo e B-11 Exportação). |
