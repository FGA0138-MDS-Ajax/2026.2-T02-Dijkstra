import logging
import sqlite3

from src.database.indicador_repository import IndicadorRepository


logger = logging.getLogger(__name__)


class ConsultaIndicadoresIndisponivel(Exception):
    """Falha operacional que impediu a consulta dos indicadores."""


class IndicadorService:
    def __init__(self, repository: IndicadorRepository):
        self.repository = repository

    def consultar(
        self,
        estado: str | None = None,
        dimensao: str | None = None,
        periodo: int | None = None,
    ) -> list[dict]:
        try:
            return self.repository.listar(
                unidade_territorial=estado,
                dimensao=dimensao,
                periodo_referencia=str(periodo) if periodo is not None else None,
            )
        except sqlite3.OperationalError as erro:
            logger.exception("Falha operacional ao consultar indicadores.")
            raise ConsultaIndicadoresIndisponivel() from erro
