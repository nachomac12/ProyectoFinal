const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trabajoSchema = Schema({
    titulo: {
        type: String,
        required: true,
        maxlength: 100
    },
    descripcion: {
        required: true,
        type: String,
        maxlength: 100000
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: "Empleador",
        required: true
    },
    cantidadCandidatosPermitidos: {
        type: Number,
        default: 10
    },
    candidatos: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    terminado: {
        type: Boolean,
        default: false
    },
    profesionRequerida: {
        type: String,
        maxlength: 100
    },
    habilidadesRequeridas: {
        type: Array,
        default: []
    }
})

const Trabajo = mongoose.model("Trabajo", trabajoSchema);

module.exports = { Trabajo };