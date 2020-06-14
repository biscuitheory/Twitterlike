const express = require('express')
const homeRouter = express.Router()
const passport = require('passport')
const isAuth = require('../middleware/isAuth')

// Après succès de la connexion, redirection sur dashboard personalisé
homeRouter.get('/', isAuth, (req, res) => {
    username = req.user.username
    res.redirect(`dashboard/${username}`)
})

// Page d'accueil sans authentification
// homeRouter.get('/', (req, res) => {
//     res.render('home', {
//         style: '/css/layouts/home.css',
//         title: "Twitter. C'est ce qui se passe dans le monde"
//     })
// })

homeRouter.post('/home', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = homeRouter