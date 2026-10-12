# Ambiente de Desenvolvimento Local (Docker)

Instruções para configurar e executar a aplicação localmente utilizando Docker e Docker Compose.

## Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

## Estrutura dos Serviços
- **API (Back-end):** FastAPI em Python 3.11 na porta `8000`.
- **Front-end:** Servidor estático Nginx na porta `3000`.
- **Banco de Dados:** SQLite embarcado persistido localmente no diretório `data/`.

## Comandos do Docker Compose

### 1. Construir e Iniciar
Para construir as imagens e iniciar os contêineres em segundo plano:
```bash
docker compose up --build -d
```

### 2. Acompanhar Logs
```bash
docker compose logs -f
```

### 3. Acessar os Serviços
- Front-end: [http://localhost:3000](http://localhost:3000)
- Back-end (API): [http://localhost:8000](http://localhost:8000)
- Documentação interativa (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Encerrar os Contêineres
```bash
docker compose down
```
