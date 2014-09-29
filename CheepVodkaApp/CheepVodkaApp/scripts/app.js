(function () {
    'use strict';

    document.addEventListener('deviceready', function () {
        //window.todos = [{
        //    title: 'Initial',
        //    isUrgent: true
        //}];
        navigator.splashscreen.hide();
        window.appTest = new kendo.mobile.Application(document.body, {
            transition: 'slide'
        });
    }, false);
}());