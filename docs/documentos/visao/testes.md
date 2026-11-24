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
- **Resultado realizado:** 
- - Ciclo 1 – Aprovado. 7 passed (python -m pytest tests/test_indicador_service.py -k consultar -v).
```bash
============================= test session starts ==============================
platform linux -- Python 3.13.18, pytest-9.2.0, pluggy-1.7.0 -- /tmp/claude-0/-home-claude/4c38308b-c92f-5f8c-99ff-0698480414e2/scratchpad/venv/bin/python
rootdir: /home/claude/fga0138-mds-ajax/2026.2-t02-dijkstra
plugins: anyio-4.16.0
collecting ... collected 24 items / 17 deselected / 7 selected
tests/test_indicador_service.py::test_consultar_repassa_filtros_ao_repositorio PASSED [ 14%]
tests/test_indicador_service.py::test_consultar_organizacao_dos_indicadores PASSED [ 28%]
tests/test_indicador_service.py::test_consultar_organizacao_multiplos_periodos_e_estados PASSED [ 42%]
tests/test_indicador_service.py::test_consultar_preservacao_de_valores_e_periodos PASSED [ 57%]
tests/test_indicador_service.py::test_consultar_tratamento_valores_ausentes_e_zero PASSED [ 71%]
tests/test_indicador_service.py::test_consultar_com_dados_conhecidos_de_teste PASSED [ 85%]
tests/test_indicador_service.py::test_consultar_sem_resultados_retorna_lista_vazia PASSED [100%]
======================= 7 passed, 17 deselected in 0.55s =======================

```
- **Reparo:** Nenhum
- **Ciclo:** 1

### TC-02 — Consultar filtros pela API

