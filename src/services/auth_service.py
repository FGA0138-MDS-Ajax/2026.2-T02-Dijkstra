# aplicação das regras de negocio

class CredenciaisInvalidasException(Exception):
    """Disparada quando o login falha por qualquer motivo."""
    pass
class AuthService:
    def __init__(self, repository, hasher):
        self._repository = repository
        self._hasher = hasher

    def autenticar(self, usuario: str, senha_plana: str) -> dict:

        if not usuario or not usuario.strip() or not senha_plana or not senha_plana.strip():
            raise CredenciaisInvalidasException("Credenciais inválidas.")
        else:
            admin = self._repository.buscar_por_usuario(usuario.strip())
            
            if not admin:
                 raise CredenciaisInvalidasException("Credenciais inválidas.")
            
            senha_valida = self._hasher.verificar_senha(senha_plana, admin["password_hash"])

            if not senha_valida:
                raise CredenciaisInvalidasException("Credenciais inválidas.")
            
            return {
                "id": admin["id"],
                "usuario": admin["usuario"]
            }
        