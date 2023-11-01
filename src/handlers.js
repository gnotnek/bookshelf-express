const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (req, res) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.body

    if(!name){
        const response = res.status(400).json({
            status : 'fail',
            message : "Gagal menambahkan buku. Mohon isi nama buku"
        })
        return response
    }

    if(readPage > pageCount){
        const response = res.status(400).json({
            status : 'fail',
            message : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        return response
    }

    const id = nanoid(16)
    const finished = pageCount === readPage ? true : false
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    books.push({id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt})

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if(isSuccess){
        const response = res.status(201).json({
            status : 'success',
            message : "Buku berhasil ditambahkan",
            data : {bookId : id}
        })
        return response
    }

    const response = res.status(500).json({
        status : 'error',
        message : "Buku gagal ditambahkan"
    })
    return response
}

const getAllBooksHandler = (req, res) => {
    const {name, reading, finished} = req.query

    let filteredBooks = books

    if(name !== undefined){
        const response = res.status(200).json({
            status : 'success',
            data : {books : filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map((book) => ({id : book.id, name : book.name, publisher : book.publisher}))}
        })
        return response
    }

    if(reading !== undefined){
        const response = res.status(200).json({
            status : 'success',
            data : {books : filteredBooks.filter((book) => book.reading === (reading === '1')).map((book) => ({id : book.id, name : book.name, publisher : book.publisher}))}
        })
        return response
    }

    if(finished !== undefined){
        const response = res.status(200).json({
            status : 'success',
            data : {books : filteredBooks.filter((book) => book.finished === (finished === '1')).map((book) => ({id : book.id, name : book.name, publisher : book.publisher}))}
        })
        return response
    }

    const response = res.status(200).json({
        status : 'success',
        data : {books : filteredBooks.map((book) => ({id : book.id, name : book.name, publisher : book.publisher}))}
    })
    return response
}

const getBookByIdHandler = (req, res) => {
    const {bookId} = req.params

    const book = books.filter((book) => book.id === bookId)[0]

    if(book !== undefined){
        const response = res.status(200).json({
            status : 'success',
            data : {book}
        })
        return response
    }

    const response = res.status(404).json({
        status : 'fail',
        message : "Buku tidak ditemukan"
    })

    return response
}

const editBookByIdHandler = (req, res) => {
    const {bookId} = req.params
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.body

    const updatedAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === bookId)

    if(index !== -1){
        if(!name){
            const response = res.status(400).json({
                status : 'fail',
                message : "Gagal memperbarui buku. Mohon isi nama buku"
            })
            return response
        }

        if(readPage>pageCount){
            const response = res.status(400).json({
                status : 'fail',
                message : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
            })
            return response
        }

        const finished = pageCount === readPage ? true : false

        books[index] = {...books[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt}

        const response = res.status(200).json({
            status : 'success',
            message : "Buku berhasil diperbarui"
        })

        return response
    }

    const response = res.status(404).json({
        status : 'fail',
        message : "Gagal memperbarui buku. Id tidak ditemukan"
    })
    return response
}

const deleteBookByIdHandler = (req, res) => {
    const {bookId} = req.params

    const index = books.findIndex((book) => book.id === bookId)

    if(index !== -1){
        books.splice(index, 1)

        const response = res.status(200).json({
            status : 'success',
            message : "Buku berhasil dihapus"
        })

        return response
    }

    const response = res.status(404).json({
        status : 'fail',
        message : "Buku gagal dihapus. Id tidak ditemukan"
    })

    return response
}

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler}