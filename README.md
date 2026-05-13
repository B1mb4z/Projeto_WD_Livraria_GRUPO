# Projeto_WD_Livraria_GRUPO

## Instalação e Execução

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

### 3. Instale as dependências

```bash
# Dependências da API principal
cd api/src
npm install

# Dependências do backend (conexão com banco)
cd ../../backend
npm install
```

### 4. Configure o banco de dados

Execute o script SQL para criar o banco e as tabelas:

```bash
mysql -u root -p < backend/src/config/db.sql
```

### 5. Inicie o servidor

```bash
# A partir da pasta api/src
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Estrutura do Projeto

```
Projeto_WD_Livraria_GRUPO/
├── server.js                      # Ponto de entrada principal (teste de conexão DB)
├── api/
│   ├── html/
│   │   └── index.html             # Frontend estático (opcional)
│   └── src/
│       ├── server.js              # Servidor Express + registro de rotas
│       ├── package.json
│       ├── routes/
│       │   └── bookRoute.js       # Definição das rotas de livros
│       ├── controllers/
│       │   └── bookController.js  # Lógica de cada endpoint (handlers)
│       ├── middlewares/
│       │   ├── authentication.js  # Verifica token de autenticação do utilizador
│       │   ├── authorization.js   # Verifica permissão de criação ou eliminação
│       │   └── errors.js          # Tratamento centralizado de erros
│       └── models/
│           └── book.model.js      # Queries SQL (acesso à base de dados)
└── backend/
    ├── package.json
    └── src/
        └── config/
            ├── db.js              # Pool de conexão MySQL (via mysql2 + dotenv)
            └── db.sql             # Script de criação do banco e tabelas
```

---

## Banco de Dados

O schema possui três tabelas principais:

```sql
-- Categorias dos livros
CREATE TABLE categorias (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    nome        VARCHAR(100) NOT NULL,
    descricao   TEXT
);

-- Livros do portal
CREATE TABLE livros (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    titulo       VARCHAR(255) NOT NULL,
    capa         VARCHAR(255),
    arquivo_pdf  VARCHAR(255),
    sinopse      VARCHAR(400),
    autor        VARCHAR(150),
    ano_edicao   INT,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Utilizadores registados
CREATE TABLE usuarios (
    id       INT PRIMARY KEY AUTO_INCREMENT,
    nome     VARCHAR(100),
    email    VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    curso    VARCHAR(100)
);
```

---

## Endereço Base da API

```
http://localhost:3000/livros
```

| Método   | Rota           | Acesso      | Descrição                   |
|----------|----------------|-------------|-----------------------------|
| `GET`    | `/livros`      | Público     | Lista todos os livros       |
| `GET`    | `/livros/:id`  | Público     | Obtém um livro pelo ID      |
| `GET`    | `/livros/:cat` | Público     | Lista livros por categoria  |
| `POST`   | `/livros`      | Autenticado | Cria um novo livro          |
| `PATCH`  | `/livros/:id`  | Autenticado | Atualiza um livro existente |
| `DELETE` | `/livros/:id`  | Autenticado | Elimina um livro            |

---

## Exemplos de Requisições no Postman

### GET público — Listar todos os livros

| Campo  | Valor                          |
|--------|--------------------------------|
| Método | `GET`                          |
| URL    | `http://localhost:3000/livros` |

Sem headers obrigatórios. Clique em **Send**.

**Resposta esperada (200 OK):**
```json
[
  {
    "id": 1,
    "titulo": "O Alquimista",
    "autor": "Paulo Coelho",
    "sinopse": "A história de Santiago, um jovem pastor...",
    "ano_edicao": 1988,
    "categoria_id": 2,
    "nome": "Ficção"
  }
]
```

---

### GET público — Obter livro por ID

| Campo  | Valor                            |
|--------|----------------------------------|
| Método | `GET`                            |
| URL    | `http://localhost:3000/livros/1` |

Sem headers obrigatórios. Substitua o `1` pelo ID desejado.

**Resposta esperada (200 OK):**
```json
{
  "id": 1,
  "titulo": "O Alquimista",
  "autor": "Paulo Coelho",
  "sinopse": "A história de Santiago, um jovem pastor...",
  "ano_edicao": 1988,
  "categoria_id": 2,
  "nome": "Ficção"
}
```

---

### POST com autenticação — Criar livro (sucesso)

| Campo  | Valor                          |
|--------|--------------------------------|
| Método | `POST`                         |
| URL    | `http://localhost:3000/livros` |

**Aba Headers:**

| Key                   | Value                        |
|-----------------------|------------------------------|
| `Content-Type`        | `application/json`           |
| `userAuthentication`  | `user-authen-token-01`       |
| `createAuthorization` | `Creation token-creation-01` |

**Aba Body → raw → JSON:**
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "descricao": "Clássico da literatura brasileira.",
  "edicao": 1899,
  "categoria": 1
}
```

**Resposta esperada (201 Created):**
```json
{
  "mensagem": "Livro criado com sucesso."
}
```

---

### DELETE com autenticação — Eliminar livro (sucesso)

| Campo  | Valor                            |
|--------|----------------------------------|
| Método | `DELETE`                         |
| URL    | `http://localhost:3000/livros/1` |

