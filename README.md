# Brasil Hub

### Plataforma de visualização de indicadores socioeconômicos do Brasil

O **Brasil Hub** é uma aplicação web desenvolvida para facilitar a consulta, a visualização e a análise de indicadores socioeconômicos das unidades da Federação brasileiras.

A plataforma busca tornar esses dados mais acessíveis por meio de uma interface intuitiva, recursos de visualização geográfica e filtros que permitem explorar diferentes dimensões do desenvolvimento humano, como **renda, educação e longevidade**.

---

## Sobre o projeto

O acesso a informações socioeconômicas é importante para compreender as diferenças entre as regiões brasileiras e apoiar análises sobre as condições de vida da população.

O Brasil Hub propõe reunir esses indicadores em uma plataforma que facilite sua exploração e comparação entre estados, contribuindo para uma compreensão mais clara das desigualdades regionais.

O projeto é desenvolvido na disciplina de **Métodos de Desenvolvimento de Software (MDS)** da **Universidade de Brasília (UnB)**, sob orientação do **Prof. Ricardo Ajax**, no semestre **2026.2**, pela **Equipe Dijkstra**.

### Objetivos

- Facilitar o acesso a indicadores socioeconômicos das unidades da Federação.
- Permitir a exploração dos dados por meio de mapas interativos e filtros dinâmicos.
- Favorecer a comparação de indicadores entre estados e períodos.
- Apresentar informações de forma organizada, responsiva e acessível.
- Permitir a atualização dos dados por meio de upload de arquivos CSV por administradores autenticados.

---

## Funcionalidades do sistema

### Visitantes (Acesso público)

- **Mapa interativo do Brasil:** exploração visual dos indicadores por unidade da Federação via Leaflet.
- **Filtros dinâmicos:** seleção por Estado e Dimensão do IDH (Renda, Educação, Longevidade e Geral).
- **Painel informativo:** consulta dos valores detalhados, período de referência e fonte do dado ao selecionar uma UF.
- **Acessibilidade completa:** controles de ajuste de tamanho de fonte (`A+`/`A-`), modo escuro e alto contraste integrados à barra de navegação.
- **Responsividade:** interface adaptada para navegação em computadores, tablets e smartphones.

### Administradores (Área restrita)

- **Autenticação segura:** controle de acesso mediante usuário e senha criptografada com algoritmo de hash `bcrypt`.
- **Upload de dados:** envio de novos arquivos CSV para atualização transacional da base de dados via *upsert*.
- **Validação e sanitização:** verificação de formato, colunas e consistência com Pandas antes da persistência no banco.

---

## Arquitetura e tecnologias

A aplicação utiliza arquitetura em camadas desacopladas para separar interface, regras de negócio e persistência.

| Camada / Componente | Tecnologia | Responsabilidade no projeto |
| :--- | :--- | :--- |
| **Front-end** | HTML5, CSS3 e JavaScript modular | Interface do usuário, controles de acessibilidade e filtros |
| **Visualização geográfica** | Leaflet | Renderização vetorial e interação com o mapa coroplético |
| **Back-end / API** | Python 3.12 e FastAPI | Endpoints RESTful, validação de contratos e regras de negócio |
| **Tratamento de dados** | Pandas | Leitura, padronização, limpeza e ingestão de planilhas CSV |
| **Banco de dados** | PostgreSQL 17 | Persistência relacional de indicadores e credenciais |
| **Conteinerização** | Docker e Docker Compose | Padronização e isolamento do ambiente de execução local e de CI |
| **Testes automatizados** | Pytest | Testes unitários, de integração e de desempenho da API |
| **Documentação** | MkDocs Material | Centralização dos documentos de visão, arquitetura e acompanhamento |

---

## Como executar o projeto em qualquer computador

O projeto foi totalmente configurado para rodar de forma padronizada via **Docker Compose**, tanto no **Linux/macOS** quanto no **Windows**, sem necessidade de instalar Python ou PostgreSQL diretamente no sistema operacional do host.

### Pré-requisitos

