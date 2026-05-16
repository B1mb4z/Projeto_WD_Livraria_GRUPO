const bookModel = require('../models/book.model')

// GET /livros — devolve todos os livros
const getTodosLivros = async (req, res, next) => {
  try {
    console.log('Tentando buscar livros...');
    const livros = await bookModel.getTodosLivros();
    console.log('Livros encontrados:', livros.length);
    res.status(200).json(livros);
  } catch (err) {
    console.error('Erro específico:', err);
    next(err);
  }
}

// GET /livros/:id — devolve um livro pelo ID
const getLivroPorId = async (req, res, next) => {
  try {
    const { id } = req.params  // vai buscar o :id da URL
    const livro = await bookModel.getLivroPorId(id)

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' })
    }

    res.status(200).json(livro)
  } catch (err) {
    next(err)
  }
}

// GET /livros/categoria/:categoria_id — devolve livros por categoria
const getLivrosPorCategoria = async (req, res, next) => {
  try {
    const { categoria_id } = req.params
    const livros = await bookModel.getLivrosPorCategoria(categoria_id)
    res.status(200).json(livros)
  } catch (err) {
    next(err)
  }
}

// POST /livros — cria um livro novo
const criarLivro = async (req, res, next) => {
  try {
    // vai buscar os dados enviados no corpo do pedido
    const { titulo, autor, sinopse, preco, ano_edicao, categoria_id } = req.body

    // validação básica — campos obrigatórios
    if (!titulo || !autor || !preco) {
      return res.status(400).json({ erro: 'titulo, autor e preco são obrigatórios' })
    }

    const livro = await bookModel.criarLivro(titulo, autor, sinopse, preco, ano_edicao, categoria_id)
    res.status(201).json(livro)  // 201 = criado com sucesso
  } catch (err) {
    next(err)
  }
}

// PUT /livros/:id — atualiza um livro existente
const atualizarLivro = async (req, res, next) => {
  try {
    const { id } = req.params
    const { titulo, autor, sinopse, preco, ano_edicao, categoria_id } = req.body

    if (!titulo || !autor || !preco) {
      return res.status(400).json({ erro: 'titulo, autor e preco são obrigatórios' })
    }

    const livro = await bookModel.atualizarLivro(id, titulo, autor, sinopse, preco, ano_edicao, categoria_id)

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' })
    }

    res.status(200).json(livro)
  } catch (err) {
    next(err)
  }
}

// DELETE /livros/:id — apaga um livro
const apagarLivro = async (req, res, next) => {
  try {
    const { id } = req.params
    const livro = await bookModel.apagarLivro(id)

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado' })
    }

    res.status(200).json({ mensagem: 'Livro apagado com sucesso', livro })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getTodosLivros,
  getLivroPorId,
  getLivrosPorCategoria,
  criarLivro,
  atualizarLivro,
  apagarLivro
}