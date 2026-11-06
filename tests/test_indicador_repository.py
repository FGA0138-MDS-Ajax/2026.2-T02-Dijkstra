from unittest.mock import MagicMock

import pandas as pd
import pytest

from src.database.indicador_repository import IndicadorRepository


@pytest.fixture
def conexao(monkeypatch):
    conn = MagicMock()
    monkeypatch.setattr(
        "src.database.indicador_repository.get_connection", lambda: conn
    )
    return conn


def df_exemplo():
    return pd.DataFrame(
        [
            {
                "nome_indicador": "Renda média",
                "unidade_territorial": "DF",
                "dimensao": "Renda",
                "valor": 3500.5,
                "periodo_referencia": "2022",
                "unidade_medida": "R$",
                "fonte": "IBGE",
            },
            {
                "nome_indicador": "Renda média",
                "unidade_territorial": "GO",
                "dimensao": "Renda",
                "valor": float("nan"),
                "periodo_referencia": "2022",
                "unidade_medida": "R$",
                "fonte": "IBGE",
            },
        ]
    )


def test_salvar_indicadores_converte_valor_ausente_e_confirma_transacao(conexao):
    quantidade = IndicadorRepository().salvar_indicadores(df_exemplo())

    chamada = conexao.cursor.return_value.__enter__.return_value.executemany.call_args
    query, linhas = chamada.args
    assert quantidade == 2
    assert "VALUES (%s, %s, %s, %s, %s, %s, %s)" in query
    assert linhas[0][3] == 3500.5
    assert linhas[1][3] is None
    conexao.commit.assert_called_once_with()
    conexao.close.assert_called_once_with()


def test_listar_retorna_linhas_do_banco(conexao):
    esperado = [{"id": 1, "unidade_territorial": "DF"}]
    conexao.execute.return_value.fetchall.return_value = esperado

    assert IndicadorRepository().listar() == esperado
    conexao.close.assert_called_once_with()


def test_filtros_sao_enviados_como_parametros(conexao):
    IndicadorRepository().listar(
        unidade_territorial="DF", nome_indicador="IDHM",
        periodo_referencia="2022", dimensao="educacao"
    )

    query, parametros = conexao.execute.call_args.args
    assert query.count("%s") == 4
    assert parametros == ["DF", "IDHM", "2022", "educacao"]


def test_entrada_maliciosa_nao_e_interpolada_na_consulta(conexao):
    entrada = "DF' OR '1'='1"
    IndicadorRepository().listar(unidade_territorial=entrada)

    query, parametros = conexao.execute.call_args.args
    assert entrada not in query
    assert parametros == [entrada]
