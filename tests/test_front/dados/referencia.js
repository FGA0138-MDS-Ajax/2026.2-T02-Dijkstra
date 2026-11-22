// @ts-check
// Lê os CSVs oficiais de data/raw (fonte: Atlas/IPEA) para os testes compararem
// com o que a tela mostra. É o mesmo arquivo que o importar_csv carrega no banco.

import fs from 'node:fs';
import path from 'node:path';

const ARQUIVOS = {
  idhm_geral: 'idhm_geral_uf.csv',
  renda: 'idhm_renda_uf.csv',
  educacao: 'idhm_educacao_uf.csv',
  longevidade: 'idhm_longevidade_uf.csv',
};

/**
 * @param {string} raizProjeto pasta onde está o playwright.config.js
 * @param {keyof typeof ARQUIVOS} dimensao
 * @returns {Record<string, Record<string, number>>} { UF: { ano: valor } }
 */
export function lerValoresOficiais(raizProjeto, dimensao) {
  const arquivo = path.join(raizProjeto, 'data', 'raw', ARQUIVOS[dimensao]);
  const linhas = fs.readFileSync(arquivo, 'utf-8').replace(/^﻿/, '').split(/\r?\n/);

  // linha 0 = título, linha 1 = cabeçalho "Sigla;Código;Estado;1991;...;2024;"
  const anos = linhas[1].split(';').slice(3).filter(Boolean);
  /** @type {Record<string, Record<string, number>>} */
  const valores = {};

  for (const linha of linhas.slice(2)) {
    const colunas = linha.split(';');
    const uf = colunas[0]?.trim();
    if (!uf) continue;
    valores[uf] = {};
    anos.forEach((ano, i) => {
      const texto = colunas[3 + i]?.trim();
      if (texto) valores[uf][ano] = Number(texto.replace(',', '.'));
    });
  }
  return valores;
}

/** Formata como a tela formata: 3 casas e vírgula (0.74 → "0,740"). */
export function formatarComoNaTela(/** @type {number} */ valor) {
  return valor.toFixed(3).replace('.', ',');
}
