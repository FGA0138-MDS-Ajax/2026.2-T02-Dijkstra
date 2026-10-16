from fastapi.testclient import TestClient
import pytest
from src.api.main import app, get_indicador_service, consultar_indicadores
from src.api.schemas import Dimensao

client = TestClient(app)

test_json = [{
    "id":433,
    "nome_indicador":"IDHM",
    "unidade_territorial":"AC",
    "dimensao":"educacao",
    "valor":0.176,
    "periodo_referencia":"1991",
    "unidade_medida":"índice",
    "fonte":"IPEA"
}]

class MockIndicadorService:
    def consultar(self,estado=None,dimensao=None,periodo=None):
        if estado == 'AC' and dimensao == 'educacao' and periodo == 1991:
            return test_json
        return []

app.dependency_overrides[get_indicador_service] = lambda : MockIndicadorService()

"""Teste com o main.consultar_indicadores()"""
def test_estado_com_dados():
    mock_service = MockIndicadorService()
    result = consultar_indicadores(estado='AC',dimensao=Dimensao.educacao,periodo=1991,service=mock_service)
    assert result == test_json

def test_estado_sem_dados():
    mock_service = MockIndicadorService()
    result = consultar_indicadores(estado='DF',service=mock_service)
    assert result == []

"""Teste com o fastAPI"""
def test_health():
    # Simulando: curl "/health"
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_validacao_estado_vazio():
    # Simulando: curl "/api/indicadores?estado="
    response = client.get("/api/indicadores?estado=")

    assert response.status_code == 422
    details = response.json()["detail"]
    assert details[0]["type"] == "string_pattern_mismatch"
    assert details[0]["loc"] == ["query", "estado"]


def test_validacao_dimensao_invalida_ou_vazia():
    # Simulando: curl "/api/indicadores?estado=DF&dimensao="
    response = client.get("/api/indicadores?estado=DF&dimensao=")

    assert response.status_code == 422
    details = response.json()["detail"]
    assert details[0]["type"] == "enum"
    assert details[0]["loc"] == ["query", "dimensao"]


def test_validacao_periodo_nao_inteiro():
    # Simulando: curl "/api/indicadores?estado=DF&dimensao=idhm_geral&periodo=ab"
    response = client.get("/api/indicadores?estado=DF&dimensao=idhm_geral&periodo=ab")

    assert response.status_code == 422
    details = response.json()["detail"]
    assert details[0]["type"] == "int_parsing"
    assert details[0]["loc"] == ["query", "periodo"]

def test_validacao_periodo_maior():
    # Simulando: curl "/api/indicadores?estado=AC&dimensao=idhm_geral&periodo=2029"
    response = client.get("/api/indicadores?estado=AC&dimensao=idhm_geral&periodo=2029")

    assert response.status_code == 422
    details = response.json()["detail"]
    assert details[0]["type"] == "less_than_equal"
    assert details[0]["loc"] == ["query", "periodo"]
    assert details[0]["ctx"]["le"] == 2026

def test_validacao_multiplos_erros_estado_e_periodo():
    # Simulando: curl "/api/indicadores?estado=CA&dimensao=idhm_geral&periodo=1850"
    response = client.get("/api/indicadores?estado=CA&dimensao=idhm_geral&periodo=1850")

    assert response.status_code == 422
    details = response.json()["detail"]
    assert len(details) == 2
    assert details[0]["type"] == "string_pattern_mismatch"
    assert details[0]["loc"] == ["query", "estado"]
    assert details[1]["type"] == "greater_than_equal"
    assert details[1]["loc"] == ["query", "periodo"]

def test_validacao_estado_minusculo_rejeitado():
    # Simulando: curl "/api/indicadores?estado=sp"
    response = client.get("/api/indicadores?estado=sp")

    assert response.status_code == 422
    assert response.json()["detail"][0]["type"] == "string_pattern_mismatch"

def test_requisicao_sem_parametros_retorna_200():
    # Simulando: curl "/api/indicadores"
    response = client.get("/api/indicadores")

    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_sucesso_busca_indicadores_via_http():
    # Simulando: curl "h/api/indicadores?estado=AC&dimensao=educacao&periodo=1991"
    response = client.get("/api/indicadores?estado=AC&dimensao=educacao&periodo=1991")

    assert response.status_code == 200
    assert response.json() == test_json