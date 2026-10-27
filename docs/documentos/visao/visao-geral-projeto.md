# 2. Visão Geral do Projeto

## 2.1. Ciclo de vida do projeto de desenvolvimento de software

O projeto adotará um ciclo de vida Ágil, caracterizado por uma abordagem Iterativa e Incremental. Essa escolha justifica-se pela natureza do produto: o tratamento de dados sociais e a construção de visualizações gráficas exigem entregas contínuas de valor (incrementos) para que o cliente possa validar a precisão e usabilidade do dashboard.

A metodologia será suportada por dois métodos principais:

- **Scrum:** Utilizado como framework de gestão, organizando o projeto em ciclos curtos (Sprints), com papéis definidos e eventos estruturados (Planning, Daily, Review e Retrospective) para garantir transparência, inspeção e adaptação. Utilizaremos um timebox de 7 dias para as Sprints semanais. (SCHWABER; SUTHERLAND, 2020)
- **Extreme Programming (XP):** Utilizado para as práticas de engenharia de software e qualidade técnica, aplicando a programação em pares, o refatoramento contínuo, integração contínua e foco no projeto simples. (BECK; ANDRES, 2004)

- **Metodologia:** Ágil, iterativa e incremental.
- **Processo:** Scrum, com Sprints de 7 dias.
- **Procedimentos:** Planning, Daily, Review, Retrospective, code review e programação em pares.
- **Métodos:** Scrum, XP e GQM.
- **Ferramentas:** GitHub Projects, GitHub, Pytest, Jest, MkDocs, WhatsApp e Discord.

## 2.2. Organização do Projeto

A Tabela 1 apresenta os integrantes e suas funções; os âncoras são os integrantes com maior familiaridade na área, e os rotativos passam por diferentes frentes ao longo do projeto. Os âncoras também farão rotação de responsabilidades.

A Tabela 4 define a organização estrutural da equipe e suas funções primárias.

**Tabela 4 — Organização do Projeto.**

| Papel | Atribuições | Participantes |
|---|---|---|
| **Scrum Master** | Garantir a correta aplicação do framework Scrum e práticas XP, facilitar as cerimônias (Planning, Daily, Retrospective) e remover impedimentos que bloqueiem a equipe. | Josef |
| **Product Owner** | Maximizar o valor do produto, detalhar e priorizar o Backlog, e validar os critérios de aceitação das entregas junto aos stakeholders. | Fabiana |
| **Desenvolvedor Back-end e Infraestrutura (Dados)** | Construir a API (FastAPI), escrever scripts de extração e tratamento de dados (Pandas), gerenciar o banco SQLite e configurar o deploy (Vercel/GitHub Pages). | Ágatha e Josef (âncoras iniciais), Eduardo e Paulo (rotativos) |
| **Desenvolvedor Front-end** | Codificar a interface (dashboard), gráficos e mapas interativos (JavaScript/Leaflet) e realizar testes de unidade UI. | César e Fabiana (âncoras iniciais), Lucas e Felipe (rotativos) |
| **Cliente** | Validar as entregas, priorizar funcionalidades e esclarecer regras de negócio. | Professor e Monitor da disciplina |

*Fonte: Elaborado por Josef Wojtyla.*

Alinhado aos princípios do Extreme Programming (XP), a equipe adotará a Propriedade Coletiva do Código e a Programação em Pares com rotação contínua. Os âncoras permanecem duas Sprints em sua frente e depois migram, conforme a rotação descrita na Seção 3, de modo que a coluna Participantes indica a alocação inicial e após seguirá de forma que todos passem por todas as responsabilidades.

## 2.3. Planejamento das Fases e/ou Iterações do Projeto

O roteiro de entregas de valor do projeto está estruturado em ciclos incrementais de sete dias. O planejamento macro inicial está detalhado na Tabela 5.

**Tabela 5 — Planejamento do projeto.**

