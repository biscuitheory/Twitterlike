// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController')
const User = require('../models/User.js')
const passport = require('passport')
const flash = require('connect-flash')
const { check } = require('express-validator')

authRouter.use(flash());

// Routes GET //
// Route de la page d'inscription
authRouter.get('/signup', authController.getSignup)

// Route de la page de connexion
authRouter.get('/login', authController.getLogin)

// Routes POST //
// Route de la page d'inscription après envoi du formulaire
authRouter.post('/signup',[
    // Utilisation du module express-validator pour check les entrées
    check('password').isLength({ min: 6 }),
    check('tel').isNumeric(),
    check('email').isEmail(),
  ], authController.getSignupUpdate
)

// Route de la page de connexion après envoi du formulaire
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

// Route de déconnexion, redirection vers la page d'accueil
authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = authRouter