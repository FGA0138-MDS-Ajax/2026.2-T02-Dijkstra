# API e indicadores

Para instalar o Python, criar a `.venv` e instalar as dependências,
consulte a seção **Instalação e execução local** do README principal.
Execute os comandos deste guia na raiz do projeto, com a `.venv` ativada.

## Como os dados chegam à API

```text
CSVs → leitura e tratamento → adaptação das colunas → SQLite
                                                      ↓
Cliente ← JSON ← rota FastAPI ← serviço ← repositório ← consulta
```

| Componente | Responsabilidade |
| --- | --- |
| `src/data/processamento_csv.py` | Ler, validar e tratar os CSVs |
| `src/data/mapeamento_indicadores.py` | Adaptar o resultado ao formato do banco |
| `src/data/importar_csv.py` | Reunir e importar os quatro arquivos |
| `src/database/database.py` | Configurar conexões e criar as tabelas |
| `src/database/indicador_repository.py` | Salvar e consultar com SQL parametrizado |
| `src/services/indicador_service.py` | Encaminhar os filtros ao repositório |
| `src/api/schemas.py` | Definir dimensões e validar a resposta |
| `src/api/main.py` | Inicializar a API e expor as rotas |

Ao iniciar, a API chama `init_db()` para criar as tabelas caso não existam.
Isso não importa os CSVs nem apaga dados. A importação é um comando separado.

## CSVs e dimensões

Os arquivos de entrada ficam em `data/raw/`. A fonte registrada pelo
importador é **IPEA**, conforme a origem informada pela equipe.

| Arquivo | Dimensão usada na API e no banco |
| --- | --- |
| `idhm_geral_uf.csv` | `idhm_geral` |
| `idhm_educacao_uf.csv` | `educacao` |
| `idhm_longevidade_uf.csv` | `longevidade` |
| `idhm_renda_uf.csv` | `renda` |

Use esses valores exatamente, em minúsculas e sem acentos. A dimensão
`renda` representa um índice, não um valor monetário.

Os CSVs usam UTF-8, separador `;`, título na primeira linha e cabeçalho
na segunda. São obrigatórias as colunas `Sigla`, `Código`, `Estado` e ao
menos uma coluna de ano com quatro dígitos. Decimais podem usar vírgula
ou ponto.

O tratamento transforma as colunas de anos em linhas, padroniza siglas
e estados e converte números. Valores ausentes, não numéricos ou fora
do intervalo de 0 a 1 tornam-se `NaN`; o repositório os grava como `NULL`,
e a API os retorna como `null`, sem substituir por zero.

### Mapeamento para persistência

| Coluna do banco | Origem ou regra |
| --- | --- |
| `id` | Gerado pelo SQLite |
| `nome_indicador` | `IDHM` |
| `unidade_territorial` | `sigla` do resultado tratado |
| `dimensao` | Mantida do tratamento |
| `valor` | Mantido, inclusive ausentes |
| `periodo_referencia` | `ano` convertido para texto |
| `unidade_medida` | `índice` |
| `fonte` | `IPEA`, fornecida pelo importador ao adaptador |

`codigo_uf` e `estado` continuam no DataFrame tratado, mas não são salvos
porque o esquema atual não tem essas colunas.

Todas as dimensões ficam na mesma tabela, com **uma linha por UF,
período e dimensão**. Os arquivos atuais têm 27 UFs e 16 períodos:
1991, 2000, 2010 e 2012 a 2024. Assim, são **432 registros por dimensão**
e **1.728 no total**.

## Importar e configurar o banco

```bash
python -m src.data.importar_csv
```

O comando trata os quatro arquivos antes de iniciar a gravação e
importa o conjunto usando `salvar_indicadores()`. Com o banco padrão,
a saída esperada é:

```text
1728 indicadores importados para data/indicadores.db.
```

Os CSVs permanecem em `data/raw/`; o `.db` é um arquivo adicional.
Se a tabela já contiver qualquer indicador, a carga é cancelada para
impedir duplicações. A rotina não atualiza nem substitui registros.

O caminho padrão é `data/indicadores.db`, relativo ao diretório de
execução. Para usar outro banco sem apagar o existente, configure
`DB_PATH` antes de importar e iniciar a API.

**Linux/macOS:**

```bash
export DB_PATH="$PWD/data/indicadores_alternativo.db"
```

