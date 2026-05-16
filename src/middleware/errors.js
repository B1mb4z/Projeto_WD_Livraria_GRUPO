// Este middleware é chamado sempre que algo corre mal
// O Express reconhece-o pelos 4 parâmetros (err, req, res, next)
const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err.message)

  const status = err.status || 500
  const mensagem = err.message || 'Erro interno do servidor'

  res.status(status).json({
    erro: mensagem
  })
}

module.exports = errorHandler