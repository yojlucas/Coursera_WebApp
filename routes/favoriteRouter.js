/*
favoriteRouter.js
by: Joy Lucas
2/6/2017
*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

//"/items"
favoriteRouter.route('/')
//first verification is done, and then if verified proceed forward
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    req.body.postedBy = req.decoded._id;
    
    Favorites.findOne({'postedBy': req.body.postedBy})
        .populate('items')
        .populate('postedBy')
        .exec(function (err, favItem) {
                if (err) next(err);
                res.json(favItem);
    });
})
//================================================================
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
// var id = mongoose.Schema.Types.ObjectId(req.body._id);
    req.body.postedBy = req.decoded._id;
    
    Favorites.findOne({'postedBy': req.body.postedBy}, function (err, favItem) {
   
        if (err) {next(err);}
        
        else if(!err && favItem !== null){
            if(favItem.items.indexOf(req.body._id) === -1){
                favItem.item.push(req.body._id);
                favItem.save(function (err, favItem) {
                    if (err) next(err);
                    res.json(favItem);
                });
            }else{
                res.json('Item already exists in your favorites list!!!');
            }
        }
        
        else {
            var newUser = new Favorites({items: [req.body._id], postedBy: req.body.postedBy});
        
            newUser.save(function(err, newUser){
                if(err) next(err);
                console.log("Created new user's favorite list!");
                res.json(newUser);
            });
        }
        
        
    });
})
//===================================================================
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    req.body.postedBy = req.decoded._id;
    
    Favorites.findOneAndUpdate({'postedBy': req.body.postedBy}, {$set: {items: []}}, function(err, resp) {
        if (err) next(err);
        console.log('Deleted the favorite list!');
        res.json(resp);
    });
});
//===================================================================
favoriteRouter.route('/:itemId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    req.body.postedBy = req.decoded._id;
    
    Favorites.findOneAndUpdate({'postedBy': req.body.postedBy}, {$pull: {items: req.params.itemId}}, function(err, resp){
        if (err) next(err);
        console.log('Deleted the favorite item!');
        res.json(resp);
    });
});

module.exports = favoriteRouter;
