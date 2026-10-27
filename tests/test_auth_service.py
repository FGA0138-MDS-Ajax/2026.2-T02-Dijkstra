import pytest
from src.auth.security import PasswordHasher
from src.services.auth_service import AuthService, CredenciaisInvalidasException

# Mock simples do Repositório para testar a regra de negócio em isolamento
class FakeAdminRepository:
    def __init__(self, admin_existente=None):
        self._admin = admin_existente

    def buscar_por_usuario(self, usuario: str):
        if self._admin and self._admin["usuario"] == usuario:
            return self._admin
        return None


def test_autenticacao_sucesso():
    # gerar o hash para uma senha conhecida
    hash_senha = PasswordHasher.gerar_hash("senha123")
    
    # criar repositório fake com esse admin
    admin_falso = {"id": 1, "usuario": "admin", "password_hash": hash_senha}
    repo = FakeAdminRepository(admin_falso)
    
    # criar o serviço com as dependências injetadas
    service = AuthService(repository=repo, hasher=PasswordHasher)
    
    # executar autenticação com credenciais corretas
    resultado = service.autenticar("admin", "senha123")
    
    # garantir que retornou os dados esperados e NUNCA vazou a senha/hash
    assert resultado["id"] == 1
    assert resultado["usuario"] == "admin"
    assert "password_hash" not in resultado


def test_autenticacao_senha_incorreta():
    hash_senha = PasswordHasher.gerar_hash("senha123")
    repo = FakeAdminRepository({"id": 1, "usuario": "admin", "password_hash": hash_senha})
    service = AuthService(repository=repo, hasher=PasswordHasher)
    
    # O pytest.raises verifica se a exceção correta foi lançada
    with pytest.raises(CredenciaisInvalidasException):
        service.autenticar("admin", "senha_errada")


def test_autenticacao_usuario_inexistente():
    # Repositório vazio: não existe nenhum usuário cadastrado
    repo = FakeAdminRepository(None)
    service = AuthService(repository=repo, hasher=PasswordHasher)
    
    with pytest.raises(CredenciaisInvalidasException):
        service.autenticar("fantasma", "senha123")
