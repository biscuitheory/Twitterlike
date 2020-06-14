module.exports = (req, res, next) => {
  // Page d'accueil avec authentification
  if (req.isAuthenticated()) {
    next();
  } else { // Page d'accueil sans authentification
    res.render('home', {
      style: '/css/layouts/home.css',
      title: "Twitter. C'est ce qui se passe dans le monde"
    })
  }
};
  