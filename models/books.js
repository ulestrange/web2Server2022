const mongoose  = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {type: String, required : true},
    nationality: String
})

const bookSchema = new mongoose.Schema({
    title: String,
    author: String ,
    year_written: Number,
    author: authorSchema,
    edition: String
})


const Book = mongoose.model('book', bookSchema);

module.exports = {Book}

