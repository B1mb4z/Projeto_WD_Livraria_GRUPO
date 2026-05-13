function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    res.status(status).json({ error: 'Occrreu um erro!!' });
}

module.exports = errorHandler;
module.exports.errors = errorHandler;
