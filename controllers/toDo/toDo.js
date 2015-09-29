define(['utilities/storage', 'utilities/eventUtils'], function (storage, eventUtils) {
    var toDo = {};
    function controller($scope, $timeout) {
        var start = Date.now(),
            mode = {
                editing: false,
                index: null
            },
            items = storage.get('todo-items') || [{
                    activity: "Activity #2",
                    time: start
                }, {
                    activity: "Activity #1",
                    time: start
                }],
            removed = [];
        function reset() {
            mode.editing = false;
            storage.set('todo-items', $scope.items);
            $scope.activeInputVal = '';
        }
        $scope.toDoHeader = function () {
            return 'To-Do';
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
    }
    toDo.inject = ['$scope', '$timeout', controller];
    toDo.name = 'toDoController';
    return toDo;
});