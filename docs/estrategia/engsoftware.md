# Engenharia de Software e Arquitetura

## Abordagem de Engenharia de Software

O desenvolvimento do Brasil Hub é guiado por metodologias ágeis, unindo o framework de gestão Scrum com as práticas técnicas do Extreme Programming (XP). Essa abordagem iterativa e incremental foca na entrega contínua de valor e na qualidade técnica do produto. 

As principais frentes metodológicas e de engenharia adotadas estão resumidas abaixo:

| Prática de Engenharia | Descrição e Aplicação no Projeto |
| :--- | :--- |
| **Programação em Pares & Rotatividade** | Desenvolvimento realizado em duplas com rotação contínua entre as frentes de Back-end e Front-end, garantindo a propriedade coletiva do código. |
| **Integração Contínua (CI) & Code Review** | Validação cruzada de todo código via Pull Requests antes da integração na branch `develop`, assegurando estabilidade. |
| **Estratégia de Testes Automatizados** | Aplicação de testes em múltiplos níveis: unitários (Pytest/Jest), de integração (comunicação da API com serviços) e de sistema (validação do dashboard e mapas). |

## Princípios de Desenvolvimento e Padrões

Para manter a consistência, segurança e manutenibilidade do código em todo o ciclo de vida do projeto, a equipe segue diretrizes estritas de padronização:

| Categoria | Padrão / Convenção | Diretriz Técnica |
| :--- | :--- | :--- |
| **Controle de Versão** | Git Flow / Branches | Funcionalidades desenvolvidas em `SS-XX` a partir do número da sprint e da issuecom integração via PR. |
| **Mensagens de Commit** | Conventional Commits | Uso de prefixos padronizados como `feat`, `fix`, `docs` e `test`. |
| **Padrão Back-end (Python)** | PEP 8 | Uso de `snake_case` para funções e variáveis; `PascalCase` para classes. |
| **Padrão Front-end (JS)** | ESLint | Uso de `camelCase` para funções e variáveis; `UPPER_SNAKE_CASE` para constantes. |

## Arquitetura Geral Planejada

O sistema adota a arquitetura **Cliente-Servidor em Camadas (Three-Tier)**, garantindo baixo acoplamento entre interface, regras de negócio e persistência. A comunicação entre Front-end e Back-end ocorre exclusivamente via API RESTful (HTTP/JSON ou multipart/form-data para arquivos).

A divisão estrutural das camadas do sistema é apresentada a seguir:

| Camada Arquitetural | Tecnologias Envolvidas | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Apresentação (Front-end)** | JavaScript, Leaflet, HTML/CSS | Interface web do dashboard, mapas interativos, filtros dinâmicos e painel administrativo. |
| **Aplicação (Back-end)** | Python, FastAPI, Pandas | Gerenciamento de rotas HTTP, autenticação, regras de negócio e tratamento massivo de dados. |
| **Persistência (Banco de Dados)** | PostgreSQL | Armazenamento relacional robusto para indicadores socioeconômicos e hashes de credenciais. |
| **Ambiente & Deploy** | Vercel, Docker, Compose | Hospedagem serverless na nuvem e padronização do ambiente local via contêineres. |