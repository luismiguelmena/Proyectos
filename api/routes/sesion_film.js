'use strict'

var express = require('express');
var SesionFilmController = require('../controllers/sesion_film');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)
var md_upload = multipart({ uploadDir: './uploads/sesion_films' });

//rutas
api.get('/sesion-film/:id', md_auth.ensureAuth, SesionFilmController.getSesionFilm);
api.get('/sesion-films/:page?', md_auth.ensureAuth, SesionFilmController.getSesionFilms);
api.get('/get-image-sesion-film/:image', SesionFilmController.getImageFile);
api.put('/edit-sesion-film/:id', md_auth.ensureAuth, SesionFilmController.updateSesionFilm);
api.post('/sesion-film', md_auth.ensureAuth, SesionFilmController.saveSesionFilm);
api.post('/upload-image-sesion-film/:id', [md_upload, md_auth.ensureAuth], SesionFilmController.uploadImage);
api.delete('/sesion-film/:id', md_auth.ensureAuth, SesionFilmController.deleteSesionFilm);

module.exports = api;