import psycopg

from fastapi.testclient import TestClient
import pytest
import platform
import statistics
import subprocess
import time
from src.api.main import app, get_indicador_service, consultar_indicadores
from src.api.schemas import Dimensao
from src.database.indicador_repository import IndicadorRepository
from src.services.indicador_service import IndicadorService

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

@pytest.fixture(autouse=True)
def servico_simulado(monkeypatch):
    monkeypatch.setitem(
        app.dependency_overrides,
        get_indicador_service,
        lambda: MockIndicadorService(),
    )

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


def test_falha_operacional_do_banco_retorna_503(monkeypatch):
    def falhar(self, **filtros):
        raise psycopg.OperationalError("connection refused")

    monkeypatch.setattr(IndicadorRepository, "listar", falhar)
    monkeypatch.setitem(
        app.dependency_overrides,
        get_indicador_service,
        lambda: IndicadorService(IndicadorRepository()),
    )

    response = client.get("/api/indicadores?estado=AC&dimensao=educacao&periodo=1991")

    assert response.status_code == 503
    assert response.json() == {
        "detail": "Não foi possível consultar os indicadores no momento."
    }


#teste issue S3-08 o serviço é SIMULADO (mock) revisar ao longo das spring e consolidação do nosso bd

LIMITE_B05_SEGUNDOS = 3.0
N_MEDICOES_B05 = 5
TOTAL_REGISTROS_B05 = 50_000
URL_B05 = "/api/indicadores?estado=AC&dimensao=educacao&periodo=1991"

ESPERADO_B05 = 310

ESTADOS_B05 = [
    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
    "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
]
DIMENSOES_B05 = ["educacao", "idhm_geral"]
PERIODOS_B05 = ["1991", "2000", "2010"]


def gerar_dataset_b05(total=TOTAL_REGISTROS_B05):
    """Gera sempre os mesmos registros (reproduzível, sem aleatoriedade)."""
    combinacoes = [
        (e, d, p) for e in ESTADOS_B05 for d in DIMENSOES_B05 for p in PERIODOS_B05
    ]
    registros = [dict(test_json[0])]  # registro conhecido: id 433, AC, educacao, 1991
    for i in range(total - 1):
        estado, dimensao, periodo = combinacoes[i % len(combinacoes)]
        registros.append({
            "id": 1000 + i,
            "nome_indicador": "IDHM",
            "unidade_territorial": estado,
            "dimensao": dimensao,
            "valor": 0.5,
            "periodo_referencia": periodo,
            "unidade_medida": "índice",
            "fonte": "IPEA",
        })
    return registros


class MockIndicadorServiceB05:
    """Serviço simulado que filtra o dataset em memória e conta as chamadas."""

    def __init__(self, registros):
        self.registros = registros
        self.chamadas = 0

    def consultar(self, estado=None, dimensao=None, periodo=None):
        self.chamadas += 1
        dimensao = getattr(dimensao, "value", dimensao)
        return [
            r for r in self.registros
            if (estado is None or r["unidade_territorial"] == estado)
            and (dimensao is None or r["dimensao"] == dimensao)
            and (periodo is None or r["periodo_referencia"] == str(periodo))
        ]


def _commit_atual():
    """Commit testado. Acrescenta aviso se houver alterações não commitadas."""
    try:
        commit = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"], text=True
        ).strip()
        alterado = subprocess.check_output(
            ["git", "status", "--porcelain"], text=True
        ).strip()
        return commit + ("+alteracoes-nao-commitadas" if alterado else "")
    except Exception:
        return "desconhecido"


@pytest.fixture(scope="module")
def dataset_b05():
    return gerar_dataset_b05()


@pytest.fixture
def servico_b05(dataset_b05, monkeypatch):
    servico = MockIndicadorServiceB05(dataset_b05)
    monkeypatch.setitem(
        app.dependency_overrides, get_indicador_service, lambda: servico
    )
    return servico