- **Backlog:** B-02
- **Nível:** Integração
- **Objetivo:** Verificar a integração entre parâmetro enviado e resultado do endpoint FastAPI.
- **Pré-condição:** Endpoint e filtros implementados; fixture carregada; cliente de teste configurado; parâmetros válidos e inválidos definidos.
- **Resultado esperado:** Requisição válida retorna status e estrutura esperados e somente os registros filtrados. Parâmetro inválido gera erro controlado conforme a API, sem retornar resultado enganoso. Rejeitar se resposta, registros ou tratamento de erro divergirem do esperado.
- **Resultado realizado:**
- - Ciclo 1 – Aprovado. 58 passed. (python -m pytest tests/test_funcionalidade_api.py -v -k "integracao_consulta or integracao_preservacao or integracao_contrato or filtros_validos or sem_resultados or parametros_invalidos or validacao_ or filtros_combinados or sucesso_busca or estrutura_exata or parametro_desconhecido or todas_as_dimensoes or periodo_nos_limites or requisicao_sem_parametros")
```bash
============================= test session starts ==============================
platform linux -- Python 3.13.18, pytest-9.2.0, pluggy-1.7.0 -- /tmp/claude-0/-home-claude/4c38308b-c92f-5f8c-99ff-0698480414e2/scratchpad/venv/bin/python
rootdir: /home/claude/fga0138-mds-ajax/2026.2-t02-dijkstra
plugins: anyio-4.16.0
collecting ... collected 96 items / 38 deselected / 58 selected
tests/test_funcionalidade_api.py::test_validacao_estado_vazio PASSED     [  1%]
tests/test_funcionalidade_api.py::test_validacao_dimensao_invalida_ou_vazia PASSED [  3%]
tests/test_funcionalidade_api.py::test_validacao_periodo_nao_inteiro PASSED [  5%]
tests/test_funcionalidade_api.py::test_validacao_periodo_maior PASSED    [  6%]
tests/test_funcionalidade_api.py::test_validacao_multiplos_erros_estado_e_periodo PASSED [  8%]
tests/test_funcionalidade_api.py::test_validacao_estado_minusculo_rejeitado PASSED [ 10%]
tests/test_funcionalidade_api.py::test_requisicao_sem_parametros_retorna_200 PASSED [ 12%]
tests/test_funcionalidade_api.py::test_sucesso_busca_indicadores_via_http PASSED [ 13%]
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=AC-filtros0] PASSED [ 15%]
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=SP&dimensao=idhm_geral-filtros1] PASSED [ 17%]
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=DF&periodo=2010-filtros2] PASSED [ 18%]
tests/test_funcionalidade_api.py::test_b05_filtros_validos[dimensao=educacao&periodo=2000-filtros3] PASSED [ 20%]
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=AC&dimensao=educacao&periodo=1991-filtros4] PASSED [ 22%]
tests/test_funcionalidade_api.py::test_b05_consulta_sem_resultados[estado=AC&dimensao=educacao&periodo=2026] PASSED [ 24%]
tests/test_funcionalidade_api.py::test_b05_consulta_sem_resultados[estado=AC&periodo=1995] PASSED [ 25%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=] PASSED [ 27%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=sp] PASSED [ 29%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=CA] PASSED [ 31%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[dimensao=] PASSED [ 32%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=ab] PASSED [ 34%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=2029] PASSED [ 36%]
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=1850] PASSED [ 37%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[A] PASSED [ 39%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[ACX] PASSED [ 41%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[XX] PASSED [ 43%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[ac] PASSED [ 44%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[Ac] PASSED [ 46%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[ AC] PASSED [ 48%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[AC ] PASSED [ 50%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[12] PASSED [ 51%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[A C] PASSED [ 53%]
tests/test_funcionalidade_api.py::test_validacao_estado_formatos_invalidos[BR] PASSED [ 55%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[1990-greater_than_equal] PASSED [ 56%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[2027-less_than_equal] PASSED [ 58%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[0-greater_than_equal] PASSED [ 60%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[-1991-greater_than_equal] PASSED [ 62%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[1991.5-int_parsing] PASSED [ 63%]
tests/test_funcionalidade_api.py::test_validacao_periodo_limites_e_tipos_invalidos[abc-int_parsing] PASSED [ 65%]
tests/test_funcionalidade_api.py::test_indicadores_parametro_desconhecido_e_ignorado PASSED [ 67%]
tests/test_funcionalidade_api.py::test_indicadores_sem_resultados_retorna_lista_vazia[estado=RR] PASSED [ 68%]
tests/test_funcionalidade_api.py::test_indicadores_sem_resultados_retorna_lista_vazia[estado=AC&dimensao=educacao&periodo=2026] PASSED [ 70%]
tests/test_funcionalidade_api.py::test_estrutura_exata_da_resposta_indicadores PASSED [ 72%]
tests/test_funcionalidade_api.py::test_periodo_nos_limites_e_aceito[1991] PASSED [ 74%]
tests/test_funcionalidade_api.py::test_periodo_nos_limites_e_aceito[2026] PASSED [ 75%]
tests/test_funcionalidade_api.py::test_todas_as_dimensoes_validas_sao_aceitas[idhm_geral] PASSED [ 77%]
tests/test_funcionalidade_api.py::test_todas_as_dimensoes_validas_sao_aceitas[educacao] PASSED [ 79%]
tests/test_funcionalidade_api.py::test_todas_as_dimensoes_validas_sao_aceitas[longevidade] PASSED [ 81%]
tests/test_funcionalidade_api.py::test_todas_as_dimensoes_validas_sao_aceitas[renda] PASSED [ 82%]
tests/test_funcionalidade_api.py::test_filtros_combinados_chegam_ao_servico_com_tipos_corretos PASSED [ 84%]
tests/test_funcionalidade_api.py::test_integracao_consulta_estrutura_tabela_e_grafico PASSED [ 86%]
tests/test_funcionalidade_api.py::test_integracao_consulta_filtros_disponiveis[estado=SP-4-dimensoes_esperadas0] PASSED [ 87%]
tests/test_funcionalidade_api.py::test_integracao_consulta_filtros_disponiveis[dimensao=renda-2-dimensoes_esperadas1] PASSED [ 89%]
tests/test_funcionalidade_api.py::test_integracao_consulta_filtros_disponiveis[periodo=2021-4-dimensoes_esperadas2] PASSED [ 91%]
tests/test_funcionalidade_api.py::test_integracao_consulta_filtros_disponiveis[estado=SP&periodo=2021-4-dimensoes_esperadas3] PASSED [ 93%]
tests/test_funcionalidade_api.py::test_integracao_consulta_filtros_disponiveis[estado=SP&dimensao=renda&periodo=2021-1-dimensoes_esperadas4] PASSED [ 94%]
tests/test_funcionalidade_api.py::test_integracao_preservacao_valores_ausentes_e_zero PASSED [ 96%]
tests/test_funcionalidade_api.py::test_integracao_consulta_sem_resultados_retorna_200_lista_vazia PASSED [ 98%]
tests/test_funcionalidade_api.py::test_integracao_contrato_dados_para_tabela_e_grafico PASSED [100%]
=============================== warnings summary ===============================
../../../../tmp/claude-0/-home-claude/4c38308b-c92f-5f8c-99ff-0698480414e2/scratchpad/venv/lib/python3.13/site-packages/fastapi/testclient.py:1
  /tmp/claude-0/-home-claude/4c38308b-c92f-5f8c-99ff-0698480414e2/scratchpad/venv/lib/python3.13/site-packages/fastapi/testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa
-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
================= 58 passed, 38 deselected, 1 warning in 1.04s =================

```
- **Reparo:** Nenhum
- **Ciclo:** 1

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
- **Resultado realizado:**
- - Ciclo 1 – Aprovado. 15/15 casos aprovados (pytest -k "test_b05" -s -v).
```bash
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_b05" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 153 items / 138 deselected / 15 selected

tests/test_funcionalidade_api.py::test_b05_dados_corretos_e_desempenho
[B-05] commit=df2fc41 registros=50000 mediana=0.0055s max=0.0058s limite=3.0s
| Commit | Ambiente | Registros | Operação | Mediana | Máximo | Esperado | Obtido |
|---|---|---|---|---|---|---|---|
| df2fc41 | Linux 7.3.4-arch1-2 / Python 3.14.10 | 50000 | `GET /api/indicadores?estado=AC&dimensao=educacao&periodo=1991` | 0.0055s | 0.0058s | 310 registros, <= 3.0s | 310 registros, 0.0058s |
PASSED
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=AC-filtros0] PASSED
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=SP&dimensao=idhm_geral-filtros1] PASSED
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=DF&periodo=2010-filtros2] PASSED
tests/test_funcionalidade_api.py::test_b05_filtros_validos[dimensao=educacao&periodo=2000-filtros3] PASSED
tests/test_funcionalidade_api.py::test_b05_filtros_validos[estado=AC&dimensao=educacao&periodo=1991-filtros4] PASSED
tests/test_funcionalidade_api.py::test_b05_consulta_sem_resultados[estado=AC&dimensao=educacao&periodo=2026] PASSED
tests/test_funcionalidade_api.py::test_b05_consulta_sem_resultados[estado=AC&periodo=1995] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=sp] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[estado=CA] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[dimensao=] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=ab] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=2029] PASSED
tests/test_funcionalidade_api.py::test_b05_parametros_invalidos_retornam_422_sem_consultar[periodo=1850] PASSED

============================================================= warnings summary ==============================================================
.venv/lib/python3.14/site-packages/fastapi/testclient.py:1
  /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/lib/python3.14/site-packages/fastapi/testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=============================================== 15 passed, 138 deselected, 1 warning in 0.87s ===============================================

```
- **Reparo:** Nenhum
- **Ciclo:** 1

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
- **Resultado realizado:**
- - Ciclo 1 – Reprovado (python -m pytest -k "test_login" -s -v)
    (python -m pytest -k "test_rota_protegida" -s -v)
    (python -m pytest -k "test_autenticacao" -s -v).
