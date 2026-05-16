const pool = require('../config/db')

// Buscar utilizador pelo email (para o login)
const getUserPorEmail = async (email) => {
  const resultado = await pool.query(
    'SELECT * FROM utilizadores WHERE email = $1',
    [email]
  )
  return resultado.rows[0]
}

// Criar utilizador novo (registo)
const criarUser = async (nome, email, password) => {
  const resultado = await pool.query(
    `INSERT INTO utilizadores (nome, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email, criado_em`,
    [nome, email, password]
  )
  return resultado.rows[0]
}

module.exports = { getUserPorEmail, criarUser }