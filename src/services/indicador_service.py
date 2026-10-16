from src.database.indicador_repository import IndicadorRepository

class IndicadorService:
    def __init__(self, repository: IndicadorRepository):
        self.repository = repository

    def consultar(
        self,
        estado: str | None = None,
        dimensao: str | None = None,
        periodo: int | None = None,
    ) -> list[dict]:
        return self.repository.listar(
            unidade_territorial=estado,
            dimensao=dimensao,
            periodo_referencia=str(periodo) if periodo is not None else None,
        )
