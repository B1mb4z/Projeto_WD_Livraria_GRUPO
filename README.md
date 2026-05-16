# Livraria API

API REST para gestão de uma livraria, desenvolvida com Node.js, Express e PostgreSQL.

### 1. Clone o repositório

```bash
git clone <(https://github.com/B1mb4z/Projeto_WD_Livraria_GRUPO.git)>
cd Projeto_WD_Livraria_GRUPO
```

### 2. Configure as variáveis de ambiente

Crie o arquivo `backend/.env` com as credenciais do seu banco MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=portal_leitura
DB_PORT=3000
```

## Requisitos

- Node.js
- PostgreSQL
- npm

---

## Instalação

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd livraria-api
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Criar um ficheiro `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=a_tua_password
DB_NAME=livraria
JWT_SECRET=uma_chave_secreta_longa
```

### 4. Criar a base de dados

No pgAdmin ou psql, criar uma base de dados chamada `livraria` e executar o seguinte SQL:

```sql
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE utilizadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  sinopse TEXT,
  preco NUMERIC(8,2) NOT NULL,
  ano_edicao INT,
  categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);
```

### 5. Iniciar o servidor

```bash
npm run dev
```

O servidor fica disponivel em `http://localhost:3000`.

---

## Estrutura do projeto

```
livraria-api/
├── src/
│   ├── config/
│   │   └── db.js
|   |   └──tabelas.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errors.js
│   ├── models/
│   │   ├── book.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── authRoute.js
│   │   └── bookRoute.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

---

## Endpoints

### Autenticacao

| Metodo | Rota             | Descricao                        |
|--------|------------------|----------------------------------|
| POST   | /auth/register   | Regista um novo utilizador       |
| POST   | /auth/login      | Faz login e devolve um token JWT |

### Livros

| Metodo | Rota                        | Acesso      | Descricao                    |
|--------|-----------------------------|-------------|------------------------------|
| GET    | /livros                     | Publico     | Lista todos os livros        |
| GET    | /livros/:id                 | Publico     | Devolve um livro por ID      |
| GET    | /livros/categoria/:id       | Publico     | Lista livros por categoria   |
| POST   | /livros                     | Autenticado | Cria um livro novo           |
| PUT    | /livros/:id                 | Autenticado | Atualiza um livro existente  |
| DELETE | /livros/:id                 | Autenticado | Apaga um livro               |

As rotas autenticadas requerem o header `Authorization: Bearer <token>`, obtido no login.

---

## Exemplos de pedidos

### Registar utilizador

```
POST /auth/register
Content-Type: application/json

{
  "nome": "Joao",
  "email": "joao@email.com",
  "password": "123456"
}
```

### Fazer login

```
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "123456"
}
```

Resposta:

```json
{
  "mensagem": "Login com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Criar livro (requer token)

```
POST /livros
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Duna",
  "autor": "Frank Herbert",
  "sinopse": "Uma saga epica num planeta desertico.",
  "preco": 18.99,
  "ano_edicao": 1965,
  "categoria_id": 1
}
```

---

## Autenticacao

O sistema usa JWT (JSON Web Tokens). Apos fazer login, o token devolvido deve ser enviado no header de todos os pedidos protegidos:

```
Authorization: Bearer <token>
```

O token tem validade de 8 horas.

---

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg (driver PostgreSQL)
- jsonwebtoken
- bcryptjs
- dotenv
- nodemon