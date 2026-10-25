"""Gera dados FICTÍCIOS de IDHM para testar o mapa.

Uso (na raiz do projeto, com a venv ativa e DATABASE_URL configurada):
    python -m tests.fixtures.gerar_dados_teste            # insere os dados
    python -m tests.fixtures.gerar_dados_teste --limpar   # remove só os dados de teste

Todos os registros usam fonte="TESTE". Os valores são aproximados e
servem apenas para desenvolvimento, não representam dados oficiais.
"""
import argparse
import random

import pandas as pd

from src.database.database import get_connection, init_db
from src.database.indicador_repository import IndicadorRepository

FONTE = "TESTE"

# IDHM geral aproximado (ano mais recente) por UF.
BASE_GERAL = {
    "AC": 0.710, "AL": 0.684, "AP": 0.688, "AM": 0.700, "BA": 0.691,
    "CE": 0.734, "DF": 0.814, "ES": 0.771, "GO": 0.737, "MA": 0.676,
    "MT": 0.725, "MS": 0.742, "MG": 0.774, "PA": 0.690, "PB": 0.698,
    "PR": 0.769, "PE": 0.719, "PI": 0.690, "RJ": 0.762, "RN": 0.728,
    "RS": 0.771, "RO": 0.700, "RR": 0.707, "SC": 0.792, "SP": 0.806,
    "SE": 0.702, "TO": 0.731,
}

# Quanto os anos antigos ficam abaixo do mais recente.
AJUSTE_ANO = {1991: -0.25, 2000: -0.17, 2010: -0.06, 2021: 0.0}

# Diferença de cada dimensão em relação ao IDHM geral.
AJUSTE_DIMENSAO = {
    "idhm_geral": 0.0,
    "educacao": -0.05,
    "longevidade": 0.08,
    "renda": -0.02,
}


def gerar_dataframe(seed: int = 42) -> pd.DataFrame:
    rng = random.Random(seed)
    linhas = []
    for uf, base in BASE_GERAL.items():
        for ano, ajuste_ano in AJUSTE_ANO.items():
            for dimensao, ajuste_dim in AJUSTE_DIMENSAO.items():
                valor = base + ajuste_ano + ajuste_dim + rng.uniform(-0.01, 0.01)
                valor = round(min(max(valor, 0.0), 1.0), 3)

                # Um valor ausente de propósito, para testar o "N/D" no popup.
                if (uf, ano, dimensao) == ("RR", 1991, "renda"):
                    valor = None

                linhas.append({
                    "nome_indicador": "IDHM",
                    "unidade_territorial": uf,
                    "dimensao": dimensao,
                    "valor": valor,
                    "periodo_referencia": str(ano),
                    "unidade_medida": "índice",
                    "fonte": FONTE,
                })
    return pd.DataFrame(linhas)


def limpar() -> int:
    init_db()
    conn = get_connection()
    try:
        cur = conn.execute("DELETE FROM indicadores WHERE fonte = %s", (FONTE,))
        conn.commit()
        return cur.rowcount
    finally:
        conn.close()


def inserir() -> int:
    init_db()
    limpar()  # evita duplicar se rodar duas vezes
    return IndicadorRepository().salvar_indicadores(gerar_dataframe())


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--limpar", action="store_true",
                        help="remove os dados de teste (fonte=TESTE)")
    args = parser.parse_args()

    if args.limpar:
        print(f"{limpar()} registros de teste removidos do PostgreSQL.")
    else:
        print(f"{inserir()} registros de teste inseridos no PostgreSQL.")
