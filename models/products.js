var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var platforms = ['pc', 'psp', 'xbox'];
var category = ['games', 'toys']; // type of products
var genre = ['action', 'rpg', 'mmo', 'strategy', 'sport', 'race', 'adventure', 'simulator', 'indie', 'casual', 'space'];

// var addon = new Schema({
//     isSeparate: Boolean,
//     qrCode: String,
//     imagePath: { type: String, required: [true, 'Product should have a image!'] }, // image for product card
//     imageHDPath: { type: String, required: [true, 'Product should have a imageHD!'] }, // image for main page and promo
//     title: { type: String, required: [true, 'Product should have a title!'] },
//     tags: [String],
//     description: { type: String, required: true }, // about product
//     price: { type: Number, required: [true, 'Product should have a price!'] },
//     screenshots: [String],
//     discount: { type: Number, default: null }, // discount = promoArray[n] == productId && (start <= Date.now <= end)? num: null
//     wishers: [{ type: Schema.Types.ObjectId, ref: 'Users' }], // this need for static - how much the product is populare
//     reviews: [review], // 
// });

var product = new Schema({
    qrCode: String,
    imagePath: { type: String, required: [true, 'Product should have a image!'] }, // image for product card
    imageHDPath: { type: String, required: [true, 'Product should have a imageHD!'] }, // image for main page and promo
    title: { type: String, required: [true, 'Product should have a title!'] },
    // category: { type: String, enum: category, required: [true, 'Product should have a category!'] },
    tags: { type: [String], default: [] },
    description: { type: String, required: [true, 'Product should have a description!'] }, // about product
    developers: { type: [String], default: [] },
    stock: { type: Number, min: 0, default: 0 },
    price: { type: Number, min: 0, required: [true, 'Product should have a price!'] },
    // addons: { type: [addon], default: [] },
    platforms: { // pc, psp4, xbox, etc.
        type: [String],
        enum: platforms,
        default: []
    },
    genre: { // mmo, rpg, action, etc.
        type: [String],
        enum: genre,
        default: []
    },
    screenshots: { type: [String], default: [] },
    system: {
        min: {
            cpu: String,
            video: String,
            vram: String,
            ram: String,
            hdd: String,
            dx: String,
            os: String
        },
        rec: {
            cpu: String,
            video: String,
            vram: String,
            ram: String,
            hdd: String,
            dx: String,
            os: String
        }
    },
    sold: { type: Number, min: 0, default: 0 },
    purchases: { type: Number, min: 0, default: 0 },
    // discount: { type: Number, min: 0, max: 99, default: null }, // discount = promoArray[n] == productId && (start <= Date.now <= end)? num: null
    wishers: { type: Number, min: 0, default: 0 }, // this need for static - how much the product is populare
    // reviews: { type: [review], default: [] }, // rating of product
});

module.exports = mongoose.model('Products', product);