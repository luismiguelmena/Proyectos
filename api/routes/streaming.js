'use strict'

var express = require('express');
var StreamingController = require('../controllers/streaming');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware
var multipart = require('connect-multiparty'); //nos permite tener un middleware para trabajar con los ficheros(imagenes...)
var md_upload = multipart({ uploadDir: './uploads/films' });

//rutas
api.get('/streaming/:id', md_auth.ensureAuth, StreamingController.getStreaming);
api.post('/streaming/', md_auth.ensureAuth, StreamingController.saveStreaming);
api.get('/streamings/:page?', md_auth.ensureAuth, StreamingController.getStreamings);
api.put('/edit-streaming/:id', md_auth.ensureAuth, StreamingController.updateStreaming);
api.delete('/streaming/:id', md_auth.ensureAuth, StreamingController.deleteStreaming);
api.post('/upload-file-film/:id', [md_upload, md_auth.ensureAuth], StreamingController.uploadFile);
api.get('/get-file-streaming/:file', StreamingController.getFile);
module.exports = api;