const productsController = require('../controllers/products.controller');
const router = require('express').Router();

// GET http://localhost:3000/api/products/2
// GET http://localhost:3000/api/products
router.get("/{:id}", productsController.getProduct);

// POST http://localhost:3000/api/products
/*
A enviar por BODY:
{
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": {
    "rate": 4.6,
    "count": 400
    }
}

*/
router.post("/", productsController.createProduct);

// PUT http://localhost:3000/api/products
router.put("/", productsController.editProduct);

// DELETE http://localhost:3000/api/products
router.delete("/", productsController.deleteProduct);

module.exports = router;