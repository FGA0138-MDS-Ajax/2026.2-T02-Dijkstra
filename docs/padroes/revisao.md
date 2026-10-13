# Padrão de Revisão de Código
 
A **revisão de código** (code review) acontece quando outra pessoa lê o seu Pull Request antes de ele entrar na `developer`. Ela ajuda a achar erros cedo, a compartilhar conhecimento e a manter o código como responsabilidade de todo o time.
 
## Regras
 
- Todo PR precisa de **pelo menos 1 aprovação** de uma pessoa **diferente do autor**.
- Sempre que possível, o revisor deve ser de **outra dupla**, já que a equipe trabalha com programação em pares.
- Ninguém aprova o próprio PR.
- O PR só entra na `developer` quando: tem aprovação, todos os comentários foram resolvidos e não há conflitos.
## Quem faz o quê
 
| Quem | Responsabilidades |
|---|---|
| **Autor** | Preencher o template, marcar o checklist, indicar o revisor, responder aos comentários e corrigir o que for pedido. |
| **Revisor** | Ler o código, testar quando necessário, comentar de forma clara e dar a decisão (aprovar ou pedir mudanças). |
 
## Passo a passo
 
### Para o autor
 
1. Confira se o checklist do PR está 100% marcado.
2. Abra o PR para a `developer` e escolha o revisor no campo **Reviewers**.
3. Se quiser agilizar, avise o revisor no grupo da equipe.
4. Leia os comentários e responda cada um.
5. Corrija com novos commits **na mesma branch**. Não abra outro PR.
6. Clique em **Re-request review** para pedir uma nova olhada.
### Para o revisor
 
1. Leia a descrição, a issue e o "Como testar".
2. Veja as mudanças na aba **Files changed**.
3. Se necessário, rode o código na sua máquina.
4. Deixe seus comentários e escolha uma decisão (tabela abaixo).
## O que o revisor confere
 
- [ ] A descrição está clara e o PR está ligado a uma issue (`Closes #`).
- [ ] O PR aponta para a `developer`.
- [ ] O nome da branch, o título do PR e os commits seguem os padrões.
- [ ] A mudança faz o que a issue pede (fluxos e DoD da issue).
- [ ] O código segue PEP 8 (Python) ou as regras do ESLint (JavaScript).
- [ ] Cada parte do código está no módulo certo (ex.: o front-end nunca acessa o banco direto).
- [ ] Os testes foram executados e o resultado foi informado.
- [ ] Mudanças visuais têm print ou GIF.
- [ ] Não há senhas, arquivos `.env` ou bancos de dados no PR.
## Como escrever bons comentários
 
- Seja **específico**: aponte a linha e diga o que mudar.
- Explique o **porquê**, não só o quê.
- Sugira uma alternativa quando puder.
- Deixe claro o que **precisa** mudar e o que é só **sugestão**.
- Seja gentil: você está comentando o código, não a pessoa.
!!! example "Exemplo"
    **Evite:** "Isso está errado."
 
    **Prefira:** "Se o estado vier vazio, a consulta retorna todos os registros. Que tal validar antes de chamar o serviço?"
 
## Decisões do revisor
 
| Opção no GitHub | Quando usar |
|---|---|
| **Comment** | Dúvidas ou comentários que não bloqueiam. |
| **Approve** | Está tudo certo para entrar na `developer`. |
| **Request changes** | Há algo que precisa ser corrigido antes do merge. |
 
## Fazendo o merge
 
Com a aprovação, os comentários resolvidos e sem conflitos, o **autor** faz o merge usando **Squash and merge** e apaga a branch em seguida.
 
!!! tip "Dica"
    Com o *Squash*, todos os commits do PR viram um só na `developer`, com o título do PR como mensagem. Veja o [padrão de Pull Request](pullrequest.md).
 
Se o PR tiver conflito, resolva-o na sua branch seguindo o passo a passo do [padrão de branches](branches.md#se-aparecer-conflito).
 
## Atualização da `main`
 
Ao final de cada Sprint, a `developer` estável é levada para a `main` por um PR de `developer` para `main`. Esse PR também precisa de aprovação. Veja o [padrão de branches](branches.md#atualizando-a-main-ao-final-da-sprint).
 
## Proteção das branches
 
As branches `main` e `developer` são protegidas no GitHub:
 
| Regra | O que significa |
|---|---|
| Exigir Pull Request | Não é possível dar push direto. |
| Exigir 1 aprovação | O PR só pode ser mergeado após uma aprovação. |
| Bloquear force push e exclusão | A branch não pode ser reescrita nem apagada. |