```bash
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_login" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 153 items / 142 deselected / 11 selected

tests/test_funcionalidade_api.py::test_login_com_credenciais_validas PASSED
tests/test_funcionalidade_api.py::test_login_com_credenciais_invalidas[admin-senha_incorreta] PASSED
tests/test_funcionalidade_api.py::test_login_com_credenciais_invalidas[usuario_inexistente-senha-de-teste] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo0] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo1] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo2] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo3] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo4] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[-senha-de-teste] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[admin-] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[   -   ] PASSED

============================================================= warnings summary ==============================================================
.venv/lib/python3.14/site-packages/fastapi/testclient.py:1
  /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/lib/python3.14/site-packages/fastapi/testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=============================================== 11 passed, 142 deselected, 1 warning in 3.96s ===============================================
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_rota_protegida" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 153 items / 152 deselected / 1 selected

tests/test_funcionalidade_api.py::test_rota_protegida_sem_autenticacao PASSED

============================================================= warnings summary ==============================================================
.venv/lib/python3.14/site-packages/fastapi/testclient.py:1
  /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/lib/python3.14/site-packages/fastapi/testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=============================================== 1 passed, 152 deselected, 1 warning in 0.81s ================================================
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_autenticacao" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 153 items / 150 deselected / 3 selected

tests/test_auth_service.py::test_autenticacao_sucesso PASSED
tests/test_auth_service.py::test_autenticacao_senha_incorreta PASSED
tests/test_auth_service.py::test_autenticacao_usuario_inexistente PASSED

============================================================= warnings summary ==============================================================
.venv/lib/python3.14/site-packages/fastapi/testclient.py:1
  /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/lib/python3.14/site-packages/fastapi/testclient.py:1: StarletteDeprecationWarning: Using `httpx` with `starlette.testclient` is deprecated; install `httpx2` instead.
    from starlette.testclient import TestClient as TestClient  # noqa

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
=============================================== 3 passed, 150 deselected, 1 warning in 1.43s ================================================

```
- - Ciclo 2 – Aprovado. A execução automatizada via pytest aprovou 16/16 testes (python -m pytest -k "test_login" -s -v)
    (python -m pytest -k "test_rota_protegida" -s -v)
    (python -m pytest -k "test_autenticacao" -s -v)
    (python -m pytest -k "test_senha_administrativa" -s -v).
