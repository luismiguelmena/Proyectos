'use strict'

var Food = require('../models/food');
var path = require('path');
var fs = require('fs'); //trabajar con el sistema de ficheros
var moongoosePaginated = require('mongoose-pagination');

//obtener datos de una comida
function getFood(req, res) {
    var foodId = req.params.id;

    Food.findById(foodId, (err, food) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!food) {
                res.status(404).send({ message: "La comida no existe" });
            } else {
                res.status(200).send({ food });
            }
        }
    });
}
//añadir comida
function saveFood(req, res) {

    var food = new Food();
    var params = req.body; //paramentros que nos llegan por el body

    food.name = params.name;
    food.description = params.description;
    food.price = params.price;
    food.image = 'null';

    food.save((err, foodStored) => {
        if (err) {
            res.status(500).send({ message: "Error al guardar la comida" });
        } else { //comprobamos que llega correctamente el fooda
            if (!foodStored) {
                res.status(404).send({ message: "La comida no ha sido guardada" });
            } else {
                res.status(200).send({ food: foodStored });
            }
        }
    });
}
//actualizar comida
function updateFood(req, res) {

    var foodId = req.params.id;
    var update = req.body;

    Food.findByIdAndUpdate(foodId, update, (err, foodUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!foodUpdated) {
                res.status(404).send({ message: "La comida no ha sido actualizado" });
            } else {
                res.status(200).send({ food: foodUpdated });
            }
        }
    });
}
//obtener listado de todas las comidas que hay
function getFoods(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 4;

    Food.find().sort('name').paginate(page, itemsPerPage, function(err, foods, total) {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!foods) {
                res.status(404).send({ message: "No hay comidas" });
            } else {
                return res.status(200).send({
                    total_items: total,
                    foods: foods
                });
            }
        }

    });
}
//subir imagen de comida
function uploadImage(req, res) {

    var foodId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            Food.findByIdAndUpdate(foodId, { image: file_name }, (err, foodUpdated) => {
                if (!foodUpdated) {
                    res.status(404).send({ message: "No se ha podido actualizar la comida" });
                } else {
                    res.status(200).send({ food: foodUpdated });
                }
            });
        } else {
            res.status(200).send({ message: "Extension de archivo no valida" });
        }
    } else {
        res.status(200).send({ message: "No has subido ninguna imagen" });
    }
}
//obtener imagen de comida
function getImageFile(req, res) {
    var imageFile = req.params.image;
    var path_file = './uploads/foods/' + imageFile;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
}
//borar una comida
function deleteFood(req, res) {

    var foodId = req.params.id;

    Food.findByIdAndRemove(foodId, (err, foodRemoved) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        } else {
            if (!foodRemoved) {
                res.status(404).send({ message: "La comida no ha sido eliminada" });
            } else {
                res.status(200).send({ food: foodRemoved });
            }
        }
    });
}
module.exports = {
    getFood,
    getFoods,
    saveFood,
    uploadImage,
    getImageFile,
    updateFood,
    deleteFood
};