// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.status || err.statusCode || 500;
    const mensagem = err.message || 'Ocorreu um erro interno no servidor.';
    res.status(status).json({ erro: mensagem });
}

module.exports = errorHandler;
