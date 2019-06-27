const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trabajoSchema = Schema({
    nombre: {
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
    candidatos: {
        type: Array,
        default: []
    },
    terminado: {
        type: Boolean
    },
    habilidadesRequeridas: {
        type: Array,
        default: []
    }
})

const Trabajo = mongoose.model("Trabajo", trabajoSchema);

module.exports = { Trabajo };