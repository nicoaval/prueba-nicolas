const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  iniciarsesion,
  logout
} = require("../controllers/usuarios.controller");

// Routes
router.get("/usuarios/registrarse", renderSignUpForm);

router.post("/usuarios/registrarse", singup);

router.get("/usuarios/iniciarsesion", renderSigninForm);

router.post("/usuarios/iniciarsesion", iniciarsesion);

router.get("/usuarios/logout", logout);

module.exports = router;
