//Para crear el servidor

'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const configMensaje = require('./services/configMensaje');

//cargar rutas
var user_routes = require('./routes/user'); //rutas usuarios
var food_routes = require('./routes/food'); //rutas comida
var room_routes = require('./routes/room'); //rutas salas
var sesion_film_routes = require('./routes/sesion_film');
var streaming_film_routes = require('./routes/streaming_film');
var sesion = require('./routes/sesion');
var streaming = require('./routes/streaming');
var subscription = require('./routes/subcription');
var entrada = require('./routes/entrada');
var pago = require('./routes/pago');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/*app.listen(3977, function() {
        console.log('CORS-enabled web server listening on port 80')
    })*/
//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Oringin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Metod');
    res.header('Access-Control-Allow-Method', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');

    next(); //para que salga
}); //añadir el middleware para el control de acceso en cabeceras
//rutas base
app.use('/api', user_routes);
app.use('/api', food_routes);
app.use('/api', room_routes);
app.use('/api', sesion_film_routes);
app.use('/api', streaming_film_routes);
app.use('/api', sesion);
app.use('/api', streaming);
app.use('/api', subscription);
app.use('/api', entrada);
app.use('/api', pago);

module.exports = app;