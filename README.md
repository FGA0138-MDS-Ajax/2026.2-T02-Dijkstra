## GitPages: [Git Pages - Time Dijkstra](https://fga0138-mds-ajax.github.io/2026.2-T02-Dijkstra/)

# Como Atualizar a Documentação

## 1. Atualize o arquivo

Os arquivos da documentação ficam dentro da pasta `docs/`.

Por exemplo:

```text
docs/
├── index.md
├── doc-visao
│   └── topico1.md
│   └── topico2.md
    └── topico3.md
```

Abra o arquivo que deseja modificar e faça as alterações normalmente utilizando Markdown.

> Lembre de adicionar o tópico no mkdocs.yml, que fica na raiz da branch `docs` para que ele seja referenciado na navegação

## 2. Salve as alterações

Depois de editar o arquivo, salve as alterações no VS Code ou no editor utilizado.

```bash
git add .
```

Ou, para adicionar somente um arquivo:

```bash
git add docs/doc_visao.md
```

---

### Crie um commit


```bash
git commit -m "docs: atualiza documentação de backlog"
```

---

### Dê o push

```bash
git push
```

## 3. Atualização do GitHub Pages

```bash
mkdocs gh-deploy
```


Depois do `mkdocs gh-deploy`, o GitHub irá executar o processo configurado para publicação do MkDocs na branch gh-deploy e fará o deploy automaticamente.

Por favor verificar se o deploy ocorreu corretamente na seção à direita no **Deployments**.

---


## extra: Teste a documentação localmente

Antes de enviar as alterações para o GitHub, é recomendado executar o servidor local do MkDocs:

```bash
mkdocs serve
```

O terminal deverá apresentar um endereço semelhante a:

```text
http://127.0.0.1:8000/
```

Abra esse endereço no navegador para visualizar a documentação.

Enquanto o `mkdocs serve` estiver executando, as alterações nos arquivos geralmente são atualizadas automaticamente no navegador.

Para parar o servidor:

```text
Ctrl + C
```

---

