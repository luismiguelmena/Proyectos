'use strict'

var mongoose = require('mongoose')
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;


var SubscriptionSchema = Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    film: { type: Schema.Types.ObjectId, ref: 'StreamingFilm' },
    date: Date

});

module.exports = mongoose.model('Subscription', SubscriptionSchema);