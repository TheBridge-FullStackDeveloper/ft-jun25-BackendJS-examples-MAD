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

// CREATE
const createBook = (req, res) => {
  console.log(req.body); // Body recibido
  const new_book = req.body;

  if (new_book.title && new_book.author && new_book.year) {
    // En el futuro será con SQL
    // INSERT INTO books (title, author, year) VALUES (new_book.title, new_book.author, new_book.year);
    books.push(new_book);
    res.status(201).json({ success: true, msj: "Libro creado!", new_book });
  } else {
    res.status(400).json({ success: false, msj: "Fallo al crear libro!" });
  }
}

// READ
const getBookByYear = (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  console.log(req.query);

  if (start && end) {
    const booksFound = books.filter(
      (book) => book.year >= start && book.year <= end
    );
    res.status(200).json(booksFound);
  } else {
    res.status(404).json({ msj: "Falta fecha inicial o final" });
  }
}

// READ
const getBook = (req, res) => {
    // título opcional
    console.log(req.params);
    const title = req.params.title;
    console.log(title);
  
    if (title) {
      //devuelve sólo ese libro
      const book = books.find((book) => book.title == title); // busca por título
      if (book) res.status(200).json(book); // devuelve libro encontrado
      else res.status(404).json({ msj: "Book not found!" }); // devuelve libro encontrado
    } else {
      // todos los libros
      res.status(200).json(books);
    }
  }

// UPDATE
const editBook = (req, res) => {
  console.log(req.body); // Body recibido
  const book_data = req.body;
  if(book_data.title){
    // Editar el libro correspondiente
    // Busca la posición del libro con mismo título
    const index = books.findIndex(b => b.title == book_data.title);
    console.log(index);
    if(index != -1){
      books[index] = book_data; 
      // Actualizar en BBDD SQL
      // UPDATE books SET author = book_data.author, year = book_data.year WHERE title = book_data.title;
      res.status(200).json({success:true, msj:"Libro editado!"});
    }
    else{
      res.status(400).json({success:false, msj:"Libro no encontrado!"});
    }
  }
  else{
    res.status(400).json({ success: false, msj: "Fallo al editar libro!. Envía un título" });
  }
}

// DELETE
const deleteBook = (req, res) => {

    const title = req.params.title;
  
    // Busca la posición del libro con mismo título
    const index = books.findIndex(b => b.title == title);
  
    if(index != -1){
      // Eliminar libro en SQL
      // DELETE FROM books WHERE title = title;
      const book = books.splice(index,1); // Libro borrado
       res.status(200).json({success:true, msj:"Libro borrado!", book});
    }
    else {
      res.status(400).json({success:false, msj:"Libro no encontrado!"});
    }
  }

module.exports = {
    createBook,
    getBookByYear,
    getBook,
    editBook,
    deleteBook 
}