define([], function () {
    var reverseFilter = {};
    function customFilter() {
        return function(items) {
            return items.slice().reverse();
        };
    }
    reverseFilter.name = 'reverse';
    reverseFilter.func = customFilter;
    return reverseFilter;
});