- **Git**
- **Docker** e **Docker Compose** instalados e em execução (Docker Engine ou Docker Desktop)

---

### Passo 1: Obter o repositório

```bash
git clone https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra.git
cd 2026.2-T02-Dijkstra
```

Se desejar executar a versão de produção estável:
```bash
git checkout main
```

---

### Passo 2: Configurar variáveis de ambiente

Crie o arquivo `.env` a partir do modelo de exemplo:

- **Linux / macOS:**
  ```bash
  cp .env.example .env
  ```

- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```

> Caso queira personalizar credenciais administrativas ou portas, edite os campos `ADMIN_USUARIO`, `ADMIN_SENHA` e `POSTGRES_PASSWORD` dentro do `.env`.

---

### Passo 3: Iniciar a aplicação

Execute o comando a seguir na raiz do projeto para construir as imagens e subir os três containers (**Banco PostgreSQL + Back-end FastAPI + Front-end Nginx**):

```bash
docker compose up -d --build
```

---

### Passo 4: Carregar a base de dados e criar o administrador

Com os containers em execução, popule os dados iniciais do IBGE/IPEA e crie a conta administrativa inicial:

```bash
# 1. Importa os 1.728 registros dos CSVs oficiais para o banco de dados
docker compose exec backend python -m src.data.importar_csv

# 2. Cria o usuário administrador com senha em hash bcrypt no PostgreSQL
docker compose exec backend python -m scripts.seed_admin
```

---

### Passo 5: Acessar a aplicação no navegador

| Interface / Serviço | Endereço | Descrição |
| :--- | :--- | :--- |
| **Página Inicial** | [http://localhost:3000/index.html](http://localhost:3000/index.html) | Visão geral da plataforma |
| **Mapa Interativo** | [http://localhost:3000/mapa.html](http://localhost:3000/mapa.html) | Mapa com filtros e dados socioeconômicos |
| **Área do Administrador** | [http://localhost:3000/area-adm.html](http://localhost:3000/area-adm.html) | Tela de login restrito |
| **Painel de Upload** | [http://localhost:3000/painel-adm.html](http://localhost:3000/painel-adm.html) | Envio de novas planilhas CSV pelo admin |
| **Documentação da API (Swagger)** | [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) | Especificação interativa OpenAPI/Swagger |

> **Credenciais padrão do administrador:**
> - **Usuário:** `admin`
> - **Senha:** `troque-esta-senha` *(ou a senha customizada no seu arquivo `.env`)*

---

### Comandos úteis de gerenciamento

```bash
# Opcional
# Verificar status dos containers
docker compose ps

# Visualizar logs em tempo real
docker compose logs -f

# Parar os serviços sem remover os dados salvos no banco
docker compose stop

# Encerrar e remover containers
docker compose down
```

---

## Testes e qualidade de software

A suíte conta com **116 testes automatizados** no Pytest, cobrindo processamento de CSV, integridade relacional, autenticação segura, validações da API e verificação de tempo de resposta.

Os testes de integração são executados automaticamente a cada Pull Request no **GitHub Actions**, subindo uma instância isolada de PostgreSQL 17 em ambiente de CI.

### Execução local dos testes

Para rodar a suíte no terminal da sua máquina (com o container do banco ativo via `docker compose up -d db` e a `.venv` ativada):

```bash
# Linux / macOS
python -m pytest -q

