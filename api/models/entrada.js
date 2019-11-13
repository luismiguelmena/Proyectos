'use strict'

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var EntradaSchema = Schema({

    user: String,
    sesion: { type: Schema.ObjectId, ref: 'Sesion' },
    hour: String,
    row: Number,
    column: Number
});

module.exports = mongoose.model('Entrada', EntradaSchema);