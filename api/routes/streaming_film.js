'use strict'

var express = require('express');
var StreamingFilmController = require('../controllers/streaming_film');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)
var md_upload = multipart({ uploadDir: './uploads/streaming_films' });

//rutas
api.get('/streaming-film/:id', md_auth.ensureAuth, StreamingFilmController.getStreamingFilm);
api.get('/streaming-films/:page?', md_auth.ensureAuth, StreamingFilmController.getStreamingFilms);
api.get('/get-image-streaming-film/:image', StreamingFilmController.getImageFile);
api.put('/edit-streaming-film/:id', md_auth.ensureAuth, StreamingFilmController.updateStreamingFilm);
api.post('/streaming-film', md_auth.ensureAuth, StreamingFilmController.saveStreamingFilm);
api.post('/upload-image-streaming-film/:id', [md_upload, md_auth.ensureAuth], StreamingFilmController.uploadImage);
api.delete('/streaming-film/:id', md_auth.ensureAuth, StreamingFilmController.deleteStreamingFilm);
module.exports = api;