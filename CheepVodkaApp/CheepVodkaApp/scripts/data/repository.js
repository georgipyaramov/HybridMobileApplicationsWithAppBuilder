(function (scope) {
    'use strict';

    function initSampleData() {
        window.localStorage.clear();
        addMarket("Fantastiko", 1, 42);
        addMarket("Bila", 2, 42);
        addMarket("Nqkoisi", 3, 42);
    }

    function getDataFromStorage(dataType) {
        var storedValue = window.localStorage.getItem("appdata");
        if (storedValue == null) {
            storedValue = {};
        } else {
            storedValue = JSON.parse(storedValue);
        }

        storedValue[dataType] = storedValue[dataType] || [];

        return storedValue;
    }

    function addMarket(name, lat, long) {
        var data = getDataFromStorage("markets");

        var nextId = data.markets.length + 1;
        data.markets.push({
            id: nextId,
            name: name,
            lat: lat,
            long: long
        });
        localStorage.setItem("appdata", JSON.stringify(data));
    }

    function getMarkets() {
        var data = getDataFromStorage("markets");
        return data.markets;
    }

    function getMarketById(id) {
        var data = getDataFromStorage("markets");
        var result = null;
        for (var i = 0; i < data.markets.length; i++) {
            if (data.markets[i].id == id) {
                result = data.markets[i];
                break;
            }
        }
        return result;
    }

    function addProduct(name, price, url, marketId, noteUrl) {
        var data = getDataFromStorage("products");

        var nextId = data.products.length + 1;
        data.products.push({
            id: nextId,
            name: name,
            price: price,
            url: url,
            marketId: marketId,
            noteUrl: noteUrl
        });
        localStorage.setItem("appdata", JSON.stringify(data));
    }

    function getProductsOfMarket(marketId) {
        var data = getDataFromStorage("products");

        var result = [];
        for (var i = 0; i < data.products.length; i++) {
            if (data.products[i].marketId == marketId) {
                result.push(data.products[i]);
            }
        }
        return result;
    }

    scope.data = {};

    scope.data.markets = {
        initSampleData: initSampleData,
        addMarket: addMarket,
        getMarkets: getMarkets,
        getMarketById: getMarketById,
        addProduct: addProduct
    };

    scope.data.products = {
        addProduct: addProduct,
        getProductsOfMarket: getProductsOfMarket
    };
}(window));