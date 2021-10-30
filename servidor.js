const express = require('express');
const mongoose = require('mongoose');
const PersonSchema = require('./modelos/Person.js');

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexion a la base de datos
mongoose.connect("mongodb+srv://pro_web:w3tthsmCHUjCHQw@clusterbookapp.71ei1.mongodb.net/jobInterviewDB?retryWrites=true&w=majority");

// Operaciones CRUD

router.get('/', (req, res) => {
    res.send("API Job Interview");
});


router.get('/people', (req, res) => {
    PersonSchema.find(function (err, data) {
        if (err) {
            console.log("Error");
        } else {
            res.send(data);
        }
    })
});

router.get('/person/:id', (req, res) => {
    PersonSchema.findById(req.params.id, function(err, data) {
        if (err) {
            console.log("Maybe the person doesn't exist!");
        } else {
            res.send(data);
        }
    }).exec();
});

router.delete('/person/:id', (req, res) => {
    PersonSchema.findByIdAndDelete(req.params.id, function(err, data) {
        if (err) {
            console.log("Maybe the person doesn't exist!")
        } else {
            res.send("The person have been delete");
        }
    })
});


router.put('/person/:id', (req, res) => {
    const personUpdated = {
        nombres: req.body.nombres, 
        apellidos: req.body.apellidos 
    };

    PersonSchema.findByIdAndUpdate({_id: req.params.id }, personUpdated, function(err, data) {
        if (err) {
            console.log("Upps, something there is an error");
        } else {
            res.send("The details have been updating!");
        }
    });
});

router.post('/person', (req, res) => {
    const { tipoDocumento, documentIdentificacion,
            nombres, apellidos, 
            dirrecion, correoElectronico, 
            telefonoFijo, telefonoCelular, 
            enlaceWeb, detallePerfil 
        } = req.body;
    
    let newPerson = new PersonSchema({
        tipoDocumento,
        documentIdentificacion,
        nombres, 
        apellidos,
        dirrecion,
        correoElectronico,
        telefonoFijo,
        telefonoCelular,
        enlaceWeb,
        detallePerfil
    });

    newPerson.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Account created!");
        }
    })

});

app.use(router);
app.listen(3000, () => {
    console.log("Listening the port 3000");
});

