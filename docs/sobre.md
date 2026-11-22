# Sobre o Projeto

## Contexto e Motivação

O acesso a indicadores socioeconômicos confiáveis e atualizados é essencial para o diagnóstico social, o desenvolvimento de pesquisas acadêmicas e a tomada de decisões em políticas públicas. No entanto, esses dados costumam estar dispersos em diversas fontes governamentais e em formatos técnicos de difícil assimilação pelo público geral.

O **Brasil Hub** foi concebido para eliminar esse gargalo. A plataforma centraliza, padroniza e democratiza o acesso às séries históricas de desenvolvimento humano (**IDHM Geral**, **Renda**, **Educação** e **Longevidade**) das 27 Unidades Federativas brasileiras, oferecendo uma experiência cartográfica interativa, acessível e auditável.

## Diretrizes de Engenharia e Produto

- **Centralização e Transparência:** Agrupamento de séries históricas oficiais (1991–2024) em um repositório relacional auditável e aberto à exportação (`CSV`).
- **Visualização Geoespacial:** Mapeamento coroplético interativo das 27 Unidades Federativas via `Leaflet.js` e `GeoJSON`.
- **Análise Comparativa e Temporal:** Ferramentas para contraste lado a lado entre estados (`B-06`), gráficos e tabelas sincronizadas (`B-10`) e linha do tempo de evolução histórica (`B-07`).
- **Integridade Estrita dos Dados:** Validação automatizada via `Pandas`; registros ausentes são preservados explicitamente como `null` e jamais mascarados como zero (`RN-02`).

## A Equipe Dijkstra

O projeto é planejado, arquitetado e desenvolvido colaborativamente pela **Equipe Dijkstra**, composta por estudantes de Engenharia de Software da **Universidade de Brasília (UnB / FGA)**:

<div class="bh-team-grid">
  <a href="https://github.com/Nataxshaa" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251034885</span><span class="bh-member-handle">@Nataxshaa ↗</span></span>
    <img src="https://github.com/Nataxshaa.png" alt="Foto de Ágatha Natasha" class="bh-member-avatar">
    <span class="bh-member-name">Ágatha Natasha</span>
    <span class="bh-member-role">Back-end &amp; Infra</span>
  </a>
  <a href="https://github.com/CesarL3gal" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251035031</span><span class="bh-member-handle">@CesarL3gal ↗</span></span>
    <img src="https://github.com/CesarL3gal.png" alt="Foto de César Augusto" class="bh-member-avatar">
    <span class="bh-member-name">César Augusto</span>
    <span class="bh-member-role">Front-end</span>
  </a>
  <a href="https://github.com/EduardoSauber" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251020226</span><span class="bh-member-handle">@EduardoSauber ↗</span></span>
    <img src="https://github.com/EduardoSauber.png" alt="Foto de Eduardo Brito" class="bh-member-avatar">
    <span class="bh-member-name">Eduardo Brito</span>
    <span class="bh-member-role">Back-end &amp; Infra</span>
  </a>
  <a href="https://github.com/fabysoouza" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251008526</span><span class="bh-member-handle">@fabysoouza ↗</span></span>
    <img src="https://github.com/fabysoouza.png" alt="Foto de Fabiana Reis" class="bh-member-avatar">
    <span class="bh-member-name">Fabiana Reis</span>
    <span class="bh-member-role bh-member-role--lead">PO / Front-end</span>
  </a>
  <a href="https://github.com/fgeorge07" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251008535</span><span class="bh-member-handle">@fgeorge07 ↗</span></span>
    <img src="https://github.com/fgeorge07.png" alt="Foto de Felipe George" class="bh-member-avatar">
    <span class="bh-member-name">Felipe George</span>
    <span class="bh-member-role">Front-end</span>
  </a>
  <a href="https://github.com/JosefWojtyla" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251023282</span><span class="bh-member-handle">@JosefWojtyla ↗</span></span>
    <img src="https://github.com/JosefWojtyla.png" alt="Foto de Josef Wojtyla" class="bh-member-avatar">
    <span class="bh-member-name">Josef Wojtyla</span>
    <span class="bh-member-role bh-member-role--lead">SM / Back-end &amp; Infra</span>
  </a>
  <a href="https://github.com/nerylucas" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>251012304</span><span class="bh-member-handle">@nerylucas ↗</span></span>
    <img src="https://github.com/nerylucas.png" alt="Foto de Lucas Abdalla" class="bh-member-avatar">
    <span class="bh-member-name">Lucas Abdalla</span>
    <span class="bh-member-role">Front-end</span>
  </a>
  <a href="https://github.com/pefidelis" target="_blank" rel="noopener" class="bh-member-card">
    <span class="bh-member-meta"><span>242015325</span><span class="bh-member-handle">@pefidelis ↗</span></span>
    <img src="https://github.com/pefidelis.png" alt="Foto de Paulo Eduardo" class="bh-member-avatar">
    <span class="bh-member-name">Paulo Eduardo</span>
    <span class="bh-member-role">Back-end &amp; Infra</span>
  </a>
</div>

## Organização e Dinâmica de Engenharia

Para assegurar qualidade técnica, propriedade coletiva do código e entregas contínuas, a equipe opera sob as seguintes práticas:

- **Programação em Pares e Rotação (Pair Programming):** Distribuição das issues entre 4 duplas com rotação periódica entre as camadas de Front-end, Back-end e Dados.
- **Revisão Cruzada Obrigatória (Code Review):** Nenhum código é integrado à branch `developer` sem aprovação formal de uma dupla revisora distinta e aprovação da suíte Pytest no GitHub Actions.
- **Ritos Ágeis Orientados a Métricas:** Sprints de 7 dias, planejamento baseado em DoR/DoD, acompanhamento diário via Dailies documentadas e coleta sistemática do modelo GQM.

## Contexto Acadêmico

| Atributo | Descrição |
| :--- | :--- |
| **Instituição** | Universidade de Brasília (UnB) — Campus Gama (FGA) |
| **Curso** | Engenharia de Software |
| **Disciplina** | Métodos de Desenvolvimento de Software (MDS) — Semestre 2026.2 |
| **Professor Orientador** | Prof. Dr. Ajax |
