# Padrão de Pull Request

Todo Pull Request aberto no repositório deve seguir o template padrão definido em `pull pull_request_template.md` preenchido automaticamente pelo GitHub ao abrir um novo PR.

## Estrutura do Template

O template é dividido em 6 blocos, todos obrigatórios de preenchimento:

| Bloco | Finalidade |
|---|---|
| **Descrição** | Resumo objetivo do que foi feito e por quê. |
| **Issue Relacionada** | Vincula o PR à issue correspondente via `Closes #<número>`, fechando-a automaticamente ao mergear. |
| **Tipo de Alteração** | Classifica o PR seguindo a convenção de commits (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`). |
| **Como Testar** | Passo a passo para o revisor validar a alteração localmente antes de aprovar. |
| **Evidências** | Prints ou GIFs para mudanças visuais no front-end (opcional, mas recomendado). |
| **Checklist do Desenvolvedor** | Autoverificação de qualidade antes de solicitar revisão. |

## Regras de Uso

- **Título do PR** segue a mesma convenção dos commits: `tipo: descrição breve` (ex.: `feat: adiciona login`).
- Todo PR deve estar vinculado a uma issue (`Closes #`) — PRs sem issue associada não devem ser aceitos.
- O checklist deve estar 100% marcado antes de solicitar revisão de outro membro do time.
- Alterações visuais no front-end **exigem** evidência (print/GIF) para agilizar a revisão.

## Template Completo


    Descrição
    Closes #

    Tipo de Alteração
    - [ ] feat / fix / docs / refactor / test / chore

    Como Testar
    1. Mude para a branch deste PR: `git checkout feature/...`
    2. Certifique-se de atualizar o ambiente: `...`
    3. Siga estes passos para reproduzir/testar:
    - [ ] Passo 1...
    - [ ] Passo 2...

    Evidências (Opcional):

    Checklist do Desenvolvedor
    - [ ] Segue os padrões do time
    - [ ] Auto-revisão feita
    - [ ] Comentários em partes complexas
    - [ ] Testado localmente
    - [ ] Título segue a convenção


> O arquivo completo está disponível em
> [`pull_request_template.md`](https://github.com/fga0138-mds-ajax/2026.2-T02-Dijkstra/blob/main/pull_request_template.md)
> na raiz do repositório.