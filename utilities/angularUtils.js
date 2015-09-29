define(['angular'], function () {
    var utilities = {
        camelCaseToDash: function (str) {
            return str.replace(/[A-Z]/g, function (char, index, item) {
                return '-' + char.toLowerCase();
            });
        },
        getDirectiveStrHTML: function (name) {
            var elemName = utilities.camelCaseToDash(name);
            return '<' + elemName + '></' + elemName + '>';
        },
        varIsArrayWithLength: function (arr) {
            return arr && arr instanceof Array && arr.length;
        }
    };
    return utilities;
});