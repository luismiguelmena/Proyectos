'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = Schema({
    number: Number,
    rows: Number,
    columns: Number
});

module.exports = mongoose.model('Room', RoomSchema);