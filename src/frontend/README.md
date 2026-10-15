# Brasil Hub - Front-end Local

## Sobre.

O Brasil Hub é uma plataforma web que apresenta dados socioeconômicos de
cada estado do Brasil, como IDH, renda e educação. Esta interface contém
apenas a base do front-end (estrutura da página e comunicação com a API).
O mapa interativo e os filtros completos serão implementados nas próximas
sprints.

## Como executar

1. Clone o repositório e entre na pasta:
```bash
   git clone https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra.git
   cd 2026.2-T02-Dijkstra
```
2. Abra a pasta no VS Code e instale a extensão **Live Server**.
3. Abra o arquivo `src/frontend/index.html`, clique com o botão direito e
   escolha **Open with Live Server** (ou clique em **Go Live**, no canto
   inferior direito).
4. Ou usar o comando "python -m http.server 5500" e abrir o navegador na página em `http://localhost:5500/src/frontend/` ou no link dado no terminal.

## Estrutura de pastas

```
src/frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── api_client.js
└── assets/
    └── brasil-map.png
```

- `index.html`: Página inicial do Brasil Hub.
- `css/style.css`: Estilo da página.
- `js/main.js`: Funções da `js/api_client.js aplicadas na página inicial do Brasil Hub.
- `js/api_client.js`: Implementação de erros possíveis e as menasagens qeu aparecceram.
- `assets/brasil-map.png`: Imagem do mapa do Brasil exibida na página inicial.

## JavaScript

### `main.js`

Script principal da página, carregado como módulo pelo `index.html`. Ao abrir a página:

1. Exibe a mensagem "Carregando" enquanto consulta a rota `/health` da API.
2. Se a API responde, exibe "Conectado" (a mensagem some após 5 segundos).
3. Se ocorre uma falha, exibe "Servidor indisponível" com uma mensagem adequada ao tipo de erro e um botão **Tentar novamente**. Os detalhes técnicos são registrados no console do navegador.

As mensagens aparecem na caixa de status (`#status-api`) do `index.html`.

A função `buscarIndicadores` já existe no `api_client.js`, mas ainda não é utilizada pela página.

O código fica em `src/frontend/js/`.

### `api_client.js`

Módulo responsável por toda a comunicação com a API.

- **URL da API:** definida na constante `API_BASE_URL`, no topo do arquivo. Para apontar para outro servidor, basta alterar esse valor.
- **`verificarSaude()`:** consulta a rota `GET /health` (tempo limite de 3 s).
- **`buscarIndicadores(filtros)`:** consulta a rota `GET /api/indicadores` (tempo limite de 8 s). Os filtros são opcionais e os vazios são ignorados na URL.
 **Erros:** as falhas são lançadas como `ErroApi`, que tem o campo `tipo` com um destes valores:
  - `rede`: não foi possível conectar à API
  - `tempo_esgotado`: a API demorou demais para responder
  - `http`: a API respondeu com erro (o código fica em `status`)
  - `resposta_invalida`: a resposta não é um JSON válido
