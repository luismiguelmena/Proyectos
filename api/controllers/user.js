'use strict'

var bcrypt = require('bcrypt-nodejs'); //para encriptar la contraseña
var User = require('../models/user'); //cargar modelo usuario
var Cart = require('../models/cart');
var jwt = require('../services/jwt'); //cargar jwt
var jwtdecode = require('jwt-simple');
var mensaje = require('../services/configMensaje');
var secret = 'clave_secreta_curso';
var enviarMensajeFunction = require('../services/configMensaje');

var pass = bcrypt.genSaltSync(10);

function pruebas(req, res) { // va a recibir algo y va a devolver algo
    res.status(200).send({
        message: "Probando una accion del controlador de usuarios del  API Rest con Node y Mongo"
    });
}

//registro usuario
function saveUser(req, res) { //metodo para registrar usuarios

    var user = new User();
    var params = req.body; //recoger todas las variables que llegan por post

    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; //si quiero hacerlo admin ROLE_ADMIN

    if (params.password) {
        //encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //Guardar el usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: "Error al guardar el usuario" });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: "No se a registrado el usuario" });
                        } else {
                            res.status(200).send({ user: userStored });

                        }
                    }
                });
            } else {
                res.status(200).send({ message: "Rellena todos los campos" });
            }
        });

    } else {
        res.status(500).send({ message: "Introduce la contraseña" });
    }
}

//identificacion usuario
function loginUser(req, res) { //los datos que nos lleguen por post coinciden en la base de datos

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: params.email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });

        } else {
            if (!user) {
                //console.log("Email: " + params.email);
                res.status(404).send({ message: "El usuario no existe" });
            } else {
                //comprobar la contraseña
                //console.log(user.password);

                bcrypt.hash(password, pass, null, function(err, hash) {
                    var contra = hash;
                    //console.log(contra);

                })

                bcrypt.compare(params.password, user.password, function(err, check) {
                    //console.log("comparacion contraseña " + check);
                    if (check) {
                        //devolver los datos del usuario logueado
                        if (params.gethash) {
                            //devolver un token de JWT
                            var token = jwt.createToken(user);
                            console.log("Tokeeen " + token);
                            res.status(200).send({ token: jwt.createToken(user) });

                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: "No se ha podido identificar la contraseña" });
                    }
                })
            }
        }
    })
}

//actualizar usuario
function updateUser(req, res) {

    var userId = req.params.id;
    var update = req.body; //recogemos los datos del post

    if (userId != req.user.sub) { //comprobar que no se actualiza otro usuario
        return res.status(500).send({ message: "No tienes permiso para actualizar este usuario" });
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar el usuario" });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: "No se ha podido actualizar el usuario" });
            } else {
                res.status(200).send({ user: userUpdated });
            }
        }
    });
}

function recibirMensaje(req, res) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: "La peticion no tiene la cabecera de autenticacion" });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    var params = req.body;

    try {
        var payload = jwtdecode.decode(token, secret);
        var carrito = params.carrito
            //console.log("HOLAAAAAA", params)
        enviarMensajeFunction.enviarMensaje(payload, carrito)
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({ message: "No he recibido token" });
    }

    res.status(200).send({ message: "Todo correcto" });

}

function saveCart(req, res) {

    var cart = new Cart();
    //console.log(req)

    var params = req.body; //paramentros que nos llegan por el body
    console.log(params.carrito)
    cart.user = params.user;
    cart.food = params.food;
    cart.sesion = params.sesion;
    cart.streaming = params.streaming

    cart.save((err, cartStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar el carrito" });
        } else { //comprobamos que llega correctamente el pago
            if (!cartStored) {
                res.status(404).send({ message: "El carrito no ha sido guardado" });
            } else {
                res.status(200).send({ cart: cartStored });
            }
        }
    });
}

function getCart(req, res) {
    var userId = req.params.id;

    Cart.findById(userId, (err, cart) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!cart) {
                res.status(404).send({ message: "El carrito no existe" });
            } else {
                res.status(200).send({ cart });
            }
        }
    });
}

function deleteCart(req, res) {

    var userId = req.params.id;

    Cart.findByIdAndRemove(userId, (err, cartRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!cartRemoved) {
                res.status(404).send({ message: "El carrito no ha sido eliminado" });
            } else {
                res.status(200).send({ cart: cartRemoved });
            }
        }
    });
}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    recibirMensaje,
    saveCart,
    deleteCart,
    getCart
};