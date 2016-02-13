define([
    'filters/reverse/reverse',
    'factories/d3Factory',
    'factories/dataAnalyticsFactory',
    'directives/toDo/toDo',
    'directives/activeInput/activeInput',
    'directives/canFocus/canFocus',
    'directives/layoutPrime/layoutPrime',
    'directives/usaMap/usaMap',
    'directives/smartText/smartText',
    'directives/setFocus/setFocus',
    'controllers/toDo',
    'controllers/usaMapController'
], function(
    reverseFilter,
    d3Factory,
    dataAnalyticsFactory,
    toDoDirective,
    activeInputDirective,
    canFocus,
    layoutPrime,
    usaMap,
    smartText,
    focus,
    toDoController,
    usaMapController
) {
    var toDoModule = {
        controllerName: function () {
            return toDoController.name;
        },
        directiveName: function () {
            return toDoDirective.name;
        },
        layoutPrime: function () {
            return layoutPrime.name;
        }
    };
    toDoModule.name = "toDoModule";
    angular.module(toDoModule.name, [])
        .filter(reverseFilter.name, reverseFilter.func)
        .controller(toDoController.name, toDoController.inject)
        .controller(usaMapController.name, usaMapController.inject)
        .factory(d3Factory.name, d3Factory.inject)
        .factory(dataAnalyticsFactory.name, dataAnalyticsFactory.inject)
        .directive(canFocus.name, canFocus.func)
        .directive(smartText.name, smartText.inject)
        .directive(layoutPrime.name, layoutPrime.inject)
        .directive(usaMap.name, usaMap.inject)
        .directive(focus.name, focus.func)
        .directive(activeInputDirective.name, activeInputDirective.func)
        .directive(toDoDirective.name, toDoDirective.func);
    return toDoModule;
});