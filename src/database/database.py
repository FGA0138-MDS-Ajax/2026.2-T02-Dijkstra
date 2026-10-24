import os
import sqlite3
from pathlib import Path

DEFAULT_DB_PATH = "data/indicadores.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS indicadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_indicador TEXT NOT NULL,
    unidade_territorial TEXT NOT NULL,
    dimensao TEXT NOT NULL,
    valor REAL,                  
    periodo_referencia TEXT NOT NULL,
    unidade_medida TEXT,
    fonte TEXT
);

CREATE TABLE IF NOT EXISTS administradores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);
"""


def get_db_path() -> str:
    return os.getenv("DB_PATH", DEFAULT_DB_PATH)


def get_connection(db_path: str | None = None) -> sqlite3.Connection:
    path = db_path or get_db_path()
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(db_path: str | None = None) -> None:
    conn = get_connection(db_path)
    try:
        conn.executescript(SCHEMA)
        conn.commit()
    finally:
        conn.close()