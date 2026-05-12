const{
    listarLivros,
    obterLivroPorId,
    obterLivroPorCat,
    criarLivro,
    atualizarLivro,
    eliminarLivro
} = require('../models/book.model')

const{errors} = require('../middlewares/errors')
//Hdl = Handler

async function listarLivroHdl(req,res, next) {
    try{
        const livro = await listarLivros();
        res.json(livro);
    }catch (err){
        next(err)
    }
}

async function obterLivroIdHdl(req,res, next){
    try{
        const {id} = req.params;
        const livro = await obterLivroPorId(id);
        res.json(livro);
    }catch(err){
        next(err)
    }
}

async function obterLivroCatHdl(req,res, next){
    try{
        const {cat} = req.params;
        const livro = await obterLivroPorCat(cat);
        res.json(livro);
    }catch(err){
        next(err)
    }
}

async function criarLivroHdl(req,res, next){
    try{
        const {titulo, autor, descricao, edicao, categoria} = req.body;
        await criarLivro(titulo, autor, descricao, edicao, categoria);
        res.status(201).json({mensagem: ""});
    }catch(err){
        next(err)
    }
}

async function atualizarLivroHdl(req,res, next){
    try{
        const {titulo, autor, descricao, edicao, categoria} = req.body;
        const {id} = req.params;
        await atualizarLivro(id, titulo, autor, descricao, edicao, categoria);
        const livro = await obterLivroPorId(id);
        res.json(livro);
    }catch (err){
        next(err)
    }
}

async function eliminarLivroHdl(req,res, next){
    try{
        const {id} = req.params;
        await eliminarLivro(id);
        res.status(200).json({mensagem: "Livro eliminado."});
    }catch (err){
        next(err)
    }
}

module.exports = {
    listarLivroHdl,
    obterLivroCatHdl,
    obterLivroIdHdl,
    criarLivroHdl,
    atualizarLivroHdl,
    eliminarLivroHdl
}