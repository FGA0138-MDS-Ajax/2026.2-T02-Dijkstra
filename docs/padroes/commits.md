# Padrão de Commits

> **Padrão adotado:** Conventional Commits

> **Idioma:** Português (BR)
!!! tip "Dica"
    Baixe a extensão [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) no VS Code para facilitar a escrita das mensagens.

## Estrutura de commit
    [tipo do commit]: [breve descrição do que foi feito]
    [explicação mais detalhada (opcional)]


### Tipos de commit

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bugs/erros |
| `docs` | Só mudança de documentação |
| `style` | Mudança que não afeta a funcionalidade (formatação, espaços, etc.) |
| `refactor` | Mudança no código que não corrige bug nem adiciona funcionalidade |
| `test` | Adição ou correção de testes |
| `build` | Mudanças que afetam o build ou dependências externas |
| `ci` | Mudanças na integração contínua |
| `perf` | Melhora de performance |
| `chore` | Tarefas gerais que não afetam o código da aplicação |
| `revert` | Reverte um commit anterior |

**Exemplos:**

    refactor: simplificar validação de usuário
    build: atualizar versão do Docker
    ci: adicionar pipeline de deploy
    perf: reduzir consultas ao banco

### Descrição

A descrição deve ser:

- curta
- objetiva
- verbo no presente do indicativo + objeto

Pense como se estivesse completando a frase: *"Se este commit for aplicado, ele vai..."*

- adicionar cadastro
- corrigir erro
- remover código morto

### Corpo

Opcional. Usado quando a mudança precisa de explicação mais detalhada.

!!! example "Exemplo"
    fix: corrigir expiração do token

    O token era renovado apenas após o login. Agora ele é renovado
    automaticamente quando estiver próximo de expirar.

## Boas Práticas

- Faça commits pequenos e focados em uma única mudança.
- Use um único tipo que represente o objetivo principal do commit.
- Escreva a descrição no imperativo e em minúsculas (salvo nomes próprios).
- Evite mensagens genéricas como `ajustes`.
- Use o escopo quando ele ajudar a identificar rapidamente a área afetada.
- Separe mudanças diferentes em commits distintos (não misture uma nova funcionalidade com uma grande refatoração).

## Exemplo de Aplicação

Aplicação durante o desenvolvimento de uma funcionalidade de autenticação:

    feat: adicionar autenticação JWT
    test: adicionar testes de autenticação
    docs: documentar fluxo de login
    fix: corrigir expiração do token
    refactor: simplificar validação de credenciais
    perf: reduzir consultas ao banco durante autenticação
    ci: adicionar pipeline de testes automatizados
