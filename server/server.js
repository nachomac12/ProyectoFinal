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

const bcrypt = require('bcrypt');
const SALT_I = 10;

// Middlewares
const { auth } = require('./middleware/auth');

// Models
const { Usuario } = require('./models/usuario');
const { Profesional } = require('./models/profesional');
const { Empleador } = require('./models/empleador');
const { Habilidad } = require('./models/habilidad');
const { Domicilio } = require('./models/domicilio');
const { Trabajo } = require('./models/trabajo');   
const { Notificacion } = require('./models/notificacion');

// Utilidades
const { enviarEmail } = require('./utilidades/mailer/index');

//==========================================\\
//                 TRABAJOS                 \\
//==========================================\\

app.post('/api/trabajos/trabajo', auth, (req, res) => {
    const trabajo = new Trabajo(req.body);

    trabajo.save((err, doc) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({
            trabajo: doc,
            success: true
        })
    })
})

app.get('/api/trabajos/trabajos_por_empleador', auth, (req, res) => {
    Trabajo.find({'creador': req.usuario.empleador}, (err, doc) => {
        if (err) res.json(err);
        res.status(200).json(doc);
    }).populate("candidatos");
})

app.put('/api/trabajos/postular', auth, (req, res) => {
    Trabajo.findOneAndUpdate(
        {_id: req.body.id},
        { $push: { candidatos: req.body.candidato } },
        {new: true},
        (err, doc) => {
            if (err) return res.json(err);
            res.status(200).json(doc)
        }
    ).populate("candidatos");
})

app.put('/api/trabajos/despostular', auth, (req, res) => {
    Trabajo.findOneAndUpdate(
        {_id: req.body.id},
        { $pull: { candidatos: { $in: req.body.candidato } } },
        {new: true},
        (err, doc) => {
            if (err) return res.json(err);
            res.status(200).json(doc)
        }
    ).populate("candidatos");
})

app.get('/api/trabajos/esta_postulado', auth, (req, res) => {
    Trabajo.find(
        {_id: req.query.id, candidatos: req.query.candidato},
        (err, doc) => {
            if (err) return res.json(err);
            if (doc.length > 0) {
                res.status(200).json({postulado: true})
            } else {
                res.status(200).json({postulado: false})
            }
        }
    )
})

app.get('/api/trabajos/postulados', auth, (req, res) => {
    Trabajo.findOne(
        {_id: req.query.id},
        (err, doc) => {
            if (err) return res.json(err);
            res.status(200).json(doc.candidatos);
        }
    ).populate("candidatos");
})

app.post('/api/trabajos/notificacion', auth, (req, res) => {
    const notificacion = new Notificacion(req.body);

    notificacion.save((err, doc) => {
        if (err) return res.json(err);
        return res.status(200).json(doc)
    })
})

app.put('/api/trabajos/notificacion', auth, (req, res) => {
    Notificacion.findOneAndRemove(
        {creador: req.body.creadorID, destino: req.body.usuarioID, trabajoAsociado: req.body.trabajoID},
        (err, doc) => {
            if (err) return res.json(err);
            res.status(200).json(doc);
        }
    )
})

app.get('/api/trabajos/notificaciones_usuario', auth, (req, res) => {
    Notificacion
        .find(
            {destino: req.usuario._id},
            (err, doc) => {
                if (err) return res.json(err);
                res.status(200).json(doc);
            }
        )
        .sort({_id: -1})
})

app.put('/api/trabajos/notificacion_vista', auth, (req, res) => {
    Notificacion
        .findOneAndUpdate(
            {_id: req.body.id},
            {vista: true},
            {new: true},
            (err, doc) => {
                if (err) return res.json(err);
                res.status(200).json(doc);
            }
        )
})

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
        esProfesional: req.usuario.profesional ? true : false,
        esEmpleador: req.usuario.empleador ? true : false,
        id: req.usuario._id,
        nombre: req.usuario.nombre,
        apellido: req.usuario.apellido,
        email: req.usuario.email,
        domicilio: req.usuario.domicilio,
        descripcion: req.usuario.descripcion,
        fotoDePerfil: req.usuario.fotoDePerfil,
        telefono: req.usuario.telefono,
        profesional: req.usuario.profesional,
        empleador: req.usuario.empleador
    })
})

app.post('/api/usuarios/registro', (req, res) => {
    const usuario = new Usuario(req.body);

    usuario.save((err, doc) => {
        if (err) return res.json({success: false, err});
        enviarEmail(doc.email, doc.nombre, null, "bienvenida");
        return res.status(200).json({
            success: true,
            usuariodata: doc
        })
    })
})

