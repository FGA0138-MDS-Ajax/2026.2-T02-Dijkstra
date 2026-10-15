from pathlib import Path
import pandas as pd

DIMENSOES = {
    "idhm_geral_uf.csv": "idhm_geral",
    "idhm_educacao_uf.csv": "educacao",
    "idhm_longevidade_uf.csv": "longevidade",
    "idhm_renda_uf.csv": "renda",
}

COLUNAS_OBRIGATORIAS = { "Sigla", "Código", "Estado"}

def ler_csv(caminho: str | Path) -> pd.DataFrame:
    """Lê o formato dos CSVs de entrada do projeto."""
    df = pd.read_csv(
        caminho,
        sep=";",
        encoding="utf-8-sig",
        skiprows=1,
        dtype="string",
        na_values=["", "-", "...", "NA", "N/A", "null"],
        keep_default_na=True,
        on_bad_lines="error",
    )

# O separador no final das linhas cria uma coluna sem nome.
    for coluna in df.columns:
        if coluna.startswith("Unnamed:") and df[coluna].isna().all():
            df = df.drop(columns=coluna)

    faltantes = COLUNAS_OBRIGATORIAS - set(df.columns)
    if faltantes:
        raise ValueError(
            f"Colunas obrigatórias ausentes: {', '.join(sorted(faltantes))}"
        )

    return df

def tratar_csv(caminho: str | Path) -> pd.DataFrame:
    """Transforma as colunas de anos em registros de indicadores."""
    caminho = Path(caminho)

    if caminho.name not in DIMENSOES:
        raise ValueError(f"Arquivo sem dimensão definida: {caminho.name}")

    df = ler_csv(caminho)
    anos = [coluna for coluna in df.columns
            if len(coluna) == 4 and coluna.isdigit()]

    if not anos:
        raise ValueError("O CSV deve conter pelo menos uma coluna de ano.")

    df = df.rename(columns={
        "Sigla": "sigla",
        "Código": "codigo_uf",
        "Estado": "estado",
    })

    df["sigla"] = df["sigla"].str.strip().str.upper()
    df["estado"] = df["estado"].str.strip().str.title()

    codigos = pd.to_numeric(df["codigo_uf"], errors="coerce")
    if (codigos.isna() | (codigos % 1 != 0)).any():
        raise ValueError("Código da UF ausente ou inválido.")
    df["codigo_uf"] = codigos.astype("int64")

    if (
        df["sigla"].isna().any()
        or df["estado"].isna().any()
        or df["sigla"].eq("").any()
        or df["estado"].eq("").any()
    ):
        raise ValueError("Sigla e estado não podem estar vazios.")

    resultado = df.melt(
        id_vars=["codigo_uf", "sigla", "estado"],
        value_vars=anos,
        var_name="ano",
        value_name="valor",
    )

    resultado["ano"] = resultado["ano"].astype("int64")
    resultado["dimensao"] = DIMENSOES[caminho.name]

    valores = (
        resultado["valor"]
        .str.strip()
        .str.replace(",", ".", regex=False)
    )
    resultado["valor"] = pd.to_numeric(
        valores, errors="coerce"
    ).astype("float64")

    # IDHM fora do intervalo esperado também é inválido.
    resultado.loc[
        ~resultado["valor"].between(0, 1), "valor"
    ] = float("nan")

    return resultado[
        ["codigo_uf", "sigla", "estado", "ano", "dimensao", "valor"]
    ]