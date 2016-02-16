define(['css!directives/smartText/smartText'], function () {
    var focusDirective = {};
    function directive ($compile, $http) {
        var directory = 'directives/smartText/templates/';
        function link (scope, element, attr) {
            //TODO: use a restricted scope to pass these options
            var scopeItem = scope[element.attr('data-smart-text-options')],
                textArea = element[0].querySelector('.smart-text-text-area');
            if (scopeItem.templateUrl) {
                $http.get(directory + scopeItem.templateUrl)
                    .then(function (response) {
                        element.append($compile(response.data)(scope));
                    });
            } else if (scopeItem.text) {
                angular.element(textArea)
                    .text(scopeItem.text);
            }
        }
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'directives/smartText/templates/smartText.html'
        };
    }
    focusDirective.name = 'smartText';
    focusDirective.inject = ['$compile', '$http', directive];
    return focusDirective;
});
