'use strict'

var SesionFilm = require('../models/sesion_film');
var Sesion = require('../models/sesion');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una comida
function getSesionFilm(req, res) {
    var sesionFilmId = req.params.id;

    SesionFilm.findById(sesionFilmId, (err, sesionFilm) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesionFilm) {
                res.status(404).send({ message: "La comida no existe" });
            } else {
                res.status(200).send({ sesionFilm });
            }
        }
    });
}
//añadir comida
function saveSesionFilm(req, res) {

    var sesionFilm = new SesionFilm();
    var params = req.body; //paramentros que nos llegan por el body

    sesionFilm.name = params.name;
    sesionFilm.description = params.description;
    sesionFilm.price = params.price;
    sesionFilm.image = 'null';

    sesionFilm.save((err, sesionFilmStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la pelicula de la sesion" });
        } else { //comprobamos que llega correctamente la pelicula
            if (!sesionFilmStored) {
                res.status(404).send({ message: "La pelicula para la sesion no ha sido guardada" });
            } else {
                res.status(200).send({ sesionFilm: sesionFilmStored });
            }
        }
    });
}
//actualizar pelicula
function updateSesionFilm(req, res) {

    var sesionFilmId = req.params.id;
    var update = req.body;

    SesionFilm.findByIdAndUpdate(sesionFilmId, update, (err, sesionFilmUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesionFilmUpdated) {
                res.status(404).send({ message: "La comida no ha sido actualizado" });
            } else {
                res.status(200).send({ sesionFilm: sesionFilmUpdated });
            }
        }
    });
}
//obtener peliculas para las sesiones
function getSesionFilms(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    SesionFilm.find().sort('name').paginate(page, itemsPerPage, function(err, sesion_films, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesion_films) {
                res.status(404).send({ message: "No hay peliculas de sesiones" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    sesion_films: sesion_films
                });
            }
        }

    });
}
//subir imagen de pelicula
function uploadImage(req, res) {

    var sesionFilmId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\/'); //obtener imagen
        var file_name = file_split[2];
        var ext_split = file_name.split('\.'); //obtener la extension
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            SesionFilm.findByIdAndUpdate(sesionFilmId, { image: file_name }, (err, sesionFilmUpdated) => {
                if (!sesionFilmUpdated) {
                    res.status(404).send({ message: "No se ha podido actualizar la pelicula" });
                } else {
                    res.status(200).send({ sesionFilm: sesionFilmUpdated });
                }
            });
        } else {
            res.status(200).send({ message: "Extension de archivo no valida" });
        }
    } else {
        res.status(200).send({ message: "No has subido ninguna imagen" });
    }
}
//obtener imagen de la pelicula
function getImageFile(req, res) {
    var imageFile = req.params.image;
    var path_file = './uploads/sesion_films/' + imageFile;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
}
//eliminar una pelicula de sesiones
function deleteSesionFilm(req, res) {

    var sesionFilmId = req.params.id;

    SesionFilm.findByIdAndRemove(sesionFilmId, (err, sesionFilmRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!sesionFilmRemoved) {
                res.status(404).send({ message: "La pelicula de la sesion no ha sido eliminada" });

            } else {
                Sesion.find({ sesionFilm: sesionFilmRemoved._id }).remove((err, sesionRemoved) => {
                    if (err) {
                        res.status(500).send({ message: "Error al eliminar la sesion" });
                    } else {
                        if (!sesionRemoved) {
                            res.status(404).send({ message: "El album no ha sido eliminado" });
                        } else {
                            res.status(404).send({ sesionFilmRemoved });
                        }
                    }
                });
            }
        }
    });
}
module.exports = {
    getSesionFilm,
    saveSesionFilm,
    getSesionFilms,
    uploadImage,
    updateSesionFilm,
    getImageFile,
    deleteSesionFilm
};