**Aba Headers:**

| Key                   | Value                      |
|-----------------------|----------------------------|
| `userAuthentication`  | `user-authen-token-01`     |
| `deleteAuthorization` | `Delete token-deleting-01` |

**Resposta esperada (200 OK):**
```json
{
  "mensagem": "Livro eliminado."
}
```

---

### POST sem header — Erro por ausência de autenticação (401)

| Campo  | Valor                          |
|--------|--------------------------------|
| Método | `POST`                         |
| URL    | `http://localhost:3000/livros` |

**Aba Headers:** não adicionar nenhum header de autenticação.

**Aba Body → raw → JSON:**
```json
{
  "titulo": "Livro Teste",
  "autor": "Autor Teste"
}
```

**Resposta esperada (401 Unauthorized):**
```json
{
  "erro": "Token de autenticação não enviado"
}
```

---

### POST com token inválido — Erro de autenticação (401)

| Campo  | Valor                          |
|--------|--------------------------------|
| Método | `POST`                         |
| URL    | `http://localhost:3000/livros` |

**Aba Headers:**

| Key                  | Value              |
|----------------------|--------------------|
| `Content-Type`       | `application/json` |
| `userAuthentication` | `token-errado`     |

**Aba Body → raw → JSON:**
```json
{
  "titulo": "Livro Teste",
  "autor": "Autor Teste"
}
```

**Resposta esperada (401 Unauthorized):**
```json
{
  "erro": "Token invalido"
}
```

---

### POST com formato de autorização incorreto — Erro (401)

| Campo  | Valor                          |
|--------|--------------------------------|
| Método | `POST`                         |
| URL    | `http://localhost:3000/livros` |

**Aba Headers:**

| Key                   | Value                      |
|-----------------------|----------------------------|
| `Content-Type`        | `application/json`         |
| `userAuthentication`  | `user-authen-token-01`     |
| `createAuthorization` | `Bearer token-creation-01` |

> O prefixo correto é `Creation`, não `Bearer`.

**Resposta esperada (401 Unauthorized):**
```json
{
  "mensagem": "Acesso não autorizado: O header deve ser do tipo Creation."
}
```

---

## Tokens de referência rápida

| Operação           | Header                | Valor                        |
|--------------------|-----------------------|------------------------------|
| Autenticação       | `userAuthentication`  | `user-authen-token-01`       |
| Autorização CREATE | `createAuthorization` | `Creation token-creation-01` |
| Autorização DELETE | `deleteAuthorization` | `Delete token-deleting-01`   |

---

## Arquitetura e Conceitos

### Estrutura de projeto Express

O projeto segue uma arquitetura em camadas, separando responsabilidades de forma clara:

- **`routes/`** — Define os endpoints e associa cada rota aos seus middlewares e controller.
- **`controllers/`** — Contém os handlers (funções que recebem `req` e `res`) e coordenam o fluxo da requisição.
- **`middlewares/`** — Funções intermediárias executadas antes dos controllers, responsáveis por autenticação, autorização e tratamento de erros.
- **`models/`** — Encapsula todas as queries SQL, isolando o acesso ao banco de dados do restante da aplicação.

---

### Roteamento e controllers bem definidos

Em `bookRoute.js`, cada rota declara explicitamente quais middlewares são executados antes do controller:

```js
// Rota pública — sem middleware
router.get('/', listarLivroHdl);

// Rota protegida — autenticação + autorização antes do handler
router.post('/', userAuthen, createAutho, criarLivroHdl);
router.delete('/:id', userAuthen, deleteAutho, eliminarLivroHdl);
```
---

### Validação de dados com middleware

Os middlewares de `authentication.js` e `authorization.js` verificam:

1. **Presença do header** — se ausente, retorna `401` imediatamente.
2. **Formato do header** — para autorização, espera-se o padrão `Tipo token` (ex: `Creation token-creation-01`).
3. **Valor do token** — compara com o token esperado e bloqueia se inválido.

---

### Tratamento de erros centralizado

O ficheiro `errors.js` exporta um `errorHandler` que captura erros propagados pelos controllers:

```js
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json({ error: 'Ocorreu um erro!!' });
}
```

Todos os blocos `try/catch` dos controllers chamam esta função.
---

### Middleware de autenticação básica com token

A autenticação é implementada como um **token estático** passado via header HTTP customizado (`userAuthentication`). O fluxo é:

```
Requisição
    │
    ▼
userAuthen (authentication.js)
    │  Verifica header "userAuthentication"
    │  Token correto? → next()
    │  Token ausente/inválido? → 401
    ▼
createAutho / deleteAutho (authorization.js)
    │  Verifica header "createAuthorization" ou "deleteAuthorization"
    │  Formato "Tipo token" correto? → next()
    │  Inválido? → 401
    ▼
Controller (bookController.js)
    │  Executa a operação no banco de dados
    ▼
Resposta HTTP
```
