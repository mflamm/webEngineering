/**
 * Created by Martin on 17.07.2016.
 */

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function () {
    console.log('connected');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

//important functions for access the Redis DB

module.exports = {

    getAllLocations: function (callback) {
        client.keys('*', function (err, keys) {
            if (err) {
                callback(err, null);
            }
            client.mget(keys, function (err, result) {
                //if no objects on db use empty array
                var locations = result || [];
                callback(err, locations);
            });
        });
    },

    saveLocation: function (value, callback) {
        client.exists(value.name, function (err, result) {
            if (result == 1) {
                callback("Already exists.", null);
            } else {
                //build key by concatenating name with hashtag so you can search for both
                var key = value.name + '_' + value.hashtag;
                client.set(key, JSON.stringify(value), callback);
            }
        });
    },

    getLocation: function (locationName, callback) {
        client.exists(locationName, function (err, result) {
            if (result == 0) {
                callback("Key doesn't exist.", null);
            } else {
                client.get(locationName, function (err, result) {
                    callback(err, result);
                });
            }
        });
    },

    deleteLocation: function (locationName, callback) {
        client.exists(locationName, function (err, result) {
            if (result == 0) {
                callback("Key doesn't exist.", null);
            } else {
                client.del(locationName, callback);
            }
        });
    },

    updateLocation: function (name, locationObject, callback) {
        client.exists(name, function (err, result) {
            if (result == 0) {
                callback("Location doesn't exist.", null);
            } else {
                if (name == locationObject.name) {
                    client.set(name, JSON.stringify(locationObject), function (err, result) {
                        callback(err, result);
                    });
                }
            }
        });
    },

    filterLocations: function (keyword, callback) {
        console.log(keyword);
        client.keys('*' + keyword + '*', function (err, keys) {
            if (err) {
                console.log("FAIL");
            } else {
                client.mget(keys, function (err, result) {
                    console.log(result);
                    console.log(keys);
                    callback(null, result);
                });
            }
        });
    },

    createLocationObject: function (name, hashtag, lat, long) {
        return new Location(name, hashtag, lat, long);
    }
};

function Location(name, hashtag, latitude, longitude) {
    this.name = name;
    this.hashtag = hashtag;
    this.lat = latitude;
    this.long = longitude;
}