var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    product: { type: Object, required: true }
});

module.exports = mongoose.model('Wish', schema);