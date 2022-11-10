const express = require('express');

const validationMiddleware =  require('../middleware/jwtvalidaton'); // require('../middleware/jwtvalidation');

const { Book, ValidateBook } = require('../models/books')

const router = express.Router();

let books = [];

router.post('/', validationMiddleware.validJWTNeeded, async (req, res) => {

  let result = ValidateBook(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }

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

/// This route takes some filter, sorting, projecting and pageing information
/// from the query string of the request
/// the keyword title is used to filter for books which contain that word
// it is case insensitive
/// the keyword year is used to filter for year_written
/// the pagesize and pagenumber can be used for paging.

router.get('/', async (req, res) => {

  const { title, year, pagesize, pagenumber } = req.query;

  let filter = {}

  if (title) {
    filter.title = { $regex: `${title}`, $options: 'i' };
  }

  const yearNumber = parseInt(year);

  if (!isNaN(yearNumber)) {
    Number.isInteger(year)
    filter.year_written = yearNumber
  }


  let pageSizeNumber = parseInt(pagesize);

  if (isNaN(pageSizeNumber)) {
    pageSizeNumber = 0
  }
  let pageNumberNumber = parseInt(pagenumber);

  if (isNaN(pageNumberNumber)) {
    pageNumberNumber = 1
  }



  try {
    const books = await Book
      .find(filter)
      .limit(pageSizeNumber)
      .skip((pageNumberNumber - 1) * pageSizeNumber)
      .lean();
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

  let result = ValidateBook(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }
  
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