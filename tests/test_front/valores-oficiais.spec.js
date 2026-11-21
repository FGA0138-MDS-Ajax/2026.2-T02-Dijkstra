// @ts-check
// CT-FE-04: confere se a tela mostra os mesmos valores dos CSVs oficiais em data/raw.
// Pré-condição: banco carregado com `python -m src.data.importar_csv` (dados oficiais, não os fictícios).
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { PaginaMapa } from './pages/PaginaMapa.js';
import { lerValoresOficiais, formatarComoNaTela } from './dados/referencia.js';

const UFS_REFERENCIA = ['DF', 'MA', 'SP'];
const PERIODOS = ['2024', '2010'];
const INDICADORES = [
  { dimensao: 'idhm_geral', rotulo: 'IDHM Geral' },
  { dimensao: 'renda', rotulo: 'IDHM Renda' },
  { dimensao: 'educacao', rotulo: 'IDHM Educação' },
  { dimensao: 'longevidade', rotulo: 'IDHM Longevidade' },
];

test.describe('CT-FE-04 · Valores de referência', () => {
  for (const uf of UFS_REFERENCIA) {
    test(`valores de ${uf} batem com a fonte oficial`, async ({ page }) => {
      const raiz = path.dirname(test.info().config.configFile ?? '');
      const mapa = new PaginaMapa(page);
      await mapa.abrir();
      await mapa.verIndicadoresDoEstado(uf);

      for (const periodo of PERIODOS) {
        await mapa.selectPeriodo.selectOption(periodo);
        await expect(mapa.tabela).toContainText(`período de referência ${periodo}`);

        for (const { dimensao, rotulo } of INDICADORES) {
          const oficial = lerValoresOficiais(raiz, dimensao)[uf][periodo];
          await expect(mapa.valorNaTabela(rotulo), `${uf} ${rotulo} ${periodo}`)
            .toHaveText(formatarComoNaTela(oficial));
        }
      }
    });
  }
});
