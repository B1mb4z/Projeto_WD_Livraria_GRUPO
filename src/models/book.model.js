const pool = require('../config/db')

// Buscar todos os livros (com o nome da categoria)
const getTodosLivros = async () => {
  const resultado = await pool.query(`
    SELECT livros.*, categorias.nome AS categoria
    FROM livros
    LEFT JOIN categorias ON livros.categoria_id = categorias.id
    ORDER BY livros.id
  `)
  return resultado.rows
}

// Buscar um livro pelo ID
const getLivroPorId = async (id) => {
  const resultado = await pool.query(`
    SELECT livros.*, categorias.nome AS categoria
    FROM livros
    LEFT JOIN categorias ON livros.categoria_id = categorias.id
    WHERE livros.id = $1
  `, [id])
  return resultado.rows[0]  // [0] porque só há um resultado
}

// Buscar livros por categoria
const getLivrosPorCategoria = async (categoria_id) => {
  const resultado = await pool.query(`
    SELECT livros.*, categorias.nome AS categoria
    FROM livros
    LEFT JOIN categorias ON livros.categoria_id = categorias.id
    WHERE livros.categoria_id = $1
    ORDER BY livros.id
  `, [categoria_id])
  return resultado.rows
}

// Criar um livro novo
const criarLivro = async (titulo, autor, sinopse, preco, ano_edicao, categoria_id) => {
  const resultado = await pool.query(`
    INSERT INTO livros (titulo, autor, sinopse, preco, ano_edicao, categoria_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [titulo, autor, sinopse, preco, ano_edicao, categoria_id])
  return resultado.rows[0]  // RETURNING * devolve o livro criado
}

// Atualizar um livro existente
const atualizarLivro = async (id, titulo, autor, sinopse, preco, ano_edicao, categoria_id) => {
  const resultado = await pool.query(`
    UPDATE livros
    SET titulo=$2, autor=$3, sinopse=$4, preco=$5, ano_edicao=$6, categoria_id=$7
    WHERE id = $1
    RETURNING *
  `, [id, titulo, autor, sinopse, preco, ano_edicao, categoria_id])
  return resultado.rows[0]
}

// Apagar um livro
const apagarLivro = async (id) => {
  const resultado = await pool.query(`
    DELETE FROM livros
    WHERE id = $1
    RETURNING *
  `, [id])
  return resultado.rows[0]  // devolve o livro apagado
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  getLivrosPorCategoria,
  criarLivro,
  atualizarLivro,
  apagarLivro
}