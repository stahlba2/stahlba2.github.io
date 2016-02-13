define([
    '../utilities/storage',
    'utilities/eventUtils'
], function (storage, eventUtils) {
    var usaMap = {};
    function controller($scope) {
        var start = Date.now();
        $scope.placeholder = 'Atlanta, GA';
        $scope.items = storage.get('angular-app-items') || [{
                activity: "Atlanta, GA",
                time: start
            }, {
                activity: 22311,
                time: start
            }];
    }
    usaMap.inject = ['$scope', controller];
    usaMap.name = 'usaMapController';
    return usaMap;
});