'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var PagoSchema = Schema({
    card: String,
    user: String,
    date: Date,
    cantidad: Number,
    carrito: JSON,
});

module.exports = mongoose.model('Pago', PagoSchema);