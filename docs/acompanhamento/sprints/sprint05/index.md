# Sprint 5 — Segurança e Área Administrativa

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 21/10/2026 a 27/10/2026 |
| Objetivo | Aprimorar a segurança do Brasil Hub e avançar no desenvolvimento da área administrativa, contemplando o controle de acesso, a proteção de credenciais e as funcionalidades de gerenciamento da plataforma. |
| Resultado | Finalizada com 2 débito técnico |
| Issues planejadas | 5 |

## 2. Planejamento e resultados

A Sprint 5 tem como objetivo ampliar a segurança do Brasil Hub e desenvolver funcionalidades voltadas à administração da plataforma. Após a implementação do núcleo de consulta aos indicadores socioeconômicos, incluindo o mapa interativo, os filtros dinâmicos e a integração com a API, esta etapa direciona os esforços para os mecanismos de proteção do sistema e para os recursos de acesso administrativo.

As atividades estão concentradas na implementação ou no aprimoramento da autenticação, na restrição de acesso às funcionalidades administrativas e no desenvolvimento dos recursos necessários para o gerenciamento dos dados da plataforma.

O acompanhamento das entregas será realizado por meio das issues do GitHub, dos Pull Requests e dos registros diários da equipe. 

| Issue | Entrega planejada | Situação ao final da Sprint |
|---|---|---|
| S5-01 | Validar a persistência dos dados no ambiente de implantação | Finalizado |
| S5-02 | Implementar autenticação do administrador e hash de senhas `(B-09)`
 | Finalizado |
| S5-03 | Implementar endpoint protegido para upload de CSV `(B-04)` | Finalizado |
| S5-04 | Implementar interface administrativa para login e upload de CSV `(B-04)` | Não finalizada na Sprint 5. Realocada para Sprint 6 como débito técnico |
| S5-05 | Validar o fluxo administrativo e atualizar a documentação da Sprint 5 | Parte da documentação iniciada na sprint 5. Será finalizada na Sprint 6 |

**Observação:** os identificadores das issues e as entregas definitivas deverão ser ajustados de acordo com o backlog oficial da Sprint 5 no GitHub. As situações apresentadas são provisórias e não representam a conclusão efetiva das atividades.

## 3. Principais resultados

Como a Sprint 5 ainda está em andamento, os resultados abaixo representam os objetivos de entrega que deverão ser registrados e atualizados ao longo do ciclo.

- Implementação ou aprimoramento dos mecanismos de autenticação da plataforma.
- Restrição do acesso às funcionalidades administrativas a usuários autorizados.
- Desenvolvimento da área administrativa do Brasil Hub.
- Avanço na implementação dos recursos de gerenciamento dos dados, incluindo o envio de arquivos CSV, caso previsto no backlog definitivo.
- Aplicação de práticas adequadas de proteção de credenciais, incluindo o armazenamento de senhas por meio de hash.
- Desenvolvimento e execução de testes para verificar o comportamento das funcionalidades implementadas.
- Integração das alterações ao repositório por meio do fluxo de branches, Pull Requests e revisões de código adotado pela equipe.

## 4. Métricas

As métricas abaixo serão utilizadas para avaliar o cumprimento do planejamento e acompanhar a qualidade das entregas. Os resultados finais deverão ser preenchidos ao término da Sprint.

| Métrica | Meta | Resultado final |
|---|---|---|
| Conclusão das issues | > 90% | 3 completas de 5 issues -> 60% de conclusão |
| Proporção de defeitos | < 10% | Nenhum defeito identificado |
| Segurança das credenciais | Senhas armazenadas de forma segura, sem texto puro | Credenciais estão criptogradas. Teste em `tests/test_auth-service.py`  |
| Controle de acesso | Funcionalidades administrativas acessíveis somente a usuários autorizados | Não finalizada. Será realocada na sprint 6 |
| Testes das funcionalidades | Executar os testes previstos para as entregas da Sprint | Testes feitos para o que foi concluído no prazo |

## 5. Pendências e próximos passos

| Pendência | Encaminhamento |
|---|---|
| Confirmar o backlog definitivo da Sprint 5 | Identificar as issues planejadas, seus responsáveis e os critérios de aceitação. |
| Concluir as funcionalidades de segurança | Implementar e validar os mecanismos de autenticação, proteção de credenciais e controle de acesso previstos no escopo. |
| Avançar no desenvolvimento da área administrativa | Implementar e integrar os recursos administrativos definidos nas issues. |
| Validar as funcionalidades desenvolvidas | Executar os testes previstos, corrigir falhas identificadas e registrar as evidências. |
| Finalizar as revisões de código | Submeter as alterações a Pull Requests e realizar as revisões antes da integração. |
| Consolidar os resultados da Sprint | Atualizar as situações das issues, calcular as métricas e registrar as entregas efetivamente concluídas. |

## 6. Acompanhamento

Os registros diários assíncronos da equipe estão disponíveis na seção de dailies:

- [Acessar as dailies da Sprint 5](dailies/dailies.md)

As issues e os Pull Requests correspondentes devem ser utilizados como referência para verificar o andamento detalhado das atividades, as discussões de *Code Review*, as correções realizadas e as evidências das entregas.

O acompanhamento deverá ser atualizado ao longo da Sprint, de modo que a documentação represente o trabalho efetivamente executado pela equipe.

## 7. Conclusão

A Sprint 5 direciona o desenvolvimento do Brasil Hub para duas frentes importantes: o fortalecimento da segurança da aplicação e a evolução da área administrativa. Essas frentes contribuem para proteger o acesso aos recursos restritos e preparar a plataforma para atividades de gerenciamento que exigem permissões específicas.

Nesta Sprint, faltou organização da equipe, pois as features que precisavam ser implementadas para prosseguir com outras funcionalidades atrasou todo o resto do trabalho. As evidências mostram que o percentual de conclusão das issues ficou em 60% (muito abaixo dos 90% esperado).  

Foi um momento de várias outras atividades acadêmicas e externas, tal como o período de eleitoral no Brasil, sendo essas uma das causas para o atraso das entregas.

---

**Projeto:** Brasil Hub  
**Equipe:** Dijkstra  
**Disciplina:** Métodos de Desenvolvimento de Software (MDS), Prof. Ajax.