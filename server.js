const express = require('express');
const db = require('./backend/src/config/db');
require('dotenv').config();

const app = express();

// Teste de conexão simples
async function testConnection() {
    try {
        
        console.log('✅ Conexão com o MySQL estabelecida com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao conectar à base de dados:', err.message);
    }
}

testConnection();

const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});