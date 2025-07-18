const express = require("express");
const cowsay = require("cowsay");

const app = express();
const port = 3000;

// Leer fichero .env
require('dotenv').config();

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const entriesRoutes = require("./routes/entries.routes");

// Middleware
app.use(express.json()); // Para parsear el body entrante a JSON

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// Habilitar las rutas - Middlewares
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

// Gestionar ruta inexistente
app.use(error404);

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // Use the owl ASCII art // owl
    })
  );
});

module.exports = app; // Exportar la app para usarla en tests
