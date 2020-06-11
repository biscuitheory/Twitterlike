// Importation modules npm
const express = require('express')
const exphbs = require('express-handlebars')

// Instanciation d'express
const app = express()

// Instanciation du port localhost
const PORT = 8080

// Configuration moteur de template Handlebars et express.static()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Page d'accueil
app.get('/', (req,res) => {
    res.render('home', {
        style: '/css/layouts/home.css',
        title: "Twitter. C'est ce qui se passe dans le monde"
    })
})

// Page d'inscription
app.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css',
        title: 'Inscription / Twitter',
    })
})

// Page de connexion
app.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css',
        title: 'Connexion / Twitter'
    })
})

// Page dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter'
    })
})

// Page error 404
app.get('*', (req,res) => {
    res.render('error404', {
        style: '/css/layouts/dashboard.css',
        title: 'Page introuvable / Twitter'
    })
})

// Application Listen (http://localhost:8080/)
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT} 🚀`)
});