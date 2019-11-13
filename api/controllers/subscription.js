'use strict'

var Subscription = require('../models/subscription');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una subscripcion
function getSubscription(req, res) {

    //console.log("USER", userId)
    console.log(filmId);

    Subscription.findById({ filmId }, (err, subscription) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!subscription) {
                //console.log("sub", subscription)
                res.status(404).send({ message: "La subscripcion no existe" });
            } else {
                res.status(200).send({ subscription });
                //console.log(subscription);
            }
        }
    });
}

//añadir suscripcion
function saveSubscription(req, res) {

    var subscription = new Subscription();
    var params = req.body; //paramentros que nos llegan por el body

    subscription.user = params.user
    subscription.film = params.film
    subscription.date = params.date

    subscription.save((err, subscriptionStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la suscripción" });
        } else { //comprobamos que llega correctamente el subscription
            if (!subscriptionStored) {
                res.status(404).send({ message: "La suscripcion no ha sido guardada" });
            } else {
                res.status(200).send({ subscription: subscriptionStored });
            }
        }
    });
}

function updateSubscription(req, res) {

    var subscriptionId = req.params.id;
    var update = req.body;

    Subscription.findByIdAndUpdate(subscriptionId, update, (err, subscriptionUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!subscriptionUpdated) {
                res.status(404).send({ message: "La subscription no ha sido actualizada" });
            } else {
                res.status(200).send({ session: subscriptionUpdated });
            }
        }
    });
}

function deleteSubscription(req, res) {

    var subscriptionId = req.params.id;

    Subscription.findByIdAndRemove(subscriptionId, (err, subscriptionRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!subscriptionRemoved) {
                res.status(404).send({ message: "La subscription no ha sido eliminada" });
            } else {
                res.status(200).send({ subscription: subscriptionRemoved });
            }
        }
    });
}

function getSubscriptions(req, res) {

    var user = req.params.user;

    Subscription.find({ user }, function(err, subscriptions) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            return res.status(200).send({ subscriptions: subscriptions });
        }

    });
}
module.exports = {
    saveSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscription,
    getSubscriptions
}