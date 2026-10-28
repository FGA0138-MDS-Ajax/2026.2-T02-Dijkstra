# Sprint 5 — Segurança e Área Administrativa

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 21/10/2026 a 27/10/2026 |
| Objetivo | Aprimorar a segurança do Brasil Hub e avançar no desenvolvimento da área administrativa, contemplando o controle de acesso, a proteção de credenciais e as funcionalidades de gerenciamento da plataforma. |
| Resultado | Sprint encerrada com 3 das 5 issues concluídas e 2 atividades mantidas como pendências para a Sprint 6. |
| Issues planejadas | 5 |
| Percentual de conclusão das issues | 60% |

## 2. Planejamento e resultados

A Sprint 5 teve como objetivo ampliar a segurança do Brasil Hub e desenvolver funcionalidades voltadas à administração da plataforma. Após a implementação do núcleo de consulta aos indicadores socioeconômicos, incluindo o mapa interativo, os filtros dinâmicos e a integração com a API, esta etapa concentrou os esforços nos mecanismos de proteção do sistema e nos recursos de acesso administrativo.

As atividades planejadas envolveram a validação da persistência dos dados no ambiente de implantação, a implementação da autenticação do administrador e da proteção de senhas, o desenvolvimento de um endpoint protegido para envio de arquivos CSV e a construção da interface administrativa correspondente.

O acompanhamento das entregas ocorreu por meio das issues do GitHub, dos Pull Requests e dos registros diários individuais da equipe. Ao final do período, três das cinco issues planejadas foram concluídas, enquanto duas permaneceram pendentes e precisaram ser encaminhadas para a Sprint 6.

| Issue | Entrega planejada | Situação ao final da Sprint |
|---|---|---|
| S5-01 | Validar a persistência dos dados no ambiente de implantação. | Finalizada. |
| S5-02 | Implementar autenticação do administrador e hash de senhas (B-09). | Finalizada. |
| S5-03 | Implementar endpoint protegido para upload de CSV (B-04). | Finalizada. |
| S5-04 | Implementar interface administrativa para login e upload de CSV (B-04). | Não finalizada no prazo. Encaminhada para a Sprint 6 como débito técnico. |
| S5-05 | Validar o fluxo administrativo e atualizar a documentação da Sprint 5. | Não finalizada integralmente no período. A documentação e as atividades de validação pendentes deverão ser concluídas na Sprint 6. |

**Observação:** as situações apresentadas devem corresponder ao estado final das issues no GitHub. A conclusão de uma implementação, a abertura de um Pull Request e a integração do código são etapas distintas e devem ser consideradas separadamente no registro das entregas.

## 3. Principais resultados

Ao longo da Sprint 5, a equipe avançou na infraestrutura e nos mecanismos de segurança necessários para viabilizar o acesso administrativo ao Brasil Hub.

Entre os principais resultados registrados, destacam-se:

- Validação da persistência dos dados no ambiente de implantação.
- Implementação da autenticação do administrador e do mecanismo de armazenamento de senhas por hash.
- Implementação de um endpoint protegido para o envio de arquivos CSV.
- Realização de testes relacionados às funcionalidades desenvolvidas e produção de evidências para as atividades testadas.
- Abertura e acompanhamento de Pull Requests para revisão e integração das alterações.
- Atualização da documentação do projeto no GitHub Pages, incluindo a disponibilização dos Documentos de Visão e de Arquitetura.
- Preparação do backlog da Sprint 6, com a definição de novas atividades e o encaminhamento das pendências.

Apesar desses avanços, a interface administrativa não foi concluída dentro do período previsto. Além disso, a validação integral do fluxo administrativo e a consolidação da documentação da Sprint 5 permaneceram como atividades pendentes.

Assim, embora os componentes iniciais necessários à administração tenham avançado, ainda é necessário concluir e validar o fluxo integrado para que as funcionalidades administrativas estejam disponíveis de maneira consistente.

## 4. Métricas

As métricas a seguir permitem avaliar o cumprimento do planejamento e registrar os resultados obtidos durante a Sprint 5.

