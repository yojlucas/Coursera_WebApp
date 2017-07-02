/*
Node Module that implements the Express router for the /item REST API. 
itemRouter.js
by: Joy Lucas
1/15/2017
*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Use the items Schema.
var Items = require('../models/items');

var Verify = require('./verify');

var itemRouter = express.Router();
itemRouter.use(bodyParser.json());

itemRouter.route('/')

.get(function (req, res, next) {
    Items.find(req.query) //req.query will return only item set to featured.
        .populate('comments.postedBy')
        .exec(function (err, item) { //this method returns a match for a string. Otherwise, it will return null.
        if (err) next(err); //error handler in the app.js
        res.json(item);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Items.create(req.body, function (err, item) {
        if (err) next(err);
        console.log('Item created!');
        var id = item._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the item with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Items.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

/////////////TO HANDLE SPECIFIC ITEM INFORMATION//////////////
itemRouter.route('/:itemId')

.get(function (req, res, next) {
    Items.findById(req.params.itemId)
        .populate('comments.postedBy')
        .exec(function (err, item) {
        if (err) next(err);
        res.json(item);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Items.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, {
        new: true
    }, function (err, item) {
        if (err) next(err);
        res.json(item);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Items.findByIdAndRemove(req.params.itemId, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

///////////////TO HANDLE ITEM COMMENTS//////////////////
itemRouter.route('/:itemId/comments')

.get(function (req, res, next) {
    Items.findById(req.params.itemId)
        .populate('comments.postedBy')
        .exec(function (err, item) {
        if (err) next(err);
        res.json(item.comments);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Items.findById(req.params.itemId, function (err, item) {
        if (err) next(err);
        req.body.postedBy = req.decoded._id; //carrying the id of the user. 
        item.comments.push(req.body);
        item.save(function (err, item) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(item);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Items.findById(req.params.itemId, function (err, item) {
        if (err) next(err);
        for (var i = (item.comments.length - 1); i >= 0; i--) {
            item.comments.id(item.comments[i]._id).remove();
        }
        item.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

///////////////TO HANDLE SPECIFIC ITEM ID COMMENTS//////////////////
itemRouter.route('/:itemId/comments/:commentId')

//Return a specific comment.
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Items.findById(req.params.itemId)
        .populate('comments.postedBy')
        .exec(function (err, item) {
        if (err) next(err);
        res.json(item.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Items.findById(req.params.itemId, function (err, item) {
        if (err) next(err);
        item.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        item.comments.push(req.body);
        item.save(function (err, item) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(item);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Items.findById(req.params.itemId, function (err, item) {
        if (item.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        item.comments.id(req.params.commentId).remove();
        item.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});

module.exports = itemRouter;


