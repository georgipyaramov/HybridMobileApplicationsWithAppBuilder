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

    scope.data = {};

    scope.data.markets = {
        initSampleData: initSampleData,
        addMarket: addMarket,
        getMarkets: getMarkets,
        getMarketById: getMarketById
    };

}(window));