| Métrica | Meta | Resultado final |
|---|---|---|
| Conclusão das issues | Superior a 90% | 3 de 5 issues concluídas, correspondendo a 60%. A meta não foi atingida. |
| Proporção de defeitos | Inferior a 10% | Não foi consolidado um indicador quantitativo suficiente para determinar a proporção de defeitos da Sprint. |
| Segurança das credenciais | Armazenar senhas de forma segura, sem texto puro. | Foi registrada a implementação do mecanismo de hash de senhas e a existência de testes em `tests/test_auth-service.py`. A validação definitiva deve considerar os resultados dos testes e a implementação integrada. |
| Controle de acesso | Permitir o acesso às funcionalidades administrativas somente a usuários autorizados. | O endpoint protegido para upload de CSV foi implementado, mas a interface administrativa e a validação integral do fluxo permaneceram pendentes. |
| Testes das funcionalidades | Executar os testes previstos para as entregas da Sprint. | Foram realizados testes para as funcionalidades trabalhadas, com resultados registrados. A cobertura integral do fluxo administrativo permaneceu pendente. |
| Entregas integradas | Integrar e revisar as alterações previstas antes do encerramento da Sprint. | Houve avanços em Pull Requests e integração de código, mas nem todas as atividades planejadas foram concluídas no prazo. |

### 4.1. Análise das métricas

O percentual de conclusão das issues foi de 60%, considerando três entregas finalizadas entre as cinco planejadas. Esse resultado ficou 30 pontos percentuais abaixo da meta de conclusão superior a 90%.

O resultado evidencia uma diferença significativa entre o planejamento inicial e o volume de entregas efetivamente concluídas. Embora tenham ocorrido avanços relevantes na segurança e na infraestrutura, as pendências relacionadas à interface administrativa e à validação final impediram o cumprimento integral do escopo previsto.

A proporção de defeitos não foi calculada, pois não há um levantamento consolidado que permita relacionar os defeitos identificados ao total de itens avaliados. Por esse motivo, não seria adequado registrar o resultado como zero defeitos apenas pela ausência de ocorrências contabilizadas.

Em relação à segurança das credenciais, foi registrada a implementação do armazenamento de senhas por hash, acompanhada de testes. A conclusão dessa métrica depende da confirmação dos resultados dos testes e da verificação da implementação integrada.

## 5. Pendências e próximos passos

| Pendência | Encaminhamento |
|---|---|
| Interface administrativa (S5-04) | Retomar a implementação na Sprint 6, preservando os responsáveis originais e verificando as dependências necessárias para concluir o login e o envio de arquivos CSV. |
| Validação do fluxo administrativo (S5-05) | Concluir a validação integrada das funcionalidades administrativas e registrar os resultados obtidos. |
| Documentação da Sprint 5 | Consolidar o planejamento, as entregas realizadas, as métricas, as pendências e os aprendizados da sprint no GitHub Pages. |
| Revisão e integração de código | Verificar a situação dos Pull Requests, concluir as revisões necessárias e garantir que as alterações sejam integradas corretamente. |
| Testes das funcionalidades | Executar os testes pendentes, corrigir eventuais falhas e registrar evidências da validação. |
| Gestão das dependências | Identificar antecipadamente as issues que bloqueiam outras atividades e acompanhar sua conclusão para reduzir períodos de espera. |
| Organização da Sprint 6 | Distribuir as novas atividades entre os pares definidos, mantendo os responsáveis originais pelas pendências transferidas da Sprint 5. |

As atividades transferidas para a Sprint 6 deverão ser identificadas como débitos técnicos no backlog, com seus respectivos responsáveis e critérios de aceitação preservados. A mudança de sprint não representa a conclusão das entregas nem elimina a necessidade de acompanhar os bloqueios existentes.

## 6. Acompanhamento

Os registros diários assíncronos da equipe estão disponíveis na seção de dailies:

- [Acessar as dailies da Sprint 5](dailies/dailies.md)

As issues e os Pull Requests do GitHub devem ser utilizados como referência para acompanhar o andamento detalhado das atividades, as discussões de **Code Review**, as correções realizadas e as evidências das entregas.

