const {listarLivros, obterLivroPorId, obterLivroPorCat, criarLivro, atualizarLivro, eliminarLivro} = require('../models/book.model');

// Hdl = Handler

async function listarLivroHdl(req, res, next) {
    try {
        const livros = await listarLivros();
        res.json(livros);
    } catch (err) {
        next(err);
    }
}

async function obterLivroIdHdl(req, res, next) {
    try {
        const {id} = req.params;
        const livro = await obterLivroPorId(id);

        if (!livro) {
            return res.status(404).json({mensagem: 'Livro não encontrado.'});
        }

        res.json(livro);
    } catch (err) {
        next(err);
    }
}

async function obterLivroCatHdl(req, res, next) {
    try {
        const {cat} = req.params;
        const livros = await obterLivroPorCat(cat);
        res.json(livros);
    } catch (err) {
        next(err);
    }
}

async function criarLivroHdl(req, res, next) {
    try {
        const {titulo, capa, sinopse, autor, ano_edicao, categoria} = req.body;

        if (!titulo || !categoria) {
            return res.status(400).json({mensagem: 'Os campos titulo e categoria são obrigatórios.'});
        }

        await criarLivro(titulo, capa, sinopse, autor, ano_edicao, categoria);
        res.status(201).json({mensagem: 'Livro criado com sucesso.'});
    } catch (err) {
        next(err);
    }
}

async function atualizarLivroHdl(req, res, next) {
    try {
        const {titulo, capa, sinopse, autor, ano_edicao, categoria} = req.body;
        const {id} = req.params;

        const existente = await obterLivroPorId(id);
        if (!existente) {
            return res.status(404).json({mensagem: 'Livro não encontrado.'});
        }
        await atualizarLivro(id, titulo, capa, sinopse, autor, ano_edicao, categoria);
        const livro = await obterLivroPorId(id);
        res.json(livro);
    } catch (err) {
        next(err);
    }
}

async function eliminarLivroHdl(req, res, next) {
    try {
        const {id} = req.params;
        const existente = await obterLivroPorId(id);
        if (!existente) {
            return res.status(404).json({mensagem: 'Livro não encontrado.'});
        }

        await eliminarLivro(id);
        res.status(200).json({mensagem: 'Livro eliminado.'});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listarLivroHdl,
    obterLivroCatHdl,
    obterLivroIdHdl,
    criarLivroHdl,
    atualizarLivroHdl,
    eliminarLivroHdl
};
