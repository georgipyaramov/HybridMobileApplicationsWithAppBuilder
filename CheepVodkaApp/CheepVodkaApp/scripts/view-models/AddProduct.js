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
            else {
                scope.addProduct.set('marketId', data[0].id);
            }
        },
        getPicture: function () {
            var data = getPicture(function (data) {
                scope.addProduct.set('pictureUrl', data.url);
            });
        },
        saveProduct: function () {
            var name = this.get('name'),
                price = this.get('price'),
                pictureUrl = this.get('pictureUrl'),
                marketId = this.get('marketId');

            if (!name) {
                alert('Product must have a name!');
                return;
            }
            if (!price) {
                alert('Product must have a price!');
                return;
            }

            alert("saved");
            window.data.products.addProduct(name, price, pictureUrl, marketId);
            window.appTest.navigate("views/market.html?id=" + marketId);
        }
    });
}(app.viewmodels));