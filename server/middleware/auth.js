const { Usuario } = require('../models/usuario');

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    Usuario.buscarPorToken(token, (err, usuario) => {
        if (err) throw err;
        if (!usuario) return res.json({
            isAuth: false,
            error: true
        });

        req.token = token;
        req.usuario = usuario;
        next();
    })
}

module.exports = { auth };