const express = require('express');
const { Book } = require('../models/books')

const router = express.Router();

let books = [];

router.post('/', async (req, res) => {
  let book = new Book(req.body);

  try {
    book = await book.save();
    res
      .location(`${book._id}`)
      .status(201)
      .json(book)
  }
  catch (error) {
    res.status(500).send('db_error ' + error)
  }

});


router.get('/', async (req, res) => {

  try {
    const books = await Book.find().lean();
    res.json(books);
  }
  catch (error) {
    res.status(500).json('db error ' + error)
  }
})

router.get('/:id', async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch (error) {
    res.status(404).json('Not found: id is weird ' + error);
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book)
      res.status(204).send();
    else
      res.status(404).json(`book with that ID ${req.params.id} was not found`)
  }
  catch (error) {
    res.status(404).json(`funny id ${req.params.id} was not found` + error);
  }

})


// Note this route will only update the properties passed to it and will 
// leave others intact.


router.put('/:id', async (req, res) => {

  try {

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    }
    else {
      res.status(404).json('Not found');
    }
  }
  catch (error) {
    res.status(404).json('Not found: id is weird' + error);
  }

})

module.exports = router;