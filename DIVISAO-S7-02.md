# Guia de Divisão da S7-02

> **obs:** arquivo temporário para organização na branch da tarefa e deve ser removido antes do merge final na `developer`.

---

## 1. Resumo da Tarefa e Contrato da API (Já pronto na `developer`)

O Back-end (`S7-01` — PR #73) já implementou e documentou o endpoint de comparação. Não precisamos esperar nada do Back-end.

- **Endpoint:** `GET /api/indicadores/comparar`
- **Parâmetros de Query:**
  - `estado_a` (obrigatório): sigla da 1ª UF (ex: `SP`)
  - `estado_b` (obrigatório): sigla da 2ª UF (ex: `RJ`)
  - `periodo_a` e `periodo_b` (opcionais): se omitidos, o Back-end seleciona automaticamente **o ano mais recente em comum** entre os dois estados (ex: `2021`).
- **Exemplo de chamada:**
  ```text
  GET http://127.0.0.1:8000/api/indicadores/comparar?estado_a=SP&estado_b=RJ
  ```
- **Formato exato do JSON de resposta (`200 OK`):**
  ```json
  {
    "estados": [
      {
        "estado": "SP",
        "periodo_referencia": 2021,
        "indicadores": {
          "idhm_geral":  { "valor": 0.806, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "renda":       { "valor": 0.774, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "educacao":    { "valor": 0.789, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "longevidade": { "valor": 0.859, "unidade_medida": "índice", "fonte": "Atlas Brasil" }
        }
      },
      {
        "estado": "RJ",
        "periodo_referencia": 2021,
        "indicadores": {
          "idhm_geral":  { "valor": 0.762, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "renda":       { "valor": 0.759, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "educacao":    { "valor": 0.754, "unidade_medida": "índice", "fonte": "Atlas Brasil" },
          "longevidade": { "valor": 0.775, "unidade_medida": "índice", "fonte": "Atlas Brasil" }
        }
      }
    ]
  }
  ```
- **Erros possíveis da API:**
  - `400`: Estados iguais no mesmo período (`"Selecione dois anos diferentes para comparar."`).
  - `404`: Sem dados para algum dos estados no período (`"Não há dados para ..."`).
  - `422`: Sigla de UF inválida.
  - `503`: Banco de dados indisponível.

---

## 2. Visão Geral da divisão

Para evitar conflitos de código no Git e dividir as tarefas da issue:

| Integrante | Foco Principal | Arquivos Principais |
|---|---|---|
| **Parte 1 — Josef** | **Integração com a API, Estrutura HTML base, Seletores de Estados e Estados de Carregamento/Erro** | `src/frontend/js/api_client.js`<br>`src/frontend/mapa.html`<br>`src/frontend/js/comparacao.js` (parte de controle/eventos)<br>`src/frontend/js/main.js` |
| **Parte 2 — Felipe** | **Renderização Lado a Lado dos Indicadores, Tratamento de Valores Nulos, Estilização CSS Responsiva e Teste TC-09** | `src/frontend/js/comparacao.js` (função de renderização visual)<br>`src/frontend/css/style.css`<br>Execução e registro do **TC-09** |

---

## 3. Parte 1 — (Josef)

O Josef prepara o terreno completo de comunicação, estrutura semântica do HTML e regras dos seletores para que o Felipe receba os dados prontos para desenhar na tela.

### Checklist:

- [ ] **1. Cliente HTTP (`src/frontend/js/api_client.js`):**
  - Criar e exportar a função `buscarComparacao(estadoA, estadoB)` utilizando `montarURL("/api/indicadores/comparar", { estado_a: estadoA, estado_b: estadoB })`.
  - Seguir o mesmo padrão de `AbortController` (`TEMPO_LIMITE_MS`) e `ErroApi` já usado em `buscarIndicadores`.
  - Se a resposta não for `ok` (ex: `400` ou `404`), capturar a mensagem `detail` do JSON de erro da API (quando disponível) e passar no `ErroApi` para exibir mensagens claras ao usuário.

- [ ] **2. Estrutura HTML (`src/frontend/mapa.html`):**
  - Adicionar, abaixo da `<section class="map-section">`, uma nova seção `<section class="comparacao-section" aria-labelledby="comparacao-titulo">`.
  - Incluir os elementos com IDs padronizados (contrato interno com o Felipe):
    - `#comparacao-estado-a` (`<select>` para o 1º estado)
    - `#comparacao-estado-b` (`<select>` para o 2º estado)
    - `#comparacao-limpar` (`<button type="button">` para limpar a comparação)
    - `#comparacao-status` (`<p role="status" aria-live="polite">` para mensagens de instrução, carregamento e erro da comparação)
    - `#comparacao-resultado` (`<div class="comparacao__resultado" hidden>` onde o Felipe vai renderizar os cards lado a lado)

- [ ] **3. Controle de Seleção e Eventos (`src/frontend/js/comparacao.js` e `src/frontend/js/main.js`):**
  - Importar a lista `ESTADOS` já existente em `./filters.js` (evitando duplicar as 27 UFs).
  - Popular `#comparacao-estado-a` e `#comparacao-estado-b`.
  - **Regra de negócio obrigatória:** impedir a seleção do mesmo estado nas duas posições (ao escolher `SP` no select A, desabilitar a `<option value="SP">` no select B e vice-versa; caso ambos fiquem iguais por qualquer motivo, bloquear a consulta e avisar em `#comparacao-status`).
  - Controlar os estados de **Carregamento** (`"Carregando comparação..."`), **Erro** (exibindo mensagem amigável quando a API falhar ou retornar `404` sem dados) e **Limpar**.
  - Deixar pronta a assinatura da função `renderizarComparacao(dados)` dentro de `comparacao.js` (inicialmente com uma exibição simples/base) para o Felipe expandir e estilizar.
  - Inicializar o módulo chamando `inicializarComparacao()` dentro de `src/frontend/js/main.js`.

---

## 4. Parte 2 — (Felipe)

A partir da estrutura e da chamada da API deixadas pelo Josef na branch, o Felipe assume a apresentação visual lado a lado, o CSS responsivo e a validação formal do requisito (`TC-09`).

### Checklist:

- [ ] **1. Renderização Lado a Lado (`renderizarComparacao` em `src/frontend/js/comparacao.js`):**
  - Receber o objeto `{ estados: [estadoA, estadoB] }` retornado pela API.
  - Exibir os dois estados lado a lado identificando para cada um:
    - Nome completo da UF e sigla (ex: `São Paulo (SP)` vs `Rio de Janeiro (RJ)`).
    - **Período de referência** retornado pela API (`periodo_referencia`, ex: `Ano base: 2021`).
    - Os **4 indicadores obrigatórios**:
      1. `idhm_geral` -> **IDHM Geral**
      2. `renda` -> **IDHM Renda**
      3. `educacao` -> **IDHM Educação**
      4. `longevidade` -> **IDHM Longevidade**
    - Identificar a **unidade de medida** (`unidade_medida`, ex: `índice`) e a **fonte** (`fonte`, ex: `Atlas Brasil` / `IPEA`) quando disponíveis.
  - **Regra de negócio crítica (Valores ausentes):**
    - Se `indicador.valor === null` ou `undefined`, **NUNCA exibir `0` ou `0.000`**. Exibir `"Sem dados"` ou `"—"`!
    - Quando houver valor numérico, formatar com 3 casas decimais (ex: `0.806`).

- [ ] **2. Estilização e Responsividade (`src/frontend/css/style.css`):**
  - Estilizar `.comparacao-section`, os controles de seleção e os cards lado a lado (`.comparacao__resultado`, `.comparacao__card`, `.comparacao__item`, etc.).
  - **Importante para Acessibilidade (B-03):** usar exclusivamente as variáveis CSS do arquivo `variables.css` (`var(--bg-surface)`, `var(--text-primary)`, `var(--border-subtle)`, `var(--color-primary)`, etc.) e unidades relativas (`rem`) para que a seção funcione automaticamente no **Modo Noturno**, no **Alto Contraste** e nos botões **`A+` / `A-`**!
  - **Responsividade (B-08):**
    - Em Desktop: os dois cards de estado ficam **lado a lado** (`grid-template-columns: 1fr 1fr` ou `flex`).
    - Em Mobile (`@media (max-width: 768px)`): os controles e os cards se adaptam sem gerar barra de rolagem horizontal e mantendo fácil leitura comparativa.

- [ ] **3. Execução e Registro do Caso de Teste `TC-09`:**
  - Com o Docker rodando (`docker compose up -d`), executar o teste de sistema **TC-09 (Comparar duas UFs)** e os cenários exigidos na issue:
    1. Seleção de dois estados diferentes (ex: `SP` e `RJ`) e conferência dos valores com o banco.
    2. Tentativa de selecionar o mesmo estado nas duas posições (verificar bloqueio).
    3. Comportamento de carregamento e de erro (ex: derrubando o backend com `docker compose stop backend`).
    4. Verificação em tela Desktop e Mobile (DevTools).
  - Tirar os prints de evidência e preencher a tabela do **TC-09** no comentário de entrega da Issue / Pull Request.

---

## 5. Mapeamento dos Critérios de Aceitação da Issue

| Critério de Aceitação da Issue | Responsável Principal |
|---|---|
| O visitante consegue selecionar dois estados diferentes. | Josef |
| A interface impede a seleção do mesmo estado nas duas posições. | Josef |
| A interface apresenta um estado de carregamento durante as consultas. | Josef |
| Erros e ausência de resultados são apresentados de maneira compreensível. | Josef |
| Os dados exibidos correspondem à resposta da API. | Josef + Felipe |
| Os indicadores dos dois estados são apresentados lado a lado. | Felipe |
| Os períodos de referência e as unidades disponíveis são identificados. | Felipe |
| Valores inexistentes não são apresentados como zero. | Felipe |
| A funcionalidade mantém o padrão visual da plataforma (claro/escuro/alto contraste). | Felipe |
| A interface permanece utilizável em diferentes tamanhos de tela (responsividade). | Felipe |
| O caso de teste TC-09 foi executado e registrado em ambiente de homologação. | Felipe (com revisão do Josef) |

---

## 6. Fluxo Git Combinado da Dupla

1. **Josef** cria a branch a partir da `developer` atualizada, implementa a **Parte 1**, faz commit e dá `git push -u origin S7-02`.
2. **Felipe** faz `git fetch origin && git checkout S7-02`, implementa a **Parte 2**, testa tudo e faz push na mesma branch `S7-02`.
3. Antes de abrir o Pull Request para a `developer`, apagamos este arquivo (`git rm DIVISAO-S7-02.md`) e anexamos o relatório do **TC-09** na descrição do PR e na Issue!

