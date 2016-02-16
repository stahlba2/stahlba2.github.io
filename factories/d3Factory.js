define(['angular'], function () {
    var d3Factory = {};
    d3Factory.name = 'd3Factory';
    d3Factory.func = function ($q) {
        var deferred = $q.defer();
        require(['d3'], function () {
            deferred.resolve(window.d3);
        });
        return deferred.promise;
    };
    d3Factory.inject = ['$q', d3Factory.func];
    return d3Factory;
});