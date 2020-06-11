const express = require('express')
const errorRouter = express.Router()

// Page error 404
errorRouter.get('*', (req,res) => {
    res.render('error404', {
        style: '/css/layouts/dashboard.css',
        title: 'Page introuvable / Twitter'
    })
})

module.exports = errorRouter
