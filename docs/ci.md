# Visão Geral
obejtivo da integração contínua (CI) no projeto: garantir que as alterações feitas no back-end não quebrem funcionalidades existentes.

o workflow criado está no caminho: `.github/workflows/backend-ci.yml`

# Triggers
- `push` nas branches `developer` e `main`
- `PR` direcionado para developer e main

# Dependencias no ambiente
a pipeline utiliza Python (3.12) e instala os pacotes do `requirements.txt`

# Comando de testes
- `python -m pytest`: rodar com o python -m garante o carregamento do módulo

# Consulta de Resultados e Resolução de Falhas
- Ao abrir o Pull Request (PR), visualizar na seção inferior do PR, ícones de check verde ✔️ ou vermelho ❌.
- Na aba actions (à direita da mesma seção que se encontra `code`, `issues`, `Pull requests`...) para inspecionar os logs de execução.
 