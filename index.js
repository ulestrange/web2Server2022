const express = require('express')

// own  modules
const books = require('./routes/books')
const home = require('./routes/home')

const app = express()
const port = 3000




 app.use(express.json());

app.use('/', home)
 app.use('/books', books);









app.listen(port, () => console.log(`Example app listening on port ${port}!`))
