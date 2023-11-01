const handler = require('./handlers')

module.exports = (app) => {
    app.post('/books', handler.addBookHandler)
    app.get('/books', handler.getAllBooksHandler)
    app.get('/books/:bookId', handler.getBookByIdHandler)
    app.put('/books/:bookId', handler.editBookByIdHandler)
    app.delete('/books/:bookId', handler.deleteBookByIdHandler)
}