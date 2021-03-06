define([
    'css!directives/activeInput/activeInput'
], function () {
    var activeInputDirective = {};
    function directive () {
        function link (scope, element, attr) {}
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'directives/activeInput/templates/activeInput.html'
        };
    }
    activeInputDirective.name = 'activeInput';
    activeInputDirective.func = directive;
    return activeInputDirective;
});