Os registros diários também permitem compreender os fatores que influenciaram o andamento da sprint, incluindo atividades concluídas, dificuldades encontradas, dependências entre tarefas e mudanças no planejamento individual.

A documentação da Sprint 5 deve permanecer vinculada ao estado real do repositório. Dessa forma, alterações em issues, Pull Requests e débitos técnicos deverão ser refletidas nos registros sempre que necessário.

## 7. Retrospectiva e conclusão

A Sprint 5 direcionou o desenvolvimento do Brasil Hub para duas frentes importantes: o fortalecimento da segurança da aplicação e a evolução da área administrativa. As entregas realizadas contribuíram para estabelecer mecanismos de autenticação, proteger credenciais e viabilizar operações administrativas por meio de um endpoint protegido.

Entretanto, a sprint foi encerrada com três das cinco issues concluídas, correspondendo a 60% de execução do planejamento. O resultado ficou abaixo da meta superior a 90% e evidenciou dificuldades na organização e na coordenação das atividades.

Um dos principais problemas observados foi a dependência entre as issues. A implementação de determinadas funcionalidades precisava ser concluída antes que outras atividades pudessem começar ou avançar. Quando essas entregas atrasaram, parte do trabalho dos demais integrantes também ficou bloqueada, reduzindo o tempo disponível para implementação, testes e revisão de código.

Os registros diários também indicaram dificuldades relacionadas à disponibilidade dos integrantes. A Sprint ocorreu em um período com outras demandas acadêmicas e atividades externas, que concorreram com o tempo dedicado ao projeto. Esses fatores ajudam a contextualizar os atrasos, mas também reforçam a importância de considerar a disponibilidade real da equipe ao definir o escopo e os prazos de cada sprint.

Outro ponto de atenção foi a concentração de atividades pendentes próximo ao encerramento do ciclo. Atrasos na conclusão de dependências, somados ao tempo necessário para testes, resolução de conflitos, abertura de Pull Requests e revisões, dificultaram a finalização de todas as entregas previstas.

### 7.1. Aprendizados para a Sprint 6

A experiência da Sprint 5 permite identificar algumas melhorias para o processo de desenvolvimento:

- **Mapear dependências durante o planejamento:** identificar quais issues precisam ser concluídas antes que outras possam avançar e estabelecer uma ordem de execução coerente.
- **Acompanhar bloqueios com maior frequência:** quando uma atividade impedir o avanço de outra, comunicar o impedimento e definir um encaminhamento, evitando que o bloqueio permaneça sem resolução.
- **Considerar a disponibilidade dos integrantes:** distribuir as atividades de acordo com o tempo efetivamente disponível, levando em conta outras demandas acadêmicas e externas.
- **Iniciar testes durante o desenvolvimento:** evitar que a validação fique concentrada nos últimos dias da sprint.
- **Antecipar revisões e integrações:** abrir Pull Requests assim que as alterações estiverem prontas para revisão, reservando tempo para corrigir problemas e resolver conflitos.
- **Definir prioridades e critérios de conclusão claros:** distinguir implementação iniciada, implementação concluída, testes realizados, revisão aprovada e código integrado.
- **Controlar débitos técnicos:** transferir atividades incompletas para a sprint seguinte com responsáveis, critérios de aceitação e dependências claramente registrados.

Em síntese, a Sprint 5 produziu avanços importantes na segurança e na infraestrutura do Brasil Hub, mas não atingiu a meta de conclusão estabelecida. O principal aprendizado foi a necessidade de melhorar a coordenação entre as atividades, antecipar o tratamento de dependências e reservar tempo suficiente para testes e integração.

A Sprint 6 deverá dar continuidade às pendências da Sprint 5 sem perder de vista os novos objetivos planejados. Para isso, será importante equilibrar a execução das novas issues com a conclusão dos débitos técnicos, mantendo a rastreabilidade das entregas e aprimorando o acompanhamento do trabalho da equipe.

---

**Projeto:** Brasil Hub

**Equipe:** Dijkstra

**Disciplina:** Métodos de Desenvolvimento de Software (MDS)

**Professor:** Ricardo Ajax