const express = require('express');
const bookController = require('../controllers/bookController.js');
const router = express.Router();

router.get('/', bookController.getBook);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;