**PowerShell:**

```powershell
$env:DB_PATH = Join-Path (Get-Location) "data/indicadores_alternativo.db"
```

Use o mesmo valor nos terminais da importação e da API e na conexão do
DBeaver. Para conferir o caminho configurado:

```bash
python -c "from src.database.database import get_db_path; print(get_db_path())"
```

O código lê `DB_PATH`, não o nome antigo `DATABASE_PATH` presente no
`.env.example`, e não carrega `.env` automaticamente. Os bancos locais
são ignorados pelo Git. Em outra máquina, recrie a `.venv`, instale as
dependências e execute a importação para gerar seu banco.

## Consultar a API

```bash
python -m uvicorn src.api.main:app --reload
```

Abra <http://127.0.0.1:8000/docs> para selecionar uma rota, clicar em
**Try it out**, informar os filtros e executar. O contrato OpenAPI fica
em <http://127.0.0.1:8000/openapi.json>.

| Rota GET | Resposta |
| --- | --- |
| `/` | `{"message":"Brasil Hub API"}` |
| `/health` | `{"status":"ok"}` |
| `/api/indicadores` | Lista JSON dos indicadores encontrados |

O `/health` confirma que a aplicação responde; não faz um diagnóstico
do banco.

### Filtros opcionais de `/api/indicadores`

| Parâmetro | Valores aceitos |
| --- | --- |
| `estado` | Sigla de uma das 27 UFs em maiúsculas, como `AC` |
| `dimensao` | `idhm_geral`, `educacao`, `longevidade` ou `renda` |
| `periodo` | Inteiro de 1991 a 2026, limites atuais do código |

Os filtros podem ser usados individualmente ou combinados. Sem filtros,
a API lista todas as dimensões e períodos disponíveis. Um ano aceito
pela validação pode não ter registros: os CSVs atuais terminam em 2024
e não contêm todos os anos anteriores.

Exemplo, em outro terminal:

```bash
curl "http://127.0.0.1:8000/api/indicadores?estado=AC&dimensao=educacao&periodo=2010"
```

No PowerShell, use `curl.exe` se `curl` estiver associado a outro comando.
A resposta contém um registro como este; o `id` pode variar:

```json
[
  {
    "id": 487,
    "nome_indicador": "IDHM",
    "unidade_territorial": "AC",
    "dimensao": "educacao",
    "valor": 0.559,
    "periodo_referencia": "2010",
    "unidade_medida": "índice",
    "fonte": "IPEA"
  }
]
```

O serviço traduz `estado` para `unidade_territorial` e converte `periodo`
para o texto usado em `periodo_referencia`. A rota valida a resposta com
`IndicadorResponse`, incluindo o enum da dimensão.

Consultas sem correspondência retornam **200 com `[]`**. Parâmetros
inválidos, como `estado=XX`, retornam **422**.

Se a consulta falhar com `sqlite3.OperationalError`, por exemplo por
bloqueio ou impossibilidade de abrir o banco, o serviço registra o erro
completo no log e lança `ConsultaIndicadoresIndisponivel`. A rota responde
com **503** e este JSON, sem expor caminhos ou detalhes internos:

```json
{"detail": "Não foi possível consultar os indicadores no momento."}
```

Isso sinaliza uma consulta indisponível, não ausência de dados. Não há
tentativa automática de recuperação ou repetição. Outros tipos de erro
continuam sendo propagados para diagnóstico.

## Visualizar pelo DBeaver

