define([], function () {
    var isFocusableDirective = {};
    function directive () {
        function link (scope, element, attr) {
            var role = attr[isFocusableDirective.name] || '';
            element.attr('tabindex', '0');
            element.attr('role', role);
        }
        return {
            link: link,
            restrict: 'A'
        };
    }
    isFocusableDirective.name = 'canFocus';
    isFocusableDirective.func = directive;
    return isFocusableDirective;
});
