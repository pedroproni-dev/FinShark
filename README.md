# 🦈 FinShark — Financial Data Platform

> React TypeScript + ASP.NET Core 8 + Twelve Data API

Plataforma de dados financeiros inspirada no curso [Teddy Smith - React + .NET Core Finance Project](https://www.youtube.com/playlist?list=PL82C6-O4XrHcNJd4ejg8pX5fZaIDZmXyn).

## ✨ Funcionalidades

- 🔐 **Autenticação JWT** — Registro, login e sessão segura
- 📊 **Cotações em tempo real** — Via [Twelve Data API](https://twelvedata.com/)
- 🔍 **Busca de ações** — Por símbolo ou nome de empresa
- 💼 **Portfólio personalizado** — Adicione e remova ações favoritas
- 💬 **Comentários** — Deixe análises por ação
- 📱 **UI responsiva** — TailwindCSS dark theme

---

## 🏗 Arquitetura

```
FinShark/
├── api/                        # ASP.NET Core 8 Web API
│   ├── Controllers/            # StockController, CommentController, AccountController, PortfolioController, QuoteController
│   ├── Data/                   # ApplicationDBContext (EF Core + Identity)
│   ├── Dtos/                   # DTOs por domínio (Stock, Comment, Account, Portfolio)
│   ├── Extensions/             # ClaimsExtensions (GetUsername)
│   ├── Helpers/                # QueryObject (paginação/filtro)
│   ├── Interfaces/             # IStockRepository, ICommentRepository, IPortfolioRepository, ITokenService, ITwelveDataService
│   ├── Mappers/                # StockMappers, CommentMappers
│   ├── Models/                 # AppUser, Stock, Comment, Portfolio
│   ├── Repository/             # StockRepository, CommentRepository, PortfolioRepository
│   └── Service/                # TokenService (JWT), TwelveDataService
│
└── frontend/                   # React 18 + TypeScript + Vite
    └── src/
        ├── components/         # Navbar, StockCard, QuoteCard, CommentSection, ProtectedRoute
        ├── context/            # useAuth (UserContext + Provider)
        ├── models/             # TypeScript types
        ├── pages/              # HomePage, SearchPage, PortfolioPage, CompanyPage, AuthPages
        └── services/           # AuthService (todas as chamadas de API)
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (ou SQLite para dev)
- Conta gratuita na [Twelve Data](https://twelvedata.com/)

---

### 1. Backend (API)

```bash
cd api

# Restaurar pacotes
dotnet restore

# Configurar appsettings.json
# Preencha sua Twelve Data API Key e ajuste a connection string

# Criar/atualizar banco de dados
dotnet ef migrations add InitialCreate
dotnet ef database update

# Rodar o servidor
dotnet run
# API disponível em: http://localhost:5183
# Swagger UI em:    http://localhost:5183/swagger
```

### 2. Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
# App disponível em: http://localhost:3000
```

---

## ⚙️ Configuração (`api/appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=finshark.db"
  },
  "JWT": {
    "Issuer": "http://localhost:5183",
    "Audience": "http://localhost:5183",
    "SigningKey": "SuaChaveSecretaAqui_MinimoDe32Caracteres!"
  },
  "TwelveData": {
    "ApiKey": "SUA_TWELVE_DATA_API_KEY"
  }
}
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/api/account/register` | Registrar usuário | ❌ |
| POST | `/api/account/login` | Login | ❌ |
| GET | `/api/stock` | Listar ações (com filtro/paginação) | ✅ |
| GET | `/api/stock/{id}` | Buscar ação por ID | ✅ |
| POST | `/api/stock` | Criar ação manualmente | ✅ |
| PUT | `/api/stock/{id}` | Atualizar ação | ✅ |
| DELETE | `/api/stock/{id}` | Deletar ação | ✅ |
| GET | `/api/quote/{symbol}` | Cotação em tempo real (Twelve Data) | ✅ |
| GET | `/api/quote/search` | Buscar símbolos (Twelve Data) | ✅ |
| GET | `/api/portfolio` | Portfólio do usuário logado | ✅ |
| POST | `/api/portfolio` | Adicionar ação ao portfólio | ✅ |
| DELETE | `/api/portfolio` | Remover ação do portfólio | ✅ |
| GET | `/api/comment` | Listar comentários | ✅ |
| POST | `/api/comment/{stockId}` | Criar comentário | ✅ |
| PUT | `/api/comment/{id}` | Atualizar comentário | ✅ |
| DELETE | `/api/comment/{id}` | Deletar comentário | ✅ |

---

## 🛠 Stack Técnica

**Backend**
- ASP.NET Core 8 Web API
- Entity Framework Core 8
- ASP.NET Identity (autenticação)
- JWT Bearer Authentication
- Newtonsoft.Json

**Frontend**
- React 18 + TypeScript
- Vite 5
- React Router v6
- Axios
- TailwindCSS v3
- React Toastify

**API de Dados**
- [Twelve Data](https://twelvedata.com/) — Cotações, busca de símbolos

---

## 📚 Curso de Referência

[React + .NET Core Finance Project — Teddy Smith](https://www.youtube.com/playlist?list=PL82C6-O4XrHcNJd4ejg8pX5fZaIDZmXyn)

---

## 📄 Licença

MIT
