const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(express.static('client/build'))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


// Middlewares
const { auth } = require('./middleware/auth');


// Models
const { Usuario } = require('./models/usuario');
const { Profesional } = require('./models/profesional');
const { Empleador } = require('./models/empleador');
const { Habilidad } = require('./models/habilidad');

//==========================================\\
//                   FILES                  \\
//==========================================\\

const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/public/images/perfil/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${req.usuario._id}_${file.originalname}`)
    }
});
const upload = multer({storage: storage}).single('file');

app.post('/api/usuarios/uploadfile', auth, (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({success: true})
    })
})

const fs = require('fs');
const path = require('path');

app.get('/api/usuarios/files', auth, (req, res) => {
    var array = []
    const dir = path.resolve(".")+'/client/public/images/perfil/';
    fs.readdir(dir, (err, items) => {
        items.map(item => {
            if (item.includes(`${req.usuario._id}`)) {
                array.push(item)
            }
        })
            return res.status(200).json({
                url: `/images/perfil/${array[array.length-1]}`
            });
    })
})


//==========================================\\
//                 USUARIOS                 \\
//==========================================\\

app.get('/api/usuarios/auth', auth, (req, res) => {
    res.status(200).json({
        //req.usuario me pasa el usuario que agarre en el middleware con buscarPorToken
        isAuth: true,
        id: req.usuario._id,
        esProfesional: req.usuario.profesional ? true : false,
        esEmpleador: req.usuario.empleador ? true : false,
        email: req.usuario.email,
        profesional: req.usuario.profesional,
        empleador: req.usuario.empleador,
        fotoDePerfil: req.usuario.fotoDePerfil
    })
})

app.post('/api/usuarios/registro', (req, res) => {
    const usuario = new Usuario(req.body);

    usuario.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            usuariodata: doc
        })
    })
})

app.post('/api/usuarios/ingresar', (req, res) => {
    Usuario.findOne({'email': req.body.email}, (err, usuario) => {
        if (!usuario) return res.json({
            loginSuccess: false,
            message: "El email no ha sido encontrado."
        });

        usuario.compararContraseña(req.body.contraseña, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSuccess: false, 
                message: "La contraseña no coincide."
            });

            usuario.generarToken((err, usuario) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', usuario.token).status(200).json({
                    loginSuccess: true,
                    message: "Ya has ingresado"
                })
            })
        })
    })
})

app.get('/api/usuarios/logout', auth, (req, res) => {
    Usuario.findOneAndUpdate(
        {_id: req.usuario._id},
        {token: ''},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.put('/api/usuarios/cambiarfoto', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {fotoDePerfil: req.body.fotoDePerfil},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true,
                foto: req.body.fotoDePerfil
            })
        }
    )
})

app.put('/api/usuarios/cambiaremail', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {email: req.body.email},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true,
                email: req.body.email
            })
        }
    )
})

//==========================================\\
//                PROFESIONAL               \\
//==========================================\\

app.post('/api/usuarios/profesionales', (req, res) => {
    const profesional = new Profesional(req.body);

    profesional.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            profesionalData: doc
        })
    })
})

app.get('/api/usuarios/profesional_por_id', auth, (req, res) => {
    Profesional.findOne({'_id': req.usuario.profesional}, (err, profesional) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(profesional);
    })
})

app.put('/api/usuarios/editar_nombre_profesional', auth, (req, res) => {
    Profesional.update(
        {_id: req.usuario.profesional},
        {nombre: req.body.nombre},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json({
                success: true,
                nombre: req.body.nombre,
            })
        }
    )
})

app.put('/api/usuarios/editar_apellido_profesional', auth, (req, res) => {
    Profesional.update(
        {_id: req.usuario.profesional},
        {apellido: req.body.apellido},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json({
                success: true,
                apellido: req.body.apellido
            })
        }
    )
})

app.put('/api/usuarios/agregar_habilidades', auth, (req, res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $push: { habilidades: { $each: req.body.habilidades } } },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.habilidades)
        }
    )
})

app.delete('/api/usuarios/eliminar_habilidad', auth, (req, res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $pull: { habilidades: { $in: req.query.nombre } } },
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.habilidades.filter(item => item !== req.query.nombre));
        }
    )
})

//==========================================\\
//                 EMPLEADOR                \\
//==========================================\\

app.post('/api/usuarios/empleadores', (req, res) => {
    const empleador = new Empleador(req.body);

    empleador.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            empleadorData: doc
        })
    })
})

app.get('/api/usuarios/empleador_por_id', auth, (req, res) => {
    Empleador.findOne({'_id': req.usuario.empleador}, (err, empleador) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(empleador);
    })
})


//==========================================\\
//                 HABILIDAD                \\
//==========================================\\

app.post('/api/habilidades/agregar_habilidad', (req, res) => {
    const habilidad = new Habilidad(req.body);

    habilidad.save((err, doc) => {
        if (err) return res.json({success: false, err});
        res.status(200).json({
            success: true,
            habilidad: doc
        })
    })
})

app.get('/api/habilidades/get_habilidades', (req, res) => {
    let profesion = req.query.profesion;
    Habilidad.find({'profesion': profesion}, (err, habilidades) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(habilidades);
    })
})


////// Test Route //////

app.get('/api/test', (req, res) => {
    return res.status(200).send({message: "holu"});
})


if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}


////////// PORT //////////

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server running at ${port}`)
})