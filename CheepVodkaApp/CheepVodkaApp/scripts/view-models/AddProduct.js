var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';

    function getPicture(callback) {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            callback({
                url: imageURI
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

    function getMarkets() {
        return window.data.markets.getMarkets();
    }

    scope.addProduct = kendo.observable({
        name: '',
        price: '',
        pictureUrl: '',
        marketId: '',
        markets: [],
        getMarkets: function() {
            var data = getMarkets();
            scope.addProduct.set('markets', data);
            if (data.length == 0) {
                alert("Add market first.");
                window.appTest.navigate("views/addmarket.html")
            }
            scope.addProduct.set('marketId', data[0].id);
        },
        getPicture: function () {
            var data = getPicture(function (data) {
                scope.addProduct.set('pictureUrl', data.url);
            });
        },
        saveProduct: function () {
            alert("saved");
            window.data.products.addProduct(this.get('name'), this.get('price'), this.get('pictureUrl'), this.get('marketId'));
            window.appTest.navigate("views/market.html?id=" + this.get('marketId'))
        }
    });
}(app.viewmodels));