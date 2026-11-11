# Ata de Reunião nº 02 — 03/10/2026

## 1. Identificação

| Informação | Descrição |
|---|---|
| Data | 03/10/2026 |
| Horário | 19:00 |
| Modalidade | Online — Discord |

## 2. Participantes

1. Josef Wojtyla Barros
2. Fabiana Reis Souza
3. Eduardo De Sousa Brito
4. Felipe George Carvalho Dourado de Aragão
5. César Augusto Pereira Silva

### Ausentes

1. Lucas Abdalla Nery
2. Paulo Eduardo Fidelis Martins
3. Ágatha Natasha Ferreira da Silva Vieira

## 3. Tópicos da reunião

- Documento de Arquitetura.
- Organização do projeto.
- Escolha das tecnologias.
- Uso do GitHub e de Issues para organização e distribuição de tarefas.

## 4. Discussões e decisões

Foi elaborado o rascunho inicial do Documento de Arquitetura. Também foram organizados os integrantes e distribuídas as atividades para a finalização da versão definitiva do documento.

A equipe foi dividida para elaborar os diagramas individualmente ao longo da Sprint, utilizando Issues do GitHub para a distribuição das tarefas.

### Decisões tomadas no rascunho do Documento de Arquitetura

- **Arquitetura do sistema:** o projeto adotará o modelo Cliente-Servidor, com front-end em JavaScript com React e back-end em Python com FastAPI. A comunicação ocorrerá por meio de uma API RESTful utilizando JSON.
- **Banco de dados e hospedagem:** utilização do SQLite e hospedagem na Vercel.
- **Portabilidade e Docker:** utilização do Docker para empacotar o back-end e permitir sua execução em diferentes sistemas operacionais.
- **Padrões de código:** utilização do padrão PEP 8 para Python e ESLint para JavaScript.
- **Segurança:** utilização de hash para proteção das credenciais do administrador.
- **Divisão de tarefas:** distribuição da elaboração dos diagramas UML por meio de Issues no GitHub.

## 5. Próximos passos

Elaborar a versão final do Documento de Arquitetura com base no material disponível no Google Drive:

`MDS-Documentação/1.Documentos/2.Arquitetura/Rascunho DOC Arquitetura`

Em caso de dúvidas, consultar as instruções disponíveis nesse documento para o preenchimento da versão final da arquitetura.