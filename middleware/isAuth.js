module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('home', {
      style: '/css/layouts/home.css',
      title: "Twitter. C'est ce qui se passe dans le monde"
    })
  }
};
  