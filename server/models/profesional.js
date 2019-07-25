const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesionalSchema = Schema({
    profesion: {
        type: String,
        required: true,
        maxlength: 50
    },
    trabajosHaciendose: {
        type: Array,
        default: []
    },
    educacion: {
        type: Array,
        default: []
    },
    idiomas: {
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
        max: 3
    }
})

const Profesional = mongoose.model('Profesional', profesionalSchema);

module.exports = { Profesional };