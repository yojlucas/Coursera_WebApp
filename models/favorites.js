/*
favorites.js
3/23/2017
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    items: [ 
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Item' 
      }] 
}, {
    timestamps : true
    }); 

var Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;

//module.exports = mongoose.model('Favorites', favoriteSchema)