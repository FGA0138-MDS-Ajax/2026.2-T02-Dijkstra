# Metodologia

O projeto adota um ciclo de vida Ágil, caracterizado por uma abordagem iterativa e incremental. A metodologia combina o framework Scrum para a gestão do projeto, estruturado em Sprints de 7 dias, e o Extreme Programming (XP) para as práticas de engenharia de software e qualidade técnica.

## Papéis e Responsabilidades

A equipe atua sob a premissa de propriedade coletiva do código, com os seguintes papéis principais definidos:

* **Desenvolvedor Back-end e Infraestrutura:** Responsáveis por construir a API (FastAPI), escrever scripts de extração e tratamento de dados (Pandas), gerenciar o banco SQLite e configurar o deploy (Vercel e GitHub Pages).
* **Desenvolvedor Front-end:** Focado em codificar a interface do dashboard, construir gráficos e mapas interativos (JavaScript/Leaflet) e realizar testes de unidade da interface.

Papeis esses que são frequentemente trocados de sprint para sprint. Pessoes saem do Back-end para o Front-End e do Front-end para Back-end. Garantindo que todos os membros do grupo consigam trabalhar em todas as áreas do projeto.

## Dinâmica de Trabalho: Âncoras e Rotativos

Para equilibrar a curva de aprendizado com a necessidade de entregas contínuas, a equipe utiliza a Programação em Pares (Pair Programming) associada ao modelo de **Rotatividade**. Os integrantes trocam suas frentes principais (Back-end ou Front-end) por duas Sprints para garantir

## Processos e Ritos

O fluxo de trabalho ao longo das Sprints de 7 dias segue estas etapas e eventos formais:

* **Daily Scrum:** Alinhamento diário realizado de forma assíncrona no grupo do WhatsApp. Cada integrante responde a um modelo estruturado relatando o que planejava fazer, o que concluiu, impedimentos e os próximos passos/o que planeja fazer.
* **Integração e Code Review:** Todo código produzido passa por inspeção cruzada via Pull Requests antes de ser integrado à branch `develop`. As alterações só são aceitas caso os testes unitários e de integração passem.
* **Sprint Review:** Reunião para inspecionar o incremento de software funcionando, validar os critérios de aceitação e apresentar a evolução.
* **Sprint Retrospective:** Sessão interna da equipe para inspecionar processos e ferramentas, identificando gargalos e definindo melhorias para o ciclo seguinte.

## Ferramentas de Gestão e Comunicação

* **Gestão e Rastreamento:** Utilização do GitHub Projects (Kanban) para a organização e o rastreamento oficial de issues, bugs e itens de débito técnico.
* **Comunicação:** WhatsApp para as atualizações diárias ; Discord ou Microsoft Teams para as reuniões semanais.
* **Documentação:** MkDocs hospedado no GitHub Pages, onde atas de reuniões, documentos de visão, arquitetura e relatórios de acompanhamento das Sprints são mantidos para rastreabilidade.