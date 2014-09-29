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
            noteUrl: data.noteUrl,
            products: products,
            playNote: function ()  {
                var noteUrl = this.get('noteUrl');

                if (noteUrl) {
                    var my_media = new Media(noteUrl,
                        // success callback
                        function () {
                            console.log("playAudio():Audio Success");
                        },
                        // error callback
                        function (err) {
                            alert("Cannot play note.")
                            console.log("playAudio():Audio Error: " + err);
                        }
                    );
                    // Play audio
                    my_media.play();
                }
            }
        });
        kendo.bind(e.view.element, vm)

    };
}(app.viewmodels));