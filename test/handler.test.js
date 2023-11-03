const request = require('supertest');
const app = require('../src/app'); // Import your Express app
const chai = require('chai');
const expect = chai.expect;

describe('Express App Handlers', () => {
  describe('addBookHandler', () => {
    it('should add a book', (done) => {
      const newBook = {
        name: 'Sample Book',
        year: 2023,
        author: 'John Doe',
      };

      request(app)
        .post('/books')
        .send(newBook)
        .expect(201)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.have.property('bookId');
          done();
        }).catch(done)
    });
  });

  describe('getAllBooksHandler', () => {
    it('should get all books', (done) => {
      request(app)
        .get('/books')
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.have.property('books');
          done();
        }).catch(done)
    });
  });

  describe('getBookByIdHandler', () => {
    it('should get a book by its ID', (done) => {
      // Create a new book first to get its ID
      const newBook = {
        name: 'Sample Book',
        year: 2023,
        author: 'John Doe',
      };

      request(app)
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          if (err) return done(err);

          const bookId = res.body.data.bookId;

          request(app)
            .get(`/books/${bookId}`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body.status).to.equal('success');
              expect(res.body.data.book).to.have.property('name', 'Sample Book');
              expect(res.body.data.book).to.have.property('year', 2023);
              expect(res.body.data.book).to.have.property('author', 'John Doe');
              done();
            }).catch(done)
        });
    });

    it('should handle a request for a non-existing book', (done) => {
      const nonExistingBookId = 'nonexistentid';

      request(app)
        .get(`/books/${nonExistingBookId}`)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Buku tidak ditemukan');
          done()
        });
    });
  });

  describe('editBookByIdHandler', () => {
    it('should edit an existing book by ID', (done) => {
      // Create a new book first to edit
      const newBook = {
        name: 'Sample Book',
        year: 2023,
        author: 'John Doe',
      };

      request(app)
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          if (err) return done(err);

          const bookId = res.body.data.bookId;

          // Update the book
          const updatedBookData = {
            name: 'Updated Book Title',
            year: 2024,
          };

          request(app)
            .put(`/books/${bookId}`)
            .send(updatedBookData)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body.status).to.equal('success');
              expect(res.body.data.book).to.have.property('name', 'Updated Book Title');
              expect(res.body.data.book).to.have.property('year', 2024);
              done();
            }).catch(done)
        });
    });

    it('should handle an attempt to edit a non-existing book', (done) => {
      const nonExistingBookId = 'nonexistentid';

      const updatedBookData = {
        name: 'Updated Book Title',
        year: 2024,
      };

      request(app)
        .put(`/books/${nonExistingBookId}`)
        .send(updatedBookData)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Gagal memperbarui buku. Id tidak ditemukan');
          done();
        })
    });
  });

  describe('deleteBookByIdHandler', () => {
    it('should delete a book by its ID', (done) => {
      // Create a new book first to delete
      const newBook = {
        name: 'Sample Book',
        year: 2023,
        author: 'John Doe',
      };

      request(app)
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          if (err) return done(err);

          const bookId = res.body.data.bookId;

          request(app)
            .delete(`/books/${bookId}`)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              expect(res.body.status).to.equal('success');
              expect(res.body.message).to.equal('Buku berhasil dihapus');
              done();
            }).catch(done)
        });
    });

    it('should handle an attempt to delete a non-existing book', (done) => {
      const nonExistingBookId = 'nonexistentid';

      request(app)
        .delete(`/books/${nonExistingBookId}`)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);

          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.equal('Buku gagal dihapus. Id tidak ditemukan');
          done();
        })
    });
  });

});
