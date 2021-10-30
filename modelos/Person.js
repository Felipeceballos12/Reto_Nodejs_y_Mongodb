const mongoose = require('mongoose');

let PersonSchema = new mongoose.Schema({
    tipoDocumento: String,
    documentIdentificacion: Number,
    nombres: String,
    apellidos: String,
    dirrecion: String,
    correoElectronico: String,
    telefonoFijo: Number,
    telefonoCelular: String,
    enlaceWeb: String,
    detallePerfil: String
});

module.exports = mongoose.model('person', PersonSchema, 'People');