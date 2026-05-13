const pool = require('../config/db')

async function listarLivros() {
    const query = `SELECT livros.id, livros.titulo, livros.sinopse, livros.autor,livros.ano_edicao, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id ORDER BY livros.categoria_id`;
    const [rows] = await pool.query(query);
    return rows;
}

async function obterLivroPorId(id) {
    const query = `SELECT livros.id, livros.titulo, livros.sinopse, livros.autor, livros.ano_edicao, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.id = ?`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
}

async function obterLivroPorCat(cat) {
    const query = `SELECT livros.id, livros.titulo, livros.sinopse, livros.autor, livros.ano_edicao, categorias.nome FROM livros LEFT JOIN categorias ON livros.categoria_id = categorias.id WHERE livros.categoria_id = ? ORDER BY livros.id`;
    const [rows] = await pool.query(query, [cat]);
    return rows;
}

async function criarLivro(titulo, capa, sinopse, autor, ano_edicao, categoria) {
    const query = `INSERT INTO livros (titulo, capa, sinopse, autor, ano_edicao, categoria_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(query, [titulo, capa, sinopse, autor, ano_edicao, categoria]);
    return result;
}

async function atualizarLivro(id, titulo, capa, sinopse, autor, ano_edicao, categoria) {
    const query = `UPDATE livros SET titulo = ?, capa = ?, sinopse = ?, autor = ?, ano_edicao = ?, categoria_id = ? WHERE id = ?`;
    const [result] = await pool.query(query, [titulo, capa, sinopse, autor, ano_edicao, categoria, id]);
    return result;
}

async function eliminarLivro(id) {
    const query = 'DELETE FROM livros WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
}

module.exports = {
    listarLivros,
    obterLivroPorCat,
    obterLivroPorId,
    criarLivro,
    atualizarLivro,
    eliminarLivro
};