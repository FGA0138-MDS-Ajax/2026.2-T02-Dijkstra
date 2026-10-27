import sqlite3
from src.database.database import get_connection

class AdminRepository:
    def __init__(self, db_path: str | None = None):
        self._db_path = db_path
    
    def buscar_por_usuario(self, usuario: str) -> dict:
        conn = get_connection(self._db_path)

        try:
            cursor = conn.execute(
                "SELECT id, usuario, password_hash FROM administradores WHERE usuario = ?", (usuario,)
            )
            row = cursor.fetchone()
            
            if row:
                return dict(row)
            else:
                return None

        finally:
            # sempre fechar a conexão
            conn.close()
        
    def salvar(self, usuario: str, password_hash: str) -> int:
        conn = get_connection(self._db_path)

        try:
            cursor = conn.execute(
                "INSERT INTO administradores (usuario, password_hash) VALUES (?, ?)", (usuario, password_hash)
            )
            
            # confirmar a gravação no banco
            conn.commit()

            # retornar o ID
            return cursor.lastrowid
        finally:
            conn.close()

