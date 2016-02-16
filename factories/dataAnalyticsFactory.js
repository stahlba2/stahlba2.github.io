define(['angular'], function () {
    var d3Factory = {};
    d3Factory.name = 'dataAnalyticsFactory';
    d3Factory.func = function ($q) {
        var messenger = new SharedWorker('factories/dataAnalyticsWorker.js'),
            listeners = {},
            actions = {
                _listen: function () {
                    messenger.port
                        .addEventListener('message', actions._handleMessage.bind(actions));
                },
                _handleMessage: function (evt) {
                    var message = evt.data,
                        handlers = listeners[message.type] || [],
                        l = handlers.length;
                    while (l) {
                        l -= 1;
                        handlers[l].handler(message);
                    }
                },
                listen: function (type, handler) {
                    var listener = type.split('.'),
                        listenType = listener[0],
                        listenScope = listener[1];
                    listeners[listenType] = listeners[listenType] || [];
                    listeners[listenType].push({scope: listenScope, handler: handler});
                },
                stopListening: function (type) {
                    var listener = type.split('.'),
                        listenType = listener[0],
                        listenScope = listener[1],
                        typeListeners = listeners[listenType] || [],
                        l = typeListeners.length,
                        i = 0;
                    if (listenScope) {
                        while (l > i) {
                            l -= 1;
                            if (typeListeners[l].scope === listenScope) {
                                listeners[listenType].splice(l, 1);
                            }
                        }
                    } else {
                        delete listeners[listenType];
                    }
                },
                send: function (message) {
                    messenger.port.postMessage({
                        action: 'message',
                        message: message
                    });
                },
                start: function () {
                    actions._listen();
                    messenger.port.start();
                },
                stop: function () {
                    actions.send({action: 'stop'});
                }
            };
        actions.start();
        return actions;
    };
    d3Factory.inject = ['$q', d3Factory.func];
    return d3Factory;
});