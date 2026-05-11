const{
    listarLivros,
    obterLivroPorId,
    obterLivroPorCat,
    criarLivro,
    atualizarLivro,
    eliminarLivro
} = require('../models/book.model')

async function listarLivroHdl(req,res) {
    try{
        const livro = await listarLivros();
        res.json(livro);
    }catch{
        res.status(500).json({erro: "Erro!"})
    }
}

async function obterLivroIdHdl(req,res){
    try{
        const {id} = req.params;
        const livro = await obterLivroPorId(id);
        res.json(livro);
    }catch(e){
        res.status(500).json({erro: "Erro!"})
    }
}

async function obterLivroCatHdl(req,res){
    try{
        const {cat} = req.params;
        const livro = await obterLivroPorCat(cat);
        res.json(livro);
    }catch(e){
        res.status(500).json({erro: "Erro!"})
    }
}

async function criarLivroHdl(req,res){
    try{
        const {titulo, autor, descricao, edicao, categoria} = req.body;
        await criarLivro(titulo, autor, descricao, edicao, categoria);
        res.status(201).json({mensagem: ""});
    }catch{
        res.status(500).json({erro: "Erro!"})
    }
}

async function atualizarLivroHdl(req,res){
    try{
        const {titulo, autor, descricao, edicao, categoria} = req.body;
        const {id} = req.params;
        await atualizarLivro(id, titulo, autor, descricao, edicao, categoria);
        const livro = await obterLivroPorId(id);
        res.json(livro);
    }catch (e){
        res.status(500).json({erro: "Erro!"})
    }
}

async function eliminarLivroHdl(req,res){
    try{
        const {id} = req.params;
        await eliminarLivro(id);
        res.status(200).json({mensagem: ""});
    }catch (e){
        res.status(500).json({erro: "Erro!"})
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