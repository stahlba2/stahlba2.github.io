define([
    '../utilities/angularUtils',
    '../modules/toDo',
    'css!styles/angularStyles'
], function(
    utils,
    toDo
) {
    var layoutName = utils.camelCaseToDash(toDo.layoutPrime()),
        LayoutElem = document.registerElement(layoutName),
        layoutDirective = new LayoutElem();
    layoutDirective.setAttribute('ng-controller', toDo.controllerName());
    document.body.appendChild(layoutDirective);
    angular.bootstrap(layoutDirective, [toDo.name]);
});