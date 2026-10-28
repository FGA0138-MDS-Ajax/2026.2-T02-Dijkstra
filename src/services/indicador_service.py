import logging
import psycopg
import shutil
import tempfile
from pathlib import Path
from fastapi import UploadFile

from src.database.indicador_repository import IndicadorRepository
from src.data.processamento_csv import tratar_csv


logger = logging.getLogger(__name__)


class ConsultaIndicadoresIndisponivel(Exception):
    """Falha operacional que impediu a consulta dos indicadores."""

class ErroProcessamentoCSV(Exception):
    """Falha ao processar ou ler os dados do arquivo CSV."""

class ErroPersistenciaIndicadores(Exception):
    """Falha ao gravar os dados no banco."""

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
        except psycopg.OperationalError as erro:
            logger.exception("Falha operacional ao consultar indicadores.")
            raise ConsultaIndicadoresIndisponivel() from erro

class ImportacaoService:
    def __init__(self, repository: IndicadorRepository):
        self._repository = repository

    def processar_upload(self, file: UploadFile) -> int:
        """
        Recebe o UploadFile, salva em disco temporariamente, trata via Pandas
        e delega a persistência (Upsert) para o repositório.
        """
        temp_path = None
        try:
            # Salva arquivo temporariamente em disco para leitura pelo Pandas
            with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as temp_file:
                shutil.copyfileobj(file.file, temp_file)
                temp_path = temp_file.name

            # Processar e validar dados
            df_tratado = tratar_csv(temp_path)

        # Captura erros de validação
        except ValueError as erro:
            raise ErroProcessamentoCSV(str(erro)) from erro
        except Exception as erro:
            logger.exception("Erro ao manipular o arquivo CSV enviado.")
            raise ErroProcessamentoCSV("O arquivo enviado é inválido ou está corrompido.") from erro
        finally:
            # Remoção do arquivo temporário
            if temp_path and Path(temp_path).exists():
                Path(temp_path).unlink()

        # Persistir os dados de forma atômica no banco (Upsert)
        try:
            return self._repository.salvar_ou_atualizar_indicadores(df_tratado)
        except psycopg.OperationalError as erro:
            logger.exception("Falha operacional ao persistir os indicadores no banco.")
            raise ErroPersistenciaIndicadores("Erro ao conectar ou gravar na base de dados.") from erro