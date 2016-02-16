define([
    'utilities/utilities',
    'utilities/angularUtils',
    'utilities/eventUtils',
    'css!directives/layoutPrime/layoutPrime'
], function (utilities, angularUtils, eventUtils) {
    var focusDirective = {};
    function LayoutManager(scope, element, $compile) {
        this.element = element;
        this.scope = scope;
        this.$compile = $compile;
    }
    LayoutManager.prototype = {
        addDirectiveToRegion: function (params) {
            //Add directive to element or to page region
            var isDomNode = params.location instanceof HTMLElement,
                elem = isDomNode ? params.location : angular.element(this.element[0].querySelector('.layout-prime-' + params.location)),
                directiveHTML = angularUtils.getDirectiveStrHTML(params.directive, params.classes || [], params.attributes || {}),
                directiveElement = this.$compile(directiveHTML)(this.scope);
            elem.empty()
                .append(directiveElement);
            if (params.height) {
                angular.element(elem).css('height', typeof params.height === 'number' ? params.height + 'px' : params.height);
                console.log(angular.element(elem));
            }
            if (params.width) {
                angular.element(elem).css('width', typeof params.width === 'number' ? params.width + 'px' : params.width);
            }
        }
    };
    function directive($compile) {
        var id = 1;
        function link (scope, element, attr) {
            var offAddItem,
                layoutManager = new LayoutManager(scope, element, $compile);
            scope.uniqueId = id++;
            offAddItem = scope.$on('add-dom-to-region', function (evt, evtParams) {
                if (!evt.defaultPrevented) {
                    layoutManager.addDirectiveToRegion(evtParams);
                }
                evt.preventDefault();
            });
            element.on('$destroy', function () {
                offAddItem();
            });
        }
        return {
            link: link,
            restrict: 'E',
            templateUrl: 'directives/layoutPrime/templates/layoutPrime.html'
        };
    }
    focusDirective.inject = ['$compile', directive];
    focusDirective.name = 'layoutPrime';
    return focusDirective;
});
