# Padrão de Branches

Uma **branch** (ramo) é uma cópia paralela do código onde você trabalha sem mexer na versão principal. Quando o trabalho fica pronto e é revisado, ele volta para o projeto por meio de um Pull Request.

> **Fluxo adotado:** sua branch → `developer` → `main`

## Branches principais

| Branch | Para que serve |
|---|---|
| `main` | Versão entregue do projeto. É atualizada a partir da `developer` **ao final de cada Sprint**. |
| `developer` | Versão estável em desenvolvimento. Só recebe alterações por **Pull Request revisado**. |

!!! warning "Atenção"
    Nunca faça commit direto na `main` nem na `developer`. Todo trabalho acontece em uma branch própria e entra por Pull Request.

## Como nomear uma branch

    prefixo/código-descrição-curta

| Prefixo | Quando usar | Código | Exemplo |
|---|---|---|---|
| `feature/` | Desenvolver um requisito do backlog | `B-XX` | `feature/B-02-filtro-dinamico` |
| `fix/` | Corrigir um defeito | `B-XX` | `fix/B-02-filtro-sem-estado` |
| `test/` | Criar testes de um requisito | `B-XX` | `test/B-05-desempenho-consulta` |
| `chore/` | Configurar ambiente ou infraestrutura | código da issue (ex.: `S3-01`) | `chore/S3-01-fluxo-de-branches` |
| `docs/` | Escrever ou ajustar documentação | sem código | `docs/fluxo-de-contribuicao` |

!!! info "De onde vem o código `B-XX`?"
    Ele identifica o requisito na tabela de backlog (veja a página de [Requisitos](../gestao/requisitos.md)). Exemplo: `B-02` é o Filtro Dinâmico.

!!! note "Sobre os exemplos"
    `B-02` e `B-05` são requisitos reais do backlog. O defeito `filtro-sem-estado` é fictício, só para ilustrar.

**Regras de escrita:**

- use letras minúsculas, exceto o código (`B-02`);
- separe as palavras com hífen, sem espaços nem acentos;
- escolha um nome curto que diga o que a branch faz.

## Passo a passo

**1. Atualize a `developer`:**

```
git switch developer
git pull origin developer
```

**2. Crie sua branch a partir dela:**

```
git switch -c feature/B-02-filtro-dinamico
```

**3. Trabalhe e faça commits** seguindo o [padrão de commits](commits.md).

**4. Envie a branch para o GitHub:**

```
git push -u origin feature/B-02-filtro-dinamico
```

**5. Abra um Pull Request** apontando para a `developer`. Veja o [padrão de Pull Request](pullrequest.md) e o [padrão de revisão](revisao.md).

**6. Depois do merge**, apague a branch e atualize sua `developer`:

```
git switch developer
git pull origin developer
git branch -d feature/B-02-filtro-dinamico
```

## Mantendo sua branch atualizada

Se a `developer` recebeu novidades enquanto você trabalhava, traga-as para a sua branch:

```
git fetch origin
git merge origin/developer
```

### Se aparecer conflito

Um conflito acontece quando duas pessoas mudaram o mesmo trecho. O Git marca o arquivo assim:

    <<<<<<< HEAD
    seu código
    =======
    código que veio da developer
    >>>>>>> origin/developer

1. Abra o arquivo e escolha como o trecho deve ficar (pode juntar os dois).
2. Apague as linhas `<<<<<<<`, `=======` e `>>>>>>>`.
3. Teste se tudo continua funcionando.
4. Finalize:

```
git add .
git commit
git push
```

!!! tip "Dica"
    Em dúvida sobre qual código manter, converse com a pessoa que alterou o mesmo trecho antes de decidir.

## Atualizando a `main` ao final da Sprint

Na virada de cada Sprint (a cada 7 dias), a equipe confirma que a `developer` está estável e abre um Pull Request da `developer` para a `main`. O Scrum Master coordena esse momento.

!!! example "Em resumo"
    `feature/B-XX-nome` → PR revisado → `developer` → (fim da Sprint) → `main`