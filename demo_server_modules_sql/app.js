const express = require("express");
const cowsay = require("cowsay");

const app = express();
const port = 3000;

// Leer fichero .env
require('dotenv').config();

// Configuración del logger con Morgan
const morgan = require('./middlewares/morgan');
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const entriesRoutes = require("./routes/entries.routes");

app.use(express.json()); // Para parsear el body entrante a JSON

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// Habilitar las rutas
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);


app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // Use the owl ASCII art // owl
    })
  );
});
