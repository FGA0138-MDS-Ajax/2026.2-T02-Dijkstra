# 2. Representação Arquitetural

## 2.1 Definições

O Brasil Hub adota o estilo arquitetural Cliente-Servidor em Camadas (*Three-Tier Architecture*), estruturado em três níveis lógicos fundamentais: apresentação, aplicação e persistência.

A camada de apresentação corresponde ao Front-end executado no navegador do usuário; a camada de aplicação corresponde ao Back-end desenvolvido em Python utilizando a API RESTful implementada com o framework FastAPI; e a camada de persistência corresponde ao sistema gerenciador de banco de dados relacional.

A separação estrita entre essas camadas tem como objetivo principal reduzir o acoplamento entre a interface de usuário, as regras de negócio, a validação de dados e os mecanismos de armazenamento físico, promovendo modularidade, manutenibilidade e testabilidade independente dos componentes (BASS; CLEMENTS; KAZMAN, 2021; SOMMERVILLE, 2018).

A comunicação entre a camada de apresentação (cliente) e a camada de aplicação (servidor) é estabelecida pelo protocolo HTTP/HTTPS, aderindo aos princípios arquiteturais do modelo REST (FIELDING, 2000). As requisições e respostas estruturadas utilizam a notação JSON (*JavaScript Object Notation*), enquanto o envio de lotes de dados brutos por administradores é realizado por meio do padrão de codificação `multipart/form-data`.

Por definição arquitetural, a camada de apresentação não possui qualquer canal de comunicação direto com o banco de dados. Qualquer operação de leitura ou escrita deve ser obrigatoriamente intermediada pela camada de aplicação, permitindo que a integridade transacional, a validação de parâmetros, as políticas de segurança e a autorização de acessos sejam aplicadas de forma centralizada (SOMMERVILLE, 2018).

## 2.2 Justificativa da escolha

A seleção da arquitetura Cliente-Servidor em Camadas decorre diretamente dos requisitos e restrições estabelecidos no Documento de Visão e Projeto (GRUPO DIJKSTRA, 2026):

1. **Atendimento ao Desempenho (Requisito B-05):** O requisito B-05 estipula que as respostas às consultas de indicadores socioeconômicos devem ocorrer em até 3 segundos. A dissociação entre cliente e servidor viabiliza o emprego de Python e Pandas na camada de aplicação para execução de operações vetorizadas em memória e agregação de dados tabulares com alta performance, enquanto o FastAPI gerencia requisições assíncronas concorrentes de baixa latência, retornando exclusivamente cargas úteis JSON otimizadas para o cliente.
2. **Segurança e Validação no Servidor (Requisitos B-04 e B-09):** O requisito B-04 exige a ingestão de arquivos CSV governamentais com garantia estrita de integridade estrutural, e o requisito B-09 impõe que credenciais administrativas nunca circulem ou residam desprotegidas. Manter a lógica de validação, parsing com Pandas e hashing de senhas isoladas na camada de aplicação impede que código malicioso ou arquivos corrompidos afetem diretamente o armazenamento, assegurando que o Front-end permaneça como uma casca de visualização sem privilégios de persistência.
3. **Compatibilidade Multiplataforma e Responsividade (Requisito B-08):** O requisito B-08 estabelece suporte pleno a dispositivos a partir de 360 pixels de largura e navegadores modernos (Chrome, Firefox, Edge). O desacoplamento permite que a interface cliente seja construída com tecnologias web puras (HTML5, CSS3, JavaScript e Leaflet), operando de maneira leve e nativa no motor de renderização do cliente sem a sobrecarga de renderização server-side, garantindo fluidez e rápida resposta visual em telas reduzidas.
4. **Alinhamento com a Estrutura da Equipe:** A segregação em camadas viabiliza o desenvolvimento paralelo entre as duplas de trabalho da equipe Dijkstra (frente de interface e frente de dados/API), minimizando dependências de código e conflitos de integração durante as Sprints de desenvolvimento.

