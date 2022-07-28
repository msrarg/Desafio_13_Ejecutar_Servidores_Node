const login = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const loginPost = (req, res) => {
    res.status(200).json({
        message:'Acceso autorizado',
        authenticated: true
    })
}

const signup = (req, res) => {
    res.render("pages/signup", {
        loggedIn: false,
    });
}

const signupPost = (req, res) => {
    res.status(200).json({
        message:'Usuario registrado',
        registered: true
    })
}

const logout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.name;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                userName: name,
                loggedIn: false,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}

const dashboard = (req, res) => {
    if(req.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.user.name,
            userEmail: req.user.email,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

const loginError = (req, res) => {
    res.status(400).json({
        message:'Acceso no autorizado',
        authenticated: false
    })
}

const signupError = (req, res) => {
    res.status(400).json({
        message:'No se pudo registrar el usuario',
        registered: false
    })
}

const failLoginDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const failSignupDisplay = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}

module.exports = {
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    dashboard,
    failLoginDisplay,
    failSignupDisplay, 
    loginError,
    signupError,
}


/*
const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

module.exports = {
    login
}
*/