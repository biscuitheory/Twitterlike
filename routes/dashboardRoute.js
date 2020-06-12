const express = require('express')
const dashboardRouter = express.Router()
const dashboardController = require('../controllers/dashboardController');
const isAuth = require("../middleware/isAuth");
const User = require('../models/User.js')


// Page dashboard
// Routes GET //
// route affichant la page dashboard
dashboardRouter.get('/dashboard/:username', isAuth, (req, res) => {
    if (req.user.username != req.params.username) {
        console.log('Pas le même utilisateur que la session ❌' );   
        res.redirect('/login');
    } else {
        // récupérer les tweets
        let Tweet = require('../models/Tweet')
        Tweet.all(function (tweet) {
            res.render('dashboard', {
                style: '/css/layouts/dashboard.css',
                title: 'Accueil / Twitter',
                username: req.user.username,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                avatar: req.user.avatar,
                usersSuggestions : req.usersSuggestions,
                tweets: tweet
            })
        })
    }
})

// route affichant la page profil
dashboardRouter.get('/:username', isAuth, (req, res) => {
    // récupérer les tweets
    let Tweet = require('../models/Tweet')
    Tweet.find(req.user.id, function (tweet) {
        res.render('profile', {
            style: '/css/layouts/dashboard.css',
            title: 'Profil / Twitter',
            username: req.user.username,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            avatar: req.user.avatar,
            usersSuggestions : req.usersSuggestions,
            tweets: tweet
        })
    })
})

// dashboardRouter.get('/tweet/:id', isAuth, (req, res) => {
//     res.send(req.params.id)
//     let Tweet = require('../models/Tweet')
//     Tweet.find(req.params.id, function (tweet) {
//         res.render('show', {
//             style: '/css/layouts/dashboard.css',
//             title: 'Accueil / Twitter',
//             tweet: tweet
//         })
//     })
// })


// Routes POST //

dashboardRouter.post('/dashboard/:username', isAuth, (req, res) => {
    if (req.body.tweet === undefined || req.body.tweet === '') {
        res.redirect(`/dashboard/${req.user.username}`)
        // res.redirect('/dashboard' + req.params.username)
    } else {
        let Tweet = require('../models/Tweet')
        Tweet.create(req.user.id, req.body.tweet, function () {
            res.redirect(`/dashboard/${req.user.username}`)
        })
    }
    // dashboardController.createTweet(req, res)
})

dashboardRouter.post('/:username', isAuth, (req, res) => {
    if (req.body.tweet === undefined || req.body.tweet === '') {
        res.redirect(`/${req.user.username}`)
        // res.redirect('/dashboard' + req.params.username)
    } else {
        let Tweet = require('../models/Tweet')
        Tweet.create(req.user.id, req.body.tweet, function () {
            res.redirect(`/${req.user.username}`)
        })
    }
})


module.exports = dashboardRouter