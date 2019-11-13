'use strict'

var express = require('express');

var roomController = require('../controllers/room');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/room/:id', md_auth.ensureAuth, roomController.getRoom);
api.get('/rooms/:page?', md_auth.ensureAuth, roomController.getRooms);
api.put('/edit-room/:id', md_auth.ensureAuth, roomController.updateRoom);
api.post('/room', md_auth.ensureAuth, roomController.saveRoom);
api.delete('/room/:id', md_auth.ensureAuth, roomController.deleteRoom);

module.exports = api;