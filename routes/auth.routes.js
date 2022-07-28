const passport = require('passport');
const { Router } = require('express');
const { sessionChecker } = require('../middlewares/session-checker');

const { 
    login,
    signup,
    logout,
    dashboard, 
    signupPost, 
    loginPost, 
    failLoginDisplay, 
    failSignupDisplay, 
    signupError, 
    loginError 
} = require('../controllers/auth.controller');

const router = Router();

router.get('/', sessionChecker, (req, res) => {
    res.redirect("/login");
  });
router.get( '/login', sessionChecker, login);
router.post('/login', passport.authenticate('login', {failureRedirect:'/fLogin'}),loginPost);

router.get( '/logout',    logout);
router.get( '/dashboard', dashboard);

router.get( '/signup',    signup);
router.post('/signup',    passport.authenticate('register', {failureRedirect:'/fRegister'}),signupPost);

router.get( '/fRegister',  signupError);
router.get( '/fLogin',     loginError);
router.get( '/failLogin',  failLoginDisplay);
router.get( '/failSignup', failSignupDisplay);

/*
Fernando Herrera

const { Router } = require('express');
const { check }  = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );
*/

module.exports = router;
