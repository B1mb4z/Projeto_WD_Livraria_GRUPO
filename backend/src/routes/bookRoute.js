const express = require('express');
const router = express.Router();

const {createAutho, deleteAutho} = require('../middlewares/authorization');
const {userAuthen} = require('../middlewares/authentication');

// Hdl = Handler

// Listar todos os livros
const {listarLivroHdl, obterLivroIdHdl, obterLivroCatHdl} = require('../controllers/bookController');
router.get('/', listarLivroHdl);

// ATENÇÃO: rota estática /categoria/:cat DEVE vir ANTES de /:id
// caso contrário "categoria" seria tratado como um id
router.get('/categoria/:cat', obterLivroCatHdl);
router.get('/:id', obterLivroIdHdl);

// Inserir um Livro
const {criarLivroHdl} = require('../controllers/bookController');
router.post('/', /*userAuthen, createAutho,*/ criarLivroHdl);

// Atualizar Livro
const {atualizarLivroHdl} = require('../controllers/bookController');
router.patch('/:id', userAuthen, createAutho, atualizarLivroHdl);

// Eliminar Livro
const {eliminarLivroHdl} = require('../controllers/bookController');
router.delete('/:id', userAuthen, deleteAutho, eliminarLivroHdl);

module.exports = router;
