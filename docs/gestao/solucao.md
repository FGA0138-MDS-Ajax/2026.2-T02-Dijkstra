# Solução Proposta — Brasil Hub

## 1. Contexto e Problema de Negócio

O acompanhamento e a análise de indicadores socioeconômicos — tais como renda per capita, expectativa de vida e taxas de escolaridade — são fundamentais para o diagnóstico social, o planejamento acadêmico e a elaboração de políticas públicas eficazes no Brasil.

Contudo, o acesso a esses dados enfrenta entraves estruturais significativos nos portais governamentais oficiais (IBGE, Atlas do Desenvolvimento Humano no Brasil, Ipea):

- **Dispersão e Descentralização:** As bases de dados encontram-se espalhadas em múltiplos repositórios com formatos heterogêneos (arquivos CSV brutos com diferentes convenções de cabeçalho, planilhas tabulares extensas e relatórios em PDF estáticos);
- **Barreira Técnica de Tratamento:** Pesquisadores, jornalistas e gestores necessitam baixar arquivos individuais e despender tempo considerável em tarefas manuais de higienização, conversão de tipos e alinhamento de colunas antes de iniciar qualquer análise;
- **Ausência de Visualização Espacial Integrada:** A consulta direta em planilhas dificulta a percepção de disparidades regionais e contrastes entre as Unidades da Federação;
- **Riscos de Interpretação Inadequada:** A ausência de metadados claros (unidade de medida, ano-base, fonte governamental) e a prática incorreta de preencher dados ausentes com o valor zero induzem a erros graves de inferência estatística.

---

## 2. A Solução Brasil Hub

O **Brasil Hub** é uma plataforma web interativa concebida para centralizar, tratar e democratizar a visualização de indicadores socioeconômicos das 27 Unidades da Federação brasileiras, concentrando-se inicialmente nas dimensões fundamentais do desenvolvimento humano: **Renda**, **Educação** e **Longevidade**.

Em vez de exigir o download e a manipulação manual de planilhas complexas, o Brasil Hub entrega ao usuário inteligência visual imediata por meio de:

1. **Mapa Interativo Temático (Leaflet):** Representação cartográfica vetorial do território nacional que permite explorar e identificar padrões geográficos de desenvolvimento com poucos cliques;
2. **Filtros Dinâmicos Multidimensionais:** Seleção simultânea por estado, dimensão temática e período temporal, com retorno ágil de dados;
3. **Pipeline Analítico no Back-end (Pandas):** Automatização de rotinas de validação, higienização e tratamento dos dados antes da exibição, garantindo que valores ausentes sejam sinalizados com transparência (nunca mascarados como zero);
4. **Área Administrativa Segura:** Módulo restrito para que administradores autorizados enviem novos arquivos CSV oficiais, garantindo a atualização contínua e auditada da base;
5. **Acessibilidade Universal:** Controles nativos para ampliação tipográfica, modo noturno e paleta de alto contraste, garantindo navegabilidade inclusiva e responsiva em dispositivos móveis e desktops.

---

## 3. Declaração de Posicionamento do Produto

A Tabela 1 sintetiza a declaração de posicionamento do Brasil Hub em relação às suas alternativas e ao seu público de interesse.

**Tabela 1 — Declaração de posicionamento do produto**

| Elemento | Definição Estratégica |
|---|---|
| **Para** | Pesquisadores acadêmicos, jornalistas de dados, estudantes e gestores públicos. |
| **Que necessitam de** | Superar a barreira técnica de coletar, padronizar e cruzar indicadores socioeconômicos dispersos em portais governamentais. |
| **O Brasil Hub** | É uma plataforma web interativa de consolidação e visualização de indicadores sociais (dashboard analítico). |
| **Que oferece** | Mapeamento temático georreferenciado, filtros dinâmicos, comparativos estaduais e tratamento automatizado de dados. |
| **Ao contrário de** | Portais estáticos e downloads manuais de planilhas governamentais que exigem processamento prévio. |
| **Nosso diferencial é** | A centralização visual integrada, a validação rigorosa de dados no servidor e a experiência acessível diretamente no navegador, sem custo de configuração para o usuário final. |

*Fonte: Elaborado pela Equipe Dijkstra (2026).*

---

## 4. Objetivos do Produto

### 4.1. Objetivo Geral
Desenvolver e disponibilizar um dashboard analítico web para centralizar, tratar e facilitar a exploração comparativa de indicadores socioeconômicos do Brasil, com ênfase no nível estadual (Unidades da Federação).

### 4.2. Objetivos Específicos
1. **Tratamento e Padronização:** Ingerir e validar arquivos oficiais em formato CSV (IBGE/Ipea) por meio de um pipeline no Back-end com Python e Pandas, disponibilizando os dados estruturados via API REST com FastAPI;
2. **Visualização Espacial:** Prover um mapa coroplético/temático interativo utilizando a biblioteca Leaflet, associando faixas de valores a representações cromáticas intuitivas;
3. **Filtros Dinâmicos:** Permitir a consulta parametrizada por Estado (UF), dimensão temática (Renda, Educação, Longevidade) e período temporal com tempo de resposta de até 3 segundos;
4. **Gestão Segura:** Garantir que apenas administradores autenticados possam atualizar a base de dados, empregando hashing seguro de senhas e validação atômica de arquivos;
5. **Inclusão e Responsividade:** Assegurar navegabilidade em telas a partir de 360 pixels de largura e aderência a padrões de acessibilidade (ajuste de fonte e alto contraste).

---

## 5. Arquitetura em Alto Nível

A plataforma opera no modelo **Cliente-Servidor em Três Camadas (Three-Tier)**:

```
[ Navegador do Usuário / Leaflet ]
              │ (HTTP / JSON / REST)
              ▼
    [ API Back-end / FastAPI ]
              │ (Chamadas de Serviço)
              ▼
[ Processamento com Pandas & Validação ]
              │ (SQL / Repositórios)
              ▼
       [ Banco SQLite ]
```

- **Apresentação:** HTML5, CSS3 e JavaScript puro com a biblioteca Leaflet, consumindo a API REST de forma assíncrona;
- **Aplicação:** Framework FastAPI em Python, estruturado em serviços de aplicação, controladores de rotas, esquemas de validação (Pydantic) e rotinas analíticas com Pandas;
- **Persistência:** Banco relacional SQLite encapsulado em repositórios dedicados (`src/database`), garantindo portabilidade, simplicidade operacional e integridade dos dados armazenados.
