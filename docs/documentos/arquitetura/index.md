# Documento de Arquitetura — Equipe Dijkstra

## Identificação e Contribuições da Equipe

**Tabela 1 — Contribuições da equipe na entrega da arquitetura**

| Integrante | Matrícula | Papel na Entrega | Contribuição Técnica Específica | Pontos |
|---|---|---|---|:---:|
| Ágatha Natasha | 231018991 | Back-end / Dados | Elaboração da Tabela de Módulos (Tabela 4), Diagrama de Pacotes (Figura 4) e Tabela de Comunicação (Tabela 5) | 10 |
| César Augusto | 231019041 | Front-end | Elaboração do Diagrama de Componentes (Figura 5) e Diagrama de Classes (Figura 6) | 10 |
| Eduardo Brito (Rotativo) | 231021447 | Back-end / Infraestrutura | Elaboração do Diagrama de Implantação (Figura 7) e especificação das restrições de infraestrutura | 10 |
| Fabiana Reis | 231021465 | Produto / Front-end | Elaboração do Diagrama de Atividades do Administrador (Figura 3) e refinamento de fluxos de negócio | 10 |
| Felipe George | 231021474 | Front-end | Elaboração do Diagrama de Casos de Uso (Figura 2) e especificação das visões de uso do sistema | 10 |
| Josef Wojtyla | 231021581 | Scrum Master / Back-end | Redação da representação arquitetural, Tabela de Componentes (Tabela 3), revisão técnica e estruturação do documento | 10 |
| Lucas Nery | 231021616 | Front-end | Elaboração do Diagrama Arquitetural Genérico (Figura 1) e especificação de conectores de apresentação | 10 |
| Paulo Eduardo | 231021699 | Back-end / Infraestrutura | Especificação do modelo de persistência de dados, metas arquiteturais e requisitos de desempenho | 10 |

*Fonte: Elaborado por Josef Wojtyla (2026).*

---

## Histórico de Versões

**Tabela 2 — Histórico de versões**

| Versão | Data | Descrição | Autor(es) | Revisor(es) |
|:---:|:---:|---|---|---|
| 1.0 | 06/10/2026 | Elaboração inicial do Documento de Arquitetura, contemplando o estilo em camadas, diagramas UML (casos de uso, pacotes, componentes, classes e implantação) e definição de tecnologias. | Equipe Dijkstra | Josef Wojtyla |
| 1.1 | 09/11/2026 | Nota de atualização do banco de dados para PostgreSQL e ajustes de coerência com o Documento de Visão (correção de citações formais, rastreabilidade dos requisitos B-01 a B-11, exemplos de endpoints HTTP e detalhamento de segurança). | Equipe Dijkstra | Josef Wojtyla |

*Fonte: Elaborado por Josef Wojtyla (2026).*

---

## 1. Sobre o Documento

O Documento de Arquitetura apresenta a organização estrutural e técnica do Brasil Hub, uma plataforma web destinada à centralização, ao tratamento e à visualização de indicadores socioeconômicos brasileiros, com foco nas dimensões de renda, educação e longevidade.

Seu objetivo é descrever a arquitetura do sistema, identificando seus principais componentes, suas responsabilidades, as tecnologias utilizadas e a forma como esses elementos interagem para atender aos requisitos estabelecidos no Documento de Visão e Projeto.

O documento também registra as decisões arquiteturais que orientam a implementação, contribuindo para a compreensão da estrutura do software, a manutenção do sistema e a evolução de suas funcionalidades.

O conteúdo está organizado em seções que abordam a introdução, a representação arquitetural, as visões do sistema, os aspectos de implantação, as restrições e as referências utilizadas na elaboração do documento.

## 1.1. Documento de Arquitetura em PDF

O documento original pode ser consultado diretamente abaixo ou aberto separadamente.

[**Abrir PDF em uma nova aba**](../arquivos/doc-arquitetura.pdf)

---

<iframe
    src="../arquivos/doc-arquitetura.pdf"
    width="100%"
    height="600"
    style="border: 1px solid #ccc; border-radius: 8px;"
    title="Documento de Arquitetura do Brasil Hub">
</iframe>

---

## 2. Navegação do Documento

### 2.1. Introdução

Apresenta o propósito do Documento de Arquitetura, seu escopo e o contexto do Brasil Hub, estabelecendo a relação entre a arquitetura do sistema e os objetivos definidos para o projeto.

- [Acessar Introdução](introducao.md)

---

### 2.2. Representação Arquitetural

Apresenta a organização geral da arquitetura do Brasil Hub, descrevendo a estrutura do sistema, seus principais componentes e as tecnologias relacionadas à sua implementação.

- [Acessar Representação Arquitetural](representacao-arquitetural.md)

---

### 2.3. Visões Arquiteturais

Descreve as diferentes perspectivas utilizadas para representar a arquitetura do sistema, permitindo compreender sua organização, seus componentes e as relações entre eles.

- [Acessar Visões Arquiteturais](visoes.md)

---

### 2.4. Implantação e Restrições

Apresenta os aspectos relacionados à implantação do sistema e as restrições técnicas que influenciam as decisões arquiteturais e o desenvolvimento do Brasil Hub.

- [Acessar Implantação e Restrições](implantacao-restricoes.md)

---

### 2.5. Referências

Reúne as fontes bibliográficas e documentais utilizadas como fundamentação para a elaboração do Documento de Arquitetura.

- [Acessar Referências](referencias.md)

---

###### **Projeto:** Brasil Hub

###### **Equipe:** Dijkstra

###### **Disciplina:** Métodos de Desenvolvimento de Software (MDS), Prof. Ajax.