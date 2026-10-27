import pandas as pd

from src.database.database import get_connection


COLUNAS = [
    "nome_indicador",
    "unidade_territorial",
    "dimensao",
    "valor",
    "periodo_referencia",
    "unidade_medida",
    "fonte",
]


class IndicadorRepository:
    def listar(
        self,
        unidade_territorial=None,
        nome_indicador=None,
        periodo_referencia=None,
        dimensao=None,
    ) -> list[dict]:
        query = "SELECT * FROM indicadores WHERE 1=1"
        params = []
        if unidade_territorial:
            query += " AND unidade_territorial = %s"
            params.append(unidade_territorial)
        if nome_indicador:
            query += " AND nome_indicador = %s"
            params.append(nome_indicador)
        if periodo_referencia:
            query += " AND periodo_referencia = %s"
            params.append(periodo_referencia)
        if dimensao is not None:
            query += " AND dimensao = %s"
            params.append(dimensao)
        conn = get_connection()
        try:
            return [dict(row) for row in conn.execute(query, params).fetchall()]
        finally:
            conn.close()

    def salvar_indicadores(self, df: pd.DataFrame) -> int:
        dados = df[COLUNAS].astype(object)
        dados = dados.where(pd.notna(dados), None)
        linhas = list(dados.itertuples(index=False, name=None))

        conn = get_connection()
        try:
            with conn.cursor() as cursor:
                cursor.executemany(
                    "INSERT INTO indicadores "
                    "(nome_indicador, unidade_territorial, dimensao, valor, "
                    "periodo_referencia, unidade_medida, fonte) "
                    "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    linhas,
                )
            conn.commit()
            return len(linhas)
        finally:
            conn.close()
