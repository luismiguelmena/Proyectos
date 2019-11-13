'use strict'

var Entrada = require('../models/entrada');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

function saveEntrada(req, res) {

    var entrada = new Entrada();
    //console.log(req)

    var params = req.body; //paramentros que nos llegan por el body


    entrada.user = params.user;
    entrada.sesion = params.sesion;
    entrada.hour = params.hour;
    entrada.row = params.row;
    entrada.column = params.column;

    entrada.save((err, entradaStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la entrada" });
        } else { //comprobamos que llega correctamente el entradaa
            if (!entradaStored) {
                res.status(404).send({ message: "La entrada no ha sido guardada" });
            } else {
                res.status(200).send({ entrada: entradaStored });
            }
        }
    });
}

function getEntrada(req, res) {
    var entradaId = req.params.id;

    Entrada.findById(entradaId, (err, entrada) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!entrada) {
                res.status(404).send({ message: "La entrada no existe" });
            } else {
                res.status(200).send({ entrada });
            }
        }
    });
}

function getEntradas(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    Entrada.find().populate({ path: 'sesion' }).paginate(page, itemsPerPage, function(err, entradas, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!entradas) {
                res.status(404).send({ message: "No hay entradas" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    entradas: entradas
                });
            }
        }

    });
}


function getEntradasSesion(req, res) {

    var sesion = req.params.id;
    var hour = req.params.hour;

    Entrada.find({ sesion, hour }, function(err, entradas) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            return res.status(200).send(entradas);
        }

    });
}

function deleteEntrada(req, res) {

    var entradaId = req.params.id;

    Entrada.findByIdAndRemove(entradaId, (err, entradaRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!entradaRemoved) {
                res.status(404).send({ message: "La Entrada no ha sido eliminada" });
            } else {
                res.status(200).send({ entrada: entradaRemoved });
            }
        }
    });
}
module.exports = {
    saveEntrada,
    getEntrada,
    getEntradas,
    deleteEntrada,
    getEntradasSesion
}