| Sprint | Produto (entrega) | Data de início | Data de fim | Entregáveis | Responsáveis | (%) de conclusão |
|---|---|---|---|---|---|---:|
| Sprint 1 | Definição do Produto | 23/09/2026 | 29/09/2026 | Documento de Visão | Todos | 100 |
| Sprint 2 | Definição de Arquitetura | 30/09/2026 | 06/10/2026 | Documento de Arquitetura (inclui a definição do banco de dados) | Todos | 0 |
| Sprint 3 | Ambiente e Backend Base | 07/10/2026 | 13/10/2026 | Ambiente configurado (repositório, estrutura front/back), leitura e tratamento dos CSV do IBGE com Pandas, API de consulta e desempenho dos dados (B-05) | Todos | 0 |
| Sprint 4 | Mapa e Filtros | 14/10/2026 | 20/10/2026 | Mapa interativo e filtros dinâmicos (B-01, B-02) | Todos | 0 |
| Sprint 5 | Segurança e Administração | 21/10/2026 | 27/10/2026 | Segurança e área do administrador (B-09, B-04) | Todos | 0 |
| Sprint 6 | Acessibilidade e Compatibilidade | 28/10/2026 | 03/11/2026 | Acessibilidade e compatibilidade entre dispositivos e navegadores (B-03, B-08) | Todos | 0 |
| Sprint 7 | Comparação e Visualização | 04/11/2026 | 10/11/2026 | Comparação lado a lado e gráficos e tabelas (B-06, B-10) | Todos | 0 |
| Sprint 8 | Funcionalidades Complementares | 11/11/2026 | 17/11/2026 | Exportação de dados (B-11), linha do tempo (B-07) e testes de sistema | Todos | 0 |
| Sprint 9 | Estabilização e Apresentação | 18/11/2026 | 24/11/2026 | Débito técnico, correção de defeitos, testes finais e preparação da apresentação | Todos | 0 |

*Fonte: Elaborado por Josef Wojtyla.*

A distribuição dos requisitos entre as Sprints considerou: (i) o calendário da disciplina, com as Sprints 1 e 2 dedicadas à documentação de visão e arquitetura e a Sprint 9 reservada à estabilização, aos testes finais e à preparação da apresentação; (ii) a prioridade MoSCoW (MUST, SHOULD e COULD) da Tabela 13, concluindo todos os requisitos MUST até a Sprint 6; e (iii) as dependências técnicas entre os requisitos, como a base do backend antes do mapa e dos filtros e o login antes do upload de dados. Os requisitos classificados como COULD (B-07 e B-11) são desenvolvidos apenas se houver tempo e recurso extra, conforme a Tabela 10. Por se tratar de um planejamento macro, sem estimativa formal de esforço, o escopo de cada Sprint é confirmado na Sprint Planning e revisado conforme os critérios da Tabela 9.

## 2.4. Matriz de Comunicação

O plano de comunicação estabelece as diretrizes para a troca de informações ao longo do ciclo de vida do software. O objetivo principal é assegurar que o acompanhamento das atividades em andamento, o monitoramento de riscos e as decisões tomadas sejam discutidos nos canais adequados e devidamente documentados, garantindo a rastreabilidade através de atas e relatórios de situação.

Para as interações diárias, compartilhar informações rápidas e resolver impedimentos, a equipe utilizará um grupo no WhatsApp com um modelo de Daily a ser entregue por mensagem todos os dias, de forma direta e resumida, seguindo o padrão: (i) o que planeja fazer hoje; (ii) o que consegui fazer e como fiz; (iii) o que não consegui fazer e o porquê; e (iv) o que pretendo fazer amanhã.

As reuniões semanais da equipe serão realizadas via Microsoft Teams ou Discord. Para garantir a rastreabilidade e o histórico do projeto, todas as decisões e definições destas reuniões serão formalizadas em uma Ata de Reunião.

Para garantir o alinhamento e a transparência exigidos pelo Scrum, a Tabela 6 estabelece a matriz de comunicação da equipe.

**Tabela 6 — Matriz de comunicação.**

| Descrição | Área/Envolvidos | Periodicidade | Produtos gerados |
|---|---|---|---|
| Acompanhamento das Atividades em Andamento | Equipe do Projeto | Diário | Atualização no quadro de tarefas (Kanban) |
| Acompanhamento dos Riscos, Compromissos, Ações Pendentes, Indicadores | Equipe do Projeto | Semanal | Ata de Reunião e Relatório de Situação do Projeto |
| Comunicação sobre a situação do Projeto | Equipe do Projeto, Professor e/ou Monitor | Semanal | Ata de Reunião e Relatório de Situação do Projeto |

*Fonte: Elaborado por Eduardo de Sousa.*

## 2.5. Gerenciamento de Riscos

O gerenciamento de riscos tem como objetivo identificar, avaliar e planejar respostas para eventos incertos que possam impactar negativamente o andamento do projeto. Para facilitar o monitoramento e a rápida aplicação dos planos de mitigação e contingência, os riscos deste projeto foram classificados em duas categorias principais:

