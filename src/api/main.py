from fastapi import FastAPI, Query
from fastapi import Depends

from src.api.schemas import Dimensao, IndicadorResponse
from src.database.indicador_repository import IndicadorRepository
from src.services.indicador_service import IndicadorService
from contextlib import asynccontextmanager

from src.database.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Brasil Hub API",
    version="0.1.0",
    lifespan=lifespan
)


@app.get("/")
async def root():
    return {"message": "Brasil Hub API"}

@app.get("/health")
async def health():
    return {"status": "ok"}

def get_indicador_service() -> IndicadorService:
    repository = IndicadorRepository()
    service = IndicadorService(repository)
    return service

@app.get("/api/indicadores"
         , response_model=list[IndicadorResponse])

def consultar_indicadores(
    estado: str | None = Query(
        default=None,

        pattern="^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$",
        description="Sigla da UF em maiúsculas",
    ),

    dimensao: Dimensao | None = None,
    periodo: int | None = Query(
        default=None,
        ge=1991,
        le=2026,
        description="Ano do indicador",
    ),
    service: IndicadorService = Depends(get_indicador_service)
):
    return service.consultar(
        estado=estado,
        dimensao=dimensao.value if dimensao is not None else None,
        periodo=periodo
    )
