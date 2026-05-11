const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const bookRoute = require('./routes/bookRoute');
app.use('/livros', bookRoute);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})