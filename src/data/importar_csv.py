from pathlib import Path

import pandas as pd

from src.data.mapeamento_indicadores import preparar_para_persistencia
from src.data.processamento_csv import DIMENSOES, tratar_csv
from src.database.database import init_db
from src.database.indicador_repository import IndicadorRepository


def importar_csvs() -> int:
    init_db()
    repository = IndicadorRepository()

    # Evita repetir a carga sobre um banco já preenchido.
    if repository.listar():
        raise ValueError(
            "O banco já contém indicadores. Importação cancelada "
            "para evitar duplicações."
        )

    raiz = Path(__file__).resolve().parents[2]
    pasta_csv = raiz / "data" / "raw"
    tabelas = []

    for arquivo in DIMENSOES:
        tratados = tratar_csv(pasta_csv / arquivo)
        preparados = preparar_para_persistencia(
            tratados,
            fonte="IPEA",
        )
        tabelas.append(preparados)

    # Todos os arquivos são tratados antes de iniciar a gravação.
    dados = pd.concat(tabelas, ignore_index=True)
    return repository.salvar_indicadores(dados)


if __name__ == "__main__":
    quantidade = importar_csvs()
    print(f"{quantidade} indicadores importados para o PostgreSQL.")
