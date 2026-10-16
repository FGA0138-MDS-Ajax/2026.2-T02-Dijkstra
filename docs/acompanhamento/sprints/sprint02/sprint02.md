# Sprint 2 — Documento de Arquitetura

## 1. Identificação

| Informação | Descrição |
|---|---|
| Período | 30/09/2026 a 06/10/2026 |
| Objetivo | Definir a estrutura técnica do Brasil Hub com base nos requisitos estabelecidos no Documento de Visão. |
| Entrega principal | Documento de Arquitetura |

## 2. Planejamento e resultados

A Sprint 2 foi dedicada à elaboração do Documento de Arquitetura, com o objetivo de transformar os requisitos do produto em uma proposta de organização técnica para o sistema.

O documento deveria descrever os componentes da aplicação, suas responsabilidades, as tecnologias previstas e a comunicação entre as camadas.

| Atividade | Resultado esperado |
|---|---|
| Definição da arquitetura geral | Descrever a organização dos componentes do sistema. |
| Definição das tecnologias | Registrar as tecnologias utilizadas no desenvolvimento. |
| Organização dos componentes | Estabelecer as responsabilidades do front-end, da API, dos serviços e da persistência. |
| Modelagem dos dados | Definir a estrutura inicial de armazenamento dos indicadores e dos dados administrativos. |
| Definição da comunicação | Especificar a comunicação entre a interface, a API e o banco de dados. |
| Documentação das decisões técnicas | Registrar as escolhas arquiteturais e sua relação com os requisitos. |

## 3. Principais decisões arquiteturais

A proposta técnica do Brasil Hub utiliza uma arquitetura cliente-servidor organizada em camadas.

| Componente | Responsabilidade | Tecnologias previstas |
|---|---|---|
| Front-end | Apresentar os indicadores, o mapa e os filtros ao visitante. | JavaScript e Leaflet |
| API | Receber as requisições e disponibilizar os dados para a interface. | Python e FastAPI |
| Serviços | Processar dados e executar as regras necessárias às consultas. | Python e Pandas |
| Persistência | Armazenar e disponibilizar os indicadores consultados pela aplicação. | SQLite |
| Entrada de dados | Permitir o processamento dos arquivos CSV utilizados na atualização dos indicadores. | Pandas |

A comunicação entre o front-end e a API ocorre por requisições HTTP, com utilização de JSON nas consultas e respostas. O envio de arquivos CSV utiliza o mecanismo adequado para transferência de arquivos.

## 4. Pendências e próximos passos

| Encaminhamento | Objetivo |
|---|---|
| Revisar a consistência do documento | Garantir que todas as seções estejam completas e coerentes com o Documento de Visão. |
| Detalhar as visões arquiteturais | Explicar a organização e o comportamento do sistema sob diferentes perspectivas. |
| Relacionar arquitetura e requisitos | Demonstrar como as decisões técnicas atendem aos requisitos do produto. |
| Iniciar a preparação do ambiente | Criar a base necessária para a implementação dos componentes. |

## 5. Conclusão

A Sprint 2 teve como foco a definição da estrutura técnica do Brasil Hub, estabelecendo uma proposta arquitetural baseada na separação entre interface, API, serviços e persistência.

O Documento de Arquitetura passou a orientar a organização do código e as decisões técnicas das etapas seguintes. A revisão e o detalhamento das seções arquiteturais também são importantes para garantir que o documento represente adequadamente a solução planejada.

As definições estabelecidas nesta Sprint serviram de referência para a Sprint 3, dedicada à configuração do ambiente de desenvolvimento e à construção da base técnica do sistema.