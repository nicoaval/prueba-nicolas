const usersCtrl = {};

// Models
const User = require('../models/Usuario');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('usuarios/registrarse');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("usuarios/registrarse", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya esta en uso");
      res.redirect("/usuarios/registrarse");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Su registro fue exitoso");
      res.redirect("/usuarios/iniciarsesion");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("usuarios/iniciarsesion");
};

usersCtrl.iniciarsesion = passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/usuarios/iniciarsesion",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesión cerrada");
  res.redirect("/usuarios/iniciarsesion");
};

module.exports = usersCtrl;