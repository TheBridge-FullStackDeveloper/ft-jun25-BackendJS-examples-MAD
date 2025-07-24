const router = require("express").Router();
const booksController = require("../controllers/books.controller");
const checkApiKey = require('../middlewares/auth_api_key');

// Trabajando con query params
// GET http://localhost:3000/api/books/year?start=1600&end=2000
// GET http://localhost:3000/api/books/year?start=1600&end=2000?API_KEY=123abc
// GET http://localhost:3000/api/books/year?start=1600&end=2000?API_KEY=miclave123


/**
 * @swagger
 * /api/books/year:
 *   get:
 *     summary: Obtener libros por rango de años
 *     tags:
 *       - Books
 *     parameters:
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año inicial
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año final
 *     responses:
 *       200:
 *         description: Libros encontrados
 *       404:
 *         description: Falta fecha inicial o final
 */

router.get("/year", booksController.getBookByYear);

// GET http://localhost:3000/api/books --> todos los libros
// GET http://localhost:3000/api/books/Harry Potter
// GET http://localhost:3000/api/books/Don Quijote de la Mancha
// GET http://localhost:3000/api/books/{title}

// Las  {} indican opcionalidad en la ruta
// :/title indican que este parámetro de ruta es variable. Title es el nombre del parámetro
//router.get("/books/:title", (req, res) => { //--> obligatorio título en este caso


/**
 * @swagger
 * /api/books/{title}:
 *   get:
 *     summary: Obtener un libro por título
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: title
 *         required: false
 *         schema:
 *           type: string
 *         description: Título del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *       404:
 *         description: Libro no encontrado
 */
router.get("/{:title}", booksController.getBook);

// POST http://localhost:3000/books?API_KEY=miclave123
/* Enviar en Body:
        {
          "title": "Hamlet",
          "author": "Shakespeare",
          "year": 1623
        }
    */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Libro creado
 *       400:
 *         description: Error en los datos enviados
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


/**
 * @swagger
 * /api/books:
 *   put:
 *     summary: Editar un libro existente
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Libro editado
 *       400:
 *         description: Libro no encontrado o error en los datos enviados
 */
router.put("/", checkApiKey, booksController.editBook);

// DELETE http://localhost:3000/api/books/Hamlet?API_KEY=miclave123
// DELETE http://localhost:3000/api/books/Don Quijote?API_KEY=miclave123

/**
 * @swagger
 * /api/books/{title}:
 *   delete:
 *     summary: Eliminar un libro por título
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título del libro
 *     responses:
 *       200:
 *         description: Libro eliminado
 *       400:
 *         description: Libro no encontrado
 */
router.delete("/:title", checkApiKey, booksController.deleteBook);

module.exports = router;
