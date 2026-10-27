# 6. Testes de Software

## 6.1. Estratégia de testes

O objetivo destes testes é verificar de forma repetível se o software Brasil Hub filtra, processa e apresenta corretamente os dados socioeconômicos definidos no backlog, incluindo valores, localidade, período, fonte e estado de ausência do dado. Também verifica os requisitos de acessibilidade, responsividade, desempenho e segurança previstos para o produto. Os testes serão ligados aos requisitos do backlog e executados antes da entrega de cada incremento.

Serão usados três níveis de teste:

- **Unitário:** verifica uma função isolada, como a limpeza ou validação dos dados. No back-end, pode ser feito com Pytest e dados de teste preparados pela equipe.
- **Integração:** verifica se partes do sistema funcionam juntas, como a API FastAPI e o código que aplica os filtros.
- **Sistema:** verifica o Brasil Hub em funcionamento, pela interface. Inclui testar filtros, mapas, acessibilidade e outros recursos previstos para a versão. (IEEE COMPUTER SOCIETY, 2024).

Os testes funcionais verificam se cada recurso faz o que foi pedido. Os testes não funcionais verificam aspectos como desempenho, segurança e funcionamento em diferentes tamanhos de tela e navegadores.

Os testes unitários e de integração devem ser executados durante o desenvolvimento. Antes de cada entrega, a equipe deve testar a versão completa em um ambiente de homologação, separado da versão usada pelo público. Cada registro deve informar a versão ou commit, o ambiente, a data, quem testou e os dados utilizados.

O resultado será aprovado quando o que aconteceu corresponder ao resultado esperado e houver evidência. Será reprovado quando houver diferença; nesse caso, a equipe registra o defeito, corrige o sistema e executa o teste novamente, anotando cada tentativa. Será bloqueado se não puder ser executado por falta de ambiente ou dado. Se ainda não foi realizado, deve constar como não executado — não como aprovado.

O código segue a política de branches: a branch `develop` guarda a versão estável e só recebe alterações por pull request revisado; o trabalho é feito em branches nomeadas `feature/B-XX-nome`, e os commits seguem o padrão Conventional Commits (`feat`, `fix`, `docs`, `test`). Cada pull request gera um ambiente de homologação para os testes; a branch `main` é atualizada a partir da `develop` ao final de cada Sprint.

## 6.2. Roteiro de teste

Os casos TC-01 a TC-08 cobrem os itens classificados como MUST no backlog atual. Os casos TC-09 a TC-12 correspondem a itens SHOULD/COULD e só se aplicam se essas funcionalidades forem implementadas. “Resultado realizado” permanece não executado até que a equipe realize e registre cada teste.

### Regras para preencher “Resultado realizado”, “Reparo” e “Ciclo”

1. Antes de executar: deixe “Resultado realizado” como **Não executado**, “Reparo” como **Nenhum** e “Ciclo” como **0**. Zero significa que o caso ainda não foi testado.
2. Na primeira execução: assim que rodar o teste, registre o que aconteceu em “Resultado realizado” e mude “Ciclo” de 0 para 1 — mesmo que o teste passe. Anote a evidência, como log, captura de tela ou arquivo. Se passou, escreva **Aprovado**; se não passou, escreva **Reprovado** e descreva a diferença em relação ao esperado.
3. Se reprovou: registre o defeito em “Reparo” (ou o número/link da issue) e corrija-o. Não apague o resultado da primeira tentativa: mantenha-o no histórico de execução.
4. A cada nova execução do mesmo teste após uma correção: aumente o ciclo em 1. Por exemplo: primeira execução = ciclo 1 (reprovado); depois do reparo, primeira repetição = ciclo 2 (aprovado). Registre o novo resultado e evidências. Se houver outra falha e outro reteste, continue: ciclo 3, ciclo 4 etc.
5. Se passar de primeira: registre **Aprovado** e ciclo 1; não é preciso fazer outro ciclo, a menos que uma mudança posterior no sistema exija testar novamente.
6. Se não puder executar: marque **Bloqueado**, informe o motivo e mantenha o ciclo em 0, pois nenhuma execução ocorreu. Bloqueado não significa aprovado.

