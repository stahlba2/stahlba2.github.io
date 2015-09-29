define([
    'css!directives/toDo/toDo'
], function () {
    var toDoDirective = {};
    function directive ($compile) {
        function link ($scope, element, attr) {
        }
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'directives/toDo/templates/toDo.html'
        };
    }
    toDoDirective.name = 'toDo';
    toDoDirective.func = directive;
    return toDoDirective;
});
