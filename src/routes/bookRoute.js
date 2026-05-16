const express = require('express')
const router = express.Router()
const verificarToken = require('../middleware/auth')
const {
  getTodosLivros,
  getLivroPorId,
  getLivrosPorCategoria,
  criarLivro,
  atualizarLivro,
  apagarLivro
} = require('../controllers/bookController')

// Rotas públicas — qualquer um pode ver os livros
router.get('/', getTodosLivros)
router.get('/categoria/:categoria_id', getLivrosPorCategoria)
router.get('/:id', getLivroPorId)

// Rotas protegidas — precisam de token JWT
router.post('/', verificarToken, criarLivro)
router.put('/:id', verificarToken, atualizarLivro)
router.delete('/:id', verificarToken, apagarLivro)

module.exports = router