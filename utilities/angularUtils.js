define(['angular'], function () {
    var utilities = {
        camelCaseToDash: function (str) {
            return str.replace(/[A-Z]/g, function (char, index, item) {
                return '-' + char.toLowerCase();
            });
        },
        /**
         * Return a string representation of a directive element, including classes and attributes
         */
        getDirectiveStrHTML: function (name, arrClasses, objAttributes) {
            var elemName = utilities.camelCaseToDash(name),
                classesStr = arrClasses.length ? ' classes="' + arrClasses.join(' ') + '" ' : '',
                attrStr = '',
                i;
            for (i in objAttributes) {
                if (objAttributes.hasOwnProperty(i)) {
                    attrStr += ' ' + i + '="' + objAttributes[i] + '" ';
                }
            }
            return '<' + elemName + classesStr + attrStr + '></' + elemName + '>';
        },
        varIsArrayWithLength: function (arr) {
            return arr && arr instanceof Array && arr.length;
        }
    };
    return utilities;
});