CREATE DATABASE portal_leitura;
USE portal_leitura;

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    capa VARCHAR(255), -- Caminho do arquivo
    arquivo_pdf VARCHAR(255), -- Caminho do arquivo para download
    sinopse VARCHAR(400), -- RNF: Limite de caracteres
    autor VARCHAR(150),
    ano_edicao INT,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    curso VARCHAR(100)
);
