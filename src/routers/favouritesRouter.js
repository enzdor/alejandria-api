const express = require('express');
const router = express.Router();

const favouritesController = require('../controllers/favouritesController')

router.post('/favourites/create-delete', favouritesController.createDelete)

module.exports = router;
