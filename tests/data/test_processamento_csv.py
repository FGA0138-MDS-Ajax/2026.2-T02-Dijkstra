from pathlib import Path
import pytest
import pandas as pd
from src.data.processamento_csv import tratar_csv, DIMENSOES

def criar_csv(tmp_path:Path, file_name:str,content:str) -> Path:
    path = tmp_path/file_name
    path.write_text(content,encoding="utf-8-sig")
    return path

def test_processamento_e_idh(tmp_path:Path):
    content = """ignored
Sigla;Código;Estado;2010;2020;Unnamed: 5
SP ; 35 ; SÃO PAULO ; 0,820 ; 0,850 ; 
RJ ; 33 ; rio de janeiro ; 1,200 ; -0,100 ; 
    """
    path = criar_csv(tmp_path, "idhm_geral_uf.csv", content)

    df_result = tratar_csv(path)
    print("\n", df_result, "\n")

    assert list(df_result.columns) == ["codigo_uf", "sigla", "estado", "ano", "dimensao", "valor"]
    assert len(df_result) == 4

    sp_2010 = df_result[(df_result["sigla"] == "SP") & (df_result["ano"] == 2010)].iloc[0]
    assert sp_2010["estado"] == "São Paulo"
    assert sp_2010["codigo_uf"] == 35
    assert sp_2010["valor"] == 0.820
    assert sp_2010["dimensao"] == "idhm_geral"
    print("\n", df_result, "\n")

    rj_2010 = df_result[(df_result["sigla"] == "RJ") & (df_result["ano"] == 2010)].iloc[0]
    rj_2020 = df_result[(df_result["sigla"] == "RJ") & (df_result["ano"] == 2020)].iloc[0]
    assert pd.isna(rj_2010["valor"])
    assert pd.isna(rj_2020["valor"])
    print("\n", df_result, "\n")


def test_sigla_ou_estado_vazios(tmp_path):
    content = """ignored
Sigla;Código;Estado;2010
SP;35;São Paulo;0,820
;33;Rio de Janeiro;0,760
"""
    path = criar_csv(tmp_path, "idhm_geral_uf.csv", content)

    with pytest.raises(ValueError, match="Sigla e estado não podem estar vazios.") as exc_info:
        tratar_csv(path)

    print(f"\nErro capturado com sucesso: {exc_info.value}\n")

def test_codigo_uf(tmp_path:Path):
    content = """ignored
Sigla;Código;Estado;2010
SP;ABC;São Paulo;0,820
    """

    path = criar_csv(tmp_path, "idhm_educacao_uf.csv", content)
    with pytest.raises(ValueError, match="Código da UF ausente ou inválido") as exc_info:
        tratar_csv(path)
    print(f"\nErro capturado com sucesso: {exc_info.value}\n")

def test_coluna_de_ano(tmp_path):
    content = """ignored
Sigla;Código;Estado;ValorAtual
SP;35;São Paulo;0,820
    """
    path = criar_csv(tmp_path, "idhm_longevidade_uf.csv", content)

    with pytest.raises(ValueError, match="O CSV deve conter pelo menos uma coluna de ano.") as exc_info:
        tratar_csv(path)
    print(f"\nErro capturado com sucesso: {exc_info.value}\n")

def test_colunas_ausentes(tmp_path:Path):
    content = """ignored
Sigla;Estado;2010
SP;São Paulo;0,820
    """

    path = criar_csv(tmp_path, "idhm_renda_uf.csv", content)
    with pytest.raises(ValueError, match="Colunas obrigatórias ausentes: Código") as exc_info:
        tratar_csv(path)
    print(f"\nErro capturado com sucesso: {exc_info.value}\n")

def test_arquivo_sem_dimensao(tmp_path:Path):
    content = """ignored
Sigla;Código;Estado;2010
SP;35;São Paulo;0,820
    """
    path = criar_csv(tmp_path, "idhm_desconhecido_uf.csv", content)
    with pytest.raises(ValueError, match="Arquivo sem dimensão definida: idhm_desconhecido_uf.csv") as exc_info:
        tratar_csv(path)
    print(f"\nErro capturado com sucesso: {exc_info.value}\n")