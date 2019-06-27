const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habilidadSchema = Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 20
    },
    profesion: {
        type: String,
        required: true,
        maxlength: 50
    }
})

const Habilidad = mongoose.model("Habilidad", habilidadSchema);

module.exports = { Habilidad };