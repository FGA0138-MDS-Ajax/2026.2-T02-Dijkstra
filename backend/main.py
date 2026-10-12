from fastapi import FastAPI 

app = FastAPI(title = "Dijkstra API")

@app.get("/")
def home():
    return {"status": "API rodando com sucesso no contêiner!"}