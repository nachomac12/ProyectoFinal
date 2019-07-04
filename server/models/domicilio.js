const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domicilioSchema = Schema({
    localidad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    piso: {
        type: String
    }
})

const Domicilio = mongoose.model("Domicilio", domicilioSchema);

module.exports = { Domicilio }