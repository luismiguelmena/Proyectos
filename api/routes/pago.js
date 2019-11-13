'use strict'

var express = require('express');
var PagoController = require('../controllers/pago');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)

//rutas
api.post('/pago', md_auth.ensureAuth, PagoController.savePago)

module.exports = api;