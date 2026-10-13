# Padrão de Issues

As Issues do projeto seguem o formato de **Caso de Uso (UC)**, funcionando tanto como
especificação funcional quanto como unidade de trabalho rastreável (vinculada aos PRs
via `Closes #`).

## Título da Issue

UC-XX: Nome do caso de uso

Onde `XX` é o número sequencial do caso de uso (ex.: `UC-01: Cadastrar usuário`).

## Estrutura do Template

### Objetivo
Descreve, em uma frase, o que o usuário deseja realizar.

### Ator
Quem executa a ação descrita no caso de uso:

- Usuário
- Administrador
- Sistema
- Outro

### Pré-condições
Condições que devem ser satisfeitas **antes** da execução do caso de uso.

!!! example "Exemplo"
    - O usuário está autenticado.
    - Possui as permissões necessárias.
    - Os dados obrigatórios já existem.

### Fluxo Principal
Sequência numerada dos passos do "caminho feliz":

1. O ator acessa a funcionalidade.
2. O sistema apresenta as opções disponíveis.
3. O ator realiza a ação.
4. O sistema valida os dados.
5. O sistema executa a operação.
6. O sistema apresenta o resultado.

### Fluxos Alternativos
Cenários de exceção ao fluxo principal, identificados por `FA-X`:

**FA-1 Validação falhou**

- O sistema informa os erros.
- O ator corrige os dados.

**FA-2 Permissão insuficiente**

- O sistema bloqueia a operação.
- Exibe mensagem de acesso negado.

### Pós-condições
Estado do sistema após a execução bem-sucedida:

- Os dados foram persistidos.
- O usuário visualiza o resultado atualizado.

### Regras de Negócio
Restrições ou lógicas específicas do domínio, identificadas por `RNXX`:

- `RN01`: ...
- `RN02`: ...

### DoR (Definition of Done/Critérios de Conclusão)
Critérios que atestam que a issue foi totalmente desenvolvida e pode ser enviada para revisão:

- [ ] O fluxo principal funciona conforme especificado.
- [ ] Os fluxos alternativos e exceções foram tratados.
- [ ] As regras de negócio foram aplicadas.
- [ ] Testes unitários/integração adicionados.

## Template Completo


    UC-XX: Nome do caso de uso

    Objetivo

    Ator
    - Usuário / Administrador / Sistema / Outro

    Pré-condições
    -

    Fluxo Principal
    1.

    Fluxos Alternativos
        FA-1
    

    Pós-condições
    

    Regras de Negócio
    - RN01:

     DoD (Definition of Done)
    - [ ] O fluxo principal funciona conforme especificado.
    - [ ] Os fluxos alternativos e exceções foram tratados.
    - [ ] As regras de negócio foram aplicadas.
    - [ ] Testes unitários/integração adicionados.

## Boas Práticas

- Uma Issue = um caso de uso. Não agrupe UCs diferentes na mesma Issue.
- Toda Issue de UC deve ter ao menos um PR vinculado (`Closes #`) antes de ser fechada.
- O DoD deve estar 100% marcado antes de mover o item para revisão/QA.
- Mantenha a numeração `UC-XX` sequencial e sem reaproveitar números de UCs excluídos.