Para garantir o atendimento pleno aos requisitos do Backlog, a Tabela 19 apresenta o roteiro formal de casos de teste, englobando validações de nível unitário, de integração e de sistema. O tipo (funcional ou não funcional) de cada caso é o do requisito associado na Tabela 13.

**Tabela 19 — Roteiro de testes.**  
**Sistema:** Brasil HUB — Roteiro de testes.

### TC-01 — Filtrar dados por indicador e localidade

- **Backlog:** B-02
- **Nível:** Unitário
- **Objetivo:** Verificar se a lógica de filtro retorna somente os registros selecionados.
- **Pré-condição:** Função de filtro implementada; fixture pequena com pelo menos duas UFs, mais de um indicador e resultados esperados definidos.
- **Resultado esperado:** Para cada combinação de localidade/indicador, a função retorna exatamente os registros da fixture que atendem aos filtros; limpar filtros devolve o conjunto previsto. Valores ausentes não são tratados como zero. Rejeitar se houver registro extra, faltante ou valor alterado.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-02 — Consultar filtros pela API

- **Backlog:** B-02
- **Nível:** Integração
- **Objetivo:** Verificar a integração entre parâmetro enviado e resultado do endpoint FastAPI.
- **Pré-condição:** Endpoint e filtros implementados; fixture carregada; cliente de teste configurado; parâmetros válidos e inválidos definidos.
- **Resultado esperado:** Requisição válida retorna status e estrutura esperados e somente os registros filtrados. Parâmetro inválido gera erro controlado conforme a API, sem retornar resultado enganoso. Rejeitar se resposta, registros ou tratamento de erro divergirem do esperado.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-03 — Exibir corretamente os dados no mapa

- **Backlog:** B-01
- **Nível:** Sistema
- **Objetivo:** Verificar a associação entre indicador, valor e UF, incluindo legenda.
- **Pré-condição:** Mapa Leaflet disponível; camada geográfica e fixture com códigos de UF e valores conhecidos; legenda/escala definidas.
- **Resultado esperado:** Cada valor aparece na UF correta e corresponde à faixa indicada na legenda. A seleção ou tooltip mostra indicador, período e unidade previstos. Rejeitar se valor/UF/legenda estiverem incorretos ou se informação essencial estiver ausente.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-04 — Usar as opções de acessibilidade

- **Backlog:** B-03
- **Nível:** Sistema
- **Objetivo:** Verificar tamanho de fonte, modo noturno e alto contraste previstos no requisito.
- **Pré-condição:** Opções implementadas; versão de homologação disponível; checklist simples de verificação aprovado pelo grupo.
- **Resultado esperado:** Cada opção altera a apresentação conforme sua função sem ocultar filtros, mapa, legenda ou valores. Controles essenciais permanecem localizáveis e utilizáveis. Rejeitar se um recurso não funcionar ou tornar informação/controle essencial ilegível ou inacessível.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-05 — Permitir upload de arquivo CSV somente ao administrador

- **Backlog:** B-04
- **Nível:** Sistema
- **Objetivo:** Verificar autenticação, autorização e upload de arquivo válido.
- **Pré-condição:** Arquivos CSV válido e inválido preparados.
- **Resultado esperado:** Administrador autenticado envia CSV válido e a base é atualizada com os registros corretos. Visitante não acessa a função. Arquivo inválido é rejeitado com mensagem clara.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-06 — Responder à consulta de filtro em até 3 segundos

