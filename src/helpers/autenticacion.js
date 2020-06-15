const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No esta autorizado');
  res.redirect('/usuarios/iniciarsesion');
};

module.exports = helpers;
