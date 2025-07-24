const productsController = require('../controllers/products.web.controller');
const router = require('express').Router();

// GET http://localhost:3000/products/2
// GET http://localhost:3000/products
router.get("/{:id}", productsController.getProduct);


module.exports = router;