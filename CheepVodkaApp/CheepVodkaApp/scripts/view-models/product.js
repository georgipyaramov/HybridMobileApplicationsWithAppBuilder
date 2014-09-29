var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    'use strict';


    function loadProductData(id) {
        return window.data.products.getProductById(id);
    }

    scope.product = function (e) {
        var productId = e.view.params.id;
        var data = loadProductData(productId);
        var vm = kendo.observable({
            name: data.name,
            price: data.price,
            url: data.url
        });
        kendo.bind(e.view.element, vm)

    };
}(app.viewmodels));