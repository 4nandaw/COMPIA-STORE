## COMPIA Store — Monorepo

Loja Virtual de uma Editora de Inteligência Artificial (COMPIA). 
Este repositório segue o modelo **monorepo**, agrupando backend (API), 
frontend (SPA).

### Stack Principal

- **Backend**: Python + FastAPI + Uvicorn
- **Frontend**: React + Vite + JavaScript (JSX)
- **Gestão de ambiente**: arquivos `.env` (base em `.env.example`)

---

### Como Rodar o Projeto (Desenvolvimento)

#### 1. Pré-requisitos

- **Python** 3.11+ (recomendado)
- **Node.js** 18+ (ou versão LTS recente)
- Gerenciador de pacotes: `npm`, `yarn` ou `pnpm` (exemplos abaixo usam `npm`)

---

#### 2. Configurar variáveis de ambiente

Na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` se necessário (portas, URL da API, etc.).

---

#### 3. Backend (FastAPI)

No diretório `backend/`:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000
```

A API ficará acessível em `http://localhost:8000`.

> Por enquanto, apenas a estrutura está criada.

---

#### 4. Frontend (React + Vite + TS)

No diretório `frontend/`:

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará acessível em `http://localhost:5173`.

Certifique-se de que o backend esteja rodando na porta configurada
em `VITE_API_BASE_URL` (por padrão, `http://localhost:8000/api/v1`).