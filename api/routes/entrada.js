'use strict'

var express = require('express');
var EntradaController = require('../controllers/entrada');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)

//rutas
api.post('/entrada', md_auth.ensureAuth, EntradaController.saveEntrada);
api.get('/entrada/:id', md_auth.ensureAuth, EntradaController.getEntrada);
api.get('/entradas/:page?', md_auth.ensureAuth, EntradaController.getEntradas);
api.get('/entradas/:id/:hour', md_auth.ensureAuth, EntradaController.getEntradasSesion);
api.delete('/entrada/:id', md_auth.ensureAuth, EntradaController.deleteEntrada);

module.exports = api;