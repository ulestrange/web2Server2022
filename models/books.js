const mongoose  = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    year_written: Number
})

const Book = mongoose.model('book', bookSchema);

module.exports = {Book}

