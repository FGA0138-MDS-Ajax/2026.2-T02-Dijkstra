import pandas as pd


def preparar_para_persistencia(
    dados: pd.DataFrame,
    fonte: str,
) -> pd.DataFrame:
    if not fonte.strip():
        raise ValueError("Informe a fonte dos indicadores.")

    return pd.DataFrame({
        "nome_indicador": "IDHM",
        "unidade_territorial": dados["sigla"],
        "dimensao": dados["dimensao"],
        "valor": dados["valor"],
        "periodo_referencia": dados["ano"].astype(str),
        "unidade_medida": "índice",
        "fonte": fonte.strip(),
    })
