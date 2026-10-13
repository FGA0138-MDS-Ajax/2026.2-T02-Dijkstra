# Padrão de Pull Request
 
Um **Pull Request (PR)** é o pedido para juntar o trabalho da sua branch à `developer`. É nele que a outra pessoa revisa o seu código.
 
Todo Pull Request aberto no repositório deve seguir o template padrão definido em [`.github/pull_request_template.md`](https://github.com/FGA0138-MDS-Ajax/2026.2-T02-Dijkstra/blob/main/.github/pull_request_template.md), preenchido automaticamente pelo GitHub ao abrir um novo PR.
 
## Estrutura do Template
 
O template tem os blocos abaixo. Preencha todos; só o bloco de **Evidências** muda conforme o caso.
 
| Bloco | Finalidade |
|---|---|
| **Descrição** | Resumo objetivo do que foi feito e por quê. |
| **Issue Relacionada** | Vincula o PR à issue correspondente via `Closes #<número>`, fechando-a automaticamente ao mergear. |
| **Requisito do backlog** | Código `B-XX` do requisito, quando houver. Se não houver, escreva "não se aplica". |
| **Tipo de Alteração** | Classifica o PR seguindo a convenção de commits (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`). |
| **Como Testar** | Passo a passo para o revisor validar a alteração localmente antes de aprovar. |
| **Testes executados** | O que você rodou (Pytest, Jest ou teste manual) e o resultado. |
| **Evidências** | Prints ou GIFs. **Obrigatório** para mudanças visuais no front-end; nos outros casos é opcional. |
| **Checklist do Desenvolvedor** | Autoverificação de qualidade antes de solicitar revisão. |
| **Para o revisor** | Espaço para comentários e decisão de quem revisa. |
 
## Regras de Uso
 
- O PR deve apontar para a branch **`developer`**. A única exceção é o PR de fim de Sprint, de `developer` para `main`.
- **Título do PR** segue a mesma convenção dos commits: `tipo: descrição breve` (ex.: `feat: adicionar login`).
- Todo PR deve estar vinculado a uma issue (`Closes #`) — PRs sem issue associada não devem ser aceitos.
- O checklist deve estar 100% marcado antes de solicitar revisão de outro membro do time.
- Alterações visuais no front-end **exigem** evidência (print/GIF) para agilizar a revisão.
- Depois de abrir o PR, siga o [padrão de revisão](revisao.md).
!!! tip "Dica"
    Com a opção *Squash and merge*, o título do PR vira a mensagem do commit na `developer`. Por isso o título precisa seguir o [padrão de commits](commits.md).
 
## Template Completo
 
    ## Descrição
    <!-- O que foi feito e por quê. Liste as mudanças principais. -->
 
    ## Issue relacionada
    Closes #
 
    ## Requisito do backlog
    <!-- Código B-XX ou "não se aplica". -->
 
    ## Tipo de alteração
    - [ ] feat
    - [ ] fix
    - [ ] docs
    - [ ] refactor
    - [ ] test
    - [ ] chore
 
    ## Como testar
    1. Mude para a branch deste PR: `git checkout <branch>`
    2. Atualize o ambiente: `...`
    3. Siga estes passos para reproduzir/testar:
       - [ ] Passo 1
       - [ ] Passo 2
 
    ## Testes executados
    <!-- Pytest/Jest ou teste manual, e o resultado. -->
 
    ## Evidências
    <!-- Obrigatória para mudanças visuais no front-end. -->
 
    ## Checklist do desenvolvedor
    - [ ] A branch parte da `developer` e o PR aponta para `developer`
    - [ ] Nome da branch e título do PR seguem os padrões do time
    - [ ] Segue os padrões de código (PEP 8 no Python; ESLint no JavaScript)
    - [ ] Auto-revisão feita
    - [ ] Comentários em partes complexas
    - [ ] Testado localmente
    - [ ] Pedi revisão a alguém de outra dupla
 
    ## Para o revisor
    <!-- Observações e decisão (aprovado / mudanças solicitadas). -->
 