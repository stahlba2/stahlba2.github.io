var worker = (function () {
    var ports = [],
        cityDataUrl = 'jsonData/cityLatLong.js',
        module = {
            _handleStop: function (port) {
                ports.splice(ports.indexOf(port), 1);
            },
            _sendCoordinates: function (port, data) {
                this._requestCityLatLong(function (responseText) {
                    port.message({
                        data: responseText,
                        type: 'city-coordinates'
                    });
                });
            },
            _requestCityLatLong: function (callback) {
                var request = new XMLHttpRequest();
                request.open('GET', cityDataUrl, true);
                request.onreadystatechange = function () {
                    console.log('ready state change', request);
                    if (request.readyState === 4) {
                        callback(request.responseText);
                    }
                }
                request.send();
            },
            _sendMessage: function (port, data) {
                ports.forEach(function (pt) {
                    pt.postMessage(data.message);
                });
            },
            addPort: function (port) {
                ports.push(port);
            },
            handlePortMessage: function (port, data) {
                var action = data.action;
                switch (action) {
                    case 'request-city-coordinates':
                        this._sendCoordinates(port, data);
                        break;
                    case 'stop':
                        this._handleStop(port);
                        break;
                    default:
                        break;
                }
            }
        };
    return module;
}());


onconnect = function(e) {
    var port = e.ports[0];
    worker.addPort(port);
    port.addEventListener('message', function(evt) {
        worker.handlePortMessage(port, evt.data);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}