O DBeaver é opcional. Baixe o **Community** na
[página oficial](https://dbeaver.io/download/) e escolha o instalador
compatível com seu sistema e arquitetura. No Windows, execute o EXE;
no macOS, abra o DMG e mova para Aplicativos; no Linux, instale o pacote
DEB ou RPM apropriado. Em Debian/Ubuntu, um DEB baixado pode ser instalado
com `sudo apt install ./NOME_DO_PACOTE.deb`, usando o nome real do arquivo.

Para conectar ao banco local:

1. Abra **Nova conexão / New Database Connection** e selecione **SQLite**.
2. Em **Path / Caminho**, selecione `data/indicadores.db` desta cópia do
   projeto, ou o arquivo definido em `DB_PATH`.
3. Se solicitado, permita o download do driver.
4. Clique em **Testar conexão** e **Concluir**.

Esse banco local não exige servidor, porta, usuário ou senha. O caminho
é do arquivo `.db`, não do CSV nem do driver. Consulte também a
[documentação oficial de conexão SQLite](https://dbeaver.com/docs/dbeaver/Database-driver-SQLite/).

Expanda **Tabelas**, clique com o botão direito em `indicadores` e
selecione **Visualizar dados → Todas as linhas**. A aba de propriedades
mostra a estrutura; a visualização de dados mostra os registros. Após
importar, atualize a grade e remova filtros ativos se necessário.

No editor SQL da conexão, confira as quantidades:

```sql
SELECT COUNT(*) AS total FROM indicadores;

SELECT dimensao, COUNT(*) AS quantidade
FROM indicadores
GROUP BY dimensao;
```

### Dimensões em colunas

Para exibir uma linha por UF e período, execute esta consulta. Ela altera
somente a apresentação, mantendo o armazenamento e o contrato da API:

```sql
SELECT
    unidade_territorial AS uf,
    periodo_referencia AS ano,
    MAX(CASE WHEN dimensao = 'idhm_geral' THEN valor END) AS idhm_geral,
    MAX(CASE WHEN dimensao = 'educacao' THEN valor END) AS educacao,
    MAX(CASE WHEN dimensao = 'longevidade' THEN valor END) AS longevidade,
    MAX(CASE WHEN dimensao = 'renda' THEN valor END) AS renda
FROM indicadores
WHERE nome_indicador = 'IDHM'
GROUP BY unidade_territorial, periodo_referencia
ORDER BY unidade_territorial, periodo_referencia;
```

Para a carga atual, são 432 linhas com quatro colunas de dimensão. O
`MAX` extrai o valor de cada grupo, sem somar as dimensões. A consulta
não cria uma view nem corrige eventuais duplicações inseridas por outros meios.

## Verificações e testes

Com a `.venv` ativada:

```bash
python -m pytest -q
```

Se plugins externos do ambiente causarem erros como `lark` ou
`launch_testing`, desative seu carregamento automático:

```bash
PYTEST_DISABLE_PLUGIN_AUTOLOAD=1 python -m pytest -q
```

No PowerShell:

```powershell
$env:PYTEST_DISABLE_PLUGIN_AUTOLOAD = "1"
python -m pytest -q
Remove-Item Env:PYTEST_DISABLE_PLUGIN_AUTOLOAD
```

A suíte cobre tratamento de CSV, repositório SQLite, rotas e validações
da API, além da tradução e do registro de falhas operacionais no serviço.
Os testes HTTP usam um serviço simulado para os casos de sucesso e um
repositório com falha simulada para verificar a resposta 503. Os testes
do repositório usam bancos temporários. Nenhum deles precisa bloquear
ou danificar o banco de desenvolvimento. A suíte não substitui a
validação completa da importação e das consultas com os CSVs reais.

Para conferir a integração, importe os dados, inicie a API e teste no
`/docs`:

| Consulta | Esperado |
| --- | --- |
| `/health` | 200, `{"status":"ok"}` |
| Indicadores: AC, `educacao`, 2010 | Um registro com valor `0.559` |
| Indicadores: AC, `educacao`, 1991 | Um registro com valor `0.176` |
| Indicadores: período 2025 | 200, `[]` com os CSVs atuais |
| Indicadores: estado `XX` | 422 |

## Problemas frequentes

| Situação | O que conferir |
| --- | --- |
| A API retorna `[]` | Carga executada, filtros e mesmo `DB_PATH` na importação e na API |
| Somente renda aparece | Filtro de dimensão na API ou na grade do DBeaver |
| Banco criado, mas vazio | `init_db()` cria só as tabelas; execute o importador |
| Carga cancelada por banco preenchido | Consulte o banco existente ou use outro `DB_PATH` |
| `NoneType` com `await` na inicialização | Chame `init_db()` sem `await`, pois a função é síncrona |
| `ModuleNotFoundError` | `.venv` ativada, dependências instaladas e execução na raiz |
| Porta 8000 ocupada | Use `--port 8001` no Uvicorn e ajuste as URLs |

Antes de mudar de máquina ou sistema, publique o código e a documentação
na branch correspondente. Commits locais e stashes não são enviados
automaticamente ao GitHub. Recrie a `.venv` no novo sistema; o banco pode
ser reproduzido pelos CSVs, desde que não contenha alterações locais extras.
