'use strict'
//conexion a la base de datos
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/aplicacion-cine', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La conexion a la base de datos esta corriendo perfectamente");

        app.listen(port, function() {
            console.log("servidor de api rest de musica escuchando peticiones en http://localhost: " + port);
        });

    }
});