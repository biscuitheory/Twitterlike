// Importation modules npm
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');

// Instanciation de la fonction dans le fichier passport.js
const initializePassport = require('./config/passport');

// Instanciation d'express
const app = express();

// Appel de la fonction initializePassport
initializePassport(passport);

// Instanciation du port localhost
const PORT = process.env.PORT || 8080;

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// SESSION
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // 24 hours
    },
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use(require('./routes/authRoutes.js'));
app.use(require('./routes/homeRoute.js'));
app.use(require('./routes/dashboardRoute.js'));
app.use(require('./routes/error404Route.js'));

// Application Listen (http://localhost:8080/)
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT} 🚀`);
});