# Windows (PowerShell)
.\.venv\Scripts\python.exe -m pytest -q
```

---

## Organização do repositório

```text
brasil-hub/
├── src/
│   ├── frontend/       # Interface web (HTML5, CSS3, JavaScript modular)
│   ├── api/            # Endpoints FastAPI e schemas de validação
│   ├── services/       # Regras de negócio e casos de uso
│   ├── auth/           # Autenticação e hash de senhas (bcrypt)
│   ├── data/           # Scripts de tratamento e ingestão de CSV (Pandas)
│   └── database/       # Conexão e repositórios relacionais (PostgreSQL)
├── tests/              # Suíte de testes automatizados com Pytest
├── data/raw/           # Planilhas CSV brutas de indicadores socioeconômicos
├── docs/               # Documentação técnica e acompanhamento (MkDocs)
├── scripts/            # Scripts utilitários de suporte e carga
├── compose.yaml        # Orquestração de containers com Docker Compose
├── Dockerfile          # Imagem de produção do serviço de back-end
├── requirements.txt    # Dependências de bibliotecas Python
├── mkdocs.yml          # Configuração do gerador de documentação
└── README.md           # Apresentação do projeto
```

---

## Equipe

O Brasil Hub é desenvolvido pela equipe Dijkstra da disciplina Métodos de Desenvolvimento de Software (UnB/FGA):

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Nataxshaa">
          <img src="https://github.com/Nataxshaa.png" width="115px;" style="border-radius: 50%;" alt="Foto de Ágatha Natasha"/><br>
          <sub><b>Ágatha Natasha</b></sub>
        </a><br>
        <sub><code>251034885</code></sub><br>
        <sub>Back-end & Infra</sub>
      </td>
      <td align="center">
        <a href="https://github.com/CesarL3gal">
          <img src="https://github.com/CesarL3gal.png" width="115px;" style="border-radius: 50%;" alt="Foto de César Augusto"/><br>
          <sub><b>César Augusto</b></sub>
        </a><br>
        <sub><code>251035031</code></sub><br>
        <sub>Front-end</sub>
      </td>
      <td align="center">
        <a href="https://github.com/EduardoSauber">
          <img src="https://github.com/EduardoSauber.png" width="115px;" style="border-radius: 50%;" alt="Foto de Eduardo Brito"/><br>
          <sub><b>Eduardo Brito</b></sub>
        </a><br>
        <sub><code>251020226</code></sub><br>
        <sub>Back-end & Infra</sub>
      </td>
      <td align="center">
        <a href="https://github.com/fabysoouza">
          <img src="https://github.com/fabysoouza.png" width="115px;" style="border-radius: 50%;" alt="Foto de Fabiana Reis"/><br>
          <sub><b>Fabiana Reis</b></sub>
        </a><br>
        <sub><code>251008526</code></sub><br>
        <sub>PO / Front-end</sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/fgeorge07">
          <img src="https://github.com/fgeorge07.png" width="115px;" style="border-radius: 50%;" alt="Foto de Felipe George"/><br>
          <sub><b>Felipe George</b></sub>
        </a><br>
        <sub><code>251008535</code></sub><br>
        <sub>Front-end</sub>
      </td>
      <td align="center">
        <a href="https://github.com/JosefWojtyla">
          <img src="https://github.com/JosefWojtyla.png" width="115px;" style="border-radius: 50%;" alt="Foto de Josef Wojtyla"/><br>
          <sub><b>Josef Wojtyla</b></sub>
        </a><br>
        <sub><code>251023282</code></sub><br>
        <sub>SM / Back-end & Infra</sub>
      </td>
      <td align="center">
        <a href="https://github.com/nerylucas">
          <img src="https://github.com/nerylucas.png" width="115px;" style="border-radius: 50%;" alt="Foto de Lucas Abdalla"/><br>
          <sub><b>Lucas Abdalla</b></sub>
        </a><br>
        <sub><code>251012304</code></sub><br>
        <sub>Front-end</sub>
      </td>
      <td align="center">
        <a href="https://github.com/pefidelis">
          <img src="https://github.com/pefidelis.png" width="115px;" style="border-radius: 50%;" alt="Foto de Paulo Eduardo"/><br>
          <sub><b>Paulo Eduardo</b></sub>
        </a><br>
        <sub><code>242015325</code></sub><br>
        <sub>Back-end & Infra</sub>
      </td>
    </tr>
  </table>
</div>

---

## Documentação do projeto

A documentação completa com Documento de Visão, Documento de Arquitetura, Casos de Teste, atas de reunião e acompanhamento semanal de cada Sprint está disponível no GitHub Pages:

🔗 **[Acessar a documentação no GitHub Pages](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/)**
