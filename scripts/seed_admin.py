import os
import sys

from dotenv import load_dotenv

from src.auth.security import PasswordHasher
from src.database.admin_repository import AdminRepository
from src.database.database import init_db

def main() -> int:
    load_dotenv()

    usuario = os.getenv("ADMIN_USUARIO", "").strip()
    senha = os.getenv("ADMIN_SENHA", "")

    if not usuario or not senha:
        print("Erro: ADMIN_USUARIO e ADMIN_SENHA devem ser definidos no arquivo .env")
        return 1

    init_db()

    repository = AdminRepository()

    if repository.buscar_por_usuario(usuario): 
        print(f"O administrador '{usuario}' já existe. Nenhuma ação foi realizada.")
        return 0

    password_hash = PasswordHasher().gerar_hash(senha)
    admin_id = repository.salvar(usuario, password_hash)

    print(f"Administrador '{usuario}' criado com sucesso com ID: {admin_id}")
    return 0

if __name__ == "__main__":
    sys.exit(main())