# Sprint 4 — Integração e Funcionalidades Principais (mapas e filtros)

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 14/10/2026 a 20/10/2026 |
| Objetivo | Finalizar as pendências técnicas da Sprint 3 e avançar na implementação do mapa interativo, dos filtros dinâmicos e da integração com a API. |
| Resultado | Totalmente alcançado |
| Issues planejadas | 7 |

## 2. Planejamento e resultados

A Sprint 4 buscou disponibilizar os componentes necessários para que o visitante consulte os indicadores socioeconômicos do Brasil Hub por meio do mapa interativo e dos filtros. Todas as pendências de processamento de dados herdadas da sprint anterior foram quitadas, e a integração completa entre Front-end e Back-end foi realizada com sucesso.

| Issue | Entrega planejada | Situação ao final da Sprint |
|---|---|---|
| S3-06 | Finalizar a ingestão, validação e padronização dos arquivos CSV | Concluída |
| S3-07 | Finalizar a API FastAPI para consulta de indicadores | Concluída |
| S3-08 | Executar testes de integração e avaliar o requisito B-05 | Concluída |
| S4-01 | Implementar o mapa interativo com Leaflet | Concluída |
| S4-02 | Implementar os filtros dinâmicos | Concluída |
| S4-03 | Integrar o mapa e os filtros à API | Concluída |
| S4-04 | Configurar a execução automatizada dos testes com GitHub Actions | Concluída |

A situação definitiva das issues, os históricos de commits e as revisões cruzadas podem ser conferidas no repositório do projeto no GitHub.

## 3. Principais resultados

- Quitação total do débito técnico herdado, com a finalização do tratamento de CSV (Pandas) e estabilização da API (FastAPI).
- Implementação visual e funcional do mapa interativo utilizando a biblioteca Leaflet, contemplando a separação por estados, recortes temporais (anos) e popups informativos.
- Prototipação e implementação da interface de filtros dinâmicos.
- Integração completa e funcional de comunicação REST entre o Front-end (mapa/filtros) e o Back-end (API), permitindo o tráfego correto dos dados socioeconômicos em JSON.
- Implementação bem-sucedida do fluxo de Integração Contínua (CI) via GitHub Actions, automatizando a execução de testes.
- **Nota de Gerenciamento:** A equipe optou por não realizar reuniões síncronas de planejamento, revisão ou retrospectiva para esta sprint. Todo o alinhamento, integração e resolução de dependências técnicas foram conduzidos de forma estritamente assíncrona por meio das Dailies no WhatsApp, otimizando o tempo da equipe durante a semana de avaliações acadêmicas.

## 4. Métricas

| Métrica | Meta | Resultado final |
|---|---|---|
| Conclusão das issues | > 90% | 100% (7 de 7 issues concluídas) |
| Proporção de defeitos | < 10% | Nenhum defeito crítico ou impeditivo na branch principal |
| Saldo de débito técnico | saldo <= zero | Saldo zerado (todas as 3 pendências da Sprint 3 foram concluídas) |
| Desempenho B-05 | Resposta em até 3 segundos | Avaliado e validado com sucesso na integração |

## 5. Pendências e próximos passos

| Pendência | Encaminhamento |
|---|---|
| Nenhuma pendência técnica | O escopo planejado para a Sprint 4 foi 100% atendido. |
| Planejamento da Sprint 5 | O Scrum Master e a Product Owner devem estruturar o Backlog da próxima sprint e distribuir as novas issues no Kanban. |

Como não restaram débitos técnicos, a equipe está liberada para focar na expansão de novas funcionalidades (ex: ferramentas de comparação, visualização de gráficos ou melhorias na área administrativa) no início do próximo ciclo.

## 6. Acompanhamento

Os registros diários assíncronos da equipe estão disponíveis na seção de dailies:

- [Acessar as dailies da Sprint 4](dailies/dailies.md)

As issues e os Pull Requests correspondentes devem ser utilizados como referência para verificar o andamento detalhado, as discussões de *Code Review* e as evidências das entregas.

## 7. Conclusão

A Sprint 4 foi um sucesso absoluto, atingindo 100% de conclusão do escopo planejado. O Squad Dijkstra conseguiu absorver e quitar o débito técnico da Sprint 3 enquanto implementava o núcleo de valor do Brasil Hub: o mapa interativo integrado à API e alimentado por um banco de dados tratado. 

A configuração do fluxo de CI no GitHub Actions coroa a maturidade técnica alcançada pelo grupo nesta etapa. A capacidade da equipe de entregar código complexo de forma integrada, coordenando-se exclusivamente por Dailies assíncronas durante uma semana de avaliações da disciplina, demonstra excelente autogestão e consolida uma base robusta para as próximas Sprints.