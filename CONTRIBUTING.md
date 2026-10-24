# Como contribuir com o Brasil Hub

Este guia resume o caminho de uma contribuição. Os detalhes de cada etapa estão nas páginas de padrões da documentação:
https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/

## Antes de começar

Prepare o ambiente seguindo o [README](README.md) e escolha uma issue no GitHub Projects.

## Passo a passo

1. **Atualize a `developer`:** `git switch developer && git pull origin developer`
2. **Crie sua branch:** `git switch -c feature/B-XX-nome` ([padrão de branches](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/padroes/branches/))
3. **Faça commits pequenos** no padrão Conventional Commits ([padrão de commits](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/padroes/commits/))
4. **Envie a branch:** `git push -u origin feature/B-XX-nome`
5. **Abra um Pull Request para a `developer`** e preencha o template ([padrão de PR](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/padroes/pullrequest/))
6. **Peça revisão** a alguém de outra dupla e responda aos comentários ([padrão de revisão](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/padroes/revisao/))
7. **Faça o merge** após a aprovação e apague a branch.

## Regras importantes

- Nunca faça commit direto na `main` ou na `developer`.
- Todo PR precisa de pelo menos 1 aprovação de alguém que não seja o autor.
- A `main` é atualizada a partir da `developer` ao final de cada Sprint.

## Issues

As issues seguem o [padrão de issues](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/padroes/issues/).