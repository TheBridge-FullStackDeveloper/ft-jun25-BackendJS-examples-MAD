const router = require("express").Router();
const booksController = require("../controllers/books.controller");

// Trabajando con query params
// GET http://localhost:3000/books/year?start=1600&end=2000
router.get("/year", booksController.getBookByYear);

// GET http://localhost:3000/books --> todos los libros
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/Don Quijote de la Mancha
// GET http://localhost:3000/books/{title}

// Las  {} indican opcionalidad en la ruta
// :/title indican que este parámetro de ruta es variable. Title es el nombre del parámetro
//router.get("/books/:title", (req, res) => { //--> obligatorio título en este caso
router.get("/{/:title}", booksController.getBook);

// POST http://localhost:3000/books
/* Enviar en Body:
        {
          "title": "Hamlet",
          "author": "Shakespeare",
          "year": 1623
        }
    */
router.post("/", booksController.createBook);

// PUT http://localhost:3000/books
/* Enviar en Body:
      {
          "title": "Cien años de soledad", -- > opcional
          "author": "Gabriel García Márquez",
          "year": 1967
        }
    */
router.put("/", booksController.editBook);

// DELETE http://localhost:3000/books/Hamlet
// DELETE http://localhost:3000/books/Don Quijote
router.delete("/:title", booksController.deleteBook);

module.exports = router;
