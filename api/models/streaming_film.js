'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StreamingFilmSchema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('StreamingFilm', StreamingFilmSchema);