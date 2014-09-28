var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';

    function loadMarketData(id) {
        return window.data.markets.getMarketById(id);
    }

    function loadProductsData(id) {
        return window.data.products.getProductsOfMarket(id);
    }

    scope.market = function (e) {
        var marketId = e.view.params.id;
        var data = loadMarketData(marketId);
        var products = loadProductsData(marketId);
        var vm = kendo.observable({
            name: data.name,
            products: products
        });
        kendo.bind(e.view.element, vm)

    };
}(app.viewmodels));