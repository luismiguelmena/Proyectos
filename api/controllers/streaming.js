'use strict'

var Streaming = require('../models/streaming');
var StreamingFilm = require('../models/streaming_film');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una streaming
function getStreaming(req, res) {
    var streamingId = req.params.id;

    Streaming.findById(streamingId).populate({ path: 'streamingFilm' }).exec((err, streaming) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streaming) {
                res.status(404).send({ message: "El streaming no existe" });
            } else {
                res.status(200).send({ streaming: streaming });
                //console.log(streaming);
            }
        }
    });
}

function saveStreaming(req, res) {

    var streaming = new Streaming();
    var streamingFilm = new StreamingFilm();
    var params = req.body; //paramentros que nos llegan por el body

    streaming.price = params.price;
    streaming.streamingFilm = params.streamingFilm;

    streaming.save((err, streamingStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la streaming" });
        } else { //comprobamos que llega correctamente el streaminga
            if (!streamingStored) {
                res.status(404).send({ message: "La pelicula de streaming no ha sido guardada" });
            } else {
                res.status(200).send({ streaming: streamingStored });
                console.log(streamingStored);
            }
        }
    });
}
//actualizar streaming
function updateStreaming(req, res) {

    var streamingId = req.params.id;
    var update = req.body;

    Streaming.findByIdAndUpdate(streamingId, update, (err, streamingUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streamingUpdated) {
                res.status(404).send({ message: "La streaming no ha sido actualizado" });
            } else {
                res.status(200).send({ streaming: streamingUpdated });
            }
        }
    });
}
//obtener listado de todas las streamings que hay
function getStreamings(req, res) {

    /* var streamingFilmId = req.params.streamingFilm;

     if (!streamingFilmId) {
         var find = Streaming.find({});
     } else {
         var find = Streaming.find({ streamingFilm: streamingFilmId });
     }

     find.populate({ path: 'streamingFilm' }).exec((err, streamings) => {
         if (err) {
             res.status(500).send({ message: "Error en la peticion" });
         } else {
             if (!streamings) {
                 res.status(404).send({ message: "No hay streamings" });
             } else {
                 return res.status(200).send({
                     //total_items: total,
                     streamings: streamings
                 });
             }
         }
     });*/
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    Streaming.find().populate({ path: 'streamingFilm' }).paginate(page, itemsPerPage, function(err, streamings, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streamings) {
                res.status(404).send({ message: "No hay streamings" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    streamings: streamings
                });
            }
        }

    });
}

function deleteStreaming(req, res) {

    var streamingId = req.params.id;

    Streaming.findByIdAndRemove(streamingId, (err, streamingRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!streamingRemoved) {
                res.status(404).send({ message: "La sala no ha sido eliminada" });
            } else {
                res.status(200).send({ streaming: streamingRemoved });
            }
        }
    });
}

function uploadFile(req, res) {

    var streamingId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        console.log(req.files);
        var file_path = req.files.file.path;
        var file_split = file_path.split('\/'); //obtener imagen
        var file_name = file_split[2];

        var ext_split = file_name.split('\.'); //obtener la extension
        var file_ext = ext_split[1];
        //console.log(file_ext);

        if (file_ext == 'mp3' || file_ext == 'mp4') {
            Streaming.findByIdAndUpdate(streamingId, { file: file_name }, (err, streamingUpdated) => {
                if (!streamingUpdated) {
                    res.status(404).send({ message: "No se ha podido actualizar la pelicula" });
                } else {
                    res.status(200).send({ streaming: streamingUpdated });
                }
            });
        } else {
            res.status(200).send({ message: "Extension de archivo no valida" });
        }
    } else {
        res.status(200).send({ message: "No has subido ninguna archivo" });
    }
}
//obtener archivo video de la pelicula
function getFile(req, res) {
    var file = req.params.file;
    var path_file = './uploads/films/' + file;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe el fichero" });
        }
    });
}
module.exports = {
    getStreaming,
    saveStreaming,
    updateStreaming,
    getStreamings,
    deleteStreaming,
    uploadFile,
    getFile
}