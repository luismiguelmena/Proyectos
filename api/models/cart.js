'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var CartSchema = Schema({
    user: String,
    food: JSON,
    sesion: JSON,
    streaming: JSON
});

module.exports = mongoose.model('Cart', CartSchema);