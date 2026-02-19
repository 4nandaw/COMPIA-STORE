from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Configurações principais da aplicação.

    Nesta fase inicial, mantemos apenas variáveis genéricas,
    sem detalhes de regras de negócio.
    """

    PROJECT_NAME: str = "COMPIA Store"
    API_V1_PREFIX: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    return Settings()

