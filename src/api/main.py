from fastapi import FastAPI, Query
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import File, UploadFile, status

from src.api.schemas import Dimensao, IndicadorResponse, LoginRequest, LoginResponse
from src.auth.security import PasswordHasher
from src.database.admin_repository import AdminRepository
from src.database.indicador_repository import IndicadorRepository
from src.services.auth_service import AuthService, CredenciaisInvalidasException
from src.services.indicador_service import (
    IndicadorService,
    ImportacaoService, 
    ErroProcessamentoCSV, 
    ErroPersistenciaIndicadores,
    ConsultaIndicadoresIndisponivel
)
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
# mexer depois @all
# permite diferentes dominios chamarem a API!!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET","POST"],
    allow_headers=["*"],
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

@app.get(
    "/api/indicadores",
    response_model=list[IndicadorResponse],
    responses={503: {"description": "Consulta de indicadores indisponível"}},
)

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
    try:
        return service.consultar(
            estado=estado,
            dimensao=dimensao.value if dimensao is not None else None,
            periodo=periodo,
        )
    except ConsultaIndicadoresIndisponivel as erro:
        raise HTTPException(
            status_code=503,
            detail="Não foi possível consultar os indicadores no momento.",
        ) from erro

def get_auth_service() -> AuthService:
    repository = AdminRepository()
    hasher = PasswordHasher()
    return AuthService(repository, hasher)

@app.post(
    "/api/auth/login",
    response_model=LoginResponse,
    responses={401: {"description": "Credenciais inválidas"}},
)
def login(
    requisicao: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service),
):
    try:
        return auth_service.autenticar(requisicao.usuario, requisicao.senha)
    except CredenciaisInvalidasException as erro:
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas.",
        ) from erro
    
seguranca_basic = HTTPBasic(auto_error=False)

def obter_admin_autenticado(
    credenciais: HTTPBasicCredentials | None = Depends(seguranca_basic),
    auth_service: AuthService = Depends(get_auth_service),
) -> dict:
    if credenciais is None:
        raise HTTPException(
            status_code=401,
            detail="Autenticação necessária",
            headers={"WWW-Authenticate": "Basic"},
        )
    try: 
        return auth_service.autenticar(credenciais.username, credenciais.password)
    except CredenciaisInvalidasException as erro:
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas.",
            headers={"WWW-Authenticate": "Basic"},
        ) from erro

@app.get(
    "/api/admin/painel",
    responses={401: {"description": "Não autenticado"}},
)
def painel_admin(admin: dict = Depends(obter_admin_autenticado)):
    return {
        "mensagem": f"Bem-vindo, {admin['usuario']}.",
        "admin_id": admin["id"],
    }

def get_importacao_service() -> ImportacaoService:
    repository = IndicadorRepository()
    return ImportacaoService(repository)


    #Endpoint com rota /api/admin/indicadores/upload
@app.post(
    "/api/admin/indicadores/upload",
    status_code=status.HTTP_200_OK,
    responses={
        400: {"description": "Arquivo CSV inválido ou malformado"},
        401: {"description": "Não autenticado / Credenciais inválidas"},
        500: {"description": "Erro interno ao persistir os dados no banco de dados"},
    },
)
def upload_csv_indicadores(
    file: UploadFile = File(...),
    admin: dict = Depends(obter_admin_autenticado),
    import_service: ImportacaoService = Depends(get_importacao_service),
):
    """
    Endpoint protegido (B-04) para upload e atualização da base de indicadores via CSV.
    """
    if not file.filename or not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400, detail="Apenas arquivos com extensão .csv são permitidos."
        )

    try:
        total_processado = import_service.processar_upload(file)
        
        return {
            "mensagem": "Base de indicadores atualizada com sucesso.",
            "registros_processados": total_processado,
            "atualizado_por": admin["usuario"]
        }
    except ErroProcessamentoCSV as erro:
        raise HTTPException(status_code=400, detail=str(erro))
    except ErroPersistenciaIndicadores:
        raise HTTPException(status_code=500, detail="Erro interno ao persistir os dados na base de dados.")