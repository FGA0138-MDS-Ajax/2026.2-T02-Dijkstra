# Especificações e Regras de Negócio — Brasil Hub

## 1. Visão Geral

Este documento formaliza as especificações funcionais, regras de negócio (*Business Rules*), restrições de integridade de dados e delimitação de escopo da plataforma **Brasil Hub**.

Essas diretrizes orientam o comportamento esperado das entidades do domínio, a validação de fluxos analíticos e a lógica implementada tanto na camada de aplicação (FastAPI/Pandas) quanto na camada de persistência (SQLite).

---

## 2. Regras de Negócio (RN)

As regras de negócio garantem a consistência analítica, a integridade dos dados governamentais e a segurança operacional da plataforma.

### RN-01 — Integridade Territorial das Unidades da Federação
- O sistema opera estritamente sobre as **27 Unidades da Federação (UFs)** do território brasileiro (26 estados e o Distrito Federal);
- Toda consulta ou registro de indicador deve estar associado a uma sigla de UF válida (padrão ISO 3166-2:BR, ex: `SP`, `RJ`, `DF`) e ao respectivo código numérico oficial do IBGE (intervalo de 11 a 53);
- Registros com siglas inexistentes ou municípios avulsos são sumariamente rejeitados na etapa de validação.

### RN-02 — Tratamento de Dados Ausentes (Anti-Mascaramento)
- Em nenhuma hipótese um valor ausente, omitido ou não coletado nas bases oficiais pode ser preenchido como o número zero (`0`), pois o zero é um valor numérico válido que deturparia cálculos de média, variância e séries históricas;
- Dados ausentes devem ser preservados como valores nulos (`NaN` no Pandas / `null` no JSON / `NULL` no banco de dados SQLite);
- Na interface gráfica com o usuário, valores nulos devem ser apresentados explicitamente com a legenda *"Não informado / Dado não disponível"*.

### RN-03 — Homologação das Dimensões Socioeconômicas
- Os indicadores da plataforma são classificados em três dimensões temáticas homologadas:
  1. **Renda** (ex: Rendimento médio per capita, massa de rendimento);
  2. **Educação** (ex: Taxa de alfabetização, taxa de escolarização);
  3. **Longevidade** (ex: Expectativa de vida ao nascer, mortalidade infantil).
- Arquivos de importação contendo dimensões fora do escopo homologado são barrados pelo módulo validador de esquema.

### RN-04 — Coerência Temporal em Comparações (Requisito B-06)
- Ao realizar a comparação de indicadores entre dois estados selecionados, o sistema deve garantir que os valores apresentados correspondam estritamente ao mesmo ano ou período de coleta;
- Caso um dos estados não possua dados para o período selecionado, o sistema deve manter a indicação de dado ausente sem inferir ou extrapolar valores de anos divergentes sem consentimento do usuário.

### RN-05 — Atomicidade e Transacionalidade na Ingestão de Dados (Requisito B-04)
- A operação de upload de novos arquivos CSV por administradores é transacional e atômica (*All-or-Nothing*);
- Caso uma única linha do arquivo viole cabeçalhos obrigatórios, formato de tipos, limites numéricos ou restrições de unicidade, o arquivo é rejeitado integralmente;
- Não é permitida a persistência parcial de dados inconsistentes, preservando o estado anterior da base SQLite.

### RN-06 — Controle de Acesso e Proteção de Credenciais (Requisito B-09)
- Todas as operações de modificação de dados e visualização de logs administrativos são restritas a administradores autenticados;
- As senhas dos administradores são obrigatoriamente protegidas com o algoritmo criptográfico `bcrypt` com *salt* gerado dinamicamente;
- O sistema nunca aceita, transporta em repouso ou armazena senhas em texto simples;
- Tentativas de acesso não autenticado a rotas protegidas retornam código HTTP `401 Unauthorized` ou `403 Forbidden`.

### RN-07 — Limiar Máximo de Desempenho (Requisito B-05)
- O tempo total de resposta da API REST para consultas com aplicação de filtros dinâmicos não deve exceder **3 segundos** em condições estáveis de conectividade;
- O processamento deve se apoiar em consultas indexadas no SQLite e operações vetorizadas com Pandas para assegurar baixa latência.

### RN-08 — Preservação de Legibilidade na Acessibilidade (Requisito B-03)
- A aplicação dos recursos de acessibilidade (aumento do tamanho da fonte tipográfica, contraste aumentado e modo escuro) deve ser realizada inteiramente no lado do cliente (Front-end);
- O escalonamento visual não deve ocultar elementos de interação, barras de filtros, nem sobrepor marcadores geográficos ou legendas do mapa.

---

## 3. Critérios de Aceitação (Formato BDD)

A seguir, especificam-se os critérios de aceitação para os cenários mais críticos da plataforma:

### Cenário 1: Filtragem Dinâmica de Indicadores
```gherkin
Dado que o visitante está na página principal do Brasil Hub
Quando o visitante seleciona o estado "Minas Gerais" (MG)
E seleciona a dimensão "Educação"
Então o sistema deve consultar a API REST
E retornar os indicadores correspondentes em até 3 segundos
E colorir a Unidade Federativa correspondente no mapa com a faixa de valor adequada
E exibir o indicador, valor numérico, ano de referência e a fonte oficial dos dados.
```

### Cenário 2: Tratamento de Registro sem Valor Coletado
```gherkin
Dado que um indicador para o estado "Acre" (AC) não foi apurado no ano de 2023
Quando o visitante consulta o mapa para o ano de 2023
Então o estado do Acre deve ser renderizado com textura/cor neutra de dado não disponível
E ao clicar no estado, o card de detalhes deve exibir "Não informado"
E em hipótese alguma o valor numérico deve ser exibido como 0 (zero).
```

### Cenário 3: Upload de Arquivo com Inconsistência pelo Administrador
```gherkin
Dado que o administrador está autenticado na área administrativa
Quando ele faz o upload de um arquivo CSV onde uma das linhas possui a sigla de UF "XX" inexistente
Então o validador com Pandas deve abortar a importação
E a base de dados SQLite não deve ter nenhum registro inserido
E o sistema deve retornar status HTTP 422 Unprocessable Entity com a descrição detalhada do erro na linha correspondente.
```

---

## 4. Limites de Escopo do Produto

Para assegurar o cumprimento dos prazos acadêmicos e a qualidade técnica da solução, a Tabela 1 estabelece as fronteiras do produto.

**Tabela 1 — Delimitação de escopo**

| No Escopo do Brasil Hub | Fora do Escopo do Brasil Hub |
|---|---|
| Indicadores agregados no nível de Unidades da Federação (27 UFs). | Indicadores no nível municipal ou distrital (mais de 5.500 municípios). |
| Dimensões fundamentais: Renda, Educação e Longevidade. | Dados clínicos hospitalares, orçamentos municipais em tempo real ou segurança pública detalhada. |
| Upload de arquivos CSV oficiais do IBGE/Ipea por administradores. | Coleta automática via web scraping não supervisionado ou conexões com bancos governamentais legados. |
| Visualização em mapa interativo, tabelas e gráficos comparativos. | Predição por redes neurais complexas ou algoritmos de aprendizado de máquina generativo. |
| Interface web responsiva para navegadores de computadores e celulares. | Aplicativos móveis nativos para Android/iOS em lojas de aplicativos. |

*Fonte: Elaborado pela Equipe Dijkstra (2026).*
