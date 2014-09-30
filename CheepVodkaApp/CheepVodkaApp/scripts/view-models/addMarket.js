var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';

    function getCoords(callback) {
        var lat = 0,
            long = 0;
        var geolocationSuccess = function(position) {
            callback({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
        }

        var geolocationError = function (err) {
            callback(null, err);
        }

        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    }

    function getNote(callback) {
        var captureSuccess = function (mediaFiles) {
            callback(mediaFiles);
        }

        var captureError = function (err) {
            callback(null, err);
        }

        navigator.device.capture.captureAudio(captureSuccess, captureError, {});
    };

    scope.addMarket = kendo.observable({
        name: '',
        lat: 0,
        long: 0,
        getCoords: function () {
            scope.addMarket.set('showSearching', true);
            var data = getCoords(function (data, err) {
                if (data == null) {
                    console.log(err);
                    alert("Cannot get location.");
                    scope.addMarket.set('showSearching', false);
                    return;
                }
                scope.addMarket.set('lat', data.lat);
                scope.addMarket.set('long', data.long);
                scope.addMarket.set('coordsReady', true);
                scope.addMarket.set('showSearching', false);
            });
        },
        coordsReady: false,
        showSearching: true,
        saveMarket: function () {
            var name = this.get('name'),
                lat = this.get('lat'),
                long = this.get('long'),
                noteUrl = this.get('noteUrl')

            if (!name) {
                alert('Market must have a name!')
                return;
            }

            window.data.markets.addMarket(name, lat, long, noteUrl);
            alert("Saved")
            window.appTest.navigate("views/markets.html");
        },
        noteUrl: '',
        recNote: function () {
            getNote(function (mediaFile, err) {
                if (mediaFile == null) {
                    console.log("recordAudio():Audio" + err);
                    alert("Cannot record note.");
                    return;
                }
                scope.addMarket.set('noteUrl', mediaFile[0].fullPath);
            });
        }
    });
}(app.viewmodels));