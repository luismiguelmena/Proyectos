'use strict'

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var SesionSchema = Schema({

    room: { type: Schema.ObjectId, ref: 'Room' },
    date: [String],
    sesionFilm: { type: Schema.ObjectId, ref: 'SesionFilm' },
    price: { type: SchemaTypes.Double }
});

module.exports = mongoose.model('Sesion', SesionSchema);