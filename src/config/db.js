const { Pool } = require('pg')
require('dotenv').config()

console.log('A tentar ligar com estas configurações:')
console.log('Host:', process.env.DB_HOST)
console.log('Port:', process.env.DB_PORT)
console.log('User:', process.env.DB_USER)
console.log('Database:', process.env.DB_NAME)

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao ligar à base de dados:', err.message)
  } else {
    console.log('Ligado ao PostgreSQL com sucesso!')
    release()
  }
})

module.exports = pool