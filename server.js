// Importation modules npm
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser");

// Instanciation d'express
const app = express()

// Instanciation du port localhost
const PORT = 8080

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES
app.use(require('./routes/authRoutes.js'))
app.use(require('./routes/homeRoute.js'))
app.use(require('./routes/dashboardRoute.js'))
app.use(require('./routes/error404Route.js'))

// Application Listen (http://localhost:8080/)
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT} 🚀`)
});