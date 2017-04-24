var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title: { type: String, required: [true, 'Feedback should have a title'] },
    body: { type: String, required: [true, 'Feedback should have a description'] },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    isSolved: { type: Boolean, default: false },
    updateAt: { type: Date, default: Date.now() },
    communication: [{
        createAt: { type: Date, default: Date.now() },
        message: { type: String, required: [true, 'Feedback should have a message'] },
        isUser: Boolean // User or Staff
    }],
    isRegisteredUser: Boolean // order.userStatus !== 'guest'
});

// schema.methods.deleteOld = function() {

// };

module.exports = mongoose.model('Feedback', schema);