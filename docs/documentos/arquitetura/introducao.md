# 1. Introdução

## 1.1 Propósito

Este documento descreve a arquitetura do sistema Brasil Hub, desenvolvido na disciplina de Métodos de Desenvolvimento de Software (MDS), no segundo semestre de 2026. Seu propósito é apresentar, de forma técnica e estruturada, as principais decisões arquiteturais adotadas pela equipe, os componentes que constituem o sistema, suas responsabilidades, as interfaces de comunicação e a infraestrutura necessária para sua execução.

O documento tem como finalidade orientar o desenvolvimento, a integração e a manutenção do software, fornecendo uma referência comum para os integrantes da equipe, bem como para professores, monitores e demais interessados na solução.

São apresentados o estilo arquitetural adotado, a organização lógica dos módulos, a estrutura dos componentes, as metas e restrições arquiteturais, as visões do sistema e o ambiente de implantação.

## 1.2 Escopo

O escopo detalhado do produto está definido no Documento de Visão do Produto e do Projeto. Em termos arquiteturais, o Brasil Hub compreende uma plataforma web interativa para centralização, tratamento e visualização de dados socioeconômicos brasileiros, com foco em informações estaduais relacionadas às dimensões de renda, educação e longevidade.

O sistema é composto por uma interface web acessível a visitantes e administradores, uma API responsável pelo processamento das requisições e regras da aplicação, módulos destinados à validação e ao tratamento dos dados e uma camada de persistência.

O visitante pode consultar os indicadores, aplicar filtros, utilizar os recursos de acessibilidade e visualizar os dados por meio de mapas e demais recursos de visualização previstos no backlog.

O administrador possui as funcionalidades do visitante e, adicionalmente, acesso autenticado à área administrativa para envio de arquivos CSV e atualização da base de dados.

As funcionalidades arquiteturalmente relevantes correspondem aos requisitos classificados como MUST no Documento de Visão, incluindo:

- Mapa interativo;
- Filtros dinâmicos;
- Acessibilidade;
- Administração dos dados;
- Desempenho;
- Compatibilidade;
- Segurança.

As funcionalidades classificadas como SHOULD e COULD serão incorporadas conforme a priorização e a capacidade de desenvolvimento estabelecidas para as Sprints.