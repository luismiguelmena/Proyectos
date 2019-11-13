'use strict'

var Pago = require('../models/pago');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

function savePago(req, res) {

    var pago = new Pago();
    //console.log(req)

    var params = req.body; //paramentros que nos llegan por el body

    pago.card = params.card;
    pago.user = params.user;
    pago.date = params.date;
    pago.cantidad = params.cantidad;
    pago.carrito = params.carrito;

    pago.save((err, pagoStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar el pago" });
        } else { //comprobamos que llega correctamente el pago
            if (!pagoStored) {
                res.status(404).send({ message: "El pago no ha sido guardado" });
            } else {
                res.status(200).send({ pago: pagoStored });
            }
        }
    });
}

module.exports = {
    savePago
}