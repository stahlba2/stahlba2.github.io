define([
    'factories/d3Factory',
    'factories/dataAnalyticsFactory',
    'controllers/usaMapController',
    'css!directives/usaMap/usaMap'
], function (d3Factory,
             dataAnalyticsFactory,
             usaMapController) {
    var usaMap = {},
        cityLocationData = [],
        zipLocationData = [],
        handleCityLocationDataRetrieved = function (resp) {
            cityLocationData = resp.data;
        },
        handleZipCodeDataRetrieved = function (resp) {
            zipLocationData = resp.data;
        };

    function CityMapper(options) {
        this.svg = options.svg;
        this.projection = options.projection
    }
    CityMapper.prototype = {
        handleCity: function (cityInput) {
            var cityState = cityInput.replace( /,\s/, ',').split(','),
                city = cityState[0].trim(),
                state = (cityState[1] || '').trim(),
                cityRegEx = new RegExp(city, 'i'),
                stateRegEx = new RegExp(state, 'i'),
                winningCityRegEx = new RegExp('^' + city + '$', 'i'),
                winningStateRegEx = new RegExp('^' + state + '$', 'i'),
                geoLocate = [],
                winningSearches = [],
                citySearch,
                possibilities = this.filterCityLocationData('filter', function (item) {
                    citySearch = item.name.search && item.name.search(cityRegEx) > -1;
                    if (!state) {
                        return citySearch;
                    } else {
                        return citySearch && (item.state.search(stateRegEx) > -1 || item.stateAbbr.search(stateRegEx) > -1);
                    }
                });
            possibilities.forEach(function (item) {
                if (item.name.search(winningCityRegEx) > -1 && (item.state.search(winningStateRegEx) > -1 || item.stateAbbr.search(winningStateRegEx) > -1)) {
                    winningSearches.push([item.lng, item.lat])
                } else {
                    geoLocate.push([item.lng, item.lat]);
                }
            });
            this.plotLocations(winningSearches.length ? winningSearches : geoLocate);
        },
        filterCityLocationData: function (arrMethod, funcFilter) {
            return cityLocationData[arrMethod](funcFilter);
        },
        filterZipLocationData: function (arrMethod, funcFilter) {
            return zipLocationData[arrMethod](funcFilter);
        },
        handleZipCode: function (zipCode) {
            var found = false,
                foundItem = {},
                filteredResults = this.filterZipLocationData('some', function (item, index) {
                    found = item.zip === zipCode;
                    foundItem = item;
                    return found;
                });
            console.log(zipCode, filteredResults)
            if (filteredResults) {
                this.plotLocations([[foundItem.lng, foundItem.lat]]);
            }
        },
        plotLocations: function (arrMatchedCoor) {
            var _this = this;
            this.svg.selectAll("circle")
                .data(arrMatchedCoor)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return _this.projection(d)[0]; })
                .attr("cy", function (d) { return _this.projection(d)[1]; })
                .attr("r", "8px")
                .attr("fill", "red")
        },
        removeCircles: function () {
            if (this.svg) {
                this.svg.selectAll("circle").remove();
            }
        },
        testInput: function (input) {
            var typeofInput = typeof input;
            this.removeCircles();
            if (typeofInput === 'number') {
                this.handleZipCode(input);
            } else if (typeofInput === 'string' && input.length && input.length > 1) {
                if (input.trim().search(/^\d{5}$/) > -1) {
                    this.handleZipCode(parseInt(input.trim(), 10))
                } else {
                    this.handleCity(input);
                }
            }
        }
    };

    usaMap.name = 'usaMap';
    usaMap.func = function ($q, $http, analyticsFactory, d3Promise) {
        $http.get('jsonData/censusPlaces.json')
            .then(handleCityLocationDataRetrieved);
        $http.get('jsonData/censusZips.json')
            .then(handleZipCodeDataRetrieved);
        function link(scope, element, attr) {
            var stateJSONCallback,
                svg,
                g,
                projection,
                cityMapperInstnc,
                path,
                doCitySearchTimeout,
                watchListener = scope.$watch(
                    function(scope) {
                        return scope['activeInputVal'];
                    },
                    function() {
                        clearTimeout(doCitySearchTimeout);
                        doCitySearchTimeout = setTimeout(placeCity, 150);
                    }
                );
            function cleanup() {
                watchListener();
            }
            function placeCity() {
                if (cityMapperInstnc) {
                    cityMapperInstnc.testInput(scope['activeInputVal']);
                }
            }
            function handleD3Loaded(d3) {
                svg = d3.select(element[0].querySelector('svg'));
                g = svg.append('g');
                projection = d3.geo.albersUsa();
                path = d3.geo.path()
                    .projection(projection);
                stateJSONCallback = function (json) {
                    g.selectAll("path")
                        .data(json.features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .style("fill", "steelblue");
                    cityMapperInstnc = new CityMapper({svg: svg, projection: projection});

                };
                d3.json('jsonData/states.json', stateJSONCallback);
            }
            element.on('$destroy', cleanup);
            d3Promise.then(handleD3Loaded);
        }
        return {
            link: link,
            restrict: 'E',
            controller: usaMapController.name,
            templateUrl: 'directives/usaMap/templates/usaMap.html'
        }

    };
    usaMap.inject = ['$q', '$http', dataAnalyticsFactory.name, d3Factory.name, usaMap.func];
    return usaMap;
});