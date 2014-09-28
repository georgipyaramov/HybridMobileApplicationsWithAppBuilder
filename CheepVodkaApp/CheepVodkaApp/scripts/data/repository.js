(function (scope) {
    'use strict';

    function initSampleData() {
        window.localStorage.clear();
        addMarket("Fantastiko", 1, 42);
        addMarket("Bila", 2, 42);
        addMarket("Nqkoisi", 3, 42);
    }

    function getMarketsFromStorage() {
        var storedValue = window.localStorage.getItem("appdata");
        if (storedValue == null) {
            storedValue = {};
        } else {
            storedValue = JSON.parse(storedValue);
        }

        storedValue.markets = storedValue.markets || [];

        return storedValue;
    }

    function addMarket(name, lat, long) {
        var data = getMarketsFromStorage();

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
        var data = getMarketsFromStorage();
        return data.markets;
    }

    function getMarketById(id) {
        var data = getMarketsFromStorage();
        var result = null;
        for (var i = 0; i < data.markets.length; i++) {
            if (data.markets[i].id == id) {
                result = data.markets[i];
                break;
            }
        }
        return result;
    }

    scope.data = {};

    scope.data.markets = {
        initSampleData: initSampleData,
        addMarket: addMarket,
        getMarkets: getMarkets,
        getMarketById: getMarketById
    };

}(window));