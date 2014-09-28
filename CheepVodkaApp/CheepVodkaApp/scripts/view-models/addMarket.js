var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';

    function getCoords(callback) {
        var lat = 0,
            long = 0;
        var geolocationSuccess = function(position) {
            console.log(position)
            callback({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
        }

        var geolocationError = function (position) {
            console.log("error")
        }

        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
    }

    scope.addMarket = kendo.observable({
        name: '',
        lat: 0,
        long: 0,
        getCoords: function () {
            var data = getCoords(function (data) {
                scope.addMarket.set('lat', data.lat);
                scope.addMarket.set('long', data.long);
                scope.addMarket.set('coordsReady', true);
                scope.addMarket.set('showSearching', false);
            });
        },
        coordsReady: false,
        showSearching: true,
        saveMarket: function () {
            window.data.markets.addMarket(this.get('name'), this.get('lat'), this.get('long'));
        }
    });
}(app.viewmodels));