```bash
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_login" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 154 items / 143 deselected / 11 selected

tests/test_funcionalidade_api.py::test_login_com_credenciais_validas PASSED
tests/test_funcionalidade_api.py::test_login_com_credenciais_invalidas[admin-senha_incorreta] PASSED
tests/test_funcionalidade_api.py::test_login_com_credenciais_invalidas[usuario_inexistente-senha-de-teste] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo0] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo1] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo2] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo3] PASSED
tests/test_funcionalidade_api.py::test_login_com_corpo_json_malformado_retorna_422[corpo4] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[-senha-de-teste] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[admin-] PASSED
tests/test_funcionalidade_api.py::test_login_com_campos_vazios_retorna_401[   -   ] PASSED

==================================================== 11 passed, 143 deselected in 4.07s =====================================================
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_rota_protegida" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 154 items / 153 deselected / 1 selected

tests/test_funcionalidade_api.py::test_rota_protegida_sem_autenticacao PASSED

===================================================== 1 passed, 153 deselected in 0.81s =====================================================
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_autenticacao" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 154 items / 151 deselected / 3 selected

tests/test_auth_service.py::test_autenticacao_sucesso PASSED
tests/test_auth_service.py::test_autenticacao_senha_incorreta PASSED
tests/test_auth_service.py::test_autenticacao_usuario_inexistente PASSED

===================================================== 3 passed, 151 deselected in 1.43s =====================================================
(.venv) [eduardo@arch 2026.2-T02-Dijkstra]$ python -m pytest -k "test_senha_administrativa" -s -v
============================================================ test session starts ============================================================
platform linux -- Python 3.14.10, pytest-9.2.0, pluggy-1.7.0 -- /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra/.venv/bin/python
cachedir: .pytest_cache
rootdir: /home/eduardo/Programing/MDS/2026.2-T02-Dijkstra
plugins: anyio-4.16.0
collected 154 items / 153 deselected / 1 selected

tests/test_funcionalidade_api.py::test_senha_administrativa_nao_fica_legivel_no_banco PASSED

===================================================== 1 passed, 153 deselected in 0.81s =====================================================

```
- **Reparo:** 
- - Faltou consulta SQL direta (SELECT) ao registro persistido no schema temporário do PostgreSQL para comprovar que a senha não fica legível em texto aberto no banco, conforme exigido no TC-08. Pendência registrada na Issue #82.
- - - Concluído: teste de leitura direta no PostgreSQL implementado no commit 9e27515.
- **Ciclo:** 2

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
