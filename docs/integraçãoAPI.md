# Integração do Mapa e Filtros à API (S4-03)

---

## 1. Visão Geral da Integração

A integração conecta os componentes de interface (`mapa.html`, `filters.js` e `map.js`) aos endpoints de dados do back-end FastAPI (`api_client.js` -> `src/api/main.py`), permitindo que a seleção de estado e dimensão reflita dinamicamente na visualização cartográfica.

### Arquitetura de Comunicação
- **`main.js` (Orquestrador):** Escuta as mudanças de estado disparadas por `filters.js`, consulta a API por meio de `buscarIndicadores()` e entrega os dados normalizados ao mapa.
- **`map.js` (Componente de Mapa):** Mantém seu estado interno privado (encapsulado) e expõe o método público `atualizarIndicadores(dados, dimensao)` para receber novos registros e recalcular estilos/popups.
- **`api_client.js` (Camada HTTP):** Realiza as requisições GET para `/api/indicadores` montando os parâmetros de consulta (`estado`, `dimensao`, `periodo`) e tratando exceções de rede e timeout.

---

## 2. Guia de Execução dos Testes (Instruções para o Paulo)

Para executar os testes locais, certifique-se de estar com a branch `S4-03` atualizada (`git pull origin S4-03`).

### Como subir o ambiente (2 terminais):
1. **Terminal 1 (Back-end API):**
   ```powershell
   .venv\Scripts\Activate.ps1
   python -m uvicorn src.api.main:app --reload
   ```
2. **Terminal 1 (Back-end API - rodar em terminais diferentes):**
```bash
python -m http.server 5500
```
Acesse no navegador: http://localhost:5500/src/frontend/mapa.html (abra o DevTools com F12 na aba Console/Network).

### Procedimento dos Testes Obrigatórios

#### TI-01: Consulta por Estado
- **Procedimento:** Na página do mapa, selecione o estado **"Acre"** e deixe a dimensão como **"Todas as dimensões"**.
- **Comportamento Esperado:** 
  - A requisição `GET /api/indicadores?estado=AC` deve retornar status `200`.
  - Apenas o polígono do Acre deve receber a cor correspondente; os demais 26 estados devem exibir cor neutra (sem dados).
- **Evidência necessária:** Print da tela com o Acre colorido + print da aba Network ou Console.

#### TI-02: Combinação de Filtros (Estado + Dimensão)
- **Procedimento:** Selecione o estado **"Bahia"** e a dimensão **"Renda"**. Em seguida, clique no polígono da Bahia para abrir o Popup.
- **Comportamento Esperado:**
  - A requisição deve conter `estado=BA&dimensao=renda`.
  - O mapa deve colorir a Bahia conforme a faixa de valor da dimensão Renda.
  - O Popup deve listar o valor específico da dimensão selecionada.
- **Evidência necessária:** Print do mapa com o popup aberto exibindo o valor de renda.

#### TI-03: Ausência de Resultados
Como a base oficial contém dados de todos os estados, simulamos a ausência com um banco de dados vazio:
- **Procedimento:**
  1. Pare o servidor da API no Terminal 1 (**Ctrl + C**).
  2. Suba o servidor apontando temporariamente para um banco vazio via PowerShell:
     ```powershell
     $env:DB_PATH="data/teste_vazio.db"; python -m uvicorn src.api.main:app --reload
     ```
  3. No navegador, tente aplicar qualquer filtro (ex: estado "São Paulo").
- **Comportamento Esperado:**
  - A API retorna uma lista vazia `[]` com status `200`.
  - A interface exibe a mensagem de aviso informando ausência de dados.
  - O mapa limpa a visualização para não manter dados desatualizados na tela.
- **Limpeza pós-teste:** Pare a API, remova a variável (`Remove-Item Env:DB_PATH`) e delete o arquivo temporário `data/teste_vazio.db`.
- **Evidência necessária:** Print da interface exibindo o alerta de "Sem resultados".

#### TI-04: Falha de Comunicação
- **Procedimento:**
  1. Pare o servidor Uvicorn (**Ctrl + C** no Terminal 1).
  2. No navegador, altere qualquer filtro de estado ou dimensão.
  3. Observe a mensagem e o botão **"Tentar novamente"**.
  4. Reinicie o servidor Uvicorn no terminal.
  5. Clique no botão **"Tentar novamente"** na tela.
- **Comportamento Esperado:**
  - A aplicação deve capturar o erro de rede/timeout sem quebrar o JavaScript.
  - O alerta de servidor indisponível deve ser apresentado junto com o botão de retry.
  - Ao reiniciar a API e clicar em "Tentar novamente", os dados devem ser recarregados e o aviso deve ser ocultado.
- **Evidência necessária:** Print do alerta de erro com o botão de retry visível.

---

## 3. Registro e Roteiro de Evidências

*O Paulo deve preencher a tabela abaixo conforme a execução:*

| ID | Data | Responsável | Commit Testado | Resultado Esperado | Resultado Obtido | Status | Evidência | Defeitos / Issues |
|---|---|---|---|---|---|---|---|---|
| **TI-01** | 20/10/2026 | Paulo | `4bee6c0` | Acre colorido, outros 26 estados neutros | `GET /api/indicadores?estado=AC` retornou 200. O Acre foi colorido (faixa "Alto", IDHM 0,754 em 2024); os outros estados ficaram em "Sem dados". | [x] Aprovado <br> [ ] Reprovado | `docs/assets/testes/S4-03/TI-01.png` | N/A |
| **TI-02** | 20/10/2026 | Paulo | `4bee6c0` | Bahia colorida por renda e popup com valor | A requisição enviou `estado=BA&dimensao=renda` e retornou 200. A Bahia foi colorida pela faixa de renda e o popup exibiu o valor da dimensão selecionada. | [x] Aprovado <br> [ ] Reprovado | `docs/assets/testes/S4-03/TI-02.png` | N/A |
| **TI-03** | 20/10/2026 | Paulo | `4bee6c0` | Alerta de sem registros e mapa neutro | Com a API apontando para um banco vazio, `GET /api/indicadores?estado=SP` retornou 200 com `[]`. A interface exibiu o alerta "Sem resultados" e o mapa ficou sem estados coloridos. | [x] Aprovado <br> [ ] Reprovado | `docs/assets/testes/S4-03/TI-03.png` | N/A |
| **TI-04** | 20/10/2026 | Paulo | `4bee6c0` | Mensagem de servidor indisponível + retry funcional | Com a API parada, a interface exibiu o alerta "Não foi possível aplicar os filtros" com o botão "Tentar novamente", sem quebrar o JavaScript. Após reiniciar a API e clicar no botão, os dados foram recarregados e o alerta foi ocultado. | [x] Aprovado <br> [ ] Reprovado | `docs/assets/testes/S4-03/TI-04.png` | N/A |

---

## 4. Próximos Passos (Abertura do Pull Request)
1. Salvar os prints na pasta: `docs/assets/testes/S4-03/`.
2. Atualizar a tabela acima com o status e commits reais.
3. Abrir o Pull Request da branch `S4-03` para a branch `developer`.
4. Vincular a issue no PR (`Closes #<numero-da-issue>`) e marcar os revisores designados: **Ágatha e Eduardo**.
