## Validação da persistência dos dados (issue #40)

Este documento registra a validação feita na issue S5-01 (#40): verificar se os
dados gravados no banco são preservados no ambiente de execução do projeto.
A configuração do banco está descrita em [Persistência dos indicadores
(PostgreSQL)](persistencia-postgresql.md).

### Contexto

O projeto usava SQLite, mas agora a API foi migrada para PostgreSQL, que roda como
serviço separado (`db` no `compose.yaml`) e guarda os dados em um volume
nomeado do Docker (`postgres_data`).

### Ambiente de execução validado

- Docker Compose local, com os serviços `db` (PostgreSQL), `backend` (FastAPI)
  e `frontend`.
- O ambiente de hospedagem da demonstração **ainda não foi definido** pela
  equipe.

### Roteiro de validação

1. Subir o ambiente:
   ```
   docker compose up -d
   ```
2. Carregar os dados dos CSVs (`data/raw`) dentro do contêiner do backend:
   ```
   docker compose exec backend python -m src.data.importar_csv
   ```
   Resultado: **1728 indicadores** importados para o PostgreSQL.
3. Conferir a quantidade de registros antes de reiniciar:
   ```
   docker compose exec db psql -U brasilhub -d brasilhub -c "SELECT COUNT(*) FROM indicadores;"
   ```
   Resultado: 1728
4. Derrubar os contêineres, mantendo o volume, e subir de novo:
   ```
   docker compose down
   docker compose up -d
   ```
5. Conferir a quantidade de registros de novo (mesmo comando do passo 3).
   Resultado: 1728
6. Tentar importar os CSVs outra vez:
   ```
   docker compose exec backend python -m src.data.importar_csv
   ```
   Resultado: a importação foi recusada com
   `ValueError: O banco já contém indicadores. Importação cancelada para evitar duplicações.`

### Resultado

- Os dados continuaram no banco depois de `docker compose down` e
  `docker compose up`, o que confirma que o volume `postgres_data` preserva
  os dados entre reinicializações dos contêineres.
- A trava da importação impede duplicar os indicadores em um banco já
  preenchido.

### Limitações

- A validação vale apenas para o ambiente local com Docker Compose. O volume
  `postgres_data` existe na máquina de quem executa o ambiente.
- `docker compose down -v` remove o volume e apaga o banco. Depois disso é
  preciso importar os CSVs novamente. 
- Plataformas serverless (como a Vercel) não mantêm arquivos gravados em disco
  entre requisições. Nelas, o PostgreSQL precisaria ser um serviço externo
  (por exemplo, Neon ou Supabase), com a `DATABASE_URL` configurada como
  variável de ambiente. Isso não foi testado.
- Se a demonstração for feita apenas localmente, os dados persistem entre
  reinicializações, mas a aplicação não tem uma URL pública e os dados ficam
  somente na máquina que executa o ambiente.
- O SQLite também persistia no ambiente local (a pasta `data/` era um volume
  do Docker), mas não seria adequado em ambiente serverless, pois o arquivo
  do banco seria perdido.