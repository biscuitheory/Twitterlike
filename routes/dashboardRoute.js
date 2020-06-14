const express = require('express')
const dashboardRouter = express.Router()
const dashboardController = require('../controllers/dashboardController');
const isAuth = require('../middleware/isAuth');
const User = require('../models/User.js')

// Routes GET //
// Route affichant la page dashboard de l'utilisateur
dashboardRouter.get('/dashboard/:username', isAuth, dashboardController.getDashboard)

// Route affichant la page profil
dashboardRouter.get('/:username', isAuth, dashboardController.getProfile)

// Routes POST //
// Route affichant la page dashboard de l'utilisateur après envoi d'un tweet
dashboardRouter.post('/dashboard/:username', isAuth, dashboardController.getDashboardUpdate)

// Route affichant le profil de l'utilisateur après envoi d'un tweet
dashboardRouter.post('/:username', isAuth, dashboardController.getProfileUpdate)


module.exports = dashboardRouter