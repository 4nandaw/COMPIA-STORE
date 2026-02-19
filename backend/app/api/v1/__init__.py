from fastapi import APIRouter

from app.core.config import get_settings

settings = get_settings()

api_router = APIRouter(prefix=settings.API_V1_PREFIX)

# Aqui serão incluídos, futuramente, os módulos de endpoints, por exemplo:
# from app.api.v1.endpoints import produtos
# api_router.include_router(produtos.router, prefix="/products", tags=["products"])

