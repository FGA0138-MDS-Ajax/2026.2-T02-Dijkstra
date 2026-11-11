# Sprint 6 — Acessibilidade, Compatibilidade e Confiabilidade

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 28/10/2026 a 03/11/2026 |
| **Objetivo** | Quitar pendências da Sprint 5, implementar responsividade (B-08), avançar na acessibilidade (B-03) e ampliar a cobertura de testes. |
| **Situação da Sprint** | Concluída parcialmente |
| **Issues Consideradas** | 6 issues (4 novas + 2 herdadas) |
| **Taxa de Conclusão** | 83,3% (100% dos débitos quitados) |

---

## 2. Planejamento e Objetivos

A Sprint 6 teve como prioridade imediata zerar o débito técnico da Sprint 5, integrando a interface administrativa com o upload de arquivos CSV e a validação ponta a ponta.

Simultaneamente, foram abertas frentes de **Compatibilidade e Responsividade (B-08)** — adaptando a navegação para dispositivos móveis a partir de 360 px — e de **Confiabilidade da API**, adicionando dezenas de testes de casos de borda e tratamento de erros HTTP. A issue de acessibilidade teve avanços (modo noturno), mas foi transferida para a Sprint 7 para conclusão dos controles tipográficos e alto contraste.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#43 (S5-04)** | B-04 | Interface administrativa para login e upload de CSV | Front-end | Fabiana Reis e Eduardo Brito | Concluída |
| **#44 (S5-05)** | B-04, B-09 | Validar o fluxo administrativo e documentação no CI | Testes / Docs | Josef Wojtyla | Concluída |
| **#51 (S6-02)** | B-08 | Responsividade e compatibilidade mobile (a partir de 360px) | Front-end | Josef Wojtyla e Eduardo Brito | Concluída |
| **#52 (S6-03)** | — | Ampliar cobertura de testes automatizados da API | Back-end | Lucas Nery e César Augusto | Concluída |
| **#53 (S6-04)** | — | Revisar validação de parâmetros e tratamento de erros | Back-end | Fabiana Reis e Felipe George | Concluída |
| **#50 (S6-01)** | B-03 | Acessibilidade da interface (tamanho de fonte e alto contraste) | Front-end | Paulo Eduardo e Ágatha Natasha | Pendente |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Consideradas}} \times 100$ | > 90% | **83,3%** (5/6) | Meta quase atingida. 100% dos débitos da Sprint 5 foram eliminados e 3 de 4 novas issues foram entregues. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/5) | Meta atingida. O rigor no Code Review preveniu merge de código instável. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: -1** (1 - 2) | Meta atingida com sucesso. O volume de débito técnico da equipe diminuiu. |

---

## 5. Testes Implementados e Garantia da Qualidade

Foram adicionados **24 novos testes automatizados** no Back-end, elevando a suíte para **71 testes**, além de validações responsivas de sistema:

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_upload_extensao_csv_maiuscula_e_aceita` | Integração | B-04 | `test_upload_indicadores.py` | Aceitação de arquivos com extensão `.CSV`. |
| `test_csv_latin1_retorna_400_pedindo_utf8` | Integração | B-04 | `test_upload_indicadores.py` | Validação de encoding com mensagem amigável ao usuário. |
| `test_csv_com_colunas_a_mais_retorna_400` | Integração | B-04 | `test_upload_indicadores.py` | Rejeição controlada de schemas com colunas intrusas. |
| `test_csv_sem_nenhum_byte_retorna_400` | Integração | B-04 | `test_upload_indicadores.py` | Captura de `EmptyDataError` do Pandas. |
| `test_upload_csv_malformado_retorna_400` | Integração | B-04 | `test_funcionalidade_api.py` | Captura e sanitização de `ParserError`. |
| `test_upload_sem_arquivo_anexado_retorna_422` | Integração | B-04 | `test_funcionalidade_api.py` | Validação de payload multipart ausente. |
| `test_rota_inexistente_retorna_404` | Integração | — | `test_funcionalidade_api.py` | Resposta padronizada para rotas não mapeadas. |
| `test_metodo_http_nao_permitido` | Integração | — | `test_funcionalidade_api.py` | Tratamento do código HTTP 405 Method Not Allowed. |
| `test_cors_permitido_para_get` | Integração | — | `test_funcionalidade_api.py` | Validação de cabeçalhos de segurança CORS. |
| `test_login_com_campos_vazios_retorna_401` | Integração | B-09 | `test_funcionalidade_api.py` | Rejeição imediata de credenciais nulas. |
| `test_validacao_periodo_limites_e_tipos` | Integração | B-02 | `test_funcionalidade_api.py` | Rejeição de anos com tipagem inválida ou negativos. |
| `test_todas_as_dimensoes_validas_sao_aceitas` | Integração | B-02 / RN-03 | `test_funcionalidade_api.py` | Homologação estrita de renda, educação e longevidade. |
| `test_falha_na_persistencia_traduzida` | Unitário | — | `test_indicador_service.py` | Tratamento de erros do driver de banco. |
| **Validação Responsiva (PR #63)** | Sistema | B-08 / TC-07 | `style.css` / Navegadores | Homologação em resoluções mobile (`414x846`, `712x1138`) no Chrome, Firefox e Edge. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Quitação de 100% dos débitos da Sprint 5 e excelente maturidade do processo de Code Review nos Pull Requests. |
| **Dificuldades e impedimentos** | Conflitos pontuais de CSS no rodapé e necessidade de refinar seletores para não desalinhar a barra de acessibilidade. |
| **Plano de ação / Próximos passos** | Concluir imediatamente a issue S6-01 (#50) no início da Sprint 7 e focar nos requisitos SHOULD (B-06 e B-10) para a Release 1. |
