import bcrypt 

class PasswordHasher:
    # encapsula operações criptográficas de senha

    @staticmethod
    def gerar_hash(senha_plana: str) -> str:

        if not senha_plana or not senha_plana.strip():
            raise ValueError("A senha não pode ser vazia ou conter apenas espaços.")
        
        else:
            senha_bytes = senha_plana.encode('utf-8')
            salt = bcrypt.gensalt()

            hash_bytes = bcrypt.hashpw(senha_bytes, salt)
            hash_str = hash_bytes.decode("utf-8")
        
            return hash_str

    @staticmethod
    def verificar_senha(senha_plana: str, hash_armazenado: str) -> bool:
        senha = senha_plana.encode('utf-8')
        hash = hash_armazenado.encode('utf-8')

        resultado = bcrypt.checkpw(senha, hash)
        return resultado

