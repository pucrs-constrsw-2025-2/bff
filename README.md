# BFF (Backend for Frontend)

Backend for Frontend (BFF) REST API que agrega e simplifica o acesso aos microserviços do sistema ConstrSW.

## Descrição

A BFF atua como uma camada intermediária entre o frontend e os microserviços, fornecendo:

- **Agregação de dados**: Combina dados de múltiplos microserviços em uma única resposta
- **Simplificação**: Reduz a complexidade das chamadas para o frontend
- **Otimização**: Reduz o número de requisições HTTP necessárias
- **Padronização**: Fornece uma interface consistente e padronizada

## Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem
- **OpenTelemetry** - Observabilidade
- **Circuit Breaker** - Resiliência
- **JWT** - Autenticação
- **Swagger/OpenAPI** - Documentação

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:

```bash
cp .env.example .env
```

## Execução

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

## Documentação OpenAPI

A documentação completa da API está disponível no arquivo `openapi.yaml` (OpenAPI 3.1).

### Visualizar a Documentação

Acesse: `http://localhost:3000/api/docs`

Ou use ferramentas como:

1. **Swagger UI**: 
   ```bash
   npx swagger-ui-serve openapi.yaml
   ```

2. **Redoc**:
   ```bash
   npx redoc-cli serve openapi.yaml
   ```

## Endpoints Principais

A BFF expõe endpoints para os seguintes recursos:

- **Autenticação** (`/api/v1/auth/*`): Login, refresh token, validação
- **Usuários** (`/api/v1/users/*`): Gerenciamento de usuários e roles
- **Roles** (`/api/v1/roles/*`): Gerenciamento de permissões
- **Funcionários** (`/api/v1/employees/*`): Gerenciamento de funcionários e tarefas
- **Estudantes** (`/api/v1/students/*`): Gerenciamento de estudantes
- **Professores** (`/api/v1/professors/*`): Gerenciamento de professores
- **Disciplinas** (`/api/v1/courses/*`): Gerenciamento de disciplinas
- **Turmas** (`/api/v1/classes/*`): Gerenciamento de turmas
- **Aulas** (`/api/v1/lessons/*`): Gerenciamento de aulas
- **Reservas** (`/api/v1/reservations/*`): Gerenciamento de reservas
- **Recursos** (`/api/v1/resources/*`): Gerenciamento de recursos
- **Salas** (`/api/v1/rooms/*`): Gerenciamento de salas

## Autenticação

Todos os endpoints (exceto `/auth/login` e `/auth/refresh`) requerem autenticação via Bearer Token (JWT).

O token deve ser obtido através do endpoint `/auth/login` e incluído no header:
```
Authorization: Bearer <token>
```

## Servidores

- **Desenvolvimento Local**: `http://localhost:3000/api/v1`
- **Docker (Interno)**: `http://api:3000/api/v1`

## Microserviços Agregados

A BFF agrega os seguintes microserviços:

1. **OAuth** - Autenticação e autorização
2. **Employees** - Funcionários
3. **Students** - Estudantes
4. **Professors** - Professores
5. **Courses** - Disciplinas
6. **Classes** - Turmas
7. **Lessons** - Aulas
8. **Reservations** - Reservas
9. **Resources** - Recursos
10. **Rooms** - Salas

## Health Check

O endpoint `/health` verifica o status de saúde da BFF e de todos os microserviços agregados.

## Características Implementadas

### Segurança
- ✅ OAuth 2.1 / OIDC com JWT
- ✅ Validação de tokens via JWKS
- ✅ Security headers (Helmet)
- ✅ CORS configurável
- ✅ Rate limiting
- ✅ CSRF protection ready

### Resiliência
- ✅ Circuit breaker por serviço
- ✅ Timeouts configuráveis
- ✅ Retry com jitter (preparado)
- ✅ Fallbacks (preparado)

### Observabilidade
- ✅ OpenTelemetry integrado
- ✅ Correlation ID (X-Request-ID)
- ✅ Logs estruturados
- ✅ Métricas Prometheus
- ✅ Traces (preparado)

### Performance
- ✅ Cache (Redis ou in-memory)
- ✅ ETag support (preparado)
- ✅ Compression (preparado)
- ✅ Paginação padronizada

### Validação
- ✅ Validação de entrada (class-validator)
- ✅ OpenAPI como fonte de verdade
- ✅ DTOs tipados

### Tratamento de Erros
- ✅ RFC 7807 Problem Details
- ✅ Códigos HTTP corretos
- ✅ Logs sem PII

## Estrutura do Projeto

```
src/
├── auth/              # Módulo de autenticação
├── users/             # Módulo de usuários
├── employees/         # Módulo de funcionários
├── students/          # Módulo de estudantes
├── professors/        # Módulo de professores
├── courses/           # Módulo de disciplinas
├── classes/           # Módulo de turmas
├── lessons/           # Módulo de aulas
├── reservations/      # Módulo de reservas
├── resources/         # Módulo de recursos
├── rooms/             # Módulo de salas
├── health/            # Health checks
├── observability/     # Observabilidade
├── common/            # Código compartilhado
│   ├── filters/       # Exception filters
│   ├── interceptors/  # Interceptors
│   ├── middleware/    # Middleware
│   ├── decorators/    # Decorators
│   ├── dto/           # DTOs compartilhados
│   ├── services/      # Serviços compartilhados
│   └── circuit-breaker/ # Circuit breaker
└── config/            # Configurações
```

## Testes

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker

```bash
docker build -t constrsw-bff .
docker run -p 3000:3000 constrsw-bff
```

## Licença

MIT
