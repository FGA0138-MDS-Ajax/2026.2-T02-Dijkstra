import io
import os
import uuid

import psycopg
import pytest
from fastapi.testclient import TestClient
from psycopg import sql
from psycopg.rows import dict_row

from src.api.main import app, get_auth_service
from src.auth.security import PasswordHasher
from src.database import admin_repository as admin_repository_module
from src.database import database as database_module
from src.database import indicador_repository as indicador_repository_module
from src.database.admin_repository import AdminRepository
from src.database.database import init_db
from src.services.auth_service import AuthService

client = TestClient(app)

URL_UPLOAD = "/api/admin/indicadores/upload"
URL_SP_2010 = "/api/indicadores?estado=SP&dimensao=idhm_geral&periodo=2010"
ADMIN_TESTE = "admin"
SENHA_TESTE = "senha-de-teste"
AUTH_ADMIN = (ADMIN_TESTE, SENHA_TESTE)


CSV_VALIDO = """ignored
Sigla;Código;Estado;2010;2020
SP;35;São Paulo;0,820;0,850
RJ;33;Rio de Janeiro;0,761;0,790
"""

CSV_COM_LINHA_INVALIDA = """ignored
Sigla;Código;Estado;2010
SP;35;São Paulo;0,820
;33;Rio de Janeiro;0,760
"""

CSV_SEM_CODIGO = """ignored
Sigla;Estado;2010
SP;São Paulo;0,820
"""


def _upload(nome, conteudo, auth=AUTH_ADMIN, tipo="text/csv"):
    if isinstance(conteudo, str):
        conteudo = conteudo.encode("utf-8-sig")
    return client.post(
        URL_UPLOAD,
        files={"file": (nome, io.BytesIO(conteudo), tipo)},
        auth=auth,
    )


@pytest.fixture
def banco_upload(monkeypatch):
    """Schema isolado no PostgreSQL de teste, com um admin criado."""
    database_url = os.getenv("TEST_DATABASE_URL")
    if not database_url:
        pytest.skip("Configure TEST_DATABASE_URL para executar os testes de upload.")

    schema = f"test_upload_{uuid.uuid4().hex}"
    with psycopg.connect(database_url) as conn:
        conn.execute(sql.SQL("CREATE SCHEMA {}").format(sql.Identifier(schema)))

    def get_test_connection():
        return psycopg.connect(
            database_url, options=f"-c search_path={schema}", row_factory=dict_row
        )

    monkeypatch.setattr(database_module, "get_connection", get_test_connection)
    monkeypatch.setattr(admin_repository_module, "get_connection", get_test_connection)
    monkeypatch.setattr(
        indicador_repository_module, "get_connection", get_test_connection, raising=False
    )
    init_db()
    repository = AdminRepository()
    repository.salvar(ADMIN_TESTE, PasswordHasher.gerar_hash(SENHA_TESTE))

    app.dependency_overrides[get_auth_service] = lambda: AuthService(
        repository, PasswordHasher()
    )
    yield
    app.dependency_overrides.clear()

    with psycopg.connect(database_url) as conn:
        conn.execute(sql.SQL("DROP SCHEMA {} CASCADE").format(sql.Identifier(schema)))



def test_upload_sem_autenticacao_retorna_401(banco_upload):
    response = _upload("idhm_geral_uf.csv", CSV_VALIDO, auth=None)

    assert response.status_code == 401
    assert response.json()["detail"] == "Autenticação necessária"
    assert response.headers["WWW-Authenticate"] == "Basic"


def test_upload_com_senha_errada_retorna_401(banco_upload):
    response = _upload("idhm_geral_uf.csv", CSV_VALIDO, auth=(ADMIN_TESTE, "errada"))

    assert response.status_code == 401


def test_upload_nao_autenticado_nao_altera_base(banco_upload):
    _upload("idhm_geral_uf.csv", CSV_VALIDO, auth=None)

    assert client.get(URL_SP_2010).json() == []



def test_upload_valido_retorna_sucesso(banco_upload):
    response = _upload("idhm_geral_uf.csv", CSV_VALIDO)
    assert response.status_code == 200

    assert response.status_code == 200
    corpo = response.json()
    assert corpo["mensagem"] == "Base de indicadores atualizada com sucesso."
    assert corpo["registros_processados"] == 4  
    assert corpo["atualizado_por"] == ADMIN_TESTE


def test_dados_enviados_podem_ser_consultados_pela_api(banco_upload):
    _upload("idhm_geral_uf.csv", CSV_VALIDO)

    consulta = client.get(URL_SP_2010)

    assert consulta.status_code == 200
    dados = consulta.json()
    assert len(dados) == 1
    assert dados[0]["unidade_territorial"] == "SP"
    assert dados[0]["valor"] == pytest.approx(0.820)


def test_reenvio_do_mesmo_arquivo_nao_duplica_registros(banco_upload):
    _upload("idhm_geral_uf.csv", CSV_VALIDO)
    _upload("idhm_geral_uf.csv", CSV_VALIDO)

    assert len(client.get(URL_SP_2010).json()) == 1



def test_arquivo_com_extensao_nao_csv_retorna_400(banco_upload):
    response = _upload("foto.png", b"\x89PNG\r\n\x1a\n", tipo="image/png")

    assert response.status_code == 400
    assert response.json()["detail"] == "Apenas arquivos com extensão .csv são permitidos."


def test_csv_com_dimensao_desconhecida_e_rejeitado(banco_upload):
    response = _upload("idhm_desconhecido_uf.csv", CSV_VALIDO)

    assert response.status_code == 400


def test_csv_sem_coluna_obrigatoria_e_rejeitado(banco_upload):
    response = _upload("idhm_geral_uf.csv", CSV_SEM_CODIGO)

    assert response.status_code == 400


def test_csv_vazio_e_rejeitado(banco_upload):
    response = _upload("idhm_geral_uf.csv", "")

    assert response.status_code in (400, 422)



def test_linha_invalida_nao_grava_as_linhas_validas(banco_upload):
    response = _upload("idhm_geral_uf.csv", CSV_COM_LINHA_INVALIDA)

    assert response.status_code == 400
    assert client.get(URL_SP_2010).json() == []


def test_upload_invalido_nao_altera_base_ja_populada(banco_upload):
    _upload("idhm_geral_uf.csv", CSV_VALIDO)
    antes = client.get("/api/indicadores").json()

    _upload("idhm_geral_uf.csv", CSV_COM_LINHA_INVALIDA)

    assert client.get("/api/indicadores").json() == antes



@pytest.mark.parametrize(
    "nome, conteudo",
    [
        ("idhm_desconhecido_uf.csv", CSV_VALIDO),
        ("idhm_geral_uf.csv", CSV_SEM_CODIGO),
        ("idhm_geral_uf.csv", CSV_COM_LINHA_INVALIDA),
    ],
)
def test_erros_nao_expoem_detalhes_internos(banco_upload, nome, conteudo):
    response = _upload(nome, conteudo)

    corpo = response.text.lower()
    assert response.status_code == 400
    assert "traceback" not in corpo
    assert ".py" not in corpo
    assert "psycopg" not in corpo
    assert "select " not in corpo