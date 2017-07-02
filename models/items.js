/*
A Node Module Implementing a Node Application using Mongoose. 
items.js
by: Joy Lucas
1/21/2017
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Convert the currency type to the mongoose Schema.
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//***Create schema for the comments in a subdocument under items. 
var commentSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {   
    timestamps: true //***Automatically add dates to the documents.
});

//***Create a Schema, **Details about the items.
//***Describe the item schema.
var itemSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true                      
    },
    description: {
        type:String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false
    },
    comments:[commentSchema] //point to an array of comments object.
}, { 
    timestamps: true //automatically add timestamps in the document.     
    
});//***end of var itemSchema

//*** Create a model for the schema. 
//***Mongoose will create a collection with the plural version of Item. 
var Items = mongoose.model('Item', itemSchema);

//var Comments = mongoose.model('Comment', commentSchema);

//Export to the Node Applications. 
module.exports = Items;