const express = require('express')
const router = express.Router()

//Hdl = Handler

//listar todoslivros e por id
const{listarLivroHdl, obterLivroHdl} = require('../controllers/bookController')
router.get('/',listarLivroHdl)
router.get('/:id',obterLivroHdl)

//Inserir um Livro
const{criarLivroHdl} = require('../controllers/bookController')
router.post('/',criarLivroHdl)

//Atualizar Livro
const{atualizarLivroHdl} = require('../controllers/bookController')
router.patch('/:id',atualizarLivroHdl)
//Elinimar Livro
const{eliminarLivroHdl} = require('../controllers/bookController')
router.delete('/:id',atualizarLivroHdl)


