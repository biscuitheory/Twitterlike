// Importation des modules
const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/authController');
const User = require('../models/User.js')
const passport = require("passport");
const flash = require('connect-flash');
const isAuth = require("../middleware/isAuth");
const { check } = require('express-validator');

authRouter.use(flash());

// Routes GET //
// Page d'inscription
authRouter.get('/signup', (req, res) => {
    res.render('signup', {
        style: '/css/layouts/signup.css',
        title: 'Inscription / Twitter',
        passwordCheck: req.flash('passwordCheck'),
        emailCheckExists: req.flash('emailCheckExists'),
        errors: req.flash('errors'),
        usernameInvalid: req.flash('usernameInvalid')
    })
})

// Page de connexion
authRouter.get('/login', (req, res) => {
    res.render('login', {
        style: '/css/layouts/login.css',
        title: 'Connexion / Twitter',
        errorPassword: req.flash('errorPassword'),
        userNotFound: req.flash('userNotFound')
    })
})

// Routes POST //
// Page d'inscription
authRouter.post('/signup',[
    // Utilisation du module express-validator pour check les entrées
    check('password').isLength({ min: 6 }),
    check('tel').isNumeric(),
    check('email').isEmail(),
  ],(req,res) => {
    authController.checkSignupInputs(req,res)
})

// Page de connexion
authRouter.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
)

// Après succès de la connexion, redirection sur dashboard personalisé
authRouter.get('/', isAuth, (req, res) => {
    username = req.user.username
    res.redirect(`dashboard/${username}`)
})


authRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
});

module.exports = authRouter