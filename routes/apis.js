/**
 * Created by Martin on 17.07.2016.
 */

var express = require('express');
var router = express.Router();
var datastore = require('../services/redis');

//POST
router.post('/locations', function (req, res) {
        var tagObject = datastore.createLocationObject(req.body.name, req.body.hashtag, req.body.lat, req.body.long);

        datastore.saveLocation(tagObject, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
});


//GET with filter
router.get('/locations', function (req, res) {

    datastore.filterLocations(req.query.keyword, function (err, result) {
        if (result != null) {
            var dataset = [];
            for (var i = 0; i < result.length; i++) {
                dataset.push(JSON.parse(result[i]));
            }
            res.send(dataset);
        } else {
            res.send(result);
        }
    });
});


//GET with param
router.get('/locations/:name', function (req, res) {
    datastore.getLocation(req.params.name, function (err, result) {
        res.send(JSON.parse(result));
    });
});


//UPDATE
router.put('/locations/:name', function (req, res) {
    var locObject = datastore.createLocationObject(req.body.name, req.body.hashtag, req.body.lat, req.body.long);
    datastore.updateLocation(req.params.name, locObject, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


//DELETE
router.delete('/locations/:name', function (req, res) {
    datastore.deleteLocation(req.params.name, function (err, result) {
        res.sendStatus(200);
    });
});

module.exports = router;