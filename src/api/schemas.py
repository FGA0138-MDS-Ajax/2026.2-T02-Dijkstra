from enum import Enum
from pydantic import BaseModel

class Dimensao(str, Enum):
    idhm_geral = "idhm_geral"
    educacao = "educacao"
    longevidade = "longevidade"
    renda = "renda",

class IndicadorResponse(BaseModel):
    id: int
    nome_indicador: str
    unidade_territorial: str
    dimensao: Dimensao
    valor: float | None
    periodo_referencia: str
    unidade_medida: str | None = None
    fonte: str | None = None
