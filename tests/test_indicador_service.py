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