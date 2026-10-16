# Sprint 3 — Ambiente e Back-end Base

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 07/10/2026 a 13/10/2026 |
| Objetivo | Estabelecer a estrutura inicial do ambiente de desenvolvimento e do back-end do Brasil Hub. |
| Resultado | Parcialmente alcançado |
| Issues planejadas | 8 |

## 2. Planejamento e resultados

A Sprint 3 teve como objetivo preparar a base técnica do Brasil Hub, incluindo o ambiente de desenvolvimento, a estrutura do projeto, a persistência dos dados e os primeiros componentes de back-end e front-end.

| Issue | Entrega planejada | Situação ao final da Sprint |
|---|---|---|
| S3-01 | Política de branches, Pull Requests e revisão de código | Concluída |
| S3-02 | Estrutura inicial do projeto e configurações | Concluída |
| S3-03 | Configuração do Docker e Docker Compose | Concluída |
| S3-04 | Estrutura inicial do front-end | Concluída |
| S3-05 | Banco SQLite e repositório de indicadores | Concluída |
| S3-06 | Leitura e tratamento de CSV com Pandas | Não concluída no período |
| S3-07 | API FastAPI para consulta de indicadores | Não concluída no período |
| S3-08 | Testes de integração e avaliação do requisito B-05 | Não concluída |

A situação definitiva das issues deve ser conferida no GitHub, considerando o estado registrado ao encerramento da Sprint e os critérios de aceitação.

## 3. Principais resultados

- Organização inicial do repositório e dos diretórios do projeto.
- Definição do fluxo de branches, Pull Requests e revisão de código.
- Preparação do ambiente de desenvolvimento com Docker e Docker Compose.
- Criação da estrutura inicial do front-end.
- Preparação da persistência de dados com SQLite.
- Início do processamento dos arquivos CSV e da implementação da API.

As atividades de processamento de dados, consulta pela API e testes integrados permaneceram como pendências para continuidade do desenvolvimento.

## 4. Métricas

| Métrica | Meta | Resultado preliminar |
|---|---|---|
| Conclusão das issues | > 90% | 62,5%, considerando 5 de 8 issues concluídas |
| Proporção de defeitos | < 10% | Nenhum defeito identificado |
| Saldo de débito técnico | saldo <= zero | saldo 3 issues não finalizadas |
| Desempenho B-05 | Resposta em até 3 segundos | Não avaliado |

**Observação:** o percentual de conclusão considera cinco issues concluídas entre as oito planejadas.

## 5. Pendências e próximos passos

| Pendência | Encaminhamento |
|---|---|
| S3-06 — Processamento de CSV | Finalizar e validar a ingestão dos dados. |
| S3-07 — API de consulta | Concluir e testar os endpoints necessários. |
| S3-08 — Testes de integração | Executar os testes após a conclusão das dependências. |
| Requisito B-05 | Medir e documentar o tempo de resposta das consultas. |
| Pull Requests | Verificar revisões e integração das alterações. |

As pendências devem ser acompanhadas na Sprint 4, respeitando as dependências entre as atividades.

## 6. Acompanhamento

Os registros diários da equipe estão disponíveis na seção de dailies:

- [Acessar as dailies da Sprint 3](dailies/dailies.md)

As issues e os Pull Requests correspondentes devem ser utilizados como referência para verificar o andamento e as evidências das entregas.

## 7. Conclusão

A Sprint 3 estabeleceu parte da estrutura técnica necessária ao desenvolvimento do Brasil Hub, incluindo a organização do repositório, o ambiente de desenvolvimento e a preparação da persistência dos dados.

Entretanto, o processamento dos arquivos CSV, a API de consulta e os testes integrados não foram concluídos dentro do período planejado. Essas pendências devem ser priorizadas na Sprint 4 para viabilizar a integração entre o back-end, o mapa interativo e os filtros da aplicação.