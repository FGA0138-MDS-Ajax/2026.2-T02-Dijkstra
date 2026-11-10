# 1. Introdução

## 1.1 Propósito

Este documento descreve a arquitetura do sistema Brasil Hub, desenvolvido na disciplina de Métodos de Desenvolvimento de Software (MDS), no segundo semestre de 2026, tendo como base os direcionadores definidos no Documento de Visão e Projeto v1.1 (GRUPO DIJKSTRA, 2026). Seu propósito é apresentar, de forma técnica e estruturada, as principais decisões arquiteturais adotadas pela equipe, os componentes que constituem o sistema, suas responsabilidades, as interfaces de comunicação e a infraestrutura necessária para sua execução.

O documento tem como finalidade orientar o desenvolvimento, a integração e a manutenção do software, fornecendo uma referência comum para os integrantes da equipe, bem como para professores, monitores e demais interessados na solução.

São apresentados o estilo arquitetural adotado, a organização lógica dos módulos, a estrutura dos componentes, as metas e restrições arquiteturais, as visões do sistema e o ambiente de implantação.

## 1.2 Escopo

O escopo detalhado do produto está definido no Documento de Visão e Projeto v1.1 (GRUPO DIJKSTRA, 2026), em especial nas Tabelas 10 a 13, que estabelecem o backlog de requisitos funcionais e não funcionais priorizados pelo método MoSCoW. Em termos arquiteturais, o Brasil Hub compreende uma plataforma web interativa para centralização, tratamento e visualização de dados socioeconômicos brasileiros, com foco em informações estaduais relacionadas às dimensões de renda, educação e longevidade.

O sistema é composto por uma interface web acessível a visitantes e administradores, uma API responsável pelo processamento das requisições e regras da aplicação, módulos destinados à validação e ao tratamento dos dados e uma camada de persistência estruturada.

O visitante pode consultar os indicadores, aplicar filtros, utilizar os recursos de acessibilidade e visualizar os dados por meio de mapas e recursos visuais complementares. O administrador possui todas as funcionalidades do visitante e, adicionalmente, acesso autenticado à área administrativa para envio de arquivos CSV e atualização da base de dados.

As funcionalidades e restrições arquiteturalmente relevantes correspondem diretamente aos requisitos classificados como **MUST** nas Tabelas 10 a 13 do Documento de Visão (GRUPO DIJKSTRA, 2026):

- **B-01 (Mapa Interativo do Brasil):** visualização espacial dos indicadores socioeconômicos por Unidade da Federação;
- **B-02 (Filtros Dinâmicos):** seleção e consulta combinada por estado, dimensão (renda, educação, longevidade) e período;
- **B-03 (Recursos de Acessibilidade):** conformidade de interface com suporte a redimensionamento de fontes, alto contraste e modo noturno;
- **B-04 (Administração e Upload de Dados):** upload de arquivos CSV pelo administrador, com validação de formato e tratamento prévio à persistência;
- **B-05 (Desempenho da API):** tempo de resposta das consultas filtradas em até 3 segundos em condições normais;
- **B-08 (Compatibilidade Multiplataforma):** suporte a telas com largura mínima de 360 pixels e compatibilidade com os principais navegadores de mercado (Chrome, Firefox e Edge);
- **B-09 (Segurança e Autenticação):** armazenamento seguro de credenciais administrativas exclusivamente com hash criptográfico e proteção de rotas restritas.

Adicionalmente, os requisitos classificados como **SHOULD** (Tabelas 10 e 11) orientam o desenho modular da solução para viabilizar sua extensão sem refatoração de infraestrutura:

- **B-06 (Comparação entre Estados):** contraste direto de indicadores entre duas unidades federativas;
- **B-10 (Tabelas e Gráficos Complementares):** apresentação dos indicadores em formatos tabulares e gráficos analíticos.

Por fim, os requisitos classificados como **COULD** (Tabelas 10 e 11) estabelecem funcionalidades suplementares:

- **B-07 (Linha do Tempo e Evolução Histórica):** acompanhamento temporal da variação dos índices;
- **B-11 (Exportação de Dados):** download dos dados filtrados em formatos abertos (CSV e JSON).
