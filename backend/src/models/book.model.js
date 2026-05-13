const pool = require('../../../backend/src/config/db')

async function listarLivros() {
    const query = "SELECT livros.*, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id ORDER BY livros.categoria_id";
    const result= await pool.query(query);
    return result.rows;
}

async function obterLivroPorId(id) {
    const query = "SELECT livros.*, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.id = $1";
    const result= await pool.query(query, [id]);
    return result.rows[0];
}

async function obterLivroPorCat(cat){
    const query = "SELECT livros.*, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id ORDER BY livros.id WHERE livros.categoria_id = $1";
    const result= await pool.query(query, cat);
    return result.rows;
}

async function criarLivro(titulo, autor, descricao, edicao, categoria) {
    const query = "INSERT INTO notas (titulo, autor, descricao, edicao, categoria) VALUES ($1, $2, $3, $4, $5)";
    const result = await pool.query(query, [titulo, autor, descricao, edicao, categoria]);
    return result.rows[0];
}

async function atualizarLivro(id, titulo, autor, descricao, edicao, categoria) {
    const query = "UPDATE livros SET titulo = $2, autor = $3, descricao = $4, edicao = $5, categoria = $6 WHERE id = $1";
    const result = await pool.query(query, [id, titulo, autor, descricao, edicao, categoria]);
    return result.rows[0];
}

async function eliminarLivro(id) {
    const query = "DELETE FROM livros WHERE id = $1";
    const result= await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    listarLivros,
    obterLivroPorCat,
    obterLivroPorId,
    criarLivro,
    atualizarLivro,
    eliminarLivro
}