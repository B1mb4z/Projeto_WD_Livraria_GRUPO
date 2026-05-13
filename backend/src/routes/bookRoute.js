const express = require('express')
const router = express.Router()

const{createAutho, deleteAutho} = require('../middlewares/authorization')
const{userAuthen} = require('../middlewares/authentication')

//Hdl = Handler

//listar todoslivros e por id e por categoria
const{listarLivroHdl, obterLivroIdHdl, obterLivroCatHdl} = require('../controllers/bookController')
router.get('/',listarLivroHdl)
router.get('/:id',obterLivroIdHdl)
router.get('/categoria/:cat',obterLivroCatHdl)

//Inserir um Livro
const{criarLivroHdl} = require('../controllers/bookController')
router.post('/',userAuthen,createAutho,criarLivroHdl)

//Atualizar Livro
const{atualizarLivroHdl} = require('../controllers/bookController')
router.patch('/:id',userAuthen,createAutho,atualizarLivroHdl,)

//Elinimar Livro
const{eliminarLivroHdl} = require('../controllers/bookController')
router.delete('/:id',userAuthen,deleteAutho,eliminarLivroHdl)

module.exports = router
