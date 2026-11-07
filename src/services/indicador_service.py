import logging
import psycopg
import shutil
import tempfile
from pathlib import Path
from fastapi import UploadFile

from src.database.indicador_repository import IndicadorRepository
from src.data.processamento_csv import tratar_csv
from src.data.mapeamento_indicadores import preparar_para_persistencia


logger = logging.getLogger(__name__)

UFS_VALIDAS = frozenset({
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
})

DIMENSOES_COMPARACAO = ("idhm_geral", "renda", "educacao", "longevidade")


class ConsultaIndicadoresIndisponivel(Exception):
    """Falha operacional que impediu a consulta dos indicadores."""

class ErroProcessamentoCSV(Exception):
    """Falha ao processar ou ler os dados do arquivo CSV."""

class ErroPersistenciaIndicadores(Exception):
    """Falha ao gravar os dados no banco."""

class EstadoInvalido(ValueError):
    """Sigla que não corresponde a uma UF válida."""

class ComparacaoEstadosIguais(ValueError):
    """Sigla que não corresponde a uma UF válida."""
class ComparacaoSemDados(ValueError):
    """Não tem dados das UFS para o periodo selecionado."""

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
        
    def comparar(
        self,
        estado_a : str,
        estado_b : str,
        ano: int | None = None,
    ) -> dict:
        for estado in (estado_a, estado_b):
            if estado not in UFS_VALIDAS: #estado não existe
                raise EstadoInvalido(f"Estado Inválido: {estado}")
        if estado_a == estado_b: #ambos são o mesmo estado
            raise ComparacaoEstadosIguais(
                "Selecione dois estados diferentes para comparar."
            )
        #consulta registros do estado no ano especifico
        registros_a = self.consultar(estado=estado_a,periodo=ano)
        registros_b = self.consultar(estado=estado_b,periodo=ano)

        #pega o ano em comum dos estados no ano especifico 
        periodo_comum = (
            {r["periodo_referencia"] for r in registros_a}
            & {r["periodo_referencia"] for r in registros_b}
        )

        if not periodo_comum:
            raise ComparacaoSemDados(
                "Não há dados do mesmo periodo"
            )
        #periodo selecionado é o maximo do conjunto em comum.
        #Se tiver selecioando um ano na função, o conjunto em comum só vai conter o ano especifico no periodo_comum
        periodo_referencia = max(periodo_comum,key=int)

        #Formatação
        return{
            "periodo_referencia": periodo_referencia,
            "estados":[
                {
                    "estado": estado,
                    "indicadores": self._indicadores_do_periodo(
                        registros,periodo_referencia
                    ),
                }
                #faz um loop para cada estado+registro, no caso duas vezes
                for estado,registros in(
                    (estado_a,registros_a),
                    (estado_b,registros_b),
                )
            ],
        }
    
    def _indicadores_do_periodo(self, registros: list[dict], periodo:str) -> dict:
        registros_ano = {r["dimensao"]: r for r in registros if r["periodo_referencia"]==periodo}

        return{
            dimensao:{
                "valor": registros_ano.get(dimensao,{}).get("valor"),
                "unidade_medida": registros_ano.get(dimensao,{}).get("unidade_medida"),
                "fonte": registros_ano.get(dimensao,{}).get("fonte"),
            }
            for dimensao in DIMENSOES_COMPARACAO
        }
    
class ImportacaoService:
    def __init__(self, repository: IndicadorRepository):
        self._repository = repository

    def processar_upload(self, file: UploadFile) -> int:
        """
        Recebe o UploadFile, usa TemporaryDirectory preservando o nome original,
        trata via Pandas, mapeia com preparar_para_persistencia e delega o Upsert.
        """
        try:
            with tempfile.TemporaryDirectory() as pasta_temp:
                nome_arquivo = Path(file.filename).name if file.filename else "idhm_geral_uf.csv"
                temp_path = Path(pasta_temp) / nome_arquivo
                
                with open(temp_path, "wb") as destino:
                    shutil.copyfileobj(file.file, destino)

                # Processar e validar dados
                df_tratado = tratar_csv(temp_path)

        except ValueError as erro:
            raise ErroProcessamentoCSV(str(erro)) from erro
        except Exception as erro:
            logger.exception("Erro ao manipular o arquivo CSV enviado.")
            raise ErroProcessamentoCSV("O arquivo enviado é inválido ou está corrompido.") from erro

        # Mapeia os dados tratados para o formato de persistência
        dados_persistidos = preparar_para_persistencia(df_tratado, fonte="IPEA")

        # Persistir os dados de forma atômica no banco (Upsert)
        try:
            return self._repository.salvar_ou_atualizar_indicadores(dados_persistidos)
        except psycopg.Error as erro:
            logger.exception("Falha operacional ao persistir os indicadores no banco.")
            raise ErroPersistenciaIndicadores("Erro ao conectar ou gravar na base de dados.") from erro