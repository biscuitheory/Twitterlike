const User = require("../models/User.js");

// Fonction permettant de créer un utilisateur via le modèle
exports.createUser = (req,res) => {
    const user = new User(req.body)
    User.create(req.body)
    // Redirection vers la page login
    res.redirect('/login')
}