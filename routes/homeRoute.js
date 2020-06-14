const express = require('express')
const homeRouter = express.Router()
const passport = require('passport')
const isAuth = require('../middleware/isAuth')

// Après succès de la connexion, redirection vers dashboard personalisé
homeRouter.get('/', isAuth, (req, res) => {
    username = req.user.username
    res.redirect(`dashboard/${username}`)
})

// Connexion via le formulaire d'entête sur la page home
homeRouter.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

module.exports = homeRouter