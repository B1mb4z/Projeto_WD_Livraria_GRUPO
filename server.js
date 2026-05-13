require('dotenv').config({ path: './backend/src/config/.env' });

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const bookRoute = require('./backend/src/routes/bookRoute');
app.use('/livros', bookRoute);

const errorHandler = require('./backend/src/middlewares/errors');
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App a correr em http://localhost:${port}`);
});