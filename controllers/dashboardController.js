const Tweet = require('../models/Tweet.js');

// Controller de la route get /dashboard/:username : afficher le dashboard de l'utilisateur
exports.getDashboard = (req, res) => {
    if (req.user.username != req.params.username) {
        console.log('Pas le même utilisateur que la session ❌' )   
        res.redirect('/login')
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
}

// Controller de la route get /username : afficher le profil de l'utilisateur
exports.getProfile = (req, res) => {
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
            city: req.user.city,
            usersSuggestions : req.usersSuggestions,
            tweets: tweet
        })
    })
}

// Controller de la route post /dashboard/:username : afficher le dashboard après l'envoi d'un tweet
exports.getDashboardUpdate = (req, res) => {
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
}

// Controller de la route get /username : afficher le profil de l'utilisateur après envoi d'un tweet
exports.getProfileUpdate = (req, res) => {
    if (req.body.tweet === undefined || req.body.tweet === '') {
        res.redirect(`/${req.user.username}`)
        // res.redirect('/dashboard' + req.params.username)
    } else {
        let Tweet = require('../models/Tweet')
        Tweet.create(req.user.id, req.body.tweet, function () {
            res.redirect(`/${req.user.username}`)
        })
    }
}