define([], function () {
    //Define above to access object within object methods.
    //Permits access to utilities object when the method is called from a different scope.
    var utilities;
    utilities = {
        getWindowDimensions: function () {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        },
        setElementToWindowDimensions: function (elem) {
            var dimensions = utilities.getWindowDimensions();
            elem.style.width = dimensions.width + 'px';
            elem.style.height = dimensions.height + 'px';
        }
    };
    return utilities;
});