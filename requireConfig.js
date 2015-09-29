require.config({
    baseUrl: "/",
    paths: {
        "angular": 'lib/angular/angular',
        "angular-modules": 'lib/angular/angular-modules',
        "angular-animate": 'lib/angular/angular-animate',
        "angular-route": 'lib/angular/angular-route'
    },
    map: {
        '*': {
            'css': 'lib/require-css/css' // or whatever the path to require-css is
        }
    },
    shim: {
        app: {
            deps: ["angular-modules"]
        },
        'angular-modules': {
            deps: ["angular"]
        },
        'modules/toDo/toDo': {
            deps: ['angular-modules']
        }
    },
    name: 'Angular Test',
    location: '/',  // default 'packagename'
    main: 'app',               // default 'main'
    waitSeconds: 15
});
function getStarted() {
    var path = window.location.hash.replace('#', '').toLowerCase();
    require(['app/' + path + '/' + path], function () {});
}
getStarted();
