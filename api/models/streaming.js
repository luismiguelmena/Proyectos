'use strict'

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;


var StreamSchema = Schema({

    price: { type: SchemaTypes.Double },
    streamingFilm: { type: Schema.Types.ObjectId, ref: 'StreamingFilm' },
    file: String

});

module.exports = mongoose.model('Streaming', StreamSchema);