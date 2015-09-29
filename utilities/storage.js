define(function () {
    var storage = {
        set: function (key, val) {
            if (angular) {
                val = angular.toJson(val);
            } else {
                val = JSON.stringify(val);
            }
            localStorage.setItem(key, val);
        },
        get: function (key) {
            var item = JSON.parse(localStorage.getItem(key));
            return item;
        }
    };
    return storage;
});