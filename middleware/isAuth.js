module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else if (!req.isAuthenticated()) {
      res.redirect("/login")
    } else {
      res.redirect("/home");
    }
  };
  