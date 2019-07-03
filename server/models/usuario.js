const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const usuarioSchema = Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    contraseña: {
        type: String,
        required: true,
        minlength: 6
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    telefono: {
        type: String
    },
    fotoDePerfil: {
        type: String,
        default: '/images/avatar3.png'
    },
    domicilio: {
        type: Schema.Types.ObjectId,
        ref: "Domicilio"
    },
    profesional: {
        type: Schema.Types.ObjectId,
        ref: "Profesional"
    },
    empleador: {
        type: Schema.Types.ObjectId,
        ref: "Empleador"
    },
    token: {
        type: String
    }
})

usuarioSchema.pre('save', function(next) {
    var usuario = this;

    if (usuario.isModified('contraseña')){  
        bcrypt.genSalt(SALT_I, function(err, salt){
            if (err) return next(err);

            bcrypt.hash(usuario.contraseña, salt, function(err, hash) {
                if (err) return next(err);
                usuario.contraseña = hash;
                next();
            })
        
        })
    } else {
        next()
    }
})

usuarioSchema.methods.compararContraseña = function(potencialContraseña, callback) {
    bcrypt.compare(potencialContraseña, this.contraseña, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

usuarioSchema.methods.generarToken = function(callback) {
    var usuario = this;
    var token = jwt.sign(usuario._id.toHexString(), process.env.SECRET);

    usuario.token = token;
    usuario.save(function(err, usuario) {
        if (err) return callback(err);
        callback(null, usuario);
    })
}

usuarioSchema.statics.buscarPorToken = function (token, callback) {
    var usuario = this;

    jwt.verify(token, process.env.SECRET, function(err, decode) {
        usuario.findOne({"_id": decode, "token": token}, function (err, usuario) {
            if (err) return callback(err);
            callback(null, usuario);
        })
    })
}

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = { Usuario };