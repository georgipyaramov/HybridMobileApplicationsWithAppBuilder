(function (scope) {
    'use strict';
    var markets = [];

    function initSampleData() {
        addMarket("Fantastiko", 42, 42);
        addMarket("Bila", 42, 42);
        addMarket("Nqkoisi", 42, 42);
    }

    function addMarket(name, lat, long) {
        markets.push({
            id: markets.length + 1,
            name: name,
            lat: lat,
            long: long
        });
    }

    function getMarkets() {
        return markets;
    }

    function getMarketById(id) {
        return markets[id];
    }

    scope.data = {};

    scope.data.markets = {
        initSampleData: initSampleData,
        addMarket: addMarket,
        getMarkets: getMarkets,
        getMarketById: getMarketById
    };
}(window));