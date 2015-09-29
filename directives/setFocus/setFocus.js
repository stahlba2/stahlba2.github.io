define([], function () {
    var focusDirective = {};
    function directive () {
        function link (scope, element, attr) {
            var watchProp = attr[focusDirective.name],
                watchListener = scope.$watch(
                    function(scope) {
                        return scope[watchProp];
                    },
                    function() {
                        element[0].focus();
                    }
                );
            function cleanup() {
                watchListener();
            }
            element.on('$destroy', cleanup);
        }
        return {
            link: link,
            restrict: 'A'
        };
    }
    focusDirective.name = 'setFocus';
    focusDirective.func = directive;
    return focusDirective;
});
