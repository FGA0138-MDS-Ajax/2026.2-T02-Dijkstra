# Sprint 5 — Segurança e Área Administrativa

## 1. Identificação

| Informação | Descrição |
|---|---|
| **Período** | 21/10/2026 a 27/10/2026 |
| **Objetivo** | Implementar a segurança da plataforma, controle de acesso administrativo e upload seguro de arquivos CSV. |
| **Situação da Sprint** | Parcialmente alcançada |
| **Issues Planejadas** | 5 issues técnicas |
| **Taxa de Conclusão** | 60% |

---

## 2. Planejamento e Objetivos

A Sprint 5 concentrou-se nos requisitos de segurança e manutenção da plataforma: **B-09 (Segurança de Credenciais)** e **B-04 (Gestão e Upload de Dados pelo Administrador)**.

O objetivo foi implementar o mecanismo de hash de senhas (`bcrypt`), proteger endpoints administrativos e criar o pipeline de recepção e validação de novos arquivos CSV. A camada de Back-end e persistência foi finalizada com ampla cobertura de testes, porém a interface gráfica administrativa e sua validação de ponta a ponta atrasaram devido ao período de avaliações acadêmicas e foram transferidas para a Sprint 6.

---

## 3. Issues Planejadas e Situação Final

| Issue | Requisito | Entrega Planejada | Área | Responsáveis | Situação |
|---|:---:|---|:---:|---|:---:|
| **#40 (S5-01)** | — | Validar persistência e concorrência no ambiente de implantação | Infra / Back | Ágatha Natasha e Felipe George | Concluída |
| **#41 (S5-02)** | B-09 | Implementar autenticação do administrador e hash de senhas | Back-end | Lucas Nery e Josef Wojtyla | Concluída |
| **#42 (S5-03)** | B-04 | Implementar endpoint protegido para upload de CSV | Back-end | César Augusto e Paulo Eduardo | Concluída |
| **#43 (S5-04)** | B-04 | Implementar interface administrativa para login e upload | Front-end | Fabiana Reis e Eduardo Brito | Pendente |
| **#44 (S5-05)** | B-04, B-09 | Validar o fluxo administrativo integrado e documentação | Testes / Docs | Josef Wojtyla | Pendente |

---

## 4. Métricas da Sprint

| Métrica | Definição / Fórmula (GQM) | Meta | Resultado da Sprint | Análise do Resultado |
|---|---|:---:|:---:|---|
| **M1: Conclusão de Issues** | $\frac{\text{Issues Concluídas}}{\text{Issues Planejadas}} \times 100$ | > 90% | **60%** (3/5) | Meta não atingida. Bloqueios no Front-end administrativo impediram a conclusão integral. |
| **M2: Proporção de Defeitos** | $\frac{\text{Bugs Reportados}}{\text{Issues Entregues}} \times 100$ | < 10% | **0%** (0/3) | Meta atingida. O código de segurança e endpoints integrado não apresentou defeitos em produção. |
| **M3: Saldo de Débito Técnico** | $\text{Novos Débitos} - \text{Débitos Resolvidos}$ | $\le$ 0 | **Saldo: +2** (2 - 0) | Meta não atingida. 2 issues (S5-04 e S5-05) foram carregadas para a Sprint 6. |

---

## 5. Testes Implementados e Garantia da Qualidade

Foram adicionados **23 novos testes automatizados** focados em segurança, controle de acesso e resiliência na ingestão de dados:

| Teste / Evidência | Nível | Requisito / Caso | Função / Arquivo Responsável | Objetivo da Validação |
|---|:---:|:---:|---|---|
| `test_autenticacao_sucesso` | Unitário | B-09 / TC-08 | `test_auth_service.py` | Valida autenticação com hash `bcrypt` e salt dinâmico. |
| `test_autenticacao_senha_incorreta` | Unitário | B-09 / TC-08 | `test_auth_service.py` | Bloqueia login com senha divergente. |
| `test_autenticacao_usuario_inexistente` | Unitário | B-09 | `test_auth_service.py` | Rejeita usuários não cadastrados na base. |
| `test_login_com_credenciais_validas` | Integração | B-09 | `test_funcionalidade_api.py` | Retorno de token de sessão via endpoint `/api/auth/login`. |
| `test_login_com_credenciais_invalidas` | Integração | B-09 | `test_funcionalidade_api.py` | Retorno de status HTTP 401 Unauthorized. |
| `test_rota_protegida_sem_autenticacao` | Integração | B-09 | `test_funcionalidade_api.py` | Impede acesso a endpoints administrativos sem token. |
| `test_salvar_indicadores_converte_valor_ausente` | Unitário | B-04 / RN-02 | `test_indicador_repository.py` | Assegura que valores ausentes não virem zero. |
| `test_entrada_maliciosa_nao_interpolada` | Unitário | B-09 | `test_indicador_repository.py` | Proteção estrita contra injeção de SQL. |
| `test_upload_valido_retorna_sucesso` | Integração | B-04 / TC-05 | `test_upload_indicadores.py` | Valida ingestão bem-sucedida de CSV oficial via multipart. |
| `test_upload_sem_autenticacao_retorna_401` | Integração | B-04, B-09 | `test_upload_indicadores.py` | Bloqueia envio de arquivos por usuários não autenticados. |
| `test_upload_com_senha_errada_retorna_401` | Integração | B-04, B-09 | `test_upload_indicadores.py` | Valida integridade do cabeçalho de autorização. |
| `test_linha_invalida_nao_grava_linhas_validas` | Integração | B-04 / RN-05 | `test_upload_indicadores.py` | Valida transacionalidade atômica (All-or-Nothing). |
| `test_csv_vazio_e_rejeitado` | Integração | B-04 | `test_upload_indicadores.py` | Rejeita arquivos vazios com status controlado. |
| `test_csv_com_dimensao_desconhecida_e_rejeitado` | Integração | B-04 / RN-03 | `test_upload_indicadores.py` | Rejeita dimensões fora de renda, educação ou longevidade. |
| `test_erros_nao_expoem_detalhes_internos` | Integração | B-09 | `test_upload_indicadores.py` | Previne vazamento de traces ou detalhes de infraestrutura. |
| `test_reenvio_do_mesmo_arquivo_nao_duplica` | Integração | B-04 | `test_upload_indicadores.py` | Idempotência da atualização da base. |

---

## 6. Retrospectiva, Dificuldades e Aprendizados

| Aspecto | Análise da Sprint |
|---|---|
| **O que funcionou bem** | Robustez na segurança da API: hashing seguro com bcrypt, proteção de rotas e testes exaustivos de upload. |
| **Dificuldades e impedimentos** | Concorrência de avaliações acadêmicas e dependência entre a liberação da API e a construção das telas administrativas. |
| **Plano de ação / Próximos passos** | Manter as duplas originais responsáveis por S5-04 e S5-05 na Sprint 6 para quitar as pendências sem perda de contexto. |
