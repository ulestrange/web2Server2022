const express = require('express')

require('dotenv').config();
// note this required a .env file which is not in github

// own  modules
const db = require('./database');
const books = require('./routes/books')
const home = require('./routes/home')

const app = express()
const port = process.env.PORT || 3001




 app.use(express.json());

app.use('/', home)
 app.use('/books', books);









app.listen(port, () => console.log(`Example app listening on port ${port}!`))
