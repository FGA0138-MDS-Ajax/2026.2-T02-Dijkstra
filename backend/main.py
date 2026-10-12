import os
from fastapi import FastAPI 
import sqlite3

app = FastAPI(title = "Dijkstra API")

@app.get("/")
def home():
    db_url = os.getenv("DATABASE_URL", "Não configurada")
    env = os.getenv("ENVIRONMENT", "Não configurada")

    return {
        "status": "API rodando com sucesso no contêiner!",
        "ambiente": env,
        "database_url": db_url
        }

def inicializar_banco():
    conn = sqlite3.connect("/app/data/dijkstra.db")
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS teste (id INTEGER PRIMARY KEY, msg TEXT)")
    conn.commit()
    conn.close()

inicializar_banco()

@app.get("/banco")
def testar_banco():
    conn = sqlite3.connect("/app/data/dijkstra.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO teste (msg) VALUES ('Persistência funcionando!')")
    conn.commit()
    cursor.execute("SELECT COUNT(*) FROM teste")
    total = cursor.fetchone()[0]
    conn.close()
    return {"total_registros_no_sqlite": total}
