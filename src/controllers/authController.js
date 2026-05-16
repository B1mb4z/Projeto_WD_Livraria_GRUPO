const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

// POST /auth/register
const registar = async (req, res, next) => {
  try {
    const { nome, email, password } = req.body

    if (!nome || !email || !password) {
      return res.status(400).json({ erro: 'nome, email e password são obrigatórios' })
    }

    // Verifica se o email já existe
    const existente = await userModel.getUserPorEmail(email)
    if (existente) {
      return res.status(400).json({ erro: 'Este email já está registado' })
    }

    // Encripta a password antes de guardar
    const passwordEncriptada = await bcrypt.hash(password, 10)

    const user = await userModel.criarUser(nome, email, passwordEncriptada)

    res.status(201).json({ mensagem: 'Utilizador criado com sucesso', user })
  } catch (err) {
    next(err)
  }
}

// POST /auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ erro: 'email e password são obrigatórios' })
    }

    // Verifica se o utilizador existe
    const user = await userModel.getUserPorEmail(email)
    if (!user) {
      return res.status(401).json({ erro: 'Email ou password incorretos' })
    }

    // Compara a password com a que está na base de dados
    const passwordCorreta = await bcrypt.compare(password, user.password)
    if (!passwordCorreta) {
      return res.status(401).json({ erro: 'Email ou password incorretos' })
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    res.status(200).json({ mensagem: 'Login com sucesso', token })
  } catch (err) {
    next(err)
  }
}

module.exports = { registar, login }