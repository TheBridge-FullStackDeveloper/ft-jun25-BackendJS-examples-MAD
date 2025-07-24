const express = require("express");
const cowsay = require("cowsay");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerSpec = require('./config/swagger');

const app = express();
const port = 3000;

// Leer fichero .env
require('dotenv').config();

// Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Configuración del logger con Morgan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Configuración de motor de plantillas con PUG
app.set('view engine', 'pug');
app.set('views','./views');

// Rutas
const booksRoutes = require("./routes/books.routes");
const productsRoutes = require("./routes/products.routes");
const productsWebRoutes = require("./routes/products.web.routes");
const entriesRoutes = require("./routes/entries.routes");

// Middleware
app.use(express.json()); // Para parsear el body entrante a JSON
app.use(express.static('public')); // Para servir archivos estáticos del front CSS, JS, assets

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

// Habilitar las rutas - Middlewares
// API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

// WEB
app.use('/products',productsWebRoutes);

// Rutas web
app.get('/first_template', function(req, res){
  res.render('first_view.pug');
});

app.get('/dynamic_view', function(req, res){
  res.render('dynamic.pug', {
     name: "The Bridge of San Luis Rey", 
     url:"https://thebridge.tech/"
  });
});

// Habilitar ruta about
app.get('/about', function(req, res){
  res.render('about');
});

// Documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));      // Swagger
app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs'))); // JSDOC


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