def test_b05_dados_corretos_e_desempenho(servico_b05, dataset_b05, record_property):
    total_registros = len(dataset_b05)

    # aquecimento (descartado)
    client.get(URL_B05)

    tempos = []
    for _ in range(N_MEDICOES_B05):
        inicio = time.perf_counter()
        response = client.get(URL_B05)
        tempos.append(time.perf_counter() - inicio)

    # Correção: rápido mas errado não passa
    assert response.status_code == 200
    dados = response.json()
    assert len(dados) == ESPERADO_B05
    assert all(d["unidade_territorial"] == "AC" for d in dados)
    assert all(d["dimensao"] == "educacao" for d in dados)
    assert all(d["periodo_referencia"] == "1991" for d in dados)
    esperado = test_json[0]
    assert any(
        d["id"] == esperado["id"] and d["valor"] == pytest.approx(esperado["valor"])
        for d in dados
    ), f"Registro esperado {esperado['id']} não encontrado na resposta."

    # Desempenho
    pior = max(tempos)
    mediana = statistics.median(tempos)

    # Registro da medição
    commit = _commit_atual()
    ambiente = f"{platform.system()} {platform.release()} / Python {platform.python_version()}"
    operacao = f"GET {URL_B05}"
    record_property("commit", commit)
    record_property("ambiente", ambiente)
    record_property("registros_dataset", total_registros)
    record_property("operacao", operacao)
    record_property("tempo_mediana_s", round(mediana, 4))
    record_property("tempo_max_s", round(pior, 4))
    print(
        f"\n[B-05] commit={commit} registros={total_registros} "
        f"mediana={mediana:.4f}s max={pior:.4f}s limite={LIMITE_B05_SEGUNDOS}s"
    )
    print("| Commit | Ambiente | Registros | Operação | Mediana | Máximo | Esperado | Obtido |")
    print("|---|---|---|---|---|---|---|---|")
    print(
        f"| {commit} | {ambiente} | {total_registros} | `{operacao}` | "
        f"{mediana:.4f}s | {pior:.4f}s | {ESPERADO_B05} registros, <= {LIMITE_B05_SEGUNDOS}s | "
        f"{len(dados)} registros, {pior:.4f}s |"
    )

    assert pior <= LIMITE_B05_SEGUNDOS, (
        f"B-05 não atendido: pior tempo {pior:.2f}s, mediana {mediana:.2f}s "
        f"(limite {LIMITE_B05_SEGUNDOS}s, {total_registros} registros). "
        f"Abrir issue de correção vinculada à #15."
    )


@pytest.mark.parametrize(
    "query, filtros",
    [
        ("estado=AC", {"unidade_territorial": "AC"}),
        ("estado=SP&dimensao=idhm_geral", {"unidade_territorial": "SP", "dimensao": "idhm_geral"}),
        ("estado=DF&periodo=2010", {"unidade_territorial": "DF", "periodo_referencia": "2010"}),
        ("dimensao=educacao&periodo=2000", {"dimensao": "educacao", "periodo_referencia": "2000"}),
        (
            "estado=AC&dimensao=educacao&periodo=1991",
            {"unidade_territorial": "AC", "dimensao": "educacao", "periodo_referencia": "1991"},
        ),
    ],
)
def test_b05_filtros_validos(servico_b05, dataset_b05, query, filtros):
    response = client.get(f"/api/indicadores?{query}")

    assert response.status_code == 200
    dados = response.json()
    esperados = [r for r in dataset_b05 if all(r[c] == v for c, v in filtros.items())]

    assert len(dados) > 0
    assert all(all(d[c] == v for c, v in filtros.items()) for d in dados)
    assert len(dados) == len(esperados)
    assert {d["id"] for d in dados} == {r["id"] for r in esperados}


@pytest.mark.parametrize(
    "query",
    [
        "estado=AC&dimensao=educacao&periodo=2026",  # período válido, sem dados
        "estado=AC&periodo=1995",                    # período válido, sem dados
    ],
)
def test_b05_consulta_sem_resultados(servico_b05, query):
    response = client.get(f"/api/indicadores?{query}")

    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.parametrize(
    "query",
    [
        "estado=",
        "estado=sp",
        "estado=CA",
        "dimensao=",
        "periodo=ab",
        "periodo=2029",
        "periodo=1850",
    ],
)
def test_b05_parametros_invalidos_retornam_422_sem_consultar(servico_b05, query):
    response = client.get(f"/api/indicadores?{query}")

    assert response.status_code == 422
    assert servico_b05.chamadas == 0  # parâmetro inválido nem chega ao serviço