A camada de persistência centraliza o armazenamento estruturado dos indicadores socioeconômicos e das credenciais administrativas com controle de concorrência e integridade transacional (ver nota de atualização na Seção 2.6 quanto à especificação técnica do PostgreSQL).

## 2.3 Detalhamento

A arquitetura do Brasil Hub divide-se formalmente em três camadas:

1. **Camada de Apresentação (Front-end):** Responsável pela interface gráfica com o usuário, renderização vetorial do mapa temático do Brasil, aplicação de filtros visuais, controle dos temas de acessibilidade e disponibilização do formulário seguro de autenticação e upload de arquivos para administradores.
2. **Camada de Aplicação (Back-end):** Centralizada no framework FastAPI, orquestra o roteamento HTTP, valida contratos de dados via schemas, executa a autenticação e autorização e aciona os serviços de processamento analítico com Pandas.
3. **Camada de Persistência (Banco de Dados):** Responsável pela integridade e persistência de dados das tabelas de indicadores socioeconômicos tratados e de usuários administradores com credenciais armazenadas com hash.

A disposição estrutural desses níveis e o fluxo de dados entre os componentes do sistema estão representados no diagrama arquitetural da Figura 1.

### Diagrama arquitetural

**Figura 1 — Diagrama Arquitetural Genérico**

![alt text](assets/diagrama-arquitetural.png)

*Fonte: Elaborado por Lucas Nery (2026).*

### 2.3.1 Descrição do Diagrama Arquitetural

Conforme ilustrado na Figura 1, o sistema organiza-se em camadas lineares e adjacentes. Cada camada possui limites funcionais rigorosamente delimitados e comunica-se exclusivamente com a camada contígua por meio de interfaces explícitas e contratos de dados formalizados. Esse arranjo assegura a separação de responsabilidades, eleva a segurança no acesso aos dados e simplifica a manutenibilidade e a evolução do código-fonte (BASS; CLEMENTS; KAZMAN, 2021; SOMMERVILLE, 2018).

Os atores do sistema interagem exclusivamente com a Camada de Apresentação:
- **Visitante:** consome as rotas públicas de consulta de indicadores e controle visual;
- **Administrador:** autentica-se para obter permissões de gerenciamento e envio de dados brutos.

Os módulos e componentes que constituem a arquitetura do Brasil Hub, bem como suas respectivas tecnologias e contratos de entrada e saída, estão detalhados na Tabela 3.

#### Componentes da arquitetura

**Tabela 3 — Componentes da arquitetura**

| Componente | Tecnologia | Responsabilidade | Entrada | Saída |
|---|---|---|---|---|
| Interface Web | JavaScript / Leaflet | Interação com usuários, mapa interativo, filtros e acessibilidade | Ações do usuário | Requisições HTTP e apresentação dos resultados |
| Controlador da API | FastAPI | Roteamento, validação de requisições e exposição de contratos REST | Requisições HTTP (JSON / multipart) | Respostas JSON e códigos de status HTTP |
| Serviço de Indicadores | Python | Coordenação de consultas analíticas e filtros territoriais | Parâmetros de estado, dimensão e período | Registros e agregações de indicadores |
| Serviço de Atualização | Python / Pandas | Orquestração do fluxo de ingestão e atualização da base | Arquivo CSV do administrador | Relatório de validação e confirmação de persistência |
| Módulo de Autenticação | Python / bcrypt | Verificação de credenciais e emissão de tokens de autorização | Usuário e senha em texto simples | Token de sessão ou recusa de acesso |
| Processador de Dados | Pandas | Leitura, validação estrutural, limpeza e padronização | Arquivo CSV bruto / DataFrame | DataFrame sanitizado e validado |
| Banco de Dados | PostgreSQL | Persistência transacional de indicadores e credenciais | Comandos e consultas SQL estruturadas | Conjuntos de registros persistidos |

*Fonte: Elaborado por Josef Wojtyla (2026).*

#### Exemplos concretos de comunicação da API REST

