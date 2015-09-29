define([
    'utilities/angularUtils',
    'modules/toDo/toDo',
    'css!styles/angularStyles'
], function(
    utils,
    toDo
) {
    var directiveName = utils.camelCaseToDash(toDo.directiveName()),
        DirectiveElem = document.registerElement(directiveName),
        directive = new DirectiveElem();
    directive.setAttribute('ng-controller', toDo.controllerName());
    document.body.appendChild(directive);
    angular.bootstrap(directive, [toDo.name]);
});