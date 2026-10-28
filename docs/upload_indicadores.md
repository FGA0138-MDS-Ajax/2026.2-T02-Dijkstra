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
O arquivo CSV enviado deve conter obrigatoriamente as seguintes colunas correspondentes no cabeçalho:
1. `nome_indicador`
2. `unidade_territorial`
3. `dimensao`
4. `valor`
5. `periodo_referencia`
6. `unidade_medida`
7. `fonte`

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