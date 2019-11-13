'use strict'

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var FoodSchema = Schema({
    name: String,
    description: String,
    price: { type: SchemaTypes.Double },
    image: String
});

module.exports = mongoose.model('Food', FoodSchema);