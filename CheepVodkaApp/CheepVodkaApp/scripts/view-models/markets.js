var app = app || {};
app.viewmodels = app.viewmodels || {};

window.data.markets.initSampleData();

(function (scope) {
    'use strict';

    function loadMarkets() {
        return window.data.markets.getMarkets();
    }

    scope.markets = function (e) {
        var vm = kendo.observable({
            markets: loadMarkets()
        });
        kendo.bind(e.view.element, vm)
    };
}(app.viewmodels));