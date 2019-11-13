'use strict'

var express = require('express');
var FoodController = require('../controllers/food');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)
var md_upload = multipart({ uploadDir: './uploads/foods' });

//rutas
api.get('/food/:id', md_auth.ensureAuth, FoodController.getFood);
api.get('/foods/:page?', md_auth.ensureAuth, FoodController.getFoods);
api.get('/get-image-food/:image', FoodController.getImageFile);
api.put('/edit-food/:id', md_auth.ensureAuth, FoodController.updateFood);
api.post('/food', md_auth.ensureAuth, FoodController.saveFood);
api.post('/upload-image-food/:id', [md_upload, md_auth.ensureAuth], FoodController.uploadImage);
api.delete('/food/:id', md_auth.ensureAuth, FoodController.deleteFood);

module.exports = api;