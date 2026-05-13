
require('dotenv').config({ path: './backend/src/.env' }); 
const express = require('express');
const db = require('./backend/src/config/db');

const app = express();

async function testConnection() {
    try {
        await db.query('SELECT 1');
        console.log('✅ Conexão com o MySQL estabelecida com sucesso!');
    } catch (err) {
        console.error('❌ Erro ao conectar à base de dados:', err.message);
    }
}

testConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});