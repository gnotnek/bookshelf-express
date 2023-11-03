const moongose = require('mongoose')
const bookSchema = new moongose.Schema({
    name : String,
    year : Number,
    author : String,
    summary : String,
    publisher : String,
    pageCount : Number,
    readPage : Number,
    finished : Boolean,
    reading : Boolean,
    insertedAt : String,
    updatedAt : String
})
const Book =  moongose.model('Book', bookSchema)

module.exports = Book