# Endpoint de Upload de Indicadores via CSV

## Visão Geral
O endpoint de upload permite que administradores autenticados atualizem ou insiram em lote novos dados de indicadores socioeconômicos e demográficos a partir de um arquivo **CSV**. 

---

## Especificação da Rota

* **Método HTTP:** `POST`
* **Rota:** `/api/admin/indicadores/upload`
* **Content-Type:** `multipart/form-data`
* **Autenticação:** Obrigatória (HTTP Basic Auth)

---

## Parâmetros da Requisição

| Parâmetro | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `file` | Arquivo (`UploadFile`) | **Sim** | Arquivo `.csv` contendo os dados estruturados dos indicadores. |

### Estrutura Obrigatória do CSV
O arquivo CSV enviado é processado por `tratar_csv` (`src/data/processamento_csv.py`) e mapeado por `preparar_para_persistencia` (`src/data/mapeamento_indicadores.py`):
1. **Nome do arquivo (define a dimensão):** `idhm_geral_uf.csv`, `idhm_educacao_uf.csv`, `idhm_longevidade_uf.csv` ou `idhm_renda_uf.csv`.
2. **Formato de entrada (padrão IPEA):** Separador `;`, primeira linha ignorada (`skiprows=1`), colunas obrigatórias `Sigla`, `Código`, `Estado` e pelo menos uma coluna de ano com 4 dígitos (ex: `2010`, `2020`).
3. **Colunas mapeadas para persistência no PostgreSQL:** `nome_indicador`, `unidade_territorial`, `dimensao`, `valor`, `periodo_referencia`, `unidade_medida` e `fonte`.

---

### MUDANÇAS
```database/indicador_repository.py```

-  **O que mudou:** Adicionado o método `salvar_ou_atualizar_indicadores(df)`.
- **Como funciona:** Ele realiza uma inserção em lote utilizando Upsert (`ON CONFLICT`) do PostgreSQL.
- Executa um rollback em caso de erro, para que a base de dados nunca fique parcialmente atualizada.

```api/main.py```
-  Adicionado o novo endpoint  **`POST /api/admin/indicadores/upload`**.
- Configurada a segurança por **Basic Auth** (`obter_admin_autenticado`) para garantir que apenas administradores cadastrados tenham acesso.
- **Fluxo:** O endpoint valida a extensão do arquivo (`.csv`), processa e valida os dados e retorna uma resposta de sucesso auditada (`atualizado_por`).

## Respostas da API

### 1. Sucesso (`200 OK`)
Retornado quando o arquivo é validado com sucesso e os dados são persistidos atomicamente.

```json
{
  "mensagem": "Base de indicadores atualizada com sucesso.",
  "registros_processados": 150,
  "atualizado_por": "admin"
}
```
### 2. Requisição Inválida (`400 Bad Request`)
```json
{
    "detail": "Apenas arquivos com extensão .csv são permitidos."
}
```
### 3. Não Autorizado (`401 Unauthorized`)
```json
{
    "detail": "Autenticação necessária"
}
```