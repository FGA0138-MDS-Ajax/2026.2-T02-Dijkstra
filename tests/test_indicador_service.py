import logging
import psycopg
from unittest.mock import Mock
from unittest.mock import patch
import pandas as pd
from io import BytesIO


import pytest

from src.database.indicador_repository import IndicadorRepository
from src.services.indicador_service import (
    ConsultaIndicadoresIndisponivel,
    ErroPersistenciaIndicadores,
    ImportacaoService,
    IndicadorService,
    ComparacaoSemAnoInformado,
    ComparacaoEstadosIguaisMesmoAno,
    ComparacaoSemDados,
    EstadoInvalido,
)


@pytest.mark.parametrize("mensagem", [
    "connection refused",
    "server closed the connection",
])
def test_falha_operacional_e_traduzida_e_registrada(mensagem, caplog):
    repository = Mock(spec=IndicadorRepository)
    falha = psycopg.OperationalError(mensagem)
    repository.listar.side_effect = falha
    service = IndicadorService(repository)

    with caplog.at_level(logging.ERROR, logger="src.services.indicador_service"):
        with pytest.raises(ConsultaIndicadoresIndisponivel) as erro:
            service.consultar(estado="AC", dimensao="educacao", periodo=1991)

    assert erro.value.__cause__ is falha
    assert any(
        registro.exc_info is not None and registro.exc_info[1] is falha
        for registro in caplog.records
    )


@pytest.mark.parametrize("falha", [
    ValueError("Erro inesperado"),
    psycopg.ProgrammingError("Uso incorreto da conexão"),
])
def test_erros_inesperados_nao_sao_traduzidos_para_indisponibilidade(falha):
    repository = Mock(spec=IndicadorRepository)
    repository.listar.side_effect = falha

    with pytest.raises(type(falha)) as erro:
        IndicadorService(repository).consultar()

    assert erro.value is falha

def test_falha_na_persistencia_e_traduzida_e_registrada(caplog):
    repository = Mock(spec=IndicadorRepository)
    falha = psycopg.OperationalError("connection refused")
    repository.salvar_ou_atualizar_indicadores.side_effect = falha

    service = ImportacaoService(repository)

    with patch(
        "src.services.indicador_service.tratar_csv",
        return_value=pd.DataFrame(),
    ), patch(
        "src.services.indicador_service.preparar_para_persistencia",
        return_value=pd.DataFrame(),
    ):
        file = Mock()
        file.filename = "idhm_geral_uf.csv"
        file.file = BytesIO(b"conteudo ficticio")

        with caplog.at_level(
            logging.ERROR,
            logger="src.services.indicador_service",
        ):
            with pytest.raises(ErroPersistenciaIndicadores) as erro:
                service.processar_upload(file)

    assert erro.value.__cause__ is falha
    assert any(
        registro.exc_info is not None and registro.exc_info[1] is falha
        for registro in caplog.records
    )

@pytest.fixture
def service_comparacao():
    """Gera um serviço com o repositório mockado preparado para interceptar a função consultar."""
    repository = Mock(spec=IndicadorRepository)
    return IndicadorService(repository)


def test_comparacao_com_sucesso_anos_diferentes(service_comparacao):
    # Emula um banco devolvendo dados para SP em 2010 e RJ em 2021
    def mock_consultar(estado, dimensao=None, periodo=None):
        if estado == "SP" and periodo == 2010:
            return [{"dimensao": "renda", "valor": 1000.0, "unidade_medida": "R$", "fonte": "IBGE", "periodo_referencia": "2010"}]
        if estado == "RJ" and periodo == 2021:
            return [{"dimensao": "educacao", "valor": 0.8, "unidade_medida": "índice", "fonte": "IBGE", "periodo_referencia": "2021"}]
        return []

    with patch.object(service_comparacao, 'consultar', side_effect=mock_consultar):
        resultado = service_comparacao.comparar(estado_a="SP", ano_a=2010, estado_b="RJ", ano_b=2021)

        # Valida Estado A
        assert resultado["estados"][0]["estado"] == "SP"
        assert resultado["estados"][0]["periodo_referencia"] == 2010
        assert resultado["estados"][0]["indicadores"]["renda"]["valor"] == 1000.0
        
        # Valida Estado B
        assert resultado["estados"][1]["estado"] == "RJ"
        assert resultado["estados"][1]["periodo_referencia"] == 2021
        assert resultado["estados"][1]["indicadores"]["educacao"]["valor"] == 0.8
        assert resultado["estados"][1]["indicadores"]["renda"]["valor"] is None


def test_comparacao_mesmo_ano_se_ano_b_nao_for_informado(service_comparacao):
    # ambos estados com mesmo ano
    with patch.object(service_comparacao, 'consultar', return_value=[{"dimensao": "renda", "valor": 500, "periodo_referencia": "2015"}]):
        resultado = service_comparacao.comparar(estado_a="SP", estado_b="RJ", ano_a=2015)
        
        assert resultado["estados"][0]["periodo_referencia"] == 2015
        assert resultado["estados"][1]["periodo_referencia"] == 2015


@pytest.mark.parametrize("estado_a, ano_a, estado_b, ano_b, excecao_esperada", [
    ("SP", 2020, "SP", 2020, ComparacaoEstadosIguaisMesmoAno),      #1 mesmo estado e mesmo ano
    ("XX", 2020, "RJ", 2020, EstadoInvalido),                       #2 estado a invalido
    ("SP", 2020, "XX", 2020, EstadoInvalido),                       #3 estado b invalido
])
def test_validacoes_de_entrada_comparacao_rejeitada(service_comparacao, estado_a, ano_a, estado_b, ano_b, excecao_esperada):
    with pytest.raises(excecao_esperada):
        service_comparacao.comparar(estado_a=estado_a, ano_a=ano_a, estado_b=estado_b, ano_b=ano_b)


