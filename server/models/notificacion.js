const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificacionSchema = Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 100
    },
    mensaje: {
        type: String,
        required: true,
        maxlength: 300
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    destino: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    trabajoAsociado: {
        type: Schema.Types.ObjectId,
        ref: 'Trabajo'
    },
    vista: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports = { Notificacion };