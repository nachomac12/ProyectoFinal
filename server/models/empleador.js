const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadorSchema = Schema({
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