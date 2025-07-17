const router = require("express").Router();
const booksController = require("../controllers/books.controller");
const checkApiKey = require('../middlewares/auth_api_key');

// Trabajando con query params
// GET http://localhost:3000/api/books/year?start=1600&end=2000
// GET http://localhost:3000/api/books/year?start=1600&end=2000?API_KEY=123abc
// GET http://localhost:3000/api/books/year?start=1600&end=2000?API_KEY=miclave123

router.get("/year", booksController.getBookByYear);

// GET http://localhost:3000/api/books --> todos los libros
// GET http://localhost:3000/api/books/Harry Potter
// GET http://localhost:3000/api/books/Don Quijote de la Mancha
// GET http://localhost:3000/api/books/{title}

// Las  {} indican opcionalidad en la ruta
// :/title indican que este parámetro de ruta es variable. Title es el nombre del parámetro
//router.get("/books/:title", (req, res) => { //--> obligatorio título en este caso
router.get("/{/:title}", booksController.getBook);

// POST http://localhost:3000/books?API_KEY=miclave123
/* Enviar en Body:
        {
          "title": "Hamlet",
          "author": "Shakespeare",
          "year": 1623
        }
    */
router.post("/",checkApiKey, booksController.createBook);

// PUT http://localhost:3000/api/books?API_KEY=miclave123
/* Enviar en Body:
      {
          "title": "Cien años de soledad", -- > opcional
          "author": "Gabriel García Márquez",
          "year": 1967
        }
    */
router.put("/", checkApiKey, booksController.editBook);

// DELETE http://localhost:3000/api/books/Hamlet?API_KEY=miclave123
// DELETE http://localhost:3000/api/books/Don Quijote?API_KEY=miclave123
router.delete("/:title", checkApiKey, booksController.deleteBook);

module.exports = router;
