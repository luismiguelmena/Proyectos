'use strict'

var Room = require('../models/room');
var path = require('path');
var moongoosePaginated = require('mongoose-pagination');

function getRoom(req, res) {
    var roomId = req.params.id;

    Room.findById(roomId, (err, room) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!room) {
                res.status(404).send({ message: "La comida no existe" });
            } else {
                res.status(200).send({ room });
            }
        }
    });
}

function saveRoom(req, res) {
    var room = new Room();
    var params = req.body;

    room.number = params.number;
    room.rows = params.rows;
    room.columns = params.columns;

    room.save((err, roomStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la sala" });
        } else {
            if (!roomStored) {
                res.status(404).send({ message: "La sala no ha sido guardada" });
            } else {
                res.status(200).send({ room: roomStored });
            }
        }
    });
}
//actualizar sala
function updateRoom(req, res) {

    var roomId = req.params.id;
    var update = req.body;

    Room.findByIdAndUpdate(roomId, update, (err, roomUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!roomUpdated) {
                res.status(404).send({ message: "La sala no ha sido actualizada" });
            } else {
                res.status(200).send({ room: roomUpdated });
            }
        }
    });
}

function getRooms(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 4;

    Room.find().sort('number').paginate(page, itemsPerPage, function(err, rooms, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!rooms) {
                res.status(404).send({ message: "No hay salas" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    rooms: rooms
                });
            }
        }
    });
}

function deleteRoom(req, res) {

    var roomId = req.params.id;

    Room.findByIdAndRemove(roomId, (err, roomRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!roomRemoved) {
                res.status(404).send({ message: "La sala no ha sido eliminada" });
            } else {
                res.status(200).send({ room: roomRemoved });
            }
        }
    });
}
module.exports = {
    getRoom,
    saveRoom,
    updateRoom,
    getRooms,
    deleteRoom
};