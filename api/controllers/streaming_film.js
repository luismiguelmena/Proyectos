'use strict'

var StreamingFilm = require('../models/streaming_film');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una pelicula
function getStreamingFilm(req, res) {
    var streamingFilmId = req.params.id;

    StreamingFilm.findById(streamingFilmId, (err, streamingFilm) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streamingFilm) {
                res.status(404).send({ message: "La pelicula no existe" });
            } else {
                res.status(200).send({ streamingFilm });
            }
        }
    });
}
//añadir pelicula
function saveStreamingFilm(req, res) {

    var streamingFilm = new StreamingFilm();
    var params = req.body; //paramentros que nos llegan por el body

    streamingFilm.name = params.name;
    streamingFilm.description = params.description;
    streamingFilm.price = params.price;
    streamingFilm.image = 'null';

    streamingFilm.save((err, streamingFilmStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la pelicula de la streaming" });
        } else { //comprobamos que llega correctamente la pelicula
            if (!streamingFilmStored) {
                res.status(404).send({ message: "La pelicula para la streaming no ha sido guardada" });
            } else {
                res.status(200).send({ streamingFilm: streamingFilmStored });
            }
        }
    });
}
//actualizar pelicula
function updateStreamingFilm(req, res) {

    var streamingFilmId = req.params.id;
    var update = req.body;

    StreamingFilm.findByIdAndUpdate(streamingFilmId, update, (err, streamingFilmUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streamingFilmUpdated) {
                res.status(404).send({ message: "La pelicula no ha sido actualizado" });
            } else {
                res.status(200).send({ streamingFilm: streamingFilmUpdated });
            }
        }
    });
}
//obtener peliculas para las streaminges
function getStreamingFilms(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    StreamingFilm.find().sort('name').paginate(page, itemsPerPage, function(err, streaming_films, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streaming_films) {
                res.status(404).send({ message: "No hay peliculas" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    streaming_films: streaming_films
                });
            }
        }
    });
}
//subir imagen de pelicula
function uploadImage(req, res) {

    var streamingFilmId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\/'); //obtener imagen
        var file_name = file_split[2];
        //console.log(file_name);
        var ext_split = file_name.split('\.'); //obtener la extension
        var file_ext = ext_split[1];
        //console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            StreamingFilm.findByIdAndUpdate(streamingFilmId, { image: file_name }, (err, streamingFilmUpdated) => {
                if (!streamingFilmUpdated) {
                    res.status(404).send({ message: "No se ha podido actualizar la pelicula" });
                } else {
                    res.status(200).send({ streamingFilm: streamingFilmUpdated });
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
    var path_file = './uploads/streaming_films/' + imageFile;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
}
//borrar una pelicula
function deleteStreamingFilm(req, res) {

    var streamingFilmId = req.params.id;

    StreamingFilm.findByIdAndRemove(streamingFilmId, (err, streamingFilmRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            console.log(streamingFilmRemoved)
            if (!streamingFilmRemoved) {
                res.status(404).send({ message: "La pelicula no ha sido eliminada" });
            } else {
                res.status(200).send({ streamingFilm: streamingFilmRemoved });
            }
        }
    });
}

module.exports = {
    getStreamingFilm,
    saveStreamingFilm,
    getStreamingFilms,
    uploadImage,
    updateStreamingFilm,
    getImageFile,
    deleteStreamingFilm
};