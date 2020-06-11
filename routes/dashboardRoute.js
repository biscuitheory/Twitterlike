const express = require('express')
const dashboardRouter = express.Router()


// Page dashboard
// Routes GET //
dashboardRouter.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        style : '/css/layouts/dashboard.css',
    })
})

// Routes POST //
dashboardRouter.post('/dashboard', (req, res) => {
    res.render('dashboard', {
        style : '/css/layouts/dashboard.css',
    })
    
})

module.exports = dashboardRouter