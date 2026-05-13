function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json({ error: 'Occrreu um erro!!' });
    next()
}

module.exports = errorHandler;
