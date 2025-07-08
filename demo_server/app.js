const express = require("express");
const app = express();
const port = 3000;

// En el futuro esto será mi "base de datos"
const books = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { title: "El señor de los anillos", author: "J.R.R. Tolkien", year: 1954 },
  { title: "El principito", author: "Antoine de Saint-Exupéry", year: 1943 },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
  },
];
app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// GET http://localhost:3000/books --> todos los libros
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/Don Quijote de la Mancha
// GET http://localhost:3000/books/{title}

// Las  {} indican opcionalidad en la ruta
// :/title indican que este parámetro de ruta es variable. Title es el nombre del parámetro
//app.get("/books/:title", (req, res) => { //--> obligatorio título en este caso
app.get("/books{/:title}", (req, res) => {
  // título opcional
  console.log(req.params);
  const title = req.params.title;
  console.log(title);

  if (title) {
    //devuelve sólo ese libro
    const book = books.find((book) => book.title == title); // busca por título
    if(book)
        res.status(200).json(book); // devuelve libro encontrado
    else
        res.status(404).json({msj:"Book not found!"}); // devuelve libro encontrado
  } else {
    // todos los libros
    res.status(200).json(books);
  }
});

app.post("/books", (req, res) => {
  res.send("Libro creado!");
});

app.put("/books", (req, res) => {
  res.send("Libro editado!");
});

app.delete("/books", (req, res) => {
  res.send("Libro borrado!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
