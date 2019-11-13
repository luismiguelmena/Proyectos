'use strict'

//creacion de token para cada usuario
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

//cogera todos los datos del usuario y los guardara en un token
exports.createToken = function(user) {

    var payload = {
        sub: user._id, //id del objeto de usuario
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        iat: moment().unix(), //fecha del token
        exp: moment().add(30, 'days').unix() //fecha de expiracion
    };

    return jwt.encode(payload, secret);
};