// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const User = require('../models/User.js')

// Routes GET //
// Page d'inscription
authRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css',
        title: 'Inscription / Twitter'
    })
})

// Page de connexion
authRouter.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css',
        title: 'Connexion / Twitter'
    })
})

// Routes POST //
// Page d'inscription
authRouter.post('/signup', (req, res) => {
    return authController.createUser(req, res)
})

// Page de connexion
authRouter.post('/login', (req, res) => {
    res.render('dashboard', {
        style: '/css/layouts/dashboard.css',
        title: 'Accueil / Twitter'
    })
})

module.exports = authRouter