define([
    'filters/reverse/reverse',
    'directives/toDo/toDo',
    'directives/activeInput/activeInput',
    'directives/canFocus/canFocus',
    '../../directives/setFocus/setFocus',
    'controllers/toDo/toDo'
], function(
    reverseFilter,
    toDoDirective,
    activeInputDirective,
    canFocus,
    focus,
    toDoController
) {
    var toDoModule = {
        controllerName: function () {
            return toDoController.name;
        },
        directiveName: function () {
            return toDoDirective.name;
        }
    };
    toDoModule.name = "toDoModule";
    angular.module(toDoModule.name, [])
        .filter(reverseFilter.name, reverseFilter.func)
        .controller(toDoController.name, toDoController.inject)
        .directive(canFocus.name, canFocus.func)
        .directive(focus.name, focus.func)
        .directive(activeInputDirective.name, activeInputDirective.func)
        .directive(toDoDirective.name, toDoDirective.func);
    return toDoModule;
});