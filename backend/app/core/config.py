from functools import lru_cache
from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Configurações principais da aplicação.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )

    PROJECT_NAME: str = "COMPIA Store"
    API_V1_PREFIX: str = "/api/v1"
    BACKEND_CORS_ORIGINS: str = "http://localhost:5173"

    # Database
    DATABASE_URL: str = ""
    MYSQLHOST: str = ""
    MYSQLPORT: str = "3306"
    MYSQLDATABASE: str = ""
    MYSQLUSER: str = ""
    MYSQLPASSWORD: str = ""

    # Email (Resend)
    RESEND_API_KEY: str = ""
    RESEND_FROM_EMAIL: str = "onboarding@resend.dev"
    STORE_CONTACT_EMAIL: str = "contato@compia.com.br"

    @property
    def cors_origins_list(self) -> list[str]:
        """Converte a string de origens separadas por vírgula em lista."""
        return [o.strip() for o in self.BACKEND_CORS_ORIGINS.split(",") if o.strip()]

    @property
    def database_url(self) -> str:
        """Resolve a URL do banco para ambientes locais, Docker e Render."""
        raw_url = self.DATABASE_URL.strip()
        if raw_url:
            if raw_url.startswith("mysql://"):
                return raw_url.replace("mysql://", "mysql+pymysql://", 1)
            return raw_url

        if self.MYSQLHOST and self.MYSQLDATABASE and self.MYSQLUSER:
            encoded_password = quote_plus(self.MYSQLPASSWORD)
            return (
                f"mysql+pymysql://{self.MYSQLUSER}:{encoded_password}@"
                f"{self.MYSQLHOST}:{self.MYSQLPORT}/{self.MYSQLDATABASE}"
            )

        return "mysql+pymysql://compia:compia123@mysql:3306/compia_store"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
