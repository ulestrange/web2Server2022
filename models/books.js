const mongoose  = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({
    name: {type: String, required : true},
    nationality: String
})

const bookSchema = new mongoose.Schema({
    title: String,
    year_written: Number,
    author: authorSchema,
    edition: String
})

function ValidateBook(book) {

   const authorJoiSchema = Joi.object({
       name: Joi.string().min(2).required(),
       nationality: Joi.string()
   })

    const bookJoiSchema = Joi.object({
       title: Joi.string().min(3).required(),
       author: authorJoiSchema,
       year_written: Joi.number().integer().min(1600) ,
       edition: Joi.string()
    })
    return bookJoiSchema.validate(book);
}


const Book = mongoose.model('book', bookSchema);

module.exports = {Book, ValidateBook}

