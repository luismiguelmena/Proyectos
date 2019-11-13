'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SesionFilmSchema = Schema({
    name: String,
    description: String,
    image: String
});

module.exports = mongoose.model('SesionFilm', SesionFilmSchema);