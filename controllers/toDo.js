define([
    '../utilities/storage',
    'utilities/eventUtils'
], function (storage, eventUtils) {
    var toDo = {};
    function controller($scope, $timeout) {
        var start = Date.now(),
            mode = {
                editing: false,
                index: null
            },
            items = storage.get('angular-app-items') || [{
                    activity: "Activity #2",
                    time: start
                }, {
                    activity: "Activity #1",
                    time: start
                }],
            removed = [];
        $scope.layoutMap = {};
        function reset() {
            mode.editing = false;
            storage.set('angular-app-items', $scope.items);
            $scope.activeInputVal = '';
        }
        $scope.retrieveHeader = function () {
            return angular.element(document.querySelector('body')).attr('data-header');
        };
        $scope.activeInputSubmit = function () {
            var item = $scope.activeInputVal.trim();
            if (item.length) {
                if (mode.editing) {
                    $scope.items[mode.index].activity = item;
                } else {
                    $scope.items.push({
                        activity: item,
                        time: Date.now()
                    });
                }
                reset();
            }
        };
        $scope.removeItem = function (item) {
            var index = $scope.items.indexOf(item);
            removed.push({index: index, item: $scope.items.splice(index, 1)});
            reset();
        };
        $scope.editItem = function (item) {
            mode.editing = true;
            mode.index = $scope.items.indexOf(item);
            $scope.activeInputVal = item.activity;
        };
        $scope.clickFromKey = function (evt) {
            if ([13, 32].indexOf(evt.which) > -1) {
                eventUtils.smother(evt);
                //Taking the function out OF the current digest cycle
                $timeout(function () {
                    angular.element(evt.target)
                        .triggerHandler('click');
                });
            }
        };
        $scope.items = items;
        //run after the directives have loaded
        //TODO: emit a loaded event from layoutPrime to trigger this function
        window.setTimeout(function () {
            $scope.headerRegion = {
                templateUrl: 'usaMapHeader.html'
            };
            $scope.footerRegion = {
                templateUrl: 'usaMapFooter.html'
            };
            $scope.$broadcast('add-dom-to-region', {
                directive: 'smartText',
                location: 'header',
                attributes: {
                    'data-smart-text-options': 'headerRegion'
                },
                height: 100
            });
            $scope.$broadcast('add-dom-to-region', {
                directive: 'smartText',
                location: 'footer',
                attributes: {
                    'data-smart-text-options': 'footerRegion'
                },
                height: 40
            });
            $scope.$broadcast('add-dom-to-region', {
                directive: 'usaMap',
                location: 'main-content',
                width: '75%'
            });

            $scope.$broadcast('add-dom-to-region', {
                directive: 'toDo',
                location: 'left-sidebar'
            });
        }, 150);
    }
    toDo.inject = ['$scope', '$timeout', controller];
    toDo.name = 'toDoController';
    return toDo;
});