def test_comparacao_falha_se_estado1_nao_tiver_dados(service_comparacao):
    # O mock retorna vazio logo na primeira consulta
    with patch.object(service_comparacao, 'consultar', return_value=[]):
        with pytest.raises(ComparacaoSemDados) as erro:
            service_comparacao.comparar(estado_a="SP", ano_a=1995, estado_b="RJ")
            
        assert "Não há dados para SP em 1995" in str(erro.value)


def test_comparacao_falha_se_estado2_nao_tiver_dados(service_comparacao):
    #Estado B sem dados
    def mock_consultar(estado, dimensao=None, periodo=None):
        if estado == "SP":
            return [{"dimensao": "renda", "periodo_referencia": "2015"}]
        return []

    with patch.object(service_comparacao, 'consultar', side_effect=mock_consultar):
        with pytest.raises(ComparacaoSemDados) as erro:
            service_comparacao.comparar(estado_a="SP", ano_a=2015, estado_b="RJ", ano_b=1991)
            
        assert "Não há dados para RJ em 1991" in str(erro.value)


def test_comparacao_sem_anos_informados_encontra_mais_recente_em_comum(service_comparacao):
    #manda sem ano especificado, ai deve encontrar o ano recente em comum de ambos
    #finge banco
    def mock_consultar(estado, dimensao=None, periodo=None):
        # o mock vai responder que tem SP em 2010 e 2022 e RJ em 1991 e 2022
        if estado == "SP" and periodo is None:
            return [{"periodo_referencia": "2010"}, {"periodo_referencia": "2022"}]
        if estado == "RJ" and periodo is None:
            return [{"periodo_referencia": "1991"}, {"periodo_referencia": "2022"}]
        
        #vai encontrar o ano 2022 como em comum e vai pedir os indicadores
        if estado == "SP" and periodo == 2022:
            return [{"dimensao": "renda", "valor": 2000.0, "periodo_referencia": "2022"}]
        if estado == "RJ" and periodo == 2022:
            return [{"dimensao": "renda", "valor": 1500.0, "periodo_referencia": "2022"}]
        
        return []
    
    #substitui consultar com o mock 
    with patch.object(service_comparacao, 'consultar', side_effect=mock_consultar):
        resultado = service_comparacao.comparar(estado_a="SP", estado_b="RJ") # procura SP e RJ com mock
        
        # verifica se encontrou 2022 como ano em comum
        assert resultado["estados"][0]["periodo_referencia"] == 2022
        assert resultado["estados"][1]["periodo_referencia"] == 2022
        assert resultado["estados"][0]["indicadores"]["renda"]["valor"] == 2000.0


#def test_somente_ano_b_informado_e_rejeitado(service_comparacao):
#    with pytest.raises(ComparacaoSemAnoInformado):
#        service_comparacao.comparar(estado_a="SP", estado_b="RJ", ano_b=2010)
#
#    service_comparacao.repository.listar.assert_not_called()

def test_mesmo_estado_em_anos_diferentes_e_permitido(service_comparacao):
    def mock_consultar(estado, dimensao=None, periodo=None):
        valor = 0.5 if periodo == 2010 else 0.7
        return [{"dimensao": "renda", "valor": valor, "periodo_referencia": str(periodo)}]

    with patch.object(service_comparacao, "consultar", side_effect=mock_consultar):
        resultado = service_comparacao.comparar(estado_a="SP", estado_b="SP", ano_a=2010, ano_b=2021)

    assert [e["indicadores"]["renda"]["valor"] for e in resultado["estados"]] == [0.5, 0.7]


def test_valor_ausente_e_preservado_e_zero_nao_vira_ausente(service_comparacao):
    registros = [
        {"dimensao": "renda", "valor": None, "periodo_referencia": "2010"},
        {"dimensao": "educacao", "valor": 0.0, "periodo_referencia": "2010"},
    ]
    with patch.object(service_comparacao, "consultar", return_value=registros):
        resultado = service_comparacao.comparar(estado_a="SP", estado_b="RJ", ano_a=2010)

    indicadores = resultado["estados"][0]["indicadores"]
    assert indicadores["renda"]["valor"] is None          # nulo continua nulo
    assert indicadores["educacao"]["valor"] == 0.0        # zero real continua zero
    assert indicadores["longevidade"]["valor"] is None    # sem registro


def test_sem_anos_e_sem_ano_em_comum(service_comparacao):
    def mock_consultar(estado, dimensao=None, periodo=None):
        ano = "2010" if estado == "SP" else "2022"
        return [{"periodo_referencia": ano, "valor": 0.5}]

    with patch.object(service_comparacao, "consultar", side_effect=mock_consultar):
        with pytest.raises(ComparacaoSemDados):
            service_comparacao.comparar(estado_a="SP", estado_b="RJ")


def test_sem_anos_com_mesmo_estado_nao_consulta(service_comparacao):
    with patch.object(service_comparacao, "consultar") as consultar:
        with pytest.raises(ComparacaoEstadosIguaisMesmoAno):
            service_comparacao.comparar(estado_a="SP", estado_b="SP")

    consultar.assert_not_called()