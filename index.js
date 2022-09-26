const express = require('express')

// own  modules
const books = require('./routes/books')

const app = express()
const port = 3000




 app.use(express.json());

 app.use('/books', books);

app.get('/', (req, res) => res.send('Hello World from Una!'))

app.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));







app.listen(port, () => console.log(`Example app listening on port ${port}!`))
