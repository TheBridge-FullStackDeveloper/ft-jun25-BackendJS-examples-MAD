const express = require('express');
// Rutas de productos
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
router.get('/', entriesController.getEntries);

// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */
router.post('/', entriesController.createEntry);



module.exports = router;

