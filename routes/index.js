var express = require('express');
var router = express.Router();
var repository = require('../services/redis');

/* GET home page. */
router.get('/', function (req, res, next) {
    var options = {
        title: 'Geo Location App'
    };
    res.render('index', options);
});

/* GET tagging page. */
router.get('/tagging', function (req, res, next) {
    var options = {
        title: 'Geo Location Tagging'
    };
    res.render('tagging', options);
});

/* GET discover page. */
router.get('/discovery', function (req, res, next) {
    repository.getAllLocations(function (err, result) {

        for (var i = 0; i < result.length; i++) {
            result[i] = JSON.parse(result[i]);
        }
        var options = {
            title: 'Geo Location Discovery',
            locations: result
        };
        res.render('discovery', options);
    });
});

module.exports = router;