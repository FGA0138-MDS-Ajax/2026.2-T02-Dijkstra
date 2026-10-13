import pandas as pd
import pytest

from src.database.database import init_db
from src.database.indicador_repository import IndicadorRepository


@pytest.fixture
def repo(tmp_path):
    db = str(tmp_path / "teste.db")
    init_db(db)
    return IndicadorRepository(db)


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


def test_salvar_e_listar(repo):
    assert repo.salvar_indicadores(df_exemplo()) == 2
    assert len(repo.listar()) == 2


def test_valor_ausente_vira_null_e_nao_zero(repo):
    repo.salvar_indicadores(df_exemplo())
    go = repo.listar(unidade_territorial="GO")[0]
    assert go["valor"] is None


def test_filtro_por_unidade_territorial(repo):
    repo.salvar_indicadores(df_exemplo())
    resultado = repo.listar(unidade_territorial="DF")
    assert len(resultado) == 1
    assert resultado[0]["valor"] == 3500.5


def test_consulta_parametrizada_resiste_a_injecao(repo):
    repo.salvar_indicadores(df_exemplo())
    assert repo.listar(unidade_territorial="DF' OR '1'='1") == []
    assert len(repo.listar()) == 2