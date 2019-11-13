'use strict'

var Sesion = require('../models/sesion');
var SesionFilm = require('../models/sesion_film');
var Room = require('../models/room');
var path = require('path');
//var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una comida
function getSesion(req, res) {

    var sesionId = req.params.id;

    Sesion.findById(sesionId).populate({ path: 'sesionFilm' }).populate({ path: 'room' }).exec((err, sesion) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesion) {
                res.status(404).send({ message: "La sesion no existe" });
            } else {
                res.status(200).send({ sesion });
            }
        }
    });
}

//añadir comida
function saveSesion(req, res) {

    var sesion = new Sesion();
    var params = req.body; //paramentros que nos llegan por el body

    sesion.room = params.room;
    sesion.date = params.date;
    sesion.sesionFilm = params.sesionFilm;
    sesion.price = params.price;

    sesion.save((err, sesionStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la sesion" });
        } else { //comprobamos que llega correctamente el sesiona
            if (!sesionStored) {
                res.status(404).send({ message: "La comida no ha sido guardada" });
            } else {
                res.status(200).send({ sesion: sesionStored });
            }
        }
    });
}

function updateSesion(req, res) {

    var sesionId = req.params.id;
    var update = req.body;

    Sesion.findByIdAndUpdate(sesionId, update, (err, sesionUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesionUpdated) {
                res.status(404).send({ message: "La sesion no ha sido actualizada" });
            } else {
                res.status(200).send({ session: sesionUpdated });
            }
        }
    });
}

function getSesions(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    Sesion.find().populate({ path: 'sesionFilm' }).populate({ path: 'room' }).paginate(page, itemsPerPage, function(err, sesions, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesions) {
                res.status(404).send({ message: "No hay sesiones" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    sesions: sesions
                });
            }
        }

    });
}

function deleteSesion(req, res) {

    var sesionId = req.params.id;

    Sesion.findByIdAndRemove(sesionId, (err, sesionRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesionRemoved) {
                res.status(404).send({ message: "La sesion no ha sido eliminada" });
            } else {
                res.status(200).send({ sesion: sesionRemoved });
            }
        }
    });
}
module.exports = {
    getSesion,
    getSesions,
    saveSesion,
    deleteSesion,
    updateSesion
};