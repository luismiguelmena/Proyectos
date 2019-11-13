'use strict'

var express = require('express');
var SesionController = require('../controllers/sesion');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
//var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)
//var md_upload = multipart({ uploadDir: './uploads/foods' });

//rutas
api.get('/sesion/:id', md_auth.ensureAuth, SesionController.getSesion);
api.get('/sesions/:page?', md_auth.ensureAuth, SesionController.getSesions);
api.put('/sesion/:id', md_auth.ensureAuth, SesionController.updateSesion);
api.post('/sesion', md_auth.ensureAuth, SesionController.saveSesion);
api.delete('/sesion/:id', md_auth.ensureAuth, SesionController.deleteSesion);

module.exports = api;