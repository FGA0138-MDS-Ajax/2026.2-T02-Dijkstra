# Brasil Hub

### Plataforma de visualização de indicadores socioeconômicos do Brasil

O **Brasil Hub** é uma aplicação web desenvolvida para facilitar a consulta, a visualização e a análise de indicadores socioeconômicos das unidades da Federação brasileiras.

A plataforma busca tornar esses dados mais acessíveis por meio de uma interface intuitiva, recursos de visualização geográfica e filtros que permitem explorar diferentes dimensões do desenvolvimento humano, como **renda, educação e longevidade**.

![Status do projeto](https://img.shields.io/badge/Status-Em%20desenvolvimento-orange)

---

## 📌 Sobre o projeto

O acesso a informações socioeconômicas é importante para compreender as diferenças entre as regiões brasileiras e apoiar análises sobre as condições de vida da população.

O Brasil Hub propõe reunir esses indicadores em uma plataforma que facilite sua exploração e comparação entre estados, contribuindo para uma compreensão mais clara das desigualdades regionais.

O projeto está sendo desenvolvido como parte da disciplina **Métodos de Desenvolvimento de Software (MDS)**, pela equipe Dijkstra, com foco na aplicação de práticas de engenharia de software, desenvolvimento colaborativo, testes e documentação.

### 🎯 Objetivos

- Facilitar o acesso a indicadores socioeconômicos das unidades da Federação.
- Permitir a exploração dos dados por meio de mapas interativos e filtros.
- Favorecer a comparação de indicadores entre estados e períodos.
- Apresentar informações de forma organizada e acessível.
- Permitir a atualização dos dados por meio do envio de arquivos CSV por administradores autorizados.

---

## Funcionalidades previstas

O escopo do Brasil Hub contempla as seguintes funcionalidades:

### 👥 Para os visitantes

- **Mapa interativo do Brasil:** exploração visual dos indicadores por unidade da Federação.
- **Filtros dinâmicos:** seleção de estados, dimensões e períodos disponíveis.
- **Visualização de indicadores:** consulta de informações relacionadas à renda, educação e longevidade.
- **Comparação entre estados:** análise das diferenças entre unidades da Federação.
- **Tabelas e gráficos:** apresentação dos indicadores em formatos complementares.
- **Acessibilidade e responsividade:** interface adaptável a diferentes dispositivos e necessidades de utilização.

### 🔐 Para os administradores

- **Autenticação:** acesso restrito às funcionalidades administrativas.
- **Atualização de dados:** envio de arquivos CSV para atualização dos indicadores.
- **Validação dos arquivos:** verificação e tratamento dos dados antes de sua utilização pela aplicação.

> **Observação:** o Brasil Hub está em desenvolvimento. A disponibilidade de cada funcionalidade depende do andamento das implementações e das respectivas validações.

---

## 🏗️ Arquitetura e tecnologias

A arquitetura proposta utiliza uma organização em camadas, separando a interface do usuário, o processamento das requisições e a persistência dos dados.

| Camada ou componente | Tecnologia | Responsabilidade |
|:--|:--|:--|
| Front-end | HTML, CSS e JavaScript | Construção da interface e interação com o usuário. |
| Visualização geográfica | Leaflet | Exibição e interação com o mapa. |
| Back-end e API | Python e FastAPI | Exposição dos endpoints e processamento das requisições. |
| Tratamento de dados | Pandas | Leitura, validação e transformação dos arquivos de indicadores. |
| Banco de dados | SQLite | Persistência dos indicadores e dos dados administrativos necessários. |
| Testes do back-end | Pytest | Automatização de testes das funcionalidades implementadas em Python. |
| Testes do front-end | Jest | Automatização de testes das funcionalidades JavaScript. |
| Documentação | MkDocs e Material for MkDocs | Organização e publicação da documentação do projeto. |

### 🔄 Fluxo simplificado da aplicação

O front-end realiza requisições à API, que encaminha as operações aos componentes responsáveis pelo processamento e acesso aos dados. Os resultados são retornados ao cliente para apresentação na interface.

O fluxo administrativo permite que arquivos CSV sejam recebidos e processados para atualização dos indicadores, respeitando as validações e as permissões definidas pela aplicação.

---

## 📂 Organização do repositório

A organização do código e da documentação segue a arquitetura definida para o projeto.

A estrutura de referência é:

```text
brasil-hub/
├── src/
│   ├── frontend/       # Interface da aplicação
│   ├── api/            # Endpoints e configuração da API
│   ├── services/       # Regras de negócio e processamento
│   ├── auth/           # Autenticação e autorização
│   ├── data/           # Leitura e tratamento dos dados
│   └── database/       # Acesso e persistência dos dados
├── tests/              # Testes automatizados
├── data/               # Dados de entrada, conforme configuração do projeto
├── docs/               # Documentação
├── requirements.txt    # Dependências Python
├── mkdocs.yml          # Configuração do MkDocs
└── README.md           # Apresentação do projeto
```

> A estrutura acima representa a organização prevista para o projeto e poderá ser atualizada conforme a implementação evoluir.

Arquivos de configuração locais, credenciais, senhas e bancos de dados com informações não destinadas ao versionamento não devem ser enviados ao Git.

---

## 🚀 Como executar o projeto

O procedimento de inicialização depende da estrutura de arquivos e das configurações disponíveis no repositório.

### Pré-requisitos

- Git;
- Python;
- pip, gerenciador de pacotes do Python;
- Navegador web atualizado.

### 1. Clonar o repositório

```bash
git clone https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra.git
cd <DIRETORIO_DO_PROJETO>
```

### 2. Preparar o ambiente Python

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente virtual.

**Windows — PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

**Linux ou macOS:**

```bash
source .venv/bin/activate
```

### 3. Instalar as dependências

Com o ambiente virtual ativado, execute:

```bash
pip install -r requirements.txt
```

### 4. Iniciar a aplicação

O comando de inicialização deverá corresponder ao ponto de entrada efetivamente adotado pelo projeto.

Caso a API esteja configurada no módulo `src/api/main.py`, com a aplicação FastAPI exposta pela variável `app`, o comando será:

```bash
uvicorn src.api.main:app --reload
```

A documentação interativa da API poderá ser acessada em:

```text
http://127.0.0.1:8000/docs
```

> **Importante:** os comandos acima dependem da existência dos respectivos arquivos e configurações. Antes de utilizá-los como instruções definitivas, confirme o ponto de entrada da API e a configuração das dependências no repositório.

---

## 🧪 Testes e qualidade

A estratégia de testes contempla diferentes níveis de verificação para aumentar a confiabilidade do sistema.

| Tipo de teste | Finalidade |
|:--|:--|
| Testes unitários | Verificar o comportamento de funções e componentes isoladamente. |
| Testes de integração | Verificar a interação entre API, serviços, processamento e banco de dados. |
| Testes de sistema | Validar o funcionamento integrado da aplicação. |
| Testes de desempenho | Verificar o tempo de resposta das consultas. |
| Revisão de código | Avaliar alterações antes de sua integração ao código compartilhado. |

Entre os objetivos de qualidade definidos para o projeto está a resposta dos filtros em até **3 segundos**, conforme o requisito de desempenho estabelecido no documento de visão.

Os resultados dos testes e as evidências de validação devem ser registrados de acordo com o processo de desenvolvimento da equipe.

---

## 🌿 Organização das branches

O repositório utiliza branches com responsabilidades distintas para organizar o desenvolvimento, a documentação e a publicação.

| Branch | Finalidade |
|:--|:--|
| `main` | Versão de produção do software, contendo alterações aprovadas para esse ambiente. |
| `developer` | Integração das funcionalidades e validações antes da promoção para produção. |
| `docs` | Organização e manutenção da documentação do projeto. |
| `gh-pages` | Arquivos estáticos utilizados na publicação da documentação pelo GitHub Pages. |

### Fluxo de desenvolvimento

1. A implementação é realizada conforme as issues e as responsabilidades definidas pela equipe.
2. As alterações são submetidas à revisão de código.
3. As funcionalidades são integradas e testadas no ambiente de desenvolvimento.
4. As alterações aprovadas podem ser promovidas para a versão de produção.

A equipe deve seguir as regras de criação de branches, revisão de Pull Requests e integração estabelecidas para o repositório.

---

## 📚 Documentação

A documentação do Brasil Hub utiliza **MkDocs** e o tema **Material for MkDocs**.

Os documentos descrevem aspectos relevantes do projeto, incluindo:

- Documento de visão;
- Documento de arquitetura;
- Requisitos funcionais e não funcionais;
- Diagramas e modelos do sistema;
- Decisões arquiteturais;
- Estratégia e evidências de testes.

A publicação da documentação utiliza o GitHub Pages, com os arquivos estáticos disponibilizados pela branch `gh-pages`, conforme a configuração do repositório.

Para mais informações sobre as ferramentas utilizadas:

- [MkDocs](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Pandas](https://pandas.pydata.org/)
- [Leaflet](https://leafletjs.com/)

---

## 👨‍💻 Equipe

O Brasil Hub é desenvolvido colaborativamente pela equipe da disciplina Métodos de Desenvolvimento de Software.

A equipe organiza as atividades por meio de issues, planejamento de Sprint, revisão de código e testes, buscando manter a rastreabilidade das entregas e a qualidade do software.

---

## 📌 Estado atual do projeto

O Brasil Hub encontra-se em desenvolvimento. A implementação das funcionalidades, a validação dos requisitos e a evolução da documentação acontecem de forma incremental ao longo das Sprints.

Para acompanhar o andamento do trabalho, consulte as issues, os Pull Requests e o histórico de alterações do repositório.

---