Para exemplificar a troca de mensagens entre a camada de apresentação e a camada de aplicação por meio da interface REST, apresentam-se a seguir os contratos de dados de uma consulta de indicadores com filtro e de um upload administrativo de arquivo CSV.

##### Exemplo 1: Consulta de indicadores com filtro dinâmico (Requisitos B-01, B-02 e B-05)

Um visitante seleciona a Unidade Federativa "São Paulo" (SP) e a dimensão "renda" na interface web. O cliente dispara uma requisição HTTP via método `GET`:

```http
GET /api/indicadores?estado=SP&dimensao=renda HTTP/1.1
Host: brasilhub.vercel.app
Accept: application/json
```

O controlador da API valida os parâmetros de consulta e aciona o Serviço de Indicadores, retornando o código de status HTTP `200 OK` acompanhado do payload JSON estruturado:

```json
{
  "sucesso": true,
  "filtros_aplicados": {
    "estado": "SP",
    "dimensao": "renda"
  },
  "total_registros": 1,
  "dados": [
    {
      "id": 35001,
      "codigo_uf": 35,
      "estado": "SP",
      "dimensao": "renda",
      "indicador": "Rendimento médio per capita",
      "periodo_referencia": "2023",
      "valor": 2492.00,
      "unidade_medida": "R$",
      "fonte": "IBGE - PNAD Contínua"
    }
  ]
}
```

##### Exemplo 2: Upload de dados pelo administrador (Requisitos B-04 e B-09)

O administrador autenticado envia um arquivo CSV contendo atualizações socioeconômicas por meio da área administrativa. O cliente dispara uma requisição HTTP via método `POST` com codificação multipart:

