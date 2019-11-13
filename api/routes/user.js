'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware

//rutas
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser); //put: para actualizar
api.post('/mensaje', md_auth.ensureAuth, UserController.recibirMensaje);
api.post('/carrito', md_auth.ensureAuth, UserController.saveCart);
api.delete('/carrito', md_auth.ensureAuth, UserController.deleteCart);
api.get('/carrito/:id', md_auth.ensureAuth, UserController.getCart);
module.exports = api;