from fastapi import FastAPI

from app.api.v1 import api_router

app = FastAPI(
    title="COMPIA Store API",
    description="API backend da Loja Virtual da Editora de Inteligência Artificial (COMPIA).",
    version="0.1.0",
)

app.include_router(api_router)


