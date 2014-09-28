var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';

    scope.addMarket = kendo.observable({
            name: '',
            saveMarket: function () {
                window.data.markets.addMarket(this.get('name'), 2, 3);
            }
        });
}(app.viewmodels));