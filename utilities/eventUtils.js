define([], function () {
    var eventUtils = {
            smother: function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        };
    return eventUtils;
});