const mongoose  = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {type: String, required : true},
    contact: String,
    age: {type: Number, max : 4}
})

const bookSchema = new mongoose.Schema({
    play: {type: Number, required : true},
    title: String ,
    year_written: Number,
    author: [authorSchema]
})

bookSchema.set('validateBeforeSave', true);
authorSchema.set('validateBeforeSave', true);

const Book = mongoose.model('book', bookSchema);

module.exports = {Book}