app.get('/api/usuarios/emailrepetido', (req, res) => {
    Usuario.find({'email': req.query.email}, (err, doc) => {
        if (err) return res.json(err);
        if (doc.length !== 0) {
            return res.status(200).send({emailExiste: true})
        } else {
            return res.status(200).send({emailExiste: false})
        }
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

app.get('/api/usuarios/get_usuario', (req, res) => {
    Usuario.findOne(
        {_id: req.query.idUsuario},
        (err, doc) => {
            if (err) res.json(err);
            res.status(200).json(doc);
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

app.put('/api/usuarios/cambiarpassword', auth, (req, res) => {
    bcrypt.genSalt(SALT_I, function(err, salt){
        if (err) return next(err);

        bcrypt.hash(req.body.contraseña, salt, function(err, hash) {
            if (err) return next(err);
            Usuario.update(
                {_id: req.usuario._id},
                {contraseña: hash},
                (err, doc) => {
                    if (err) return res.json({success: false, err});
                    return res.status(200).send({
                        success: true,
                        contraseña: hash
                    })
                }
            );
        })
    });
})

app.put('/api/usuarios/cambiarnombre', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {nombre: req.body.nombre},
        (err, doc) => {
            if (err) return res.json({success:false, err});
            return res.status(200).send({
                success: true,
                nombre: req.body.nombre
            })
        }
    )
})

app.put('/api/usuarios/cambiarapellido', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {apellido: req.body.apellido},
        (err, doc) => {
            if (err) return res.json({success:false, err});
            return res.status(200).send({
                success: true,
                apellido: req.body.apellido
            })
        }
    )
})

app.put('/api/usuarios/cambiardescripcion', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {descripcion: req.body.descripcion},
        (err, doc) => {
            if (err) return res.json({success:false, err});
            return res.status(200).send({
                success: true,
                descripcion: req.body.descripcion
            })
        }
    )
})

app.put('/api/usuarios/cambiartelefono', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {telefono: req.body.telefono},
        (err, doc) => {
            if (err) return res.json({success:false, err});
            return res.status(200).send({
                success: true,
                telefono: req.body.telefono
            })
        }
    )
})

app.put('/api/usuarios/agregardomicilio', auth, (req, res) => {
    Usuario.update(
        {_id: req.usuario._id},
        {domicilio: req.body.domicilio},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true,
                domicilio: req.body.domicilio
            })
        }
    )
})

//==========================================\\
//                 DOMICILIO                \\
//==========================================\\

app.post('/api/usuarios/domicilio', auth, (req, res) => {
    const domicilio = new Domicilio(req.body);

    domicilio.save((err, domicilio) => {
        if (err) return res.json({success: false, err});
        res.status(200).send(domicilio)
    })
})

app.put('/api/usuarios/domicilio', auth, (req, res) => {
    Domicilio.findOneAndUpdate(
        {_id: req.usuario.domicilio},
        {$set: req.body},
        {new: true},
        (err, domicilio) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send(domicilio)
        }
    )
})

app.get('/api/usuarios/domicilio', auth, (req, res) => {
    Domicilio.findOne({'_id': req.usuario.domicilio}, (err, domicilio) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(domicilio);
    })
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

app.put('/api/usuarios/profesional/idiomas', auth, (req, res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $addToSet: { idiomas: req.body.idiomas } },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.idiomas);
        }
    )
})

app.delete('/api/usuarios/profesional/idiomas', auth, (req, res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $pull: { idiomas: { id: req.query.id } } },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.idiomas);
        }
    )
})

app.put('/api/usuarios/profesional/educacion', auth, (req, res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $addToSet: { educacion: req.body.educacion } },
        { new: true },
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.educacion);
        }
    )
})

app.delete('/api/usuarios/profesional/educacion', auth, (req,res) => {
    Profesional.findOneAndUpdate(
        {_id: req.usuario.profesional},
        { $pull: { educacion: { id: req.query.id } } },
        {new: true},
        (err, doc) => {
            if (err) return res.json({success: false, err});
            res.status(200).json(doc.educacion);
        }
    )
})

app.post('/api/usuarios/buscarprofesionales', (req, res) => {
    let findProfesional = {};
    let findDomicilio = {};
    if (req.body.profesion) {
        findProfesional["profesion"] = req.body.profesion;
    }
    if (req.body.habilidades) {
        findProfesional["habilidades"] = {$in: req.body.habilidades}
    }
    if (req.body.idiomas) {
        var array = [];
        for (let item in req.body.idiomas) {
            array.push({$elemMatch: {idioma: req.body.idiomas[item]}});
        }
        findProfesional["idiomas"] = {$all: array}
    }
    if (req.body.localidad) {
        findDomicilio["localidad"] = req.body.localidad;
    }

    Usuario.find()
        .populate({
            path: "profesional",
            match: findProfesional
        })
        .populate({
            path: "domicilio",
            match: findDomicilio
        })
        .exec((err, doc) => {
            if (err) return res.json({success: false, err});
            const profesionales = doc.filter(item => item.profesional !== null && item.domicilio !== null && item.profesional && item.domicilio && !item.empleador);
            res.send({
                profesionales,
                size: profesionales.length
            });
        })
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