var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userStatus = ['client', 'staff', 'admin', 'curier'];

var schema = new Schema({
    username: { type: String, required: true, default: 'User' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: userStatus, default: 'client' },
    telephone: { type: String, default: null },
    address: {
        country: String,
        region: String,
        city: String,
        zip: String,
        street: String,
        building: String,
        appartament: String
    },
    wishlist: { type: [Schema.Types.ObjectId], ref: 'Products' }
});

schema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', schema);