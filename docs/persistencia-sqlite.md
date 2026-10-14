## Persistência dos indicadores (SQLite)

Os indicadores socioeconômicos ficam em um banco SQLite acessado pelo `IndicadorRepository` (`src/database/indicador_repository.py`).

### Como inicializar o banco

```
python -c "from src.database.database import init_db; init_db()"
```

O caminho do arquivo vem da variável de ambiente `DB_PATH`. Sem ela, usa `data/indicadores.db`. O arquivo `.db` não é versionado.

### Tabela `indicadores` (mapeamento dos campos)

| Campo da issue | Coluna |
|---|---|
| Identificador do registro | `id` |
| Nome do indicador | `nome_indicador` |
| Estado ou unidade territorial | `unidade_territorial` |
| Dimensão socioeconômica | `dimensao` |
| Valor | `valor` (aceita NULL) |
| Período de referência | `periodo_referencia` |
| Unidade de medida | `unidade_medida` |
| Fonte dos dados | `fonte` |

### Regras

- Valores ausentes não viram zero: são gravados como NULL.
- Todas as consultas usam parâmetros (`?`), sem concatenar valores no SQL.
- A tabela `administradores` (com `password_hash`) existe no esquema, mas a autenticação é da Sprint 5.

### Testes

```
python -m pytest -v
```