(function () {
    'use strict';

    angular.module('app').filter('objectFilterByProperty', function () {
        return function (items, prop, propvalue) {
            var result = [];
            angular.forEach(items, function (value, key) {
                if (value[prop] === propvalue) {
                    result.push(value);
                }
            });
            return result;
        }
    });
})()