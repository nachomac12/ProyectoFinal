const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadorSchema = Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: 100
    },
    apellido: {
        type: String,
        maxlength: 100
    },
    tipo: {
        type: String,
        required: true
    },
    trabajos: {
        type: Array,
        default: []
    }
})

const Empleador = mongoose.model('Empleador', empleadorSchema);

module.exports = { Empleador };