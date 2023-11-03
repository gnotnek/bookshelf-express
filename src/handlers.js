const Book = require('./books');

const addBookHandler = async (req, res) => {
    try {
        const newBook = new Book(req.body)
        await newBook.save()
        const response = res.status(201).json({
            status : 'success',
            data : {bookId : newBook.id}
        })
        return response
    } catch (err) {
        const response = res.status(400).json({
            status : 'fail',
            message : "Buku gagal ditambahkan"
        })
        return response
    }
}

const getAllBooksHandler = async (req, res) => {
    try{
        const books = await Book.find()
        const response = res.status(200).json({
            status : 'success',
            data : {books}
        })
        return response
    }catch(err){
        const response = res.status(400).json({
            status : 'fail',
            message : "Buku gagal ditemukan"
        })
        return response
    }
}

const getBookByIdHandler = async (req, res) => {
    try{
        const bookId = req.params.bookId
        const book = await Book.findById(bookId)

        if(!book){
            const response = res.status(404).json({
                status : 'fail',
                message : "Buku tidak ditemukan"
            })
            return response
        }

        const response = res.status(200).json({
            status : 'success',
            data : {book}
        })
        return response
    }catch(err){
        const response = res.status(404).json({
            status : 'fail',
            message : "Buku tidak ditemukan"
        })
        return response
    }
}

const editBookByIdHandler = async (req, res) => {
    try{
        const bookId = req.params.bookId
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {new : true})

        if(!updatedBook){
            const response = res.status(404).json({
                status : 'fail',
                message : "Gagal memperbarui buku. Id tidak ditemukan"
            })
            return response
        }

        const response = res.status(200).json({
            status : 'success',
            data : {book : updatedBook}
        })
        return response
    }catch(err){
        const response = res.status(404).json({
            status : 'fail',
            message : "Gagal memperbarui buku."
        })
        return response
    }
}

const deleteBookByIdHandler = async (req, res) => {
    try{
        const bookId = req.params.bookId
        const deletedBook = await Book.findByIdAndDelete(bookId)

        if(!deletedBook){
            const response = res.status(404).json({
                status : 'fail',
                message : "Buku gagal dihapus. Id tidak ditemukan"
            })
            return response
        }

        const response = res.status(200).json({
            status : 'success',
            message : "Buku berhasil dihapus"
        })
        return response
    }catch(err){
        const response = res.status(404).json({
            status : 'fail',
            message : "Buku gagal dihapus"
        })
        return response
    }
}

module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler}