'use strict'

var express = require('express');
var SubscriptionController = require('../controllers/subscription');

var api = express.Router(); //creamos la ruta
var md_auth = require('../middlewares/authenticated'); //cargamos el middleware

//rutas
api.get('/subscription/:id', md_auth.ensureAuth, SubscriptionController.getSubscription);
api.get('/subscriptions/:user', md_auth.ensureAuth, SubscriptionController.getSubscriptions);
//api.get('/subscriptions/:page?', md_auth.ensureAuth, SubscriptionController.getSubscriptions);
//api.put('/subscription/:id', md_auth.ensureAuth, SubscriptionController.updateSubscription);
api.post('/subscription/', md_auth.ensureAuth, SubscriptionController.saveSubscription);
//api.delete('/subscription/:id', md_auth.ensureAuth, SubscriptionController.deleteSubscription);

module.exports = api;