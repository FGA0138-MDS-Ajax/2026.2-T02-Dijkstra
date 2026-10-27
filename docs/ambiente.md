# Ambiente de Desenvolvimento Local (Docker)

Instruções para configurar e executar a aplicação localmente utilizando Docker e Docker Compose.

## Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

## Estrutura dos Serviços
- **API (Back-end):** FastAPI em Python 3.12 na porta `8001` do computador (`8000` no contêiner).
- **Front-end:** Servidor estático Nginx na porta `3000`.
- **Banco de Dados:** PostgreSQL na porta local `5434`, com dados em volume Docker.

Copie `.env.example` para `.env` antes de iniciar os serviços. A senha do
exemplo é somente para testes locais. Dentro do Compose, a API acessa o
banco por `db:5432`; no terminal e no DBeaver, use `127.0.0.1:5434`.

## Comandos do Docker Compose

### 1. Construir e Iniciar
Para construir as imagens e iniciar os contêineres em segundo plano:
```bash
docker compose up --build -d
```

Na primeira execução, importe os CSVs uma vez:

```bash
docker compose exec backend python -m src.data.importar_csv
```

### 2. Acompanhar Logs
```bash
docker compose logs -f
```

### 3. Acessar os Serviços
- Front-end: [http://localhost:3000](http://localhost:3000)
- Back-end Docker (API): [http://localhost:8001](http://localhost:8001)
- Documentação interativa (Swagger): [http://localhost:8001/docs](http://localhost:8001/docs)

O frontend atual chama a porta `8000`. Para testá-lo com o backend do
Compose, ajuste `API_BASE_URL` em `src/frontend/js/api_client.js` para
`http://127.0.0.1:8001`, ou use uma API local na porta `8000`.

### 4. Encerrar os Contêineres
```bash
docker compose down
```

Esse comando preserva o volume do PostgreSQL. `docker compose down -v`
remove o volume e apaga os dados locais.