- **Backlog:** B-05
- **Nível:** Integração
- **Objetivo:** Verificar o limite de desempenho declarado no backlog.
- **Pré-condição:** Endpoint de filtro implementado; ambiente, commit, tamanho da base de teste e condições da medição registrados; ponto inicial e final da medição definido.
- **Resultado esperado:** Para uma requisição de filtro com o conjunto de teste definido, o tempo de resposta da API é ≤ 3 segundos. Registrar as medições em condições iguais. Rejeitar se o limite for ultrapassado ou se a resposta rápida contiver dados incorretos.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-07 — Usar o dashboard em navegadores e telas suportadas

- **Backlog:** B-08
- **Nível:** Sistema
- **Objetivo:** Verificar Chrome, Firefox e Edge a partir de 360 px.
- **Pré-condição:** Versão de homologação publicada; Chrome, Firefox e Edge disponíveis; viewport de 360 px e uma largura maior definidos.
- **Resultado esperado:** Em cada navegador e largura, mapa, filtros, textos e controles não ficam sobrepostos ou cortados; funções MUST permanecem utilizáveis. Rejeitar se conteúdo/controle essencial ficar inacessível ou quebrado.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-08 — Proteger a senha administrativa armazenada

- **Backlog:** B-09
- **Nível:** Integração
- **Objetivo:** Verificar que a senha não fica legível no armazenamento.
- **Pré-condição:** Autenticação implementada em ambiente de teste; conta fictícia; método de proteção escolhido e acesso de teste ao registro persistido.
- **Resultado esperado:** A senha original não pode ser lida diretamente no banco/armazenamento, e a autenticação continua funcionando. Rejeitar se a senha estiver em texto aberto ou se o login válido falhar.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-09 — Comparar duas UFs

- **Backlog:** B-06
- **Nível:** Sistema
- **Objetivo:** Verificar se os indicadores comparados são referentes à mesma medida e período.
- **Pré-condição:** Recurso implementado; duas UFs com registros conhecidos e compatíveis na fixture.
- **Resultado esperado:** Os valores apresentados para as duas UFs correspondem à fixture. Unidade e período são indicados; combinações incompatíveis são bloqueadas ou claramente sinalizadas. Rejeitar se valores forem trocados ou comparados sem contexto.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-10 — Manter gráficos e tabela coerentes com os filtros

- **Backlog:** B-10
- **Nível:** Sistema
- **Objetivo:** Verificar a consistência entre as visualizações após a aplicação dos filtros.
- **Pré-condição:** Gráficos e tabela implementados; fixture com valores conhecidos; filtro aplicado.
- **Resultado esperado:** Valores, rótulos e unidades do gráfico e da tabela correspondem à mesma seleção e à fixture. Ausência não aparece como zero. Rejeitar se as visualizações divergirem.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-11 — Apresentar evolução temporal em ordem correta

- **Backlog:** B-07
- **Nível:** Sistema
- **Objetivo:** Verificar a apresentação cronológica dos períodos e seus valores.
- **Pré-condição:** Recurso implementado; fixture com pelo menos três períodos disponíveis para o mesmo indicador e UF.
- **Resultado esperado:** Períodos aparecem em ordem cronológica e os valores coincidem com a fixture. Períodos sem dado não são representados como zero. Rejeitar se período/valor estiver incorreto ou ausência for ocultada.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

### TC-12 — Exportar os dados selecionados

- **Backlog:** B-11
- **Nível:** Sistema
- **Objetivo:** Verificar se o arquivo contém o mesmo conjunto filtrado que a tela.
- **Pré-condição:** Exportação implementada; consulta filtrada com valores e metadados conhecidos; formato definido.
- **Resultado esperado:** Arquivo é válido no formato anunciado e contém somente os registros filtrados, com campos definidos pelo produto (indicador, localidade, período, unidade e fonte). Conteúdo coincide com a tela/fixture. Rejeitar se registros ou valores divergirem.
- **Resultado realizado:** Não executado
- **Reparo:** Nenhum
- **Ciclo:** 0

*Fonte: Elaborado por Fabiana Reis Souza e Ágatha Natasha Vieira (2026).*
