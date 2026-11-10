# Definition of Ready (DoR) e Definition of Done (DoD)

Critérios de prontidão das issues (DoR) e de conclusão dos pull requests (DoD) do Brasil Hub.

| Sigla | Aplica-se a | Pergunta que responde | Quando é verificada |
| :--- | :--- | :--- | :--- |
| **DoR** | Issue | A issue está clara o bastante para começar? | Na Sprint Planning, antes de entrar na Sprint |
| **DoD** | Pull Request | O que foi pedido foi entregue e está pronto para a `develop`? | Na revisão do PR, antes do merge |

---

## 1. Definition of Ready (DoR) — Issues

Uma issue está pronta quando segue o modelo do projeto e contém:

| # | Critério | Descrição |
| :-: | :--- | :--- |
| 1 | Requisito e prioridade | Código do requisito (`B-XX`) e prioridade (MUST, SHOULD ou COULD) |
| 2 | Responsáveis e revisores | Dupla que desenvolve e dupla que revisa |
| 3 | Descrição clara | Explica o que deve ser feito, o objetivo e o escopo (inclusive o que **não** será feito nesta issue) |
| 4 | Critérios de aceitação | Lista objetiva e verificável do que precisa estar funcionando |
| 5 | Tarefas | Passos necessários para concluir a issue |
| 6 | Testes definidos | Casos de teste (`TC-XX`) a executar e o que deve ser validado |
| 7 | Dependências mapeadas | Issues das quais depende, indicando se o trabalho pode começar com dados simulados enquanto elas não terminam (ex.: o banco PostgreSQL precisa estar configurado antes de issues que gravam dados) |
| 8 | Cabe na Sprint | Pode ser concluída em uma Sprint de 7 dias; se for grande, deve ser dividida |

---

## 2. Definition of Done (DoD) — Pull Requests

| # | Critério | Descrição |
| :-: | :--- | :--- |
| 1 | Faz o que foi pedido | O PR entrega o que a issue solicitou, sem mudanças fora do escopo |
| 2 | Critérios de aceitação cumpridos | Todos os critérios de aceitação da issue estão marcados como atendidos |
| 3 | Tarefas e entregáveis concluídos | Todas as tarefas e entregáveis listados na issue foram feitos |
| 4 | Testes passando | Os testes unitários e de integração passam, localmente e no GitHub Actions (incluindo os que usam o PostgreSQL) |
| 5 | Casos de teste registrados | Os `TC-XX` da issue foram executados em homologação e registrados (commit, ambiente, data, responsável, resultado e evidências); reprovações foram corrigidas e retestadas |
| 6 | Código fácil de entender | Nomes claros, padrão do projeto seguido (PEP 8 no back-end e ESLint no front-end) e commits em Conventional Commits |
| 7 | Revisado e aprovado | Aprovado por pelo menos um dos revisores designados na issue, com os comentários resolvidos |
| 8 | Documentação e quadro atualizados | Documentação (MkDocs ou README) atualizada quando necessário e issue movida no quadro Kanban |

---

## 3. Checklists para verificar, não necessáriamente estarão na issue

### DoR (conferir ao criar a issue)

```markdown
## Definition of Ready
- [ ] Requisito (B-XX) e prioridade informados
- [ ] Responsáveis e revisores definidos
- [ ] Descrição clara, com escopo e o que não será feito
- [ ] Critérios de aceitação verificáveis
- [ ] Tarefas listadas
- [ ] Testes (TC-XX) definidos
- [ ] Dependências mapeadas
- [ ] Cabe em uma Sprint de 7 dias
```

### DoD (colar no PR)

```markdown
## Definition of Done
- [ ] Faz o que a issue pediu, sem mudanças fora do escopo
- [ ] Todos os critérios de aceitação foram cumpridos
- [ ] Tarefas e entregáveis da issue concluídos
- [ ] Testes passando (local e GitHub Actions)
- [ ] TC-XX executados em homologação e registrados com evidências
- [ ] Código fácil de entender e dentro do padrão do projeto
- [ ] Aprovado por um revisor designado
- [ ] Documentação e quadro Kanban atualizados
```