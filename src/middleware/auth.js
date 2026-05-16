const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  // O token vem no header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado — token em falta' })
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET)
    req.user = dados  // guarda os dados do utilizador no pedido
    next()
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido ou expirado' })
  }
}

module.exports = verificarToken