```http
POST /api/admin/indicadores/upload HTTP/1.1
Host: brasilhub.vercel.app
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="arquivo"; filename="indicadores_educacao_2024.csv"
Content-Type: text/csv

uf,dimensao,indicador,ano,valor,unidade,fonte
SP,educacao,Taxa de Alfabetizacao,2024,96.8,%,IBGE - Censo
RJ,educacao,Taxa de Alfabetizacao,2024,95.9,%,IBGE - Censo
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

A API intercepta a requisição, valida o token de autorização, encaminha o arquivo para processamento no Pandas e, após validação e persistência atômica, retorna a resposta com o código de status HTTP `201 Created`:

```json
{
  "sucesso": true,
  "mensagem": "Arquivo processado e base de dados atualizada com sucesso.",
  "detalhes": {
    "arquivo": "indicadores_educacao_2024.csv",
    "linhas_processadas": 2,
    "linhas_inseridas": 2,
    "erros_encontrados": 0
  }
}
```

### 2.3.2 Modelo de persistência

(ver nota de atualização na Seção 2.6 quanto à utilização do PostgreSQL no ambiente operacional).

O modelo de persistência do Brasil Hub atende à necessidade de armazenar de forma íntegra os dados socioeconômicos tratados e as credenciais de autenticação administrativa.

O acesso ao banco de dados é estritamente encapsulado pelo módulo de repositório (`src/database`), isolando a camada de aplicação de especificidades dialetais de SQL e facilitando a realização de testes com bancos em memória ou simulações via mocks.

A estrutura lógica mínima da base de dados contempla duas tabelas principais, cujos campos e propósitos estão sintetizados na Tabela 3.1:

**Tabela 3.1 — Estruturas mínimas de persistência**

| Tabela | Campo | Tipo de Dado | Restrição | Descrição |
|---|---|---|---|---|
| `administradores` | `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador unívoco do administrador |
| `administradores` | `usuario` | VARCHAR(50) | UNIQUE, NOT NULL | Nome de usuário para acesso à área restrita |
| `administradores` | `password_hash` | VARCHAR(255) | NOT NULL | Hash criptográfico da senha (gerado com bcrypt) |
| `administradores` | `criado_em` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Data e hora de cadastramento do registro |
| `indicadores` | `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador unívoco do registro de indicador |
| `indicadores` | `codigo_uf` | INTEGER | NOT NULL | Código numérico da UF segundo padrão IBGE (ex: 35) |
| `indicadores` | `estado` | VARCHAR(2) | NOT NULL | Sigla da Unidade Federativa (ex: SP, DF, RJ) |
| `indicadores` | `dimensao` | VARCHAR(30) | NOT NULL | Dimensão temática (renda, educacao, longevidade) |
| `indicadores` | `indicador` | VARCHAR(100) | NOT NULL | Nome do índice socioeconômico |
| `indicadores` | `periodo_referencia` | VARCHAR(10) | NOT NULL | Ano ou intervalo de coleta do indicador (ex: 2023) |
| `indicadores` | `valor` | NUMERIC(12,4) | NOT NULL | Valor numérico apurado para o indicador |
| `indicadores` | `unidade_medida` | VARCHAR(20) | NOT NULL | Unidade do valor apurado (ex: R$, %, anos) |
| `indicadores` | `fonte` | VARCHAR(80) | NOT NULL | Instituição governamental de origem (ex: IBGE) |

*Fonte: Elaborado por Josef Wojtyla (2026).*

Em hipótese alguma a senha do administrador em texto simples é gravada em banco, atendendo ao requisito B-09 de segurança.

## 2.4 Metas e restrições arquiteturais

As metas e restrições técnicas do Brasil Hub derivam dos requisitos funcionais e não funcionais estabelecidos no Documento de Visão e Projeto (GRUPO DIJKSTRA, 2026), visando assegurar estabilidade, segurança e manutenibilidade:

1. **Comunicação estrita por API REST:** A troca de dados entre Front-end e Back-end ocorre exclusivamente via requisições HTTP/HTTPS padronizadas conforme o modelo REST (FIELDING, 2000). Operações de recuperação de indicadores usam o método `GET`, enquanto operações autenticadas de submissão e atualização usam o método `POST`.
2. **Formato dos Dados:** As saídas estruturadas da API utilizam exclusivamente payloads em formato JSON, com codificação de caracteres em UTF-8. O tráfego de arquivos brutos de indicadores utiliza `multipart/form-data`.
3. **Desempenho da Aplicação (B-05):** As requisições de consulta de dados filtrados devem ser processadas e respondidas pela API em um tempo limite de até 3 segundos em ambiente estável, minimizando o tempo de espera do usuário e garantindo resposta ágil do mapa interativo.
4. **Compatibilidade e Responsividade (B-08):** A interface deve renderizar adequadamente e manter suas funções de interação em telas com resolução horizontal mínima a partir de 360 pixels, assegurando compatibilidade homogênea nos navegadores Google Chrome, Mozilla Firefox e Microsoft Edge.
5. **Segurança de Credenciais (B-09):** Senhas administrativas não devem ser trafegadas sem criptografia em repouso nem salvas em texto claro no banco de dados. O armazenamento deve empregar hash gerado com algoritmo robusto (`bcrypt`) e salt criptográfico. O acesso às rotas restritas de envio de arquivos exige validação de token de sessão.
6. **Padronização de Código Back-end:** Todo o desenvolvimento em linguagem Python é orientado pelas diretrizes de estilo da norma PEP 8 (VAN ROSSUM; WARSAW; COGHLAN, 2001), adotando a convenção `snake_case` para nomes de variáveis e funções, e `PascalCase` para declaração de classes.
7. **Padronização de Código Front-end:** O código JavaScript é submetido à verificação estática automatizada através da ferramenta ESLint (ESLINT, 2026), respeitando a nomenclatura `camelCase` para métodos e variáveis e `UPPER_SNAKE_CASE` para constantes.
8. **Controle de Versão e Ciclo de Releases:** As alterações de código são desenvolvidas em branches específicas de funcionalidade (`feature/`), integradas à branch `developer` mediante aprovação em Pull Request com revisão cruzada de código por pares. As versões estáveis são promovidas para a branch `main`, na qual as releases do projeto são formalmente sinalizadas por tags semânticas (`R1`, `R2` e `R3`), conforme definido na Seção 6.1 do Documento de Visão e Projeto (GRUPO DIJKSTRA, 2026).
