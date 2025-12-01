const express = require('express');
const app = express();
const routes = require('./routes/projectRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/api/projects', routes);

// middleware para errores
app.use(errorHandler);

module.exports = app;
