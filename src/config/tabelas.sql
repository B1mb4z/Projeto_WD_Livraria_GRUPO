CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS utilizadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS livros (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(150) NOT NULL,
  sinopse TEXT,
  preco NUMERIC(8,2) NOT NULL,
  ano_edicao INT,
  categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

INSERT INTO categorias (nome) VALUES
  ('Ficção Científica'),
  ('Romance'),
  ('Programação'),
  ('História')
ON CONFLICT (nome) DO NOTHING;

INSERT INTO livros (titulo, autor, sinopse, preco, ano_edicao, categoria_id) VALUES
  ('Duna', 'Frank Herbert', 'Uma saga épica num planeta desértico.', 18.99, 1965, 1),
  ('O Código Da Vinci', 'Dan Brown', 'Um mistério em torno de segredos religiosos.', 14.50, 2003, 2),
  ('Clean Code', 'Robert C. Martin', 'Como escrever código limpo e sustentável.', 32.00, 2008, 3)
ON CONFLICT DO NOTHING;