- **Internos:** aqueles que estão dentro do alcance da equipe, como os integrantes, tecnologia desenvolvida pela equipe, escolhas feitas pela equipe etc.
- **Externos:** aqueles que não estão dentro do alcance da equipe, como uma tecnologia externa utilizada que faz parte do funcionamento do projeto.

O grau de exposição combina a probabilidade de o risco ocorrer com o seu impacto no projeto (Baixo, Médio ou Alto). Os riscos são revisados semanalmente, conforme a Tabela 6. O gerenciamento de riscos foi dividido em riscos internos e externos. A Tabela 7 mapeia os riscos internos ao grupo, enquanto a Tabela 8 descreve os riscos externos atrelados a integrações.

**Tabela 7 — Riscos internos.**

| Descrição | Grau de exposição | Plano de mitigação | Plano de contingência |
|---|---|---|---|
| Alguma dupla não pôde/esqueceu de concluir sua responsabilidade definida | Alto | Manter a comunicação entre a equipe em dia, fazendo o acompanhamento das atividades em andamento. | Se a dupla responsável não conseguir realizar, outra dupla fica responsável ou é definida outra dupla para finalizar. |
| Algum integrante trancou a matéria | Alto | Manter a comunicação entre a equipe em dia, acompanhando a situação de cada integrante da equipe. | Redistribuir as responsabilidades pendentes e reavaliar o escopo das próximas Sprints. |
| A equipe não sabe utilizar alguma tecnologia escolhida | Alto | Realizar spikes (atividade de pesquisa, teste ou prototipagem). | Mudar para outra tecnologia que a equipe tenha conhecimento e domínio. |
| Ocorreu problema no banco de dados | Alto | Fazer um backup dos dados semanalmente. | Restaurar o banco de dados a partir do último backup salvo. |
| Sobrecarga da equipe em períodos de provas e entregas de outras disciplinas | Médio | Planejar a capacidade de cada Sprint conforme o calendário acadêmico. | Reduzir o escopo da Sprint e repriorizar o Backlog. |
| Perda de conhecimento na troca de frente entre âncoras e rotativos | Médio | Documentar decisões técnicas e fazer code review entre as duplas. | Manter o âncora anterior por mais uma Sprint para transferir conhecimento. |

*Fonte: Elaborado por Eduardo de Sousa.*

**Tabela 8 — Riscos externos.**

| Descrição | Grau de exposição | Plano de mitigação | Plano de contingência |
|---|---|---|---|
| Alguma API de dados utilizada pela equipe saiu do ar | Baixo | Salvar os dados obtidos em um banco de dados próprio e, se possível, integrar mais de uma API do mesmo tipo. | Utilizar dados obtidos pelas APIs secundárias e salvos no banco de dados. |
| Indisponibilidade da hospedagem (Vercel ou GitHub Pages) | Baixo | Manter o código versionado e o deploy documentado. | Migrar para outra plataforma. |
| Mudança no formato dos arquivos das fontes oficiais (IBGE) | Médio | Validar o formato na importação e guardar cópia dos arquivos originais. | Ajustar o script de tratamento e reprocessar a base. |
| Bases de fontes diferentes com unidades, anos ou territórios incompatíveis | Médio | Padronizar indicadores e ano de referência no tratamento. | Restringir a comparação aos indicadores compatíveis e sinalizar a limitação na interface. |

*Fonte: Elaborado por Eduardo de Sousa.*

## 2.6. Critérios de Replanejamento

O replanejamento do projeto deve ser aplicado conforme a necessidade da equipe, tendo como principal fonte de impacto os riscos documentados na seção anterior. Os critérios definidos identificam os cenários de contingência que afetam diretamente a capacidade produtiva da equipe ou a viabilidade técnica do produto.

Caso os planos de mitigação falhem, a Tabela 9 estabelece os gatilhos e critérios que obrigarão a equipe a realizar um replanejamento emergencial das Sprints.

**Tabela 9 — Critérios de replanejamento.**

| Critério | Descrição |
|---|---|
| Redução da equipe | Se um ou mais integrantes trancarem a matéria, o escopo do projeto deverá ser obrigatoriamente replanejado no ciclo seguinte, adequando o projeto à nova capacidade produtiva. |
| Indisponibilidade de fontes externas | Caso não seja possível extrair dados das fontes e APIs escolhidas pela equipe, será necessário buscar novas fontes de dados. |
| Baixa conclusão das Sprints | Se a métrica da Tabela 15 ficar abaixo de 90% em duas Sprints seguidas, o escopo das próximas Sprints deve ser reduzido ou repriorizado. |

*Fonte: Elaborado por Eduardo de Sousa.*
