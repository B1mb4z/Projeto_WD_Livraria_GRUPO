require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/errors')
const bookRoute = require('./routes/bookRoute')
const authRoute = require('./routes/authRoute')
require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Rotas
app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Livraria a funcionar!' })
})
app.use('/auth', authRoute)
app.use('/livros', bookRoute)

// Tratamento de erros (sempre o último)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`)
})