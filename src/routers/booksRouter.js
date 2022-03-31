const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/books', booksController.list)
router.get('/books/search', booksController.search)
router.get('/books/:id', booksController.detail)
router.get('/books/logged/:user_sub/:id', booksController.detailUserSub)
router.get('/books/logged/:user_sub', booksController.listUserSub)
router.get('/books/created/:user_sub', booksController.listCreatedSub)
router.get('/books/favourite/:user_sub', booksController.listFavouriteSub)
router.post('/books', booksController.create)
router.delete('/books/:id', booksController.delete)
router.put('/books/:id', booksController.edit)
router.put('/books/sold/:id', booksController.sold)

module.exports = router