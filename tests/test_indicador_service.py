import logging
import sqlite3
from unittest.mock import Mock

import pytest

from src.database.indicador_repository import IndicadorRepository
from src.services.indicador_service import (
    ConsultaIndicadoresIndisponivel,
    IndicadorService,
)


@pytest.mark.parametrize("mensagem", [
    "database is locked",
    "unable to open database file",
])
def test_falha_operacional_e_traduzida_e_registrada(mensagem, caplog):
    repository = Mock(spec=IndicadorRepository)
    falha = sqlite3.OperationalError(mensagem)
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
    sqlite3.ProgrammingError("Uso incorreto da conexão"),
])
def test_erros_inesperados_nao_sao_traduzidos_para_indisponibilidade(falha):
    repository = Mock(spec=IndicadorRepository)
    repository.listar.side_effect = falha

    with pytest.raises(type(falha)) as erro:
        IndicadorService(repository).consultar()

    assert erro.value is falha
