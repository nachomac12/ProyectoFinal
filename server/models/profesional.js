const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesionalSchema = Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 50
    },
    apellido: {
        type: String,
        required: true,
        maxlength: 50
    },
    profesion: {
        type: String,
        required: true,
        maxlength: 50
    },
    trabajosHaciendose: {
        type: Array,
        default: []
    },
    habilidades: {
        type: Array,
        default: []
    },
    historialTrabajos: {
        type: Array,
        default: []
    },
    puntuacion: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    }
})

const Profesional = mongoose.model('Profesional', profesionalSchema);

module.exports = { Profesional };